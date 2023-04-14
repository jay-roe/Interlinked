import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { Timestamp } from 'firebase/firestore';
import CommentBody from '../CommentBody';

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const comment = {
  authorID: '',
  author: '',
  content: 'test_content',
  date: mockedDate,
};

const no_comment = {
  authorID: '',
  author: '',
  content: '',
  date: mockedDate,
};

it('renders body for given comment', async () => {
  const { findByTestId } = render(
    <CommentBody testKey="comment-body-0-0" comment={comment} />
  );

  const commentBody = await findByTestId('comment-body-0-0', { exact: false });
  expect(commentBody).toBeInTheDocument();
});

it('renders no body for given comment', async () => {
  const { findByTestId } = render(
    <CommentBody testKey="comment-body-0-0" comment={no_comment} />
  );

  const commentBody = await findByTestId('comment-body-0-0', { exact: false });
  expect(commentBody).toBeInTheDocument();
});
