'use client';

import { Container, Grid, Card, Text, Badge, Group, Box, Center } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useState } from 'react';
import { CustomErrorBoundary } from '@/components/ui/ErrorBoundary';
import styles from './Services.module.css';
import { useTranslations } from 'next-intl';

const serviceKeys = [
  'gelXShort',
  'gelXMedium',
  'gelXLong',
  'gelXRemoval',
  'nailCleanup',
  'gelManicure'
];

const serviceImages = [
  {
    key: 'gelXShort',
    src: '/img/gel-x-short-set.jpg',
    alt: 'Gel-X Short Set',
    placeholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Gel-X+Short'
  },
  {
    key: 'gelXMedium',
    src: '/img/gel-x-medium-set.jpg',
    alt: 'Gel-X Medium Set',
    placeholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Gel-X+Medium'
  },
  {
    key: 'gelXLong',
    src: '/img/gel-x-long-set.jpg',
    alt: 'Gel-X Long Set',
    placeholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Gel-X+Long'
  },
  {
    key: 'gelXRemoval',
    src: '/img/removal-acetone-soak-off.jpg',
    alt: 'Gel-X Removal',
    placeholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Removal'
  },
  {
    key: 'nailCleanup',
    src: '/img/nail-cleanup.jpg',
    alt: 'Nail Cleanup',
    placeholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Cleanup'
  },
  {
    key: 'gelManicure',
    src: '/img/gel-manicure.jpg',
    alt: 'Gel Manicure',
    placeholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Gel+Manicure'
  }
];

function ServiceCard({ serviceKey }: { serviceKey: string }) {
  const t = useTranslations();
  const [imageError, setImageError] = useState(false);
  const image = serviceImages.find(img => img.key === serviceKey);

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
          {!imageError && image ? (
            <NextImage
              src={image.src}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
              alt={image.alt}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              {t(`services.items.${serviceKey}.title`)}
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
          {t(`services.items.${serviceKey}.title`)}
        </Text>
        <Badge 
          className={styles.priceBadge}
          size="lg"
        >
          {t(`services.items.${serviceKey}.price`)}
        </Badge>
      </Group>

      <Text 
        size="sm"
        className={styles.serviceDescription}
      >
        {t(`services.items.${serviceKey}.description`)}
      </Text>

      <Group mt="sm">
        <Badge 
          variant="outline"
          className={styles.durationBadge}
        >
          {t(`services.items.${serviceKey}.duration`)}
        </Badge>
      </Group>
    </Card>
  );
}

export function Services() {
  const t = useTranslations();
  
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
          <SectionTitle>{t('services.title')}</SectionTitle>
        </Center>
        
        <CustomErrorBoundary message="Unable to load services. Please try again later.">
          <Grid gutter="xl">
            {serviceKeys.map((serviceKey, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                <ServiceCard serviceKey={serviceKey} />
              </Grid.Col>
            ))}
          </Grid>
        </CustomErrorBoundary>
      </Container>
    </Box>
  );
} 