import type { JobPostingWithId, JobType } from '@/types/JobPost';
import { Dispatch, SetStateAction } from 'react';

// this function takes the search and job type parameters and filters jobs
export function checkIfJobIsInFiler({
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
  let jobTypeMatches = false;
  // if there is no filter applied, return true
  if (
    !fullTime &&
    !partTime &&
    !internship &&
    (searchKey == null || searchKey == '')
  )
    return true;
  // find out if any job types match
  else if (job.jobType == 'FULLTIME' && fullTime == true) jobTypeMatches = true;
  else if (job.jobType == 'PARTTIME' && partTime == true) jobTypeMatches = true;
  else if (job.jobType == 'INTERNSHIP' && internship == true)
    jobTypeMatches = true;

  if (!jobTypeMatches) {
    return false;
  }
  // if the job types match, check if the job search matches
  else {
    // if there is no search key, return true
    if (searchKey == null || searchKey == '') {
      return true;
    } else {
      // TODO: check if string exists
    }
  }
}
