'use client';
import { db } from '@/config/firestore';
import type { Notification } from '@/types/Notification';
import { collection, updateDoc, doc } from '@firebase/firestore';
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';
import { useAuth } from '@/contexts/AuthContext';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';

export default function NotifBlueDot({
  notificationRead,
  notificationId,
  setNotification, //necessary to update parent object about new read state (for read all button)
}: {
  notificationRead: boolean;
  notificationId: string;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const { authUser } = useAuth();
  const [read, setRead] = useState(notificationRead);
  useEffect(() => {
    setRead(notificationRead);
    console.log(notificationRead);
  }, [notificationRead]);
  return (
    <button
      onClick={async () => {
        await updateDoc(
          doc(
            collection(doc(db.users, authUser.uid), 'notifications'),
            notificationId
          ),
          {
            read: !read,
          }
        );
        setRead((curr) => !curr);
        setNotification((curr) =>
          curr.map((notif) => {
            if (notif.notificationId === notificationId) {
              return {
                ...notif,
                read: !notif.read,
              };
            }
            return notif;
          })
        );
      }}
    >
      <div className="text-indigo-600 hover:text-emerald-600">
        {read ? (
          <RiCheckboxBlankCircleLine size={40} data-testid="blue-dot" />
        ) : (
          <RiCheckboxBlankCircleFill size={40} data-testid="blue-dot" />
        )}
      </div>
    </button>
  );
}
