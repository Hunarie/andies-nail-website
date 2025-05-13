import type { Metadata } from "next";
import { MantineProvider, createTheme } from "@mantine/core";
import { Playfair_Display, Cormorant_Garamond, Lato } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import "./globals.css";

// Load fonts with next/font/google (optimized)
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-lato',
});

// Create custom theme with coquette-inspired colors
const theme = createTheme({
  primaryColor: 'pink',
  colors: {
    pink: [
      '#FCF2F5',
      '#FCE5EA',
      '#F9DDE3',
      '#F7D5DD',
      '#F7C8D2',
      '#F4B6C3',
      '#F0A9B8',
      '#E596A6', 
      '#DB8797',
      '#D27888',
    ],
    gold: [
      '#F8F5ED',
      '#F2EFDE',
      '#EAE5CE',
      '#E3DCBF',
      '#D4C5A1',
      '#C5B088',
      '#B79C6F',
      '#A48857',
      '#93764B',
      '#836542'
    ],
  },
  fontFamily: `var(--font-lato), sans-serif`,
  defaultRadius: '2px',
  components: {
    Button: {
      defaultProps: {
        radius: '2px',
        color: 'pink.4',
      },
      styles: {
        root: {
          fontFamily: `var(--font-lato), sans-serif`,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        padding: 'lg',
        radius: '2px',
      },
      styles: {
        root: {
          border: '1px solid #f0e1e4',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          borderColor: '#f0e1e4',
          '&:focus': {
            borderColor: '#f7c8d2',
          },
        },
      },
    },
  },
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.andieorozconails.com'),
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Andie Orozco's Nails",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Professional nail services by Andie Orozco",
  keywords: ["nails", "nail salon", "manicure", "pedicure", "nail art", "Andie Orozco"],
  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_NAME || "Andie Orozco's Nails",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Professional nail services by Andie Orozco",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.andieorozconails.com",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Andie Orozco's Nails",
    images: [
      {
        url: "/img/nails1.jpg",
        width: 1200,
        height: 630,
        alt: "Andie Orozco's Nail Art"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_SITE_NAME || "Andie Orozco's Nails",
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Professional nail services by Andie Orozco",
    images: ["/img/nails1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  
  return (
    <html lang={locale} className={`${playfair.variable} ${cormorant.variable} ${lato.variable}`}>
      <body>
        <NextIntlClientProvider>
          <MantineProvider theme={theme}>
            {children}
            <SpeedInsights />
            <Analytics />
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
