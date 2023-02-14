'use client';

import FeedPost from '@/components/FeedPostGroup/FeedPost/FeedPost';
// import { Inter } from '@next/font/google';
// import { Alert } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
// import { useEffect, useState } from 'react';

// const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const { currentUser } = useAuth();
  // const location = useLocation();
  //   const ALERT_TIMEOUT = 5000; // Deleted alert timeout in milliseconds
  //   const [isDeletedAlertShow, setIsDeletedAlertShow] = useState(false);

  // TODO reintroduce deleted account alert
  /*useEffect(() => {
        if (location.state?.deletedAccount) {
            setIsDeletedAlertShow(true);
            setTimeout(async () => {
                setIsDeletedAlertShow(false);
            }, ALERT_TIMEOUT);
            location.state.deletedAccount = false;
        }
    }, [location.state])*/

  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-center text-7xl font-extrabold"
        data-testid="home-brand"
      >
        Interlinked
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
          <FeedPost></FeedPost>
        </>
      )}
      {/* <Alert variant='danger' show={isDeletedAlertShow}>
                Successfully deleted your account.
            </Alert> */}
    </div>
  );
};

export default Home;
