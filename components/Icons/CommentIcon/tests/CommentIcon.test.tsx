import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import CommentIcon from '../CommentIcon';

it('renders dislike icon by default', async () => {
  const { findByText, findByTestId } = render(
    <CommentIcon commentState={false} comments={0} setCommentState={jest.fn} />
  );

  const comments = await findByText(0, { exact: false });
  const notCommentedIcon = await findByTestId('not-commented');

  expect(comments).toBeInTheDocument();
  expect(notCommentedIcon).toBeInTheDocument();
});

it('renders like icon', async () => {
  const { findByTestId } = render(
    <CommentIcon commentState={true} comments={5} setCommentState={jest.fn} />
  );

  const commentButton = await findByTestId('comment-btn');
  fireEvent.click(commentButton);

  const commentedIcon = await findByTestId('commented');
  expect(commentedIcon).toBeInTheDocument();
});
