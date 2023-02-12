const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  if (!className) {
    className = '';
  }
  return (
    <div
      className={`${className} min-h-min rounded bg-white bg-opacity-[0.12] p-4`}
    >
      {children}
      <p>tingle</p>
    </div>
  );
};

export default Card;
