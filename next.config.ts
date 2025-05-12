import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'], // Allow external image domains
    formats: ['image/avif', 'image/webp'], // Optimize image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Image sizes for srcset
  },
  experimental: {
    // Enable optimizations
    optimizeCss: true,
    scrollRestoration: true,
  },
  env: {
    // Fallback values for environment variables
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "Andie Orozco's Nails",
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Professional nail services by Andie Orozco",
    NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/andieorozco2006",
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "andieorozco2006@gmail.com",
    NEXT_PUBLIC_CONTACT_PHONE: process.env.NEXT_PUBLIC_CONTACT_PHONE || "(616) 734-7308",
    NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2",
    NEXT_PUBLIC_TIKTOK_URL: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4",
  },
  async headers() {
    return [
      {
        // Add security headers
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
