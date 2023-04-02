import { MdWork } from 'react-icons/md';
import { MdWorkOff } from 'react-icons/md';

export default function JobHuntIcon({
  isWantJobNotif,
}: {
  isWantJobNotif: boolean;
}) {
  return (
    <div
      data-testid="jobHunt"
      className="flex flex-wrap items-center justify-center gap-2 md:justify-start "
    >
      {isWantJobNotif ? ( //Private acc
        <div className="flex items-center justify-between gap-2">
          <MdWork size={30} />
          <div className="ml-2 self-center">
            <p>You will recieve job opportunity notifications</p>
          </div>
        </div>
      ) : (
        //Public acc
        <div className="flex items-center justify-between gap-2">
          <MdWorkOff size={30} />
          <div className="ml-2 self-center">
            <p>You will not recieve job opportunity notifications</p>
          </div>
        </div>
      )}
    </div>
  );
}
