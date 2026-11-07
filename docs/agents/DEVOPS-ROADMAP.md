# 🗺️ PetMatch DevOps Optimization Roadmap & Progress Tracker

> **Mục tiêu:** Tối ưu hóa hiệu năng, độ sẵn sàng (High Availability) và bảo mật cho hệ thống **PetMatch** trên máy chủ VPS Linux (1 vCPU, 2GB RAM), áp dụng các chuẩn thực hành DevOps chuyên nghiệp phục vụ sản xuất thực tế và phỏng vấn.

---

## 📊 Bảng theo dõi tiến độ tổng thể

| Giai đoạn | Hạng mục tối ưu | Tác động hệ thống | Trạng thái | Ngân sách RAM |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | **Nginx Hardening & Rate Limiting** | Chống DDoS, spam login, brute-force | 🟢 **Đã hoàn thành** | +0 MB |
| **P1** | **Docker Compose Healthchecks** | Tự phục hồi container khi treo/deadlock | 🟢 **Đã hoàn thành** | +0 MB |
| **P2** | **Redis Caching Service** | Giảm 80% truy vấn DB, tăng tốc API | ⚪ *Kế hoạch* | ~25 MB |
| **P3** | **Lightweight Observability & Alerting** | Báo động tức thì qua Telegram/Discord khi sập web | ⚪ *Kế hoạch* | ~30 MB |
| **P4** | **CI/CD Security Scanning (Trivy/Linter)** | Tự động phát hiện lỗ hổng image trước khi deploy | ⚪ *Kế hoạch* | 0 MB (Cloud Runner) |

---

## 📋 Chi tiết các hạng mục triển khai

### Giai đoạn 1: Nginx Hardening & Docker Self-Healing (Đã hoàn thành)
- [x] **1.1. Cấu hình Nginx Rate Limiting (`limit_req_zone`):**
  - Giới hạn tần suất request vào `/api/auth/` (`auth_limit`: 5 req/s, burst 10) chống brute-force mật khẩu.
  - Giới hạn tần suất request chung cho `/api/` (`api_limit`: 30 req/s, burst 50) chống cào dữ liệu/spam.
  - Phản hồi mã lỗi chuẩn HTTP 429 (`limit_req_status 429;`).
- [x] **1.2. Docker Compose Healthchecks:**
  - Thêm endpoint siêu nhẹ `/api/health` cho cả NestJS Backend và Next.js Frontend.
  - Cấu hình chỉ thị `healthcheck:` trong `docker-compose.prod.yml` cho `server` và `client` (interval 30s, timeout 5s, retries 3).
  - Viết Unit test tự động xác nhận endpoint healthcheck đạt 19/19 test suites (166 tests passed).

### Giai đoạn 2: Tối ưu hiệu năng với Redis In-Memory Caching
- [ ] **2.1. Tích hợp Redis vào `docker-compose.prod.yml`:**
  - Image `redis:alpine` với cấu hình giới hạn RAM `maxmemory 50mb` và chính sách dọn dẹp `allkeys-lru`.
- [ ] **2.2. Kết nối CacheModule trong NestJS:**
  - Cache các dữ liệu tĩnh ít thay đổi: danh mục sản phẩm, danh sách chi nhánh Spa, quy tắc phối giống thú cưng.
  - Tự động xóa cache (Invalidation) khi có thao tác Create/Update/Delete.

### Giai đoạn 3: Giám sát thời gian thực & Cảnh báo tức thì (Observability)
- [ ] **3.1. Dựng Uptime Kuma (hoặc tích hợp Grafana Cloud Exporter):**
  - Giám sát trạng thái 24/7 của domain `https://petmatch.io.vn` và các endpoint nội bộ.
- [ ] **3.2. Cấu hình Telegram Webhook:**
  - Bắn tin nhắn thông báo về điện thoại ngay trong 30 giây khi website hoặc backend gặp sự cố.

### Giai đoạn 4: Gia cố bảo mật Pipeline CI/CD (GitHub Actions)
- [ ] **4.1. Tích hợp Trivy Security Scan:**
  - Tự động quét lỗ hổng bảo mật của Docker image trước khi triển khai lên máy chủ VPS.
