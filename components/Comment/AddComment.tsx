import { FaPaperPlane } from 'react-icons/fa';
import { Comment, Post } from '@/types/Post';
import { User } from '@/types/User';
import type { User as FirebaseUser } from 'firebase/auth';
import Button from '../Buttons/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { db, typeCollection } from '@/config/firestore';
import {
  arrayUnion,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import Card from '../Card/Card';
import CommentHeader from './CommentHeader';
import CommentBody from './CommentBody';

const AddComment = ({
  currentUser,
  userID,
  postID,
  postAuthorID,
  comments,
  setComments,
  testKey,
}: {
  currentUser?: User;
  userID?: string;
  postID?: string;
  postAuthorID?: string;
  comments?: Comment[];
  setComments?: Dispatch<SetStateAction<Comment[]>>;
  testKey?: number;
}) => {
  const [content, setContent] = useState('');

  const addCommentToPost = async () => {
    if (content === '') return;
    const newComment = {
      authorID: userID,
      author: currentUser.name || currentUser.email,
      content: content,
      date: new Timestamp(Date.now() / 1000, 0),
    };

    await updateDoc(
      doc(
        typeCollection<Post>(collection(db.users, postAuthorID, 'posts')),
        postID
      ),
      {
        comments: arrayUnion(newComment),
      }
    );
    setContent('');
    setComments([newComment, ...(comments || [])]);
  };

  return (
    <>
      {/* Comment area */}
      <Card>
        <div
          data-testid="add-comment"
          className="flex items-center justify-between space-x-2"
        >
          <textarea
            data-testid={`add-comment-content-${testKey}`}
            value={content}
            className="block min-h-min w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="Say what's on your mind."
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            data-testid={`add-comment-to-post-${testKey}`}
            onClick={addCommentToPost}
          >
            <FaPaperPlane />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddComment;
