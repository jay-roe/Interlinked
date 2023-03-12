import type { ReactNode } from 'react';

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <div className="flex-auto">{children}</div>;
}
