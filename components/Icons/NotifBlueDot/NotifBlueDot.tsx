import type { Notification } from '@/types/Notification';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

export default function NotifBlueDot({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="text-indigo-600">
      {!notification.read && (
        <RiCheckboxBlankCircleFill size={30} data-testid="blue-dot" />
      )}
    </div>
  );
}
