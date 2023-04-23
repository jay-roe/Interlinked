/* istanbul ignore file */
import { createIntlMiddleware } from 'next-intl/server';

export const locales = ['en', 'de'];

// Used for `toLocaleString` internationalization
export const localeToDateLocale = {
  en: 'en-US',
  de: 'de-DE',
};

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
});
