'use client';

import Link from 'next/link';
import { getDocs, query, where, documentId } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import FullPostCard from '@/components/Card/FullPostCard';
import CardGrid from '@/components/Card/CardGrid';
import Button from '@/components/Buttons/Button';
import { Post } from '@/types/Post';
import { User } from '@/types/User';

const Feeds = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<User[]>([]);
  const { currentUser } = useAuth();
  // const router = useRouter();

  // get posts
  useEffect(() => {
    const allPostsQuery = query(db.posts);

    getDocs(allPostsQuery).then((docs) => {
      let postArray: Post[] = [];
      docs.forEach((doc) => {
        postArray.push(doc.data());
      });
      setPosts(postArray);
    });
  }, []);

  // get authors of posts
  useEffect(() => {
    const allAuthors = posts.map((post) => post.authorID);
    const postAuthors = [...new Set(allAuthors)];
    console.log(postAuthors);
    if (postAuthors.length !== 0) {
      const authorsQuery = query(
        db.users,
        where(documentId(), 'in', postAuthors)
      );
      getDocs(authorsQuery).then((docs) => {
        let authorArray: User[] = [];
        docs.forEach((doc) => {
          authorArray.push(doc.data());
        });
        setAuthors(authorArray);
      });
      setLoading(false);
    }
  }, [posts]);

  if (!currentUser || loading) {
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
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        Let&apos;s see what your links are talking about.
      </p>
      {/* {posts.map((post, index) => (
        <p key={index}>{post.text_content}</p>
      ))} */}
      {authors.map((post, index) => {
        console.log(post);
        return <p key={index}>{post.email}</p>;
      })}
      <CardGrid gridTemplateColumns="grid-cols-1">
        <FullPostCard />
        <FullPostCard />
      </CardGrid>
    </div>
  );
};

export default Feeds;
