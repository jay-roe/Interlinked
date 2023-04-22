const DMLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="container mx-0 flex max-h-[85vh] flex-grow flex-col px-0 text-white sm:mx-auto sm:px-8"
      data-testid="dm-layout"
    >
      {children}
    </div>
  );
};

export default DMLayout;
