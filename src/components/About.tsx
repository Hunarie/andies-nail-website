'use client';

import { Container, Text, Box, Grid } from '@mantine/core';
import NextImage from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function About() {
  return (
    <Box 
      id="about" 
      component="section"
      style={{ 
        backgroundColor: 'var(--header-bg)',
        padding: 'var(--section-padding)', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute', 
          top: -30, 
          left: 100, 
          width: 180, 
          height: 180, 
          borderRadius: '50%', 
          background: 'var(--primary-pink-light)', 
          opacity: 0.4,
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute', 
          bottom: 50, 
          right: 80, 
          width: 120, 
          height: 120, 
          borderRadius: '50%', 
          background: 'var(--primary-pink-light)', 
          opacity: 0.3,
          zIndex: 1
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
        <SectionTitle>About Me</SectionTitle>

        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                position: 'relative',
                paddingBottom: '30px',
                paddingRight: '30px'
              }}
            >
              <Box 
                style={{
                  position: 'absolute',
                  top: 30,
                  left: 30,
                  right: 0,
                  bottom: 0,
                  border: '1px solid var(--primary-pink-light)',
                  borderRadius: '8px',
                  zIndex: 1
                }}
              />
              <div style={{ position: 'relative', aspectRatio: '3/4', zIndex: 2 }}>
                <NextImage
                  src="/img/andie-portrait.jpg"
                  alt="Andie the nail technician"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                  }}
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
                style={{ 
                  fontFamily: "var(--font-playfair), serif",
                  color: 'var(--primary-pink-dark)'
                }}
              >
                Andie Orozco
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6
                }}
                mb="md"
              >
                Hi, I&apos;m Andie Orozco! Founder of Andie Orozco&apos;s Nails.
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6
                }}
                mb="md"
              >
                My journey started in 2021, when I couldn&apos;t find a salon that took the time to create the detailed, creative nail designs I dreamed of. Tired of rushed appointments and limited options, I started doing my own nails to express my personal style.
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6
                }}
                mb="md"
              >
                Soon, friends and followers began noticing my work — and asking me to do theirs too. What began as a personal passion has now grown into a business rooted in creativity and quality service.
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6
                }}
                mb="md"
              >
                My goal is giving every client a personalized experience that leaves them feeling seen, confident, and proud of their look! Whether it&apos;s a minimalist set or a bold, artistic design — your nails deserve time, care, and creativity. I&apos;m here to deliver just that!
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6,
                  opacity: 0.4
                }}
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