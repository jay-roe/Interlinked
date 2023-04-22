import type { Notification } from '@/types/Notification';
import NotificationDeleteButton from '../../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import NotifBlueDot from '../../Icons/NotifBlueDot/NotifBlueDot';
import NotificationHeader from '../NotificationHeader/NotificationHeader';
import { Dispatch, SetStateAction } from 'react';
import Link from '@/components/Link/Link';

export default function linkAcceptNotification({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const senderRedirect = 'profile/' + notification.sender;

  return (
    <div
      className="start grid w-full grid-cols-1 items-center justify-between sm:grid-cols-2-1"
      data-testid="link-acc-notification"
    >
      <Link href={senderRedirect}>
        <div className="grid w-full grid-cols-1 items-center justify-start sm:grid-cols-6">
          <div className="col-span-1 ml-4 hidden text-accent-orange sm:block">
            <LinkIcon linked size={60} />
          </div>
          <div className="col-span-5 ml-5">
            <NotificationHeader notification={notification} />
            <div className="m-3">
              <p>{notification.context}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="m-4 flex items-center justify-center gap-x-6 sm:justify-end sm:gap-0">
        <NotificationDeleteButton
          data-testid="delete-button"
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
