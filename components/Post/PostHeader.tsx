import { Post } from '@/types/Post';
import { User } from '@/types/User';
import Link from 'next/link';
import LinkButtonNoNumber from '../Buttons/LinkButton/LinkButtonNoNumber';

const PostHeader = ({
  author,
  authorID,
  post,
  currentUser,
}: {
  author?: User;
  authorID?: string;
  post?: Post;
  currentUser?: User;
}) => {
  return (
    <div className="mb-3 flex items-center justify-start space-x-4">
      <Link
        href={`/profile/${authorID}`}
        className="flex items-center justify-start space-x-4"
      >
        <span>
          <img
            data-testid="test-coverphoto"
            className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
            src={
              author?.profilePicture ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
            }
          ></img>
        </span>
        <div className="flex flex-col">
          <div className="break-all text-sm md:text-lg">
            {author?.name || author?.email || 'Unknown'}
          </div>
          <div
            data-testid="test-date"
            className="text-sm font-light max-md:hidden"
          >
            {post?.date?.toDate().toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }) || 'Unknown'}
          </div>
          <div className="text-sm font-light md:hidden">
            {post?.date?.toDate().toLocaleString('en-US', {
              month: '2-digit',
              year: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
            }) || 'Unknown'}
          </div>
        </div>
      </Link>
      <div>
        <LinkButtonNoNumber currentUser={currentUser}></LinkButtonNoNumber>
      </div>
    </div>
  );
};

export default PostHeader;
