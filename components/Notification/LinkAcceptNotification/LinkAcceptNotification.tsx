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
      className="start flex items-center justify-between"
      data-testid="link-acc-notification"
    >
      <Link
        href={senderRedirect}
        className="rounded-md p-2 transition-all hover:bg-white hover:bg-opacity-10"
      >
        <div className="flex items-center justify-center">
          <div className="ml-4 text-accent-orange">
            <LinkIcon linked size={60} />
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
