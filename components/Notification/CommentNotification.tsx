import type { Notification } from '@/types/Notification';
import { FaComment } from 'react-icons/fa';
import NotificationDeleteButton from '../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import NotifBlueDot from '../NotifBlueDot/NotifBlueDot';
import NotificationHeader from './NotificationHeader';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="start flex items-center justify-between">
      <div className="flex items-center justify-center">
        <div className="ml-4 text-accent-orange">
          <FaComment size={60} className="align-self-center" />
        </div>
        <div className="ml-5">
          <NotificationHeader notification={notification} />
          <div className="m-3">
            <p>{notification.context}</p>
          </div>
        </div>
      </div>
      <div className="m-4 flex items-center justify-between">
        <NotificationDeleteButton notification={notification} />
        <NotifBlueDot notification={notification} />
      </div>
    </div>
  );
}
