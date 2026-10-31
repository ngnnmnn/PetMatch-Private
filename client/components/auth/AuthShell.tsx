'use client';

import Link from 'next/link';
import Image from 'next/image';

type AuthShellProps = {
  children: React.ReactNode;
};

export function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const pixelSizes = {
    sm: 36,
    md: 56,
    lg: 80,
  };

  const containerSizes = {
    sm: 'size-9',
    md: 'size-14',
    lg: 'size-20',
  };

  return (
    <span
      className={`${containerSizes[size]} relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(228,93,28,0.18)] ring-2 ring-[var(--primary-color)]/25 transition-transform duration-200 hover:scale-105`}
      aria-hidden="true"
    >
      <Image
        src="/logo.png"
        alt="PetMatch Logo"
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] font-[Inter,Outfit,ui-sans-serif,system-ui,sans-serif] text-[var(--text-main)]">
      <header className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:flex-nowrap sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full text-[var(--text-main)] transition duration-200 ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(228,93,28,0.18)]"
        >
          <BrandMark size="sm" />
          <span className="text-xl font-extrabold tracking-normal">PetMatch</span>
        </Link>
      </header>

      <section className="flex min-h-[calc(100vh-88px)] items-center justify-center px-5 py-8 sm:px-6">
        <div className="w-full max-w-[460px]">
          <div className="mb-5 flex flex-col items-center gap-4 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-[var(--text-muted)] transition duration-200 ease-in-out hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(228,93,28,0.16)]"
            >
              ← Quay lại trang chủ
            </Link>
            <BrandMark size="lg" />
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}
