import { useState, useEffect } from 'react';
import { Container, Title, Text, Button, Box, Center, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { InlineWidget } from 'react-calendly';

export function Booking() {
  const [mounted, setMounted] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  // Handle client-side rendering for Calendly
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box 
      id="book" 
      component="section"
      style={{ 
        backgroundColor: 'var(--hero-bg)',
        textAlign: 'center'
      }}
    >
      <Container size="xl">
        <Title className="section-title" order={2} ta="center" mb={30}>
          Book Your Appointment
        </Title>
        
        <Text size="lg" maw={700} mx="auto" mb={40}>
          Ready to transform your nails? Schedule your appointment now using my online booking system. 
          Choose the service, date, and time that works best for you.
        </Text>
        
        <Center>
          <Button 
            size="lg" 
            radius="xl" 
            color="pink"
            onClick={open}
          >
            Schedule Now
          </Button>
        </Center>
        
        <Modal
          opened={opened}
          onClose={close}
          title="Book Your Appointment"
          size="xl"
          centered
          padding="lg"
        >
          {mounted && (
            <InlineWidget
              url="https://calendly.com/your-calendly-link"
              styles={{ height: '650px' }}
            />
          )}
        </Modal>
      </Container>
    </Box>
  );
} 