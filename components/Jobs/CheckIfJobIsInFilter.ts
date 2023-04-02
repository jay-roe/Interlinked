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
  let jobTypeMatches = false;

  // if there is no filter applied, return true
  if (!fullTime && !partTime && !internship) jobTypeMatches = true;
  // find out if any job types match
  else if (job.jobType == 'FULLTIME' && fullTime == true) jobTypeMatches = true;
  else if (job.jobType == 'PARTTIME' && partTime == true) jobTypeMatches = true;
  else if (job.jobType == 'INTERNSHIP' && internship == true)
    jobTypeMatches = true;

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

  if (jobTypeMatches && searchMatches) return true;
  else return false;
}
