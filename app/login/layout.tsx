import React from 'react';

export default function LoginLayout({
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
