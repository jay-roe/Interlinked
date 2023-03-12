const DMLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="container mx-auto min-h-[80vh] text-white"
      data-testid="dm-layout"
    >
      {children}
    </div>
  );
};

export default DMLayout;
