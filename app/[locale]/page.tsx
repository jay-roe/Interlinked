'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FiEdit3, FiBriefcase, FiMessageSquare } from 'react-icons/fi';

const Home = () => {
  const router = useRouter();
  const locale = useLocale();
  const { currentUser } = useAuth();
  const t = useTranslations('Home');

  const links = [
    {
      href: '/feed',
      label: 'Post to your feed',
      icon: FiEdit3,
    },
    { href: '/job-feed', label: 'Browse job opportunities', icon: FiBriefcase },
    {
      href: '/DM',
      label: 'Discuss tech, jobs, or anything you desire',
      icon: FiMessageSquare,
    },
  ];

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
