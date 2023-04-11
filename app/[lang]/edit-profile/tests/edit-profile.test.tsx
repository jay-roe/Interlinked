import '@testing-library/jest-dom';
import 'intersection-observer';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import EditProfile from '../page';
import { db } from '@/config/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';
import { act } from 'react-dom/test-utils';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  where: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({ docs: [], forEach: jest.fn() }),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

jest.spyOn(window, 'alert').mockImplementation(() => {});

let stringSplitMock = {
  split: () => {
    return '';
  },
};

let dateMock = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

let splitMock = {
  split: () => {
    return '';
  },
} as unknown as String;

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

const placeholderImage =
  'https://firebasestorage.googleapis.com/v0/b/interlinked-420e3.appspot.com/o/users%2FgqQVl00qdOga4WOKmLYMi6eLZxx1%2FprofilePicture%2Frocket.png?alt=media&token=66508928-4b2c-4108-be59-91aced79e969';

const fakeUser = {
  awards: [
    {
      title: 'award',
      description: 'desc',
      date: dateMock,
    },
  ],
  bio: 'LALALALA, something funny here (tee hee)',
  codingLanguages: ['C++, Java, ScriptScript'],
  connections: [''],
  courses: [
    {
      title: 'course',
      courseNo: 'courseYes!',
      description: 'desc',
    },
  ],
  coverPhoto: placeholderImage,
  education: [
    {
      program: 'margorp',
      name: 'eman',
      location: 'noitacol',
      description: 'noitpircsed',
      image: placeholderImage,
      startDate: dateMock,
      endDate: dateMock,
    },
  ],
  email: 'eeeeeeeeeeeee@aaaaaaaaa.OoOoOoO',
  experience: [
    {
      title: 'CrossCode',
      location: 'Hollow Knight',
      employer: 'Celeste',
      description: 'Baba Is You',
      image: placeholderImage,
      startDate: dateMock,
      endDate: dateMock,
    },
  ],
  languages: ['lang', 'other lang'],
  name: 'Bob Angelson',
  phone: '555-555-5555',
  profilePicture: placeholderImage,
  projects: [
    {
      title: 'Kerbal Space Program',
      collaborators: [
        {
          name: 'name',
          profilePicture: placeholderImage,
          id: '5',
        },
      ],
      repoLink: 'Oneshot',
      demoLink: 'FTL (Faster Than Light)',
      description: 'Factorio (PLAY IT!)',
      startDate: dateMock,
      endDate: dateMock,
      image: placeholderImage,
    },
  ],
  skills: ['skill', 'making bad jokes'],
  socials: {
    github: 'Poly Bridge 2',
    instagram: 'Demoncrawl (minesweeper gone rogue)',
  },
  volunteering: [
    {
      title: 'Talos Principle',
      location: 'The Witness',
      employer: 'Taiji',
      description: 'Understand',
      image: placeholderImage,
      startDate: dateMock,
      endDate: dateMock,
    },
  ],
};

// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile

it('check if user is logged out', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null,
      currentUser: null,
    };
  });

  const { findByTestId } = render(<EditProfile />);

  const loginPrompt = await findByTestId('profile-login-prompt');
  expect(loginPrompt).toBeInTheDocument();
});

it('try to update account', async () => {
  jest.spyOn(window, 'confirm').mockImplementation(() => {
    return true;
  });

  mockedUseAuth.mockImplementation(() => {
    return {
      refresh: jest.fn(),
      authUser: {
        providerData: [
          {
            providerId: 'google.com',
          },
        ],
      }, // There IS a current users
      // Need to fill in all the fields in user as it's being manually created instead of us creating a new User object
      // If some fields are left empty, it tries to map a null object and crashes the test
      currentUser: fakeUser,
    };
  });

  const myPush = jest.fn();
  mockedRouter.mockImplementation(() => {
    return {
      push: myPush,
    };
  });

  const { findByTestId } = render(<EditProfile />);

  const updateAccountButton = await findByTestId('update-account-button');
  fireEvent.click(updateAccountButton);

  await waitFor(() => {
    expect(myPush).toBeCalled();
  });
});

it('can delete accont', async () => {
  const myDelete = jest.fn();

  mockedUseAuth.mockImplementation(() => {
    return {
      deleteAccount: myDelete,
      refresh: jest.fn(),
      authUser: {
        providerData: [
          {
            providerId: 'google.com',
          },
        ],
      }, // There IS a current users
      currentUser: fakeUser,
    };
  });

  const { findByTestId } = render(<EditProfile />);

  const deleteAccountBtn = await findByTestId('danger-zone');

  fireEvent.click(deleteAccountBtn);
  // todo need to get into the popup somehow...
});

it('does not update without confirmation', async () => {
  jest.spyOn(window, 'confirm').mockImplementation(() => {
    return false;
  });

  mockedUseAuth.mockImplementation(() => {
    return {
      refresh: jest.fn(),
      authUser: {
        providerData: [
          {
            providerId: 'google.com',
          },
        ],
      }, // There IS a current users
      currentUser: fakeUser,
    };
  });

  const myPush = jest.fn();
  mockedRouter.mockImplementation(() => {
    return {
      push: myPush,
    };
  });

  const { findByTestId } = render(<EditProfile />);

  const updateAccountButton = await findByTestId('update-account-button');
  fireEvent.click(updateAccountButton);
  expect(myPush).not.toBeCalled();
});
