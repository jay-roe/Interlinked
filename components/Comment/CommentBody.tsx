import { User } from '@/types/User';
import type { Comment } from '@/types/Post';
const CommentBody = ({ comment }: { comment?: Comment }) => {
  // Creates the body of the comment
  return (
    <div className="mb-1 flex flex-col border-t-2 border-t-white border-opacity-10 pt-2">
      <div className="leading-normal">{comment.content || ''}</div>
    </div>
  );
};

export default CommentBody;
