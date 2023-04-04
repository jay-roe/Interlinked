import type { JobPostingWithId, JobType } from '@/types/JobPost';
import { Dispatch, SetStateAction } from 'react';

// this function takes the search and job type parameters and filters jobs
export function checkIfJobIsInFilter({
  searchKey,
  fullTime,
  partTime,
  internship,
  job,
}: {
  searchKey: string;
  fullTime: boolean;
  partTime: boolean;
  internship: boolean;
  job: JobPostingWithId;
}) {
  // check if the job matches the job type
  // check if there is no filter applied or job types match
  const jobTypeMatches =
    (!fullTime && !partTime && !internship) ||
    (job.jobType === 'FULLTIME' && fullTime) ||
    (job.jobType == 'PARTTIME' && partTime) ||
    (job.jobType == 'INTERNSHIP' && internship);

  // check if the job matches the search
  const searchMatches =
    job.title.toLowerCase().includes(searchKey.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchKey.toLowerCase()) ||
    job.description.toLowerCase().includes(searchKey.toLowerCase()) ||
    job.skills.some((skill) =>
      skill.toLowerCase().includes(searchKey.toLowerCase())
    ) ||
    job.keywords?.some((keyword) =>
      keyword.keyword.includes(searchKey.toLowerCase())
    );

  return jobTypeMatches && searchMatches;
}
