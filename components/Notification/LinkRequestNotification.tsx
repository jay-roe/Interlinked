import LinkIcon from '../Icons/LinkIcon/LinkIcon';
import NotificationHeader from './NotificationHeader';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Notification, NotifType } from '@/types/Notification';
import NotifBlueDot from '../NotifBlueDot/NotifBlueDot';
import { createNotification } from '@/components/Notification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
import { deleteNotification } from './DeleteNotification';
import { useState } from 'react';
import React from 'react';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  const { currentUser, authUser } = useAuth();
  return (
    <div className="flex items-center justify-between">
      <div className="start flex items-center">
        <div className="ml-4 text-accent-orange">
          <LinkIcon size={60} />
        </div>
        <div className="ml-5">
          <NotificationHeader notification={notification} />
          <div className="m-3">
            <p>{notification.context}</p>
          </div>
        </div>
      </div>
      <div className="start flex items-center text-accent-orange">
        <button
          data-testid="accept-link-button"
          className="mb-3 mr-2 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold hover:bg-opacity-20 active:bg-opacity-20"
          onClick={async () => {
            createNotification({
              notifType: NotifType.LINK_ACC,
              context: currentUser.name + ' has accepted your request!',
              sender: authUser.uid, // sender
              receiver: notification.sender, // receiver
            });
            // update link requester
            await updateDoc(doc(db.users, notification.sender), {
              linkedUserIds: arrayUnion(authUser.uid),
            });

            // update link receiver
            await updateDoc(doc(db.users, authUser.uid), {
              linkedUserIds: arrayUnion(notification.sender),
            });

            deleteNotification(notification.notificationId, authUser.uid);
          }}
        >
          <BsCheckLg className="m-4" size={30} />
        </button>
        <button
          data-testid="accept-link-button"
          className="mb-3 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold hover:bg-opacity-20 active:bg-opacity-20"
          onClick={() => {
            createNotification({
              notifType: NotifType.LINK_ACC, // cange to LINK_DEC when that's added in properly -> speak with Melisa about it
              context: currentUser.name + ' has declined your request :(',
              sender: authUser.uid, // sender
              receiver: notification.sender, // receiver
            });

            deleteNotification(notification.notificationId, authUser.uid);
          }}
        >
          <BsXLg className="m-4" size={30} />
        </button>
        <div className="m-4">
          <NotifBlueDot notification={notification} />
        </div>
      </div>
    </div>
  );
}
