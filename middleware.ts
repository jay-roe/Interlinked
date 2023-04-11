/* istanbul ignore file */
import {createIntlMiddleware} from 'next-intl/server';
 
export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de'],
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en'
});
 