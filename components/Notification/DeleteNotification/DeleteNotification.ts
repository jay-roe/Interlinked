import { db } from '@/config/firestore';
import { deleteDoc, doc } from '@firebase/firestore';
import { collection } from 'firebase/firestore';

export async function deleteNotification(
  notificationId: string,
  userID: string
) {
  await deleteDoc(
    doc(collection(doc(db.users, userID), 'notifications'), notificationId)
  );
}
