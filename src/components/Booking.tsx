'use client';

import { Container, Text, Button, Box, Center, Modal, Group, ScrollArea } from '@mantine/core';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './Booking.module.css';

// Dynamically import Calendly components with no SSR to prevent hydration issues
const PopupModal = dynamic(
  () => import('react-calendly').then((mod) => mod.PopupModal),
  { ssr: false }
);

export function Booking() {
  // State management for modals
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  
  // Set root element on mount and calculate scrollbar width
  useEffect(() => {
    // Find the root element for Calendly modal
    setRootElement(document.getElementById('__next') || document.body);
    
    // Calculate scrollbar width and set it as a CSS variable to prevent layout shifts
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);
  
  // Disable scrolling when modal is open to prevent background scrolling
  useEffect(() => {
    if (isCalendlyOpen || isPoliciesOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      // Fix the body position to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Restore scroll position when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isCalendlyOpen, isPoliciesOpen]);
  
  // Modal handlers with useCallback for memoization
  const openPolicies = useCallback(() => setIsPoliciesOpen(true), []);
  const closePolicies = useCallback(() => setIsPoliciesOpen(false), []);
  
  // Open Calendly only after accepting policies
  const openCalendly = useCallback(() => {
    closePolicies();
    setIsCalendlyOpen(true);
  }, [closePolicies]);
  
  const closeCalendly = useCallback(() => setIsCalendlyOpen(false), []);
  
  return (
    <Box 
      id="book" 
      component="section"
      className={styles.bookingSection}
    >
      <Container size="xl">
        {/* Decorative elements */}
        <span className="decorative-flourish">♡</span>
        
        <SectionTitle>Book Your Appointment</SectionTitle>
        
        {/* Main booking card with CTA */}
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
              onClick={openPolicies}
              className={styles.bookButton}
            >
              Schedule Now
            </Button>
          </Center>
        </Box>
        
        <span className="decorative-flourish">❦</span>
        
        {/* Policies Modal - Shown before Calendly to display terms & policies */}
        <Modal
          opened={isPoliciesOpen}
          onClose={closePolicies}
          title="Booking Policy"
          size="lg"
          centered
          withCloseButton={false}
          classNames={{
            content: styles.policiesModalContent,
            header: styles.policiesModalHeader,
            title: styles.policiesModalTitle,
            close: styles.policiesModalClose
          }}
          scrollAreaComponent={ScrollArea.Autosize}
          withOverlay
          keepMounted={false}
          lockScroll
          withinPortal
        >
          <div className={styles.policiesContent}>
            <Text className={styles.policyHeader}>
              Thank you for choosing me to bring your nail vision to life 💖
            </Text>
            
            {/* Policy cards grid layout */}
            <div className={styles.policyGrid}>
              {/* Appointments policy */}
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>📅</div>
                <Text component="h3" className={styles.policyTitle}>Appointments</Text>
                <Text className={styles.policyText}>
                  Released 2 weeks in advance. Book early as spots fill quickly!
                </Text>
              </div>
              
              {/* Service hours policy */}
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>⏰</div>
                <Text component="h3" className={styles.policyTitle}>Service Hours</Text>
                <Text className={styles.policyText}>
                  Mon-Fri: 11:30am-7pm<br />
                  Sat: 9am-7pm<br />
                  (Closed Sun for rest & recharge!)
                </Text>
              </div>
              
              {/* Duration policy */}
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>⏳</div>
                <Text component="h3" className={styles.policyTitle}>Duration</Text>
                <Text className={styles.policyText}>
                  Services range from 2-4 hours depending on design complexity.
                </Text>
              </div>
              
              {/* Payment policy */}
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>💸</div>
                <Text component="h3" className={styles.policyTitle}>Payment</Text>
                <Text className={styles.policyText}>
                  Cash or Cash App only<br />
                  <span className={styles.policyHighlight}>$andieorozco</span>
                </Text>
              </div>
              
              {/* Deposit policy */}
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>💵</div>
                <Text component="h3" className={styles.policyTitle}>Deposit</Text>
                <Text className={styles.policyText}>
                  $15 non-refundable deposit required.<br />
                  Applied to final balance.
                </Text>
              </div>
              
              {/* Booking process policy */}
              <div className={styles.policyCard}>
                <div className={styles.policyIcon}>📥</div>
                <Text component="h3" className={styles.policyTitle}>Booking</Text>
                <Text className={styles.policyText}>
                  Use online booking only.<br />
                  DMs for questions and inspo only.
                </Text>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <Group justify="center" mt="md" className={styles.modalButtonContainer}>
            <Button 
              variant="default" 
              onClick={closePolicies} 
              className={styles.policiesDeclineButton}
            >
              Close
            </Button>
            <Button 
              color="pink.4" 
              onClick={openCalendly} 
              className={styles.policiesAcceptButton}
            >
              Accept & Continue
            </Button>
          </Group>
        </Modal>
        
        {/* Calendly Modal - Only shown after accepting policies */}
        {rootElement && (
          <PopupModal
            url="https://calendly.com/andieorozco2006?hide_gdpr_banner=1"
            onModalClose={closeCalendly}
            open={isCalendlyOpen}
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