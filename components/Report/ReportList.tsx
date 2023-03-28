'use client';

import { Report } from '@/types/Report';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SingleReport from './SingleReport';

export default function ReportList({
  reports,
  setReports,
}: {
  reports: Report[];
  setReports?: Dispatch<SetStateAction<Report[]>>;
}) {
  const router = useRouter();

  return (
    <ul className="pt-3" data-testid="live-notifications">
      {reports.map((rep, index) => (
        <li
          key={index}
          className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
        >
          <SingleReport report={rep} setReports={setReports} />
        </li>
      ))}
    </ul>
  );
}
