# 📋 PetMatch — Agent Task Tracker & Remote Handover

> Tài liệu này được lưu trong repo (`docs/agents/TASK-TRACKER.md`) để bất kỳ Agent nào trên máy mới hoặc môi trường Remote đều nắm bắt ngay 100% bối cảnh, tiến độ và danh sách việc cần làm.

---

## 1. 🔐 Google OAuth Login (90% Hoàn tất)

| # | Việc cần làm | Trạng thái | Chi tiết |
|---|---|---|---|
| G1 | Tạo Google OAuth Client ID & Secret mới | ✅ **Đã xong** | Đã tạo trên Google Cloud Console cá nhân |
| G2 | Cập nhật `server/.env` ở máy cá nhân | ✅ **Đã xong** | Đã lưu vào `server/.env` (không đẩy lên Git) |
| G3 | Cấu hình `docker-compose.prod.yml` tự nhận domain thật | ✅ **Đã xong** | Đã thêm `CLIENT_URL`, `FRONTEND_URL`, `GOOGLE_CALLBACK_URL` trỏ về `https://petmatch.io.vn` |
| G4 | Cập nhật `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` vào `/opt/petmatching/server/.env` trên VPS | ⏳ **Chờ chạy lệnh SSH** | Sau khi cập nhật `.env` trên VPS, chạy `docker compose -f docker-compose.prod.yml up -d --force-recreate server` |

---

## 2. 🖥️ Giao Diện Web & Hệ Thống (Từ đợt `/ponytail-audit`)

### ✅ Đã giải quyết:
- [x] **Bảo mật file `.env` trên Git:** Đã cập nhật `.gitignore` chặn `.env`, `.env.*` và thư mục báo cáo Playwright.
- [x] **Cài đặt Playwright E2E cho Frontend:** Đã thiết lập `client/playwright.config.ts`, `client/e2e/home.spec.ts` và các script `npm run test:e2e`, `npm run test:e2e:ui`, `npm run test:e2e:headed`.
- [x] **Tối ưu Hero Section 120 FPS:** Đã loại bỏ GPU blur lặp vô hạn và layout thrashing khi quẹt thẻ trên thiết bị di động.
- [x] **DevOps Phase 1:** Đã triển khai `/api/health`, Nginx Rate Limiting và Docker Healthchecks lên `https://petmatch.io.vn`.

### 🛠️ Các hạng mục Giao diện Web (`client/`) CÒN LẠI:

| Mức | # | Hạng mục trên Web (`client/`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🟠 High | W1 | **Link `/match` bị lỗi 404 ở Footer & thiếu link nhanh** | `client/components/layout/Footer.tsx` | Đổi `/match` → `/explore`, bổ sung link `/shop` và `/spa`, thêm `aria-label` riêng cho Facebook/Instagram/YouTube |
| 🟠 High | W2 | **Lọc sót sản phẩm có phân loại (Variants) & thiếu Empty State trên trang chủ** | `client/components/home/StorePage.tsx` | Dùng hàm `isValidProductForRecommendation(product)` thay vì chỉ check `product.stock > 0`; thêm khung Empty State khi hết hàng |
| 🟠 High | W3 | **Đang bật `ignoreBuildErrors: true` che giấu lỗi TypeScript khi build** | `client/next.config.mjs:L10-12` | Xóa `typescript: { ignoreBuildErrors: true }` (codebase hiện tại chạy `tsc --noEmit` đã 0 lỗi) |
| 🟡 Med | W4 | **Gọi `setState` đồng bộ trong `useEffect` gây render kép khi đổi thú cưng** | `client/app/explore/page.tsx:L1506` | Bỏ `useEffect` reset `setActivePhotoIdx(0)`, truyền `key={pet.id}` vào cụm hiển thị ảnh |
| 🟡 Med | W5 | **Dùng thẻ `<img>` thuần thay vì `<Image />` của Next.js** | `client/app/explore/page.tsx:L557, L1255`, `UserDropdown.tsx:L75` | Chuyển sang `next/image` để tự động nén WebP/AVIF và lazy-load |
| 🟡 Med | W6 | **Chuyển trang cứng `window.location.href = "/login"` khi hết hạn token** | `client/lib/axios.ts:L55` | Tránh reload trắng toàn trang khi đang ở trang public hoặc thông báo mượt trước khi điều hướng |
| 🔵 Low | W7 | **Hiệu ứng hover `group-hover:scale-108` sai cú pháp Tailwind & biến state thừa** | `client/components/home/StorePage.tsx`, `Hero.tsx` | Đổi thành `group-hover:scale-105`, xóa `activeStepTab` thừa, bỏ `cursor-pointer` ở 4 avatar chữ cái tĩnh |
| 🔵 Low | W8 | **2 trang Quản lý quá lớn (>5.500 dòng/file)** | `client/app/manager/page.tsx`, `client/app/managerSpa/page.tsx` | Tách dần các Tab/Modal ra component con khi cần chỉnh sửa tính năng quản lý |

### ⚙️ Các hạng mục Backend (`server/`) CÒN LẠI:

| Mức | # | Hạng mục Backend (`server/`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🔴 Must | S1 | **Mất lượt Voucher khi khách hủy đơn hoặc hết hạn QR PayOS** | `server/src/modules/payment/payment.service.ts:L285-321` | Thêm lệnh giảm `usedCount: { decrement: 1 }` cho `voucherCode` trong transaction hủy đơn |
| 🟠 High | S2 | **Tìm kiếm ghép đôi gọi server demo OSRM công cộng gây treo 3.5s khi quá tải** | `server/src/modules/matching/matching.service.ts:L376-416` | Dùng công thức Haversine nội bộ khi lọc danh sách quẹt thẻ; chỉ gọi OSRM khi thực sự cần tính quãng đường giao thông |

---

## 3. 📱 Giao Diện Mobile (Từ đợt `/ui-ux-pro-max` — GitHub Issue #1)

> Đặc tả chi tiết đã được xuất bản trên GitHub Issues: **Issue #1** (`gh issue view 1`).

| Mức | # | Hạng mục trên Mobile (`< 768px`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🔴 Critical | M1 | **Mất hoàn toàn thanh điều hướng chính trên màn hình điện thoại** | `client/components/layout/AppHeader.tsx:L89` | Bổ sung thanh điều hướng Mobile cho *Cửa hàng, Spa, Ghép đôi* dưới màn hình `< 768px` |
| 🟠 High | M2 | **Preload ảnh thú cưng tiếp theo sai kích thước (`10x10`)** | `client/components/home/Hero.tsx:L118` | Preload đúng `sizes` của thẻ chính để quẹt thẻ trên mobile không phải tải lại ảnh |
| 🟠 High | M3 | **Animation `repeat: Infinity` đè lên `backdrop-blur-md` gây nóng GPU** | `StorePage.tsx:L406`, `Hero.tsx:L284` | Đổi sang hiệu ứng xuất hiện tĩnh khi cuộn tới, bỏ vòng lặp vô hạn trên lớp kính mờ |
| 🟡 Med | M4 | **Kích thước nút chạm (Touch Target) nhỏ hơn chuẩn 44×44px** | `AppHeader.tsx`, `UserDropdown.tsx`, `StorePage.tsx`, `Footer.tsx` | Nâng nút Giỏ hàng, Đăng nhập, Xem tất cả sản phẩm, Social icons lên tối thiểu `44px` (`size-11` / `min-h-11`) |
| 🔵 Low | M5 | **Chữ badge `9px`–`10px` quá nhỏ & lệch chiều cao thẻ sản phẩm 2 cột** | `client/components/home/ProductCard.tsx` | Nâng cỡ chữ tối thiểu lên `11px`, tinh chỉnh padding `p-3 sm:p-4` cho màn hình hẹp 360px–375px |
