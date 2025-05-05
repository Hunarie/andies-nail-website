'use client';

import { Container, Text, Box, Grid } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './About.module.css';

export function About() {
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
        <SectionTitle>About Me</SectionTitle>

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
                Andie Orozco
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                Hi, I&apos;m Andie Orozco! Founder of Andie Orozco&apos;s Nails.
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                My journey started in 2021, when I couldn&apos;t find a salon that took the time to create the detailed, creative nail designs I dreamed of. Tired of rushed appointments and limited options, I started doing my own nails to express my personal style.
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                Soon, friends and followers began noticing my work — and asking me to do theirs too. What began as a personal passion has now grown into a business rooted in creativity and quality service.
              </Text>
              <Text 
                className={styles.textParagraph}
                mb="md"
              >
                My goal is giving every client a personalized experience that leaves them feeling seen, confident, and proud of their look! Whether it&apos;s a minimalist set or a bold, artistic design — your nails deserve time, care, and creativity. I&apos;m here to deliver just that!
              </Text>
              <Text 
                className={styles.signature}
                mb="md"
              >
                ~ Andie Orozco ❤
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
} 