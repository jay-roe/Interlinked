import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { NotifType } from '@/types/Notification';
import { useState } from 'react';
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
  const [linkIds, setLinkIds] = useState(currentUser.linkedUserIds);
  return (
    posterUID !== authUser.uid && (
      <button
        data-testid="link-btn-no-number"
        className="z-50 flex max-w-fit items-center gap-1 rounded-md bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-10 active:bg-opacity-20"
        onClick={(event) => {
          event.preventDefault();
          posterUID &&
            posterUID !== authUser.uid &&
            !linkIds?.some((receiverID) => receiverID === posterUID) &&
            createNotification({
              notifType: NotifType.LINK_REQ,
              context: currentUser.name + ' would like to link with you!',
              sender: authUser.uid, // sender
              receiver: posterUID, // receiver
            }) &&
            alert('Link request sent!');

          posterUID &&
            confirm('Are you sure you want to unlink?') &&
            linkIds?.some((receiverID) => receiverID === posterUID) &&
            unlink(authUser.uid, posterUID) &&
            setLinkIds((curr) => curr.filter((id) => id !== posterUID));
        }}
      >
        <LinkIcon
          linked={linkIds?.some((receiverID) => receiverID === posterUID)}
          showText={true}
          size={small ? 10 : 20}
        />
        {/* <p>Link</p> */}
      </button>
    )
  );
};

export default LinkButtonNoNumber;
