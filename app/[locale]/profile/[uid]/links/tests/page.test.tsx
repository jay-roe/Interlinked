import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/User';
import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { collection, Firestore } from 'firebase/firestore';
import React from 'react';
import Links from '../page';

const params = {
  uid: 1,
};

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
  typeCollection: jest.fn(),
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
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({ docs: [], forEach: jest.fn() }),
  orderBy: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

const currentUser = {
  awards: [],
  codingLanguages: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  linkedUserIds: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
} satisfies User;

const useAuthMock = {
  currentUser: {
    profilePicture: '',
    name: 'John',
    email: '',
    bio: '',
    linkedUserIds: [],
    languages: [],
    education: [],
    courses: [],
    experience: [],
    projects: [],
    skills: [],
    awards: [],
  },
  authUser: {
    uid: '123',
  },
};

const userWithId = { userId: '123', ...currentUser };

it('renders page with no user or loading', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: null,
    };
  });
  const { findByTestId } = render(<Links params={params} />);

  const linkNoUser = await findByTestId('base-msg');
  expect(linkNoUser).toBeInTheDocument();
});

it('renders page with user and no loading', async () => {
  mockedUseAuth.mockImplementation(() => {
    return useAuthMock;
  }); // logged in
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [false, jest.fn()]) //loading state
    .mockImplementationOnce(() => [true, jest.fn()]) //allLinksFound state
    .mockImplementationOnce(() => [[], jest.fn()]) //links state
    .mockImplementationOnce(() => [useAuthMock.currentUser, jest.fn()]); //user state

  const { findByTestId } = render(<Links params={params} />);
  const linkUser = await findByTestId('welcome-msg');
  expect(linkUser).toBeInTheDocument();
});

it('renders page with user and one link', async () => {
  mockedUseAuth.mockImplementation(() => {
    return useAuthMock;
  }); // logged in
  jest.spyOn(React, 'useEffect').mockImplementation(() => {});
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [false, jest.fn()]) //loading state
    .mockImplementationOnce(() => [false, jest.fn()]) //allLinksFound state
    .mockImplementationOnce(() => [[userWithId], jest.fn()]) //links state
    .mockImplementationOnce(() => [useAuthMock.currentUser, jest.fn()]); //user state

  const { findByTestId } = render(<Links params={params} />);
  const linkCard = await findByTestId('profile-card-0');
  const loadMoreButton = await findByTestId('load-more-button-container');
  expect(linkCard).toBeInTheDocument();
  expect(loadMoreButton).toBeInTheDocument();
});

it('renders page with user and 1 link with more links', async () => {
  mockedUseAuth.mockImplementation(() => {
    return useAuthMock;
  }); // logged in
  // jest.spyOn(React, 'useEffect').mockImplementation(() => {});
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [false, jest.fn()]) //loading state
    .mockImplementationOnce(() => [false, jest.fn()]) //allLinksFound state
    .mockImplementationOnce(() => [[userWithId], jest.fn()]) //links state
    .mockImplementationOnce(() => [useAuthMock.currentUser, jest.fn()]); //user state

  const { findByTestId } = render(<Links params={params} />);
  const linkCard = await findByTestId('load-more');
  expect(linkCard).toBeInTheDocument();
});

it('renders page with user and 1 link with no more links', async () => {
  mockedUseAuth.mockImplementation(() => {
    return useAuthMock;
  }); // logged in
  // jest.spyOn(React, 'useEffect').mockImplementation(() => {});
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [false, jest.fn()]) //loading state
    .mockImplementationOnce(() => [true, jest.fn()]) //allLinksFound state
    .mockImplementationOnce(() => [[userWithId], jest.fn()]) //links state
    .mockImplementationOnce(() => [useAuthMock.currentUser, jest.fn()]); //user state

  const { findByTestId } = render(<Links params={params} />);
  const linkCard = await findByTestId('no-load-more');
  expect(linkCard).toBeInTheDocument();
});
