# Andie Orozco's Nails

The website for [andieorozconails.com](https://www.andieorozconails.com): one static page, one stylesheet, one small script, and one serverless function for the contact form. There is no framework and no build step.

```
public/            everything visitors download
  index.html       all the content: services, prices, about, policies
  styles.css       all the styling
  script.js        menu, carousel arrows, booking policy dialog, contact form
  404.html
  img/  fonts/     optimized photos and self-hosted fonts
api/contact.js     emails contact-form messages (runs on Vercel)
vercel.json        security headers and caching
originals/         full-size photos (not deployed)
tools/             image optimizer and local preview server
```

## Editing

- **Text, prices, services, policies:** edit `public/index.html`. Each section is labelled with a comment.
- **Location, hours and phone for search engines:** the `application/ld+json` block near the top of `index.html`. Keep it in step with what the page shows.
- **Booking:** the booking section and the policy dialog link to Instagram. If the handle changes, search `index.html` for `instagram.com` and update every link.
- **Colors and fonts:** the variables at the top of `public/styles.css`.
- **Photos:** put the full-size JPG in `originals/` (reuse a file name to replace a photo), then run:

  ```
  pip install pillow
  python tools/optimize_images.py
  ```

  This writes small WebP files to `public/img/` and strips metadata such as GPS location. `originals/` is in a public repository, so the script also scrubs metadata from the originals themselves.

## Preview

```
python tools/serve.py
```

Then open http://localhost:4173. The preview sends the same security headers as production. You can also just open `public/index.html` in a browser. The contact form only sends mail when deployed.

## Deploying

Pushing to `main` deploys to Vercel. `vercel.json` tells Vercel this is a plain static site, so no dashboard changes are needed.

The contact form needs these environment variables in the Vercel project (they are the same ones the previous version used):

| Variable | Meaning |
| --- | --- |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE` | SMTP server, port, and `true` for port 465 |
| `EMAIL_USER`, `EMAIL_PASSWORD` | SMTP login |
| `EMAIL_FROM`, `EMAIL_TO` | sender address and the inbox that receives messages |

## Security notes

- A strict Content-Security-Policy (`vercel.json`) allows scripts, styles, fonts and images from this site only, and no frames at all. Nothing on the page loads from a third party; Instagram and TikTok are ordinary links. Inline scripts and inline `style` attributes are blocked, so keep both out of the HTML. (The `application/ld+json` block is data, not a script, so it is unaffected.) Embedding something new (a scheduler, a map, a video) means adding its domain to the policy first.
- `api/contact.js` accepts JSON from this site only, validates and length-limits every field, sends plain-text email, rate-limits each visitor, and has a hidden spam-trap field.
- `nodemailer` is the only dependency and is pinned to an exact version. Bump it deliberately when a new release matters. It needs Node.js 20 or newer (Vercel > Project > Settings > Node.js Version).
