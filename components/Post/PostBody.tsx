import { Post } from '@/types/Post';
import { User } from '@/types/User';
import ImageOptimized from '../ImageOptimized/ImageOptimized';

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
      <div className="leading-normal">{post?.text_content || ''}</div>
      {post?.image_content &&
        post.image_content[0] &&
        post.image_content.map((image, index) => {
          return (
            <ImageOptimized
              data-testid={`test-image-${index}`}
              key={index}
              src={image}
              className="max-w-64 max-h-64 object-contain"
              alt={post?.title || 'post image'}
              width={256}
              height={256}
            />
          );
        })}
      {/* object-contain is added to keep large images from taking up the entire body */}
    </div>
  );
};

export default PostBody;
