import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio · tometu.',
  description: 'Client review, payment and delivery workspace.',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="studio-root">{children}</div>;
}
