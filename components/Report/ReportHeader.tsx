import { localeToDateLocale } from '@/translations/locales';
import { Report } from '@/types/Report';
import { useLocale, useTranslations } from 'next-intl';

export default function ReportHeader({ report }: { report: Report }) {
  const t = useTranslations('Report');
  const locale = useLocale();

  return (
    <div className="start flex">
      <div>
        <p className="text-xs font-extrabold sm:text-xl">
          {t('moderation-required')}
        </p>
        <p className="text-xs sm:text-xs">
          {report.reportTime
            ?.toDate()
            .toLocaleString(localeToDateLocale[locale], {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
        </p>
      </div>
    </div>
  );
}
