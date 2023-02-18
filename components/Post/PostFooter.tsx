import { Dispatch, SetStateAction, useState } from 'react';

import { Comment } from '@/types/Post';
import CommentIcon from '../Icons/CommentIcon/CommentIcon';
import LikeIcon from '../Icons/LikeIcon/LikeIcon';

const PostFooter = ({
  comments,
  commentState,
  setCommentState,
}: {
  comments?: Comment[];
  commentState?: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="my-2 flex items-center space-x-4">
      <LikeIcon likes={2} likeState={liked} setLiked={setLiked} />
      <CommentIcon
        comments={(comments?.length === 0 || comments === null || comments === undefined)? 
          0 : 
          comments.length}
        commentState={commentState}
        setCommentState={setCommentState}
      />
    </div>
  );
};

export default PostFooter;
