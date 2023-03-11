'use client';
import MessageCard from '@/components/DM/MessageCard';
import { FaRegPaperPlane } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

import { db } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { Message } from '@/types/Message';

export default function ChatRoom({ params }) {
  const { currentUser, authUser } = useAuth();

  const chatRoomRef = doc(db.chatrooms, params.uid); // get right chat

  const [message, setMessage] = useState<string>(''); // message to be sent
  const [chatMessages, setChatMessages] = useState<Message[]>([]); // messages seen by both parties

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

    updateDoc(chatRoomRef, {
      lastMessage: newMessage,
      messages: arrayUnion(newMessage),
    });
    setMessage('');
  };

  useEffect(() => {
    const unsub = onSnapshot(chatRoomRef, (doc) => {
      setChatMessages(doc.data().messages);
    });

    return () => unsub(); // removes listener
  }, []);

  return (
    <div className="grid grid-cols-8 ">
      <div className="col-span-4 col-start-3">
        Your dms
        <div>
          {chatMessages.map((m, id) => {
            return (
              <div key={id}>
                <MessageCard message={m} />
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
