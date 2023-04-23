import type { Comment } from '@/types/Post';
import LinkButtonNoNumber from '../Buttons/LinkButton/LinkButtonNoNumber';
import Link from '@/components/Link/Link';
import { useLocale } from 'next-intl';
import { localeToDateLocale } from '@/middleware';

const CommentHeader = ({ comment }: { comment?: Comment }) => {
  const locale = useLocale();

  return (
    <div className="mb-1 flex flex-col justify-start">
      <div className="flex justify-between">
        <Link href={`/profile/${comment?.authorID}`}>
          <p className="text-lg leading-10">{comment?.author || 'Unknown'}</p>
        </Link>
        <div>
          <LinkButtonNoNumber
            posterUID={comment?.authorID}
          ></LinkButtonNoNumber>
        </div>
      </div>
      <div data-testid="test-comment-date" className="text-sm font-light">
        {comment?.date?.toDate().toLocaleString(localeToDateLocale[locale], {
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
