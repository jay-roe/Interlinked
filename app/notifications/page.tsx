'use client';

import Link from 'next/link';
import {
  getDocs,
  query,
  where,
  documentId,
  orderBy,
  collection,
} from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import { Post } from '@/types/Post';
import { User } from '@/types/User';
import Notifications from '@/components/Notification/Notification';
import { FiBell } from 'react-icons/fi';
import { doc, updateDoc } from 'firebase/firestore';
import { storage } from '@/config/firebase';

const Notification = () => {

  // set the current user
  const { currentUser, authUser, deleteAccount, refresh } = useAuth();

  return (


    // tried a bunch of stuff but I can't get "read all" and the bell button side by side loll:')
    <div className="container mx-auto text-white">
    <div className="mb-2 flex justify-between">
      <h1 className="text-3xl font-extrabold">Notifications</h1>
      <div className="flex start">
        <button>
          <FiBell/>
        </button>
        <p>Read all</p>
      </div>
      
      
    </div>
    <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
      <Notifications notifications={currentUser.notifications}></Notifications>
    </div>
    </div>
      
  );

};

export default Notification;
