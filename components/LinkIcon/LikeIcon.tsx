import { VerifiedIconProps } from '@/types/VerifiedIcon';
import { useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

function VerifiedIcon(props) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <span className="flex flex-nowrap space-x-1 text-accent-orange ">
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? <FaRegThumbsUp /> : <FaThumbsUp />}
      </button>
      <span className="text-white"> {props.likes} </span>
    </span>
  );
}

export default VerifiedIcon;
