'use client';

import { Container, Grid, Card, Text, Badge, Group, Box, Center } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useState } from 'react';
import { CustomErrorBoundary } from '@/components/ui/ErrorBoundary';

const services = [
  {
    title: 'Gel Manicure',
    description: 'Long-lasting gel polish application that protects your natural nails and provides a glossy finish.',
    price: '$45',
    duration: '60 min',
    image: '/img/gel-manicure.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Gel+Manicure'
  },
  {
    title: 'Acrylic Full Set',
    description: 'Complete acrylic extension service with your choice of shape and design for stronger, longer nails.',
    price: '$65',
    duration: '90 min',
    image: '/img/acrylic.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Acrylic+Full+Set'
  },
  {
    title: 'Nail Art Design',
    description: 'Custom nail art ranging from simple patterns to elaborate designs, tailored to your preferences.',
    price: '$20+',
    duration: '30+ min',
    image: '/img/nail-art.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Nail+Art'
  },
  {
    title: 'Dip Powder',
    description: 'Odorless, durable nail enhancement using colored powder for a natural look with added strength.',
    price: '$55',
    duration: '75 min',
    image: '/img/dip-powder.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Dip+Powder'
  },
  {
    title: 'Pedicure Deluxe',
    description: 'Comprehensive foot care treatment with exfoliation, massage, and polish for rejuvenated feet.',
    price: '$60',
    duration: '60 min',
    image: '/img/pedicure.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Nail Repair',
    description: 'Quick fix for broken nails or lifting enhancements to restore shape and appearance.',
    price: '$15',
    duration: '20 min',
    image: '/img/nail-repair.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Nail+Repair'
  }
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      style={{
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#ffffff',
        height: '100%',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(247, 200, 210, 0.2)'
        }
      }}
    >
      <Card.Section>
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          {!imageError ? (
            <NextImage
              src={service.image}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
              alt={service.title}
              onError={handleImageError}
            />
          ) : (
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFC1E0',
                color: '#fff',
                fontSize: '1.2rem',
                fontFamily: 'var(--font-lato), sans-serif'
              }}
            >
              {service.title}
            </div>
          )}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            borderBottom: '4px solid var(--primary-pink)',
            opacity: 0.7 
          }} />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text 
          fw={600} 
          size="lg"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            color: 'var(--text-color)'
          }}
        >
          {service.title}
        </Text>
        <Badge 
          style={{
            backgroundColor: 'var(--primary-pink-light)',
            color: 'var(--text-color)',
            fontFamily: 'var(--font-lato), sans-serif',
            border: '1px solid var(--primary-pink)',
            padding: '4px 12px 6px',
            lineHeight: '1.4',
            display: 'inline-flex',
            alignItems: 'center',
            height: 'auto'
          }}
          size="lg"
        >
          {service.price}
        </Badge>
      </Group>

      <Text 
        size="sm"
        style={{
          fontFamily: 'var(--font-lato), sans-serif',
          lineHeight: 1.6,
          color: 'var(--text-color)'
        }}
      >
        {service.description}
      </Text>

      <Group mt="sm">
        <Badge 
          variant="outline"
          style={{
            borderColor: 'var(--accent-gold)',
            color: 'var(--text-color)',
            fontFamily: 'var(--font-lato), sans-serif',
            padding: '4px 12px 6px',
            lineHeight: '1.4',
            display: 'inline-flex',
            alignItems: 'center',
            height: 'auto'
          }}
        >
          {service.duration}
        </Badge>
      </Group>
    </Card>
  );
}

export function Services() {
  return (
    <Box 
      id="services" 
      component="section" 
      style={{ 
        backgroundColor: 'var(--background)',
        padding: 'var(--section-padding)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute', 
          right: '5%', 
          top: '15%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'var(--primary-pink-light)',
          opacity: 0.4,
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute', 
          left: '10%', 
          bottom: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--primary-pink-light)',
          opacity: 0.3,
          zIndex: 0
        }}
      />
      
      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Center>
          <SectionTitle>Our Services</SectionTitle>
        </Center>
        
        <CustomErrorBoundary message="Unable to load services. Please try again later.">
          <Grid gutter="xl">
            {services.map((service, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                <ServiceCard service={service} />
              </Grid.Col>
            ))}
          </Grid>
        </CustomErrorBoundary>
      </Container>
    </Box>
  );
} 