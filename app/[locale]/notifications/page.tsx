'use client';

import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import NotificationList from '@/components/Notification/NotificationList/NotificationList';
import { FiBell } from 'react-icons/fi';
import { typeCollection, db } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { Notification } from '@/types/Notification';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';

export default function Notifications() {
  const t = useTranslations('NotificationsPage');
  const { authUser, currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // User not logged in, redirect to account required
    if (!currentUser || !authUser) {
      router.push('/' + locale + '/account-required');
    }

    // if account is locked or timed out, redirect to locked page
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }

    // get the notifications from the database
    async function getNotifications() {
      const res = await getDocs(
        query(
          typeCollection<Notification>(
            collection(doc(db.users, authUser.uid), 'notifications')
          ),
          orderBy('notifTime', 'desc')
        )
      );
      return res.docs.map((resData) => resData.data());
    }

    // set the notifications
    if (currentUser) {
      getNotifications().then((notifs) => {
        setNotifications(notifs);
        setLoading(false);
      });
    }
  }, [authUser?.uid]);

  // mark all the user's notifications as read
  async function readAll() {
    const notifUnreadQuery = typeCollection<Notification>(
      collection(doc(db.users, authUser.uid), 'notifications')
    );
    const unreadNotifs = await getDocs(notifUnreadQuery);
    unreadNotifs.forEach(async (notif) => {
      await updateDoc(
        doc(collection(doc(db.users, authUser.uid), 'notifications'), notif.id),
        {
          read: true,
        }
      );
    });

    // set the notifications to a new value
    setNotifications((curr) =>
      curr.map((notif) => ({
        ...notif,
        read: true,
      }))
    );
  }

  return (
    <div className="container mx-auto text-white">
      <div className="mb-2 flex justify-between">
        <h1 className="text-3xl font-extrabold">{t('notifications')}</h1>
        <div className="flex gap-3">
          <button
            data-testid="read-all-button"
            onClick={() => {
              readAll();
            }}
          >
            <div className="flex items-center gap-2 rounded-xl bg-white bg-opacity-[8%] p-3">
              <FiBell />
              <p>{t('read-all')}</p>
            </div>
          </button>
        </div>
      </div>
      <div className="sm:rounded-xl sm:bg-white sm:bg-opacity-[8%] sm:p-5">
        {loading && <LoadingScreen />}
        {notifications?.length > 0 ? (
          <NotificationList
            notifications={notifications}
            setNotifications={setNotifications}
          />
        ) : (
          <p data-testid="no-notifications">{t('empty')}</p>
        )}
      </div>
    </div>
  );
}
