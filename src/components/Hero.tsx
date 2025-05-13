'use client';

import { Container, Title, Text, Button, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import NextImage from 'next/image';
import styles from './Hero.module.css';
import { scrollToElementCentered } from '@/utils/scroll';

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
  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Always center the booking section, regardless of device
    scrollToElementCentered('book');
  };

  return (
    <Box 
      id="home" 
      className={styles.heroContainer}
    >
      {/* Decorative elements */}
      <div 
        className={`${styles.decorativeElement} ${styles.decorativeElementTop}`}
      >
        ✿
      </div>
      <div 
        className={`${styles.decorativeElement} ${styles.decorativeElementBottom}`}
      >
        ❀
      </div>
      
      <Container size="xl">
        <Box className={styles.heroContent}>
          <span className="decorative-flourish">✦ ✧ ✦</span>
          
          <Title
            order={1}
            size="2.5rem"
            className={styles.heroTitle}
          >
            Where Detail Meets Design
          </Title>
          
          <Text 
            size="lg"
            maw={700} 
            mx="auto" 
            className={styles.heroDescription}
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
            className={styles.heroButton}
            onClick={handleBookClick}
          >
            Book Your Appointment
          </Button>
          
          <span className="decorative-flourish">❦</span>
        </Box>

        <Box className={styles.carouselContainer}>
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
                <Box className={styles.carouselSlideWrapper}>
                  {image.caption && (
                    <div className={styles.carouselCaption}>
                      <Text 
                        size="xl" 
                        fw={500} 
                        className={styles.captionText}
                      >
                        {image.caption}
                      </Text>
                    </div>
                  )}
                  <div className={styles.carouselSlide}>
                    <NextImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 450px"
                      className={styles.carouselImage}
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