import type { Timestamp } from 'firebase/firestore';

export type Notification = {
  notifType: NotifType; // your link posts (post), comment or like on your post (interaction), link request (linkedReq), dm
  context: string; // Small bit of text that describes the notif
  sender: string; // User ID that caused notif
  notifTime?: Timestamp;
  read: boolean;
  notificationId?: string;
  chatroomId?: string;
};

export enum NotifType {
  POST = 'POST',
  COMMENT = 'COMMENT',
  LIKE = 'LIKE',
  LINK_REQ = 'LINK_REQ', // someone sends you request to link
  LINK_ACC = 'LINK_ACC', // someone accepted your link request
  DM = 'DM',
}
