import type { ComponentProps } from 'react';
import { FaRegEdit } from 'react-icons/fa';

export default function EditButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      data-testid="edit-button"
      className="rounded-full p-2 text-yellow-600"
    >
      <FaRegEdit size={30} />
    </button>
  );
}
