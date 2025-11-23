import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dua App',
  description:
    'A simple dua application to help you remember and organize your duas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen font-sans">
        <div className="min-h-screen flex">{children}</div>
      </body>
    </html>
  );
}
