'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBell } from 'react-icons/fi';
import { createReport } from '@/components/Report/AddReport';
import { Report } from '@/types/Report';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import ReportList from '@/components/Report/ReportList';

const Admin = () => {
  const router = useRouter();
  const { authUser, currentAdmin } = useAuth();

  // Uncomment for implementation
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>();

  useEffect(() => {
    // if not logged in, redirect to home page
    if (!currentAdmin) {
      router.push('/');
    }

    async function getReports() {
      const res = await getDocs(
        typeCollection<Report>(
          collection(doc(db.users, authUser.uid), 'report')
        )
      );
      return res.docs.map((resData) => resData.data());
    }

    getReports().then((rep) => {
      setReports(rep);
      setLoading(false);
    });
  }, [currentAdmin, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white" data-testid="admin-home">
      <div className="mb-3 flex justify-between">
        <h1 className="text-3xl font-extrabold">Reports</h1>
        <div>
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
          <button
            data-testid="read-all-button"
            onClick={() => {
              createReport({
                reporter: authUser.uid,
                reported: authUser.uid,
                context: "I did some things I shouldn't have done 🤭",
                chatroomId: '',
                adminId: '85C6Pe9p0VehxlqlQqNJlSP55Wn1',
              });
            }}
          >
            <p>Report myself</p>
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        {reports.length > 0 ? (
          <ReportList reports={reports} setReports={setReports} />
        ) : (
          <p data-testid="no-reports">Wow, such empty</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
