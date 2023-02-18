import React from 'react';

export default function CardHorizontal({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div data-testid="card-horizontal" className="p-5">
        {children}
      </div>
    </div>
  );
}
