import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileContact from '../ProfileContact';

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: 'test@test.com',
  experience: [],
  languages: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
  phone: '123-456-789',
};

it('renders contact info given user', async () => {
  const { findByText } = render(<ProfileContact currentUser={currentUser} />);

  const email = await findByText('test@test.com', { exact: false });
  const phone = await findByText('123-456-789', { exact: false });

  expect(email).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
});
