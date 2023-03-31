'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import { JobPosting, JobPostingWithId } from '@/types/JobPost';
import FullJobCard from '@/components/Jobs/FullJobCard';
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { User } from 'firebase/auth';

export default function Feeds() {
  const { currentUser, authUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<JobPostingWithId[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  // const router = useRouter();

  // useEffect(() => {
  //   async function getJobPostings() {
  //     const res = await getDocs(
  //       query(
  //       typeCollection<JobPosting>(
  //         collection(doc(db.users), 'jobPosts')
  //       )
  //       )
  //     );
  //     return res.docs.map((resData) => resData.data());
  //   }

  //   getJobPostings().then((jobs) => {
  //     setJobs(jobs);
  //     setLoading(false);
  //   });
  // }, [authUser?.uid]);

  useEffect(() => {
    async function getUsers() {
      const res = await getDocs(db.companies);
      res.forEach((doc) => {
        if (doc.data().isCompany) {
          // companies.push(doc.id);
          setCompanies((cur) => {
            return [...cur, doc.id];
          });
        }
      });
    }
    getUsers();
  }, []);

  console.log('post1', companies);

  useEffect(() => {
    // if (loading) {
    console.log('reach');
    companies.forEach((comp) => {
      getDocs(
        query(
          typeCollection<JobPostingWithId>(
            collection(doc(db.companies, comp), 'jobPosts')
          )
        )
      ).then((jobs) => {
        jobs.forEach((job) => {
          setJobs((cur) => {
            return [...cur, { ...job.data(), postingId: job.id }];
          });
        });
      });
    });
    setLoading(false);
    // }
  }, [companies]);

  console.log('postss2', companies);
  console.log('jobs', jobs);

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
      {/* job postings go here */}
      {jobs?.map((jb, index) => {
        return <FullJobCard job={jb} />;
      })}
      {/* {jobs && <FullJobCard job={jobs[0]}></FullJobCard>} */}
    </div>
  );
}
