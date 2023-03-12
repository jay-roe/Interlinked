import { Timestamp } from 'firebase/firestore';

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
  recentTimeStamp: Timestamp;
  messages: Message[]; // all messages sent
  lastMessage: Message; // last message sent
  participants: string[]; // uid of participants
};

export type KeyedChatRoom = {
  room: ChatRoom;
  key: string;
};

export const testMessage = {
  content: 'some beautiful content',
  sender: { name: 'bob', profilePicture: 'test' },
  time_stamp: Timestamp.now(),
};

export const testChatRoom = {
  roomName: '',
  recentTimeStamp: Timestamp.now(),
  messages: [testMessage],
  lastMessage: testMessage,
  participants: ['bob', 'sally'],
};
