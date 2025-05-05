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
import styles from './Navbar.module.css';

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
      className={styles.navbar}
    >
      <Container size="xl">
        <Group justify="space-between" h={70}>
          <Text fw={600} className={styles.logo} component="div">
            {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
            {/* Decorative underline */}
            <div className={styles.logoUnderline} />
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
                className={styles.navLink}
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
              className={styles.navButton}
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
              className={styles.socialIcon}
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
              className={styles.socialIcon}
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
          <Center className={styles.drawerHeader}>
            <Text fw={600} size="xl" className={styles.drawerLogo} component="div">
              {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
              <div className={styles.drawerLogoUnderline} />
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
        <Box className={styles.drawerCloseButton}>
          <ActionIcon 
            size="lg" 
            onClick={close} 
            variant="subtle"
            radius="sm"
            color="pink.4"
            className={styles.socialIcon}
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
              className={styles.drawerLink}
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
            className={styles.drawerButton}
          >
            Book Now
          </Button>

          <Center className={styles.drawerSocial}>
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
                className={styles.drawerSocialIcon}
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
                className={styles.drawerSocialIcon}
              >
                <FaTiktok size={24} />
              </ActionIcon>
            </Group>
          </Center>
          
          <span className={`decorative-flourish ${styles.decorativeFlourish}`}>✿</span>
        </Stack>
      </Drawer>
    </Box>
  );
} 