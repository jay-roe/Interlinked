'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import FullPostCard from '@/components/Card/FullPostCard';
import CardGrid from '@/components/Card/CardGrid';
import Button from '@/components/Buttons/Button';
import { doc, getDocs } from 'firebase/firestore';
import { useState } from 'react';

const Feeds = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { currentUser } = useAuth();
  // const router = useRouter();

  if (!currentUser) {
    return(
      <div>
          <p data-testid="base-msg" className="mb-3 text-left text-2xl">
            You should login first.
          </p>
          <div className="flex space-x-1.5">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      )
  }

  return (
        <div>
          <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
            Let&apos;s see what your links are talking about.
          </p>
          <CardGrid gridTemplateColumns="grid-cols-1">
            <FullPostCard/>
            <FullPostCard/>
          </CardGrid>
        </div>
      ) 
};

export default Feeds;
