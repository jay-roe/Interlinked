import type { User } from '@/types/User';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';

const LinkButtonNoNumber = ({
  currentUser,
  onClick = () => {},
  small = false,
}: {
  currentUser?: User;
  onClick?: Function;
  small?: boolean;
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`flex max-w-fit items-center gap-1 rounded-md bg-white bg-opacity-0 p-2 transition-opacity hover:bg-opacity-10 active:bg-opacity-20`}
    >
      <LinkIcon size={small ? 10 : 20} />
      <p>Link</p>
    </button>
  );
};

export default LinkButtonNoNumber;
