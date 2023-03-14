import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { NotifType } from '@/types/Notification';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import { unlink } from './Unlink';

const LinkButtonNoNumber = ({
  posterUID,
  small = false,
}: {
  posterUID?: string;
  small?: boolean;
}) => {
  const { currentUser, authUser } = useAuth(); // User sending out the request
  return (
    posterUID !== authUser.uid && (
      <button
        data-testid="link-btn-no-number"
        className="z-50 flex max-w-fit items-center gap-1 rounded-md bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-10 active:bg-opacity-20"
        onClick={() => {
          posterUID &&
            posterUID !== authUser.uid &&
            !currentUser.linkedUserIds?.some(
              (receiverID) => receiverID === posterUID
            ) &&
            createNotification({
              notifType: NotifType.LINK_REQ,
              context: currentUser.name + ' would like to link with you!',
              sender: authUser.uid, // sender
              receiver: posterUID, // receiver
            }) &&
            alert('Link request sent!');

          posterUID &&
            confirm('Are you sure you want to unlink?') &&
            currentUser.linkedUserIds?.some(
              (receiverID) => receiverID === posterUID
            ) &&
            unlink(authUser.uid, posterUID) &&
            window.location.reload();
        }}
      >
        <LinkIcon
          linked={currentUser.linkedUserIds?.some(
            (receiverID) => receiverID === posterUID
          )}
          showText={true}
          size={small ? 10 : 20}
        />
        {/* <p>Link</p> */}
      </button>
    )
  );
};

export default LinkButtonNoNumber;
