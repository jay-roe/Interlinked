import type { Notification, NotifType, User } from '@/types/User';
import { typeCollection, db } from '@/config/firestore';
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';

// this function adds a notification to the database
export async function createNotification({
  notifType,
  context,
  sender,
  read = false,
  receiver,
}: {
  notifType: NotifType;
  context: string;
  sender: User;
  read?: boolean;
  receiver: string; //User ID of the receiver User
}) {
  // get notification subcollection in user
  const notificationRef = typeCollection<Notification>(
    collection(doc(db.users, receiver), 'notifications')
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
