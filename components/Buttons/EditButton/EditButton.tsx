import type { ComponentProps } from 'react';
import { FaRegEdit } from 'react-icons/fa';

export default function EditButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={`${props.className} rounded-full p-2 text-yellow-600 hover:text-yellow-500`}
    >
      <FaRegEdit data-testid="edit-icon" size={30} />
    </button>
  );
}
