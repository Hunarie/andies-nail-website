'use client';

import { Container, Title, Text, Button, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import NextImage from 'next/image';

const carouselImages = [
  {
    src: '/img/nails1.jpg',
    alt: 'Stylish pink nail design',
    caption: 'Creative and Trendy Designs'
  },
  {
    src: '/img/nails2.jpg',
    alt: 'Nail salon workspace',
    caption: 'Professional Nail Services'
  },
  {
    src: '/img/nails3.jpg',
    alt: 'Elegant nail art',
    caption: 'Luxury Nail Experience'
  }
];

export function Hero() {
  return (
    <Box 
      id="home" 
      style={{ 
        backgroundColor: 'var(--hero-bg)',
        paddingTop: '3rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute', 
          top: 40, 
          left: 20, 
          fontSize: '2rem',
          color: 'var(--primary-pink-light)',
          opacity: 0.5
        }}
      >
        ✿
      </div>
      <div 
        style={{
          position: 'absolute', 
          bottom: 60, 
          right: 40, 
          fontSize: '2.5rem',
          color: 'var(--primary-pink-light)',
          opacity: 0.5
        }}
      >
        ❀
      </div>
      
      <Container size="xl">
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem',
            position: 'relative'
          }}
        >
          <span className="decorative-flourish">✦ ✧ ✦</span>
          
          <Title
            order={1}
            size="3.2rem"
            style={{
              color: 'var(--primary-pink-dark)',
              lineHeight: 1.2,
              fontStyle: 'italic',
              fontWeight: 500
            }}
            className="hero-title"
          >
            Elevate Your Nail Game with Andie Orozco
          </Title>
          
          <Text size="xl" maw={700} mx="auto" style={{ lineHeight: 1.7, fontSize: '1.3rem' }}>
            Premium nail services that combine creativity, precision, and luxury.
            Experience the best in nail artistry with personalized designs.
          </Text>
          
          <Button
            component="a"
            href="#book"
            size="lg"
            radius="sm"
            color="pink.4"
            style={{ 
              marginTop: '1rem', 
              padding: '0 2rem', 
              height: '3rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.07)'
            }}
          >
            Book Your Appointment
          </Button>
          
          <span className="decorative-flourish">❦</span>
        </Box>

        <Carousel
          withIndicators
          height={550}
          loop
          align="center"
          slideSize="70%"
          slideGap="md"
          controlsOffset="md"
          styles={{
            root: {
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)'
            },
            indicators: {
              bottom: -40,
            },
            indicator: {
              width: 12,
              height: 4,
              transition: 'width 250ms ease',
              backgroundColor: 'var(--primary-pink-light)',
              
              '&[dataActive]': {
                width: 40,
                backgroundColor: 'var(--primary-pink)',
              },
            },
            control: {
              backgroundColor: 'white',
              color: 'var(--primary-pink-dark)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'var(--primary-pink-light)',
              }
            }
          }}
        >
          {carouselImages.map((image, index) => (
            <Carousel.Slide key={index}>
              <Box style={{ 
                position: 'relative', 
                height: '100%', 
                borderRadius: '2px', 
                overflow: 'hidden',
                border: '1px solid var(--border-color)' 
              }}>
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '26px 20px', 
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)',
                  color: 'white',
                  textAlign: 'center',
                  zIndex: 10
                }}>
                  <Text 
                    size="xl" 
                    fw={500} 
                    className="carousel-caption"
                    style={{ 
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: '1.5rem',
                      fontStyle: 'italic'
                    }}
                  >
                    {image.caption}
                  </Text>
                </div>
                <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                  <NextImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 70vw"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </div>
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
} 