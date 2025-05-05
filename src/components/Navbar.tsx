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
      className={styles.navbar}
    >
      <Container className={styles.navbarContainer}>
        <Group className={styles.navbarGroup}>
          <Text className={styles.logo} component="div">
            {process.env.NEXT_PUBLIC_SITE_NAME?.split("'")[0] || "Andie's"} Nails
            {/* Decorative underline */}
            <div className={styles.logoUnderline} />
          </Text>

          {/* Desktop navigation */}
          <Group className={styles.navLinksGroup} visibleFrom="md">
            {navLinks.map((link) => (
              <Anchor
                key={link.label}
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </Anchor>
            ))}
            <Button 
              component="a" 
              href="#book" 
              variant="filled"
              className={styles.navButton}
            >
              Book Now
            </Button>
          </Group>

          {/* Social media icons */}
          <Group className={styles.socialsGroup} visibleFrom="md">
            <ActionIcon 
              component="a"
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
              target="_blank"
              aria-label="Instagram"
              className={styles.socialIcon}
              variant="subtle"
            >
              <FaInstagram />
            </ActionIcon>
            <ActionIcon 
              component="a"
              href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"}
              target="_blank"
              aria-label="TikTok"
              className={styles.socialIcon}
              variant="subtle"
            >
              <FaTiktok />
            </ActionIcon>
          </Group>

          {/* Mobile burger menu */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" className={styles.mobileBurger} />
        </Group>
      </Container>

      {/* Mobile drawer navigation */}
      <Drawer
        opened={opened}
        onClose={close}
        className={styles.drawer}
        withCloseButton={false}
        classNames={{
          content: styles.drawer,
          header: styles.drawerHeader,
          title: styles.drawerTitle
        }}
      >
        <Box className={styles.drawerCloseButton}>
          <ActionIcon 
            onClick={close} 
            variant="subtle"
            className={styles.socialIcon}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ActionIcon>
        </Box>
        
        <Stack className={styles.drawerStack}>
          <span className="decorative-flourish">❦</span>
          
          {navLinks.map((link) => (
            <Text
              key={link.label}
              component="a"
              href={link.href}
              onClick={close}
              className={styles.drawerLink}
            >
              {link.label}
            </Text>
          ))}
          
          <Button 
            component="a" 
            href="#book" 
            onClick={close}
            className={styles.drawerButton}
          >
            Book Now
          </Button>

          <Center className={styles.drawerSocial}>
            <Group className={styles.drawerSocialsGroup}>
              <ActionIcon 
                component="a"
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/andiee.orozco2/"}
                target="_blank"
                aria-label="Instagram"
                className={styles.drawerSocialIcon}
                variant="subtle"
              >
                <FaInstagram />
              </ActionIcon>
              <ActionIcon 
                component="a"
                href={process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@andieorozco4"}
                target="_blank"
                aria-label="TikTok"
                className={styles.drawerSocialIcon}
                variant="subtle"
              >
                <FaTiktok />
              </ActionIcon>
            </Group>
          </Center>
        </Stack>
      </Drawer>
    </Box>
  );
} 