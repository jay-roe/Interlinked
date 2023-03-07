import { Dispatch, SetStateAction, useState } from 'react';

import { Comment, Post } from '@/types/Post';
import CommentIcon from '../Icons/CommentIcon/CommentIcon';
import LikeIcon from '../Icons/LikeIcon/LikeIcon';
import { User } from '@/types/User';

const PostFooter = ({
  comments,
  commentState,
  setCommentState,
  post,
  postId,
  currentUser,
}: {
  comments?: Comment[];
  commentState?: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
  post?: Post;
  postId?: string;
  currentUser?: User;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="my-2 flex items-center space-x-4">
      <LikeIcon likes={2} likeState={liked} setLiked={setLiked} />
      <CommentIcon
        data-testid="comment-value"
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
