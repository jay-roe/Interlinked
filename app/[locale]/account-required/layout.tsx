'use client';

import { useTranslations } from 'next-intl';

const AccountRequiredLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('AccountRequired');
  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-7xl font-extrabold"
        data-testid="title"
      >
        {t('cannot-access-page')}
      </h1>
      {children}
      <div className="h-32"></div>
    </div>
  );
};

export default AccountRequiredLayout;
