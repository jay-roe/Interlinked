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

const Notification = () => {

  return (

    <div>
      <div>
        <h1 className="text-4xl font-bold">
          Create a Post{' '}
        </h1>
        <p data-testid="welcome-msg" className="mb-3 text-left text-xl">
          What's been going on?
        </p>
      </div>
      

      <Notifications></Notifications>

    </div>
      
  );

};

export default Notification;
