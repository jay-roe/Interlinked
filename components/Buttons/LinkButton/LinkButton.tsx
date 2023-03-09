import { NotifType, User } from '@/types/User';
import type { ComponentProps } from 'react';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import { createNotification } from '@/components/Notification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';

export default function LinkButton({
  currentUser /* Owner of profile page - receiver */,
}: {
  currentUser: User;
}) {
  // set the current user
  const { authUser } = useAuth(); // User sending out the request? (NOT SURE ABOUT THIS)

  return (
    <button
      data-testid="button"
      className="mb-3 flex max-w-fit items-center gap-2 rounded-md bg-white bg-opacity-[0.12] p-3 font-semibold"
      onClick={() => {
        createNotification({
          authUserId: authUser.uid, // receiver?
          notifType: NotifType.LINK_REQ, //field will be removed? -> this is an important field though!
          context: currentUser.name + 'would like to link with you!',
          sender: currentUser, // sender?
          targetAccount: currentUser, // does not matter (?)
        });
      }}
    >
      <LinkIcon />
      <p>{currentUser?.linkedUserIds?.length || 0} Links</p>
    </button>
  );
}
