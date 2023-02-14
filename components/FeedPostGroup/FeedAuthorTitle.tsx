import { User } from '@/types/User';

export default function FeedAuthorTitle(author: User) {
  return (
    <span>
      {author.profilePicture && (
        <div className="row-auto">
          <img
            className="m-auto h-40 w-40 rounded-full md:w-52"
            src={author.profilePicture}
            alt={author.name}
          />
        </div>
      )}
    </span>
  );
}
