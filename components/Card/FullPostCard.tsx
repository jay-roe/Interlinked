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

const FullPostCard = ({
  author,
  post,
  currentUser,
}: {
  author?: User;
  post?: any;
  currentUser?: User;
}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [postHeight, setPostHeight] = useState(0);

  const postContainer = useRef(null);

  useEffect(() => {
    setPostHeight(postContainer.current.clientHeight);
  });

  console.log(post);
  return (
    <CardGrid
      className={`grid-cols-1 md:grid-cols-2-1 max-h-[${postHeight}px]`}
    >
      {/* Post card */}
      <Card
        className={`${
          commentsOpen ? 'col-span-1' : 'col-span-2'
        } transition-all`}
      >
        <div id="post-content" ref={postContainer}>
          {/* <div>{postHeight}</div> */}
          <PostHeader author={author} post={post} currentUser={currentUser} />
          <PostBody author={author} post={post} currentUser={currentUser} />
          <PostFooter
            post={post}
            commentState={commentsOpen}
            setCommentState={setCommentsOpen}
          />
        </div>
      </Card>
      {/* Comment Card */}
      <Card className={`relative ${commentsOpen ? 'break-words' : 'hidden'}`}>
        {/* Triangle of hell */}
        <div
          className="
        absolute top-[-12px] h-0 w-0 border-l-8 border-b-[12px] border-r-8 border-l-transparent border-b-white border-r-transparent border-opacity-[0.12] md:absolute
        md:left-[-20px] md:top-3 md:h-0 md:w-0 md:border-t-8 md:border-r-[12px] md:border-b-8 md:border-t-transparent md:border-r-white md:border-b-transparent md:border-opacity-[0.12] 
        "
        ></div>
        {/* Comments go here */}
        <div className={`flex flex-col`}>
          {post.comments?.length === 0 || post.comments === null ? (
            <>
              <Card>
                There are no comments here.
                <br /> Now is the time to make your voice heard.
              </Card>
            </>
          ) : (
            <>
              {/* {post.comments.toString()} */}
              {post.comments?.map((comment, index) => {
                return (
                  <Card key={index} className={`flex flex-col`}>
                    <CommentHeader
                      comment={comment}
                      currentUser={currentUser}
                    />
                    <CommentBody comment={comment} />
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
