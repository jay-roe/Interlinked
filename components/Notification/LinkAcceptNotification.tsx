import type { Notification } from '@/types/User';
import LinkIcon from '../Icons/LinkIcon/LinkIcon';
import NotificationHeader from './NotificationHeader';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="start flex items-center">
      <div className="text-accent-orange">
        <LinkIcon linked size={60} />
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
