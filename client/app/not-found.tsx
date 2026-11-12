import Link from 'next/link';
import { ArrowLeft, Heart, PawPrint, ShoppingBag } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col justify-between bg-[#FAF8F5] text-stone-900">
      <div>
        <AppHeader sectionLabel="Không tìm thấy trang" />
        <main
          id="main-content"
          className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:py-28"
        >
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#FFF6F0] border border-orange-200/80 text-[var(--primary-color)] shadow-xs">
            <PawPrint className="size-8" />
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--primary-color)] tabular-nums">
            Lỗi 404
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-stone-900">
            Trang bạn tìm không tồn tại
          </h1>
          <p className="mt-3 max-w-md text-sm text-stone-600 leading-relaxed">
            Đường dẫn có thể đã thay đổi hoặc được gỡ bỏ. Hãy quay lại trang chủ để tiếp tục khám phá dịch vụ cho bé cưng.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/home"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--primary-color)] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#cf5017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
            >
              <ArrowLeft className="size-4" />
              <span>Về trang chủ</span>
            </Link>
            <Link
              href="/explore"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold text-stone-800 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
            >
              <Heart className="size-4 text-rose-500" />
              <span>Ghép đôi thú cưng</span>
            </Link>
            <Link
              href="/shop"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-bold text-stone-800 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
            >
              <ShoppingBag className="size-4 text-teal-600" />
              <span>Cửa hàng</span>
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
