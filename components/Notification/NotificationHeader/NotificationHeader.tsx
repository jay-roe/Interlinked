'use client';
import { db } from '@/config/firestore';
import type { Notification } from '@/types/Notification';
import { User } from '@/types/User';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import ImageOptimized from '../../ImageOptimized/ImageOptimized';

export default function NotificationHeader({
  notification,
}: {
  notification: Notification;
}) {
  const t = useTranslations('Notification.Header');
  const [sender, setSender] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getDoc(doc(db.users, notification.sender)).then((res) => {
      setSender(res.data());
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div>
        <p>{t('loading')}</p>
      </div>
    );
  }
  return (
    <div className="start flex">
      <ImageOptimized
        alt={sender.name}
        width={32}
        height={32}
        className="h-12 w-12 rounded-full p-2 md:h-12 md:w-12"
        src={sender.profilePicture}
      />
      <div>
        <p>{sender.name}</p>
        <p>
          {notification.notifTime?.toDate().toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
