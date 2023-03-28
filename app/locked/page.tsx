'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Buttons/Button';
import Link from 'next/link';

const Locked = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!currentUser?.accountLocked || !currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

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
      <div>
        <p data-testid="welcome-msg" className="text-center text-2xl">
          <br /> <br />
          Welcome, {currentUser?.name || currentUser?.email}. <br />
          Looks&apos;s like you were up to no good. <br />
          You&apos;re account has been locked. Uh oh 😢
          <br /> <br />
        </p>
        <Link href="/" className="flex justify-center">
          <Button onClick={logout}>Return to homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default Locked;
