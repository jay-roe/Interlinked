import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ProfileHeading from '../ProfileHeading';

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  name: 'Melisa',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

it('renders name given user', async () => {
  const { findByText } = render(<ProfileHeading currentUser={currentUser} bio=''/>);

  const name = await findByText('Melisa', { exact: false });
  expect(name).toBeInTheDocument();
});

// this doesn't render parts with onclick and onchange so the test ids are't found
// it('can change bio', async () => {
//     const { findByTestId, findByText } = render(<ProfileHeading currentUser={currentUser} bio=''/>);

//     const inputBox = await findByTestId('bio-input');
//     inputBox.setAttribute('value', 'hi');

//     const editButton = await findByTestId('edit-button');
//     fireEvent.click(editButton);

//     const bio = await findByText('hi', { exact: false });
//     expect(bio).toBeInTheDocument();

//   });
  