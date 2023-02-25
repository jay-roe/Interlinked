import type { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'danger';
}

export default function Button(props: ButtonProps) {
  if (props.variant === 'danger') {
    return (
      <button
        {...props}
        className={`${props.className} inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-bold text-purple-background hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900`}
      >
        {props.children}
      </button>
    );
  }

  return (
    <button
      {...props}
      className={`${props.className} inline-flex items-center rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900`}
    >
      {props.children}
    </button>
  );
}
