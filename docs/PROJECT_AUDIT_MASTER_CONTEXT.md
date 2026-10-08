# BÁO CÁO AUDIT TOÀN DIỆN DỰ ÁN SẢN XUẤT VIDEO 2K/4K QUẢNG CÁO HỆ THỐNG TOPBAOHIEM & INSUREGO CMS

**Mục tiêu tài liệu:** Đồng bộ 100% thông tin, quy tắc làm việc, kiến trúc kỹ thuật, kho tài nguyên 4K và định hướng kịch bản cho tất cả các Agent tham gia dự án.

---

## 1. QUY TẮC LÀM VIỆC & VẬN HÀNH DỰ ÁN CHO AGENT

### A. Quản Lý Mã Nguồn (Git Rules)
1. **Chỉ commit khi có yêu cầu**: Tuyệt đối không tự ý commit code trừ khi người dùng ra lệnh trực tiếp.
2. **Bảo vệ Staged Changes**: Tuyệt đối không đụng vào, không sửa đổi hay xóa các thay đổi đang nằm trong `staged changes` (người dùng đã staged có chủ đích).
3. **Thực thi commit tức thì**: Khi người dùng yêu cầu commit, thực hiện commit ngay lập tức, dứt khoát, không kiểm tra rườm rà.

### B. Nắm Bắt Task & Giữ Đúng Trọng Điểm (Laser Focus)
4. **Đúng vị trí & chỉ điểm**: Nắm bắt đúng task đang làm, vị trí file hoặc mô tả mà người dùng chỉ điểm để fix, tạo mới, hoặc refactor ngay tại chỗ được chỉ định.
5. **Tuyệt đối không làm lan man**: Không tự ý sửa ngoài phạm vi yêu cầu để tránh gây rối task, tránh xung đột code, tập trung giải quyết dứt điểm trọng điểm.

### C. Quy Trình Phối Hợp & Kiểm Thử Giao Diện (Workflow & Testing)
6. **Phân tích trước - Code nhanh sau**: Khi nhận task, tập trung trao đổi và phân tích logic cùng người dùng trước; sau khi phương án đã rõ ràng thì tập trung code nhanh nhất có thể.
7. **Không tự ý test UI**: Tuyệt đối không tự ý chạy test UI/preview tự động (browser subagent, devtools...) để tránh mất thời gian. **Chỉ khi nào người dùng có yêu cầu trực tiếp thì Agent mới được phép test UI**. Mặc định người dùng sẽ trực tiếp test UI trên màn hình thực tế và report lại chính xác điểm lỗi để Agent sửa ngay.
8. **Tinh thần cộng tác linh hoạt (Agile & Iterative)**: Kịch bản và visual trong Scene 1 (và các scene tiếp theo) đang trong quá trình vừa làm vừa tinh chỉnh, sáng tạo; Agent cần phối hợp nhịp nhàng, thích ứng nhanh với các thay đổi theo định hướng của người dùng.

---

## 2. MỤC TIÊU CHIẾN LƯỢC CỦA DỰ ÁN

- **Sản phẩm quảng cáo**: Hệ sinh thái InsurTech toàn diện gồm 2 thành tố:
    1. **Frontend (`https://topbaohiem.vn/`)**: Cổng bán bảo hiểm trực tuyến cho người dùng cuối (B2C).
    2. **Backend CMS (`https://cms.topbaohiem.vn/` - cms.topbaohiem)**: Hệ thống quản trị, điều hành, tự động hóa cấp đơn và mạng lưới đại lý (B2B/ERP).
- **Mục đích cốt lõi của video**: **BÁN TOÀN BỘ HỆ THỐNG BẢO HIỂM NÀY CHO NHÀ ĐẦU TƯ / DOANH NGHIỆP MUỐN SỞ HỮU NỀN TẢNG (Turnkey InsurTech Solution)**, đồng thời phô diễn sự mượt mà cho khách mua lẻ.
- **Thời lượng & Kịch bản**: **Không giới hạn thời gian (Open Duration)** để dồn toàn lực vào chất lượng visual, hiệu ứng thị giác và chiều sâu nội dung. Kịch bản linh hoạt biến đổi theo thực tế sáng tạo, việc cô đọng/cắt gọt thời lượng sẽ xử lý ở giai đoạn hoàn thiện sau cùng.

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

## 6. ĐỊNH HƯỚNG KỊCH BẢN & CHIẾN LƯỢC SẢN XUẤT NỘI DUNG (OPEN DURATION & EVOLVING SCRIPT)

> [!IMPORTANT]
> - **Bỏ giới hạn thời gian (No Time Limit)**: Tập trung hoàn toàn vào việc dựng nội dung visual đỉnh cao, hiệu ứng mượt mà và câu chuyện sản phẩm sắc bén. Thời gian dài hay ngắn không quan trọng ở giai đoạn này, sẽ tinh chỉnh sau.
> - **Kịch bản động (Evolving & Agile)**: Không có kịch bản nào là cố định 100%. Kịch bản thay đổi và nâng cấp liên tục tùy theo cảm hứng, thử nghiệm và đóng góp sáng tạo qua từng phiên làm việc.

- **Khung các phân cảnh tham khảo (Modular Scenes - Cập nhật linh hoạt theo thực tế)**:
    - **Scene 1 (Đang triển khai & hoàn thiện)**: Hook & Visual Opening, tương tác thiết bị (Macbook Standby Screen, bàn phím, chuyển cảnh màn hình, nhận diện thương hiệu).
    - **Các Scene tiếp theo (Dự kiến mở rộng)**:
        - Trải nghiệm Frontend 1-chạm (AI OCR quét Cà vẹt, ma trận so sánh đa hãng, cấp GCN điện tử QR code).
        - Khám phá cỗ máy CMS Dark Mode (Doanh thu nhảy số thời gian thực, tự động hóa duyệt đơn & bồi thường).
        - Scale Engine (Mạng lưới CTV Affiliate, API kết nối các hãng bảo hiểm lớn).
        - Outro / Kêu gọi đầu tư sở hữu nền tảng trọn gói (Turnkey InsurTech).
