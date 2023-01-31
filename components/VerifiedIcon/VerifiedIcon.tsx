import { VerifiedIconProps } from '@/types/VerifiedIcon';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { GreenVerified, RedVerified } from './VerifiedIcon.styles';

function VerifiedIcon({ verified, showText, showIcon }: VerifiedIconProps) {
  showIcon = showIcon || true;
  if (verified) {
    return (
      <GreenVerified>
        {showIcon && <FaCheckCircle />}
        {showText && ' Verified'}
      </GreenVerified>
    )
  }
  return (
    <RedVerified>
      {showIcon && <FaTimesCircle />}
      {showText && ' Not verified'}
    </RedVerified>
  )
}

export default VerifiedIcon