'use client';
import { db } from '@/config/firestore';
import type { Notification } from '@/types/Notification';
import { collection, updateDoc, doc } from '@firebase/firestore';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { useAuth } from '@/contexts/AuthContext';
import { Dispatch, SetStateAction } from 'react';

export default function NotifBlueDot({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const { authUser } = useAuth();
  return (
    <button
      onClick={async () => {
        await updateDoc(
          doc(
            collection(doc(db.users, authUser.uid), 'notifications'),
            notification.notificationId
          ),
          {
            read: true,
          }
        );
        // setNotification((notifs) =>
        //         notifs.map((notif, _) => (notif.notificationId === notification.notificationId ? notif.read = !notif.read : notif.read = notif.read )
        //         )
        //       );
      }}
    >
      <div className="text-indigo-600 hover:text-emerald-600">
        {!notification.read && (
          <RiCheckboxBlankCircleFill size={40} data-testid="blue-dot" />
        )}
      </div>
    </button>
  );
}
