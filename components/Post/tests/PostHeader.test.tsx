import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import PostHeader from '../PostHeader';

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
  image_content: '',
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

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
