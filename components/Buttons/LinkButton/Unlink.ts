import { db } from '@/config/firestore';
import { updateDoc, doc, arrayRemove } from '@firebase/firestore';

export async function unlink(user1ID: string, user2ID: string) {
  // update unlink requester
  await updateDoc(doc(db.users, user1ID), {
    linkedUserIds: arrayRemove(user2ID),
  });

  // update unlink receiver
  await updateDoc(doc(db.users, user2ID), {
    linkedUserIds: arrayRemove(user1ID),
  });
}
