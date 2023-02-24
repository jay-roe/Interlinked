import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
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
  serverTimestamp: () => {
    return 5;
  },
}));

global.URL.createObjectURL = jest.fn();
jest.spyOn(window, 'confirm').mockImplementation(() => {
  return true;
});
const mockAlert = jest.fn().mockImplementation(() => {});
jest.spyOn(window, 'alert').mockImplementation(mockAlert);

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

it('can post', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: {},
      authUser: {
        uid: 'myuid',
      },
    };
  });
  const { findByTestId } = render(<CreatePostGroup />);

  const contentDiv = await findByTestId('post-content');
  fireEvent.change(contentDiv, { target: { value: 'post' } });

  expect(contentDiv).toBeInTheDocument();

  const postButton = await findByTestId('post-button');

  fireEvent.click(postButton);

  await waitFor(() => expect(mockAlert).toBeCalled);
  expect(contentDiv).toHaveValue('');
});

it('can add image', async () => {
  const { findByTestId } = render(<CreatePostGroup />);

  const uploadPicBtn = await findByTestId('upload-pic');
  fireEvent.click(uploadPicBtn);

  const imageInput = await findByTestId('image-upload');
  fireEvent.change(imageInput, {
    target: { files: ['file1.txt', 'file2.txt'] },
  });

  const postButton = await findByTestId('post-button');
  fireEvent.click(postButton);

  const contentDiv = await findByTestId('post-content');

  await waitFor(() => expect(contentDiv).toHaveValue(''));
});

it('can remove image', async () => {
  const { findByTestId } = render(<CreatePostGroup />);
  const file1 = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

  const imageInput = await findByTestId('image-upload');
  await waitFor(() =>
    fireEvent.change(imageInput, {
      target: { files: [file1] },
    })
  );

  const delImage = await findByTestId('remove-image-0');
  await waitFor(() => fireEvent.click(delImage));

  expect(delImage).not.toBeInTheDocument();
});
