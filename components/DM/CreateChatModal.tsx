'use client';
import Card from '@/components/Card/Card';
import { db, typeCollection } from '@/config/firestore';
import { ChatRoom, Message } from '@/types/Message';
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { timeStamp } from 'console';
import { useRouter } from 'next/navigation';
export default function CreateChatModal({ userUID }: { userUID: string }) {
  const { currentUser, authUser } = useAuth();
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const createChatRoom = async () => {
    const chatRef = doc(db.chatrooms);

    const newMessage: Message = {
      content: message,
      sender: {
        name: currentUser.name,
        profilePicture: currentUser.profilePicture,
      },
      time_stamp: Timestamp.now(),
    };

    // get all rooms where current user is in
    const potentialRooms = query(
      db.chatrooms,
      where('participants', 'array-contains', authUser.uid)
    );

    let ID: string;

    // due to firebase limitation, can only see one value in field array
    // must check if the other participant is also in the room
    const querySnapshot = await getDocs(potentialRooms);
    querySnapshot.forEach((doc) => {
      if (
        doc.data().participants.length == 2 &&
        doc.data().participants.includes(authUser.uid) &&
        doc.data().participants.includes(userUID)
      ) {
        ID = doc.id;
      }
    });

    if (ID) {
      // if chatroom exists, simply send new message
      updateDoc(doc(db.chatrooms, ID), {
        lastMessage: newMessage,
        messages: arrayUnion(newMessage),
      });
    } else {
      // otherwise, create new chatroom with message

      const newChat: ChatRoom = {
        roomName: null,
        messages: [newMessage],
        lastMessage: newMessage,
        participants: [authUser.uid, userUID],
      };

      await setDoc(chatRef, newChat);
      ID = chatRef.id;
    }
    return ID; //  get ID of chatroom
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message === '') return;
    const roomID = await createChatRoom();
    setMessage('');
    if (confirm('Go to chats?'))
      router.push('/DM/' + roomID); // send to chatroom
    else alert('Message sent!');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex-inline flex max-w-sm rounded-md bg-purple-text-area py-2 px-3">
          <input
            className="w-full rounded-md bg-purple-text-area p-1 focus:outline-none"
            type="text"
            placeholder="Write your message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="submit" className="hover:text-accent-orange">
            <FaRegPaperPlane />
          </button>
        </div>
      </form>
    </>
  );
}
