import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from 'next-intl';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const t = useTranslations('ProtectedRoute');

  if (!currentUser) {
    // user is not authenticated, send to login page
    alert(t('must-be-logged-in'));
    router.push('/login');

    return <></>;
  }
  return children;
};
