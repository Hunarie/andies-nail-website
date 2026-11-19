// Everything interactive on the site, in one small file with no dependencies.
// The page reads fine without it: every link, including booking on Instagram, still works.

// ---------- Mobile menu ----------
const header = document.querySelector('.site-header');
const menuToggle = header.querySelector('.menu-toggle');

function setMenu(open) {
  header.toggleAttribute('data-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => setMenu(!header.hasAttribute('data-open')));
header.querySelector('.site-nav').addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// ---------- "Book" links land with the booking card centred on screen ----------
const booking = document.getElementById('book');

document.querySelectorAll('a[href="#book"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    booking.scrollIntoView({ block: 'center' });
  });
});

// ---------- Photo carousel: loops forever in both directions ----------
// The strip scrolls natively (swipe, trackpad, keyboard, arrows). To make it
// endless, copies of every photo sit before and after the real ones. Whenever
// scrolling comes to rest inside the copies, the strip jumps to the identical
// spot among the real photos, so nothing appears to move.
const track = document.querySelector('.carousel-track');
const slides = [...track.children];
const count = slides.length;

function copyOf(slide) {
  const copy = slide.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true'); // screen readers announce each photo once
  return copy;
}
track.prepend(...slides.map(copyOf));
// Two sets after: the view is up to three photos wide, so the right side needs the extra room.
track.append(...slides.map(copyOf), ...slides.map(copyOf));

const slideWidth = () => slides[0].getBoundingClientRect().width;

// The slide at the left edge, or the one the arrows are heading for.
// Slides are numbered across every set; the real photos are count to 2 * count - 1.
let goal = count;
track.scrollTo({ left: goal * slideWidth(), behavior: 'instant' });

// If the strip has drifted into the copies, hop one whole set back to the real
// photos. Returns the slide now at the left edge.
function stayInRealPhotos() {
  const width = slideWidth();
  const here = Math.round(track.scrollLeft / width);
  const shift = here < count ? count : here >= 2 * count ? -count : 0;
  if (shift) {
    track.scrollTo({ left: track.scrollLeft + shift * width, behavior: 'instant' });
    goal += shift;
  }
  return here + shift;
}

function settle() {
  goal = stayInRealPhotos();
}

if ('onscrollend' in window) {
  track.addEventListener('scrollend', settle);
} else {
  // Older Safari has no scrollend event: treat a short pause in scrolling as the end.
  let pause;
  track.addEventListener('scroll', () => {
    clearTimeout(pause);
    pause = setTimeout(settle, 150);
  });
}

// Slides change width at the layout breakpoints; stay on the same photo.
window.addEventListener('resize', () => {
  track.scrollTo({ left: goal * slideWidth(), behavior: 'instant' });
});

document.querySelectorAll('.carousel-button').forEach((button) => {
  button.addEventListener('click', () => {
    stayInRealPhotos(); // guarantees room to move, however fast the arrows are clicked
    goal += button.classList.contains('next') ? 1 : -1;
    track.scrollTo({ left: goal * slideWidth() });
  });
});

// ---------- Booking policy dialog ----------
const policies = document.getElementById('policies');

document.getElementById('show-policies').addEventListener('click', () => policies.showModal());

// A click on the dimmed backdrop lands on the <dialog> element itself.
policies.addEventListener('click', (event) => {
  if (event.target === policies) policies.close();
});

// ---------- Contact form ----------
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function showStatus(state, text) {
  formStatus.dataset.state = state;
  formStatus.textContent = text; // textContent, never innerHTML: nothing typed can become markup
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  showStatus('sending', 'Sending…');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });

    if (response.ok) {
      form.reset();
      showStatus('success', "Message sent! Thank you for your message. I'll get back to you soon!");
    } else if (response.status === 429) {
      showStatus('error', 'That was a lot of messages in a row. Please wait a minute and try again.');
    } else {
      showStatus('error', 'There was a problem sending your message. Please try again.');
    }
  } catch {
    showStatus('error', 'There was a problem sending your message. Please check your connection and try again.');
  } finally {
    submit.disabled = false;
  }
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
