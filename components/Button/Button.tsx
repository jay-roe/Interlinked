export default function Button(props) {
  return (
    <button
      {...props}
      className={`${props.className} mr-2 mb-2 inline-flex items-center rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900  `}
    >
      {props.children}
    </button>
  );
}
