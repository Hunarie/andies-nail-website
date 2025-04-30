'use client';

import { Box, Container, Text, Group, ActionIcon, Flex } from '@mantine/core';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export function Footer() {
  return (
    <Box 
      component="footer"
      style={{ 
        backgroundColor: 'var(--hero-bg)',
        padding: '1rem 0',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <Container size="xl">
        {/* Mobile Footer */}
        <Flex 
          direction="row" 
          justify="center" 
          align="center" 
          gap={4}
          hiddenFrom="sm"
          wrap="nowrap"
          style={{ overflow: 'hidden' }}
        >
          <Text 
            style={{ 
              color: 'var(--primary-pink-dark)',
              fontSize: '1rem',
              fontFamily: 'var(--font-playfair), serif',
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
          </Text>
          <Text 
            size="xs" 
            style={{ 
              color: 'var(--foreground)', 
              fontFamily: 'var(--font-lato), sans-serif',
              whiteSpace: 'nowrap',
              fontSize: '0.7rem'
            }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </Text>
        </Flex>

        {/* Desktop Footer */}
        <Group justify="space-between" align="center" visibleFrom="sm">
          <Group align="center" gap="xs">
            <Text 
              style={{ 
                color: 'var(--primary-pink-dark)',
                fontSize: '1.5rem',
                marginRight: '10px',
                fontFamily: 'var(--font-playfair), serif',
                fontStyle: 'italic'
              }}
            >
              {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
            </Text>
            <Text 
              size="xs" 
              style={{ 
                color: 'var(--foreground)', 
                fontFamily: 'var(--font-lato), sans-serif'
              }}
            >
              © {new Date().getFullYear()} All rights reserved.
            </Text>
          </Group>
          
          <Group gap={10} visibleFrom="sm">
            <ActionIcon 
              size="md" 
              variant="filled" 
              color="pink.4"
              component="a"
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
              target="_blank"
              aria-label="Instagram"
              style={{
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <FaInstagram size={18} />
            </ActionIcon>
            <ActionIcon 
              size="md" 
              variant="filled" 
              color="pink.4"
              component="a"
              href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"}
              target="_blank"
              aria-label="TikTok"
              style={{
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <FaTiktok size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
} 