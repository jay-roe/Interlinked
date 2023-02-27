'use client';
import { Notification } from '@/types/User';
import PostNotification from '../Notification/PostNotification';
import { NotifType } from '@/types/User';import CommentNotification from './CommentNotification';
import LikeNotification from './LikeNotification';
import LinkRequestNotification from './LinkRequestNotification';
import DmNotification from './DmNotification';
import LinkAcceptNotification from './LinkAcceptNotification';


export default function notification({notifications,} : {notifications: Notification[]}) {


  return (
    
    <ul className="mb-3" data-testid="live-profile">
        {notifications?.map((notif, index) => (
          <li
            key={index}
            className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
          >
            {notif.notifType === NotifType.POST && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.COMMENT && <CommentNotification Notification={notif}/>}
            {notif.notifType === NotifType.LIKE && <LikeNotification Notification={notif}/>}
            {notif.notifType === NotifType.LINK_REQ && <LinkRequestNotification Notification={notif}/>}
            {notif.notifType === NotifType.LINK_ACC && <LinkAcceptNotification Notification={notif}/>}
            {notif.notifType === NotifType.DM && <DmNotification Notification={notif}/>}
          </li>
          
        ))}
      </ul>
    
  );
}
