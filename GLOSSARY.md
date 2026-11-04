# PetMatch Domain & Infrastructure Glossary

Tài liệu định nghĩa các thuật ngữ chuẩn được sử dụng xuyên suốt trong hệ thống PetMatch.

## 1. Hạ tầng & DevOps (Infrastructure)
- **Reverse Proxy (Nginx Gateway):** Cổng đón tiếp duy nhất trên cổng 80/443, làm nhiệm vụ định tuyến URL, nén dữ liệu Gzip và phân luồng traffic nội bộ.
- **Rate Limiting:** Cơ chế kiểm soát lưu lượng request đến máy chủ trong một khoảng thời gian, ngăn chặn tấn công DoS/DDoS và brute-force mật khẩu. Trả về mã HTTP `429 Too Many Requests` khi vượt ngưỡng.
- **Docker Healthcheck:** Cơ chế định kỳ thăm dò trạng thái bên trong container (qua endpoint `/api/health`). Nếu kiểm tra thất bại quá số lần quy định, container được đánh dấu là `unhealthy` và kích hoạt tự khởi động lại.
- **Standalone Mode (Next.js):** Cơ chế đóng gói của Next.js chỉ gom các file thực thi tối thiểu và node_modules cần thiết, giúp giảm dung lượng image Docker từ ~1.2GB xuống ~150MB và cắt giảm 85% RAM.
- **Zero-Downtime Deployment:** Quy trình triển khai phần mềm mới lên máy chủ mà người dùng đang truy cập không gặp phải lỗi gián đoạn hoặc trang bị sập.

## 2. Nghiệp vụ cốt lõi (Domain Concepts)
- **Pet Matching:** Hệ thống tìm kiếm và gợi ý ghép đôi thú cưng dựa trên vị trí địa lý, độ tuổi, loài và quy tắc kiểm duyệt giống.
- **Spa Booking:** Hệ thống đặt lịch chăm sóc và làm đẹp thú cưng tại các chi nhánh được quản lý.

