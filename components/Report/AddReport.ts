import type { Report } from '@/types/Report';
import { typeCollection, db } from '@/config/firestore';
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

// this function adds a notification to the database
export async function createReport({
  context,
  reporter,
  reporterName,
  reported,
  reportedName,
  read = false,
  chatroomId,
  adminId,
}: {
  context: string;
  reporter: string; // User ID of person that reported
  reporterName: string; // name of person that reported
  reported: string; // User ID of person that got reported
  reportedName: string; // name of person that got reported
  read?: boolean;
  chatroomId?: string;
  adminId: string;
}) {
  // get report subcollection in user
  const reportRef = typeCollection<Report>(
    collection(doc(db.users, adminId), 'report')
  );

  const newReport = {
    reportTime: Timestamp.now(),
    context: context,
    reporter: reporter,
    reporterName: reporterName,
    reported: reported,
    reportedName: reportedName,
    read: read || false,
    chatroomId: chatroomId || '',
  };

  // add new doc to collection "notification"
  const newDoc = await addDoc(reportRef, newReport);

  await updateDoc(newDoc, {
    reportId: newDoc.id,
  });

  return newDoc.id;
}
