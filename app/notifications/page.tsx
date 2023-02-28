'use client';

import { getDocs, collection, Timestamp, addDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import NotificationList from '@/components/Notification/NotificationList';
import { FiBell } from 'react-icons/fi';
import { typeCollection, db } from '@/config/firestore';
import { doc } from 'firebase/firestore';
import { NotifType } from '@/types/User';
import type { Notification, User } from '@/types/User';
import { useEffect, useState } from 'react';

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

  // this function adds a notification to the database
  async function createNotification({
    notifType,
    context,
    sender,
    notifTime,
    read = false,
    targetAccount,
  }: {
    notifType: NotifType;
    context: string;
    sender: User;
    notifTime?: Timestamp;
    read?: boolean;
    targetAccount: User;
  }) {
    // get notification subcollection in user
    const notificationRef = typeCollection<Notification>(
      collection(doc(db.users, authUser.uid), 'notifications')
    );

    const newNotification = {
      notifType: notifType,
      notifTime: Timestamp.now(),
      context: context,
      sender: sender,
      read: read,
    };

    // add new doc to collection "notification"
    await addDoc(notificationRef, newNotification);
    setNotifications((curr) => [...curr, newNotification]);
  }

  // console.log(notifications);

  return (
    // tried a bunch of stuff but I can't get "read all" and the bell button side by side loll:')
    <div className="container mx-auto text-white">
      <div className="mb-2 flex justify-between">
        <h1 className="text-3xl font-extrabold">Notifications</h1>
        <div className="flex">
          <Button
            onClick={() => {
              createNotification({
                notifType: NotifType.COMMENT,
                context: 'You received a comment',
                sender: currentUser,
                targetAccount: currentUser,
              });
            }}
          >
            Add notification
          </Button>
          <button>
            <FiBell />
          </button>
          <p>Read all</p>
        </div>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}
