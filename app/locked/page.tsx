'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
import Button from '@/components/Buttons/Button';
import Link from 'next/link';

const Locked = () => {
  const router = useRouter();
  const { authUser, currentUser, logout } = useAuth();

  useEffect(() => {
    if (
      (!currentUser?.accountLocked && !currentUser?.accountTimeout) ||
      !currentUser
    ) {
      router.push('/');
    }
  }, [currentUser, router]);

  function timeLeft() {
    const now = new Date();
    const timeoutUntil = currentUser.accountTimeoutUntil.toDate();
    const timeLeftMs = timeoutUntil.getTime() - now.getTime();
    const timeLeftMin = Math.ceil(timeLeftMs / 60000);
    return timeLeftMin;
  }

  useEffect(() => {
    if (currentUser?.accountTimeoutUntil) {
      const now = new Date();
      const timeoutUntil = currentUser.accountTimeoutUntil.toDate();

      if (now > timeoutUntil) {
        // if timeout has expired
        updateDoc(doc(db.users, authUser.uid), {
          accountTimeout: null,
          accountTimeoutUntil: null,
        });
      }
    }

    console.log('Timeout set' + currentUser?.accountTimeoutUntil);
    console.log('Timeout set' + currentUser?.accountTimeout);
    console.log('user' + currentUser);
  }, [authUser]);

  return (
    <div className="container mx-auto text-white">
      <div className="blur">
        <h1
          className="mb-3 text-center font-logo text-7xl font-extrabold"
          data-testid="home-brand"
        >
          INTERLINKED
        </h1>
        {currentUser ? (
          <p data-testid="welcome-msg" className="text-center text-2xl">
            Welcome, {currentUser?.name || currentUser?.email}. Let&apos;s get
            you interlinked.
          </p>
        ) : (
          <>
            <p data-testid="base-msg" className="text-center text-2xl">
              We will become interlinked.
            </p>
          </>
        )}
      </div>
      {currentUser?.accountLocked && (
        <div>
          <p data-testid="welcome-msg" className="text-center text-2xl">
            <br /> <br />
            Welcome, {currentUser?.name || currentUser?.email}. <br />
            Look&apos;s like you were up to no good. <br />
            Your account has been locked. Uh oh 😢
            <br /> <br />
          </p>
          <Link href="/" className="flex justify-center">
            <Button onClick={logout}>Return to homepage</Button>
          </Link>
        </div>
      )}
      {currentUser?.accountTimeout && (
        <div>
          <p data-testid="welcome-msg" className="text-center text-2xl">
            <br /> <br />
            Welcome, {currentUser?.name || currentUser?.email}. <br />
            Look&apos;s like you were up to no good. <br />
            You are in timeout for {timeLeft()} mins. Uh oh 😢
            <br /> <br />
          </p>
          <Link href="/" className="flex justify-center">
            <Button onClick={logout}>Return to homepage</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Locked;
