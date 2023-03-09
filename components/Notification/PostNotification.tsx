import type { Notification } from '@/types/User';
import { MdDescription } from 'react-icons/md';
import NotifBlueDot from '../NotifBlueDot/NotifBlueDot';
import NotificationHeader from './NotificationHeader';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="start flex items-center">
      <div className="flex items-center justify-center">
        <div className="ml-4 text-accent-orange">
          <MdDescription size={60} className="align-self-center" />
        </div>
        <div className="ml-5">
          <NotificationHeader notification={notification} />
          <div className="m-3">
            <p>{notification.context}</p>
          </div>
        </div>
      </div>
      <div className="m-4">
        <NotifBlueDot notification={notification} />
      </div>
    </div>
  );
}
