'use client';
import { useAuth } from '@/contexts/AuthContext';
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { useEffect, useRef, useState } from 'react';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import type { UserWithId } from '@/types/User';
import { Report } from '@/types/Report';
import { Dispatch, SetStateAction } from 'react';
import SingleReport from '@/components/Report/SingleReport';
import { useRouter } from 'next/router';

const ReportTest = ({}) => {
  const { currentUser, authUser } = useAuth();
  const [reports, setReports] = useState<Report[]>();

  const router = useRouter();

  // const query = qs.parse(asPath.split(/\?/)[1]);
  //  const data = query.report;
  //const data2 = router.prefetch;
  // console.log('url?', data2);
  // console.log('rep', data);
  return (
    // <SingleReport report={} setReports={} />
    <div className="container mx-auto text-white" data-testid="admin-home">
      <div className="mb-3 flex justify-between">
        <h2 className="text-3xl font-extrabold">{}</h2>
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

export default ReportTest;
