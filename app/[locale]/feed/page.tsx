'use client';

import Link from '@/components/Link/Link';

import {
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  doc,
  collection,
} from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { db, typeCollection } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import FullPostCard from '@/components/Card/FullPostCard';
import CardGrid from '@/components/Card/CardGrid';
import Button from '@/components/Buttons/Button';
import { Post, PostWithId } from '@/types/Post';
import { UserWithId } from '@/types/User';
import CreatePostGroup from '@/components/CreatePostGroup/CreatePostGroup';
import LoadingScreen from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Feeds() {
  const t = useTranslations('Feed');
  const router = useRouter();
  const locale = useLocale();
  const { currentUser, authUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<PostWithId[]>([]);
  const [authors, setAuthors] = useState<UserWithId[]>([]);
  const [postsLeft, setPostsLeft] = useState<boolean>(true);
  const linkedIndex = useRef<number>(0);
  const daysBack = useRef<number>(0);
  const posterIds = useRef<string[]>([]);
  const allAuthorsInfo = useRef<boolean>(false);
  const DAYS_INTERVAL: number = 5;
  const POST_LIMIT: number = 20;

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (currentUser?.linkedUserIds) {
      posterIds.current = Array.from(
        new Set([authUser?.uid, ...currentUser?.linkedUserIds])
      ); // gets rid of any duplicated user ids
      getPostsOhAndAlsoAuthors()
        .then((newPosts) => {
          setPosts((current) => {
            return [
              ...current,
              ...newPosts.sort(
                (post1, post2) => post2.date.seconds - post1.date.seconds
              ),
            ];
          });
          setLoadingPosts(false);
        })
        .catch((err) => console.error(err));
    }
    setLoading(false);
  }, []);

  const getPostsOhAndAlsoAuthors = async (countdown = 3) => {
    if (countdown === 0) {
      return [];
    }
    const numPostsBefore = posts.length;
    if (linkedIndex.current === posterIds.current.length) {
      // we went through all the users in this time interval and we have gotten all our author's info
      daysBack.current += DAYS_INTERVAL;
      linkedIndex.current = 0;
      allAuthorsInfo.current = true;
    }
    let postArray: PostWithId[] = [];
    for (let i = linkedIndex.current; i < posterIds.current.length; i++) {
      if (!allAuthorsInfo.current) {
        // get the selected user from the user collection and also their posts
        const linkedUser = await getDoc(doc(db.users, posterIds.current[i]));
        // add author to list
        setAuthors((current) => [
          ...current,
          { userId: linkedUser.id, ...linkedUser.data() },
        ]);
      }
      // we have already gotten all the user's information, no need to query them again

      // get the posts from that author
      const linkedUserPostsQuery = query(
        typeCollection<Post>(
          collection(doc(db.users, posterIds.current[i]), 'posts')
        ),
        where(
          'date',
          '<',
          new Date(Date.now() - daysBack.current * 24 * 60 * 60 * 1000)
        ),
        where(
          'date',
          '>',
          new Date(
            Date.now() -
              (daysBack.current + DAYS_INTERVAL) * 24 * 60 * 60 * 1000
          )
        ),
        orderBy('date', 'desc')
      );
      const postsOfUser = await getDocs(linkedUserPostsQuery);
      postsOfUser.forEach((post) => {
        postArray.push({ postId: post.id, ...post.data() });
      });
      linkedIndex.current++; // increment the linked index ref
      // got the posts from a single user based on a specific date range, check if we are over our limit for posts and break if we are
      if (numPostsBefore + POST_LIMIT <= numPostsBefore + postArray.length) {
        break;
      }
    }
    // Deep search is a way to check in the past to see if there are any posts after a while. Its needed to check whether to say there are no more posts left
    // The thing is, this is recursive and queries n times the number of people the user is linked with which may become an issue at some point
    if (postArray.length === 0) {
      // no posts found in given range
      setLoadingPosts(true);
      const deepSearch = await getPostsOhAndAlsoAuthors(countdown - 1);
      setLoadingPosts(false);
      if (deepSearch.length === 0) {
        setPostsLeft(false);
      }
      return deepSearch;
    }
    return postArray;
  };

  if (loading) {
    <LoadingScreen />;
  }

  if (!currentUser) {
    // user isnt logged in or the page is still loading
    // TODO make a better loading page
    return (
      <div>
        <p data-testid="base-msg" className="mb-3 text-left text-2xl">
          {t('should-login')}
        </p>
        <div className="text-or flex space-x-1.5">
          <Link href="/login">
            <Button>{t('sign-in')}</Button>
          </Link>
          <Link href="/register">
            <Button>{t('register')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CreatePostGroup />
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        {t('see-what-links-talkinbout')}
      </p>

      <CardGrid className="grid-cols-1">
        {posts.map((post, index) => {
          return (
            <FullPostCard
              key={post.postId}
              testKey={index} // key is for React only and not included in the DOM, so we need this for testing.
              post={post}
              postID={post.postId}
              author={authors.find((author) => author.userId === post.authorID)}
              authorID={post.authorID}
              currentUser={currentUser}
              userID={authUser.uid}
            />
          );
        })}
        {loadingPosts && <LoadingScreen />}
      </CardGrid>
      <div className="mt-4 flex justify-center" data-testid="load-more-button">
        {postsLeft ? (
          // <LoadMoreButton onClick={
          //   getPostsOhAndAlsoAuthors().then((newPosts) => {
          //   setPosts((current) => {
          //     return [
          //       ...current,
          //       ...newPosts.sort(
          //         (post1, post2) => post2.date.seconds - post1.date.seconds
          //       ),
          //     ];
          //   });
          // })}/>
          <Button
            className="mx-auto"
            onClick={() => {
              setLoadingPosts(true);
              getPostsOhAndAlsoAuthors().then((newPosts) => {
                setPosts((current) => {
                  return [
                    ...current,
                    ...newPosts.sort(
                      (post1, post2) => post2.date.seconds - post1.date.seconds
                    ),
                  ];
                });
                setLoadingPosts(false);
              });
            }}
          >
            {t('load-more')}
          </Button>
        ) : (
          <p>{t('no-more')}😥</p>
        )}
      </div>
    </div>
  );
}
