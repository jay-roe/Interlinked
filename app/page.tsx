'use client';

import auth from '@/config/firebase';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  // const { currentUser, refresh } = useAuth();

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     refresh();
  //   }
  // }, []);

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
          Welcome, {currentUser.name || currentUser.email}. Let&apos;s get you
          interlinked.
        </p>
      ) : (
        <>
          <p data-testid="base-msg" className="text-center text-2xl">
            We will become interlinked.
          </p>
        </>
      )}
    </div>
  );
};

export default Home;
