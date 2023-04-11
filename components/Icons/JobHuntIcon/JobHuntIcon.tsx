import { useTranslations } from 'next-intl';
import { MdWork } from 'react-icons/md';
import { MdWorkOff } from 'react-icons/md';

export default function JobHuntIcon({
  isWantJobNotif,
}: {
  isWantJobNotif: boolean;
}) {
  const t = useTranslations('Icons.JobHunt');
  return (
    <div
      data-testid="jobHunt"
      className="flex flex-wrap items-center justify-center gap-2 md:justify-start "
    >
      {isWantJobNotif ? ( //Private acc
        <div className="flex items-center justify-between gap-2">
          <MdWork size={30} />
          <div className="ml-2 self-center">
            <p>{t('receive-notifs')}</p>
          </div>
        </div>
      ) : (
        //Public acc
        <div className="flex items-center justify-between gap-2">
          <MdWorkOff size={30} />
          <div className="ml-2 self-center">
            <p>{t('no-notifs')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
