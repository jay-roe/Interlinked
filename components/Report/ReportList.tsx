import { Report } from '@/types/Report';
import Link from '@/components/Link/Link';

import { Dispatch, SetStateAction } from 'react';
import SingleReport from './SingleReport';

export default function ReportList({
  reports,
  setReports,
}: {
  reports: Report[];
  setReports?: Dispatch<SetStateAction<Report[]>>;
}) {
  return (
    <div>
      <ul className="sm:pt-3" data-testid="live-reports">
        {reports.map((rep, index) => (
          <li
            key={index}
            className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-1 sm:p-3"
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
