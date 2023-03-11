const CardGrid = ({
  children,
  className = 'grid-cols-1',
  style,
}: {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: any;
}) => {
  return (
    <div
      data-testid="card-grid"
      className={`grid ${className} gap-x-8 gap-y-8`}
      style={style}
    >
      <>{children}</>
    </div>
  );
};

export default CardGrid;
