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
  },
  {
    src: '/img/nails3.jpg',
    alt: 'Elegant nail art',
    caption: 'Luxury Nail Experience'
  },
  {
    src: '/img/nails4.jpg',
    alt: 'Nail salon workspace',
  }
];

export function Hero() {
  return (
    <Box 
      id="home" 
      style={{ 
        backgroundColor: 'var(--hero-bg)',
        paddingTop: '2rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div 
        className="hero-decorative-element"
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
        className="hero-decorative-element"
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
            gap: '2rem',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2.5rem',
            position: 'relative'
          }}
          className="hero-content"
        >
          <span className="decorative-flourish">✦ ✧ ✦</span>
          
          <Title
            order={1}
            size="2.5rem"
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
          
          <Text 
            size="lg"
            maw={700} 
            mx="auto" 
            style={{ lineHeight: 1.7 }}
            className="hero-description"
          >
            Premium nail services that combine creativity, precision, and luxury.
            Experience the best in nail artistry with personalized designs.
          </Text>
          
          <Button
            component="a"
            href="#book"
            size="md"
            radius="sm"
            color="pink.4"
            style={{ 
              marginTop: '0.5rem', 
              padding: '0 2rem', 
              height: '2.8rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.07)'
            }}
            className="hero-button"
          >
            Book Your Appointment
          </Button>
          
          <span className="decorative-flourish">❦</span>
        </Box>

        <Box
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0',
            backgroundColor: 'var(--hero-bg)'
          }}
        >
          <Carousel
            withIndicators
            height={450}
            loop
            align="center"
            slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
            slideGap={{ base: 0, sm: "xs", md: "sm" }}
            controlsOffset="md"
            styles={{
              root: {
                boxShadow: 'none',
                backgroundColor: 'transparent',
              },
              viewport: {
                backgroundColor: 'transparent',
              },
              container: {
                backgroundColor: 'transparent',
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
                '@media (maxWidth: 768px)': {
                  display: 'none',
                },
                '&:hover': {
                  backgroundColor: 'var(--primary-pink-light)',
                }
              }
            }}
          >
            {carouselImages.map((image, index) => (
              <Carousel.Slide key={index}>
                <Box className="hero-carousel-slide">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 450px"
                      className="hero-carousel-image"
                      priority={index === 0}
                    />
                  </div>
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
} 