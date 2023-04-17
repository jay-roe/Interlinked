'use client';

import Link from '@/components/Link/Link';

import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/Buttons/Button';
import GoogleButton from '@/components/Buttons/GoogleButton/GoogleButton';
import CheckBox from '@/components/InputFields/CheckBox/CheckBox';
import LoadingScreen from '@/components/Loading/Loading';

export default function Register() {
  const t = useTranslations('Register');
  const router = useRouter();
  const locale = useLocale();
  const { authUser, register, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCompany, setIsCompany] = useState(false);

  // If user logged in, send them to home
  useEffect(() => {
    if (authUser) {
      router.push('/' + locale + '/');
    }
  }, [authUser, router]);

  async function handleFormSubmit(e: React.MouseEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert(t('passwords-do-not-match'));
    }

    try {
      setLoading(true);
      await register(email, password, isCompany);
      router.push('/' + locale + '/');
    } catch (err) {
      alert(err.message);
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
            className="mt-4 text-center text-3xl font-light tracking-tight dark:text-white"
            data-testid="register-title"
          >
            {t('create')}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                data-testid="email"
                id="email-address"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder={t('email-placeholder')}
              />
            </div>
            <div>
              <input
                data-testid="pw"
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder={t('pw-placeholder')}
              />
            </div>
            <div>
              <input
                data-testid="confirm-pw"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder={t('confirm-pw-placeholder')}
              />
            </div>
            <div>
              <CheckBox
                name="company"
                label={t('register-as-recruiter')}
                onChange={() => setIsCompany((curr) => !curr)}
                checked={isCompany}
              />
            </div>
          </div>
          <div>
            <Button
              data-testid="register"
              type="submit"
              onClick={(event) => handleFormSubmit(event)}
              disabled={loading}
              className=" flex w-full justify-center rounded-md border border-transparent bg-sky-800 py-2 px-4 text-sm font-medium text-white hover:bg-sky-900"
            >
              {t('register')}
            </Button>
          </div>
          <div className={styles.HorizontalSeparator}></div>
          <div>
            <GoogleButton onClick={() => loginWithGoogle()}>
              {t('register-goog')}
            </GoogleButton>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/login"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                {t('already-have-account')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
