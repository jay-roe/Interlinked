'use client';
import { BsExclamationLg } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Report } from '@/types/Report';
import ReportHeader from '@/components/Report/ReportHeader';
import { doc } from '@firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { collection, getDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function report({ params }) {
  // this should always be the admin, but since the admin in
  // the emulator and actual database are different, doing it
  // like this instead of hard coding the admin UID will allow
  // us to switch between the two databases
  const { currentUser, authUser } = useAuth();
  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    getDoc(
      doc(
        typeCollection<Report>(
          collection(doc(db.users, authUser.uid), 'report')
        ),
        params.uid
      )
    ).then((res) => {
      setReport(res.data());
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="start flex items-center justify-between"
      data-testid="post-notification"
    >
      <div className="flex items-center justify-center">
        <div className="my-2 ml-4 text-red-600">
          <BsExclamationLg size={60} className="align-self-center" />
        </div>
        <div className="ml-5">
          <ReportHeader report={report} />
          <div className="m-3">
            <p>{report.context}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
