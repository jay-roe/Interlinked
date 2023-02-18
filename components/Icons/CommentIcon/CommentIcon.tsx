import type { Dispatch, SetStateAction } from 'react';
import { FaRegComment, FaComment } from 'react-icons/fa';

const CommentIcon = ({
  commentState,
  setCommentState,
  comments,
}: {
  commentState: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
  comments: number;
}) => {
  return (
    <span
      data-testid="test-comment-icon-footer"
      className="flex flex-nowrap space-x-1 text-accent-orange "
    >
      <button onClick={() => setCommentState(!commentState)}>
        {commentState ? <FaComment /> : <FaRegComment />}
      </button>
      <span data-testid="comments" className="text-white">
        {' '}
        {comments}{' '}
      </span>
    </span>
  );
};

export default CommentIcon;
