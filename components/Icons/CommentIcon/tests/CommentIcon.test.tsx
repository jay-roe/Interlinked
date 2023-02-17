import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import CommentIcon from '../CommentIcon';

it('renders dislike icon by default', async () => {
  const { findByText, findByTestId } = render(
    <CommentIcon comments={'HELLO'} />
  );

  const comments = await findByText('HELLO', { exact: false });
  const notCommentedIcon = await findByTestId('not-commented');

  expect(comments).toBeInTheDocument();
  expect(notCommentedIcon).toBeInTheDocument();
});

it('renders like icon', async () => {
  const { findByTestId } = render(<CommentIcon commented={'keyboard smash'} />);

  const commentButton = await findByTestId('comment-btn');
  fireEvent.click(commentButton);

  const commentedIcon = await findByTestId('commented');
  expect(commentedIcon).toBeInTheDocument();
});
