import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

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

const placeholderImage =
  'https://firebasestorage.googleapis.com/v0/b/interlinked-420e3.appspot.com/o/users%2FgqQVl00qdOga4WOKmLYMi6eLZxx1%2FprofilePicture%2Frocket.png?alt=media&token=66508928-4b2c-4108-be59-91aced79e969';

const post = {
  authorID: '',
  author: '',
  title: 'test_title',
  text_content: 'test_content',
  image_content: [placeholderImage],
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

it('renders content for given post', async () => {
  const { findByText } = render(<PostBody post={post} />);

  const postContent = await findByText('test_content', { exact: false });
  expect(postContent).toBeInTheDocument();
});

it('renders image for given post', async () => {
  const { findByTestId } = render(<PostBody post={post} />);

  const postImage = await findByTestId('test-image-0');
  expect(postImage).toBeInTheDocument();
});
