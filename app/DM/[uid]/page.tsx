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
  getDoc,
} from 'firebase/firestore';

import { db } from '@/config/firestore';
import { useEffect, useRef, useState } from 'react';
import { Message } from '@/types/Message';
import Card from '@/components/Card/Card';
import TimeDivider from '@/components/DM/TimeDivider';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { NotifType } from '@/types/Notification';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import type { UserWithId } from '@/types/User';
import Link from 'next/link';

export default function ChatRoom({ params }) {
  const { currentUser, authUser } = useAuth();

  const chatRoomRef = doc(db.chatrooms, params.uid); // get right chat

  const [message, setMessage] = useState<string>(''); // message to be sent
  const [chatMessages, setChatMessages] = useState<Message[]>([]); // messages seen by both parties

  // Participants (not including current user)
  const [participants, setParticipants] = useState<UserWithId[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);

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
      recentTimeStamp: newMessage.time_stamp,
      lastMessage: newMessage,
      messages: arrayUnion(newMessage),
    });

    //send notification to user using ID from chat
    getDoc(chatRoomRef).then((room) => {
      let participants = room.data().participants;

      let id = ''; // id of message notification receiver

      //parsing out receiver from participants[]
      participants.forEach((uid) => {
        if (uid !== authUser.uid) {
          id = uid;
        }
      });

      createNotification({
        notifType: NotifType.DM,
        context: newMessage.content,
        sender: authUser.uid,
        receiver: id,
      });
    });

    setMessage('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const unsub = onSnapshot(chatRoomRef, (doc) => {
      setChatMessages(doc.data().messages);
    });

    return () => unsub(); // removes listener
  }, []);

  useEffect(() => {
    getDoc(chatRoomRef).then((room) => {
      room
        .data()
        .participants.filter((participantID) => participantID !== authUser.uid)
        .forEach((participantID) => {
          getDoc(doc(db.users, participantID)).then((user) => {
            console.log(user.data().name);
            setParticipants((curr) => {
              if (curr.some((usr) => usr.userId === user.id)) return curr;
              return [...curr, { ...user.data(), userId: user.id }];
            });
          });
        });
      setParticipantsLoading(false);
    });
  }, []);

  const dummy = useRef<HTMLDivElement>();

  return (
    <div data-testid="chat-room-root" className="flex h-[85vh] flex-col">
      <div className="flex gap-4">
        {/* TODO: Adjust this when group chats are added. */}
        {!participantsLoading &&
          participants.map((person) => (
            <Link
              key={person.userId}
              className="mb-3 flex w-max items-center gap-4 rounded-xl p-3 hover:bg-purple-component active:bg-purple-component"
              href={`/profile/${person.userId}`}
            >
              <ImageOptimized
                className="rounded-full"
                src={person.profilePicture}
                alt={person.name}
                width={50}
                height={50}
              />
              <h1 className="text-2xl font-bold">{person.name}</h1>
            </Link>
          ))}
      </div>
      <Card className="flex flex-grow flex-col overflow-y-auto rounded-b-none">
        {chatMessages.map((m, id) => {
          return (
            <div key={id}>
              <MessageCard message={m} />

              {id !== chatMessages.length - 1 &&
                chatMessages[id + 1].time_stamp.seconds -
                  m.time_stamp.seconds >=
                  1800 && (
                  <TimeDivider time={chatMessages[id + 1].time_stamp} />
                )}
            </div>
          );
        })}
        <div className="pb-12" ref={dummy}></div>
      </Card>
      <div className="flex w-full rounded-b-xl bg-chat-input-secondary p-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-row  rounded-md bg-chat-text-input p-1 ">
            <input
              className="w-full bg-chat-text-input p-1 focus:outline-none dark:text-white dark:placeholder-gray-400"
              type="text"
              placeholder="Write your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit">
              <FaRegPaperPlane className="active hover:text-accent-orange active:text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
