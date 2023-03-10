import { User } from './User';
import type { Timestamp } from 'firebase/firestore';

export type Message = {
  content: string;
  sender?: User;
  time_stamp?: Timestamp;
};
