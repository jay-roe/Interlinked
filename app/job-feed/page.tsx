'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import { JobPosting } from '@/types/JobPost';
import FullJobCard from '@/components/Jobs/FullJobCard';
import { collection, doc, getDocs, Timestamp } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';

export default function Feeds() {
  const { currentUser, authUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  // const router = useRouter();

  useEffect(() => {
    async function getJobPostings() {
      const res = await getDocs(
        typeCollection<JobPosting>(
          collection(doc(db.users, authUser.uid), 'jobPosts')
        )
      );
      return res.docs.map((resData) => resData.data());
    }

    getJobPostings().then((jobs) => {
      setJobs(jobs);
      setLoading(false);
    });
  }, [authUser?.uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || loading) {
    // user isnt logged in or the page is still loading
    // TODO make a better loading page
    return (
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
    );
  }

  return (
    <div>
      {/* <CreatePostGroup /> */}
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        Find new jobs.
      </p>
      {jobs[0] && <FullJobCard job={jobs[0]}></FullJobCard>}
      {/* job postings go here */}
    </div>
  );
}
