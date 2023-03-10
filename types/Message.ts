import { User } from './User';
import type { Timestamp } from 'firebase/firestore';

export type Message = {
  content: string;
  sender: { name: string; profilePicture: string };
  time_stamp?: Timestamp;
};

export type ChatMessage = {
  message: Message;
  id: string;
};
