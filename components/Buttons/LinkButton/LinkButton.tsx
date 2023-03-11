import type { User } from '@/types/User';
import Link from 'next/link';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';

export default function ViewLinkButton({
  currentUser,
  href,
}: {
  currentUser: User;
  href?: string;
}) {
  return (
    <button
      data-testid="button"
      className="mb-3 max-w-fit rounded-md bg-white bg-opacity-[0.12] hover:bg-opacity-[0.18] p-3 font-semibold transition-all"
    >
      <Link href={href || ''}>
        <span className="flex items-center gap-2">
          <LinkIcon />
          <p>{currentUser?.linkedUserIds?.length || 0} Links</p>
        </span>
      </Link>
    </button>
  );
}
