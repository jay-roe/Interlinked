const Card = ({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      data-testid="card"
      className={`${className} min-h-min rounded-xl bg-white bg-opacity-[0.12] p-4`}
    >
      {children}
    </div>
  );
};

export default Card;
