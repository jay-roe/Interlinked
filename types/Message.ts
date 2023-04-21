import { Timestamp } from 'firebase/firestore';

export type Message = {
  content: string;
  sender: { name: string; profilePicture: string; id: string };
  time_stamp?: Timestamp;
  file?: string;
  fileType?: string;
  fileName?: string;
};

export type ChatMessage = {
  message: Message;
  id: string;
};

//type for a chat room
export type ChatRoom = {
  roomName?: string;
  recentTimeStamp: Timestamp;
  messages: Message[]; // all messages sent
  lastMessage: Message; // last message sent
  participants: string[]; // uid of participants
};

// used to be able to have a key for each chat room when rendering
export type KeyedChatRoom = {
  room: ChatRoom;
  key: string;
};

export const testMessage = {
  content: 'some beautiful content',
  sender: { name: 'bob', profilePicture: 'test', id: '123456' },
  time_stamp: Timestamp.now(),
};

export const testChatRoom = {
  roomName: '',
  recentTimeStamp: Timestamp.now(),
  messages: [testMessage],
  lastMessage: testMessage,
  participants: ['bob', 'sally'],
};
