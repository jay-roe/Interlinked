'use client';

import Button from '@/components/Buttons/Button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function AccountRequired() {
  const { currentUser, authUser } = useAuth();
  const t = useTranslations('AccountRequired');

  {
    return (
      <div>
        <p data-testid="base-msg" className="mb-3 text-left text-2xl">
          {t('should-login')}
        </p>
        <div className="flex space-x-1.5">
          <Link href="/login">
            <Button>{t('sign-in')}</Button>
          </Link>
          <Link href="/register">
            <Button>{t('register')}</Button>
          </Link>
        </div>
      </div>
    );
  }
}
