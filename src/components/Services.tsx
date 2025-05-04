'use client';

import { Container, Grid, Card, Text, Badge, Group, Box, Center } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useState } from 'react';
import { CustomErrorBoundary } from '@/components/ui/ErrorBoundary';

const services = [
  {
    title: 'Gel-X Short Set',
    description: 'Soft gel extension system that provides a natural-looking, longer nail. It combines the flexibility of gel polish with the strength of traditional acrylics.',
    price: 'Starting at $50',
    duration: 'Approx. 2 hours',
    image: '/img/gel-x-short-set.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Gel-X Medium Set',
    description: 'Soft gel extension system that provides a natural-looking, longer nail. It combines the flexibility of gel polish with the strength of traditional acrylics.',
    price: 'Starting at $60',
    duration: 'Approx. 2 hrs 30 min',
    image: '/img/gel-x-medium-set.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Gel-X Long Set',
    description: 'Soft gel extension system that provides a natural-looking, longer nail. It combines the flexibility of gel polish with the strength of traditional acrylics.',
    price: 'Starting at $70',
    duration: 'Approx. 2 hrs 50 min',
    image: '/img/gel-x-long-set.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Removal (Acetone Soak-Off)',
    description: 'Product removal using an acetone soak and gentle buffing, completed with cuticle care.',
    price: '$20',
    duration: 'Approx. 45 min',
    image: '/img/removal-acetone-soak-off.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Nail Cleanup',
    description: 'Light shaping, buffing, and a full cuticle cleanup, finished with cuticle oil and an optional clear top coat.',
    price: '$30',
    duration: 'Approx. 45 min',
    image: '/img/nail-cleanup.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Gel Manicure',
    description: 'Full prep, cuticle work, and basic gel polish application, focusing on nail health with minimal damage.',
    price: '$40',
    duration: 'Approx. 1 hrs 30 min',
    image: '/img/gel-manicure.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
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
            height: 'auto',
            textTransform: 'none'
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
            height: 'auto',
            textTransform: 'none'
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
          <SectionTitle>My Services</SectionTitle>
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