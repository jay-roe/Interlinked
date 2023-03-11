import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import NotificationHeader from '../NotificationHeader/NotificationHeader';
import { BsCheckLg } from 'react-icons/bs';
import { Notification, NotifType } from '@/types/Notification';
import NotifBlueDot from '../../Icons/NotifBlueDot/NotifBlueDot';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
import { deleteNotification } from '../DeleteNotification/DeleteNotification';
import NotificationDeleteButton from '../../Buttons/NotificationDeleteButton/NotificationDeleteButton';
import { Dispatch, SetStateAction } from 'react';

export default function LinkRequestNotification({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const { currentUser, authUser } = useAuth();
  return (
    <div
      className="flex items-center justify-between"
      data-testid="link-req-notification"
    >
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
        <button
          data-testid="accept-link-button"
          className="mb-3 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold hover:bg-opacity-20 active:bg-opacity-20"
          onClick={async () => {
            createNotification({
              notifType: NotifType.LINK_ACC,
              context: currentUser.name + ' has accepted your request!',
              sender: authUser.uid, // sender
              receiver: notification.sender, // receiver
            });
            // update link requester
            await updateDoc(doc(db.users, notification.sender), {
              linkedUserIds: arrayUnion(authUser.uid),
            });

            // update link receiver
            await updateDoc(doc(db.users, authUser.uid), {
              linkedUserIds: arrayUnion(notification.sender),
            });

            deleteNotification(notification.notificationId, authUser.uid);
            setNotification((notifs) =>
              notifs.filter(
                (notif, _) =>
                  notif.notificationId !== notification.notificationId
              )
            );
          }}
        >
          <BsCheckLg className="m-4" size={30} />
        </button>
        {/* <button
          data-testid="accept-link-button"
          className="mb-3 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-3 font-semibold hover:bg-opacity-20 active:bg-opacity-20"
          onClick={() => {
            deleteNotification(notification.notificationId, authUser.uid);
          }}
        >
          <BsXLg className="m-4" size={30} />
        </button> */}
        <div className="m-4 flex items-center justify-between">
          <NotificationDeleteButton
            notification={notification}
            setNotification={setNotification}
          />
          <NotifBlueDot notification={notification} />
        </div>
      </div>
    </div>
  );
}
