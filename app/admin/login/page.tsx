'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '@/components/Buttons/Button';

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, currentAdmin, authUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if logged in, redirect to admin page
    if (authUser && currentAdmin) {
      router.push('/admin');
    }
  }, [authUser, router]);

  async function handleFormSubmit(e: React.MouseEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      await loginAdmin(email, password);
    } catch (err) {
      console.error(err);
      alert('Failed to login');
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2
            data-testid="admin-login-title"
            className="mt-4 text-center text-3xl font-light tracking-tight dark:text-white"
          >
            Welcome Admin
          </h2>
        </div>
        <form action="" className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                id="email-address"
                data-testid="admin-email"
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
                data-testid="admin-pw"
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
              data-testid="admin-login"
              type="submit"
              onClick={handleFormSubmit}
              disabled={loading}
              className=" flex w-full justify-center rounded border border-transparent bg-sky-800 py-2 px-4 text-sm font-medium text-white hover:bg-sky-900"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}