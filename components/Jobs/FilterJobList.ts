import type { JobPosting, JobPostingWithId, JobType } from '@/types/JobPost';
import { typeCollection, db } from '@/config/firestore';
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';

// this function takes the search and job type parameters and filters jobs
export async function createNotification({
  searchKey,
  fullTime,
  partTime,
  internship,
  setFilteredJobs,
}: {
  searchKey: string;
  fullTime: boolean;
  partTime: boolean;
  internship: boolean;
  setFilteredJobs: Dispatch<SetStateAction<JobPostingWithId[]>>;
}) {}
