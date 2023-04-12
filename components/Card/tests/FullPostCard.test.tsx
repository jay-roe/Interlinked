import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import Card from '../Card';
import CardGrid from '../CardGrid';
import FullPostCard from '../FullPostCard';
import '@testing-library/jest-dom';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

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

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const post = {
  authorID: '',
  author: '',
  title: '',
  text_content: '',
  image_content: [''],
  likes: [],
  comments: [
    {
      authorID: 'test_authorID',
      author: 'test_author',
      content: 'test_content',
      date: mockedDate,
    },
  ],
  date: mockedDate,
  meta_tags: [],
};

const post2 = {
  authorID: '',
  author: '',
  title: '',
  text_content: '',
  image_content: [''],
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
mockedUseAuth.mockImplementation(() => {
  return {
    authUser: {
      uid: 'notPosterID',
    },
    currentUser: {},
  };
});
it('renders author in header for given comment', async () => {
  const { findByText } = render(<FullPostCard post={post} />);

  const commentAuthor = await findByText('test_author', { exact: false });
  expect(commentAuthor).toBeInTheDocument();
});

it('renders card grid in FullPostCard', async () => {
  const { findByTestId } = render(<CardGrid />);

  const cardGrid = await findByTestId('card-grid', { exact: false });
  expect(cardGrid).toBeInTheDocument();
});

it('renders uno card in FullPostCard', async () => {
  const { findByTestId } = render(
    <Card data-testid="card" className={'col-span-1'} />
  );

  const cardUno = await findByTestId('card', { exact: false });
  expect(cardUno).toBeInTheDocument();
});

it('renders post card in FullPostCard', async () => {
  const { findByTestId } = render(<FullPostCard post={post2} />);

  const postCard = await findByTestId('post-card', { exact: false });
  expect(postCard).toBeInTheDocument();
});
