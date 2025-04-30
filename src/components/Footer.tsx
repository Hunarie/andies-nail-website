import { Box, Container, Text, Group, ActionIcon } from '@mantine/core';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export function Footer() {
  return (
    <Box 
      component="footer"
      style={{ 
        backgroundColor: '#171717',
        color: 'white',
        padding: '1.5rem 0' 
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Text size="sm" className="footer-text">
            © {new Date().getFullYear()} Andie Orozco's Nails. All rights reserved.
          </Text>
          
          <Group gap={15} visibleFrom="sm">
            <ActionIcon 
              size="lg" 
              variant="transparent" 
              color="gray"
              component="a"
              href="https://www.instagram.com/andiee.orozco2/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram size={20} style={{ color: 'white' }} />
            </ActionIcon>
            <ActionIcon 
              size="lg" 
              variant="transparent" 
              color="gray"
              component="a"
              href="https://www.tiktok.com/@andieorozco4"
              target="_blank"
              aria-label="TikTok"
            >
              <FaTiktok size={18} style={{ color: 'white' }} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
} 