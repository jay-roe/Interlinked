import { useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

function LikeIcon(props) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <span className="flex flex-nowrap space-x-1 text-accent-orange ">
      <button data-testid="like-btn" onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? <FaThumbsUp data-testid="like"/> : <FaRegThumbsUp data-testid="dislike"/>}
      </button>
      <span className="text-white"> {props.likes} </span>
    </span>
  );
}

export default LikeIcon;
