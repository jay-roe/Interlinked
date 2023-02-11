import { useState } from 'react';
import { FaRegComment, FaComment } from 'react-icons/fa';

function LikeIcon(props) {
  const [isCommented, setIsCommented] = useState(false);

  return (
    <span className="flex flex-nowrap space-x-1 text-accent-orange ">
      <button onClick={() => setIsCommented(!isCommented)}>
        {isCommented ? <FaRegComment /> : <FaComment />}
      </button>
      <span className="text-white"> {props.likes} </span>
    </span>
  );
}

export default LikeIcon;
