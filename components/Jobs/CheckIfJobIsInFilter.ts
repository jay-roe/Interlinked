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
  const jobTypeMatches = (!fullTime && !partTime && !internship) 
    || (job.jobType === 'FULLTIME' && fullTime) 
    || (job.jobType == 'PARTTIME' && partTime) 
    || (job.jobType == 'INTERNSHIP' && internship)

  // check if the job matches the search
  let searchMatches = false;

  if (job.title.toLowerCase().includes(searchKey.toLowerCase()))
    searchMatches = true; // check if the key is in the title
  else if (job.companyName.toLowerCase().includes(searchKey.toLowerCase()))
    searchMatches = true; // check if the key is in the company name
  else if (job.description.toLowerCase().includes(searchKey.toLowerCase()))
    searchMatches = true; // check if the key is in the description
  else {
    // check if the key is in the skills
    let existInSkills = true;
    job.skills.forEach((skill) => {
      if (skill.toLowerCase().includes(searchKey.toLowerCase()))
        searchMatches = true;
    });
  }

  return jobTypeMatches && searchMatches;
}
