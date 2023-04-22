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
import Link from '@/components/Link/Link';

export default function LinkRequestNotification({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification?: Dispatch<SetStateAction<Notification[]>>;
}) {
  const { currentUser, authUser } = useAuth();
  const senderRedirect = 'profile/' + notification.sender;
  return (
    <div
      className="start grid w-full grid-cols-1 items-center justify-between sm:grid-cols-2-1"
      data-testid="link-req-notification"
    >
      <Link
        href={senderRedirect}
        className="rounded-md p-2 transition-all hover:bg-white hover:bg-opacity-10"
      >
        <div className="grid w-full grid-cols-1 items-center justify-start sm:grid-cols-6">
          <div className="col-span-1 ml-4 hidden text-accent-orange sm:block">
            <LinkIcon size={60} />
          </div>
          <div className="col-span-5 ml-5">
            <NotificationHeader notification={notification} />
            <div className="m-3">
              <p>{notification.context}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="start flex items-center justify-center text-accent-orange sm:gap-0 lg:justify-end">
        <button
          data-testid="accept-link-button"
          className="mb-1 flex max-w-fit items-center gap-2 rounded-full bg-white bg-opacity-[0.12] p-1 font-semibold hover:bg-opacity-20 active:bg-opacity-20 sm:mb-3 sm:p-3"
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
          <BsCheckLg className="m-2 sm:m-4" size={30} />
        </button>
        <div className="m-4 flex items-center justify-center gap-2 sm:justify-end sm:gap-0">
          <NotificationDeleteButton
            notification={notification}
            setNotification={setNotification}
          />
          <NotifBlueDot
            notificationRead={notification.read}
            notificationId={notification.notificationId}
            setNotification={setNotification}
          />
        </div>
      </div>
    </div>
  );
}
