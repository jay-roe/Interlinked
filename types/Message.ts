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

export type ChatRoom = {
  roomName?: string;
  messages: Message[]; // all messages sent
  lastMessage: Message; // last message sent
  participants: string[]; // uid of participants
};
