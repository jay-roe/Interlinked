import 'styles/globals.css';
import NavBar from '@/components/NavBar/NavBar';
import { NextIntlClientProvider } from 'next-intl/client';
import { AuthProvider } from '@/contexts/AuthContext';

export default async function RootLayout({ children, params: { locale } }) {
  let translations;
  try {
    translations = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {}
  return (
    <html lang={locale} data-testid="root-container">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={translations}>
          <AuthProvider>
            <main className="flex min-h-screen flex-col bg-purple-background">
              <NavBar />
              {children}
            </main>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
