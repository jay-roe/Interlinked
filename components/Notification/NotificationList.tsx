'use client';

import { NotifType } from '@/types/Notification';
import type { Notification } from '@/types/Notification';
import PostNotification from './PostNotification';
import CommentNotification from './CommentNotification';
import LikeNotification from './LikeNotification';
import LinkRequestNotification from './LinkRequestNotification';
import DmNotification from './DmNotification';
import LinkAcceptNotification from './LinkAcceptNotification';
import { Dispatch, SetStateAction } from 'react';

export default function NotificationList({
  notifications,
  setNotifications,
}: {
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
}) {
  // console.log(notifications);
  console.log('set notif list', setNotifications);
  console.log('set notif 0 list', setNotifications[0]);

  return (
    <ul className="mb-3" data-testid="live-notifications">
      {notifications?.map((notif, index) => (
        <li
          key={index}
          className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
        >
          {notif.notifType === NotifType.POST && (
            <PostNotification
              notification={notif}
              setNotification={setNotifications}
            />
          )}
          {notif.notifType === NotifType.COMMENT && (
            <CommentNotification
              notification={notif}
              setNotification={setNotifications}
            />
          )}
          {notif.notifType === NotifType.LIKE && (
            <LikeNotification
              notification={notif}
              setNotification={setNotifications}
            />
          )}
          {notif.notifType === NotifType.LINK_REQ && (
            <LinkRequestNotification
              notification={notif}
              setNotification={setNotifications}
            />
          )}
          {notif.notifType === NotifType.LINK_ACC && (
            <LinkAcceptNotification
              notification={notif}
              setNotification={setNotifications}
            />
          )}
          {notif.notifType === NotifType.DM && (
            <DmNotification
              notification={notif}
              setNotification={setNotifications}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
