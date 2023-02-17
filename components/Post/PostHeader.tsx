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
    <div className="mb-3 flex items-center space-x-4">
      <span>
        <img
          className="h-10 w-10 min-w-min rounded-full md:h-12 md:w-12"
          src={
            author?.coverPhoto ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
          }
        ></img>
      </span>
      <div className="flex flex-col">
        <div className="text-lg">
          {author?.name || author?.email || 'Unknown'}
        </div>
        <div className="text-sm font-light">
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
      </div>
      <div>
        <LinkButtonNoNumber currentUser={currentUser}></LinkButtonNoNumber>
      </div>
    </div>
  );
};

export default PostHeader;
