import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileProjects from '../ProfileProjects';

let mockDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  name: '',
  projects: [
    {
      title: 'not losing my mind',
      collaborators: [],
      startDate: mockDate,
    },
    {
      title: 'auto puzzle',
      collaborators: [],
      startDate: mockDate,
      endDate: mockDate,
    },
  ],
  recommendations: [],
  skills: [],
  volunteering: [],
};

it('renders projects given user', async () => {
  const { findByText } = render(<ProfileProjects currentUser={currentUser} />);

  const projectName = await findByText('not losing my mind', { exact: false });
  expect(projectName).toBeInTheDocument();
});
