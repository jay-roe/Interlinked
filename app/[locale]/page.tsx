'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from 'next-intl';

const Home = () => {
  const router = useRouter();
  const locale = useLocale();
  const { currentUser } = useAuth();
  const t = useTranslations('Home');

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-center font-logo text-7xl font-extrabold"
        data-testid="home-brand"
      >
        INTERLINKED
      </h1>
      {/* Here goes the app's components */}
      {currentUser ? (
        <p data-testid="welcome-msg" className="text-center text-2xl">
          {t('welcome')}, {currentUser.name || currentUser.email}.
          {t('get-you-interlinked')}.
        </p>
      ) : (
        <>
          <p data-testid="base-msg" className="text-center text-2xl">
            {t('become-interlinked')}.
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
