import Link from '@/components/Link/Link';
import { useTranslations } from 'next-intl';

import LinkIcon from '../../Icons/LinkIcon/LinkIcon';

export default function ViewLinkButton({
  linkedUserIds,
  href,
}: {
  linkedUserIds: string[];
  href?: string;
}) {
  const t = useTranslations('Button.Link');

  if (href) {
    return (
      <button
        data-testid="view-link-button"
        className="mb-3 max-w-fit rounded-xl bg-white bg-opacity-[0.12] p-3 font-semibold transition-all hover:bg-opacity-[0.18]"
      >
        <Link href={href || ''}>
          <span className="flex items-center gap-2">
            <LinkIcon />
            <p>
              {linkedUserIds?.length || 0} {t('links')}
            </p>
          </span>
        </Link>
      </button>
    );
  }

  return (
    <button
      data-testid="view-link-button"
      className="mb-3 flex max-w-fit cursor-default items-center gap-2 rounded-xl bg-white bg-opacity-[0.12] p-3 font-semibold"
    >
      <LinkIcon />
      <p>
        {linkedUserIds?.length || 0} {t('links')}
      </p>
    </button>
  );
}
