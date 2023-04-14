import { useTranslations } from 'next-intl';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function UploadMediaButton() {
  const t = useTranslations('Button.UploadMedia');
  return (
    <div className="flex items-center gap-2 rounded-md bg-yellow-600 p-1 px-2 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500">
      {t('upload')}
      <FaCloudUploadAlt />
    </div>
  );
}
