import { Dispatch, SetStateAction, useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const LikeIcon = ({
  likeState,
  setLiked,
  likes,
}: {
  likeState: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
  likes: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <span
      data-testid="test-like-icon-footer"
      className="flex flex-nowrap space-x-1 text-accent-orange "
    >
      <button data-testid="like-btn" onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? (
          <FaThumbsUp data-testid="liked" />
        ) : (
          <FaRegThumbsUp data-testid="not-liked" />
        )}
      </button>
      <span className="text-white"> {likeState ? likes + 1 : likes} </span>
    </span>
  );
};

export default LikeIcon;
