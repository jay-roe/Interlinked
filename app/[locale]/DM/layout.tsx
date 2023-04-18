const DMLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="container mx-auto flex max-h-[85vh] flex-grow flex-col text-white"
      data-testid="dm-layout"
    >
      {children}
    </div>
  );
};

export default DMLayout;
