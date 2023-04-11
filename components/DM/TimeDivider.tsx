import type { Timestamp } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const TimeDivider = ({ time }: { time: Timestamp }) => {
  const t = useTranslations('DM.TimeDivider');
  const [display, setDisplay] = useState<string>();

  useEffect(() => {
    const timeDifference = (Date.now() - time.toMillis()) / 1000;
    let timeToShow = '';
    if (timeDifference < 86400) {
      // less than 1 day
      timeToShow = time.toDate().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (timeDifference < 172800) {
      // over 1 day less than 2
      timeToShow = t('1-day-ago');
    } else if (timeDifference < 259200) {
      // less than 3 days
      timeToShow = t('2-days-ago');
    } else {
      timeToShow = time.toDate().toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
        day: '2-digit',
      });
    }
    setDisplay(timeToShow);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-5">
      <div className="w-1/2 border-t border-white"> </div>
      <div data-testid="time-divider-date" className="no-wrap flex">
        {display}
      </div>
      <div className="w-1/2 border-t border-white"> </div>
    </div>
  );
};

export default TimeDivider;
