import { deleteNotification } from '@/components/Notification/DeleteNotification';
import { useAuth } from '@/contexts/AuthContext';
import { BsXLg } from 'react-icons/bs';
import { Notification } from '@/types/Notification';

export default function NotificationDeleteButton({
  notification,
}: {
  notification: Notification;
}) {
  const { authUser } = useAuth();
  return (
    <button
      data-testid="accept-link-button"
      className="mb-3 mr-2 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold text-accent-orange hover:bg-opacity-20 active:bg-opacity-20"
      onClick={() => {
        deleteNotification(notification.notificationId, authUser.uid);
      }}
    >
      <BsXLg className="m-4" size={30} />
    </button>
  );
}
