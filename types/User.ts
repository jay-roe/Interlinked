import type { Timestamp } from 'firebase/firestore';
import type { Post } from '@/types/Post';

export type User = {
  awards?: Award[];
  bio?: string;
  codingLanguages?: string[];
  connections?: User[];
  courses?: Course[];
  coverPhoto?: string;
  education?: Education[];
  email: string;
  experience?: Experience[];
  languages?: Language[];
  name: string;
  phone?: string;
  profilePicture?: string;
  projects?: Project[];
  recommendations?: Recommendation[];
  skills?: string[];
  socials?: {
    github?: string;
    instagram?: string;
  };
  volunteering?: Experience[];
  notifications?: Notifacation[];
};

type Award = {
  title: string;
  description?: string;
  date: Timestamp;
};

type Course = {
  title: string;
  courseNo?: string;
  description?: string;
};

type Education = {
  program: string;
  name: string;
  location: string;
  description?: string;
  image?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
};

type Experience = {
  title: string;
  location: string;
  employer: string;
  description?: string;
  image?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
};

export type Language = {
  title: string;
  proficiency?: string;
};

type Project = {
  title: string;
  collaborators?: {
    name: User['name'];
    profilePicture?: User['profilePicture'];
    id: string;
  }[];
  repoLink?: string;
  demoLink?: string;
  description?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
  image?: string;
};

type Recommendation = {
  title: string;
  description: string;
  recommender: User;
};

type Notifacation = {
  notificationType: string; // post, comment, link, dm
  linkedUser?: User;
  post?: Post;
  // dm?:  Dm;
};
