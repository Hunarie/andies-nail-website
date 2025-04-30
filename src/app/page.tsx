'use client';

import { Box } from '@mantine/core';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <Box>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </Box>
  );
}
