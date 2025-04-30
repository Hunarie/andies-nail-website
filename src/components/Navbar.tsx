'use client';

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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

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
      py="xs" 
      px="md" 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--header-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: '0 1px 10px rgba(0, 0, 0, 0.03)'
      }}
    >
      <Container size="xl">
        <Group justify="space-between" h={70}>
          <Text fw={600} style={{ 
            fontFamily: "var(--font-playfair)",
            fontSize: 'clamp(28px, 5vw, 44px)', // Responsive font size
            color: 'var(--primary-pink-dark)',
            letterSpacing: '0.5px',
            position: 'relative',
            fontStyle: 'italic'
          }}
          component="div"
          >
            {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
            {/* Decorative underline */}
            <div style={{
              position: 'absolute',
              bottom: -2,
              left: '10%',
              width: '80%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--primary-pink-light), transparent)'
            }} />
          </Text>

          {/* Desktop navigation */}
          <Group gap={34} visibleFrom="md">
            {navLinks.map((link) => (
              <Anchor
                key={link.label}
                href={link.href}
                underline="hover"
                fw={500}
                c="dark.6"
                style={{ 
                  transition: 'all 0.3s ease',
                  fontFamily: "var(--font-cormorant)",
                  fontSize: '18px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  '&:hover': { 
                    color: 'var(--primary-pink-dark)',
                  }
                }}
              >
                {link.label}
              </Anchor>
            ))}
            <Button 
              component="a" 
              href="#book" 
              color="pink.4"
              radius="sm"
              variant="filled"
              style={{
                fontFamily: "var(--font-lato)",
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '14px',
                border: '1px solid var(--primary-pink-dark)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
              }}
            >
              Book Now
            </Button>
          </Group>

          {/* Social media icons */}
          <Group gap={16} visibleFrom="md">
            <ActionIcon 
              size="lg" 
              variant="subtle" 
              color="pink.4" 
              radius="sm"
              component="a"
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
              target="_blank"
              aria-label="Instagram"
              style={{
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}
            >
              <FaInstagram size={22} />
            </ActionIcon>
            <ActionIcon 
              size="lg" 
              variant="subtle"
              color="pink.4"
              radius="sm"
              component="a"
              href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"}
              target="_blank"
              aria-label="TikTok"
              style={{
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}
            >
              <FaTiktok size={20} />
            </ActionIcon>
          </Group>

          {/* Mobile burger menu */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" color="var(--primary-pink-dark)" />
        </Group>
      </Container>

      {/* Mobile drawer navigation */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Center style={{ width: '100%', position: 'relative' }}>
            <Text fw={600} size="xl" style={{ 
              color: 'var(--primary-pink-dark)',
              fontFamily: "var(--font-playfair)",
              fontSize: '30px',
              position: 'relative',
              fontStyle: 'italic',
              margin: '0 auto',
              textAlign: 'center',
              maxWidth: '80%'
            }}
            component="div"
            >
              {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
              <div style={{
                position: 'absolute',
                bottom: -4,
                left: '10%',
                width: '80%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--primary-pink-light), transparent)'
              }} />
            </Text>
          </Center>
        }
        padding="xl"
        size="100%"
        position="right"
        withCloseButton={false}
        styles={{
          content: {
            backgroundColor: 'var(--background)',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f7c8d2' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E\")"
          },
          header: {
            position: 'static',
            backgroundColor: 'var(--header-bg)',
            minHeight: '70px',
            padding: '15px 15px 15px 25px'
          },
          title: {
            width: '100%',
            backgroundColor: 'var(--header-bg)',
            padding: '0'
          }
        }}
      >
        <Box style={{ position: 'absolute', right: '15px', top: '15px', zIndex: 1000 }}>
          <ActionIcon 
            size="lg" 
            onClick={close} 
            variant="subtle"
            radius="sm"
            color="pink.4"
            style={{
              border: '1px solid var(--border-color)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ActionIcon>
        </Box>
        
        <Stack gap="xl" mt="xl" align="center">
          <span className="decorative-flourish">❦</span>
          
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
                fontFamily: "var(--font-playfair)",
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'var(--text-color)',
                transition: 'all 0.3s ease'
              }}
            >
              {link.label}
            </Text>
          ))}
          
          <Button 
            component="a" 
            href="#book" 
            color="pink.4" 
            radius="sm"
            fullWidth
            mt="xl"
            onClick={close}
            style={{
              fontFamily: "var(--font-lato)",
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid var(--primary-pink-dark)',
              maxWidth: '250px'
            }}
          >
            Book Now
          </Button>

          <Center style={{ width: '100%', marginTop: '2.5rem' }}>
            <Group gap={30}>
              <ActionIcon 
                size="xl" 
                variant="subtle"
                color="pink.4" 
                radius="sm"
                component="a"
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
                target="_blank"
                aria-label="Instagram"
                style={{
                  border: '1px solid var(--border-color)'
                }}
              >
                <FaInstagram size={26} />
              </ActionIcon>
              <ActionIcon 
                size="xl" 
                variant="subtle"
                color="pink.4"
                radius="sm"
                component="a"
                href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"}
                target="_blank"
                aria-label="TikTok"
                style={{
                  border: '1px solid var(--border-color)'
                }}
              >
                <FaTiktok size={24} />
              </ActionIcon>
            </Group>
          </Center>
          
          <span className="decorative-flourish" style={{ marginTop: '2rem' }}>✿</span>
        </Stack>
      </Drawer>
    </Box>
  );
} 