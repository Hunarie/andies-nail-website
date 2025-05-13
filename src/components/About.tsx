'use client';

import { Container, Text, Box, Grid } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './About.module.css';
import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations();

  return (
    <Box 
      id="about" 
      component="section"
      className={styles.aboutSection}
    >
      {/* Decorative elements */}
      <div className={styles.decorativeCircleTop} />
      <div className={styles.decorativeCircleBottom} />

      <Container size="xl" className={styles.container}>
        <SectionTitle>{t('about.title')}</SectionTitle>

        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box className={styles.imageWrapper}>
              <Box className={styles.imageBorder} />
              <div className={styles.imageContainer}>
                <NextImage
                  src="/img/andie-portrait.jpg"
                  alt="Andie the nail technician"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box>
              <Text 
                fz="xl" 
                fw={500}
                mb="md"
                className={styles.nameTitle}
              >
                {t('about.name')}
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                {t('about.greeting')}
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                {t('about.paragraph1')}
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                {t('about.paragraph2')}
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                {t('about.paragraph3')}
              </Text>
              <Text 
                className={styles.signature}
                mb="md"
              >
                {t('about.signature')}
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
} 