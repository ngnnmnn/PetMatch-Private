'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Heart,
  Menu,
  MessageCircle,
  PawPrint,
  Scissors,
  Search,
  ShoppingCart,
  Store,
  X,
} from 'lucide-react';
import { BrandMark } from '@/components/auth/AuthShell';
import UserDropdown from '@/components/home/UserDropdown';
import { useCart } from '@/context/CartContext';
import NotificationBell from '@/components/notifications/NotificationBell';
import { cn } from '@/lib/utils';

const MATCHING_NAV = [
  { label: 'Khám phá', href: '/explore', icon: Search },
  { label: 'Tin nhắn', href: '/messages', icon: MessageCircle },
  { label: 'Thú cưng của tôi', href: '/my-pets', icon: PawPrint },
];

// 4 trang chính của hệ thống được đưa lên thanh điều hướng chính (Top Navigation Bar)
type AppHeaderProps = {
  sectionLabel?: string;
};

export default function AppHeader({ sectionLabel = 'Trang chủ' }: AppHeaderProps) {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [isManagerOrStaff, setIsManagerOrStaff] = useState(false);
  const [matchingMenuOpen, setMatchingMenuOpen] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const mobileMenuOpen = mobileMenuPath === pathname;
  const isMatchingSection = MATCHING_NAV.some(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );
  const isShopSection = pathname === '/shop' || pathname.startsWith('/shop/') || pathname.startsWith('/product/');
  const isSpaSection = pathname === '/spa' || pathname.startsWith('/spa/');

  useEffect(() => {
    const checkUserRole = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          const role = user?.role;
          if (role === 'ADMIN' || role === 'STORE_MANAGER' || role === 'SPA_MANAGER' || role === 'SPA_STAFF') {
            setIsManagerOrStaff(true);
            return;
          }
        } catch (e) {
          console.error('Failed to parse user in AppHeader', e);
        }
      }
      setIsManagerOrStaff(false);
    };

    checkUserRole();
    window.addEventListener('auth-change', checkUserRole);
    return () => window.removeEventListener('auth-change', checkUserRole);
  }, []);

  if (isManagerOrStaff) {
    return null;
  }

  return (
    <nav aria-label={`Điều hướng ${sectionLabel}`} className="sticky top-0 z-40 border-b border-[#ECE6DC] bg-[#FAF8F5]/95 shadow-2xs backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2.5 focus:text-xs focus:font-bold focus:text-white focus:shadow-lg"
      >
        Bỏ qua tới nội dung chính
      </a>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
        {/* Brand Logo */}
        <Link
          href="/home"
          className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg pr-2 text-foreground transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]/40"
        >
          <BrandMark size="sm" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-lg font-extrabold tracking-normal font-heading">PetMatch</span>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-primary">
              {sectionLabel}
            </span>
          </span>
        </Link>

        {/* Điều hướng chính với thiết kế Clean Modern Capsule: chỉ highlight phân hệ đang truy cập */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-2xl border border-border/60 bg-muted/40 p-1.5 shadow-xs backdrop-blur-md md:flex">
            <Link
              href="/shop"
              aria-current={isShopSection ? 'page' : undefined}
              onClick={() => {
                localStorage.removeItem('petmatch_shop_selected_pet');
                window.dispatchEvent(new Event('shop-reset'));
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40',
                isShopSection
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/25 ring-2 ring-teal-300/40'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs'
              )}
            >
              <Store className={cn('size-4', isShopSection ? 'text-white' : 'text-teal-600')} />
              Cửa hàng
            </Link>
            <Link
              href="/spa"
              aria-current={isSpaSection ? 'page' : undefined}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-[13.5px] font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                isSpaSection
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-300/40'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs'
              )}
            >
              <Scissors className={cn('size-4', isSpaSection ? 'text-white' : 'text-emerald-600')} />
              Spa & Làm đẹp
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setMatchingMenuOpen(true)}
              onMouseLeave={() => setMatchingMenuOpen(false)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setMatchingMenuOpen(false);
                }
              }}
            >
                <button
                  type="button"
                  aria-label="Mở điều hướng Ghép đôi"
                  aria-haspopup="menu"
                  aria-expanded={matchingMenuOpen}
                  onClick={() => setMatchingMenuOpen((open) => !open)}
                  onFocus={() => setMatchingMenuOpen(true)}
                  className={cn(
                    'group flex items-center gap-2 rounded-xl px-4 py-2 text-[13.5px] font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40',
                    isMatchingSection
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-300/40'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-xs'
                  )}
                >
                  <Heart className={cn('size-4 transition-transform group-hover:scale-110', isMatchingSection ? 'fill-white text-white' : 'fill-rose-500 text-rose-500')} />
                  Ghép đôi
                  <ChevronDown className={cn('size-3.5 transition-transform', matchingMenuOpen ? 'rotate-180' : '', isMatchingSection ? 'text-white' : 'text-muted-foreground')} />
                </button>

              {matchingMenuOpen && (
                <div className="absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-2" role="menu">
                  <div className="animate-in fade-in-0 zoom-in-95 rounded-2xl border border-rose-100/80 bg-card p-1.5 shadow-2xl duration-150 backdrop-blur-md">
                    {MATCHING_NAV.map(({ label, href, icon: Icon }) => {
                      const active = pathname === href || pathname.startsWith(`${href}/`);

                      return (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMatchingMenuOpen(false)}
                        className={cn(
                          'flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-bold outline-none transition-all',
                          active
                            ? 'bg-rose-50 text-rose-700 font-extrabold shadow-xs'
                            : 'text-foreground hover:bg-muted/60 focus:bg-muted/60'
                        )}
                      >
                        <span className={cn('flex size-7.5 items-center justify-center rounded-lg shrink-0', active ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs' : 'bg-rose-50 text-rose-600')}>
                          <Icon className="size-4" />
                        </span>
                        <span className="truncate">{label}</span>
                      </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
        </div>

        {/* Tiện ích tài khoản & nút mở menu Mobile */}
        <div className="flex items-center gap-2">
          <NotificationBell />
          <Link
            href="/cart"
            className="relative inline-flex size-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-card text-foreground shadow-sm transition hover:border-primary hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-w-5 h-5 px-1 items-center justify-center rounded-full bg-primary text-[11px] font-bold tabular-nums text-primary-foreground shadow-sm animate-in zoom-in-50 duration-200">
                {cartCount}
              </span>
            )}
          </Link>
          <UserDropdown />
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuPath((prev) => (prev === pathname ? null : pathname))}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-card text-foreground shadow-sm transition hover:border-primary hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:hidden"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Điều hướng Mobile (< 768px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setMobileMenuPath(null);
            }
          }}
          className="border-t border-[#ECE6DC] bg-[#FAF8F5] px-4 py-3 shadow-lg md:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-1.5">
            <Link
              href="/shop"
              aria-current={isShopSection ? 'page' : undefined}
              onClick={() => {
                localStorage.removeItem('petmatch_shop_selected_pet');
                window.dispatchEvent(new Event('shop-reset'));
                setMobileMenuPath(null);
              }}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors',
                isShopSection
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100'
              )}
            >
              <Store className={cn('size-4 shrink-0', isShopSection ? 'text-white' : 'text-teal-600')} />
              <span>Cửa hàng</span>
            </Link>
            <Link
              href="/spa"
              aria-current={isSpaSection ? 'page' : undefined}
              onClick={() => setMobileMenuPath(null)}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors',
                isSpaSection
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-800 hover:bg-stone-100'
              )}
            >
              <Scissors className={cn('size-4 shrink-0', isSpaSection ? 'text-white' : 'text-emerald-600')} />
              <span>Spa & Làm đẹp</span>
            </Link>
            <div className="pt-2 pb-1 px-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Ghép đôi</p>
            </div>
            {MATCHING_NAV.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileMenuPath(null)}
                  className={cn(
                    'flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors',
                    active
                      ? 'bg-rose-50 text-rose-700'
                      : 'text-stone-800 hover:bg-stone-100'
                  )}
                >
                  <Icon className={cn('size-4 shrink-0', active ? 'text-rose-600' : 'text-rose-500')} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
