'use client';

import { NotifType } from '@/types/User';
import type { Notification } from '@/types/User';
import PostNotification from './PostNotification';
import CommentNotification from './CommentNotification';
import LikeNotification from './LikeNotification';
import LinkRequestNotification from './LinkRequestNotification';
import DmNotification from './DmNotification';
import LinkAcceptNotification from './LinkAcceptNotification';

export default function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  console.log(notifications);

  return (
    <ul className="mb-3" data-testid="live-profile">
      {notifications?.map((notif, index) => (
        <li
          key={index}
          className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
        >
          {notif.notifType === NotifType.POST && (
            <PostNotification notification={notif} />
          )}
          {notif.notifType === NotifType.COMMENT && (
            <CommentNotification notification={notif} />
          )}
          {notif.notifType === NotifType.LIKE && (
            <LikeNotification notification={notif} />
          )}
          {notif.notifType === NotifType.LINK_REQ && (
            <LinkRequestNotification notification={notif} />
          )}
          {notif.notifType === NotifType.LINK_ACC && (
            <LinkAcceptNotification notification={notif} />
          )}
          {notif.notifType === NotifType.DM && (
            <DmNotification notification={notif} />
          )}
        </li>
      ))}
    </ul>
  );
}
