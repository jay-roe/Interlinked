const AccountRequiredLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto text-white">
      {children}
      <div className="h-32"></div>
    </div>
  );
};

export default AccountRequiredLayout;
