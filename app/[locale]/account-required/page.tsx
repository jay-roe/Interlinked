'use client';

import Button from '@/components/Buttons/Button';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function AccountRequired() {
  const t = useTranslations('AccountRequired');
  const locale = useLocale();

  return (
    <div>
      <h1
        className="mb-3 text-left text-7xl font-extrabold"
        data-testid="title"
      >
        {t('cannot-access-page')}
      </h1>
      <p data-testid="base-msg" className="mb-3 text-left text-2xl">
        {t('should-login')}
      </p>
      <div className="flex space-x-1.5">
        <Link href={`/${locale}/login`}>
          <Button>{t('sign-in')}</Button>
        </Link>
        <Link href={`/${locale}/register`}>
          <Button>{t('register')}</Button>
        </Link>
      </div>
    </div>
  );
}
