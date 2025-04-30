'use client';

import { Box, Text, Button, Title, Container } from '@mantine/core';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import React from 'react';

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
  message?: string;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      p="xl"
      style={{
        textAlign: 'center',
        backgroundColor: 'var(--background)',
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        margin: '1rem 0',
      }}
    >
      <Container size="sm">
        <Title
          order={3}
          mb="md"
          style={{ 
            fontFamily: "var(--font-playfair), serif",
            color: 'var(--primary-pink-dark)'
          }}
        >
          Something went wrong
        </Title>
        
        <Text mb="lg" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
          {error.message || "We're sorry, but there was an error loading this content."}
        </Text>
        
        <Button
          onClick={resetErrorBoundary}
          variant="filled"
          color="pink.4"
          style={{
            fontFamily: "var(--font-lato), sans-serif",
          }}
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