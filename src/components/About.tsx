import { Container, Title, Text, Image, Grid, List, ThemeIcon, Box } from '@mantine/core';
import { TbCheckbox } from 'react-icons/tb';

export function About() {
  return (
    <Box 
      id="about" 
      component="section"
      style={{ 
        backgroundColor: '#FAFAFA' 
      }}
    >
      <Container size="xl">
        <Title className="section-title" order={2} ta="center" mb={50}>
          About Andie
        </Title>
        
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box style={{ maxWidth: '100%', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%', 
                border: '2px solid var(--primary-pink)',
                borderRadius: '10px',
                top: '15px',
                left: '15px',
                zIndex: 0
              }} />
              <Image
                src="/img/andie-profile.jpg"
                fallbackSrc="https://placehold.co/600x800/FFC1E0/fff?text=Andie+Orozco"
                alt="Andie Orozco - Nail Artist"
                radius="md"
                style={{ 
                  maxWidth: '100%',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Text size="lg" mb="md" style={{ lineHeight: 1.7 }}>
              Hello! I'm Andie Orozco, a passionate nail artist dedicated to bringing your nail visions to life. With over 5 years of experience in the industry, I specialize in creating beautiful, long-lasting nail designs that express your unique style.
            </Text>
            
            <Text size="lg" mb="md" style={{ lineHeight: 1.7 }}>
              My journey in nail artistry began from a young age when I discovered my creative passion for detailed designs and color combinations. I've since completed extensive training and certification in various nail techniques and continually stay up-to-date with the latest trends.
            </Text>
            
            <Text size="lg" mb="xl" style={{ lineHeight: 1.7 }}>
              My goal is to provide not just a service, but a relaxing, enjoyable experience that leaves you feeling confident and beautiful with nails that turn heads.
            </Text>

            <Title order={3} size="h4" mb="md">
              My Approach
            </Title>
            
            <List
              spacing="md"
              size="lg"
              center
              icon={
                <ThemeIcon color="pink" size={24} radius="xl">
                  <TbCheckbox style={{ width: '16px', height: '16px' }} />
                </ThemeIcon>
              }
            >
              <List.Item>Personalized consultations to understand your style</List.Item>
              <List.Item>Premium, high-quality products for lasting results</List.Item>
              <List.Item>Meticulous attention to detail in every design</List.Item>
              <List.Item>Clean, sanitized environment and tools for your safety</List.Item>
              <List.Item>Continuous education to offer the latest techniques</List.Item>
            </List>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
} 