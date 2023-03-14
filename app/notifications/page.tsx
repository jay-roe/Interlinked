'use client';

import { getDocs, collection, query, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import NotificationList from '@/components/Notification/NotificationList/NotificationList';
import { FiBell } from 'react-icons/fi';
import { typeCollection, db } from '@/config/firestore';
import { doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Notification, NotifType } from '@/types/Notification';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';

export default function Notifications() {
  // console.log('in getNotifications');
  // set the current user
  const { authUser, currentUser } = useAuth();

  // User not logged in
  if (!currentUser || !authUser) {
    return (
      <div className="text-white">
        <h1 className="text-lg font-bold">Your Notifications</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to view your notifications.
        </h2>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    );
  }

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>();

  async function getNotifications() {
    const res = await getDocs(
      typeCollection<Notification>(
        collection(doc(db.users, authUser.uid), 'notifications')
      )
    );
    console.log('in getNotifications res', res);

    return res.docs.map((resData) => resData.data());
  }

  useEffect(() => {
    getNotifications().then((notifs) => {
      setNotifications(notifs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function readAll() {
    const notifUnreadQuery = typeCollection<Notification>(
      collection(doc(db.users, authUser.uid), 'notifications')
    );
    // console.log(notifUnreadQuery)
    const unreadNotifs = await getDocs(notifUnreadQuery);
    unreadNotifs.forEach(async (notif) => {
      // alert(notif.data().read)
      await updateDoc(
        doc(collection(doc(db.users, authUser.uid), 'notifications'), notif.id),
        {
          read: true,
        }
      );
    });

    const newNotifs = notifications.map((notif) => {
      if (!notif.read) {
        notif.read = true;
        return notif;
      } else {
        return notif;
      }
    });
    setNotifications(newNotifs);
  }

  return (
    // tried a bunch of stuff but I can't get "read all" and the bell button side by side loll:')
    <div className="container mx-auto text-white">
      <div className="mb-2 flex justify-between">
        <h1 className="text-3xl font-extrabold">Notifications</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              createNotification({
                receiver: authUser.uid,
                notifType: NotifType.LINK_ACC,
                context: '💖 hi, have an amazing day :)',
                sender: 'IPx2hseMaCgAzH9gm0NidFHLETo2',
              });
            }}
          >
            Feeling Unpopular?
          </Button>
          <button
            data-testid="read-all-button"
            onClick={() => {
              readAll();
            }}
          >
            <div className="flex items-center gap-2 rounded-xl bg-white bg-opacity-[8%] p-3">
              <FiBell />
              <p>Read all</p>
            </div>
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        <NotificationList
          notifications={notifications}
          setNotifications={setNotifications}
        />
        {notifications.length == 0 && (
          <p data-testid="no-notifications">Wow, such empty</p>
        )}
      </div>
    </div>
  );
}
