# 1. Nginx Rate Limiting và Docker Healthchecks

Ngày: 2026-11-02  
Trạng thái: **Đã chấp thuận (Accepted)**

## Bối cảnh (Context)
Hệ thống PetMatch đang chạy trên VPS Ubuntu 22.04 LTS (1 vCPU, 2GB RAM). 
Cần nâng cao tính sẵn sàng (High Availability) và bảo mật cho hệ thống mà không làm tăng tải RAM hoặc gây rủi ro gián đoạn dịch vụ:
1. Máy chủ có nguy cơ bị tấn công Brute-force vào các endpoint nhạy cảm (`/api/auth/*`) hoặc spam request làm quá tải CPU/RAM.
2. Các container hiện tại chỉ tự khởi động lại khi crash (`restart: always`), chưa có cơ chế phát hiện và tự phục hồi khi ứng dụng bị treo ngầm (deadlock/unresponsive).

## Quyết định (Decision)
1. **Phân tầng Nginx Rate Limiting:**
   - Tạo zone `auth_limit` (5 req/s, burst 10) áp dụng cho `/api/auth/`.
   - Tạo zone `api_limit` (30 req/s, burst 50) áp dụng cho `/api/` chung.
   - Cấu hình mã phản hồi `limit_req_status 429` (Too Many Requests).
2. **Cơ chế Docker Healthchecks:**
   - Bổ sung endpoint siêu nhẹ `GET /api/health` trong NestJS trả về `{ status: 'ok', uptime }`.
   - Cấu hình chỉ thị `healthcheck` trong `docker-compose.prod.yml` cho cả NestJS Backend và Next.js Frontend với chu kỳ 30s, timeout 5s, tối đa 3 lần thử lại (retries: 3).

## Hệ quả (Consequences)
- **Tích cực:** Chống spam/brute-force hiệu quả; container tự động reboot trong vòng 90s nếu ứng dụng bị treo; tiêu tốn 0 MB RAM phụ trội.
- **Tiêu cực / Rủi ro:** Cần kiểm tra kỹ các client gọi API liên tiếp (ví dụ: polling chat) để không bị chạm ngưỡng 429; các ngưỡng burst đã được cấu hình đủ rộng để người dùng bình thường không bị ảnh hưởng.

