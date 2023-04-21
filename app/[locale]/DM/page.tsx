'use client';
import { KeyedChatRoom } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import { where, onSnapshot, query } from 'firebase/firestore';

import { db } from '@/config/firestore';
import { useEffect, useState } from 'react';
import ChatroomCard from '@/components/DM/ChatroomCard';
import Card from '@/components/Card/Card';
import Link from '@/components/Link/Link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function DMs() {
  const t = useTranslations('DMPage');
  const router = useRouter();
  const locale = useLocale();
  const { authUser, currentUser } = useAuth();
  const [chats, setChats] = useState<KeyedChatRoom[]>();

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push(`/${locale}/locked`);
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (!authUser) return;

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
          ? -1
          : 1;
      });

      setChats(tempChats);
    });
    return () => unsub();
  }, []);

  if (!currentUser || !authUser) {
    return router.push(`/${locale}`);
  }

  return (
    <div className="flex max-h-[85vh] flex-col" data-testid="dms-page">
      <h1 className="text-4xl font-black ">
        <b>{t('dms')}</b>
      </h1>
      <p className="mb-3 text-light-white-text">{t('strength')}</p>
      <p className="mb-3 text-light-white-text">⚠️ {t('warning')}</p>
      <Card className="flex flex-grow flex-col overflow-auto">
        {chats?.map((keyRoom) => {
          return (
            <Link
              data-testid={`chatroom-${keyRoom.key}`}
              key={keyRoom.key}
              href={'/DM/' + keyRoom.key}
            >
              <ChatroomCard key={keyRoom.key} room={keyRoom.room} />
            </Link>
          );
        })}
      </Card>
    </div>
  );
}
