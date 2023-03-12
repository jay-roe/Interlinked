'use client';
import { KeyedChatRoom } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import { where, onSnapshot, query, orderBy } from 'firebase/firestore';

import { db } from '@/config/firestore';
import { useEffect, useState } from 'react';
import ChatroomCard from '@/components/DM/ChatroomCard';
import Card from '@/components/Card/Card';
import Link from 'next/link';
import MessageModal from '@/components/MessageModal/MessageModal';

export default function DMs() {
  const { authUser } = useAuth();
  const [chats, setChats] = useState<KeyedChatRoom[]>();

  useEffect(() => {
    let tempChats: KeyedChatRoom[] = [];
    //get rooms that user is in
    const potentialRooms = query(
      db.chatrooms,
      where('participants', 'array-contains', authUser.uid) //, orderBy("recentTimeStamp")  // create index in firebase
    );

    const unsub = onSnapshot(potentialRooms, (snapshot) => {
      snapshot.forEach((doc) => {
        tempChats.push({ room: doc.data(), key: doc.id });
      });

      //sort chats by most recent
      tempChats.sort((c1: KeyedChatRoom, c2: KeyedChatRoom) => {
        return c1.room.recentTimeStamp.seconds > c2.room.recentTimeStamp.seconds
          ? 1
          : -1;
      });

      setChats(tempChats);
    });
    return () => unsub();
  }, []);

  return (
    <div className="pb-12">
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
    </div>
  );
}
