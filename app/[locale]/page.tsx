'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FiEdit3, FiBriefcase, FiMessageSquare } from 'react-icons/fi';
import Link from '@/components/Link/Link';
import Card from '@/components/Card/Card';

const Home = () => {
  const router = useRouter();
  const locale = useLocale();
  const { currentUser } = useAuth();
  const t = useTranslations('Home');

  let links = [];
  if (currentUser && currentUser.isCompany) {
    links = [
      {
        href: '/manage-jobs',
        label: t('manage-jobs'),
        icon: FiBriefcase,
        className: 'hover:bg-indigo-900 hover:bg-opacity-75 transition-all',
      },
      {
        href: '/DM',
        label: t('message-users'),
        icon: FiMessageSquare,
        className: 'hover:bg-blue-900 hover:bg-opacity-30 transition-all',
      },
    ];
  } else if (currentUser && !currentUser.isCompany) {
    links = [
      {
        href: '/feed',
        label: t('post-to-your-feed'),
        icon: FiEdit3,
        className: 'hover:bg-purple-900 hover:bg-opacity-75 transition-all',
      },
      {
        href: '/job-feed',
        label: t('browse-job-opportunities'),
        icon: FiBriefcase,
        className: 'hover:bg-indigo-900 hover:bg-opacity-75 transition-all',
      },
      {
        href: '/DM',
        label: t('message-users'),
        icon: FiMessageSquare,
        className: 'hover:bg-blue-900 hover:bg-opacity-30 transition-all',
      },
    ];
  }

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  return (
    <div className="mx-4 text-white sm:container sm:mx-auto">
      <h1
        className="mb-3 text-center font-logo text-[10vw] font-extrabold sm:text-7xl"
        data-testid="home-brand"
      >
        INTERLINKED
      </h1>
      {/* Here goes the app's components */}
      {currentUser ? (
        <div>
          <p
            data-testid="welcome-msg"
            className="text-center text-xl sm:text-2xl"
          >
            {t('welcome')}, {currentUser.name || currentUser.email}.
            {t('get-you-interlinked')}.
          </p>
          <ul className="mx-auto mt-20 max-w-3xl text-left text-2xl sm:text-4xl">
            {links.map(({ href, label, icon: Icon, className }, index) => (
              <li key={`${href}${label}`} className="mb-3">
                <Link href={href}>
                  <Card className={className}>
                    <div className="flex items-center py-6 px-3">
                      {Icon && <Icon size={48} className="mr-6" />}
                      <span>{label}</span>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <p data-testid="base-msg" className="text-center text-xl sm:text-2xl">
            {t('become-interlinked')}.
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
