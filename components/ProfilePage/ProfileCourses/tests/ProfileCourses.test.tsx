import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileCourses from '../ProfileCourses';

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [
    { title: 'intro to testing' },
    { title: "why you shouldn't go into civil" },
    { title: 'blackmail 201' },
  ],
  education: [],
  email: '',
  experience: [],
  languages: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

it('renders courses given user', async () => {
  const { findByText } = render(<ProfileCourses currentUser={currentUser} />);

  const courseTitle = await findByText('intro to testing', { exact: false });
  expect(courseTitle).toBeInTheDocument();
});
