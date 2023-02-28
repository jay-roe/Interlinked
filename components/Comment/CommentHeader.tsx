import { Post } from '@/types/Post';
import { User } from '@/types/User';
import type { Comment } from '@/types/Post';
import LinkButtonNoNumber from '../Buttons/LinkButton/LinkButtonNoNumber';
import Link from 'next/link';

const CommentHeader = ({
  comment,
  currentUser,
}: {
  comment?: Comment;
  currentUser?: User;
}) => {
  return (
    <div className="mb-1 flex flex-col justify-start">
      <div className="flex justify-between">
        <Link href={`/profile/${comment.authorID}`}>
          <p className="text-lg leading-10">{comment?.author || 'Unknown'}</p>
        </Link>
        <div>
          <LinkButtonNoNumber currentUser={currentUser}></LinkButtonNoNumber>
        </div>
      </div>
      <div data-testid="test-comment-date" className="text-sm font-light">
        {comment?.date?.toDate().toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }) || 'Unknown'}
      </div>
    </div>
  );
};

export default CommentHeader;
