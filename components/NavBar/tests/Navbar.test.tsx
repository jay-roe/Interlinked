import '@testing-library/jest-dom';
import { useAuth } from '@/contexts/AuthContext';
import { render } from '@testing-library/react';
import NavBar from '../NavBar';

jest.mock('contexts/AuthContext', () => ({
  // override the real useAuth, which would require firebase connection
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

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
mockedUseAuth.mockImplementation(() => {
  return {
    authUser: null,
    currentUser: null,
  };
});

it('render nav bar component without a user', async () => {
  const { findByText } = render(<NavBar />);
  const navbarElement = await findByText('Register', { exact: false });
  expect(navbarElement).toBeInTheDocument();
});

it('render nav bar component without a user', async () => {
  const { findByText } = render(<NavBar />);
  const navbarElement = await findByText('Register', { exact: false });
  expect(navbarElement).toBeInTheDocument();
});
