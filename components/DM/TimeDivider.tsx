import type { Timestamp } from 'firebase/firestore';

const TimeDivider = ({ time }: { time: Timestamp }) => {
  return (
    <div className="flex items-center space-x-5">
      <div className=" w-full border-t border-white "> </div>
      <div className="no-wrap flex">
        {time.toDate().toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
          day: '2-digit',
        })}
      </div>
      <div className=" w-full border-t  border-white "> </div>
    </div>
  );
};

export default TimeDivider;
