import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiter } from 'limiter';

// Storage for IP-based rate limiters
const ipLimiters = new Map<string, RateLimiter>();

// Define contact form data interface
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

// Helper function to sanitize and validate inputs
function validateAndSanitizeInput(body: ContactFormData) {
  // Required fields check
  if (!body.email || !body.name || !body.message) {
    return { valid: false, error: 'Missing required fields' };
  }

  // Email format validation using regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(body.email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Phone validation if provided
  if (body.phone) {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!phoneRegex.test(body.phone)) {
      return { valid: false, error: 'Invalid phone number format' };
    }
  }

  return { valid: true, error: null };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown-ip';
    
    // Create a rate limiter for this IP if it doesn't exist (3 requests per minute)
    if (!ipLimiters.has(ip)) {
      ipLimiters.set(ip, new RateLimiter({
        tokensPerInterval: 3, 
        interval: 'minute', 
        fireImmediately: true
      }));
    }
    
    const limiter = ipLimiters.get(ip)!;
    
    // Check if rate limit is exceeded
    const rateLimitResponse = await limiter.removeTokens(1);
    if (rateLimitResponse < 0) {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json() as ContactFormData;
    
    // Server-side validation
    const validation = validateAndSanitizeInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.error },
        { status: 400 }
      );
    }
    
    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'your-email@example.com',
      to: process.env.EMAIL_TO || 'recipient@example.com',
      replyTo: body.email,
      subject: `Contact Form: Message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || 'Not provided'}\nMessage: ${body.message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { message: 'Error sending message' },
      { status: 500 }
    );
  }
} 