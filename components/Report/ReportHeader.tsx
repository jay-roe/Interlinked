'use client';
import { Report } from '@/types/Report';

export default function ReportHeader({ report }: { report: Report }) {
  return (
    <div className="start flex">
      <div>
        <p className="text-xl font-extrabold">DM moderation required</p>
        <p className="text-xs">
          {report.reportTime?.toDate().toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
