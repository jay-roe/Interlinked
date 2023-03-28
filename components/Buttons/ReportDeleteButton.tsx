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
      data-testid="clear-notif-btn"
      className="mb-3 mr-2 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold text-accent-orange hover:bg-opacity-20 active:bg-opacity-20"
      onClick={(e) => {
        e.preventDefault();
        deleteReport(report.reportId, authUser.uid);
        setReports((rep) =>
          rep.filter((rep, _) => rep.reportId !== report.reportId)
        );
      }}
    >
      <BsXLg className="m-4" size={30} />
    </button>
  );
}
