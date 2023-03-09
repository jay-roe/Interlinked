import type { Notification } from '@/types/User';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

export default function NotifBlueDot({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="text-indigo-600">
      {!notification.read && <RiCheckboxBlankCircleFill size={30} />}
    </div>
  );
}
