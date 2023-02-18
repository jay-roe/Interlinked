import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileEducation from '../ProfileEducation';

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
  education: [
    {
      name: 'Concordia',
      location: 'Montreal',
      startDate: mockedDate,
      endDate: mockedDate,
    },
    { name: 'McGill', location: 'Montreal', startDate: mockedDate },
  ],
  email: '',
  experience: [],
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
  const { findByText } = render(<ProfileEducation currentUser={currentUser} />);

  const courseTitle = await findByText('Concordia', { exact: false });
  expect(courseTitle).toBeInTheDocument();
});
