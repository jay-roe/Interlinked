/* istanbul ignore file */
import { createIntlMiddleware } from 'next-intl/server';
import { locales } from './translations/locales';

export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
});
