import type { Notification } from '@/types/Notification';
import { FaComment } from 'react-icons/fa';
import NotificationDeleteButton from '../../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import NotifBlueDot from '../../Icons/NotifBlueDot/NotifBlueDot';
import NotificationHeader from '../NotificationHeader/NotificationHeader';
import { Dispatch, SetStateAction } from 'react';

export default function commentNotification({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  return (
    <div
      className="start grid w-full grid-cols-1 items-center justify-between sm:grid-cols-2-1"
      data-testid="comment-notification"
    >
      <div className="grid w-full grid-cols-1 items-center justify-start sm:grid-cols-6">
        <div className="col-span-1 ml-4 text-accent-orange">
          <FaComment size={60} className="align-self-center hidden sm:block" />
        </div>
        <div className="col-span-5 ml-5">
          <NotificationHeader notification={notification} />
          <div className="m-3">
            <p>{notification.context}</p>
          </div>
        </div>
      </div>
      <div className="m-4 flex items-center justify-center gap-x-6 sm:justify-end sm:gap-0">
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
