# 🚀 Video Quảng Cáo Hệ Thống TopBaoHiem & InsureGO CMS (2K / 4K UHD 60FPS)

Video quảng cáo công nghệ (InsurTech Platform Showcase) định dạng **4K UHD (3840x2160)** và **2K QHD (2560x1440)** @ **60fps** được xây dựng bằng công nghệ **Remotion (React 18 + TypeScript + Three.js WebGL)**.

---

## 🎯 Mục Tiêu Dự Án & Thông Điệp Cốt Lõi

- **Mục tiêu**: Quảng bá hệ sinh thái bảo hiểm số và **chào bán giải pháp phần mềm Chìa Khóa Trao Tay (Turnkey Solution)** cho các nhà đầu tư, công ty môi giới và đại lý bảo hiểm.
- **Phong cách nghệ thuật**: **3D Isometric Bento Grid & Dual-Layer Parallax (Đan xen 2 mặt Âm - Dương)**:
  - *Mặt trước*: Trải nghiệm khách hàng tinh gọn 1-chạm (AI OCR quét Cà vẹt xe, so sánh giá đối đầu đa hãng, cấp ấn chỉ điện tử tức thì).
  - *Mặt sau*: Cú lật không gian 3D mở ra cỗ máy điều hành ngầm **InsureGO CMS** (Dashboard thời gian thực, tự động hóa 100% vòng đời hợp đồng, cây hoa hồng 75+ đại lý KOLs).

---

## ⏱️ Cấu Trúc Thời Lượng 60 Giây (3600 Frames @ 60 FPS)

```
[00:00 - 00:08 | 480 frames] : SCENE 1 - Cyber Shield & Tầm Nhìn InsurTech 2026
[00:08 - 00:25 | 1020 frames]: SCENE 2 - Tầng 1: Frontend 1-Chạm, AI OCR Quét Cà Vẹt 2s
[00:25 - 00:45 | 1200 frames]: SCENE 3 - Tầng 2: Cú Gập Không Gian Lật Mở Lõi Vận Hành CMS
[00:45 - 00:55 | 600 frames] : SCENE 4 - Tầng 3: Cỗ Máy Mở Rộng Quy Mô & 75+ Đại Lý Số
[00:55 - 01:00 | 300 frames] : SCENE 5 - Outro Giải Pháp Chìa Khóa Trao Tay & Kêu Gọi Đầu Tư
```

---

## 💻 Hướng Dẫn Sử Dụng & Xuất Bản Video

### 1. Xem trước tương tác thời gian thực (Remotion Studio)
```bash
npm start
```
Trình duyệt tự động mở `http://localhost:3000`. Bạn có thể tua scrub từng frame, phóng to chi tiết 4K và kiểm tra chuyển động.

### 2. Xuất video chất lượng cao (Master 2K / 4K)

- **Xuất video 4K UHD Master (3840 x 2160 @ 60fps):**
  ```bash
  npm run render:4k
  ```
  File video xuất ra tại: `out/topbaohiem-promo-4k.mp4`

- **Xuất video 2K QHD (2560 x 1440 @ 60fps):**
  ```bash
  npm run render:2k
  ```
  File video xuất ra tại: `out/topbaohiem-promo-2k.mp4`

- **Xuất video 1080p Full HD (Preview siêu tốc):**
  ```bash
  npm run render:1080p
  ```
  File video xuất ra tại: `out/topbaohiem-promo-1080p.mp4`

---

## 📁 Cấu Trúc Thư Mục

```
quancao-topbaohiem/
├── docs/                             # Báo cáo audit, tài liệu & kho ảnh gốc 4K
│   ├── cms_interactive/              # 95 ảnh 4K tương tác sâu CMS
│   ├── trangchu/                     # 51 URLs ảnh 4K Frontend
│   └── PROJECT_AUDIT_MASTER_CONTEXT.md # Báo cáo tổng thể dự án
├── public/
│   └── assets/                       # Ảnh 4K phục vụ render video
│       ├── cms/                      # Ảnh CMS dashboard, contracts, kols, brands
│       └── trangchu/                 # Ảnh checkout, ocr, so sánh, chứng nhận
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CyberShieldThree.tsx  # Khiên 3D Three.js phát quang Scene 1
│   │   │   └── MatrixBackgroundThree.tsx # Lưới Cyber Grid 3D toàn thời gian
│   │   ├── scenes/
│   │   │   ├── Scene1Hook.tsx        # Scene 1: The Hook
│   │   │   ├── Scene2Frontend.tsx    # Scene 2: AI OCR & Bento Grid
│   │   │   ├── Scene3CMSFlip.tsx     # Scene 3: Cú gập 3D vào CMS
│   │   │   ├── Scene4Scale.tsx       # Scene 4: Mạng lưới 75+ CTV
│   │   │   └── Scene5Outro.tsx       # Scene 5: Outro Turnkey Solution
│   │   └── FontLoader.tsx            # Nạp Plus Jakarta Sans & Space Grotesk
│   ├── config/
│   │   └── videoConfig.ts            # Cấu hình mốc thời gian, frame & màu sắc
│   ├── MainVideo.tsx                 # Composition kết nối 5 scenes
│   ├── Root.tsx                      # Khai báo Compositions 4K, 2K, 1080p
│   └── index.ts                      # Entry point Remotion
├── package.json
├── remotion.config.ts                # Cấu hình CRF 18, H.264, ANGLE GPU
├── tsconfig.json
└── README.md
```
