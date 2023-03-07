import CommentIcon from '@/components/Icons/CommentIcon/CommentIcon';
import { Post } from '@/types/Post';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import PostFooter from '../PostFooter';

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
  likes: ['1', '3'],
  comments: [],
  date: mockedDate,
  meta_tags: [],
} satisfies Post;

const post2 = {
  authorID: '',
  author: '',
  title: '',
  text_content: '',
  image_content: [''],
  likes: [],
  comments: [
    {
      authorID: 'deez',
      author: 'tests',
      content: 'shlim shlam',
      date: mockedDate,
    },
  ],
  date: mockedDate,
  meta_tags: [],
} satisfies Post;

it('renders like icon for given post', async () => {
  const { findByTestId } = render(
    <PostFooter
      post={post}
      comments={post.comments}
      commentState={true}
      setCommentState={jest.fn()}
    />
  );

  const likeIconFooter = await findByTestId('test-like-icon-footer');
  expect(likeIconFooter).toBeInTheDocument();
});

it('renders comment icon for given post', async () => {
  const { findByTestId } = render(
    <PostFooter
      comments={post.comments}
      commentState={true}
      setCommentState={jest.fn()}
    />
  );

  const commentIconFooter = await findByTestId('test-comment-icon-footer');
  expect(commentIconFooter).toBeInTheDocument();
});

it('renders no comment value for given post', async () => {
  const { findByText } = render(
    <CommentIcon
      comments={0}
      commentState={false}
      setCommentState={jest.fn()}
    />
  );

  const commentValueFooter = await findByText(0);
  expect(commentValueFooter).toBeInTheDocument();
});

it('renders comment value for given post', async () => {
  const { findByText } = render(
    <CommentIcon comments={1} commentState={true} setCommentState={jest.fn()} />
  );

  const commentValueFooter = await findByText(1);
  expect(commentValueFooter).toBeInTheDocument();
});

it('renders no comments', async () => {
  const { findByText } = render(
    <PostFooter
      post={post}
      comments={post.comments}
      commentState={false}
      setCommentState={jest.fn()}
    />
  );

  const commentValueFooter = await findByText(0);
  expect(commentValueFooter).toBeInTheDocument();
});

it('renders comments for given post', async () => {
  const { findByTestId } = render(
    <PostFooter
      comments={post2.comments}
      commentState={true}
      setCommentState={jest.fn()}
    />
  );

  const commentFooter = await findByTestId('comments');
  expect(commentFooter).toBeInTheDocument();
});
