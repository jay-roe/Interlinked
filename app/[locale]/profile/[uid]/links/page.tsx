'use client';

import { useAuth } from '@/contexts/AuthContext';

import Card from '@/components/Card/Card';
import CardGrid from '@/components/Card/CardGrid';

import type { User, UserWithId } from '@/types/User';

import Link from '@/components/Link/Link';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/Buttons/Button';
import { db } from '@/config/firestore';
import { doc, getDoc } from '@firebase/firestore';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import LinkButtonNoNumber from '@/components/Buttons/LinkButton/LinkButtonNoNumber';
import LoadingScreen from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Links({ params }) {
  const t = useTranslations('PreviewProfile.uid.links');
  const router = useRouter();
  const locale = useLocale();
  const PAGE_SIZE = 20;
  const { currentUser, authUser } = useAuth();
  const myPage = authUser?.uid === params.uid || false;
  const linkedIndex = useRef(0); // keep track of index of linked ids
  const linkedIds = useRef<string[]>(
    myPage
      ? Array.from(new Set(currentUser?.linkedUserIds?.reverse()))
      : undefined
  ); // we reverse since the latest linked user is placed at the end of the array

  const [loading, setLoading] = useState(true);
  const [allLinksFound, setAllLinksFound] = useState(false);
  const [links, setLinks] = useState<UserWithId[]>([]);
  const [user, setUser] = useState<User>(currentUser);

  const getUserLinks = async (uid: string) => {
    const user = await getDoc(doc(db.users, uid));
    if (!user.data().isCompany) {
      setUser(user.data());
      return user.data().linkedUserIds;
    }
  };

  const getLinkInfo = async (uid: string) => {
    let count = 0;
    let links: UserWithId[] = [];
    for (
      let i = linkedIndex.current;
      i < linkedIndex.current + PAGE_SIZE && i < linkedIds?.current?.length;
      i++
    ) {
      const linkedUser = await getDoc(doc(db.users, linkedIds.current[i]));
      links.push({ userId: linkedUser.id, ...linkedUser.data() });
      count++;
    }
    if (count !== PAGE_SIZE) {
      setAllLinksFound(true);
    } // if we finished the loop without getting to the page size, we must have hit the end of the linkedIds array
    else {
      linkedIndex.current += PAGE_SIZE;
    }
    return links;
  };

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (currentUser && !allLinksFound) {
      getUserLinks(params.uid).then((linkIds) => {
        linkedIds.current = linkIds;
        getLinkInfo(params.uid).then((links) => {
          setLinks((current) => [...current, ...links]);
        });
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    router.push('/' + locale + '/account-required');
    return <div> </div>;
  }

  // We don't have access to this profile, kick them to the profile that they came from
  // TODO: Implement access control when profile visibility is added
  return (
    <>
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        {myPage
          ? t('view-your-links')
          : `${t('view-other-links-start')} ${user.name}${t(
              'view-other-links-end'
            )}`}
      </p>
      <CardGrid className="gap-y-4">
        {links?.map((link, index) => {
          return (
            <Link
              href={`/profile/${link.userId}`}
              className="flex items-center justify-start space-x-4"
              key={index}
              data-testid={`profile-card-${index}`}
            >
              <Card className="w-full hover:bg-opacity-[0.18]">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <span>
                      <ImageOptimized
                        data-testid="test-coverphoto"
                        className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
                        src={link?.profilePicture}
                        alt={link?.name}
                        width={32}
                        height={32}
                      />
                    </span>
                    <div className="flex flex-col">
                      <div className="break-all text-sm md:text-lg">
                        {link?.name}
                      </div>
                    </div>
                  </div>
                  <LinkButtonNoNumber posterUID={link.userId} />
                </div>
              </Card>
            </Link>
          );
        })}
      </CardGrid>
      <div
        className="mt-4 flex justify-center"
        data-testid="load-more-button-container"
      >
        {!allLinksFound ? (
          <Button
            className="mx-auto"
            data-testid="load-more"
            onClick={() =>
              getLinkInfo(params.uid).then((links) => {
                setLinks((current) => [...current, ...links]);
              })
            }
          >
            {t('load-more')}
          </Button>
        ) : (
          <p data-testid="no-load-more">{t('no-more')}😥</p>
        )}
      </div>
    </>
  );
}
