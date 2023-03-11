'use client';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { NotifType } from '@/types/Notification';
import { unlink } from './Unlink';

export default function LinkButton({
  profileOwnerUID,
}: {
  profileOwnerUID?: string;
}) {
  // set the current user
  const { currentUser, authUser } = useAuth(); // User sending out the request

  return (
    <button
      data-testid="link-btn"
      className="mb-3 flex max-w-fit items-center gap-2 rounded-xl bg-white bg-opacity-[0.12] p-3 font-semibold hover:bg-opacity-20 active:bg-opacity-20"
      onClick={() => {
        profileOwnerUID &&
          !currentUser.linkedUserIds?.some(
            (receiverID) => receiverID === profileOwnerUID
          ) &&
          createNotification({
            notifType: NotifType.LINK_REQ,
            context: currentUser.name + ' would like to link with you!',
            sender: authUser.uid, // sender
            receiver: profileOwnerUID, // receiver
          });

        profileOwnerUID &&
          currentUser.linkedUserIds?.some(
            (receiverID) => receiverID === profileOwnerUID
          ) &&
          unlink(authUser.uid, profileOwnerUID);
      }}
    >
      <LinkIcon
        linked={currentUser.linkedUserIds?.some(
          (receiverID) => receiverID === profileOwnerUID
        )}
        showText={true}
      />
    </button>
  );
}
