import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import Card from '../Card';
import CardGrid from '../CardGrid';
import FullPostCard from '../FullPostCard';
import '@testing-library/jest-dom';

jest.mock('@/config/firestore', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
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
  image_content: '',
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
  image_content: '',
  likes: [],
  comments: [],
  date: mockedDate,
  meta_tags: [],
};

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
  const { findByTestId } = render(<Card className={'col-span-1'} />);

  const cardUno = await findByTestId('card', { exact: false });
  expect(cardUno).toBeInTheDocument();
});

// it('renders duo card in FullPostCard', async () => {
//   let { findByTestId } = render(<FullPostCard  />);

//   const cardDuo = await findByTestId('comment-value', { exact: false });
//   expect(cardDuo).toBeInTheDocument();
//   console.log(cardDuo);
// });

it('renders post card in FullPostCard', async () => {
  const { findByTestId } = render(<FullPostCard post={post2} />);

  const postCard = await findByTestId('post-card', { exact: false });
  expect(postCard).toBeInTheDocument();
});
