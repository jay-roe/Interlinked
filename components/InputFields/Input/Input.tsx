import type { ComponentProps } from 'react';

export default function Input(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={`${props.className} mb-2 mt-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
    >
      {props.children}
    </input>
  );
}
