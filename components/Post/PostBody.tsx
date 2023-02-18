import { Post } from '@/types/Post';
import { User } from '@/types/User';

const PostBody = ({
  author,
  post,
  currentUser,
}: {
  author?: User;
  post?: Post;
  currentUser?: User;
}) => {
  // Creates the body of the post constaining the title, body text, and image if there is one
  return (
    <div className="mb-3 flex flex-col space-y-2 border-y-2 border-y-white border-opacity-10 p-2">
      <div data-testid="no-title" className="text-2xl font-medium leading-10">
        {post?.title || ''}
      </div>
      <div className="leading-normal">{post?.text_content || ''}</div>
      {post?.image_content ? (
        <img
          data-testid="test-image"
          src={post?.image_content}
          className="max-w-64 max-h-64 object-contain"
          alt="..."
        />
      ) : (
        <></>
      )}{' '}
      {/* object-contain is added to keep large images from taking up the entire body */}
    </div>
  );
};

export default PostBody;
