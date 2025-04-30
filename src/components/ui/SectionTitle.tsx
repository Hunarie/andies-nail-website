'use client';

import { Title } from '@mantine/core';
import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <Title 
      className={`section-title ${className}`} 
      order={2} 
      ta="center" 
      mb={50}
      style={{ 
        fontFamily: "var(--font-playfair), serif",
        fontSize: '2.5rem',
        color: 'var(--text-color)',
        position: 'relative',
        display: 'inline-block',
        padding: '0 15px'
      }}
    >
      {children}
      <div style={{
        position: 'absolute',
        bottom: -10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '2px',
        background: 'var(--primary-pink)',
        borderRadius: '2px'
      }} />
    </Title>
  );
} 