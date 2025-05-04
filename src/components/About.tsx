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
                mb="xl"
              >
                I&apos;m a passionate nail technician specializing in creating beautiful, custom nail designs that reflect your unique personality and style. With an eye for detail and a commitment to staying on top of the latest trends, I ensure that every client leaves with nails they love.
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6
                }}
                mb="md"
              >
                My journey into nail art began with a simple passion for creativity and self-expression. What started as a hobby quickly blossomed into a career as I realized how much joy I could bring to others through my nail designs.
              </Text>
              <Text 
                style={{ 
                  fontFamily: "var(--font-lato), sans-serif",
                  color: 'var(--text-color)',
                  lineHeight: 1.6
                }}
              >
                Whether you&apos;re looking for elegant simplicity or bold statement pieces, I work closely with each client to understand their vision and bring it to life. I believe that beautiful nails can boost confidence and bring a smile to your face every time you glance at your hands.
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
} 