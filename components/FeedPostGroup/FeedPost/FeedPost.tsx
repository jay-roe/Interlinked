import CommentIcon from '@/components/Icons/CommentIcon/CommentIcon';
import LikeIcon from '@/components/Icons/LikeIcon/LikeIcon';
import type { Post } from '@/types/Post';

export default function FeedPost() {
  const image = require('../Screenshot 2023-02-10 194009.png');
  return (
    <div className="orange flex justify-center">
      <div className="orange max-w-sm rounded-lg shadow-lg">
        <h5 className="para-med mb-2 text-xl text-white">Card title</h5>

        <div className="p-6">
          <p className="mb-4 text-base text-white">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <img src={String(image)} alt="alternative" />
          <span className="flex flex-nowrap space-x-3">
            <LikeIcon likes="24" />
            <CommentIcon comments="2" />
          </span>
        </div>
      </div>
    </div>
  );
}
