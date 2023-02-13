'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import CardGrid from '@/components/Card/CardGrid';
import Button from '@/components/Button/Button';

const Feeds = () => {
  const { currentUser } = useAuth();
  // const router = useRouter();

  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-7xl font-extrabold"
        data-testid="title"
      >
        Your feed
      </h1>
      {currentUser ? (
        <div>
          <p data-testid="welcome-msg" className="text-left text-2xl">
            Let&apos;s see what your links are talking about.
          </p>
          <CardGrid gridTemplateColumns="grid-cols-2-1">
            <Card>no</Card>
            <Card className="overflow-y-scroll">
              <Card>beef</Card>
            </Card>
            <Card>yo</Card>
            <Card className="hidden">snow</Card>
            <Card>bro</Card>
          </CardGrid>
        </div>
      ) : (
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
      )}
      {/* <Alert variant='danger' show={isDeletedAlertShow}>
                Successfully deleted your account.
            </Alert> */}
    </div>
  );
};

export default Feeds;
