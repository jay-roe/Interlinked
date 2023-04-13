import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import {
  findAllByTestId,
  findByTestId,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { render } from '@/renderWrapper';
import { Timestamp } from 'firebase/firestore';
import ProfileAwards from '../ProfileAwards';

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

it('renders the live version of profile awards', async () => {
  const { findByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: 'You did something awesome!',
          description: 'it was really cool!',
          date: mockDate,
        },
      ]}
    />
  );
  const awards = await findByTestId('live-award-0');
  expect(awards).toBeInTheDocument();
});

it('edits an award', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: 'You did something awesome!',
          description: 'it was really cool!',
          date: mockDate,
        },
        {
          title: "You're cool if you're reading this!",
          description: '*blushes*',
          date: mockDate,
        },
      ]}
      isEditable={true}
      awardsEditing={[true, false]}
      setAwards={mockSet}
    />
  );

  const title = await findByTestId('awards-title-box-0');
  const date = await findByTestId('awards-date-box-0');
  const desc = await findByTestId('awards-desc-box-0');

  fireEvent.change(title, { target: { value: 'something different' } });
  fireEvent.change(date, { target: { value: mockDate } });
  fireEvent.change(desc, { target: { value: 'something different again!' } });

  await waitFor(() => expect(mockSet).toBeCalledTimes(3));
});

it('renders the editable version of profile awards', async () => {
  const { findAllByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: 'You did something awesome!',
          description: 'it was really cool!',
          date: mockDate,
        },
        {
          title: "You're cool if you're reading this!",
          description: '*blushes*',
          date: mockDate,
        },
      ]}
      isEditable={true}
      awardsEditing={[false, false]}
    />
  );

  const edawds = await findAllByTestId('editable-awards');
  expect(edawds[0]).toBeInTheDocument();
});

it('tests the awards save button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: "You're cool if you're reading this!",
          description: '*blushes*',
          date: mockDate,
        },
      ]}
      isEditable={true}
      awardsEditing={[true]}
      setAwardsEditing={mockClick}
    />
  );

  const saveButton = await findByTestId('awards-save-btn-0');
  fireEvent.submit(saveButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(1));
});

it('tests the awards edit button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: 'You did something awesome!',
          description: 'it was really cool!',
          date: mockDate,
        },
        {
          title: "You're cool if you're reading this!",
          description: '*blushes*',
          date: mockDate,
        },
      ]}
      isEditable={true}
      awardsEditing={[true, false]}
      setAwardsEditing={mockClick}
    />
  );

  const editButton = await findByTestId('awards-edit-btn-1');
  fireEvent.click(editButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(1));
});

it('tests the awards delete button', async () => {
  const mockClick = jest.fn();
  const { findAllByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: 'You did something awesome!',
          description: 'it was really cool!',
          date: mockDate,
        },
        {
          title: "You're cool if you're reading this!",
          description: '*blushes*',
          date: mockDate,
        },
      ]}
      isEditable={true}
      setAwards={mockClick}
      setAwardsEditing={mockClick}
    />
  );

  const deleteButton = await findAllByTestId('awards-delete-btn-0');
  fireEvent.click(deleteButton[0]);
  await waitFor(() => expect(mockClick).toBeCalledTimes(2));
});

it('tests the awards delete button', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileAwards
      awards={[
        {
          title: "You're cool if you're reading this!",
          description: '*blushes*',
          date: mockDate,
        },
      ]}
      isEditable={true}
      setAwards={mockClick}
      setAwardsEditing={mockClick}
    />
  );

  const addButton = await findByTestId('awards-add-button');
  fireEvent.click(addButton);
  await waitFor(() => expect(mockClick).toBeCalledTimes(2));
});
