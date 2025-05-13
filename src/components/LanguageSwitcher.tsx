'use client';

import { useRouter } from 'next/navigation';
import { Group, Button, MantineTheme } from '@mantine/core';
import { setCookie, getCookie } from '@/utils/cookies';
import { useCallback, useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const serverLocale = useLocale(); // Get locale from next-intl server context
  const [currentLocale, setCurrentLocale] = useState<string | null>(serverLocale);
  
  // Initialize on client side
  useEffect(() => {
    const cookieLocale = getCookie('NEXT_LOCALE');
    if (cookieLocale) {
      setCurrentLocale(cookieLocale);
    }
  }, []);
  
  const switchLanguage = useCallback((locale: string) => {
    // Store the selected language in a cookie
    setCookie('NEXT_LOCALE', locale, 365); // Store for 1 year
    setCurrentLocale(locale);
    
    // Reload the page to apply the new locale
    router.refresh();
  }, [router]);
  
  const isEnActive = currentLocale === 'en';
  const isEsActive = currentLocale === 'es';
  
  return (
    <Group className={className} gap="xs">
      <Button
        variant="subtle"
        size="compact-xs"
        onClick={() => switchLanguage('en')}
        data-active={isEnActive}
        classNames={{
          root: isEnActive ? 'active-language' : 'inactive-language'
        }}
        styles={(theme: MantineTheme) => ({
          root: {
            fontWeight: isEnActive ? 'bold' : 'normal',
            color: isEnActive ? theme.colors.pink[7] : theme.colors.gray[6],
            textDecoration: isEnActive ? 'underline' : 'none'
          }
        })}
      >
        EN
      </Button>
      <Button
        variant="subtle"
        size="compact-xs"
        onClick={() => switchLanguage('es')}
        data-active={isEsActive}
        classNames={{
          root: isEsActive ? 'active-language' : 'inactive-language'
        }}
        styles={(theme: MantineTheme) => ({
          root: {
            fontWeight: isEsActive ? 'bold' : 'normal',
            color: isEsActive ? theme.colors.pink[7] : theme.colors.gray[6],
            textDecoration: isEsActive ? 'underline' : 'none'
          }
        })}
      >
        ES
      </Button>
    </Group>
  );
} 