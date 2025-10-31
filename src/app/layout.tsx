import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Back marker',
  description:
    'Concise Formula One schedule. View if there is a race this weekend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header role="banner">
          <nav
            aria-label="Back marker Formula One schedule"
            className="border-b-1"
          >
            <ul role="menubar" className="flex gap-6 p-4 max-w-240 m-auto">
              <li role="none">
                <Link href="/" role="menuitem">
                  Home
                </Link>
              </li>
              <li role="none">
                <Link href="/seasons" role="menuitem">
                  Past seasons
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
