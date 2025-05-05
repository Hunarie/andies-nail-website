'use client';

import { Box, Text, Button, Title, Container } from '@mantine/core';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import React from 'react';
import styles from './ErrorBoundary.module.css';

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
  message?: string;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      p="xl"
      className={styles.errorContainer}
    >
      <Container size="sm">
        <Title
          order={3}
          mb="md"
          className={styles.errorTitle}
        >
          Something went wrong
        </Title>
        
        <Text mb="lg" className={styles.errorText}>
          {error.message || "We're sorry, but there was an error loading this content."}
        </Text>
        
        <Button
          onClick={resetErrorBoundary}
          variant="filled"
          color="pink.4"
          className={styles.errorButton}
        >
          Try Again
        </Button>
      </Container>
    </Box>
  );
}

export function CustomErrorBoundary({ children, message }: CustomErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorFallback 
          error={message ? new Error(message) : error} 
          resetErrorBoundary={resetErrorBoundary} 
        />
      )}
      onReset={() => {
        // Reset the state of your app here
        console.log('Error boundary reset');
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
} 