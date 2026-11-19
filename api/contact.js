// POST /api/contact
// The only server code on the site: it emails a contact-form message to Andie.
// It runs as a Vercel Function; everything else is static files.
//
// Settings (Vercel > Project > Settings > Environment Variables):
//   EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASSWORD  SMTP account
//   EMAIL_FROM, EMAIL_TO                                             sender and inbox

import nodemailer from 'nodemailer';

const MAX_LENGTH = { name: 100, email: 254, phone: 30, message: 2000 };
const MAX_BODY_CHARS = 10_000;
const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

// ---------- Rate limit: 3 messages a minute per visitor ----------
// Kept in memory, so it is per server instance: enough to stop a person or a
// simple script hammering the form. For a hard guarantee, add a rate-limit
// rule for /api/contact in the Vercel Firewall as well.
const RATE = { max: 3, windowMs: 60_000, maxVisitors: 5_000 };
const recentByVisitor = new Map();

function isRateLimited(visitor, now = Date.now()) {
  const recent = (recentByVisitor.get(visitor) ?? []).filter((time) => now - time < RATE.windowMs);
  const limited = recent.length >= RATE.max;
  if (!limited) recent.push(now);
  recentByVisitor.set(visitor, recent);
  // Cap memory: once full, forget whoever has been tracked longest.
  if (recentByVisitor.size > RATE.maxVisitors) {
    recentByVisitor.delete(recentByVisitor.keys().next().value);
  }
  return limited;
}

// ---------- Helpers ----------
function reply(status, message) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

// A browser on another website sends that site's Origin, which will not match
// ours. Tools such as curl send none; they are not what this check is for.
function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Read a field as trimmed text. Anything that is not a string becomes empty.
function text(body, field) {
  const value = body[field];
  return typeof value === 'string' ? value.trim() : '';
}

// Drop control characters (including line breaks) from values that end up in
// email headers, so nobody can smuggle in extra headers.
function singleLine(value) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
}

let transporter;
function mailer() {
  transporter ??= nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
  });
  return transporter;
}

// ---------- Handler ----------
export async function POST(request) {
  // JSON only. A plain HTML form on another site cannot send this content type.
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return reply(415, 'Please send the form from the website.');
  }
  if (!isSameOrigin(request)) {
    return reply(403, 'Please send the form from the website.');
  }

  // Vercel sets these headers itself, so a visitor cannot fake them.
  const visitor =
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';
  if (isRateLimited(visitor)) {
    return reply(429, 'Too many messages. Please try again in a minute.');
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) return reply(413, 'That message is too long.');
    body = JSON.parse(raw);
  } catch {
    return reply(400, 'The form could not be read. Please try again.');
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return reply(400, 'The form could not be read. Please try again.');
  }

  // The hidden "fax" field is invisible to people. If it is filled in, a bot
  // did it: answer as if it worked and send nothing.
  if (text(body, 'fax')) {
    return reply(200, 'Message sent successfully');
  }

  const name = singleLine(text(body, 'name'));
  const email = text(body, 'email');
  const phone = singleLine(text(body, 'phone'));
  const message = text(body, 'message');

  if (!name || !email || !message) {
    return reply(400, 'Please fill in your name, email and message.');
  }
  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    phone.length > MAX_LENGTH.phone ||
    message.length > MAX_LENGTH.message
  ) {
    return reply(400, 'One of the fields is too long.');
  }
  if (!EMAIL.test(email)) {
    return reply(400, 'Please enter a valid email address.');
  }
  if (phone && !PHONE.test(phone)) {
    return reply(400, 'Please enter a valid phone number.');
  }

  try {
    await mailer().sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      // Plain text only. With no HTML part, nothing a visitor types can render as markup.
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}`,
    });
  } catch (error) {
    console.error('Contact form: sending failed:', error?.message ?? error);
    return reply(500, 'Error sending message');
  }

  return reply(200, 'Message sent successfully');
}
