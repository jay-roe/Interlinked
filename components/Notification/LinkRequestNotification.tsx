import LinkIcon from '../Icons/LinkIcon/LinkIcon';
import NotificationHeader from './NotificationHeader';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import type { Notification } from '@/types/User';
import NotifBlueDot from '../NotifBlueDot/NotifBlueDot';

export default function postNotification({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="start flex items-center">
        <div className="ml-4 text-accent-orange">
          <LinkIcon size={60} />
        </div>
        <div className="ml-5">
          <NotificationHeader notification={notification} />
          <div className="m-3">
            <p>{notification.context}</p>
          </div>
        </div>
      </div>
      <div className="start flex items-center text-accent-orange">
        <BsCheckLg className="m-4" size={30} />
        <BsXLg className="m-4" size={30} />
        <div className="m-4">
          <NotifBlueDot notification={notification} />
        </div>
      </div>
    </div>
  );
}
