'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
  const { currentAdmin } = useAuth();

  // Uncomment for implementation
  // const [loading, setLoading] = useState(true);
  // const [reports, setReports] = useState<Reports[]>();

  useEffect(() => {
    // if not logged in, redirect to login page
    if (!currentAdmin) {
      router.push('/admin/login');
    }
  }, [currentAdmin, router]);

  return (
    <div className="container mx-auto text-white">
      <div className="mb-3 flex justify-between">
        <h1 className="text-3xl font-extrabold">Reports</h1>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        Insert reports here
      </div>
    </div>
  );
};

export default Admin;
