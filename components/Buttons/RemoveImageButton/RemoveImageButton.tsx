import { useTranslations } from 'next-intl';

export default function RemoveImageButton() {
  const t = useTranslations('Button.Remove');
  return (
    <div
      data-testid="remove-image-button"
      className="flex items-center gap-2 rounded-md bg-yellow-600 p-1 px-2 text-center text-sm font-bold font-bold text-purple-background transition-all hover:bg-yellow-500"
    >
      {t('remove')}
    </div>
  );
}
