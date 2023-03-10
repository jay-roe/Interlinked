import { createNotification } from '@/components/Notification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { NotifType } from '@/types/Notification';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';

const LinkButtonNoNumber = ({
  posterUID,
  small = false,
}: {
  posterUID?: string;
  small?: boolean;
}) => {
  const { currentUser, authUser } = useAuth(); // User sending out the request

  return (
    <button
      data-testid="link-btn-no-number"
      className="flex max-w-fit items-center gap-1 rounded-md bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-10 active:bg-opacity-20"
      onClick={() => {
        posterUID &&
          !currentUser.linkedUserIds.some(
            (receiverID) => receiverID === posterUID
          ) &&
          createNotification({
            notifType: NotifType.LINK_REQ,
            context: currentUser.name + ' would like to link with you!',
            sender: authUser.uid, // sender
            receiver: posterUID, // receiver
          });
      }}
    >
      <LinkIcon size={small ? 10 : 20} />
      <p>Link</p>
    </button>
  );
};

export default LinkButtonNoNumber;
