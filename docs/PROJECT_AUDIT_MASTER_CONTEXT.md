# BÁO CÁO AUDIT TOÀN DIỆN DỰ ÁN SẢN XUẤT VIDEO 2K/4K QUẢNG CÁO HỆ THỐNG TOPBAOHIEM & INSUREGO CMS

**Mục tiêu tài liệu:** Đồng bộ 100% thông tin, quy tắc làm việc, kiến trúc kỹ thuật, kho tài nguyên 4K và định hướng kịch bản cho tất cả các Agent tham gia dự án.

---

## 1. QUY TẮC LÀM VIỆC & QUẢN LÝ MÃ NGUỒN (GIT RULES)

1. **Chỉ commit khi có yêu cầu**: Tuyệt đối không tự ý commit code trừ khi người dùng ra lệnh trực tiếp.
2. **Bảo vệ Staged Changes**: Tuyệt đối không đụng vào, không sửa đổi hay xóa các thay đổi đang nằm trong `staged changes` (người dùng đã staged có chủ đích).
3. **Thực thi commit tức thì**: Khi người dùng yêu cầu commit, thực hiện commit ngay lập tức, không kiểm tra rườm rà.

---

## 2. MỤC TIÊU CHIẾN LƯỢC CỦA DỰ ÁN

- **Sản phẩm quảng cáo**: Hệ sinh thái InsurTech toàn diện gồm 2 thành tố:
    1. **Frontend (`https://topbaohiem.vn/`)**: Cổng bán bảo hiểm trực tuyến cho người dùng cuối (B2C).
    2. **Backend CMS (`https://cms.topbaohiem.vn/` - cms.topbaohiem)**: Hệ thống quản trị, điều hành, tự động hóa cấp đơn và mạng lưới đại lý (B2B/ERP).
- **Mục đích cốt lõi của video**: **BÁN TOÀN BỘ HỆ THỐNG BẢO HIỂM NÀY CHO NHÀ ĐẦU TƯ / DOANH NGHIỆP MUỐN SỞ HỮU NỀN TẢNG (Turnkey InsurTech Solution)**, đồng thời phô diễn sự mượt mà cho khách mua lẻ.
- **Thời lượng mục tiêu**: Ngắn gọn, súc tích trong khoảng **45s – 60s (tối đa 75s)**. Không làm tutorial dài dòng mà tập trung đánh mạnh vào thị giác, quy mô đồ sộ và cỗ máy tự động hóa.

---

## 3. CHỈ ĐẠO NGHỆ THUẬT & PHONG CÁCH HÌNH ẢNH (ART DIRECTION)

- **Concept cốt lõi**: **3D Isometric Bento Grid & Dual-Layer Parallax (Đan xen 2 mặt Âm - Dương)**.
    - _Mặt trước (Web sáng)_: Thao tác người dùng 1-chạm cực kỳ tinh gọn.
    - _Mặt sau (CMS tối Dark Mode)_: Cỗ máy vận hành ngầm nhảy số doanh thu, tự động hóa xử lý hợp đồng.
- **Kỹ thuật xử lý hình ảnh**:
    - Không để nguyên ảnh chụp màn hình tĩnh đơn điệu.
    - **Cắt lát (Slice & Crop)** các phân mảnh UI tinh hoa: Khung quét AI OCR, Thẻ so sánh đối đầu 3 hãng, Thẻ Giấy chứng nhận điện tử QR code, Biểu đồ cột doanh thu 12 tháng, Cây hoa hồng đại lý KOL.
    - **Tạo nếp gấp không gian (Origami Fold / Accordion Transitions)**: Các thẻ UI gấp khúc, nghiêng 3D, bay lơ lửng (Floating Glass Cards) kết nối nhau bằng đường truyền dữ liệu neon phát sáng.
- **Chuẩn hình ảnh & Render**: 4K UHD (`3840 x 2160`) & 2K QHD (`2560 x 1440`) @ 60 FPS.

---

## 4. BỘ CÔNG NGHỆ SẢN XUẤT VIDEO (TECH STACK TỪ DỰ ÁN MẪU ĐÃ AUDIT)

Từ dự án chuẩn `/Users/phamminhtri/Desktop/project/wedding/project-video-sao-roi`:

- **Engine**: **Remotion (`v4.0.218`) + React 18 + TypeScript**.
- **Đồ họa 3D/Hiệu ứng**: **Three.js (`v0.186.0`)** kết hợp WebGL Custom Shaders & Canvas Sprites.
- **Cấu hình Render chuyên sâu (`remotion.config.ts`)**:
    - Codec: `H.264`, Pixel Format: `yuv420p`, CRF: `18` (Visually Lossless).
    - Tăng tốc phần cứng GPU: `Config.setChromiumOpenGlRenderer("angle")` (chống crash WebGL context).
    - Đa luồng an toàn: `Config.setConcurrency(4)`.
    - Audio: AAC Bitrate `320kbps`.
    - Quản lý tải Font: `@remotion/google-fonts` kết hợp `delayRender` / `continueRender` (loại bỏ 100% giật/lệch layout).
    - Quản lý bộ nhớ: Cơ chế giải phóng WebGL Context triệt để (`forceContextLoss`, `dispose`) tránh tràn RAM.

---

## 5. BẢN ĐỒ KHO TƯ LIỆU 4K UHD HIỆN CÓ

Tọa lạc tại thư mục: `/Users/phamminhtri/Desktop/train/crawl4ai/output/topbaohiem/`

### A. Phân Hệ Frontend (`trangchu/`)

- 51 URLs, 11 nhóm trang chức năng, chụp chuẩn 4K Viewport (3840x2160) & Fullpage:
    - `01_TrangChu_Hero_Branding`: Chứng nhận Bộ Công Thương, 3 trụ cột giá trị.
    - `02_BaoHiem_OTo_XeMay`: TNDS bắt buộc, công cụ tính phí vật chất xe ô tô.
    - `03_BaoHiem_SucKhoe_YTe`: Quyền lợi nội/ngoại trú, bản đồ bệnh viện bảo lãnh viện phí.
    - `04_BaoHiem_DuLich`: Quốc tế chuẩn visa Schengen/Mỹ & nội địa.
    - `05_BaoHiem_TaiSan_DoanhNghiep`: Cháy nổ NĐ 67/2023, hàng hóa (cargo).
    - `06_SoSanh_BaoGia_ThongMinh`: Ma trận so sánh trực diện Bảo Việt vs PVI vs PTI vs PJICO.
    - `07_QuyTrinh_DatMua_ThanhToan`: **AI OCR quét Cà vẹt xe 2s**, cổng VNPAY, cấp GCN điện tử.
    - `08_BoiThuong_CSKH_HoTro`: Nộp hồ sơ và theo dõi bồi thường online 100%.
    - `09_CongTacVien_KOL_DaiLy`: Cổng đăng ký CTV, chia sẻ link affiliate.
    - `10_QuanLy_HopDong_CaNhan`: Ví hợp đồng điện tử tra cứu mọi lúc.
    - `11_CamNang_PhapLy_ChinhSach`: Kho tri thức & điều khoản minh bạch.

### B. Phân Hệ Backend CMS (`cms/` & `cms_interactive/`)

- 95 Màn hình 4K UHD chụp sâu từng Menu, Button, Modal, Drawer theo `menuSections.tsx`:
    - `01_TrangChu`: Dashboard toàn cảnh **3840 x 3950 pixels**, 5 thẻ KPI tài chính, biểu đồ 12 tháng, biểu đồ cơ cấu gói.
    - `02_HopDong`: 8 trạng thái hợp đồng (Chờ thanh toán, Chờ duyệt, Chờ cấp GCN, Hoàn thành...), Modal chi tiết hợp đồng toàn diện, form tạo mới 9 dòng sản phẩm.
    - `03_QuanLyTaiKhoan`: Khách hàng, danh sách 75+ CTV KOLs, kết nối đối tác bảo hiểm, phân quyền Admin RBAC.
    - `04_ThuongHieu_KhuVuc_Goi`: Quản trị thương hiệu, biểu phí, phân vùng, cấu hình quyền lợi.
    - `05_ThongTinChung`: Phân loại nhóm xe cha/con, điều khoản bổ sung (thủy kích, mất cắp, gara).
    - `06_TinTuc_KhuyenMai`: Quản lý bài viết blog, banner, modal cấu hình voucher 4 bước.
    - `07_ThongKe` & `08_CaiDat`: Báo cáo tài chính chuyên sâu và thiết lập hệ thống.

---

## 6. KHUNG KỊCH BẢN ĐÃ THỐNG NHẤT (60 GIÂY - INVESTOR PITCH)

- **[00:00 - 00:08] HOOK**: Cơ hội InsurTech nghìn tỷ, xuất hiện logo 3D TopBaoHiem & InsureGO.
- **[00:08 - 00:25] TẦNG 1 (FRONTEND)**: Trải nghiệm người dùng 1-chạm (AI OCR quét Cà vẹt 2s -> Ma trận so sánh đa hãng -> Cấp chứng nhận điện tử QR code). Các component bay ra xếp lớp 3D lơ lửng.
- **[00:25 - 00:45] TẦNG 2 (CMS DEEP DIVE)**: Cú gập origami lật sang Dark Mode CMS. Doanh thu nhảy số thời gian thực, tự động hóa xử lý 130+ hợp đồng, thẩm định bồi thường online, định giá xe tự động.
- **[00:45 - 00:55] TẦNG 3 (SCALE ENGINE)**: Mạng lưới 75+ CTV Affiliate tự động chia hoa hồng, kết nối API các tập đoàn bảo hiểm lớn nhất.
- **[00:55 - 01:00] OUTRO**: Khẳng định giải pháp Chìa khóa trao tay (Turnkey Solution), kêu gọi đầu tư / sở hữu hệ thống.
