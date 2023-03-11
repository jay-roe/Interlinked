import type { User } from '@/types/User';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';

import type { ComponentProps } from 'react';

interface LinkButtonNoNumberProps extends ComponentProps<'button'> {
  currentUser?: User;
  small?: boolean;
}

const LinkButtonNoNumber = (props: LinkButtonNoNumberProps) => {
  return (
    <button
      data-testid="link-btn-no-number"
      className={`${props.className} flex max-w-fit items-center gap-1 rounded-md bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-10 active:bg-opacity-20`}
    >
      <LinkIcon size={props.small ? 10 : 20} />
      <p>Link</p>
    </button>
  );
};

export default LinkButtonNoNumber;
