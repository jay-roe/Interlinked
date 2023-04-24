import { Suspense } from 'react';

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto text-white" data-testid="feed-layout">
      <Suspense>{children}</Suspense>
      <div className="h-32"></div>
    </div>
  );
};

export default FeedLayout;
