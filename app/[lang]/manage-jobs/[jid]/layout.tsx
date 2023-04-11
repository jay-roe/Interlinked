const postingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-4xl font-extrabold"
        data-testid="sub-title"
      >
        View Applicants
      </h1>
      {children}
    </div>
  );
};

export default postingLayout;
