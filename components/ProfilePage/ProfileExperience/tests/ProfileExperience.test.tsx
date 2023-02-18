import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileExperience from '../ProfileExperience';

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const currentUser = {
  awards: [],
  bio: '',
  codingLanguages: [],
  connections: [],
  courses: [],
  coverPhoto: '',
  education: [],
  email: '',
  experience: [
    {
      title: 'Janitor',
      location: 'Montreal',
      employer: 'Google',
      startDate: mockedDate,
      endDate: mockedDate,
    },
    {
      title: 'Jester',
      location: 'Castle of Hamilton',
      employer: 'Hamilton',
      startDate: mockedDate,
    },
  ],
  languages: [],
  name: '',
  phone: '',
  profilePicture: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

it('renders education given user', async () => {
  const { findByText } = render(
    <ProfileExperience currentUser={currentUser} />
  );

  const courseTitle = await findByText('Jester', { exact: false });
  expect(courseTitle).toBeInTheDocument();
});
