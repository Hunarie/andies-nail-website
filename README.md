This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

1. Create a `.env.local` file in the root directory with the following variables:

```bash
# Site metadata
NEXT_PUBLIC_SITE_NAME="Andie Orozco's Nails"
NEXT_PUBLIC_SITE_DESCRIPTION="Professional nail services by Andie Orozco"

# Contact information
NEXT_PUBLIC_CONTACT_EMAIL=andieorozco2006@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=(616) 734-7308

# Social media
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/andiee.orozco2/
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@andieorozco4

# Calendly booking
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-calendly-username
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load custom fonts.

## Features

- **Modern Next.js App Router**: Utilizing the latest Next.js features
- **Optimized Images**: Using next/image for optimal loading and rendering
- **Type Safety**: Built with TypeScript for enhanced developer experience
- **Responsive Design**: Looks great on all devices
- **Environment Configuration**: Easily customize site content through environment variables
- **Error Handling**: Robust error boundaries for a smooth user experience
- **Mantine UI**: Beautiful UI components with Mantine

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
