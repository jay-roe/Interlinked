type Props = {};

const CardGrid = ({
  children,
  gridTemplateColumns = 'grid-cols-1',
}: {
  children?: React.ReactNode;
  gridTemplateColumns?: string;
}) => {
  return (
    <div className={`grid ${gridTemplateColumns} gap-x-8 gap-y-8`}>
      <>{children}</>
    </div>
  );
};

export default CardGrid;
