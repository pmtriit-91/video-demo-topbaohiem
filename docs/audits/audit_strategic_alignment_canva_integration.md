# BÁO CÁO AUDIT CHIẾN LƯỢC: CHUYỂN DỊCH PHONG CÁCH 2, TÍCH HỢP CANVA MCP & KIẾN TRÚC MẢNH GHÉP MODULAR

> **Mục tiêu tài liệu:** Đồng bộ hóa 100% quyết định chiến lược, quy tắc làm việc, kiến trúc kỹ thuật và phương pháp thiết kế đồ họa giữa Người dùng (Art Director / System Architect) và Agent. Tài liệu này là kim chỉ nam tối thượng cho nhánh phát triển `v2-canva`.

---

## 1. TỔNG QUAN CHIẾN LƯỢC: ĐÓNG BĂNG PHONG CÁCH 1 & DỒN LỰC CHO PHONG CÁCH 2

Sau quá trình đánh giá thực tế và định hướng từ Người dùng:
* **Đóng băng Phong cách 1 (Photomontage người thật):** Nhánh cũ đã được bảo toàn an toàn trên branch `main` và lưu trữ tại [`archive/v1/`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/archive/v1/). Không tiếp tục phát triển trên nhánh này.
* **Tập trung 100% công lực vào Phong cách 2 (Branch `v2-canva`):**
  * Lý do: Phong cách 2 sở hữu kịch bản thương mại hóm hỉnh, trẻ trung, có tính đồng bộ hình ảnh cao qua nhân vật 2.5D áo hồng, kết hợp các tiểu cảnh đời thường vui nhộn và giao diện thật được tổ chức bài bản trên Canva Storyboard.
  * Hiện trạng: Đã làm sạch toàn bộ `src/`, khởi tạo khung sườn chuẩn 6 Cảnh và commit thành công lên `v2-canva` (Commit `d1ba63b`).

---

## 2. QUY TẮC BẤT BIẾN KHI LÀM VIỆC VỚI NGƯỜI DÙNG

Bất kỳ Agent nào tham gia dự án **bắt buộc phải nghiêm túc thực thi 4 quy tắc sau**:

1. **Quản lý Git dứt khoát:**
   * Tuyệt đối **KHÔNG tự ý commit code** trừ khi người dùng ra lệnh trực tiếp.
   * **Bảo vệ Staged Changes:** Tuyệt đối không đụng vào, không sửa đổi hay xóa các thay đổi mà người dùng đã staged có chủ đích.
   * Khi người dùng yêu cầu commit: Thực hiện commit và push (`git push`) ngay lập tức, dứt khoát, không kiểm tra rườm rà.
2. **Laser Focus (Đúng vị trí & trọng điểm):**
   * Nắm bắt đúng task đang làm, đúng file và vị trí người dùng chỉ điểm.
   * Tuyệt đối không sửa lan man ngoài phạm vi yêu cầu để tránh xung đột code.
3. **Quy trình Phối hợp & Nghiệm thu UI:**
   * **Phân tích trước - Code nhanh sau:** Trao đổi logic và chốt giải pháp với người dùng trước; khi phương án đã rõ thì tập trung code nhanh dứt điểm.
   * **Tuyệt đối KHÔNG tự ý test UI tự động ngầm:** Không tự ý chạy browser subagent / devtools ngầm gây hao tốn tài nguyên và mất thời gian. Người dùng sẽ trực tiếp kiểm thử trên màn hình Remotion preview thực tế (`bun run dev`) và report lại điểm lỗi để Agent sửa ngay tại chỗ.
4. **Tư duy Kịch bản Linh hoạt (Agile & Open Duration):**
   * Kịch bản trên Canva hiện tại ở mức sơ khai, vừa làm sẽ vừa mở rộng thêm các màn mới cho đầy đủ.
   * Không giới hạn thời lượng cứng nhắc, ưu tiên tối đa cho chất lượng visual 4K/2K 60fps đỉnh cao.

---

## 3. TÍCH HỢP CANVA MCP & NĂNG LỰC CÔNG CỤ AI CANVA PHỤC VỤ SẢN XUẤT ĐỒ HỌA

Hệ thống đã tích hợp hoàn hảo **Canva MCP Server** trực tiếp trên môi trường Antigravity với trọn bộ **49 công cụ MCP**.

### A. Thông tin Kết nối Thiết kế Trọng tâm
* **Tên thiết kế:** `Video Quảng Cáo Phần Mềm Bảo Hiểm`
* **Design ID:** `DAHXeqlNPGA`
* **Canva URL:** `https://www.canva.com/design/DAHXeqlNPGA/4hh79_81cA6xguxMXJwfkQ/edit`
* **Cấu trúc:** 7 trang (Trang 1: Thuyết minh kịch bản chi tiết; Trang 2–7: 6 Slide Storyboard trực quan).

### B. Chi tiết Các Bộ Công Cụ Canva MCP Khả Dụng Cho Agent

| Nhóm Công Cụ | Các Công Cụ Canva MCP Cụ Thể | Năng Lực & Ứng Dụng Thực Tế Cho Dự Án |
| :--- | :--- | :--- |
| **Bóc tách & Tách lớp AI** | `remove-background`<br>`separate-image-layers`<br>`get-separate-image-layers-job` | **Cực kỳ mạnh mẽ:**<br>• `remove-background`: Tách nền tự động bằng AI của Canva (Magic Eraser / Cutout), xuất chủ thể/đạo cụ có kênh Alpha trong suốt.<br>• `separate-image-layers`: Tách một ảnh phẳng thành các layer riêng biệt (tách riêng nhân vật, background, text, sticker, từng mảnh ghép). |
| **Sáng tạo Đồ họa bằng AI** | `generate-image`<br>`get-generate-image-job`<br>`generate-design`<br>`create-design` | **Sinh tài nguyên mới:**<br>• `generate-image`: Tạo nhân vật, bối cảnh, đạo cụ tiểu cảnh mới bằng AI của Canva từ câu lệnh prompt dạng text.<br>• `generate-design`: Tự động tạo bản thiết kế hoặc bố cục mới theo yêu cầu. |
| **Xuất & Đồng bộ Asset Chất lượng Cao** | `export-design`<br>`get-export-formats`<br>`get-assets`<br>`get-design-pages`<br>`get-design-content` | **Xuất tài nguyên Pro:**<br>• `export-design`: Xuất thiết kế hoặc từng trang theo chuẩn Pro (`export_quality: "pro"`, `lossless: true`, `transparent_background: true`) định dạng PNG trong suốt, JPG, PDF, MP4 trực tiếp vào thư mục `public/assets/canva_v2/` và `public/assets/v2/props/`.<br>• `get-design-content` & `get-design-pages`: Trích xuất toàn bộ kịch bản, text, thumbnail 6 slide. |
| **Chỉnh sửa Canvas Trực tiếp** | `start-editing-transaction`<br>`perform-editing-operations`<br>`commit-editing-transaction`<br>`cancel-editing-transaction` | **Can thiệp trực tiếp vào Canva:**<br>• Cho phép Agent thêm text, chèn shape, thay đổi layout và tọa độ trực tiếp trên bản vẽ Canva của Người dùng. |
| **Quản lý & Chuyển đổi Thiết kế** | `resize-design`<br>`merge-designs`<br>`copy-design`<br>`autofill-design` | **Tối ưu layout:** Đổi kích thước khung hình, nhân bản hoặc gộp nhiều thiết kế lại với nhau. |

### C. Mô Hình Phối Hợp Tác Quyền (Workflow Synergy)
* **Người dùng (Art Director):** Trực tiếp tương tác trên giao diện Canva web ("Hỏi Canva / Magic Studio") để prompt kịch bản, lên ý tưởng tạo hình, dàn layout tổng thể và duyệt thẩm mỹ.
* **Agent (Motion Engineer & Asset Integrator):** Sử dụng bộ Canva MCP API để đọc dữ liệu, gọi các công cụ AI đồ họa (tách nền, tách layer, xuất PNG trong suốt, tạo ảnh), kéo asset về repo và lập trình chuyển động 60fps mượt mà trên Remotion.

---

## 4. TRIẾT LÝ KIẾN TRÚC CỐT LÕI: HỆ THỐNG MẢNH GHÉP TÁCH LỚP (PAPER-CUT PUZZLE SYSTEM)

> [!IMPORTANT]
> **NGUYÊN TẮC VÀNG:** Tuyệt đối **KHÔNG** sử dụng ảnh chụp màn hình tĩnh nguyên khối (monolithic flat image) để làm nền đơn điệu.
> **TẤT CẢ mọi thành phần thị giác (nhân vật, cánh tay, thẻ bảo hiểm, thiết bị, icon, khiên, mây, nút bấm...) ĐỀU PHẢI LÀ CÁC MẢNH GHÉP ĐỘC LẬP (như cắt giấy thủ công, như các mảnh ghép xếp hình jigsaw)** để có thể tháo rời và điều khiển chuyển động tự do.

Từ yêu cầu cụ thể này, hệ thống quy hoạch 4 bài toán lớn mang tính kiến trúc:

### A. Bài toán 1: Pipeline Bóc tách Tài nguyên Độc lập (Asset Decomposition)
* Mọi đối tượng trong từng Cảnh phải được tách thành từng file riêng có kênh trong suốt (Alpha Channel PNG / SVG / CSS Component):
  * **Cánh tay & Nhân vật:** Bàn tay búng tay, nhân vật phân vân, cặp đôi kéo vali...
  * **Mockup Thiết bị:** Vỏ khung MacBook riêng, vỏ khung iPhone riêng, lớp hiển thị màn hình riêng biệt (để có thể cuộn trang, zoom-in, rê chuột độc lập).
  * **Cụm thẻ sản phẩm:** Thẻ Sức khỏe, Thẻ Du lịch, Thẻ Cháy nổ, Thẻ Xe máy, Thẻ Ô tô.
  * **Đạo cụ (Props) & Phụ kiện:** Chiếc khiên bảo vệ 3D, ngôi sao Eureka, ô tô hồng, vali, phao vịt, sóng giấy, các đám mây...
* Tận dụng Canva MCP (`separate-image-layers`, `remove-background`, `export-design`) để bóc tách tài nguyên trực tiếp từ Canva về thư mục chuẩn: `public/assets/v2/props/`.

### B. Bài toán 2: Tính Liên tục & Biến hình Xuyên Cảnh (Cross-Scene Morphing & Continuity)
Mỗi mảnh ghép ở phân cảnh trước đóng vai trò là "hạt mầm" mở ra thế giới của phân cảnh sau:
* **Từ Cảnh 1 sang Cảnh 2:** Bàn tay búng tay *Snap!* $\rightarrow$ Sóng hồng lan tỏa $\rightarrow$ Cụm 4 thẻ bài giấy bung xòe ra $\rightarrow$ Từng thẻ bay vào cắm đúng vị trí trên màn hình MacBook.
* **Từ Cảnh 2 sang Cảnh 3 (Tiểu cảnh Du lịch):** Thẻ "Bảo hiểm Du lịch" trên MacBook sáng lên $\rightarrow$ **Phóng to bay ra khỏi màn hình** $\rightarrow$ Mở rộng thành tiểu cảnh bờ biển, cặp đôi kéo vali, phao vịt xoay tròn $\rightarrow$ Hết cảnh lại **thu nhỏ gấp lại nhét ngược vào đúng vị trí thẻ trên web**.
* **Từ Cảnh 2 sang Cảnh 5 (CMS Dashboard):** Toàn bộ giao diện MacBook **lật 180 độ (3D Space Fold / Card Flip)** như lật mặt sau của một tấm thiệp dày $\rightarrow$ Lộ ra cỗ máy CMS Dark Mode quản trị phía sau.

### C. Bài toán 3: Ngôn ngữ Thị giác & Vật lý Paper-Cut (Paper Craft Motion Design)
* **Độ dày của giấy (Paper Depth):** Sử dụng hệ thống đổ bóng đa tầng (`box-shadow` / `drop-shadow`): Lớp gần tạo viền sắc, lớp xa tạo độ lan tỏa mềm, mô phỏng chân thực các lớp giấy bìa xốp đè lên nhau.
* **Chuyển động có hồn (Stop-Motion feel):** Góc nghiêng organic ($-3^\circ$ đến $+4^\circ$), độ rung nhẹ tự nhiên (paper wiggle), và độ nảy lò xo (spring physics) khi các mảnh ghép xuất hiện hoặc tiếp đất.

### D. Bài toán 4: Kiến trúc Code Component hóa (Tránh Lỗi Cục Bộ Dây Chuyền)
* Tuyệt đối không viết code dồn cục vào 1 file lớn.
* Xây dựng các Lego Component độc lập, tái sử dụng cao:
  * `<PaperCard />`: Thẻ giấy có thể truyền vào icon, text, badge, độ nghiêng tùy biến.
  * `<HardwareDevice />`: MacBook / iPhone cho phép trượt màn hình, đổi nội dung linh hoạt mà không vỡ khung máy.
  * `<FloatingProp />`: Đạo cụ lơ lửng (khiên, mây, ngôi sao, bàn tay).
* **Hiệu quả:** Khi người dùng muốn đổi vị trí iPhone, đổi thứ tự xuất hiện thẻ xe, thêm tình tiết mới... Agent chỉ việc điều chỉnh tham số props trong vài dòng code mà không gây lỗi dây chuyền.

---

## 5. BẢNG KHỚP NỐI 6 PHÂN CẢNH V2 THEO STORYBOARD CANVA

| Phân Cảnh | Thời Lượng | Vai Trò Nội Dung | Các Mảnh Ghép Trọng Tâm |
| :--- | :--- | :--- | :--- |
| **Cảnh 1: Băn khoăn $\rightarrow$ Búng tay Snap!** | `0:00 - 0:14`<br>*(840 frames)* | Nỗi đau ma trận bảo hiểm truyền thống $\rightarrow$ Khoảnh khắc Eureka bừng sáng | Nhân vật hoạt hình 2.5D, 3 thẻ câu hỏi giấy xé trượt vào lệch nhịp, ngôi sao ý tưởng vàng, cú búng tay Snap sóng hồng. |
| **Cảnh 2: Trình diễn TOPbaohiem** | `0:14 - 0:43`<br>*(1740 frames)* | Xuất hiện nền tảng bán bảo hiểm trực quan trên đa thiết bị | Cánh tay búng tay, MacBook 3D, iPhone, cụm 5 thẻ bảo hiểm chủ lực, chiếc khiên 3D, 3 badge trụ cột giá trị. |
| **Cảnh 3: Tiểu cảnh Du lịch Paper-Cut** | `0:43 - 1:03`<br>*(1200 frames)* | Câu chuyện bảo hiểm du lịch gần gũi, hài hước | Cặp đôi kéo vali, vé máy bay giấy bay, mũ bay lệch, phao vịt xoay tròn, sóng biển giấy $\rightarrow$ Khung bảo vệ thu nhỏ về web. |
| **Cảnh 4: Các nhóm sản phẩm khác** | `1:03 - 1:39`<br>*(2160 frames)* | Đa dạng sản phẩm bảo hiểm thiết thực | Ô tô giấy stop-motion vẫy tay, cân hình trái tim sức khỏe, ngôi nhà pop-up mở ra $\rightarrow$ Thu gọn về thẻ web. |
| **Cảnh 5: Hành trình 1-chạm & CMS** | `1:39 - 2:25`<br>*(2760 frames)* | Quy trình mua 4 bước $\rightarrow$ Lật mặt sau sang cỗ máy CMS | Con trỏ click 4 bước (Chọn $\rightarrow$ Đọc $\rightarrow$ Nhập $\rightarrow$ Xác nhận) $\rightarrow$ Cú lật 3D sang CMS Dashboard Dark Mode (KPI, hợp đồng, KOLs). |
| **Cảnh 6: Hệ sinh thái & CTA** | `2:25 - 2:50`<br>*(1500 frames)* | Khẳng định giải pháp toàn diện $\rightarrow$ Kêu gọi hành động | Nhân vật tự tin cầm điện thoại, hệ sinh thái đa màn hình, Logo TOPbaohiem, Slogan "Rõ ràng hơn. Thuận tiện hơn." & Nút CTA. |

---

## 6. THIẾT LẬP KỸ THUẬT & TRẠNG THÁI HIỆN TẠI

* **Mã nguồn nhánh:** `v2-canva` (Commit `d1ba63b`).
* **Kho Asset Canva:** Đã tải trọn bộ 6 slide chất lượng cao tại [`public/assets/canva_v2/`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/canva_v2/).
* **File Cấu hình V2:** [`src/config/videoConfigV2.ts`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/config/videoConfigV2.ts) (Định nghĩa màu sắc chuẩn và 6 mốc timeline).
* **Bộ Component V2:** Thư mục [`src/components/scenes/v2/`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/components/scenes/v2/) gồm đầy đủ 6 Scene con.
* **Master Composition:** [`src/MainVideoV2.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/MainVideoV2.tsx) và [`src/Root.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/Root.tsx) (đã sửa toàn bộ ID hợp lệ theo chuẩn Remotion: `TopBaoHiemV2-4K`, `TopBaoHiemV2-2K`, `TopBaoHiemV2-1080p`, `Scene1-ProblemSnap`...).
* **Kiểm định Build:** `tsc --noEmit` đạt 0 lỗi, terminal `bun run dev` hoạt động ổn định.

---

## 7. HƯỚNG ĐI TIẾP THEO

* Bắt đầu bóc tách và chuẩn bị kho tài nguyên mảnh ghép (Props) cho từng cảnh bằng Canva MCP.
* Xây dựng các Lego Component (`PaperCard`, `HardwareDevice`, `FloatingProp`) để lắp ghép và diễn hoạt mượt mà từ Cảnh 1 và Cảnh 2.
* Tiến hành từng bước nhỏ, nhận phản hồi trực tiếp từ người dùng sau mỗi lần cập nhật.
