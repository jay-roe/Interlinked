'use client';

import styles from './Login.module.css';
import Link from '@/components/Link/Link';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import GoogleButton from '@/components/Buttons/GoogleButton/GoogleButton';
import LoadingScreen from '@/components/Loading/Loading';

export default function Login() {
  const t = useTranslations('Login');
  const router = useRouter();
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authUser, currentUser, login, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      router.push('/' + locale + '/');
    }
    // if account is locked or timed out, redirect to locked page
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [authUser, currentUser, router]);

  async function handleFormSubmit(e: React.MouseEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      router.push('/' + locale + '/');
    } catch (err) {
      console.error(err);
      alert(t('alert-failed'));
    }

    setLoading(false);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2
            data-testid="login-title"
            className="mt-4 text-center text-3xl font-light tracking-tight dark:text-white"
          >
            {t('welcome')}
          </h2>
        </div>
        <form action="" className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                id="email-address"
                data-testid="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="email"
                required
                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                data-testid="pw"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <Button
              data-testid="login"
              type="submit"
              onClick={handleFormSubmit}
              disabled={loading}
              className=" flex w-full justify-center rounded border border-transparent bg-sky-800 py-2 px-4 text-sm font-medium text-white hover:bg-sky-900"
            >
              {t('login')}
            </Button>
          </div>
          <div className={styles.HorizontalSeparator}></div>
          <div>
            <GoogleButton
              onClick={() => {
                setEmail('');
                setPassword('');
                loginWithGoogle();
              }}
              data-testid="googleLogin"
            >
              {t('login-goog')}
            </GoogleButton>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/register"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                {t('no-account')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
