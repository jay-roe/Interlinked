import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '@/renderWrapper';
import ProfileHeading from '../ProfileHeading';

it('renders name given user', async () => {
  const { findByText } = render(
    <ProfileHeading
      profilePictureURL="https://via.placeholder.com/100.png"
      name="Melisa"
      bio="Insert some super interesting stuff here!"
    />
  );

  const name = await findByText('Melisa', { exact: false });
  expect(name).toBeInTheDocument();
});

// this doesn't render parts with onclick and onchange so the test ids are't found
it('can change bio', async () => {
  const setBioMock = jest.fn();

  const { findByTestId } = render(
    <ProfileHeading
      profilePictureURL="https://via.placeholder.com/100.png"
      name="Melisa"
      bio="Insert some super interesting stuff here!"
      bioEditing={true}
      isEditable={true}
      setBio={setBioMock}
    />
  );

  const inputBox = await findByTestId('bio-editing');
  expect(inputBox).toBeInTheDocument();

  inputBox.setAttribute('text', 'NEW BIO');

  const newInputBox = await findByTestId('bio-editing');
  expect(newInputBox).toHaveAttribute('text', 'NEW BIO');
});

it('can edit bio', async () => {
  const setBioEditingMock = jest.fn();

  const { findByTestId } = render(
    <ProfileHeading
      profilePictureURL="https://via.placeholder.com/100.png"
      name="Melisa"
      bio="Insert some super interesting stuff here!"
      isEditable={true}
      setBioEditing={setBioEditingMock}
    />
  );

  const editButton = await findByTestId('bio-edit-button');
  expect(editButton).toBeInTheDocument();

  fireEvent.click(editButton);

  expect(setBioEditingMock).toHaveBeenCalledTimes(1);
});

it('renders placeholder if user has no name', async () => {
  const { findByText } = render(
    <ProfileHeading
      profilePictureURL="https://via.placeholder.com/100.png"
      name=""
      bio="Insert some super interesting stuff here!"
    />
  );

  const namePlaceholder = await findByText('No name provided.');
  expect(namePlaceholder).toBeInTheDocument();
});

it('can set editing name', async () => {
  const setNameEditingMock = jest.fn();

  const { findByTestId } = render(
    <ProfileHeading
      profilePictureURL="https://via.placeholder.com/100.png"
      name="Melisa"
      bio="Insert some super interesting stuff here!"
      isEditable={true}
      setNameEditing={setNameEditingMock}
    />
  );

  const nameEditBtn = await findByTestId('name-edit-button');
  expect(nameEditBtn).toBeInTheDocument();

  fireEvent.click(nameEditBtn);
  expect(setNameEditingMock).toHaveBeenCalledTimes(1);
});

it('can set name', async () => {
  const setNameMock = jest.fn();

  const { findByTestId } = render(
    <ProfileHeading
      profilePictureURL="https://via.placeholder.com/100.png"
      name="Melisa"
      bio="Insert some super interesting stuff here!"
      isEditable={true}
      nameEditing={true}
      setName={setNameMock}
    />
  );

  const nameEditField = await findByTestId('change-name');
  fireEvent.change(nameEditField, { target: { value: 'new nameeeee' } });

  expect(setNameMock).toHaveBeenCalledTimes(1);
});
