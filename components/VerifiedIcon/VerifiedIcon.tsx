import { VerifiedIconProps } from '@/types/VerifiedIcon';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function VerifiedIcon({ verified, showText, showIcon }: VerifiedIconProps) {
  showIcon = showIcon || true;
  if (verified) {
    return (
      <span className="text-green-500">
        {showIcon && <FaCheckCircle />}
        {showText && ' Verified'}
      </span>
    );
  }
  return (
    <span className="text-red-500">
      {showIcon && <FaTimesCircle />}
      {showText && ' Not verified'}
    </span>
  );
}

export default VerifiedIcon;
