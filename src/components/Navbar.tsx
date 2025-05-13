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
import { scrollToElementCentered } from '@/utils/scroll';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations();
  const [opened, { toggle, close }] = useDisclosure(false);
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Andie Orozco's Nails";

  const navLinks = [
    { label: t('navbar.home'), href: '#home', id: 'home' },
    { label: t('navbar.services'), href: '#services', id: 'services' },
    { label: t('navbar.about'), href: '#about', id: 'about' },
    { label: t('navbar.contact'), href: '#contact', id: 'contact' }
  ];

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElementCentered('book');
  };

  const handleNavLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    if (opened) {
      close();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // On mobile, scroll to top of section (except for booking)
          if (isMobile && id !== 'book') {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            // On desktop or for booking section, center it
            scrollToElementCentered(id);
          }
        }
      }, 300);
    } else {
      // When menu is not open (desktop view)
      const element = document.getElementById(id);
      if (element) {
        // On mobile, scroll to top of section (except for booking)
        if (isMobile && id !== 'book') {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          // On desktop or for booking section, center it
          scrollToElementCentered(id);
        }
      }
    }
  };

  return (
    <Box 
      className={styles.navbar}
    >
      <Container className={styles.navbarContainer}>
        <Group className={styles.navbarGroup}>
          <Text className={styles.logo} component="div">
            {siteName}
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
                onClick={(e) => handleNavLinkClick(e, link.id)}
              >
                {link.label}
              </Anchor>
            ))}
            <Button 
              component="a" 
              href="#book" 
              variant="filled"
              className={styles.navButton}
              onClick={handleBookNowClick}
            >
              {t('navbar.bookNow')}
            </Button>
          </Group>

          {/* Social media icons and language switcher */}
          <Group className={styles.socialsGroup} visibleFrom="md">
            <LanguageSwitcher className={styles.languageSwitcher} />
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
              onClick={(e) => handleNavLinkClick(e, link.id)}
              className={styles.drawerLink}
            >
              {link.label}
            </Text>
          ))}
          
          <Button 
            component="a" 
            href="#book" 
            onClick={(e) => {
              e.preventDefault();
              close();
              scrollToElementCentered('book', 300);
            }}
            className={styles.drawerButton}
          >
            {t('navbar.bookNow')}
          </Button>

          {/* Language switcher in mobile drawer */}
          <Center my="xs">
            <LanguageSwitcher />
          </Center>

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