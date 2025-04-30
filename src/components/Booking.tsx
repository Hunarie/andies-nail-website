'use client';

import { Container, Text, Button, Box, Center } from '@mantine/core';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SectionTitle } from '@/components/ui/SectionTitle';

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
      style={{ 
        backgroundColor: 'var(--hero-bg)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container size="xl">
        <span className="decorative-flourish">♡</span>
        
        <SectionTitle>Book Your Appointment</SectionTitle>
        
        <Box className="decorative-border" maw={800} mx="auto" py={30} px={40} mb={40} style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
        }}>
          <Text size="xl" mx="auto" mb={30} style={{ 
            fontFamily: "var(--font-cormorant), serif", 
            fontSize: '1.4rem',
            lineHeight: 1.6
          }}>
            Ready to transform your nails? Schedule your appointment now using my online booking system. 
            Choose the service, date, and time that works best for you.
          </Text>
          
          <Center>
            <Button 
              size="lg" 
              radius="sm" 
              color="pink.4"
              onClick={openCalendly}
              style={{
                fontFamily: "var(--font-lato), sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: '1px solid var(--primary-pink-dark)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                padding: '0 2rem',
                height: '3rem'
              }}
            >
              Schedule Now
            </Button>
          </Center>
        </Box>
        
        <span className="decorative-flourish">❦</span>
        
        {rootElement && (
          <PopupModal
            url="https://calendly.com/jleeman2000"
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