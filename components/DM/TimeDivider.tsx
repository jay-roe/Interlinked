import type { Timestamp } from 'firebase/firestore';

const TimeDivider = ({ time }: { time: Timestamp }) => {
  return (
    <div className="flex items-center justify-center space-x-5">
      <div className="w-1/2 border-t border-white"> </div>
      <div data-testid="time-divider-date" className="no-wrap flex">
        {time.toDate().toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
          day: '2-digit',
        })}
      </div>
      <div className="w-1/2 border-t border-white"> </div>
    </div>
  );
};

export default TimeDivider;
