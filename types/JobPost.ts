import type { Timestamp } from 'firebase/firestore';
import type { Document } from './User';

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
  externalApplications?: ApplicationLink[];
  hidden: boolean;
  applications: Application[];
  jobType: JobType;
};

export enum JobType {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  INTERNSHIP = 'INTERNSHIP',
}

type ApplicationLink = {
  name: string;
  url: string;
};

export interface JobPostingWithId extends JobPosting {
  postingId: string;
}

export type Application = {
  applicantId: string;
  applicantName: string;
  applicantProfilePic?: string;
  documents: Document[];
  // TODO: this type is not complete, the people working on job applications will finish this
};
