# KẾ HOẠCH ĐẠO DIỄN & KIỂM TOÁN PHÂN CẢNH 3: TIỂU CẢNH BẢO HIỂM DU LỊCH (PAPER-CUT TRAVEL ADVENTURE)

> **Dự án:** Video Quảng Cáo Hệ Sinh Thái InsurTech TOPbaohiem & InsureGO CMS  
> **Phân cảnh:** Scene 3 · Tiểu Cảnh Bảo Hiểm Du Lịch (`Scene3_TravelAdventure.tsx`)  
> **Thời lượng kịch bản:** 20.0 giây (1.200 frames @ 60FPS)  
> **Nguồn tư liệu gốc:**  
> - Bức ảnh thiết kế hoàn chỉnh gốc: `public/assets/canva_v2/slide4_travel.png`  
> - Canva Master Storyboard: Design ID `DAHXeqlNPGA` (Trang 1: Kịch bản thuyết minh; Trang 4: Slide gốc; Trang 8: Bộ ảnh 3D Paper-Cut đồng bộ nhân vật)  
> - Canva Sub-project Cảnh 3 bóc tách: Design ID `DAHZE9aKYm8` ([Link Edit](https://www.canva.com/d/XFmoOFdSRQueILy))  
> **Trạng thái:** Đã thống nhất phương án dung hợp hoàn mỹ giữa Kịch bản chuyển động & Thiết kế Full gốc.

---

## I. NGUYÊN TẮC BẤT BIẾN KHI LÀM VIỆC VỚI DỰ ÁN & CANVA (USER MANDATE)

> [!IMPORTANT]
> ### 3 QUY TẮC SỐNG CÒN:
> 1. **TRUNG THỰC TUYỆT ĐỐI VỚI TOOL / CANVA AI (ZERO HALLUCINATION):**
>    - Tuyệt đối **CẤM bịa đặt** kết quả tương tác với tool, AI hay các chức năng trên Canva mà Agent không thật sự gọi trực tiếp được.
>    - Báo cáo minh bạch tình trạng tài nguyên và dữ liệu thực tế tại mọi thời điểm.
> 2. **LÊN KẾ HOẠCH & KIỂM TOÁN RÕ RÀNG TRƯỚC KHI CODE (PLAN FIRST, CODE LATER):**
>    - Thống nhất kịch bản chi tiết, timeline từng giây, cấu trúc kỹ thuật và sự xuất hiện của các asset trước khi bắt tay lập trình Remotion.
> 3. **TÔN VINH 100% THIẾT KẾ GỐC (PRESERVE ORIGINAL DESIGN INTEGRITY):**
>    - Tận dụng tối đa bức ảnh thiết kế hoàn chỉnh gốc `slide4_travel.png` làm điểm quy tụ tối thượng (Hero Climax & Destination Frame) của phân cảnh.

---

## II. Ý TƯỞNG ĐẠO DIỄN: DUNG HỢP KỊCH BẢN KỂ CHUYỆN VÀ THIẾT KẾ FULL CẢNH GỐC

### 1. Vấn đề cốt lõi & Giải pháp vàng:
* **Vấn đề đặt ra:**  
  Nếu chỉ dùng một bức ảnh tĩnh `slide4_travel.png` trong suốt 20 giây thì video sẽ bị tĩnh, thiếu sinh khí và không truyền tải được sự "bảo vệ kịp thời" của bảo hiểm du lịch.  
  Ngược lại, nếu bỏ ảnh gốc và chỉ dùng hoạt hình hoàn toàn mới thì sẽ làm mất đi công sức thiết kế chỉn chu ban đầu của Bạn và mất đi tính nhận diện thương hiệu đã được duyệt.
* **Giải pháp "Về Đích Hoàn Mỹ" (The Grand Convergence):**  
  - **70% thời lượng đầu (0s – 14s):** Kể câu chuyện du lịch đầy màu sắc, dễ thương và kịch tính nhẹ bằng phong cách Paper-Cut 3D (nhân vật nhất quán với ảnh bạn vừa tạo trên Canva).
  - **30% thời lượng cuối (14s – 20s):** Toàn bộ hoạt cảnh camera và các phần tử hội tụ mượt mà (Seamless Morph & Align) về **CHÍNH XÁC 100% BỐ CỤC ẢNH GỐC `slide4_travel.png`**.
  - Kết quả: Người xem vừa được trải nghiệm một hành trình sống động, vừa thấy được bức tranh thiết kế hoàn mỹ gốc với tấm khiên che chở và smartphone sẵn sàng bấm nút *"CHỌN GÓI"*.

---

## III. KỊCH BẢN CHI TIẾT 3 HỒI - 5 SHOT (TIMELINE 20.0s @ 60FPS)

```
0s                  6s                  12s                 16s                20s
|-------------------|-------------------|-------------------|-------------------|
[  HỒI 1: KHỞI HÀNH  ] [ HỒI 2: SỰ CỐ VUI ] [ HỒI 3: KHIÊN BẢO VỆ & VỀ ĐÍCH ẢNH GỐC ]
   Shot 3.1: Bước vào     Shot 3.2: Vali bung  Shot 3.4: Khiên hồng  Shot 3.5: Smartphone
                          Shot 3.3: Phao vịt   hạ cánh che chở       Chốt nút "CHỌN GÓI"
                                                                     (Khớp 100% Slide4)
```

### HỒI 1: KHỞI HÀNH HÁO HỨC (0.0s – 6.0s · Frame 0 – 360)
* **Shot 3.1: The Excited Departure**
  - **Bối cảnh:** Ốc đảo bãi biển bằng giấy xếp (Paper-Cut layered diorama). Nền trắng `#F8FAFC`, sóng biển xanh `#0EA5E9`, cát vàng pastel, mây trắng và hàng dừa 3D.
  - **Diễn xuất nhân vật:** Cặp đôi thanh niên hiện đại, thanh lịch (khớp 100% vóc dáng bạn đã tạo thành công): Bạn nữ kéo vali hồng, bạn nam đeo máy ảnh du lịch. Cả hai tươi cười bước vào trung tâm khung hình.
  - **Chuyển động Camera:** Camera pan nhẹ từ trái sang phải, zoom nhẹ 2.5D tạo chiều sâu các lớp giấy.
  - **Âm thanh & Hiệu ứng:** Tiếng sóng vỗ nhẹ, tiếng bánh xe vali lăn lách cách vui tai, nhạc nền upbeat tươi vui.

---

### HỒI 2: SỰ CỐ BẤT NGỜ DỄ THƯƠNG (6.0s – 12.0s · Frame 360 – 720)
* **Shot 3.2: The Suitcase Pop & Flying Hat (6.0s – 9.5s · Frame 360 – 570)**
  - **Diễn biến:** Đang đi vui vẻ, chiếc vali hồng nảy nhẹ qua một gờ cát và nắp vali bật mở (Spring physics nhẹ nhàng, hài hước).
  - **Chi tiết hoạt họa:** Một vài tấm vé máy bay, hộ chiếu và phụ kiện du lịch bằng giấy bay lơ lửng trong không trung. Một cơn gió biển nhấc chiếc mũ cói của bạn nữ bay bổng sang chụp đúng lên đầu bạn nam.
  - **Cảm xúc:** Hai nhân vật khựng lại nhìn nhau, ngạc nhiên rồi bật cười duyên dáng, không hề có cảm giác sợ hãi hay thảm họa, đúng tinh thần Gen Z du lịch tự do.
* **Shot 3.3: Rolling Paper Waves & Spinning Rubber Duck (9.5s – 12.0s · Frame 570 – 720)**
  - **Góc máy:** Camera hạ góc thấp (Low-angle), focus vào lớp sóng giấy dập dềnh ở mép biển.
  - **Điểm nhấn hài hước:** Chú phao vịt vàng (Rubber Duck) bị một đợt sóng nhỏ cuốn xoay tròn 360 độ rồi lắc lư tinh nghịch, tạo điểm nghỉ thị giác cực kỳ dễ thương.

---

### HỒI 3: QUY TỤ VỀ THIẾT KẾ GỐC & KẾT NỐI SẢN PHẨM (12.0s – 20.0s · Frame 720 – 1200)
* **Shot 3.4: Khiên hồng cứu tinh giáng thế (12.0s – 15.5s · Frame 720 – 930)**
  - **Diễn biến:** Giữa lúc hành lý còn bay bổng, biểu tượng Khiên bảo hiểm màu hồng thương hiệu `#E11D48` từ trên cao hạ xuống với hiệu ứng sóng âm bảo bọc (Soft Pulse Glow).
  - **Hiệu ứng thu hồi:** Một luồng năng lượng từ tính dịu êm thu hút toàn bộ vé máy bay và hành lý rơi ngay ngắn trở lại vào vali, nắp vali đóng "tách" an toàn.
  - **Biểu cảm:** Cặp đôi thở phào, mỉm cười an tâm tuyệt đối dưới vòm che chở của TOPbaohiem.
* **Shot 3.5: Quy tụ 100% Thiết kế gốc `slide4_travel.png` & Nút "CHỌN GÓI" (15.5s – 20.0s · Frame 930 – 1200)**
  - **Điểm quy tụ vĩ đại (Grand Convergence):**  
    Tại frame 960 (giây thứ 16.0), camera mở rộng góc (wide-out), tấm khiên hồng, cặp đôi và toàn bộ cảnh nền bãi biển đồng bộ vị trí chính xác với nửa bên trái của bức ảnh gốc `slide4_travel.png`.
  - **Bên phải khung hình xuất hiện:**  
    Chiếc Smartphone thanh lịch với giao diện gói bảo hiểm du lịch quốc tế, đi kèm mũi tên hồng neon uốn lượn chỉ thẳng vào nút **"CHỌN GÓI"**.
  - **Typography gốc xuất hiện:**  
    Dòng chữ tiêu đề thiết kế gốc: *"Sẵn sàng cho mọi hành trình"* hiện lên sắc nét.
  - **Chuyển giao sang Cảnh 4:**  
    Nút "CHỌN GÓI" nhấp nháy hiệu ứng Click nhẹ nhàng, màn hình điện thoại phóng lớn (Camera Push-in) đưa người xem thẳng vào giao diện trải nghiệm sản phẩm thực tế của Cảnh 4!

---

## IV. BẢN ĐỒ TÀI NGUYÊN (ASSET MAPPING & MANAGEMENT)

## IV. BẢN ĐỒ TÀI NGUYÊN THỰC TẾ (SCREEN 3 ASSET INVENTORY)

Toàn bộ tài nguyên phục vụ dựng sườn bố cục 3.1 đã được Bạn chuẩn bị và kiểm định đầy đủ trong thư mục `public/assets/elements/screen3/`:

| Tên File | Phân Loại & Đặc Điểm Mỹ Thuật | Vị Trí / Vai Trò Trong Bố Cục Shot 3.1 | Trạng Thái |
| :--- | :--- | :--- | :--- |
| `bg_chinh.png` / `bg_chinh_2.png` | Nền biển & trời Paper-Cut (16:9) | Lớp nền bao quát toàn bộ khung hình | **Sẵn sàng** |
| `couple.png` | Cặp đôi thanh lịch kéo vali hồng (Alpha PNG) | **Tâm điểm trung tâm (Hero)** | **Sẵn sàng** |
| `bat_thang_hong_left.png` | Bậc thang podium hồng bên trái + tán dừa | Sân khấu ốc đảo góc trái | **Sẵn sàng** |
| `bat_thang_hong_right.png` | Bậc thang podium hồng bên phải + cây xanh | Sân khấu ốc đảo góc phải | **Sẵn sàng** |
| `dun_cat_left.png` | Đụn cát trắng/vàng xếp lớp mép trái | Hậu cảnh cát tầng trái | **Sẵn sàng** |
| `dun_cat_right.png` | Đụn cát trắng/vàng xếp lớp mép phải | Hậu cảnh cát tầng phải | **Sẵn sàng** |
| `cay_dua_xanh.png` | Cây dừa giấy màu xanh ngọc | Tán dừa nhiệt đới góc trái | **Sẵn sàng** |
| `cay_dua_hong.png` | Cây dừa giấy màu hồng thương hiệu | Tán dừa điểm xuyết góc phải | **Sẵn sàng** |
| `ghe_xanh.png` | Ghế nghỉ bãi biển sọc trắng xanh | Tiền cảnh thư giãn bãi biển | **Sẵn sàng** |
| `vit.png` | Chú phao vịt vàng 3D siêu dễ thương | Mép sóng biển dập dềnh | **Sẵn sàng** |
| `tham_xanh.png` | Đĩa thảm tròn màu xanh pastel | Bục đế sân khấu trung tâm | **Sẵn sàng** |
| `mat_troi.png` | Mặt trời giấy Paper-Cut nhiều tia | Góc trên bên phải bầu trời | **Sẵn sàng** |
| `may_1.png`, `may_1_1.png` | Đám mây giấy vân màu nước | Tầng mây trôi bầu trời | **Sẵn sàng** |
| `may_2.png`, `may_3.png` | Đám mây giấy bồng bềnh | Tầng mây trôi bầu trời | **Sẵn sàng** |
| `chim_do.png` | Cánh chim giấy màu hồng/đỏ lượn sóng | Điểm nhấn chuyển động trên cao | **Sẵn sàng** |
| `slide4_travel.png` (trong `canva_v2`) | Thiết kế hoàn chỉnh gốc (Hero Landing) | Đích đến hội tụ ở Shot 3.5 | **Sẵn sàng** |

---

## V. NGUYÊN TẮC THI CÔNG SHOT 3.1: DỰNG SƯỜN TĨNH TRƯỚC - THÊM HOẠT ẢNH SAU

> [!IMPORTANT]
> **QUY TRÌNH CHUẨN ĐÃ THỐNG NHẤT VỚI BẠN:**
> 1. **Giai đoạn 1 (Sườn bố cục tĩnh - Static Staging Blueprint):**
>    - Dựng toàn bộ 18 layer vào đúng vị trí tọa độ $(X, Y)$, tỷ lệ $(Scale)$ và thứ tự lớp $(Z\text{-index})$ trên khung hình 1920x1080.
>    - Chưa cho chạy animation, giữ khung hình đứng yên như một bức tranh hoàn chỉnh để Bạn mở Remotion Preview trên trình duyệt ngắm và tinh chỉnh vị trí các chi tiết.
> 2. **Giai đoạn 2 (Diễn hoạt chuyển động - Motion Polishing):**
>    - Sau khi Bạn duyệt "OK chuẩn bố cục rồi", Agent mới thêm keyframe chuyển động:
>      + Hiệu ứng các layer trượt vào theo nhịp Staggered & Spring Physics.
>      + Hiệu ứng mây trôi Parallax, mặt trời xoay nhẹ, sóng dập dềnh.
>      + Hiệu ứng cặp đôi bước nhún chân (bobbing) vào trung tâm.

---

## VI. BIÊN BẢN BÀN GIAO SANG BOX CHAT MỚI (HANDOVER BRIEFING)

* **Nhánh Git:** `v2-canva`
* **Server Dev:** `bun run dev` đang chạy sẵn sàng trên port 3000.
* **Tài liệu kiểm toán:** [docs/audits/scene3/plan_scene3_travel_adventure.md](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/docs/audits/scene3/plan_scene3_travel_adventure.md)
* **Thư mục Assets:** `public/assets/elements/screen3/` (Đầy đủ 18 file PNG tách nền chất lượng cao).
* **Nhiệm vụ mở đầu của Box Chat mới:**
  - Tạo sườn bố cục tĩnh cho Shot 3.1 trong file `Scene3_TravelAdventure.tsx` (chưa viết animation chuyển động).
  - Khớp nối vào `Root.tsx` để hiển thị trên Remotion Player cho Bạn duyệt thị giác trực tiếp.
