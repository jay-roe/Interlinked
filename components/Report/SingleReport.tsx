import { BsExclamationLg } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';
import { Report } from '@/types/Report';
import ReportHeader from './ReportHeader';
import ReportDeleteButton from '../Buttons/ReportDeleteButton';
import ReportBlueDot from '../Icons/ReportBlueDot';

export default function postNotification({
  report,
  setReports,
}: {
  report: Report;
  setReports?: Dispatch<SetStateAction<Report[]>>;
}) {
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
      <div className="m-4 flex items-center justify-between">
        <ReportDeleteButton report={report} setReports={setReports} />
        <ReportBlueDot
          reportRead={report.read}
          reportId={report.reportId}
          setReports={setReports}
        />
      </div>
    </div>
  );
}