'use client';

import Link from 'next/link';
import { getDocs, query, where, documentId, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import FullPostCard from '@/components/Card/FullPostCard';
import CardGrid from '@/components/Card/CardGrid';
import Button from '@/components/Buttons/Button';
import { Post } from '@/types/Post';
import { User } from '@/types/User';
import CreatePostGroup from '@/components/CreatePostGroup/CreatePostGroup';

export default function Feeds() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postIDs, setPostIDs] = useState<string[]>([]);
  const [authors, setAuthors] = useState<Record<string, User>>({}); // This object is formatted in a way where the document id is used as a key to get the user information
  const { currentUser, authUser } = useAuth();
  // const router = useRouter();

  // get posts
  useEffect(() => {
    const allPostsQuery = query(db.posts, orderBy('date', 'desc'));

    getDocs(allPostsQuery)
      .then((docs) => {
        let postArray: Post[] = []; // we make this array first so we only update the state once and only when all the data is there
        let postIdArray: string[] = [];
        docs.forEach((doc) => {
          postArray.push(doc.data());
          postIdArray.push(doc.id);
        });
        setPosts(postArray);
        setPostIDs(postIdArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // get authors of posts
  useEffect(() => {
    const allAuthors = posts.map((post) => {
      return post['authorID'];
    });
    const postAuthors = [...new Set(allAuthors)];
    // we get the whole set of authors from the posts as posts have the author id attatched to them
    if (postAuthors.length !== 0) {
      const authorsQuery = query(
        db.users,
        where(documentId(), 'in', postAuthors)
      );
      getDocs(authorsQuery).then((docs) => {
        let authorObject: Record<string, User> = {}; // we do the same 'set the state once'
        docs.forEach((doc) => {
          authorObject[doc.id] = doc.data();
        });
        setAuthors(authorObject);
      });
      setLoading(false); // we're finally done getting info
    }
  }, [posts]); // only update when the posts change

  if (!currentUser || loading) {
    // user isnt logged in or the page is still loading
    // TODO make a better loading page
    return (
      <div>
        <p data-testid="base-msg" className="mb-3 text-left text-2xl">
          You should login first.
        </p>
        <div className="flex space-x-1.5">
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CreatePostGroup />
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        Let&apos;s see what your links are talking about.
      </p>

      <CardGrid className="grid-cols-1">
        {posts.map((post, index) => {
          return (
            <FullPostCard
              key={index}
              testKey={index} // key is for React only and not included in the DOM, so we need this for testing.
              post={post}
              postID={postIDs[index]}
              author={authors[post.authorID]}
              currentUser={currentUser}
              authUser={authUser}
            />
          );
        })}
      </CardGrid>
    </div>
  );
}
