import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('ProtectedRoute');

  if (!currentUser) {
    // user is not authenticated, send to login page
    alert(t('must-be-logged-in'));
    router.push('/' + locale + '/login');

    return <></>;
  }
  return children;
};
