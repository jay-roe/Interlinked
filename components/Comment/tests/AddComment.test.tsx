import '@testing-library/jest-dom';
import { act, fireEvent } from '@testing-library/react';
import { render } from '@/renderWrapper';
import AddComment from '../AddComment';

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
  typeCollection: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
  Timestamp: jest.fn(),
  arrayUnion: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

const defaultUserId = 'qDIWdvP2J1dahsSzkLdmpTOfjGe2';

const currentUser = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: '',
  experience: [],
  languages: [],
  name: 'John',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

const currentUser1 = {
  awards: [],
  codingLanguages: [],
  connections: [],
  courses: [],
  education: [],
  email: 'John@gmail.com',
  experience: [],
  languages: [],
  name: '',
  projects: [],
  recommendations: [],
  skills: [],
  volunteering: [],
};

it('renders the AddComment', async () => {
  const { findByTestId } = render(<AddComment />);

  const addComment = await findByTestId('add-comment');
  expect(addComment).toBeInTheDocument();
});

it('renders no content', async () => {
  const { findByTestId } = render(<AddComment testKey={0} />);

  const addCommentToPost = await findByTestId('add-comment-to-post-0');
  fireEvent.click(addCommentToPost);
  expect(addCommentToPost).toBeInTheDocument();
});

it('renders comment with content with user name', async () => {
  const { findByTestId } = render(
    <AddComment
      testKey={0}
      userID={defaultUserId}
      currentUser={currentUser}
      setComments={jest.fn}
      postAuthorID={defaultUserId}
    />
  );

  const addCommentContent = await findByTestId('add-comment-content-0');
  fireEvent.change(addCommentContent, { target: { value: 'testContent' } });
  expect(addCommentContent).toBeInTheDocument();

  await act(async () => {
    const addCommentToPost = await findByTestId('add-comment-to-post-0');
    fireEvent.click(addCommentToPost);
  });
});

it('renders comment with content with user email', async () => {
  const { findByTestId } = render(
    <AddComment
      testKey={0}
      userID={defaultUserId}
      currentUser={currentUser1}
      setComments={jest.fn}
      postAuthorID={defaultUserId}
    />
  );

  const addCommentContent = await findByTestId('add-comment-content-0');
  fireEvent.change(addCommentContent, { target: { value: 'testContent' } });
  expect(addCommentContent).toBeInTheDocument();

  await act(async () => {
    const addCommentToPost = await findByTestId('add-comment-to-post-0');
    fireEvent.click(addCommentToPost);
  });
});
