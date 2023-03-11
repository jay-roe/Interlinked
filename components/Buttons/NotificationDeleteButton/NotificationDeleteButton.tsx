import { deleteNotification } from '@/components/Notification/DeleteNotification/DeleteNotification';
import { useAuth } from '@/contexts/AuthContext';
import { BsXLg } from 'react-icons/bs';
import { Notification } from '@/types/Notification';
import { Dispatch, SetStateAction } from 'react';

export default function NotificationDeleteButton({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const { authUser } = useAuth();
  return (
    <button
      data-testid="clear-notif-btn"
      className="mb-3 mr-2 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold text-accent-orange hover:bg-opacity-20 active:bg-opacity-20"
      onClick={() => {
        deleteNotification(notification.notificationId, authUser.uid);
        setNotification((notifs) =>
          notifs.filter(
            (notif, _) => notif.notificationId !== notification.notificationId
          )
        );
      }}
    >
      <BsXLg className="m-4" size={30} />
    </button>
  );
}
