'use client';
import MessageCard from '@/components/DM/MessageCard';
import { FaRegPaperPlane } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import {
  doc,
  getDoc,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  collection,
} from 'firebase/firestore';

import { db, typeCollection } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { Message, ChatMessage } from '@/types/Message';

async function getUser(uid: string) {
  const res = await getDoc(doc(db.users, uid));
  return res.data();
}

export default async function ChatRoom({ params }) {
  const { currentUser, authUser } = useAuth();
  const participant = await getUser(params.uid); // user to whom is being talked to

  const messageRef = typeCollection<Message>(
    collection(doc(db.messages, authUser.uid), params.uid)
  ); // messages -> userID -> participantID

  const [message, setMessage] = useState<string>(''); // message to be sent
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // messages seen by both parties

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (message === '') return; //don't send empty messages

    const newMessage: Message = {
      content: message,
      sender: {
        name: currentUser.name,
        profilePicture: currentUser.profilePicture,
      },
      time_stamp: Timestamp.now(),
    };

    await addDoc(messageRef, newMessage);
    setMessage('');
  };

  useEffect(() => {
    const getChatMessages = query(messageRef, orderBy('time_stamp'));

    const unsubscribe = onSnapshot(getChatMessages, (snapshot) => {
      let messages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push({ message: doc.data(), id: doc.id });
      });
      setChatMessages(messages);
    });

    return () => unsubscribe(); // removes listener
  }, []);

  return (
    <div className="grid grid-cols-8 ">
      <div className="col-span-4 col-start-3">
        Your dms
        <div>
          {chatMessages.map((m) => {
            return (
              <div key={m.id}>
                <MessageCard message={m.message} />
              </div>
            );
          })}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <div>
                <input
                  className=""
                  type="text"
                  placeholder="Write your message..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
              <div>
                <button type="submit">
                  <FaRegPaperPlane />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
