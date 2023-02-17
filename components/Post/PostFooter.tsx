import { Dispatch, SetStateAction, useState } from 'react';

import { Post } from '@/types/Post';
import CommentIcon from '../Icons/CommentIcon/CommentIcon';
import LikeIcon from '../Icons/LikeIcon/LikeIcon';

const PostFooter = ({
  post,
  commentState,
  setCommentState,
}: {
  post?: Post;
  commentState?: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="my-2 flex items-center space-x-4">
      <LikeIcon likes={2} likeState={liked} setLiked={setLiked} />
      <CommentIcon
        comments={(post.comments?.length === 0 || post.comments === null || post.comments === undefined)? 
          0 : 
          post.comments.length}
        commentState={commentState}
        setCommentState={setCommentState}
      />
    </div>
  );
};

export default PostFooter;
