import type { Notification } from '@/types/Notification';
import { MdWork } from 'react-icons/md';
import NotificationDeleteButton from '../../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import NotifBlueDot from '../../Icons/NotifBlueDot/NotifBlueDot';
import NotificationHeader from '../NotificationHeader/NotificationHeader';
import { Dispatch, SetStateAction } from 'react';
import Link from '@/components/Link/Link';

export default function jobNotification({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  return (
    <div
      className="start grid w-full grid-cols-1 items-center justify-between gap-y-8 lg:grid-cols-2-1"
      data-testid="job-notification"
    >
      <Link
        href={{
          pathname: '/job-feed',
          query: { keyword: notification.postingId },
        }}
        className="grid rounded-md p-2 transition-all hover:bg-white hover:bg-opacity-10"
      >
        <div className="grid w-full grid-cols-1 items-center justify-start gap-y-8 lg:grid-cols-6">
          <div
            className="col-span-1 ml-4 text-accent-orange"
            data-testid="redirect-onclick-location"
          >
            <MdWork size={60} className="align-self-center" />
          </div>
          <div className="col-span-5 ml-5">
            <NotificationHeader notification={notification} />
            <div className="m-3">
              <p>{notification.context}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="m-4 flex items-center justify-center lg:justify-end">
        <NotificationDeleteButton
          notification={notification}
          setNotification={setNotification}
        />
        <NotifBlueDot
          notificationRead={notification.read}
          notificationId={notification.notificationId}
          setNotification={setNotification}
        />
      </div>
    </div>
  );
}
