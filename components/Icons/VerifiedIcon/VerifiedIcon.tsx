import { VerifiedIconProps } from '@/types/VerifiedIcon';
import { useTranslations } from 'next-intl';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function VerifiedIcon({ verified, showText, showIcon }: VerifiedIconProps) {
  const t = useTranslations('Icons.Verified');
  showIcon = showIcon || true;
  if (verified) {
    return (
      <span className="text-green-500" data-testid="verified-icon-container">
        {showIcon && <FaCheckCircle />}
        {showText && t('verified')}
      </span>
    );
  }
  return (
    <span className="text-red-500" data-testid="unverified-icon-container">
      {showIcon && <FaTimesCircle />}
      {showText && t('note-verified')}
    </span>
  );
}

export default VerifiedIcon;
