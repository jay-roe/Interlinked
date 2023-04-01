import type { JobPostingWithId, JobType } from '@/types/JobPost';
import { Dispatch, SetStateAction } from 'react';

// this function takes the search and job type parameters and filters jobs
export async function filterJobList({
  searchKey,
  fullTime,
  partTime,
  internship,
  jobs,
  setFilteredJobs,
}: {
  searchKey: string;
  fullTime: boolean;
  partTime: boolean;
  internship: boolean;
  jobs: JobPostingWithId[];
  setFilteredJobs: Dispatch<SetStateAction<JobPostingWithId[]>>;
}) {
  const newJobs = [];
  let exists = false;
  for (let i = 0; i < jobs.length; i++) {
    // check if the job already exists in the array
    for (let j = 0; j < i; j++) {
      if (jobs[i].postingId == jobs[j].postingId) {
        exists = true;
      }
    }

    if (jobs[i].jobType == 'FULLTIME' && !exists) {
      newJobs.push(jobs[i]);
    }
  }

  setFilteredJobs(jobs);
}
