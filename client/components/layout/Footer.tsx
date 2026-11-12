'use client';

import { useEffect, useState } from 'react';
import { Facebook, Instagram, Mail, MapPin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { spaApi } from '@/lib/api/spa';
import { AddressSpaType } from '@/types';

const SOCIAL_CHANNELS = [
  { name: 'Facebook', href: 'https://www.facebook.com', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com', icon: Youtube },
];

/**
 * Component chân trang Footer
 * Sử dụng dữ liệu chi nhánh Spa được lưu trong bộ nhớ đệm (TTL 10 phút)
 * Đảm bảo khi chuyển trang không gọi lại request mạng thừa thãi
 */
export default function Footer() {
  const [spaAddresses, setSpaAddresses] = useState<AddressSpaType[]>([]);

  useEffect(() => {
    let isMounted = true;

    // Tải danh sách chi nhánh Spa (lấy từ cache nếu có sẵn trong bộ nhớ đệm)
    spaApi.getSpaAddresses()
      .then((res) => {
        if (isMounted) {
          setSpaAddresses(res.data || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSpaAddresses([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="bg-[var(--text-main)] text-[var(--bg-page)] mt-16 rounded-t-3xl overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-6 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="PetMatch Logo"
              width={36}
              height={36}
              className="shrink-0"
              style={{ width: 36, height: 36 }}
              unoptimized
            />
            <span className="text-lg font-extrabold tracking-tight">PetMatch</span>
          </div>
          <p className="mt-4 text-sm text-[var(--bg-page)]/75 leading-relaxed max-w-xs">
            Cửa hàng phụ kiện thú cưng hiện đại — đồng hành cùng bạn chăm sóc người bạn bốn chân.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">Liên kết nhanh</h4>
          <ul className="space-y-0.5 text-sm text-[var(--bg-page)]/80">
            <li>
              <Link
                href="/home"
                className="inline-flex min-h-11 items-center rounded transition hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="inline-flex min-h-11 items-center rounded transition hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                Cửa hàng phụ kiện
              </Link>
            </li>
            <li>
              <Link
                href="/spa"
                className="inline-flex min-h-11 items-center rounded transition hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                Dịch vụ Spa 5 sao
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="inline-flex min-h-11 items-center rounded transition hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                Ghép đôi thú cưng
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="inline-flex min-h-11 items-center rounded transition hover:text-[var(--primary-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                Tài khoản
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Liên hệ & Chi nhánh Spa</h4>
          <ul className="space-y-3 text-sm text-[var(--bg-page)]/80">
            {spaAddresses.length > 0 ? (
              spaAddresses.map((spa) => (
                <li key={spa.id} className="flex items-start gap-2.5">
                  <MapPin className="size-4 mt-0.5 shrink-0 text-[var(--primary-color)]" />
                  <div>
                    <span className="font-bold text-white block">{spa.name}</span>
                    <span className="text-xs block">{spa.address}</span>
                    {spa.phone && <span className="text-xs text-white/80 block mt-0.5 tabular-nums">SĐT: {spa.phone}</span>}
                  </div>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 mt-0.5 shrink-0 text-[var(--primary-color)]" />
                <div>
                  <span className="font-bold text-white block">PetMatch Spa</span>
                  <span className="text-xs">Chi nhánh PetMatching</span>
                </div>
              </li>
            )}
            <li className="flex items-center gap-2.5 pt-1">
              <Mail className="size-4 shrink-0 text-[var(--primary-color)]" />
              <a
                href="mailto:petmatch@fpt.edu.vn"
                className="inline-flex min-h-11 items-center rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                petmatch@fpt.edu.vn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Mạng xã hội</h4>
          <div className="flex gap-3">
            {SOCIAL_CHANNELS.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`PetMatch trên ${name}`}
                className="grid size-11 place-items-center rounded-xl bg-white/10 text-[var(--bg-page)] hover:bg-[var(--primary-color)] hover:text-white active:scale-95 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/15">
        <div className="mx-auto max-w-[1440px] px-4 py-5 md:px-6 text-xs text-[var(--bg-page)]/60 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} PetMatchAndStore. Mọi quyền được bảo lưu.</span>
          <span>Made with ♥ for pets</span>
        </div>
      </div>
    </footer>
  );
}
