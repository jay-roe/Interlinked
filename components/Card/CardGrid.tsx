type Props = {};

const CardGrid = ({
  children,
  className = 'grid-cols-1',
}: {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}) => {
  return (
    <div
      data-testid="card-grid"
      className={`grid ${className} gap-x-8 gap-y-8`}
    >
      <>{children}</>
    </div>
  );
};

export default CardGrid;
