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
  const { findByText } = render(
    <ProfileHeading currentUser={currentUser} bio="" />
  );

  const name = await findByText('Melisa', { exact: false });
  expect(name).toBeInTheDocument();
});

// this doesn't render parts with onclick and onchange so the test ids are't found
it('can change bio', async () => {
  const setBioMock = jest.fn();

  const { findByTestId } = render(
    <ProfileHeading
      currentUser={currentUser}
      bio=""
      bioEditing={true}
      isEditable={true}
      setBio={setBioMock}
    />
  );

  const inputBox = await findByTestId('bio-editing');
  expect(inputBox).toBeInTheDocument();

  fireEvent.change(inputBox, { target: { value: 'NEW BIO' } });

  expect(setBioMock).toHaveBeenCalledTimes(1);
});

it('can edit bio', async () => {
  const setBioEditingMock = jest.fn();

  const { findByTestId } = render(
    <ProfileHeading
      currentUser={currentUser}
      bio=""
      isEditable={true}
      setBioEditing={setBioEditingMock}
    />
  );

  const editButton = await findByTestId('edit-button');
  expect(editButton).toBeInTheDocument();

  fireEvent.click(editButton);

  expect(setBioEditingMock).toHaveBeenCalledTimes(1);
});

it('renders placeholder if user has no name', async () => {
  let currUser = {
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

  const { findByText } = render(
    <ProfileHeading currentUser={currUser} bio="" />
  );

  const namePlaceholder = await findByText('No name provided.');
  expect(namePlaceholder).toBeInTheDocument();
});
