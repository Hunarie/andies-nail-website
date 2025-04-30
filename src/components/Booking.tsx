'use client';

import { Container, Text, Button, Box, Center, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { SectionTitle } from '@/components/ui/SectionTitle';

// Dynamically import the Calendly widget with no SSR
const InlineWidget = dynamic(
  () => import('react-calendly').then((mod) => mod.InlineWidget),
  { ssr: false }
);

export function Booking() {
  const [opened, { open, close }] = useDisclosure(false);
  
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
              onClick={open}
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
        
        <Modal
          opened={opened}
          onClose={close}
          title="Book Your Appointment"
          size="xl"
          fullScreen
          centered
          padding={0}
          styles={{
            header: {
              borderBottom: '1px solid var(--border-color)',
              padding: '15px',
              position: 'static',
              zIndex: 'auto',
              backgroundColor: 'white',
              height: '70px',
              minHeight: '70px',
              maxHeight: '70px'
            },
            title: {
              fontFamily: "var(--font-playfair), serif",
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'var(--primary-pink-dark)',
              textAlign: 'center',
              width: '100%'
            },
            close: {
              color: 'var(--primary-pink-dark)',
              '&:hover': {
                backgroundColor: 'var(--primary-pink-light)'
              }
            },
            body: {
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              height: 'calc(100vh - 70px)' // 100vh minus header height
            },
            inner: {
              padding: 0
            },
            content: {
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              maxWidth: '100%',
              width: '100%',
              margin: 0,
              borderRadius: 0,
              overflow: 'hidden'
            },
            root: {
              height: '100vh',
              overflow: 'hidden'
            }
          }}
          transitionProps={{ duration: 200 }}
        >
          <Box style={{ 
            height: 'calc(100vh - 70px)', // 100vh minus header height
            width: '100%',
            overflow: 'hidden'
          }}>
            <InlineWidget
              url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/jleeman2000"}
              styles={{ 
                height: '100%', 
                width: '100%',
                minHeight: '100%'
              }}
            />
          </Box>
        </Modal>
      </Container>
    </Box>
  );
} 