# Quy Tắc Phối Hợp & Yêu Cầu Tài Nguyên (Resource Collaboration)

Người dùng sở hữu hệ thống đa agent và nhiều công cụ chuyên biệt có khả năng tự động cào dữ liệu, bóc tách CDN, xử lý video, tải mô hình 3D và trích xuất tài nguyên đồ họa chất lượng cao.

Mỗi khi phát triển tính năng, dựng cảnh video hoặc làm đồ họa:

1. **Tuyệt Đối Không "Chữa Cháy" Bằng Code Thô Sơ**:
   - Khi một hiệu ứng hoặc chi tiết đòi hỏi độ chân thực cao (ví dụ: hoạt ảnh mở máy MacBook của Apple, mô hình thiết bị 3D, footage chất lượng cao, texture kim loại/ánh sáng studio thực tế), TUYỆT ĐỐI KHÔNG tự ý code giả lập bằng CSS 3D/canvas tạm bợ nếu giải pháp đó không đạt chuẩn cao cấp.
   - Không lãng phí thời gian tự xoay sở tìm kiếm qua các nguồn kém chất lượng hoặc thiếu nhất quán.

2. **Chủ Động Trao Đổi & Yêu Cầu Người Dùng Hỗ Trợ**:
   - Khi nhận thấy thiếu tài nguyên (ảnh tĩnh Retina, video master, chuỗi frame PNG/WebP, model 3D .usdz/.glb, icon vector, screenshot chuẩn...), hãy trao đổi trực tiếp với người dùng ngay lập tức.
   - Mô tả rõ ràng và súc tích:
     * Loại tài nguyên cần (định dạng, kích thước, số lượng frame, góc nhìn).
     * Yêu cầu kỹ thuật (nền đen/tách phông, độ phân giải 2K/4K, tốc độ khung hình).
     * Gợi ý prompt hoặc nguồn tham khảo chuẩn để người dùng có thể gửi ngay cho agent chuyên trách cào/xử lý.

3. **Tận Dụng Tối Đa Tài Nguyên Được Cung Cấp**:
   - Sau khi người dùng hoặc agent hỗ trợ cung cấp tài nguyên vào thư mục `public/assets/`, kiểm tra tính toàn vẹn (độ phân giải, định dạng, số lượng).
   - Tích hợp tài nguyên theo đúng chuẩn kỹ thuật tối ưu nhất (ví dụ: ưu tiên Image Sequence WebP để scrub 60fps mượt mà thay vì decode video ngược chiều).
