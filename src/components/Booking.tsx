'use client';

import { Container, Text, Button, Box, Center } from '@mantine/core';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './Booking.module.css';

// Dynamically import Calendly components with no SSR
const PopupModal = dynamic(
  () => import('react-calendly').then((mod) => mod.PopupModal),
  { ssr: false }
);

export function Booking() {
  const [isOpen, setIsOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  
  // Set root element on mount and calculate scrollbar width
  useEffect(() => {
    setRootElement(document.getElementById('__next') || document.body);
    
    // Calculate scrollbar width and set it as a CSS variable
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);
  
  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      // Add no-scroll class to body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isOpen]);
  
  // Open the Calendly popup
  const openCalendly = useCallback(() => setIsOpen(true), []);
  
  // Close the Calendly popup
  const closeCalendly = useCallback(() => setIsOpen(false), []);
  
  return (
    <Box 
      id="book" 
      component="section"
      className={styles.bookingSection}
    >
      <Container size="xl">
        <span className="decorative-flourish">♡</span>
        
        <SectionTitle>Book Your Appointment</SectionTitle>
        
        <Box className={`decorative-border ${styles.bookingCard}`} maw={800} mx="auto" py={30} px={40} mb={40}>
          <Text size="xl" mx="auto" mb={30} className={styles.bookingText}>
            Schedule your appointment now using my online booking system. 
            Choose the service, date, and time that works best for you.
          </Text>
          
          <Center>
            <Button 
              size="lg" 
              radius="sm" 
              color="pink.4"
              onClick={openCalendly}
              className={styles.bookButton}
            >
              Schedule Now
            </Button>
          </Center>
        </Box>
        
        <span className="decorative-flourish">❦</span>
        
        {rootElement && (
          <PopupModal
            url="https://calendly.com/andieorozco2006?hide_gdpr_banner=1"
            onModalClose={closeCalendly}
            open={isOpen}
            rootElement={rootElement}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: 'ff85a2', // Pink color to match the theme
              textColor: '4d5055'
            }}
            prefill={{
              email: '',
              firstName: '',
              lastName: '',
              name: ''
            }}
          />
        )}
      </Container>
    </Box>
  );
} 