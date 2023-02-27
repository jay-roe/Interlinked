'use client';

import Link from 'next/link';
import {
  getDocs,
  query,
  where,
  documentId,
  orderBy,
  collection,
  Timestamp,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import NotificationList from '@/components/Notification/Notification';
import { FiBell } from 'react-icons/fi';
import { db } from '@/config/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { storage } from '@/config/firebase';
import { NotifType, User } from '@/types/User';


async function getNotifications(authUser){
  const res = await getDocs(collection(doc(db.users, authUser.uid), "notifications"));
  // let array = [];
  // res.forEach((resData) => {
  //   array.push(resData.data())
  // }
  // )
  // return array;
  // return res;

  // return res.docs.map((resData) => ({...resData.data(), id:resData.id}));
  return res.docs.map((resData) => (resData.data()));
}

export default async function Notifications() {

  // set the current user
  const { authUser, currentUser } = useAuth();

  const notifications = await getNotifications(authUser);
  

// this function adds a notification to the database
async function createNotification({
  notifType,
  context,
  sender,
  notifTime,
  read = false,
  targetAccount,
}:
{
  notifType: NotifType;
  context: string;
  sender: User;
  notifTime?: Timestamp;
  read?: boolean;
  targetAccount: User;
}
)
{

  // get notification subcollection in user
  const notificationRef = collection(doc(db.users, authUser.uid), "notifications");

  // add new doc to collection "notification"
  await addDoc(notificationRef, {
      notifType: notifType,
      context: context,
      sender: sender,
      read: read
  }
  );
}



  return (

    // tried a bunch of stuff but I can't get "read all" and the bell button side by side loll:')
    <div className="container mx-auto text-white">
    <div className="mb-2 flex justify-between">
      <h1 className="text-3xl font-extrabold">Notifications</h1>
      <div className="flex start">
        <Button onClick={(e:any) => createNotification({
          notifType: NotifType.COMMENT,
          context: "You received a comment",
          sender: currentUser,
          targetAccount: currentUser
        })}>Add notification</Button>
        <button>
          <FiBell/>
        </button>
        <p>Read all</p>
      </div>
      
      
    </div>
    <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
      <NotificationList notifications={notifications}></NotificationList>
    </div>
    </div>
      
  );

};
