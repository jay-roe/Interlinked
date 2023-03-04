import LinkButtonNoNumber from '@/components/Buttons/LinkButton/LinkButtonNoNumber';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import CommentHeader from '../CommentHeader';

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const comment = {
  authorID: '',
  author: 'test_author',
  content: '',
  date: mockedDate,
};

const unknown_comment = {
  authorID: '',
  author: 'Unknown',
  content: '',
  date: mockedDate,
};

it('renders author in header for given comment', async () => {
  const { findByText } = render(<CommentHeader comment={comment} />);

  const commentAuthor = await findByText('test_author', { exact: false });
  expect(commentAuthor).toBeInTheDocument();
});

it('renders unknown author in header for given comment', async () => {
  const { findByText } = render(<CommentHeader comment={unknown_comment} />);

  const commentNoAuthor = await findByText('Unknown', { exact: false });
  expect(commentNoAuthor).toBeInTheDocument();
});

it('renders date for given comment', async () => {
  const { findByTestId } = render(<CommentHeader comment={comment} />);

  const commentDate = await findByTestId('test-comment-date');
  expect(commentDate).toBeInTheDocument();
});

it('renders no date for given comment', async () => {
  const { findByTestId } = render(<CommentHeader />);

  const commentNoDate = await findByTestId('test-comment-date');
  expect(commentNoDate).toBeInTheDocument();
});

it('renders link button no number', async () => {
  const { findByTestId } = render(<LinkButtonNoNumber />);

  const linkButtonNoNumber = await findByTestId('link-btn-no-number');
  expect(linkButtonNoNumber).toBeInTheDocument();
});
