import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileEducation from '../ProfileEducation';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@/types/User';
import { act } from 'react-dom/test-utils';

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

const education = [
  {
    name: 'Concordia',
    program: 'underwater basket weaving',
    location: 'Montreal',
    startDate: mockedDate,
    endDate: mockedDate,
  },
  {
    name: 'McGill',
    program: 'underwater basket weaving2',
    location: 'Montreal',
    startDate: mockedDate,
  },
];

it('renders education given user', async () => {
  const { findByText } = render(<ProfileEducation education={education} />);

  const courseTitle = await findByText('Concordia', { exact: false });
  expect(courseTitle).toBeInTheDocument();
});

it('renders editable education given user', async () => {
  const { findByTestId } = render(
    <ProfileEducation isEditable={true} education={education} />
  );

  const editable = await findByTestId('editable-edu');
  expect(editable).toBeInTheDocument();
});

it('adds education', async () => {
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={jest.fn}
      setEducationEditing={jest.fn}
    />
  );

  const addNewButton = await findByTestId('add-new-edu');
  expect(addNewButton).toBeInTheDocument();

  fireEvent.click(addNewButton);
});

it('edits education external', async () => {
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={jest.fn}
      setEducationEditing={jest.fn}
    />
  );

  const editButton1 = await findByTestId('edit-edu-ext-1');
  expect(editButton1).toBeInTheDocument();

  fireEvent.click(editButton1);
});

it('edits education program ', async () => {
  const setEduMock = jest.fn();
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={setEduMock}
      setEducationEditing={jest.fn()}
      educationEditing={[true]}
    />
  );

  const editProgram = await findByTestId('change-edu-program-0');
  expect(editProgram).toBeInTheDocument();

  fireEvent.change(editProgram, { target: { value: 'test val' } });
  expect(setEduMock).toHaveBeenCalledTimes(1);
});

it('edits education school ', async () => {
  const setEduMock = jest.fn();
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={setEduMock}
      setEducationEditing={jest.fn()}
      educationEditing={[true]}
    />
  );

  const editSchool = await findByTestId('change-edu-school-0');
  expect(editSchool).toBeInTheDocument();

  fireEvent.change(editSchool, { target: { value: 'test val' } });
  expect(setEduMock).toHaveBeenCalledTimes(1);
});

it('edits education location ', async () => {
  const setEduMock = jest.fn();
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={setEduMock}
      setEducationEditing={jest.fn()}
      educationEditing={[true]}
    />
  );

  const editLocation = await findByTestId('change-edu-location-0');
  expect(editLocation).toBeInTheDocument();

  fireEvent.change(editLocation, { target: { value: 'test val' } });
  expect(setEduMock).toHaveBeenCalledTimes(1);
});

it('edits education description ', async () => {
  const setEduMock = jest.fn();
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={setEduMock}
      setEducationEditing={jest.fn()}
      educationEditing={[true]}
    />
  );

  const editDescription = await findByTestId('change-edu-description-0');
  expect(editDescription).toBeInTheDocument();

  fireEvent.change(editDescription, { target: { value: 'test val' } });
  expect(setEduMock).toHaveBeenCalledTimes(1);
});

it('deletes education', async () => {
  const { findByTestId } = render(
    <ProfileEducation
      isEditable={true}
      education={education}
      setEducation={jest.fn}
      setEducationEditing={jest.fn}
    />
  );

  const deleteButton1 = await findByTestId('delete-edu-ext-1');
  expect(deleteButton1).toBeInTheDocument();

  fireEvent.click(deleteButton1);
});
