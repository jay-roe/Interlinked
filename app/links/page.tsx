'use client';

import { useAuth } from '@/contexts/AuthContext';

import Card from '@/components/Card/Card';
import CardGrid from '@/components/Card/CardGrid';

import type { UserWithId } from '@/types/User';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Button from '@/components/Buttons/Button';
import { db } from '@/config/firestore';
import { doc, getDoc } from '@firebase/firestore';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import LinkButtonNoNumber from '@/components/Buttons/LinkButton/LinkButtonNoNumber';

export default function Links() {
  const PAGE_SIZE = 20;
  const { currentUser } = useAuth();
  const linkedIds = Array.from(new Set(currentUser?.linkedUserIds.reverse())); // we reverse since the latest linked user is placed at the end of the array
  const linkedIndex = useRef(0); // keep track of index of linked ids

  const [loading, setLoading] = useState(true);
  const [allLinksFound, setAllLinksFound] = useState(false);
  const [links, setLinks] = useState<UserWithId[]>([]);

  const getLinkInfo = async () => {
    let count = 0;
    let links: UserWithId[] = [];
    for (
      let i = linkedIndex.current;
      i < linkedIndex.current + PAGE_SIZE && i < linkedIds.length;
      i++
    ) {
      const linkedUser = await getDoc(doc(db.users, linkedIds[i]));
      links.push({ userId: linkedUser.id, ...linkedUser.data() });
      count++;
    }
    console.log(count);
    if (count !== PAGE_SIZE) {
      setAllLinksFound(true);
    } // if we finished the loop without getting to the page size, we must have hit the end of the linkedIds array
    else {
      linkedIndex.current += PAGE_SIZE;
    }
    return links;
  };

  useEffect(() => {
    if (currentUser && !allLinksFound) {
      getLinkInfo().then((links) => {
        setLinks((current) => [...current, ...links]);
        setLoading(false);
      });
    }
  }, [currentUser]);

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
    <>
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        Let&apos;s see what your links are talking about.
      </p>
      <CardGrid className="gap-y-4">
        {links?.map((link, index) => {
          return (
            <Card key={index} className="w-full">
              <div className="flex items-center justify-between space-x-4">
                <Link
                  href={`/profile/${link.userId}`}
                  className="flex items-center justify-start space-x-4"
                >
                  <span>
                    <ImageOptimized
                      data-testid="test-coverphoto"
                      className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
                      src={link?.profilePicture}
                      alt={link?.name || link?.email || 'Link profile picture'}
                      width={32}
                      height={32}
                    />
                  </span>
                  <div className="flex flex-col">
                    <div className="break-all text-sm md:text-lg">
                      {link?.name || link?.email || 'Unknown'}
                    </div>
                  </div>
                </Link>
                <LinkButtonNoNumber
                  currentUser={currentUser}
                ></LinkButtonNoNumber>
              </div>
            </Card>
          );
        })}
      </CardGrid>
      <div className="mt-4 flex justify-center" data-testid="load-more-button">
        {!allLinksFound ? (
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
            onClick={() =>
              getLinkInfo().then((links) => {
                setLinks((current) => [...current, ...links]);
              })
            }
          >
            Load More...
          </Button>
        ) : (
          <p>No more links 😥</p>
        )}
      </div>
    </>
  );
}
