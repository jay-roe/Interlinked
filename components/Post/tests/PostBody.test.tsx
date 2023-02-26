import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import PostBody from '../PostBody';

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
  title: 'test_title',
  text_content: 'test_content',
  image_content: ['test_image'],
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

it('renders title for given post', async () => {
  const { findByText } = render(<PostBody post={post} />);

  const postTitle = await findByText('test_title', { exact: false });
  expect(postTitle).toBeInTheDocument();
});

it('renders no title for given post', async () => {
  const { findByTestId } = render(<PostBody />);

  const postNoTitle = await findByTestId('no-title', { exact: false });
  expect(postNoTitle).toBeInTheDocument();
});

it('renders content for given post', async () => {
  const { findByText } = render(<PostBody post={post} />);

  const postContent = await findByText('test_content', { exact: false });
  expect(postContent).toBeInTheDocument();
});

it('renders image for given post', async () => {
  const { findByTestId } = render(<PostBody post={post} />);

  const postImage = await findByTestId('test-image');
  expect(postImage).toBeInTheDocument();
});
