import type { Notification, NotifType } from '@/types/Notification';
import { typeCollection, db } from '@/config/firestore';
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

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
  sender: string; // User ID of sending user
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
  const newDoc = await addDoc(notificationRef, newNotification);

  await updateDoc(newDoc, {
    notificationId: newDoc.id,
  });
}
