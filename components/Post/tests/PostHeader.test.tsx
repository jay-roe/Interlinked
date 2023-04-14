import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { Timestamp } from 'firebase/firestore';
import PostHeader from '../PostHeader';

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

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

const post = {
  authorID: '',
  author: '',
  title: '',
  text_content: '',
  image_content: [],
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
mockedUseAuth.mockImplementation(() => {
  return {
    authUser: {
      uid: '',
    },
    currentUser: {},
  };
});
it('renders image for given user', async () => {
  const { findByTestId } = render(<PostHeader post={post} />);

  const authorCoverPhoto = await findByTestId('test-coverphoto');
  expect(authorCoverPhoto).toBeInTheDocument();
});

it('renders date for given post', async () => {
  const { findByTestId } = render(<PostHeader post={post} />);

  const authorDate = await findByTestId('test-date');
  expect(authorDate).toBeInTheDocument();
});

it('renders no date for given post', async () => {
  const { findByTestId } = render(<PostHeader />);

  const authorDate = await findByTestId('test-date');
  expect(authorDate).toBeInTheDocument();
});
