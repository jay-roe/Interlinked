import { Post } from '@/types/Post';
import { User } from '@/types/User';
import Link from '@/components/Link/Link';

import LinkButtonNoNumber from '../Buttons/LinkButton/LinkButtonNoNumber';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import { useLocale } from 'next-intl';
import { localeToDateLocale } from '@/config/locales';

const PostHeader = ({
  author,
  authorID,
  post,
}: {
  author?: User;
  authorID?: string;
  post?: Post;
}) => {
  const locale = useLocale();

  return (
    <div className="mb-3 flex items-center justify-start space-x-4">
      <Link
        href={`/profile/${authorID}`}
        className="flex items-center justify-start space-x-4"
      >
        <span>
          <ImageOptimized
            data-testid="test-coverphoto"
            className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
            src={author?.profilePicture}
            alt={author?.name}
            width={32}
            height={32}
          />
        </span>
        <div className="flex flex-col">
          <div className="break-all text-sm md:text-lg">{author?.name}</div>
          <div
            data-testid="test-date"
            className="text-sm font-light max-md:hidden"
          >
            {post?.date?.toDate().toLocaleString(localeToDateLocale[locale], {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="text-sm font-light md:hidden">
            {post?.date?.toDate().toLocaleString(localeToDateLocale[locale], {
              month: '2-digit',
              year: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
            })}
          </div>
        </div>
      </Link>
      <div>
        <LinkButtonNoNumber posterUID={authorID}></LinkButtonNoNumber>
      </div>
    </div>
  );
};

export default PostHeader;
