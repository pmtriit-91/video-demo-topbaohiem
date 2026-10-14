# BÁO CÁO AUDIT TOÀN DIỆN DỰ ÁN SẢN XUẤT VIDEO 2K/4K QUẢNG CÁO HỆ THỐNG TOPBAOHIEM & INSUREGO CMS

**Mục tiêu tài liệu:** Đồng bộ 100% thông tin, quy tắc làm việc, kiến trúc kỹ thuật, kho tài nguyên 4K và định hướng kịch bản cho tất cả các Agent tham gia dự án.

---

## 1. QUY TẮC LÀM VIỆC & VẬN HÀNH DỰ ÁN CHO AGENT

### A. Quản Lý Mã Nguồn (Git Rules)
1. **Chỉ commit khi có yêu cầu**: Tuyệt đối không tự ý commit code trừ khi người dùng ra lệnh trực tiếp.
2. **Bảo vệ Staged Changes**: Tuyệt đối không đụng vào, không sửa đổi hay xóa các thay đổi đang nằm trong `staged changes` (người dùng đã staged có chủ đích).
3. **Thực thi commit & push tức thì**: Khi người dùng yêu cầu commit, thực hiện commit và push (`git push`) ngay lập tức, dứt khoát, không kiểm tra rườm rà.

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

## 3. CHỈ ĐẠO NGHỆ THUẬT & ĐỊNH HƯỚNG ĐỒ HỌA 3D CHUYÊN SÂU (ART & 3D CINEMATOGRAPHY DIRECTION)

> [!IMPORTANT]
> ### TRIẾT LÝ CỐT LÕI: VIDEO ĐỒ HỌA 3D THỰC THỤ — TUYỆT ĐỐI KHÔNG LÀM SLIDE CHUYỂN CẢNH 2D
> - **Không phải video slide thuyết trình**: Tuyệt đối không dùng các hiệu ứng CSS 2D phẳng, fade/slide đơn điệu, hay các khối hộp giao diện cắt dán tĩnh.
> - **Đồ họa 3D & Chiều sâu không gian thực (True 3D Spatial Depth)**: Mọi thành phần UI, thẻ chức năng, thiết bị đều phải tham gia vào không gian 3 chiều (`perspective`, `transformStyle: 'preserve-3d'`, tọa độ trục Z thực thụ `translateZ`).
> - **Góc quay & Kỹ thuật điện ảnh chuyên nghiệp (Cinematography Camera Rig)**: Sử dụng các góc máy Pitch (chúc/ngửa), Yaw (xoay phối cảnh 3/4), Roll (nghiêng chân trời), và Camera Pan Tracking bám sát chuyển động của con trỏ chuột (`cursor-flyover`).
> - **Vật lý có trọng lượng (Physical Weight & Impact)**: Mọi chuyển động rơi, đáp, bấm đều phải có xung lực vật lý (`stackPress`), chấn động đàn hồi (`impact recoil & settle`), và bóng đổ động theo khoảng cách thực (Contact Shadow & Ambient Depth Shadow).
> - **Đẳng cấp hoàn thiện chuẩn Apple Keynote / Linear**: Đưa người xem vào trải nghiệm "mổ xẻ cấu trúc công nghệ" sinh động, sang trọng, đẳng cấp quốc tế.

- **Concept nghệ thuật chủ đạo**: **3D Isometric Bento Grid & Dual-Layer Parallax (Đan xen 2 mặt Âm - Dương)** kết hợp **3D Exploded-View Architecture**.
    - _Mặt trước (Web sáng)_: Thao tác người dùng 1-chạm cực kỳ tinh gọn, trực quan, tin cậy.
    - _Mặt sau (CMS tối Dark Mode)_: Cỗ máy vận hành ngầm nhảy số doanh thu, tự động hóa xử lý hợp đồng, phân quyền đại lý.
- **Kỹ thuật xử lý giao diện & Phối cảnh**:
    - **Cắt lát (Slice & Crop) & Tách lớp 3D (Exploded View)**: Tách các phân mảnh UI tinh hoa (Khung quét AI OCR, Thẻ so sánh 15+ hãng, Giấy chứng nhận điện tử QR code, Biểu đồ doanh thu 12 tháng, Cây hoa hồng đại lý KOL...) thành các khối độc lập bay lơ lửng trên không trung dọc theo trục Z.
    - **Tạo nếp gấp không gian (Origami Fold / Accordion Transitions)**: Các thẻ UI gấp khúc, nghiêng phối cảnh 3D, kết nối nhau bằng đường truyền dữ liệu neon phát sáng và vệt quét sáng quang học (`Glaze Sheen`).
    - **Chuyển cảnh tốc độ cao (Hyperdrive Warp Speed Tunnel)**: Hội tụ năng lượng và phóng xuyên không gian 3D đưa người xem đi từ tổng quan vào chi tiết từng tính năng cốt lõi.
- **Chuẩn hình ảnh & Render**: 4K UHD (`3840 x 2160`) & 2K QHD (`2560 x 1440`) @ 60 FPS (Chuẩn khung hình điện ảnh siêu mượt).

---

## 4. BỘ CÔNG NGHỆ SẢN XUẤT VIDEO (TECH STACK & CINEMATIC TOOLKIT BẮT BUỘC)

Hệ thống kết hợp sức mạnh giữa **Remotion Engine**, **Đồ họa WebGL 3D thực thụ từ Three.js**, và **Kho tàng công nghệ quay phim điện ảnh từ repo `video-shotcraft`**:

### A. Core Engine & Render Pipeline
- **Engine**: **Remotion (`v4.0.218`) + React 18 + TypeScript**.
- **Tính tất định tuyệt đối (Deterministic Rendering - Chuẩn Quy tắc #9 video-shotcraft)**:
    - Cấm dùng `Math.random()` và `Date.now()`.
    - Mọi chuyển động hạt, tia sáng và độ trôi đều dùng thuật toán giả ngẫu nhiên có seed cố định (`mulberry32`), đảm bảo render từng frame độc lập, đa luồng 100% khớp nhau, không bao giờ bị rung lắc hay sai lệch frame.
- **Cấu hình Render chuyên sâu (`remotion.config.ts`)**:
    - Codec: `H.264`, Pixel Format: `yuv420p`, CRF: `18` (Visually Lossless).
    - Tăng tốc phần cứng GPU: `Config.setChromiumOpenGlRenderer("angle")` (chống crash WebGL context).
    - Đa luồng an toàn: `Config.setConcurrency(4)`.
    - Quản lý tải Font: `@remotion/google-fonts` (`delayRender` / `continueRender`).

### B. Nền Tảng Đồ Họa 3D WebGL: Three.js (`v0.186.0`)
- **WebGL Canvas trực tiếp trong Video**: Tích hợp trực tiếp các Scene, PerspectiveCamera, Points, LineSegments vào vòng đời render của Remotion (deterministic render theo `frame`).
- **Ambient 3D Floating Bokeh**: Ma trận hàng ngàn hạt 3D bồng bềnh trong không gian có chiều sâu Z thực (`THREE.Points`, gradient canvas texture mềm, additive blending).
- **Hyperdrive Warp Speed Tunnel**: Hệ thống hàng trăm tia sáng xuyên tâm gia tốc cao (`THREE.LineSegments`) và Camera phi thuyền lao vút theo trục Z (`speed = warpProgress^2.2 * 240`), tạo cảm giác bẻ cong không gian khi chuyển cảnh.
- **Quản lý bộ nhớ WebGL nghiêm ngặt**: Giải phóng triệt để tài nguyên khi component unmount (`forceContextLoss`, `geometry.dispose()`, `material.dispose()`, `texture.dispose()`) chống tràn RAM/VRAM.

### C. Kỹ Thuật Quay Phim Điện Ảnh Từ Repository `video-shotcraft`
Được khai thác trực tiếp từ kho tàng công nghệ cục bộ: `/Users/phamminhtri/.gemini/config/skills/video-shotcraft/`

1. **Hệ Thống Camera Rig 3D (`space-camera-moves`, `PageCam`)**:
   - Khung phối cảnh 3D chuyên sâu: `perspective` từ `1800` đến `2600`, `perspectiveOrigin: 50% 50%`.
   - Điều khiển góc máy 3 trục liên tục:
     * **Pitch (rotateX)**: Nghiêng từ `0°` (trực diện) đến `10.5° - 16°` (chúc xuống để lộ chiều sâu tách lớp).
     * **Yaw (rotateY)**: Xoay phối cảnh 3/4 từ `-6.0°` đến `-10°` (tạo độ xa - gần điện ảnh).
     * **Roll (rotateZ)**: Nghiêng chân trời tinh tế `-0.6°` đến `1.5°` tạo nhịp chuyển động sống động.
   - **Camera Pan Tracking (`cursor-flyover`)**: Camera Rig tịnh tiến theo thời gian thực (`camTargetX`, `camTargetY`) bám theo trọng tâm chú ý của con trỏ chuột.

2. **Kỹ Thuật Xếp Chồng Vật Lý 3D (`list-stack-press`)**:
   - Thẻ bay từ không trung rơi đập vào vị trí với cao độ trục Z thực (`translateZ(120px) → 0`) kèm gia tốc đàn hồi `FLY_EASE = bezier(0.35, 0.05, 0.22, 1.15)`.
   - **Xung lực nén lún (Stack-Press)**: Khi mỗi thẻ mới tiếp đất, khay đỡ và toàn bộ các thẻ đã cố định trước đó bị nén lún xuống (`5px - 6px`) rồi nảy hồi đàn hồi (mang lại cảm giác vật lý đầm chắc, có khối lượng thật).
   - **Vệt sáng Glaze Sheen**: Quét chéo góc 14° - 22° dọc theo bề mặt thẻ sau khi chuỗi thẻ đã hoàn thành tiếp đất.

3. **Kỹ Thuật Mổ Xẻ Không Gian (`exploded-view`)**:
   - Bóc tách các thành phần giao diện theo trục Z (`translateZ: 50px - 150px`), kết hợp góc quay 3/4 để người xem quan sát cấu trúc đa tầng của hệ thống.
   - **Đổ bóng đa lớp (Dynamic Elevation Shadows)**: Bóng tiếp xúc (Contact shadow) + bóng môi trường (Ambient shadow) thay đổi kích thước và độ mờ theo cao độ `translateZ`.
   - **Tương tác nhấc lớp (Hover Elevation)**: Khi con trỏ chuột rà qua phân đoạn nào, phân đoạn đó tự động nhấc bổng trục Z (`+55px`) và tỏa sáng viền.

4. **Kỹ Thuật Tác Động Va Chạm & Lún Nút (Impact Settle & Click Bounce)**:
   - Khi có hành động click/bấm chuột: Nút nén lún (scale `0.93`), Camera Rig giật rung phản lực theo hàm suy giảm `8 * Math.exp(-t / 3) * Math.cos(t * 0.9)`, kích hoạt sóng xung kích ánh sáng (Pulse Ripple).

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
    - **Tài liệu chiến lược & Lộ trình 2 phong cách**: [Audit Chiến Lược & Tích Hợp Canva MCP](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/docs/audits/audit_strategic_alignment_canva_integration.md) (Quyết định dồn lực hoàn thiện Phong cách 1 trước khi mở rộng Phong cách 2).
    - **Scene 0 (Đã hoàn thiện & kiểm định)**: [Problem Hook - Khơi dậy nỗi đau bảo hiểm truyền thống](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/docs/audits/scene0/audit_scene0_problem_hook.md) (4 đám mây suy nghĩ Comic Pop-Art, 4 sticker động, nhân vật trung tâm bối rối).
    - **Scene 1 (Đang triển khai & hoàn thiện)**: [Interactive Product Showcase](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/docs/audits/scene1/plan_scene1_interactive_showcase.md) (Mở nắp MacBook 3D, thức tỉnh màn hình Retina, iPhone đồng bộ, tương tác rê chuột nhóm bảo hiểm chủ lực).
    - **Các Scene tiếp theo (Dự kiến mở rộng)**:
        - Trải nghiệm Frontend 1-chạm (AI OCR quét Cà vẹt, ma trận so sánh đa hãng, cấp GCN điện tử QR code).
        - Khám phá cỗ máy CMS Dark Mode (Doanh thu nhảy số thời gian thực, tự động hóa duyệt đơn & bồi thường).
        - Scale Engine (Mạng lưới CTV Affiliate, API kết nối các hãng bảo hiểm lớn).
        - Outro / Kêu gọi đầu tư sở hữu nền tảng trọn gói (Turnkey InsurTech).
