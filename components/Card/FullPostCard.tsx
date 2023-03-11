import type { Post } from '@/types/Post';
import { User } from '@/types/User';
import { useEffect, useRef, useState } from 'react';
import PostFooter from '../Post/PostFooter';
import PostHeader from '../Post/PostHeader';
import PostBody from '../Post/PostBody';
import Card from './Card';
import CardGrid from './CardGrid';
import CommentHeader from '../Comment/CommentHeader';
import CommentBody from '../Comment/CommentBody';
import AddComment from '../Comment/AddComment';

const FullPostCard = ({
  author,
  authorID,
  post,
  postID,
  currentUser,
  userID,
  testKey,
}: {
  author?: User;
  authorID?: string;
  post?: Post;
  postID?: string;
  currentUser?: User;
  userID?: string;
  testKey?: number;
}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [postHeight, setPostHeight] = useState(0);
  const [comments, setComments] = useState(post?.comments);

  const postContainer = useRef(null);

  useEffect(() => {
    setPostHeight(postContainer.current.clientHeight);
  });

  return (
    <CardGrid
      data-testid="card-grid"
      className={`grid-cols-1 lg:grid-cols-2-1 max-h-[${postHeight}px]`}
    >
      {/* Post card */}
      <Card
        className={`${
          commentsOpen ? 'col-span-1' : 'col-span-2'
        } transition-all`}
      >
        <div
          data-testid={`post-card-${testKey}`}
          id="post-content"
          ref={postContainer}
        >
          {/* <div>{postHeight}</div> */}
          <PostHeader
            author={author}
            authorID={authorID}
            post={post}
            currentUser={currentUser}
          />
          <PostBody author={author} post={post} currentUser={currentUser} />
          <PostFooter
            data-testid="post-footer"
            comments={comments}
            commentState={commentsOpen}
            setCommentState={setCommentsOpen}
            testKey={testKey}
          />
        </div>
      </Card>
      {/* Comment Card */}
      <Card
        className={`relative row-span-2 ${
          commentsOpen ? 'break-words' : 'hidden'
        }`}
      >
        {/* Triangle of hell */}
        <div
          className="
        absolute top-[-12px] h-0 w-0 border-l-8 border-b-[12px] border-r-8 border-l-transparent border-b-white border-r-transparent border-opacity-[0.12] md:absolute
        md:left-[-20px] md:top-3 md:h-0 md:w-0 md:border-t-8 md:border-r-[12px] md:border-b-8 md:border-t-transparent md:border-r-white md:border-b-transparent md:border-opacity-[0.12] 
        "
        ></div>
        {/* Comments go here */}
        <div className={`flex flex-col space-y-3`}>
          <AddComment
            userID={userID}
            currentUser={currentUser}
            postID={postID}
            postAuthorID={authorID}
            comments={comments}
            setComments={setComments}
            testKey={testKey}
          />
          {comments?.length === 0 ||
          comments === null ||
          comments === undefined ? (
            <>
              <Card data-testid={`comments-${testKey}`}>
                There are no comments here.
                <br /> Now is the time to make your voice heard.
              </Card>
            </>
          ) : (
            <>
              {/* Comments for a post */}
              {comments?.map((comment, index) => {
                return (
                  <Card key={index} className={`flex flex-col`}>
                    <CommentHeader
                      comment={comment}
                      currentUser={currentUser}
                    />
                    <CommentBody
                      testKey={`comment-body-${testKey}-${index}`}
                      comment={comment}
                    />
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </Card>
    </CardGrid>
  );
};

export default FullPostCard;
