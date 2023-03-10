'use client';
import { db } from '@/config/firestore';
import type { Notification } from '@/types/Notification';
import { User } from '@/types/User';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ImageOptimized from '../ImageOptimized/ImageOptimized';

export default function notificationHeader({
  notification,
}: {
  notification: Notification;
}) {
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
        <p>loading</p>
      </div>
    );
  }
  return (
    <div className="start flex">
      <ImageOptimized
        alt={sender.name}
        width={32}
        height={32}
        className="h-25 min-h-[2rem] w-8 min-w-[2rem] rounded-full p-2 md:h-12 md:w-12"
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
