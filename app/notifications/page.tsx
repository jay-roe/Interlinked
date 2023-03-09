'use client';

import {
  getDocs,
  collection,
  Timestamp,
  addDoc,
  query,
  where,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import NotificationList from '@/components/Notification/NotificationList';
import { FiBell } from 'react-icons/fi';
import { typeCollection, db } from '@/config/firestore';
import { doc } from 'firebase/firestore';
import { NotifType } from '@/types/User';
import type { Notification, User } from '@/types/User';
import { useEffect, useState } from 'react';
import { createNotification } from '@/components/Notification/AddNotification';

export default function Notifications() {
  // set the current user
  const { authUser, currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>();
  useEffect(() => {
    async function getNotifications() {
      const res = await getDocs(
        typeCollection<Notification>(
          collection(doc(db.users, authUser.uid), 'notifications')
        )
      );
      console.log('in getNotifications res.docs', res.docs);

      return res.docs.map((resData) => resData.data());
    }

    getNotifications().then((notifs) => {
      setNotifications(notifs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function readAll() {
    const notifUnreadQuery = query(
      typeCollection<Notification>(
        collection(doc(db.users, authUser.uid), 'notifications')
      )
      // where(
      //   'read', '==', 'false'
      // )
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
                notifType: NotifType.COMMENT,
                context: '💖 sucks to be you',
                sender: currentUser,
              });
            }}
          >
            Feeling Unpopular?
          </Button>
          <button
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
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}
