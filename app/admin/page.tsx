'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiBell } from 'react-icons/fi';

const Admin = () => {
  const router = useRouter();
  const { currentAdmin } = useAuth();

  // Uncomment for implementation
  // const [loading, setLoading] = useState(true);
  // const [reports, setReports] = useState<Reports[]>();

  useEffect(() => {
    // if not logged in, redirect to home page
    if (!currentAdmin) {
      router.push('/');
    }
  }, [currentAdmin, router]);

  return (
    <div className="container mx-auto text-white" data-testid="admin-home">
      <div className="mb-3 flex justify-between">
        <h1 className="text-3xl font-extrabold">Reports</h1>
        <button
          data-testid="read-all-button"
          onClick={() => {
            //readAll();
          }}
        >
          <div className="flex items-center gap-2 rounded-xl bg-white bg-opacity-[8%] p-3">
            <FiBell />
            <p>Read all</p>
          </div>
        </button>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5"></div>
    </div>
  );
};

export default Admin;
