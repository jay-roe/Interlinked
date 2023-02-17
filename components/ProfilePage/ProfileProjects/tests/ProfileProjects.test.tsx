import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileProjects from '../ProfileProjects';

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
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

it('renders projects given user', async () => {
//   const { findByText } = render(<ProfileProjects currentUser={currentUser} />);

//   const projectName = await findByText('eating', { exact: false });
//   expect(projectName).toBeInTheDocument();
});
