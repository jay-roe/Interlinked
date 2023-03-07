import { db, typeCollection } from '@/config/firestore';
import { Post } from '@/types/Post';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  updateDoc,
} from 'firebase/firestore';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const LikeIcon = ({
  likes,
  userID,
  postID,
  postAuthorID,
}: {
  likes: string[];
  userID: string;
  postID: string;
  postAuthorID: string;
}) => {
  const initiallyLiked = !!likes?.find((like) => like === userID) || false;

  const [liked, setLiked] = useState(initiallyLiked);

  const toggleLike = async () => {
    let arrayFunction: (...elements: unknown[]) => FieldValue;
    if (!liked) {
      arrayFunction = arrayUnion;
    } else {
      arrayFunction = arrayRemove;
    }
    await updateDoc(
      doc(
        typeCollection<Post>(collection(db.users, postAuthorID, 'posts')),
        postID
      ),
      {
        likes: arrayFunction(userID),
      }
    );
  };

  return (
    <span
      data-testid="test-like-icon-footer"
      className="flex flex-nowrap space-x-1 text-accent-orange "
    >
      <button
        data-testid="like-btn"
        onClick={() => {
          setLiked(!liked);
          toggleLike();
        }}
      >
        {liked ? (
          <FaThumbsUp data-testid="liked" />
        ) : (
          <FaRegThumbsUp data-testid="not-liked" />
        )}
      </button>
      {/* gossest conditional logic */}
      <span className="text-white">
        {' '}
        {initiallyLiked
          ? liked
            ? likes?.length
            : likes?.length - 1
          : liked
          ? likes?.length + 1 || 1
          : likes?.length || 0}{' '}
      </span>
    </span>
  );
};

export default LikeIcon;
