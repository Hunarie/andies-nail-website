'use client';

import { Box, Container, Text, Group, ActionIcon, Flex } from '@mantine/core';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <Box 
      component="footer"
      className={styles.footer}
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
          className={styles.mobileContainer}
        >
          <Text className={styles.mobileLogo}>
            {process.env.NEXT_PUBLIC_SITE_NAME || "Andie's Nails"}
          </Text>
          <Text size="xs" className={styles.mobileText}>
            © {new Date().getFullYear()} All rights reserved.
          </Text>
        </Flex>

        {/* Desktop Footer */}
        <Group justify="space-between" align="center" visibleFrom="sm">
          <Group align="center" gap="xs">
            <Text className={styles.desktopLogo}>
              {process.env.NEXT_PUBLIC_SITE_NAME || "Andie's Nails"}
            </Text>
            <Text size="xs" className={styles.desktopText}>
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
              className={styles.socialIcon}
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
              className={styles.socialIcon}
            >
              <FaTiktok size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
} 