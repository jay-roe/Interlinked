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
  //const senderRedirect = 'JOB/' + notification.postingId;

  return (
    <div
      className="start flex items-center justify-between"
      data-testid="job-notification"
    >
      <Link
        href={{
          pathname: '/job-feed',
          query: { keyword: notification.postingId },
        }}
        className="rounded-md p-2 transition-all hover:bg-white hover:bg-opacity-10"
      >
        <div className="flex items-center justify-center ">
          <div
            className="ml-4 text-accent-orange"
            data-testid="redirect-onclick-location"
          >
            <MdWork size={60} className="align-self-center" />
          </div>
          <div className="ml-5">
            <NotificationHeader notification={notification} />
            <div className="m-3">
              <p>{notification.context}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="m-4 flex items-center justify-between">
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
