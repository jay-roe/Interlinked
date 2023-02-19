import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CreatePostGroup from '../CreatePostGroup';

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

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

it('renders', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {},
    };
  });
  const { findByTestId } = render(<CreatePostGroup />);

  const postDiv = await findByTestId('create-post');
  expect(postDiv).toBeInTheDocument();
});
