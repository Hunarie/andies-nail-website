import { Container, Title, Text, Button, Group, Box, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

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
        paddingTop: '2rem',
        paddingBottom: '4rem'
      }}
    >
      <Container size="xl">
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <Title
            order={1}
            size="3rem"
            style={{
              color: 'var(--primary-pink-dark)',
              lineHeight: 1.2
            }}
            className="hero-title"
          >
            Elevate Your Nail Game with Andie Orozco
          </Title>
          
          <Text size="xl" maw={700} mx="auto" style={{ lineHeight: 1.6 }}>
            Premium nail services that combine creativity, precision, and luxury.
            Experience the best in nail artistry with personalized designs.
          </Text>
          
          <Button
            component="a"
            href="#book"
            size="lg"
            radius="xl"
            color="pink"
            style={{ marginTop: '1rem' }}
          >
            Book Your Appointment
          </Button>
        </Box>

        <Carousel
          withIndicators
          height={500}
          loop
          align="center"
          slideSize="70%"
          slideGap="md"
          controlsOffset="xs"
          styles={{
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
          }}
        >
          {carouselImages.map((image, index) => (
            <Carousel.Slide key={index}>
              <Box style={{ position: 'relative', height: '100%', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '20px', 
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <Text size="xl" fw={600} className="carousel-caption">{image.caption}</Text>
                </div>
                <Image
                  src={image.src}
                  alt={image.alt}
                  radius="md"
                  fallbackSrc="https://placehold.co/800x500/FFC1E0/fff?text=Beautiful+Nails"
                  style={{ 
                    height: '100%', 
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
} 