import type { Timestamp } from 'firebase/firestore';

export interface AutherTitleProps {
  date: Timestamp;
  name: string;
  isLinked: boolean;
  profilePicture?: string;
}
