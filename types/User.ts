import type { Timestamp } from 'firebase/firestore';

export type User = {
  accountLocked?: boolean;
  accountTimeout?: boolean;
  accountTimeoutUntil?: Timestamp;
  awards?: Award[];
  bio?: string;
  certifications?: Certification[];
  codingLanguages?: string[];
  courses?: Course[];
  coverPhoto?: string;
  education?: Education[];
  email: string;
  experience?: WorkExperience[];
  languages?: Language[];
  linkedUserIds?: string[];
  name: string;
  nameCaseInsensitive?: string;
  phone?: string;
  profilePicture?: string;
  projects?: Project[];
  recommendations?: Recommendation[];
  skills?: string[];
  socials?: {
    github?: string;
    instagram?: string;
  };
  volunteering?: VolunteeringExperience[];
  isPrivate?: boolean;
  isWantJobNotif?: boolean;
  isCompany?: boolean;
  resume?: Document;
  coverLetter?: Document;
};

export type Company = User & { isCompany: true };

export type Admin = {
  isAdmin: true;
  email: string;
  name: string;
  profilePicture?: string;
};

export const testUser = {
  accountLocked: false,
  accountTimeout: false,
  accountTimeoutUntil: null,
  awards: null,
  bio: 'string;',
  certifications: null,
  codingLanguages: null,
  courses: null,
  coverPhoto: null,
  education: null,
  email: 'bobsaget@unicorn.bob',
  experience: null,
  isCompany: false,
  isPrivate: false,
  languages: null,
  linkedUserIds: null,
  name: 'bob saget',
  phone: '514-463-5924',
  profilePicture: null,
  projects: null,
  recommendations: null,
  skills: null,
  socials: {
    github: null,
    instagram: null,
  },
  volunteering: null,
};

export interface UserWithId extends User {
  userId: string;
}

type Award = {
  title: string;
  description?: string;
  date: Timestamp;
};

type Certification = {
  name: string;
  issuer: string;
  date: Timestamp;
  link?: string;
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
  description?: string;
  image?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
};

interface WorkExperience extends Experience {
  employer: string;
}

interface VolunteeringExperience extends Experience {
  organization: string;
}

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

export type Document = {
  name: string;
  link: string;
  isPrivate: boolean;
};
