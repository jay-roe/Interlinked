import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '@/renderWrapper';
import LikeIcon from '../LikeIcon';

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
  arrayRemove: jest.fn(),
  arrayUnion: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

it('renders not liked icon by default', async () => {
  const { findByText, findByTestId } = render(
    <LikeIcon
      userID=""
      postID=""
      postAuthorID=""
      likes={['user1', 'user2', 'user3', 'user4', 'user5']}
    />
  );

  const likeCount = await findByText('5', { exact: false });
  const dislikeIcon = await findByTestId('not-liked');

  expect(likeCount).toBeInTheDocument();
  expect(dislikeIcon).toBeInTheDocument();
});

it('renders like icon', async () => {
  const { findByTestId } = render(
    <LikeIcon
      userID=""
      postID=""
      postAuthorID=""
      likes={['user1', 'user2', 'user3', 'user4', 'user5']}
    />
  );

  const likeButton = await findByTestId('like-btn');
  fireEvent.click(likeButton);

  const likeIcon = await findByTestId('liked');
  expect(likeIcon).toBeInTheDocument();
});
