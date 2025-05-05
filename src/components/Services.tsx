'use client';

import { Container, Grid, Card, Text, Badge, Group, Box, Center } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useState } from 'react';
import { CustomErrorBoundary } from '@/components/ui/ErrorBoundary';
import styles from './Services.module.css';

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
    title: 'Gel-X Removal (Acetone Soak-Off)',
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
      className={styles.serviceCard}
    >
      <Card.Section>
        <div className={styles.imageContainer}>
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
            <div className={styles.imagePlaceholder}>
              {service.title}
            </div>
          )}
          <div className={styles.imageBorder} />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text 
          fw={600} 
          size="lg"
          className={styles.serviceTitle}
        >
          {service.title}
        </Text>
        <Badge 
          className={styles.priceBadge}
          size="lg"
        >
          {service.price}
        </Badge>
      </Group>

      <Text 
        size="sm"
        className={styles.serviceDescription}
      >
        {service.description}
      </Text>

      <Group mt="sm">
        <Badge 
          variant="outline"
          className={styles.durationBadge}
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
      className={styles.servicesSection}
    >
      {/* Decorative elements */}
      <div className={styles.decorativeCircleTop} />
      <div className={styles.decorativeCircleBottom} />
      
      <Container size="xl" className={styles.container}>
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