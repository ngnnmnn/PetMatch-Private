'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Scissors,
  Heart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  CalendarCheck,
  ShoppingBag,
  Clock,
  Award,
  PawPrint,
} from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { useProducts } from '@/hooks/useProducts';
import ProductCard, { isValidProductForRecommendation } from './ProductCard';
import Hero from './Hero';
import Footer from '@/components/layout/Footer';

/**
 * Danh sách 3 cổng dịch vụ cốt lõi hiển thị dạng Bento Box xúc giác
 */
const QUICK_PORTALS = [
  {
    id: 'matching',
    title: 'Ghép đôi bạn đời',
    subtitle: 'Pet Matching AI',
    description: 'Hệ thống so khớp thông minh theo nòi giống thuần chủng, tính cách và độ tuổi. Xem hồ sơ y tế rõ ràng.',
    href: '/explore',
    icon: Heart,
    image: '/hero-match-corgi.jpg',
    badge: 'Kết nối an toàn',
    badgeColor: 'bg-rose-50/95 text-rose-800 border-rose-200',
    accentColor: 'from-rose-500/10 to-orange-500/5',
    actionText: 'Tìm bạn cho bé ngay',
  },
  {
    id: 'spa',
    title: 'Dịch vụ Spa 5 sao',
    subtitle: 'Pet Spa & Grooming',
    description: 'Tắm thảo mộc hữu cơ khử mùi, cắt tỉa lông tạo kiểu nghệ thuật và vệ sinh chuyên sâu chuẩn thú y.',
    href: '/spa',
    icon: Scissors,
    image: '/hero-spa.jpg',
    badge: 'Chuẩn y tế',
    badgeColor: 'bg-emerald-50/95 text-emerald-800 border-emerald-200',
    accentColor: 'from-emerald-500/10 to-teal-500/5',
    actionText: 'Đặt lịch làm đẹp',
  },
  {
    id: 'shop',
    title: 'Cửa hàng phụ kiện',
    subtitle: 'Chính hãng 100%',
    description: 'Hơn 2.000 sản phẩm dinh dưỡng, hạt hữu cơ, pate và đồ chơi cao cấp được kiểm định nghiêm ngặt.',
    href: '/shop',
    icon: ShoppingBag,
    image: '/hero-pets.jpg',
    badge: 'Giao nhanh 2h',
    badgeColor: 'bg-amber-50/95 text-amber-900 border-amber-200',
    accentColor: 'from-amber-500/10 to-orange-500/5',
    actionText: 'Khám phá gian hàng',
  },
];

/**
 * Quy trình 4 bước chăm sóc Spa chuẩn y tế
 */
const SPA_STEPS = [
  {
    step: '01',
    title: 'Thăm khám da lông',
    desc: 'Bác sĩ & KTV kiểm tra tình trạng da, ký sinh trùng và tâm lý của bé trước khi bắt đầu.',
  },
  {
    step: '02',
    title: 'Tắm sục thảo mộc',
    desc: 'Sử dụng 100% dầu gội hữu cơ nhập khẩu, massage giãn cơ nhẹ nhàng giúp bé thư thái.',
  },
  {
    step: '03',
    title: 'Cắt tỉa & Tạo dáng',
    desc: 'Tỉa lông nghệ thuật theo phom giống chuẩn, tỉa gọn chân, vệ sinh tuyến hôi và tai.',
  },
  {
    step: '04',
    title: 'Sấy êm & Xịt thơm',
    desc: 'Hệ thống lồng sấy thông minh giảm tiếng ồn, dưỡng lông bóng mượt thơm ngát đón về.',
  },
];

/**
 * 4 cam kết vàng khẳng định chất lượng và sự tận tâm của thương hiệu PetMatch
 */
const BRAND_PROMISES = [
  {
    icon: ShieldCheck,
    title: '100% Sản phẩm chính hãng',
    desc: 'Đầy đủ hoá đơn, tem chống hàng giả và hạn sử dụng mới nhất cho từng sản phẩm dinh dưỡng.',
    highlight: 'Đổi trả miễn phí 7 ngày',
  },
  {
    icon: Truck,
    title: 'Giao hỏa tốc 2 giờ',
    desc: 'Đóng gói hút chân không chuyên nghiệp, bảo quản nguyên vẹn chất lượng thức ăn và phụ kiện.',
    highlight: 'Freeship đơn từ 300k',
  },
  {
    icon: Award,
    title: 'Chuyên viên Spa chứng chỉ',
    desc: '100% kỹ thuật viên được đào tạo nghiệp vụ chuyên sâu, thấu hiểu tâm lý thú cưng.',
    highlight: 'Chuẩn quy trình y tế',
  },
  {
    icon: Clock,
    title: 'Hỗ trợ tư vấn 24/7',
    desc: 'Đội ngũ tư vấn viên luôn đồng hành giải đáp thắc mắc về dinh dưỡng và sinh sản thú cưng.',
    highlight: 'Hỗ trợ tận tình',
  },
];

/**
 * Component StorePage - Trang chủ thương hiệu PetMatch
 */
export default function StorePage() {
  const {
    products: featuredProducts,
    loading: featuredLoading,
    error,
  } = useProducts(undefined, 'featured');

  /** Tối ưu hiệu năng: Memoize danh sách 4 sản phẩm hợp lệ và còn hàng (kể cả qua biến thể) */
  const inStockProducts = useMemo(() => {
    return featuredProducts.filter((product) => isValidProductForRecommendation(product)).slice(0, 4);
  }, [featuredProducts]);

  return (
    <div className="min-h-dvh text-stone-900 flex flex-col justify-between bg-[#FAF8F5]">
      <div className="w-full">
        {/* Thanh tiêu đề chính */}
        <AppHeader sectionLabel="Trang chủ" />

        {/* Hero Section phong cách Claymorphism với thẻ ghép đôi tương tác thực tế */}
        <Hero />

        <main
          id="main-content"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 sm:space-y-28"
        >
          {/* MỤC 1: 3 CỔNG DỊCH VỤ CHÍNH DẠNG BENTO BOX */}
          <section aria-label="3 Cổng dịch vụ chính của PetMatch" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="text-center max-w-2xl mx-auto space-y-2.5"
            >
              <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary-color)]">
                <PawPrint className="h-3.5 w-3.5" />
                <span>Hệ sinh thái PetMatch</span>
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
                Mọi điều thú cưng cần, gói trọn trong một nền tảng
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Chọn dịch vụ bạn muốn trải nghiệm cùng bé yêu hôm nay
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {QUICK_PORTALS.map((portal, idx) => {
                const IconComp = portal.icon;
                return (
                  <motion.div
                    key={portal.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                    whileHover={{ y: -6 }}
                    className="h-full"
                  >
                    <Link
                      href={portal.href}
                      className="group relative flex flex-col justify-between h-full rounded-3xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:border-orange-200 transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                    >
                      <div
                        className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${portal.accentColor} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                      />

                      <div className="space-y-4 relative z-10">
                        {/* Ảnh đại diện dịch vụ với radius gọn hơn vỏ thẻ ngoài */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-100">
                          <Image
                            src={portal.image}
                            alt={portal.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold border shadow-xs backdrop-blur-md ${portal.badgeColor}`}
                            >
                              <IconComp className="h-3.5 w-3.5" />
                              {portal.badge}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-[0.1em]">
                              {portal.subtitle}
                            </span>
                            <div className="h-8 w-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors duration-300">
                              <IconComp className="h-4 w-4" />
                            </div>
                          </div>

                          <h3 className="text-xl font-extrabold font-heading text-stone-900 group-hover:text-[var(--primary-color)] transition-colors">
                            {portal.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                            {portal.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between relative z-10">
                        <span className="text-xs font-extrabold text-stone-900 group-hover:text-[var(--primary-color)] transition-colors">
                          {portal.actionText}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 group-hover:bg-[var(--primary-color)] group-hover:text-white transition-all group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* MỤC 2: SẢN PHẨM NỔI BẬT ĐƯỢC PHỤ HUYNH TIN CHỌN */}
          <section aria-label="Sản phẩm nổi bật" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5"
            >
              <div className="space-y-1.5">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-amber-800 inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>Tuyển chọn dinh dưỡng & phụ kiện cao cấp</span>
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 tracking-tight">
                  Sản phẩm bán chạy nhất tuần
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
                  Thức ăn hữu cơ và vật dụng đạt tiêu chuẩn an toàn cho bé phát triển khỏe mạnh mỗi ngày.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white border border-stone-300 px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-800 hover:border-stone-400 shadow-2xs hover:bg-stone-50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                >
                  <span>Xem tất cả sản phẩm</span>
                  <ArrowRight className="h-4 w-4 text-[var(--primary-color)]" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Lưới sản phẩm */}
            {featuredLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="aspect-[3/4] w-full rounded-2xl bg-stone-200/50 animate-pulse border border-stone-200"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6 text-center text-sm font-semibold text-rose-700">
                {error}
              </div>
            ) : inStockProducts.length === 0 ? (
              <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 text-center space-y-4">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[var(--primary-color)]">
                  <ShoppingBag className="size-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-base font-extrabold font-heading text-stone-900">
                    Đang cập nhật thêm sản phẩm nổi bật
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Bạn vẫn có thể xem toàn bộ danh mục thức ăn và phụ kiện chính hãng đang mở bán tại cửa hàng.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary-color)] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#cf5017] transition"
                >
                  <span>Khám phá cửa hàng</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                {inStockProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* MỤC 3: TIÊU ĐIỂM CHUYÊN SÂU - HÀNH TRÌNH GHÉP ĐÔI THUẦN CHỦNG */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden rounded-[32px] border border-rose-200/80 bg-gradient-to-br from-[#FFF7F4] via-white to-[#FFF9F6] p-7 sm:p-12 shadow-[var(--shadow-card)] relative"
            aria-label="Giới thiệu tính năng ghép đôi"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-rose-700">
                  <Heart className="h-3.5 w-3.5 fill-rose-600 text-rose-600" />
                  <span>Thuật toán ghép đôi độc quyền</span>
                </p>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 leading-tight">
                  Tìm bạn đời an toàn, <br />
                  Gìn giữ nguồn gen thuần chủng cho bé
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl font-normal">
                  Không còn lo lắng khi đăng bài tìm bạn trôi nổi trên mạng. PetMatch xác thực minh bạch phả hệ, lịch sử tiêm chủng và tính cách của từng bé, giúp phụ huynh an tâm tuyệt đối khi kết nối.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-semibold text-stone-800">
                  <div className="flex items-center gap-2.5 bg-white/95 border border-stone-200/80 px-3.5 py-3 rounded-xl shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>So khớp theo nòi giống & độ tuổi</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/95 border border-stone-200/80 px-3.5 py-3 rounded-xl shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>Quẹt thẻ tìm bạn tương thích trực quan</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/95 border border-stone-200/80 px-3.5 py-3 rounded-xl shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>Kiểm tra hồ sơ y tế & sổ tiêm phòng</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/95 border border-stone-200/80 px-3.5 py-3 rounded-xl shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>Nhắn tin trò chuyện bảo mật giữa phụ huynh</span>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Link
                      href="/explore"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 text-sm font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      <Heart className="h-4 w-4 fill-white" />
                      <span>Bắt đầu tìm kiếm hồ sơ</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Khung minh họa Thẻ so khớp (tĩnh trên backdrop-blur để tối ưu GPU) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3.5] sm:aspect-square w-full rounded-3xl overflow-hidden border-2 border-white shadow-[var(--shadow-soft)] bg-stone-100">
                  <Image
                    src="/hero-match-corgi.jpg"
                    alt="Ghép đôi thú cưng thuần chủng"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/80 ring-1 ring-inset ring-white/70 shadow-lg text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold font-heading text-stone-900 text-sm">
                          Milo & Bella
                        </span>
                        <p className="text-[11px] text-stone-600 font-medium">Corgi thuần chủng · 2 tuổi</p>
                      </div>
                      <span className="text-xs font-extrabold tabular-nums text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                        98% Tương thích
                      </span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Đã tiêm phòng 3 mũi
                      </span>
                      <span className="font-bold text-rose-600">Hoàn Kiếm, HN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* MỤC 4: QUY TRÌNH SPA 4 BƯỚC CHUẨN Y TẾ (Timeline nối liền thay cho 4 thẻ giống hệt) */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden rounded-[32px] border border-emerald-200/80 bg-gradient-to-br from-[#F3F9F6] via-white to-[#F6FAF7] p-7 sm:p-12 shadow-[var(--shadow-card)] relative"
            aria-label="Giới thiệu dịch vụ Spa"
          >
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-100 pb-6">
                <div className="space-y-2">
                  <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-800">
                    <Scissors className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Liệu trình Spa chuẩn y tế</span>
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-stone-900 leading-tight">
                    Chăm sóc tỉ mỉ từng chi tiết, để bé luôn thơm tho & khỏe đẹp
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-normal">
                    Quy trình 4 bước chuẩn khoa học giúp bé giải tỏa căng thẳng, dưỡng lông óng mượt và bảo vệ làn da nhạy cảm.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/spa"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 text-sm font-bold text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition cursor-pointer self-start md:self-auto shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    <span>Đặt lịch Spa ngay</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

              <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {SPA_STEPS.map((step, idx) => (
                  <li key={step.step} className="relative flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-extrabold font-heading tabular-nums text-white shadow-xs">
                        {step.step}
                      </span>
                      {idx < SPA_STEPS.length - 1 && (
                        <div className="hidden lg:block h-px flex-1 bg-emerald-200/80" aria-hidden="true" />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-extrabold font-heading text-stone-900">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

          {/* MỤC 5: 4 CAM KẾT VÀNG & UY TÍN THƯƠNG HIỆU (Lưới 2x2 biên tập sạch, không bọc thẻ lồng thẻ) */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-[32px] border border-stone-200/90 bg-white p-8 sm:p-12 shadow-[var(--shadow-card)] space-y-10"
            aria-label="Cam kết thương hiệu"
          >
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary-color)]">
                Cam kết dịch vụ
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 tracking-tight">
                Vì sao hơn 12.000 chủ nuôi đồng hành cùng PetMatch?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Sự hài lòng của phụ huynh và sức khỏe của bé cưng là tôn chỉ hành động cao nhất của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 border-t border-stone-200/70 pt-8">
              {BRAND_PROMISES.map((promise, idx) => {
                const IconComp = promise.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF6F0] border border-orange-200/70 text-[var(--primary-color)]">
                      <IconComp className="size-5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-extrabold font-heading text-stone-900">
                          {promise.title}
                        </h4>
                        <span className="text-[11px] font-bold text-[var(--primary-color)] bg-[#FFF6F0] px-2 py-0.5 rounded-md border border-orange-200/60">
                          {promise.highlight}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                        {promise.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* MỤC 6: BANNER KÊU GỌI HÀNH ĐỘNG CUỐI TRANG */}
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-[32px] bg-[#D14E14] bg-[radial-gradient(circle_at_top_right,rgba(255,214,170,0.28),transparent_55%)] p-8 sm:p-12 text-white shadow-[var(--shadow-soft)] text-center relative overflow-hidden"
          >
            <div className="max-w-2xl mx-auto space-y-5 relative z-10">
              <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-orange-100">
                <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                <span>Tham gia cộng đồng PetMatch ngay hôm nay</span>
              </p>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight">
                Sẵn sàng mang đến những trải nghiệm tuyệt vời nhất cho bé cưng?
              </h3>

              <p className="text-xs sm:text-sm text-orange-50/90 max-w-lg mx-auto font-normal">
                Tạo hồ sơ thú cưng miễn phí chỉ trong 2 phút để bắt đầu tìm kiếm bạn đời hoặc đặt lịch chăm sóc spa tiện lợi.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/explore"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-extrabold text-stone-900 shadow-lg hover:bg-stone-50 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                    <span>Tìm bạn cho bé ngay</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/spa"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/10 backdrop-blur-md px-6 text-sm font-extrabold text-white hover:bg-white/20 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Scissors className="h-4 w-4" />
                    <span>Đặt lịch Spa 5 sao</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>

      {/* Chân trang ứng dụng */}
      <Footer />
    </div>
  );
}
