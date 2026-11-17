# 📋 PetMatch — Agent Task Tracker & Remote / Cloud Handover

> Tài liệu này được lưu trong repo (`docs/agents/TASK-TRACKER.md`) và được `AGENTS.md` chỉ định đọc đầu tiên ở mỗi phiên mới để bất kỳ Agent nào (Local, Cloud Session hay trên Điện thoại) đều nắm bắt ngay 100% bối cảnh, tiến độ và việc cần làm tiếp theo.

---

## 0. 📱 Cloud / Mobile Session Handover (Cập nhật mới nhất)

### 🎯 Việc ưu tiên số 1 cho phiên tiếp theo: **GitHub Issue #2** (`ready-for-agent`)
- **Link Spec đầy đủ:** https://github.com/ngnnmnn/PetMatch-Private/issues/2 (`gh issue view 2`)
- **Lệnh bắt đầu nhanh trên điện thoại:** `/implement #2`
- **Suggested Skills cho Agent tiếp theo:**
  - `implement` — Thực thi trọn gói GitHub Issue #2 và chạy kiểm thử cuối phiên.
  - `modern-web-guidance` — **Bắt buộc** tra cứu (`retrieve`) trước khi sửa HTML/CSS/JS client (`ime-safe-enter-submit`, `autofill-sign-in-form`, `optimize-image-priority`, `js`).
  - `tdd` — Viết test Playwright E2E cho luồng khách vãng lai (guest `401` / `/spa/book`), IME Enter và autofill `/login` trước/cùng lúc sửa code.
  - `code-review-and-quality` (hoặc `code-review`) — Rà soát chất lượng diff trước khi merge/push.

| Mức | Mã | Hạng mục trong Issue #2 | Vị trí chính | Trạng thái |
|---|---|---|---|---|
| 🔴 High | A1 | **Khách chưa đăng nhập bị báo nhầm `"Phiên đăng nhập đã hết hạn"` & bị đá khỏi `/spa/book`** | `client/lib/axios.ts`, `client/app/spa/book/page.tsx` | 📋 Sẵn sàng (`#2`) |
| 🔴 High | MWG-1 | **Lỗi gõ tiếng Việt (Telex/VNI) bấm `Enter` bị nhảy tìm kiếm sớm (`ime-safe-enter-submit`)** | `client/components/home/SearchFilterBar.tsx` | 📋 Sẵn sàng (`#2`) |
| 🟠 Med | MWG-2 | **Bổ sung `autoComplete="current-password"`, `htmlFor`/`id`, tắt spellcheck & thêm `enterKeyHint` (`autofill-sign-in-form`)** | `client/components/auth/LoginForm.tsx` | 📋 Sẵn sàng (`#2`) |
| 🟡 Low | MWG-3 | **Thay 8 chỗ `[...arr].sort(...)` sang `.toSorted(...)` & thêm `loading="lazy"` cho `<img>` offscreen** | `explore`, `manager`, `spa/bookings`, `spa-bookings-panel`, `product/[id]`, `PetPublicProfileDialog` | 📋 Sẵn sàng (`#2`) |

### ✅ Vừa hoàn thành gần nhất trên `main`:
- **Commit `4ad8d84` (Đã deploy lên `https://petmatch.io.vn`, đóng Issue #1):** Hoàn thành toàn bộ UI/UX Pro Max Trang chủ & Mobile (`W1–W3`, `W7`, `M1–M5`), trang 404, và 10/10 Playwright E2E tests.
- **Commit `e7cb6b2` (Đã push lên `origin/main`):**
  - Đồng bộ font `Plus Jakarta Sans` toàn site (xóa inline `fontFamily: 'Inter, Outfit...'` ở `client/app/shop/page.tsx` và `client/app/product/[id]/page.tsx`, đổi `sectionLabel="Store"` → `"Cửa hàng"`).
  - Tách màu active trên `AppHeader.tsx` giữa `Cửa hàng` (`teal-700 → cyan-700`) và `Spa & Làm đẹp` (`emerald-700 → green-700`).
  - Xóa badge đầu Hero và thêm `whitespace-nowrap` chống gãy cụm từ tiếng Việt trên `Hero.tsx` & `StorePage.tsx`.
- **Cài đặt skill `modern-web-guidance`:** Đã cài vào `.agents/skills/modern-web-guidance` và quét `legacy-scan` toàn bộ `client/`.

---

## 1. 🔐 Google OAuth Login (90% Hoàn tất)

| # | Việc cần làm | Trạng thái | Chi tiết |
|---|---|---|---|
| G1 | Tạo Google OAuth Client ID & Secret mới | ✅ **Đã xong** | Đã tạo trên Google Cloud Console cá nhân |
| G2 | Cập nhật `server/.env` ở máy cá nhân | ✅ **Đã xong** | Đã lưu vào `server/.env` (không đẩy lên Git) |
| G3 | Cấu hình `docker-compose.prod.yml` tự nhận domain thật | ✅ **Đã xong** | Đã thêm `CLIENT_URL`, `FRONTEND_URL`, `GOOGLE_CALLBACK_URL` trỏ về `https://petmatch.io.vn` |
| G4 | Cập nhật `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` vào `/opt/petmatching/server/.env` trên VPS | ⏳ **Chờ chạy lệnh SSH** | Sau khi cập nhật `.env` trên VPS, chạy `docker compose -f docker-compose.prod.yml up -d --force-recreate server` |

---

## 2. 🖥️ Backlog Giao Diện Web & Backend (Từ đợt `/ponytail-audit`)

### 🛠️ Các hạng mục Giao diện Web (`client/`) CÒN LẠI (ngoài Issue #2):

| Mức | # | Hạng mục trên Web (`client/`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🟡 Med | W4 | **Gọi `setState` đồng bộ trong `useEffect` gây render kép** | `client/app/explore/page.tsx`, `client/app/shop/page.tsx`, `client/app/product/[id]/page.tsx` | Bỏ `useEffect` reset state dẫn xuất, dùng `key` hoặc tính trực tiếp khi render |
| 🟡 Med | W5 | **Dùng thẻ `<img>` thuần thay vì `<Image />` của Next.js ở danh sách chính** | `client/app/explore/page.tsx` | Chuyển sang `next/image` (hoặc lazy-load trước trong Issue #2) |
| 🟡 Med | W6 | **Chuyển trang cứng `window.location.href = "/login"` khi hết hạn token** | `client/lib/axios.ts` | Kết hợp xử lý mượt cùng mục `A1` trong Issue #2 |
| 🔵 Low | W8 | **2 trang Quản lý quá lớn (>5.500 dòng/file)** | `client/app/manager/page.tsx`, `client/app/managerSpa/page.tsx` | Tách dần các Tab/Modal ra component con khi cần chỉnh sửa tính năng quản lý |

### ⚙️ Các hạng mục Backend (`server/`) CÒN LẠI:

| Mức | # | Hạng mục Backend (`server/`) | Vị trí file | Cách sửa ngắn gọn |
|---|---|---|---|---|
| 🔴 Must | S1 | **Mất lượt Voucher khi khách hủy đơn hoặc hết hạn QR PayOS** | `server/src/modules/payment/payment.service.ts:L285-321` | Thêm lệnh giảm `usedCount: { decrement: 1 }` cho `voucherCode` trong transaction hủy đơn |
| 🟠 High | S2 | **Tìm kiếm ghép đôi gọi server demo OSRM công cộng gây treo 3.5s khi quá tải** | `server/src/modules/matching/matching.service.ts:L376-416` | Dùng công thức Haversine nội bộ khi lọc danh sách quẹt thẻ; chỉ gọi OSRM khi thực sự cần tính quãng đường giao thông |

---

## 3. 📱 Lịch Sử Đã Đóng: Giao Diện Mobile (GitHub Issue #1 — ✅ CLOSED)

> Đã hoàn thành toàn bộ `M1–M5`, `W1–W3`, `W7`, kiểm thử Playwright 10/10 và triển khai lên production (`4ad8d84`, `e7cb6b2`). Xem chi tiết tại `gh issue view 1`.
