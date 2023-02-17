import { Post } from '@/types/Post';
import { User } from '@/types/User';
import LinkButtonNoNumber from '../Buttons/LinkButton/LinkButtonNoNumber';

const PostHeader = ({
  author,
  post,
  currentUser,
}: {
  author?: User;
  post?: Post;
  currentUser?: User;
}) => {
  return (
    <div className="mb-3 flex justify-start items-center space-x-4">
      <span>
        <img
          className="h-8 w-8 min-w-[2rem] min-h-[2rem] rounded-full md:h-12 md:w-12"
          src={
            author?.coverPhoto ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
          }
        ></img>
      </span>
      <div className="flex flex-col">
        <div className="text-sm md:text-lg break-all">
          {author?.name || author?.email || 'Unknown'}
        </div>
        <div className="max-md:hidden text-sm font-light">
          {post?.date
            ?.toDate()
            .toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
        <div className="md:hidden text-sm font-light">
          {post?.date
            ?.toDate()
            .toLocaleString('en-US', {
              month: '2-digit',
              year: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
      </div>
      <div>
        <LinkButtonNoNumber currentUser={currentUser}></LinkButtonNoNumber>
      </div>
    </div>
  );
};

export default PostHeader;
