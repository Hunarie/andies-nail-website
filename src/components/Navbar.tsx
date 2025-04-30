import { useState } from 'react';
import { 
  Group, 
  Container, 
  Burger, 
  Drawer, 
  Stack, 
  Text, 
  Button, 
  ActionIcon, 
  Anchor,
  Box,
  Center,
  Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Box 
      py="md" 
      px="md" 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--header-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      <Container size="xl">
        <Group justify="space-between" h={60}>
          <Text fw={700} style={{ 
            fontFamily: greatVibes.style.fontFamily,
            fontSize: 'clamp(24px, 5vw, 40px)' // Responsive font size between 24px and 40px
          }}>
            Andie Orozco's Nails
          </Text>

          {/* Desktop navigation */}
          <Group gap={30} visibleFrom="md">
            {navLinks.map((link) => (
              <Anchor
                key={link.label}
                href={link.href}
                underline="never"
                fw={500}
                color="dark"
                style={{ 
                  transition: 'color 0.2s',
                  '&:hover': { color: 'var(--primary-pink)' },
                  fontFamily: 'var(--font-montserrat), sans-serif'
                }}
              >
                {link.label}
              </Anchor>
            ))}
            <Button 
              component="a" 
              href="#book" 
              color="pink" 
              radius="xl"
              variant="filled"
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif'
              }}
            >
              Book Now
            </Button>
          </Group>

          {/* Social media icons */}
          <Group gap={15} visibleFrom="md">
            <ActionIcon 
              size="lg" 
              variant="transparent" 
              color="dark"
              component="a"
              href="https://www.instagram.com/andiee.orozco2/"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram size={24} style={{ color: 'var(--primary-pink-dark)' }} />
            </ActionIcon>
            <ActionIcon 
              size="lg" 
              variant="transparent" 
              color="dark"
              component="a"
              href="https://www.tiktok.com/@andieorozco4"
              target="_blank"
              aria-label="TikTok"
            >
              <FaTiktok size={22} style={{ color: 'var(--primary-pink-dark)' }} />
            </ActionIcon>
          </Group>

          {/* Mobile burger menu */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" />
        </Group>
      </Container>

      {/* Mobile drawer navigation */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Center style={{ backgroundColor: 'var(--header-bg)', width: '100%' }}>
            <Text fw={700} size="xl" style={{ 
              color: 'var(--primary-pink-dark)',
              fontFamily: greatVibes.style.fontFamily,
              fontSize: '32px'
            }}>
              Andie Orozco's Nails
            </Text>
          </Center>
        }
        padding="xl"
        size="100%"
        position="right"
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: 'var(--header-bg)'
          },
          header: {
            backgroundColor: 'var(--header-bg)'
          },
          title: {
            width: '100%',
            backgroundColor: 'var(--header-bg)'
          }
        }}
      >
        <Box style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 1000 }}>
          <ActionIcon size="lg" onClick={close} variant="transparent">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="var(--primary-pink-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ActionIcon>
        </Box>
        <Stack gap="lg" mt="xl" align="center">
          {navLinks.map((link) => (
            <Text
              key={link.label}
              component="a"
              href={link.href}
              fw={500}
              size="xl"
              onClick={close}
              style={{
                textAlign: 'center',
                width: '100%',
                fontFamily: 'var(--font-montserrat), sans-serif'
              }}
            >
              {link.label}
            </Text>
          ))}
          <Button 
            component="a" 
            href="#book" 
            color="pink" 
            radius="xl"
            fullWidth
            mt="md"
            onClick={close}
            style={{
              fontFamily: 'var(--font-montserrat), sans-serif'
            }}
          >
            Book Now
          </Button>

          <Center style={{ width: '100%', marginTop: '2rem' }}>
            <Group gap={30}>
              <ActionIcon 
                size="xl" 
                variant="transparent" 
                color="dark"
                component="a"
                href="https://www.instagram.com/andiee.orozco2/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram size={28} style={{ color: 'var(--primary-pink-dark)' }} />
              </ActionIcon>
              <ActionIcon 
                size="xl" 
                variant="transparent" 
                color="dark"
                component="a"
                href="https://www.tiktok.com/@andieorozco4"
                target="_blank"
                aria-label="TikTok"
              >
                <FaTiktok size={26} style={{ color: 'var(--primary-pink-dark)' }} />
              </ActionIcon>
            </Group>
          </Center>
        </Stack>
      </Drawer>
    </Box>
  );
} 