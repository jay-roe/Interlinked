import type { User } from '@/types/User';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';

export default function LinkButton({ currentUser }: { currentUser: User }) {
  return (
    <div
      data-testid="button"
      className="mb-3 flex max-w-fit items-center gap-2 rounded-md bg-white bg-opacity-[0.12] p-3 font-semibold"
    >
      <LinkIcon />
      <p>{currentUser?.linkedUserIds.length || 0} Links</p>
    </div>
  );
}
