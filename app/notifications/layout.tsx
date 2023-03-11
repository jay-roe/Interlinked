import React from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-auto" data-testid="layout-div">
      {children}
    </div>
  );
}
