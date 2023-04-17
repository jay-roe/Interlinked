'use client';

import { Report } from '@/types/Report';
import Link from '@/components/Link/Link';

import { Dispatch, SetStateAction } from 'react';
import SingleReport from './SingleReport';
import LoadingScreen from '../Loading/Loading';

export default function ReportList({
  reports,
  setReports,
}: {
  reports: Report[];
  setReports?: Dispatch<SetStateAction<Report[]>>;
}) {
  return (
    <div>
      <ul className="pt-3" data-testid="live-reports">
        {reports.map((rep, index) => (
          <li
            key={index}
            className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
          >
            <Link href={'/admin/' + reports[index].reportId}>
              <SingleReport report={rep} setReports={setReports} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
