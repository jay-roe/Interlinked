import { db } from '@/config/firestore';
import { deleteDoc, doc } from '@firebase/firestore';
import { collection } from 'firebase/firestore';

export async function deleteReport(reportId: string, adminId: string) {
  await deleteDoc(doc(collection(doc(db.users, adminId), 'report'), reportId));
}
