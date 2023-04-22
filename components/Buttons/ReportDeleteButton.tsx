'use client';
import { BsXLg } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Report } from '@/types/Report';
import { deleteReport } from '../Report/DeleteReport';

export default function ReportDeleteButton({
  report,
  setReports,
}: {
  report: Report;
  setReports?: Dispatch<SetStateAction<Report[]>>;
}) {
  const { authUser } = useAuth();
  return (
    <button
      data-testid="delete-report-btn"
      className="mr-3 flex items-center gap-2 rounded-full bg-white bg-opacity-[0.12] font-semibold text-accent-orange hover:bg-opacity-20 active:bg-opacity-20 sm:max-w-fit sm:p-3"
      onClick={(e) => {
        e.preventDefault();
        deleteReport(report.reportId, authUser.uid);
        setReports((rep) =>
          rep.filter((rep, _) => rep.reportId !== report.reportId)
        );
      }}
    >
      <BsXLg className="sm:w-100% m-1 h-auto" />
    </button>
  );
}
