'use client';
import Button from '@/components/Buttons/Button';
import Card from '@/components/Card/Card';
import LoadingScreen from '@/components/Loading/Loading';
import { db, typeCollection } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { User, UserWithId } from '@/types/User';
import { doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Link from '@/components/Link/Link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function LockedList() {
  const t = useTranslations('Admin.lockedList');
  const [loading, setLoading] = useState(true);
  const [banned, setBanned] = useState<UserWithId[]>([]);

  const { authUser, currentUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!authUser?.uid) {
      router.push('/' + locale + '/');
    }

    // if account is locked or timed out, redirect to locked page
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [authUser, currentUser, router]);

  useEffect(() => {
    getDocs(
      query(typeCollection<User>(db.users), where('accountLocked', '==', true))
    ).then((users) => {
      users.forEach((user) => {
        setBanned((cur) => {
          return [...cur, { ...user.data(), userId: user.id }];
        });
      });
      setLoading(false);
    });
  }, []);

  async function unlockAccount(uid: string) {
    // get account of the person reported and set accountLocked to false
    await updateDoc(doc(db.users, uid), {
      accountLocked: false,
    });
    setBanned((curr) => curr.filter((bannedUser) => bannedUser.userId !== uid));
  }

  return (
    <div className="container mx-auto text-white">
      <Card className="mb-3">
        {loading && <LoadingScreen />}
        <ul>
          {!loading &&
            banned.map((user, index) => (
              <li
                key={index}
                className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
              >
                <div className="start flex items-center justify-between">
                  <div className="flex items-center justify-center">
                    <p>{user.name}</p>
                  </div>
                  <Button
                    data-testid="unban-account-btn"
                    onClick={() => {
                      unlockAccount(user.userId);
                    }}
                  >
                    {t('unban')}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </Card>
      <Link href={'/admin'}>
        <Button>{t('return')}</Button>
      </Link>
    </div>
  );
}
