import { Container, Title, Grid, Card, Text, Badge, Group, Box, Image } from '@mantine/core';

const services = [
  {
    title: 'Gel Manicure',
    description: 'Long-lasting gel polish application that protects your natural nails and provides a glossy finish.',
    price: '$45',
    duration: '60 min',
    image: '/img/gel-manicure.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Gel+Manicure'
  },
  {
    title: 'Acrylic Full Set',
    description: 'Complete acrylic extension service with your choice of shape and design for stronger, longer nails.',
    price: '$65',
    duration: '90 min',
    image: '/img/acrylic.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Acrylic+Full+Set'
  },
  {
    title: 'Nail Art Design',
    description: 'Custom nail art ranging from simple patterns to elaborate designs, tailored to your preferences.',
    price: '$20+',
    duration: '30+ min',
    image: '/img/nail-art.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Nail+Art'
  },
  {
    title: 'Dip Powder',
    description: 'Odorless, durable nail enhancement using colored powder for a natural look with added strength.',
    price: '$55',
    duration: '75 min',
    image: '/img/dip-powder.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Dip+Powder'
  },
  {
    title: 'Pedicure Deluxe',
    description: 'Comprehensive foot care treatment with exfoliation, massage, and polish for rejuvenated feet.',
    price: '$60',
    duration: '60 min',
    image: '/img/pedicure.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Pedicure'
  },
  {
    title: 'Nail Repair',
    description: 'Quick fix for broken nails or lifting enhancements to restore shape and appearance.',
    price: '$15',
    duration: '20 min',
    image: '/img/nail-repair.jpg',
    imagePlaceholder: 'https://placehold.co/600x400/FFC1E0/fff?text=Nail+Repair'
  }
];

export function Services() {
  return (
    <Box 
      id="services" 
      component="section" 
      style={{ 
        backgroundColor: 'white'
      }}
    >
      <Container size="xl">
        <Title className="section-title" order={2} ta="center" mb={50}>
          Our Services
        </Title>
        
        <Grid gutter="xl">
          {services.map((service, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={service.imagePlaceholder}
                    height={200}
                    alt={service.title}
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={600} size="lg">{service.title}</Text>
                  <Badge color="pink" variant="light" size="lg">
                    {service.price}
                  </Badge>
                </Group>

                <Text size="sm">
                  {service.description}
                </Text>

                <Group mt="sm">
                  <Badge color="gray" variant="outline">
                    {service.duration}
                  </Badge>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 