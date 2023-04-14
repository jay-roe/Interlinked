import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileExperience from '../ProfileExperience';
import { render } from '@/renderWrapper';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('config/firebase', () => ({
  storage: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

let mockDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

it('renders the live version of profile experience', async () => {
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          startDate: mockDate,
        },
      ]}
    />
  );
  const exp = await findByTestId('live-exp-0');
  expect(exp).toBeInTheDocument();
});

it('edits an experience', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
        },
      ]}
      setExperience={mockSet}
      isEditable={true}
      experienceEditing={[true]}
    />
  );

  const title = await findByTestId('edit-exp-title-0');
  const location = await findByTestId('edit-exp-location-0');
  const employer = await findByTestId('edit-exp-employer-0');
  const description = await findByTestId('edit-exp-description-0');
  // const image = await findByTestId("edit-exp-image");
  const startDate = await findByTestId('edit-exp-startDate-0');
  const endDate = await findByTestId('edit-exp-endDate-0');

  fireEvent.change(title, { target: { value: 'something different' } });
  fireEvent.change(location, { target: { value: 'something different' } });
  fireEvent.change(employer, { target: { value: 'something different' } });
  fireEvent.change(description, { target: { value: 'something different' } });
  // fireEvent.change(image, { target: { value: 'something different' } });
  fireEvent.change(startDate, { target: { value: mockDate } });
  fireEvent.change(endDate, { target: { value: mockDate } });

  await waitFor(() => expect(mockSet).toBeCalledTimes(6));
});

it('renders the editable version of profile experience', async () => {
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
        },
      ]}
      isEditable={true}
    />
  );

  const exps = await findByTestId('editable-exp');
  expect(exps).toBeInTheDocument();
});

it('tests the experience save button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
        },
      ]}
      isEditable={true}
      experienceEditing={[true]}
      setExperienceEditing={mockClick}
    />
  );

  const saveButton = await findByTestId('exp-save-btn-0');
  fireEvent.submit(saveButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(1));
});

it('tests the experience edit button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
        },
      ]}
      isEditable={true}
      setExperienceEditing={mockClick}
    />
  );

  const editButton = await findByTestId('exp-edit-btn-0');
  fireEvent.click(editButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(1));
});

it('tests the experience delete button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
        },
      ]}
      isEditable={true}
      setExperience={mockClick}
      setExperienceEditing={mockClick}
    />
  );

  const deleteButton = await findByTestId('exp-delete-btn-0');
  fireEvent.click(deleteButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(2));
});

it('tests the experience delete button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileExperience
      experience={[
        {
          title: 'You killed a slime',
          location: 'Narnia',
          employer: 'God',
          description: 'It was a green slime',
          image: 'https://via.placeholder.com/100.png',
          startDate: mockDate,
          endDate: mockDate,
        },
      ]}
      isEditable={true}
      setExperience={mockClick}
      setExperienceEditing={mockClick}
    />
  );

  const addButton = await findByTestId('exp-add-button');
  fireEvent.click(addButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(2));
});
