import type { Metadata } from 'next';
import { Nunito, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/context/CartContext';
import RouteGuard from '@/components/auth/RouteGuard';
import IdleSessionGuard from '@/components/auth/IdleSessionGuard';

// Cấu hình font tiêu đề Nunito (bo tròn thân thiện, hỗ trợ tiếng Việt đầy đủ 100%) và Plus Jakarta Sans
const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PetMatch - Tìm Bạn Đời & Chăm Sóc Thú Cưng Hàng Đầu',
  description: 'Nền tảng ghép đôi thú cưng thuần chủng, dịch vụ Spa 5 sao & cửa hàng phụ kiện chính hãng tại Việt Nam',
  generator: 'PetMatch',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

/**
 * RootLayout: Cấu hình khung ứng dụng, nạp font chữ thương hiệu, context giỏ hàng và phiên bảo mật
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="bg-background" suppressHydrationWarning>
      <body className={`${nunito.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <IdleSessionGuard />
        <CartProvider>
          <RouteGuard>{children}</RouteGuard>
        </CartProvider>
        <Toaster richColors position="bottom-center" closeButton visibleToasts={1} />
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true' && <Analytics />}
      </body>
    </html>
  );
}
