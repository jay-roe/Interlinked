import { BsExclamationLg } from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';
import { Report } from '@/types/Report';
import NotificationDeleteButton from '../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import NotifBlueDot from '../Icons/NotifBlueDotIcon/NotifBlueDotIcon';
import ReportHeader from './ReportHeader';
import ReportDeleteButton from '../Buttons/ReportDeleteButton';
import ReportBlueDot from '../Icons/ReportBlueDot';
import Link from 'next/link';
import Card from '../Card/Card';

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
      {/* <Link
        href={{
          pathname: '/admin/${report.reportId}',
          query: { reporter: report.reporter },
        }}
        as={'/admin/${report.reportId}'}
      > */}
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
      );
      {/* </Link> */}
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
