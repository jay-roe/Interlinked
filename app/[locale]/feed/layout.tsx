'use client';

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

const FeedLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('Feed');
  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-7xl font-extrabold"
        data-testid="title"
      >
        {t('feed')}
      </h1>
      <Suspense>{children}</Suspense>
      <div className="h-32"></div>
    </div>
  );
};

export default FeedLayout;
