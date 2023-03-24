import type { Timestamp } from 'firebase/firestore';

export type JobPosting = {
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  companyProfilePic: string;
  datePosted: Timestamp;
  skills: string[];
  location: string;
  deadline: Timestamp;
  cvRequired: boolean;
  coverLetterRequired: boolean;
  externalApplicationLink?: string;
  hidden: boolean;
  applications: Application[];
};

export interface JobPostingWithId extends JobPosting {
  postingId: string;
}

export type Application = {
  applicantId: string;
  applicantName: string;
  applicantProfilePic?: string;
  documents: never;
  // TODO: this type is not complete, the people working on job applications will finish this
};
