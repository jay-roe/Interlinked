'use client';

import { useTranslations } from 'next-intl';

const PostingLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('ManageJobs.jid');
  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-4xl font-extrabold"
        data-testid="sub-title"
      >
        {t('view-applicants')}
      </h1>
      {children}
    </div>
  );
};

export default PostingLayout;
