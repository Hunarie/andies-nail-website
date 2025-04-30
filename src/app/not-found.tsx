import Link from 'next/link';
import { Container, Title, Text, Button, Group, Box } from '@mantine/core';

export default function NotFound() {
  return (
    <Container size="md" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '3rem 1rem',
      textAlign: 'center'
    }}>
      <Box mb={30}>
        <Title
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '3rem',
            color: 'var(--primary-pink-dark)',
            marginBottom: '1rem'
          }}
        >
          404
        </Title>
        <Title
          order={2}
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '2rem',
            color: 'var(--text-color)',
            marginBottom: '1.5rem'
          }}
        >
          Page Not Found
        </Title>
        <Text
          size="lg"
          mb="xl"
          style={{
            fontFamily: 'var(--font-lato), sans-serif',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved or no longer exists.
        </Text>
        <Group justify="center">
          <Button
            component={Link}
            href="/"
            size="md"
            color="pink.4"
            style={{
              fontFamily: 'var(--font-lato), sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid var(--primary-pink-dark)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
            }}
          >
            Back to Home
          </Button>
        </Group>
      </Box>
      <div className="decorative-flourish" style={{ marginTop: '2rem', fontSize: '2rem' }}>❦</div>
    </Container>
  );
} 