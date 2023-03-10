'use client';
import { NotifType, User } from '@/types/User';
import type { ComponentProps } from 'react';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import { createNotification } from '@/components/Notification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';

export default function LinkButton({
  profileOwner /* Owner of profile page - receiver */,
  profileOwnerUID,
}: {
  profileOwner: User;
  profileOwnerUID?: string;
}) {
  // set the current user
  const { currentUser, authUser } = useAuth(); // User sending out the request

  return (
    <button
      data-testid="button"
      className="mb-3 flex max-w-fit items-center gap-2 rounded-md bg-white bg-opacity-[0.12] p-3 font-semibold"
      onClick={() => {
        profileOwnerUID &&
          !currentUser.linkedUserIds.some(
            (receiverID) => receiverID === profileOwnerUID
          ) &&
          createNotification({
            notifType: NotifType.LINK_REQ,
            context: currentUser.name + ' would like to link with you!',
            sender: authUser.uid, // sender
            receiver: profileOwnerUID, // receiver
          });
      }}
    >
      <LinkIcon />
      <p>{profileOwner?.linkedUserIds?.length || 0} Links</p>
    </button>
  );
}
