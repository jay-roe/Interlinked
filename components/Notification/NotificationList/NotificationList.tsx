'use client';

import { NotifType } from '@/types/Notification';
import type { Notification } from '@/types/Notification';
import PostNotification from '../PostNotification/PostNotification';
import CommentNotification from '../CommentNotification/CommentNotification';
import LikeNotification from '../LikeNotification/LikeNotification';
import LinkRequestNotification from '../LinkRequestNotification/LinkRequestNotification';
import DmNotification from '../DmNotification/DmNotification';
import LinkAcceptNotification from '../LinkAcceptNotification/LinkAcceptNotification';
import { Dispatch, SetStateAction } from 'react';
import JobNotification from '../JobNotification/JobNotification';

export default function NotificationList({
  notifications,
  setNotifications,
}: {
  notifications: Notification[];
  setNotifications?: Dispatch<SetStateAction<Notification[]>>;
}) {
  return (
    <ul className="pt-3" data-testid="live-notifications">
      {
        // Remove duplicate link request notifications (from the same sender)
        notifications
          ?.filter((notif, index, self) =>
            notif.notifType === NotifType.LINK_REQ
              ? index ===
                self.findIndex(
                  (n) =>
                    n.notifType === notif.notifType && n.sender === notif.sender
                )
              : true
          )
          .map((notif, index) => (
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
              {notif.notifType === NotifType.JOB && (
                <JobNotification
                  notification={notif}
                  setNotification={setNotifications}
                />
              )}
            </li>
          ))
      }
    </ul>
  );
}
