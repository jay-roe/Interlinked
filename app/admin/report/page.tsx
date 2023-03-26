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

const ReportTest = ({
  report,
  setReport,
}: {
  report: Report;
  setReport?: Dispatch<SetStateAction<Report[]>>;
}) => {
  const { currentUser, authUser } = useAuth();

  return (
    <div className="container mx-auto text-white" data-testid="admin-home">
      <div className="mb-3 flex justify-between">
        <h2 className="text-3xl font-extrabold">{report?.reporter}</h2>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        Report message DM window Descision
      </div>
    </div>
  );
};

export default ReportTest;
