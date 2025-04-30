import { Box } from '@mantine/core';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import dynamic from 'next/dynamic';

const Services = dynamic(() => import('@/components/Services').then(mod => mod.Services));
const About = dynamic(() => import('@/components/About').then(mod => mod.About));
const Booking = dynamic(() => import('@/components/Booking').then(mod => mod.Booking));
const Contact = dynamic(() => import('@/components/Contact').then(mod => mod.Contact));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

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
