'use client';
import { db } from '@/config/firestore';
import { ChatRoom, Message } from '@/types/Message';
import {
  Timestamp,
  arrayUnion,
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
import { useRouter } from 'next/navigation';
import { createNotification } from '../Notification/AddNotification/AddNotification';
import { NotifType } from '@/types/Notification';
import { useTranslations } from 'next-intl';
export default function CreateChatModal({ userUID }: { userUID: string }) {
  const t = useTranslations('DM.CreateChatModal');
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
        recentTimeStamp: newMessage.time_stamp,
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

    createNotification({
      notifType: NotifType.DM,
      context: message,
      sender: authUser.uid,
      receiver: userUID,
      chatroomId: roomID,
    });

    setMessage('');
    if (confirm(t('confirm-go-to-chat')))
      router.push('/DM/' + roomID); // send to chatroom
    else alert(t('alert-sent'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex-inline flex max-w-sm rounded-md bg-purple-text-area py-2 px-3">
          <input
            className="w-full rounded-md bg-purple-text-area p-1 focus:outline-none dark:text-white dark:placeholder-gray-400"
            data-testid="chat-modal-input"
            type="text"
            placeholder={t('write-message')}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button
            data-testid="chat-modal-button"
            type="submit"
            className="text-white hover:text-accent-orange"
          >
            <FaRegPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
}
