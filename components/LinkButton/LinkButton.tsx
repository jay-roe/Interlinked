import type { User } from '@/types/User';
import LinkIcon from '../Icons/LinkIcon/LinkIcon';

export default function LinkButton({ currentUser }: { currentUser: User }) {
  return (
    <div className="mb-3 flex max-w-fit items-center gap-2 rounded-md bg-white bg-opacity-10 p-3 font-semibold">
      <LinkIcon />
      <p>{currentUser.connections.length} Links</p>
    </div>
  );
}
