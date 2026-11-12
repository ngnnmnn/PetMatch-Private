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
- [x] **Nâng cấp UI/UX Trang chủ & Điều hướng (W1, W2, W3, W7, M1–M5):** Sửa link Footer `/match` → `/explore` + bổ sung `/shop`, `/spa` và `aria-label` riêng; lọc sản phẩm theo `isValidProductForRecommendation` + thêm Empty State; sửa `params` bất đồng bộ ở `home/product/[id]/page.tsx` và tắt `ignoreBuildErrors: true`; thêm menu Mobile `< 768px`; chuẩn hóa preload ảnh Hero đúng `sizes`; bỏ `repeat: Infinity` trên lớp `backdrop-blur`; nâng touch target `≥ 44px` (gồm cả `NotificationBell`); nâng badge tối thiểu `11px` + tạo trang `not-found.tsx` (404).

### 🛠️ Các hạng mục Giao diện Web (`client/`) CÒN LẠI:

| Mức | # | Hạng mục trên Web (`client/`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🟡 Med | W4 | **Gọi `setState` đồng bộ trong `useEffect` gây render kép khi đổi thú cưng** | `client/app/explore/page.tsx:L1506` | Bỏ `useEffect` reset `setActivePhotoIdx(0)`, truyền `key={pet.id}` vào cụm hiển thị ảnh |
| 🟡 Med | W5 | **Dùng thẻ `<img>` thuần thay vì `<Image />` của Next.js** | `client/app/explore/page.tsx:L557, L1255` *(đã xong `UserDropdown.tsx`)* | Chuyển sang `next/image` để tự động nén WebP/AVIF và lazy-load |
| 🟡 Med | W6 | **Chuyển trang cứng `window.location.href = "/login"` khi hết hạn token** | `client/lib/axios.ts:L55` | Tránh reload trắng toàn trang khi đang ở trang public hoặc thông báo mượt trước khi điều hướng |
| 🔵 Low | W8 | **2 trang Quản lý quá lớn (>5.500 dòng/file)** | `client/app/manager/page.tsx`, `client/app/managerSpa/page.tsx` | Tách dần các Tab/Modal ra component con khi cần chỉnh sửa tính năng quản lý |

### ⚙️ Các hạng mục Backend (`server/`) CÒN LẠI:

| Mức | # | Hạng mục Backend (`server/`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🔴 Must | S1 | **Mất lượt Voucher khi khách hủy đơn hoặc hết hạn QR PayOS** | `server/src/modules/payment/payment.service.ts:L285-321` | Thêm lệnh giảm `usedCount: { decrement: 1 }` cho `voucherCode` trong transaction hủy đơn |
| 🟠 High | S2 | **Tìm kiếm ghép đôi gọi server demo OSRM công cộng gây treo 3.5s khi quá tải** | `server/src/modules/matching/matching.service.ts:L376-416` | Dùng công thức Haversine nội bộ khi lọc danh sách quẹt thẻ; chỉ gọi OSRM khi thực sự cần tính quãng đường giao thông |

---

## 3. 📱 Giao Diện Mobile (Từ đợt `/ui-ux-pro-max` — GitHub Issue #1)

> Đặc tả chi tiết đã được xuất bản trên GitHub Issues: **Issue #1** (`gh issue view 1`). Toàn bộ M1–M5 đã được xử lý trong nhánh hiện tại; chờ commit & kiểm tra lại issue.

| Mức | # | Hạng mục trên Mobile (`< 768px`) | Trạng thái | Vị trí file |
|---|---|---|---|---|
| 🔴 Critical | M1 | **Thanh điều hướng Mobile (`< 768px`)** | ✅ **Đã xong** | `client/components/layout/AppHeader.tsx` |
| 🟠 High | M2 | **Preload ảnh thú cưng tiếp theo đúng `sizes`** | ✅ **Đã xong** | `client/components/home/Hero.tsx` |
| 🟠 High | M3 | **Bỏ `repeat: Infinity` trên `backdrop-blur-md`** | ✅ **Đã xong** | `StorePage.tsx`, `Hero.tsx` |
| 🟡 Med | M4 | **Nâng Touch Target lên tối thiểu `44×44px`** | ✅ **Đã xong** | `AppHeader.tsx`, `UserDropdown.tsx`, `StorePage.tsx`, `Footer.tsx` |
| 🔵 Low | M5 | **Badge tối thiểu `11px` & padding thẻ 2 cột trên mobile** | ✅ **Đã xong** | `client/components/home/ProductCard.tsx` |
