import type { Notification } from '@/types/Notification';
import { SiGooglemessages } from 'react-icons/si';
import NotificationDeleteButton from '../../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import NotifBlueDot from '../../Icons/NotifBlueDot/NotifBlueDot';
import NotificationHeader from '../NotificationHeader/NotificationHeader';
import { Dispatch, SetStateAction } from 'react';
import Link from '@/components/Link/Link';

export default function dmNotification({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const senderRedirect = 'DM/' + notification.chatroomId;

  return (
    <div
      className="start grid w-full grid-cols-1 items-center justify-between gap-y-2 sm:grid-cols-2-1"
      data-testid="dm-notification"
    >
      <Link href={senderRedirect}>
        <div className="grid w-full grid-cols-1 items-center justify-start gap-y-2 sm:grid-cols-6">
          <div
            className="col-span-1 ml-4 text-accent-orange"
            data-testid="redirect-onclick-location"
          >
            <SiGooglemessages
              size={60}
              className="align-self-center hidden sm:block"
            />
          </div>
          <div className="col-span-5 ml-5">
            <NotificationHeader notification={notification} />
            <div className="m-3">
              <p>{notification.context}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="m-4 flex items-center justify-center gap-x-6 sm:gap-0 lg:justify-end">
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
