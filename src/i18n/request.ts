import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';
import {cookies} from 'next/headers';
 
export default getRequestConfig(async () => {
  // First check if locale is set in cookies
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  
  // If no cookie is found, fallback to Accept-Language header
  let locale = 'en'; // Default fallback
  if (cookieLocale) {
    locale = cookieLocale;
  } else {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
      const headerLocale = acceptLanguage.split(',')[0].split('-')[0];
      // Only accept supported locales from header
      if (headerLocale === 'en' || headerLocale === 'es') {
        locale = headerLocale;
      }
    }
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});