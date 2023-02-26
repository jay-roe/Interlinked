import type { ComponentProps } from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps extends ComponentProps<'button'> {
  size?: number;
}

export default function DeleteButton({
  size = 30,
  ...props
}: DeleteButtonProps) {
  return (
    <button
      className="rounded-full bg-red-700 p-2 transition-all hover:bg-red-600"
      {...props}
    >
      <FaTrash color="white" size={size} />
    </button>
  );
}
