import { useTranslations } from 'next-intl';
import { MdOutlinePublic, MdOutlinePublicOff } from 'react-icons/md';

export default function PrivacyIcon({ isPrivate }: { isPrivate: boolean }) {
  const t = useTranslations('Icons.Privacy');
  return (
    <div
      data-testid="privacy"
      className="flex flex-wrap items-center justify-center gap-2 md:justify-start "
    >
      {isPrivate ? ( //Private acc
        <div className="flex items-center justify-between gap-2">
          <MdOutlinePublicOff size={30} />
          <div className="ml-2 self-center">
            <p>{t('private')}</p>
          </div>
        </div>
      ) : (
        //Public acc
        <div className="flex items-center justify-between gap-2">
          <MdOutlinePublic size={30} />
          <div className="ml-2 self-center">
            <p>{t('public')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
