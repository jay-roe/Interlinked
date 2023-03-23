import type { Timestamp } from 'firebase/firestore';

export type Report = {
  context: string; // Small bit of text that describes the report
  reporter: string; // User ID that reported
  reported: string;
  reportTime: Timestamp;
  read: boolean;
  chatroomId?: string;
  reportId?: string;
};
