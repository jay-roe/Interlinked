import '@testing-library/jest-dom';
import 'intersection-observer';
import { render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Notifications from '../page';
import React from 'react';

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

jest.mock('config/firebase', () => ({
  storage: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const useEffect = jest.spyOn(React, 'useEffect').mockImplementation(() => {});

// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile
it('check if user is logged out', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: null,
      currentUser: null,
    };
  });

  const { findByTestId } = render(<Notifications />);

  const loginPrompt = await findByTestId('profile-login-prompt');
  expect(loginPrompt).toBeInTheDocument();
});

// this renders the loading page because I spied on useEffect and the loading is only set to true there. I think I will need to mock
// the components inside of useeffect instead
// if there's no current user or the user isn't autheniticated, it says you must be logged in to edit your profile
// it('user with no notifications is told that they have no notifications', async () => {

//   mockedUseAuth.mockImplementation(() => {
//     return {
//       authUser: {},
//       currentUser: {},
//     };
//   });

//   const { findByTestId } = render(<Notifications />);

//   const nothingMesage = await findByTestId('no-notifications');
//   expect(nothingMesage).toBeInTheDocument();
// });
