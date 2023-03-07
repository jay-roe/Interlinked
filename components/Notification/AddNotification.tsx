import type { Notification, NotifType, User } from '@/types/User';
import { typeCollection, db } from '@/config/firestore';
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';

// this function adds a notification to the database
export async function createNotification({
  authUserId,
  notifType,
  context,
  sender,
  notifTime,
  read = false,
  targetAccount,
}: {
  authUserId: string; // TODO: Change 'authUserId' to 'receiver'
  notifType: NotifType; // TODO: Remove since you're using Timestamp.now()
  context: string;
  sender: User;
  notifTime?: Timestamp;
  read?: boolean;
  targetAccount: User; // TODO: Remove since unused, will use the userid to get data
}) {
  // get notification subcollection in user
  const notificationRef = typeCollection<Notification>(
    collection(doc(db.users, authUserId), 'notifications')
  );

  const newNotification = {
    notifType: notifType,
    notifTime: Timestamp.now(),
    context: context,
    sender: sender,
    read: read,
  };

  // add new doc to collection "notification"
  await addDoc(notificationRef, newNotification);
}
