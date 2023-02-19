import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import LikeIcon from '../LikeIcon';

it('renders dislike icon by default', async () => {
  const { findByText, findByTestId } = render(<LikeIcon likes={5} />);

  const likeCount = await findByText('5', { exact: false });
  const dislikeIcon = await findByTestId('not-liked');

  expect(likeCount).toBeInTheDocument();
  expect(dislikeIcon).toBeInTheDocument();
});

it('renders like icon', async () => {
  const { findByTestId } = render(<LikeIcon likes={5} />);

  const likeButton = await findByTestId('like-btn');
  fireEvent.click(likeButton);

  const likeIcon = await findByTestId('liked');
  expect(likeIcon).toBeInTheDocument();
});
