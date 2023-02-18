import type { Dispatch, SetStateAction } from 'react';
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
  return (
    <span
      data-testid="test-like-icon-footer"
      className="flex flex-nowrap space-x-1 text-accent-orange "
    >
      <button onClick={() => setLiked(!likeState)}>
        {likeState ? <FaThumbsUp /> : <FaRegThumbsUp />}
      </button>
      <span className="text-white"> {likeState ? likes + 1 : likes} </span>
    </span>
  );
};

export default LikeIcon;
