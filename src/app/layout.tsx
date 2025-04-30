import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Create custom theme with pink salon-like colors
const theme = createTheme({
  primaryColor: 'pink',
  colors: {
    pink: [
      '#FFF5F8',
      '#FFECF2',
      '#FFE2EC',
      '#FFD8E6',
      '#FFCEE0',
      '#FFBAD2',
      '#FFACC8',
      '#FFA5C0',
      '#FF9BB6',
      '#FF91AD',
    ],
  },
});

export const metadata: Metadata = {
  title: "Andie Orozco's Nails",
  description: "Professional nail services by Andie Orozco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
