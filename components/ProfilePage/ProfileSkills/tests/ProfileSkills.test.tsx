import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileSkills from '../ProfileSkills';

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
  skills: [
    {name: 'coding'}, 
    {name: 'juggling'},
    {name: 'eating'}],
  volunteering: [],
};

it('renders skills given user', async () => {
  const { findByText } = render(<ProfileSkills currentUser={currentUser} />);

  const skillName = await findByText('eating', { exact: false });
  expect(skillName).toBeInTheDocument();
});
