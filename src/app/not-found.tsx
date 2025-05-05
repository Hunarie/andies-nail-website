import Link from 'next/link';
import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <Container size="md" className={styles.container}>
      <Box mb={30}>
        <Title className={styles.errorCode}>
          404
        </Title>
        <Title
          order={2}
          className={styles.title}
        >
          Page Not Found
        </Title>
        <Text
          size="lg"
          mb="xl"
          className={styles.text}
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved or no longer exists.
        </Text>
        <Group justify="center">
          <Button
            component={Link}
            href="/"
            size="md"
            color="pink.4"
            className={styles.button}
          >
            Back to Home
          </Button>
        </Group>
      </Box>
      <div className={`decorative-flourish ${styles.decorativeFlourish}`}>❦</div>
    </Container>
  );
} 