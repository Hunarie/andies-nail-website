'use client';

import { Title } from '@mantine/core';
import React from 'react';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <Title 
      className={`section-title ${styles.sectionTitle} ${className}`} 
      order={2} 
      ta="center" 
      mb={50}
    >
      {children}
      <div className={styles.titleUnderline} />
    </Title>
  );
} 