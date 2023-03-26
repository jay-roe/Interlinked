'use client';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { Report } from '@/types/Report';

const ViewReport = ({ params }) => {
  const { authUser } = useAuth();
  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState(true);

  const reportCollectionReference = typeCollection<Report>(
    collection(doc(db.users, authUser.uid), 'report')
  );
  const reportRef = doc(reportCollectionReference, params.uid);

  useEffect(() => {
    async function getReport() {
      const reportDoc = await getDoc(reportRef);
      if (reportDoc.exists()) {
        const reportData = reportDoc.data();
        console.log(reportData);
        setReport(reportData);
        setLoading(false);
      } else {
        console.log('No such document!');
      }
    }
    getReport();
  }, [reportRef]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white" data-testid="admin-home">
      <div className="mb-3 flex justify-between">
        <h2 className="text-3xl font-extrabold">
          {report.reporter} has reported {report.reported}
        </h2>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        Report message DM window Descision
        <button>
          <div className="flex items-center gap-2 rounded-xl bg-white bg-opacity-[8%] p-3">
            Discard Report
          </div>
        </button>
      </div>
    </div>
  );
};

export default ViewReport;
