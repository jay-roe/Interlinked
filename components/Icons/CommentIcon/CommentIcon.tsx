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
    <span className="flex flex-nowrap space-x-1 text-accent-orange ">
      <button onClick={() => setCommentState(!commentState)}>
        {commentState ? <FaComment /> : <FaRegComment />}
      </button>
      <span className="text-white"> {comments} </span>
    </span>
  );
};

export default CommentIcon;
