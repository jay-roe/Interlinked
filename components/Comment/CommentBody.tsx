import { User } from '@/types/User';
import type { Comment } from '@/types/Post';
const CommentBody = ({
  comment,
  testKey,
}: {
  comment?: Comment;
  testKey?: string;
}) => {
  // Creates the body of the comment
  return (
    <div className="mb-1 flex flex-col border-t-2 border-t-white border-opacity-10 pt-2">
      <div data-testid={testKey} className="leading-normal">
        {comment.content || ''}
      </div>
    </div>
  );
};

export default CommentBody;
