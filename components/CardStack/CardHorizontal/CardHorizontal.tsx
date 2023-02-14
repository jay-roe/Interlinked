import React from 'react';

export default function CardHorizontal({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="p-5">{children}</div>
    </div>
  );
}
