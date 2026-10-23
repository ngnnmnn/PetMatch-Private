'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  Scissors,
  ShoppingBag,
  Star,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  X,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Danh sách mẫu các bé cưng tương thích hiển thị trên Thẻ Ghép Đôi Tương Tác
 */
const SAMPLE_MATCH_PETS = [
  {
    id: 'corgi-milo',
    name: 'Milo & Bella',
    breed: 'Corgi Pembroke thuần chủng',
    age: '2 tuổi',
    location: 'Hoàn Kiếm, Hà Nội · 2.5 km',
    score: 98,
    image: '/hero-match-corgi.jpg',
    tags: ['Phả hệ VKA', 'Tiêm phòng đủ', 'Thân thiện'],
    story: 'Bé rất năng động, thích chạy công viên và hòa đồng với bạn bè.',
  },
  {
    id: 'golden-max',
    name: 'Max & Luna',
    breed: 'Golden Retriever thuần chủng',
    age: '2.5 tuổi',
    location: 'Cầu Giấy, Hà Nội · 4.1 km',
    score: 95,
    image: '/hero-pets.jpg',
    tags: ['Đã kiểm định gen', 'Sổ tiêm 3 mũi', 'Rất ngoan'],
    story: 'Gia đình tìm bạn đời giao phối lành mạnh, có đầy đủ giấy tờ chứng nhận.',
  },
];

/**
 * Component Hero Section thiết kế từ đầu theo chuẩn UI/UX Pro Max (Pet Tech Platform):
 * - Phong cách: Claymorphism + Vibrant & Block-based ấm áp, thân thiện và giàu tính tương tác.
 * - Cột trái: Thông điệp cốt lõi, minh chứng xã hội (Social Proof), và điều hướng nhanh tới 3 dịch vụ.
 * - Cột phải: Thẻ ghép đôi tương tác (Interactive Swipe/Match Card) cho phép người dùng click Like/Pass thật ngay trên Hero.
 * - Hiệu ứng chuyển động hữu cơ liên tục (Continuous Floating Badges) tạo cảm giác sống động, không bị đơ cứng.
 */
export default function Hero() {
  const [petIndex, setPetIndex] = useState(0);
  const [matchAction, setMatchAction] = useState<'liked' | 'passed' | null>(null);

  const currentPet = SAMPLE_MATCH_PETS[petIndex];

  /**
   * Xử lý khi người dùng tương tác nút "Thích / Ghép đôi"
   * Hiển thị phản hồi thị giác tức thì và tự động chuyển sang hồ sơ tiếp theo sau 1.2 giây
   */
  const handleLike = () => {
    setMatchAction('liked');
    setTimeout(() => {
      setPetIndex((prev) => (prev + 1) % SAMPLE_MATCH_PETS.length);
      setMatchAction(null);
    }, 1200);
  };

  /**
   * Xử lý khi người dùng tương tác nút "Bỏ qua / Xem bé khác"
   */
  const handlePass = () => {
    setMatchAction('passed');
    setTimeout(() => {
      setPetIndex((prev) => (prev + 1) % SAMPLE_MATCH_PETS.length);
      setMatchAction(null);
    }, 400);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#FBF8F3] via-[#FAF6F0] to-[#FAF8F5] border-b border-[#ECE6DC] py-10 sm:py-14 lg:py-16"
      aria-label="Khu vực giới thiệu chính PetMatch"
    >
      {/* Các vệt sáng màu hữu cơ trôi bồng bềnh tạo chiều sâu thị giác (Organic Ambient Glows) */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-rose-200/35 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          y: [0, 12, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* CỘT TRÁI (7/12 cột): Thông điệp chính, giá trị cốt lõi & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Huy hiệu định vị thương hiệu có hiệu ứng nhịp đập */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-orange-950 border border-orange-200/90 shadow-sm backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-[var(--primary-color)] animate-ping" />
              <Sparkles className="h-4 w-4 text-[var(--primary-color)]" />
              <span>Nền tảng kết nối & chăm sóc thú cưng toàn diện #1</span>
            </motion.div>

            {/* Tiêu đề chính sử dụng phông Nunito sắc nét, chuẩn tiếng Việt */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-heading leading-[1.18] tracking-tight text-balance">
                Nơi bé cưng tìm thấy{' '}
                <span className="relative inline-block text-[var(--primary-color)]">
                  bạn đời lý tưởng
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full text-orange-300 -z-10"
                    viewBox="0 0 250 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 9.5C50.5 3 180.5 1 247.5 7.5"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                & tận hưởng dịch vụ chuẩn 5 sao
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl font-normal">
                PetMatch ứng dụng thuật toán so khớp phả hệ thông minh, giúp hàng ngàn thú cưng kết nối bạn đời an toàn, đồng thời cung cấp liệu trình Spa chuyên sâu và phụ kiện dinh dưỡng chính hãng 100%.
              </p>
            </motion.div>

            {/* 3 giá trị bảo chứng nổi bật dạng pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2.5 pt-1"
            >
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50/90 border border-rose-200/80 px-3 py-1.5 text-xs font-bold text-rose-800">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span>Ghép đôi thuần chủng</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 text-xs font-bold text-emerald-800">
                <Scissors className="h-3.5 w-3.5 text-emerald-600" />
                <span>Spa y tế thơm tho</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50/90 border border-amber-200/80 px-3 py-1.5 text-xs font-bold text-amber-800">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                <span>100% Chính hãng</span>
              </div>
            </motion.div>

            {/* Nhóm nút hành động chính với hiệu ứng nảy đàn hồi (Spring physics) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/explore"
                  className="inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-2xl bg-[var(--primary-color)] px-6 text-sm font-bold text-white shadow-lg shadow-orange-600/25 hover:bg-[#cf5017] hover:shadow-xl hover:shadow-orange-600/30 transition-all cursor-pointer group"
                >
                  <Heart className="h-4 w-4 fill-white transition-transform group-hover:scale-110" />
                  <span>Tìm bạn cho bé ngay</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/spa"
                  className="inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 bg-white px-5 text-sm font-bold text-emerald-800 hover:bg-emerald-50/60 hover:border-emerald-400 shadow-sm transition-all cursor-pointer"
                >
                  <Scissors className="h-4 w-4 text-emerald-600" />
                  <span>Đặt lịch Spa</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/shop"
                  className="inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white/80 px-5 text-sm font-bold text-stone-700 hover:bg-stone-100 hover:border-stone-300 shadow-2xs transition-all cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4 text-stone-500" />
                  <span>Cửa hàng</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Khối chứng nhận xã hội (Social Proof) chân thực */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <div className="flex items-center -space-x-2">
                {[
                  { text: 'M', bg: 'bg-amber-400 text-stone-900 ring-2 ring-white' },
                  { text: 'L', bg: 'bg-emerald-400 text-stone-900 ring-2 ring-white' },
                  { text: 'B', bg: 'bg-rose-400 text-stone-900 ring-2 ring-white' },
                  { text: 'K', bg: 'bg-indigo-400 text-stone-900 ring-2 ring-white' },
                ].map((avatar, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full font-extrabold text-xs shadow-xs cursor-pointer ${avatar.bg}`}
                  >
                    {avatar.text}
                  </motion.div>
                ))}
              </div>

              <div className="text-xs sm:text-sm text-stone-600">
                <p>
                  <span className="font-extrabold text-stone-900">12.500+ phụ huynh thú cưng</span> đã tin tưởng
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-900 text-xs">4.9 / 5</span>
                  <span className="text-stone-400 text-xs">(3.800+ lượt đánh giá thực tế)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CỘT PHẢI (5/12 cột): Sân khấu Thẻ Ghép Đôi Tương Tác (Interactive Match Card Stage) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              
              {/* Thẻ nổi lơ lửng góc trên phải: Thông báo Spa vừa hoàn thành */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1.5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-3 z-30 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-xl border border-emerald-100 backdrop-blur-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Scissors className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-stone-900 flex items-center gap-1">
                    Spa Hoàng Gia
                    <span className="text-[10px] font-extrabold text-amber-500">★ 5.0</span>
                  </p>
                  <p className="text-[11px] text-stone-500">Bé cưng vừa hoàn thành liệu trình</p>
                </div>
              </motion.div>

              {/* Thẻ nổi lơ lửng góc dưới trái: Huy hiệu xác thực an toàn */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -1.5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-3 z-30 hidden sm:flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-xl border border-rose-100 backdrop-blur-md"
              >
                <ShieldCheck className="h-5 w-5 text-rose-500" />
                <div className="text-xs">
                  <p className="font-bold text-stone-900">100% Hồ sơ xác thực</p>
                  <p className="text-[11px] text-stone-500">Đã kiểm tra tiêm chủng & phả hệ</p>
                </div>
              </motion.div>

              {/* KHUNG THẺ TƯƠNG TÁC CHÍNH (Claymorphic Interactive Card) */}
              <motion.div
                layout
                className="relative overflow-hidden rounded-[28px] border-2 border-white/80 bg-white p-3 sm:p-4 shadow-2xl shadow-orange-950/10"
              >
                {/* Ảnh thú cưng chất lượng cao */}
                <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-2xl bg-stone-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPet.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentPet.image}
                        alt={currentPet.name}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Thanh phần trăm tương thích nằm ở góc trên */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/75 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span>{currentPet.age}</span>
                    </span>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-extrabold text-white shadow-md shadow-rose-600/30"
                    >
                      <Heart className="h-3.5 w-3.5 fill-white" />
                      <span>{currentPet.score}% Tương thích</span>
                    </motion.div>
                  </div>

                  {/* Lớp phủ phản hồi hành động Thích/Bỏ qua khi người dùng bấm */}
                  <AnimatePresence>
                    {matchAction === 'liked' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-rose-600/85 backdrop-blur-xs text-white"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 0.5, repeat: 2 }}
                        >
                          <Heart className="h-20 w-20 fill-white text-white drop-shadow-lg" />
                        </motion.div>
                        <p className="mt-2 text-xl font-extrabold font-heading">Ghép đôi thành công!</p>
                        <p className="text-xs text-rose-100 font-medium">Đã gửi tín hiệu tới phụ huynh của bé</p>
                      </motion.div>
                    )}

                    {matchAction === 'passed' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-900/80 backdrop-blur-xs text-white"
                      >
                        <RotateCcw className="h-14 w-14 text-stone-300 animate-spin" />
                        <p className="mt-2 text-sm font-bold">Đang tải hồ sơ bé tiếp theo...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Thông tin hồ sơ hiển thị dưới chân ảnh */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-extrabold font-heading drop-shadow-sm">
                        {currentPet.name}
                      </h2>
                    </div>
                    <p className="text-xs text-stone-200 flex items-center gap-1 font-medium">
                      <MapPin className="h-3 w-3 text-rose-400 shrink-0" />
                      {currentPet.location}
                    </p>
                  </div>
                </div>

                {/* Phần chi tiết và các nút tương tác bên dưới ảnh */}
                <div className="pt-3.5 pb-1 px-1 space-y-3">
                  {/* Danh sách các thẻ đặc điểm nổi bật */}
                  <div className="flex flex-wrap gap-1.5">
                    {currentPet.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-700"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-1 italic">
                    "{currentPet.story}"
                  </p>

                  {/* Bộ 3 nút điều khiển quẹt thẻ tương tác sống động */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    {/* Nút Bỏ qua / Xem bé khác */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1, rotate: -6 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePass}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-stone-200 bg-white text-stone-400 hover:text-stone-700 hover:border-stone-300 shadow-sm transition cursor-pointer"
                      title="Xem bé tiếp theo"
                      aria-label="Xem bé tiếp theo"
                    >
                      <X className="h-5 w-5 stroke-[2.5]" />
                    </motion.button>

                    {/* Nút Khám phá chi tiết */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="/explore"
                        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-stone-900 px-5 text-xs font-bold text-white hover:bg-stone-800 shadow-md cursor-pointer"
                      >
                        <span>Xem toàn bộ hồ sơ</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>

                    {/* Nút Thích / Gửi yêu cầu ghép đôi */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={handleLike}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition cursor-pointer"
                      title="Thích bé này"
                      aria-label="Thích bé này"
                    >
                      <Heart className="h-5 w-5 fill-white stroke-[2.5]" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
