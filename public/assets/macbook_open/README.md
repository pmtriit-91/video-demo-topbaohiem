# KHO TƯ LIỆU ĐỒ HỌA MACBOOK PRO (APPLE OFFICIAL CDN MASTERS)

Toàn bộ tài nguyên được bóc tách trực tiếp từ Apple CDN chính thức của MacBook Pro, độ phân giải cao nhất (2x Retina / 4K), 100% sạch, không dính chữ, không dính logo hay nút bấm website.

---

## 1. MẪU MỞ TRỰC DIỆN 90 ĐỘ NGANG TẦM MẮT (EYE-LEVEL FRONT 90°)

Dành riêng cho các cảnh quay cần màn hình dựng đứng trực diện vuông góc 90°, đáy máy chỉ lộ gờ nhôm tinh tế (chuẩn tỷ lệ hiển thị 16:10 to rộng):

* **`macbook_front_90.png` / `macbook_front_90.webp`**:
  * **Độ phân giải**: `2200 x 1340` (Apple CDN 2x Retina Master).
  * **Đặc tính**: Nền đen `#000000`, màn hình đen OLED Liquid Retina XDR, nguyên bản Apple.
* **`macbook_front_90_transparent.png` / `macbook_front_90_transparent.webp`**:
  * **Độ phân giải**: `2200 x 1340`.
  * **Đặc tính**: Khung máy PNG trong suốt hoàn toàn:
    - Nền ngoài máy: Transparent (trong suốt 100%).
    - Thân máy & viền bezel & tai thỏ notch: Opaque sắc nét 100%.
    - **Lòng màn hình: ĐÃ ĐỤC RỖNG (Transparent Cutout)** chuẩn xác từng pixel theo khuôn cong viền và tai thỏ của Apple.
  * *Cách dùng cực kỳ tiện lợi*: Chỉ cần đặt layer website/ảnh/video nằm ở lớp dưới (z-index thấp hơn), đặt file `macbook_front_90_transparent.png` đè lên lớp trên cùng -> Tự động bo góc, khoét notch và che viền tự nhiên không cần dùng `clipPath` phức tạp!
* **`macbook_front_90_screen_mask.png`**:
  * File Mask gốc của Apple (`2200 x 1340`) dùng cho CSS `mask-image` hoặc Track Matte trong After Effects / Premiere.

### 📐 Toạ độ Pixel chuẩn của Lòng Màn Hình trong khung 2200 x 1340:
* Khung tổng thể: `2200 x 1340 px`
* Vị trí màn hình (Active Screen Area):
  * `left`: `224px` (~`10.18%`)
  * `top`: `40px` (~`2.985%`)
  * `width`: `1752px` (~`79.64%`)
  * `height`: `1136px` (~`84.78%`)
* Tỉ lệ màn hình: `1752 / 1136 = 1.542` (chuẩn MacBook Pro Liquid Retina XDR với tai thỏ notch).

---

## 2. HOẠT ẢNH MỞ NẮP TỪ GẬP -> MỞ HOÀN TOÀN (ANIMATION SEQUENCE)

* **Video Master**: `macbook_open_front_3456x1824.mp4` (`3456 x 1824`, 30 FPS, 78 frames, nền đen).
* **Chuỗi ảnh PNG**: Thư mục `frames_png/` (`frame_001.png` -> `frame_078.png` @ `3456 x 1824`).
* **Chuỗi ảnh WebP**: Thư mục `frames_webp/` (`frame_001.webp` -> `frame_078.webp` @ `3456 x 1824`).

---

## 3. TÀI NGUYÊN 3D GỐC (USDZ / AR QUICK LOOK)

* **`macbook_pro_14_space_black.usdz`** (8.6 MB): Bản màu Space Black.
* **`macbook_pro_14_silver.usdz`** (8.8 MB): Bản màu Silver.
* **`macbook_pro_14_space_black_variant.usdz`** (10 MB): Bản biến thể chi tiết cao.

---

## 4. ẢNH TĨNH & CINEMATIC TOURS

* **`macbook_pro_spaceblack_front_still_2x.jpg`**: Ảnh tĩnh 2X Space Black.
* **`macbook_pro_silver_front_still_2x.jpg`**: Ảnh tĩnh 2X Silver.
* **`macbook_hero_cinematic_3260x3388.mp4`**: Clip mở máy góc nghiêng dramatic `3260 x 3388`.
* **`macbook_sizes_compare_2x.mp4`**, **`macbook_camera_zoom_2x.mp4`**, **`macbook_audio_waves_2x.mp4`**, **`macbook_ports_angle_2x.mp4`**: Các clip cận cảnh chi tiết.
