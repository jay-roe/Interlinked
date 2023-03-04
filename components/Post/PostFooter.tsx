import { Dispatch, SetStateAction, useState } from 'react';

import { Comment } from '@/types/Post';
import CommentIcon from '../Icons/CommentIcon/CommentIcon';
import LikeIcon from '../Icons/LikeIcon/LikeIcon';

const PostFooter = ({
  comments,
  commentState,
  setCommentState,
  testKey,
}: {
  comments?: Comment[];
  commentState?: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
  testKey?: number;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="my-2 flex items-center space-x-4">
      <LikeIcon
        data-testid={`like-${testKey}`}
        likes={2}
        likeState={liked}
        setLiked={setLiked}
      />
      <CommentIcon
        data-testid={`comment-${testKey}`}
        comments={
          comments?.length === 0 || comments === null || comments === undefined
            ? 0
            : comments.length
        }
        commentState={commentState}
        setCommentState={setCommentState}
      />
    </div>
  );
};

export default PostFooter;
