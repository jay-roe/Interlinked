import type { Notification } from '@/types/User';
import { AiFillLike } from 'react-icons/ai';
import NotificationHeader from './NotificationHeader';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="start flex items-center">
      <div className="text-accent-orange">
        <AiFillLike size={60} className="align-self-center" />
      </div>
      <div className="ml-5">
        <NotificationHeader notification={notification} />
        <div className="m-3">
          <p>{notification.context}</p>
        </div>
      </div>
    </div>
  );
}
