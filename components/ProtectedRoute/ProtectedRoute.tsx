import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    // user is not authenticated, send to login page
    alert('You must be logged in to access this page, redirecting.');
    router.push('/login');

    return <></>;
  }
  return children;
};
