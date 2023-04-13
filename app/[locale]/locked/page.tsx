'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
import Button from '@/components/Buttons/Button';
import Link from '@/components/Link/Link';
import { useTranslations } from 'next-intl';

const Locked = () => {
  const t = useTranslations('Locked');
  const router = useRouter();
  const locale = useLocale();
  const { authUser, currentUser, logout } = useAuth();

  // if account is not locked, timed out, or not logged in, redirect to home page
  useEffect(() => {
    if (
      (!currentUser?.accountLocked && !currentUser?.accountTimeout) ||
      !currentUser
    ) {
      router.push('/' + locale + '/');
    }
  }, [currentUser, router]);

  // calculate time left until account is unlocked
  function timeLeft() {
    const now = new Date();
    const timeoutUntil = currentUser.accountTimeoutUntil;
    if (!timeoutUntil) {
      return 0;
    }
    const timeoutUntilDate = timeoutUntil.toDate();
    const timeLeftMs = timeoutUntilDate.getTime() - now.getTime();
    const timeLeftMin = Math.ceil(timeLeftMs / 60000);
    return timeLeftMin;
  }

  // if account is timed out, check if timeout has expired and unlock account
  useEffect(() => {
    if (currentUser?.accountTimeoutUntil) {
      const now = new Date();
      const timeoutUntil = currentUser.accountTimeoutUntil.toDate();

      // if timeout has expired set accountTimeout to null and accountTimeoutUntil to null
      if (now > timeoutUntil) {
        updateDoc(doc(db.users, authUser.uid), {
          accountTimeout: false,
          accountTimeoutUntil: null,
        });
      }
    }
  }, [authUser]);

  return (
    // blurred background
    <div className="container mx-auto p-12 text-white">
      <div className="blur">
        <h1
          className="mb-3 text-center font-logo text-7xl font-extrabold"
          data-testid="home-brand"
        >
          INTERLINKED
        </h1>
      </div>
      {/* if account is locked, show locked message */}
      {currentUser?.accountLocked && (
        <div>
          <p data-testid="welcome-msg" className="text-center text-2xl">
            <br /> <br />
            {t('welcome')}, {currentUser?.name || currentUser?.email}. <br />
            {t('up-to-no-good')} <br />
            {t('account-locked')}😢
            <br /> <br />
          </p>
          <Link href="/" className="flex justify-center">
            <Button onClick={logout} data-testid="locked-account-logout">
              {t('return')}
            </Button>
          </Link>
        </div>
      )}
      {/* if account is timed out, show timed out message */}
      {currentUser?.accountTimeout && (
        <div>
          <p data-testid="welcome-msg" className="text-center text-2xl">
            <br /> <br />
            {t('welcome')}, {currentUser?.name || currentUser?.email}. <br />
            {t('up-to-no-good')} <br />
            {t('account-timeout')}
            {timeLeft()} {t('timeout-mins')}😢
            <br /> <br />
          </p>
          <Link href="/" className="flex justify-center">
            <Button onClick={logout} data-testid="timeout-account-logout">
              {t('return')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Locked;
