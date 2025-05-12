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
  
  // Set root element on mount
  useEffect(() => {
    setRootElement(document.getElementById('__next') || document.body);
  }, []);
  
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