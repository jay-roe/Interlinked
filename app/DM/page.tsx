'use client';
import { KeyedChatRoom } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import { where, onSnapshot, query } from 'firebase/firestore';

import { db } from '@/config/firestore';
import { useEffect, useState } from 'react';
import ChatroomCard from '@/components/DM/ChatroomCard';
import Card from '@/components/Card/Card';
import Link from 'next/link';

export default function DMs({ params }) {
  const { authUser } = useAuth();
  const [chats, setChats] = useState<KeyedChatRoom[]>();

  useEffect(() => {
    let tempChats: KeyedChatRoom[] = [];
    const potentialRooms = query(
      db.chatrooms,
      where('participants', 'array-contains', authUser.uid)
    );

    const unsub = onSnapshot(potentialRooms, (snapshot) => {
      snapshot.forEach((doc) => {
        tempChats.push({ room: doc.data(), key: doc.id });
      });
      setChats(tempChats);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black ">
        <b>Your DMs</b>
      </h1>
      <p className="mb-3 text-light-white-text">Strengthen your web</p>
      <Card>
        {chats?.map((keyRoom) => {
          return (
            <Link href={'/DM/' + keyRoom.key}>
              <ChatroomCard key={keyRoom.key} room={keyRoom.room} />
            </Link>
          );
        })}
      </Card>
    </>
  );
}
