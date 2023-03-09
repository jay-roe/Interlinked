import type { Notification } from '@/types/User';
import { MdDescription } from 'react-icons/md';
import NotificationHeader from './NotificationHeader';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="start flex items-center">
      <div className="text-accent-orange">
        <MdDescription size={60} className="align-self-center" />
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
