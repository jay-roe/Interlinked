import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Profile from '../page';
import { db } from '@/config/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

// on the profile page, if you're logged in, it will show your profile and a delete account option
// if you're not logged in, give the option to login instead

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

let dateMock = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;


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
  coverPhoto: 'https://via.placeholder.com/100.png',
  education: [
    {
      program: 'margorp',
      name: 'eman',
      location: 'noitacol',
      description: 'noitpircsed',
      image: 'https://via.placeholder.com/100.png',
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
      image: 'CHR$(143)',
      startDate: dateMock,
      endDate: dateMock,
    },
  ],
  languages: ['lang', 'other lang'],
  name: 'Bob Angelson',
  phone: '555-555-5555',
  profilePicture: 'https://via.placeholder.com/100.png',
  projects: [
    {
      title: 'Kerbal Space Program',
      collaborators: [
        {
          name: 'name',
          profilePicture: 'https://via.placeholder.come/100.png',
          id: '5',
        },
      ],
      repoLink: 'Oneshot',
      demoLink: 'FTL (Faster Than Light)',
      description: 'Factorio (PLAY IT!)',
      startDate: dateMock,
      endDate: dateMock,
      image:
        "I've listed a bunch of real good games here, all highly recommended by Craig!",
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
      image: 'Patricks Parabox',
      startDate: dateMock,
      endDate: dateMock,
    },
  ],
}

// I have to figure out how to either pass the object in properly so the toDate() function can be called on dates
// or I need to mock toDate() (TimeStamp.toDate())

it('check if user is logged in', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {}, // There IS a current users
      currentUser: fakeUser,
    };
  });

  const { findByTestId } = render(<Profile />);

  const profileInfo = await findByTestId('profile-info');
  expect(profileInfo).toBeInTheDocument();
});

it('check if user is logged out', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null, // There IS a current users
    };
  });

  const { findByTestId } = render(<Profile />);

  const profileInfo = await findByTestId('profile-login-prompt');
  expect(profileInfo).toBeInTheDocument();
});
