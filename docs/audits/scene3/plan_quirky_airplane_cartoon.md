# KẾ HOẠCH & BẢN KIỂM TOÁN HOẠT CẢNH: "CHIẾC MÁY BAY ĐỎNG ĐẢNH" (QUIRKY CARTOON AIRPLANE)

> **Dự án:** Video Quảng Cáo Bảo Hiểm 2K/4K @ 60FPS TOPbaohiem & InsureGO CMS  
> **Phân cảnh:** Scene 3 · Điểm giao thoa giữa Shot 3.1 (Khởi hành) và Shot 3.2 (Sự cố vali bung mở)  
> **Kỹ thuật thống nhất:** Cách 2 - Tạo sinh bộ Pose biến dạng chuyên biệt (Multi-frame Cartoon Deformation)  
> **Trạng thái:** Lên Kế Hoạch & Chia Nhỏ Task Kiểm Duyệt (Planning & Task Audit)

---

## I. MỤC TIÊU NGHỆ THUẬT & VAI TRÒ KỊCH BẢN

* **Vấn đề chuyển cảnh cũ:** Chuyển từ cảnh bình yên (Shot 3.1) sang cảnh sự cố nắp vali bật tung (Shot 3.2) nếu không có "cái cớ" thì sẽ bị gượng gạo hoặc đột ngột.
* **Giải pháp "Chiếc máy bay đỏng đảnh":**
  * Chiếc máy bay mô hình xuất hiện ở góc trên đầu nhân vật nam (phía trên tầng mây) sau khi cặp đôi đã ổn định vị trí trên đĩa thảm tròn xanh.
  * Máy bay đóng vai trò là **"Tác nhân gây hài & Kíp nổ chuyển cảnh" (Comedic Catalyst & Shot Bridge)**:
    1. Máy bay bay lơ lửng, chao đảo ngập ngừng (đỏng đảnh).
    2. Bỗng nhiên phanh gấp, thân máy bay bị dồn ép "cong quéo" như sợi dây thun bị kéo căng hết cỡ.
    3. Búng cái "tách", lộn ngược đầu 180° và tháo chạy ngược từ phải sang trái.
    4. Cú búng gió lốc này thổi bay qua đầu cặp đôi $\rightarrow$ Làm nắp vali bật tung, mở màn cho Shot 3.2!

---

## II. ĐẶC TẢ BỘ POSE TẠO SINH (CARTOON MULTI-FRAME ASSET SPECS)

Để đạt được độ "mướt, trơn tru và biểu cảm hoạt hình cao cấp", toàn bộ chuyển động sẽ dựa trên bộ 5 Pose chính được tạo sinh đồng bộ phong cách với mô hình gốc `may_bay.png` (màu trắng phối cánh/đuôi hồng cánh sen thương hiệu `#ED037C`):

```
[Pose 1: Normal Hover]  -->  [Pose 2: Wobble Teeter]  -->  [Pose 3: Squash & Bend]  -->  [Pose 4: Snap Flip]  -->  [Pose 5: Zip-Out Panic]
 (Bay lơ lửng bình thường)     (Chao đảo đỏng đảnh)         (Cong quéo dồn nén lò xo)      (Lật mặt búng thun)         (Vút ngược tháo chạy + Vệt gió)
```

| Tên File Dự Kiến | Tên Pose | Miêu Tả Biến Dạng Hình Thể & Trọng Tâm | Thời Lượng Remotion |
| :--- | :--- | :--- | :--- |
| `plane_pose_1_hover.png` | **1. Normal Hover** | Thân máy bay thon dài nguyên bản, mũi ngóc nhẹ 3°, cánh thăng bằng lơ lửng trên mây. | Frame 180 – 240 (1.0s) |
| `plane_pose_2_wobble.png` | **2. Wobble Teeter** | Mũi hất cao, đuôi chúc thấp, cánh nghiêng chao đảo như bị mất trớn ngập ngừng. | Frame 240 – 280 (0.67s) |
| `plane_pose_3_squash_bend.png` | **3. Squash & Bend (Cong quéo)** | Thân máy bay bị uốn cong hình cánh cung/trái chuối (đầu chúi xuống, đuôi vểnh ngược lên, bụng phình to do bị nén ép quán tính tối đa). | Frame 280 – 310 (0.5s) |
| `plane_pose_4_snap_flip.png` | **4. Snap Flip (Búng xoay đầu)** | Thân máy bay co dẹp ép ngang cực đại (chuẩn bị lật mặt 180°), góc nhìn nghiêng gắt, tạo lực bật lò xo. | Frame 310 – 325 (0.25s) |
| `plane_pose_5_zip_run.png` | **5. Zip-Out & Panic (Bay ngược)** | Máy bay quay đầu sang trái, đuôi xả nhẹ khói/vệt gió xoáy cartoon, phóng vút về góc trái. | Frame 325 – 360 (0.58s) |
| `wind_puff_effect.png` | **Bonus: Vệt gió xoáy Cartoon** | Vệt gió lốc giấy xoắn ốc trắng/hồng rơi xuống đầu vali. | Frame 320 – 360 (Kích hoạt 3.2) |

---

## III. PHÂN RÃ CÁC TASK TRIỂN KHAI THEO QUY TRÌNH CHUẨN

Tuân thủ nghiêm ngặt phong cách làm việc: **Chia nhỏ công việc, không ôm đồm, duyệt từng bước**.

### 📌 Task 1: Lập Kế Hoạch & Audit Kỹ Thuật (ĐANG THỰC HIỆN)
- [x] Phân tích kịch bản & chuyển động.
- [x] Lập bản đặc tả 5 Pose biến dạng.
- [x] Thiết lập cấu trúc thư mục chứa tài nguyên mới: `public/assets/elements/screen3/airplane_quirky/`.

### 📌 Task 2: Tạo Sinh Bộ Ảnh Multi-frame Cartoon Poses
- [x] Dùng `may_bay.png` gốc làm phong cách tham chiếu (Reference Style).
- [x] Tạo sinh lần lượt từng Pose bằng `generate_image`:
  - Pose 2: Chao đảo (Wobble).
  - Pose 3: Cong quéo (Squash & Bend).
  - Pose 4: Búng thun lật mặt (Snap Flip).
  - Pose 5: Bay ngược tháo chạy (Zip-Out).
  - Vệt gió cartoon (Wind Puff / Wind Vortex).
- [x] Lưu trữ và báo cáo từng file ảnh để Bạn kiểm tra.

### 📌 Task 3: Người Dùng Kiểm Tra & Xử Lý Hậu Kỳ Tài Nguyên
- [x] Bạn xem trực tiếp các file ảnh đã tạo sinh trong `airplane_quirky/`.
- [x] Tinh chỉnh, tách nền và tối ưu nét studio-quality toàn bộ 7 file trong `maybay-tachnen/`.

### 📌 Task 4: Lập Trình Diễn Hoạt Khung Hình Động (Remotion Staging)
- [x] Tạo timeline frame chính xác (Frame 180 $\rightarrow$ 360) chia 6 giai đoạn biểu cảm.
- [x] Kết hợp hoán đổi frame (Frame Swapping) với đường cong chuyển động Elastic / Cubic phi tuyến tính và lật 180° (`scaleX: -1`) khi tháo chạy.
- [x] Đồng bộ bóng đổ (Contact & Air Shadow) biến thiên mượt mà theo từng trạng thái nén / phanh / xoay.
- [x] Điều chỉnh vệt lốc xoáy giấy 3D (`zIndex: 27`) xoay rơi trực diện lên nắp vali chuẩn bị cho Shot 3.2.

### 📌 Task 5: Kiểm Duyệt Toàn Diện Điểm Giao Thoa Sang Shot 3.2
- [ ] Bạn xem preview trực tiếp trên Remotion Player (`http://localhost:3000`).
- [ ] Khớp điểm rơi của vệt gió máy bay với cú bật mở nắp vali của Shot 3.2.
