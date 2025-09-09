import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Optimize image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Image sizes for srcset
  },
  // No experimental features needed - all stable features are enabled by default
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://calendly.com https://*.calendly.com; connect-src 'self' https://calendly.com https://*.calendly.com; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https: data:; font-src 'self' https: data:; frame-src https://calendly.com https://*.calendly.com;",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
