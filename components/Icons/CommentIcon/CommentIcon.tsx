import { useState } from 'react';
import { FaRegComment, FaComment } from 'react-icons/fa';

function LikeIcon(props) {
  const [isCommented, setIsCommented] = useState(false);

  return (
    <span className="flex flex-nowrap space-x-1 text-accent-orange ">
      <button
        data-testid="comment-btn"
        onClick={() => setIsCommented(!isCommented)}
      >
        {isCommented ? (
          <FaComment data-testid="commented" />
        ) : (
          <FaRegComment data-testid="not-commented" />
        )}
      </button>
      <span className="text-white"> {props.comments} </span>
    </span>
  );
}

export default LikeIcon;
