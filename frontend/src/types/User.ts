export type User = {
  awards: Award[];
  bio?: string;
  codingLanguages: string[];
  connections: User[];
  courses: Course[];
  coverPhoto?: string;
  education: Education[];
  email: string;
  experience: Experience[];
  languages: string[];
  name: string;
  profilePicture?: string;
  projects: Project[];
  recommendations: Recommendation[];
  skills: Skill[];
  socials?: {
    github?: string;
    instagram?: string;
  }
  volunteering: Experience[];
}

type Award = {
  title: string;
  description: string;
  date: Date;
}

type Course = {
  title: string;
  description: string;
}

type Education = {
  name: string;
  location: string;
  description: string;
  image: string;
}

type Experience = {
  title: string;
  location: string;
  employer: string;
  startDate: Date;
  endDate?: Date;
}

type Project = {
  title: string;
  repoLink: string;
  demoLink: string;
  description: string;
  image: string;
}

type Recommendation = {
  title: string;
  description: string;
  recommender: User;
}

type Skill = {
  name: string;
}