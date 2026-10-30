# BÁO CÁO AUDIT CHUYÊN SÂU: NÂNG CẤP VIDEO-SHOTCRAFT (MODEL 4 ARGON), TỐI ƯU NHỊP CẢNH 3 (12S + 2S) & KỊCH BẢN NỐI TIẾP LIÊN HOÀN ĐA NHÓM BẢO HIỂM

> **Dự án:** Video Quảng Cáo Hệ Sinh Thái InsurTech TOPbaohiem & InsureGO CMS (Remotion 4K/2K @ 60FPS)  
> **Branch Git:** `v2-canva` · **Commit nền tảng mới nhất:** `7364971` *(Model 4 Argon)*  
> **File trọng tâm:**  
> - [`src/components/scenes/v2/Scene3_TravelAdventure.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/components/scenes/v2/Scene3_TravelAdventure.tsx)  
> - [`src/components/scenes/v2/Scene4_InsuranceCategories.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/components/scenes/v2/Scene4_InsuranceCategories.tsx)  
> - [`src/config/videoConfigV2.ts`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/config/videoConfigV2.ts)  
> **Ngày cập nhật:** 30/10/2026 · **Phụ trách kỹ thuật & Audit:** Model 4 Argon  

---

## I. TỔNG KẾT NỀN TẢNG KỸ THUẬT `VIDEO-SHOTCRAFT` ĐÃ TRIỂN KHAI (COMMIT `7364971`)

Toàn bộ Phân cảnh 3 ([`Scene3_TravelAdventure.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/components/scenes/v2/Scene3_TravelAdventure.tsx)) đã được nâng cấp lên kiến trúc **5 Hồi Camera 3D & Chuyển Cảnh Hạng Nặng** từ bộ mẫu [`video-shotcraft`](file:///Users/phamminhtri/Desktop/project/video-shotcraft), đồng thời **bảo toàn 100.00% tọa độ tĩnh** (`STAGING_SHOT_3_1`, `STAGING_SHOT_3_4`, `BASE_OFFSETS`, `StaticStaging34`):

| Hồi | Kỹ thuật gốc (`video-shotcraft`) | Cơ chế Toán học & Thị giác đã lập trình | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Hồi 1: Mở màn 3.1** | [`TiltReveal.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/TiltReveal.tsx) + [`DroneDiveLanding.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/DroneDiveLanding.tsx) | **3D Pop-up Stage Tilt-Reveal + Air-Cushion Brake:** Sân khấu dựng mở từ góc nghiêng đường chân trời (`rotateX: 68° -> -2.4° overshoot -> 0°`, `rotateY: 14° -> 0°`, `rotateZ: -7.5° -> 0°`, `scale: 1.52 -> 0.988 -> 1.0`) với đường cong `SC_EASE.airBrake`. | **Đã duyệt & Commit (`7364971`)** |
| **Hồi 2: Cao trào 3.2** | [`CrashImpactReal.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/CrashImpactReal.tsx) + [`BulletTimeFreezeOrbit.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/BulletTimeFreezeOrbit.tsx) + [`JumpCutPunchIn.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/JumpCutPunchIn.tsx) | **Crash-Zoom Impact + Matrix Bullet-Time 3D Orbit:**<br>• Camera lấy đà lùi nhẹ (`scale: 0.955`) rồi đấm Crash-Zoom 8 frames (`scale: 1.28`) vào tâm vụ nổ vali kèm rung chấn hàm mũ `16*s*exp(-t/2.2)` & 2 vòng sóng xung kích.<br>• **Dual-Clock Time-Remap:** Hãm đồng hồ vật lý xuống `0.08x` Slow-Motion khi đồ đạc bay đạt đỉnh; Camera 3D xoay vòng Orbit (`orbitRotY: -24° -> +15° -> 0°`, `orbitRotX: +13° -> 0°`) kèm vòng Halo 3D nét đứt.<br>• **Meme Sun Jump-Cut Pop:** Nhảy cấp 2 nấc khô (`1.18x -> 1.34x`) làm nổi bật biểu cảm cười đểu. | **Đã duyệt & Commit (`7364971`)** |
| **Hồi 3: Chuyển cảnh 3.3 ➔ 3.4** | [`CardFlockTumble.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/CardFlockTumble.tsx) + [`ImpactBurstKit.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/ImpactBurstKit.tsx) | **3D Vortex Implosion Twist ➔ Impact-Burst-Kit Slam:**<br>• Bối cảnh 3.2 xoáy sập 3D (`scale: 1 -> 0.35`, `rotateZ: -16°`) kèm chớp sáng tâm.<br>• **Khiên Hồng & Cặp đôi Hero** lơ lửng sát ống kính (`scale: 1.58`, `blur(6.5px)`) rồi đập sập xuống sàn trong 6 frames (`t³`).<br>• Tại điểm chạm đất `HIT_34`: Nén dẹt 3 frames (`scaleX: 1.07, scaleY: 0.92`), rung chấn camera (`20*s*exp(-t/2.1)`), bung **18 mảnh đa giác (`IMPACT_SHARDS_34`) + 2 vòng sóng xung kích**, và tạo **Sóng cơ học đẩy dạt đạo cụ 2 bên (`neighborPushEnv`: `±42*s`, `±4°`)** trước khi hồi vị về `0`. | **Đã duyệt & Commit (`7364971`)** |
| **Hồi 4: Chuyển cảnh 3.4 ➔ 3.5** | [`KanadaPerspectiveSnap.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/KanadaPerspectiveSnap.tsx) + [`radial-ripple-phone-chips.md`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/references/shot-cards/radial-ripple-phone-chips.md) | **Kanada Fisheye Perspective Whip-Snap:**<br>• Tiêu đề trái văng phối cảnh 3D (`rotateY: 52° -> -5.5° -> 0°`).<br>• **Smartphone Mockup** lao vào từ góc mắt cá (`perspective: 260 -> 1800`, `scale: 1.68 -> 0.95 -> 1.0`) với góc xoắn 3 trục `rotate3d(0.45, -1, 0.12, 64° -> 0°)` trả phẳng trễ 2 frames tạo cú vẩy cổ tay, đập phẳng kèm **36 tia Anime Focus Rays + 7 vệt xé gió ngang** và giật phản lực toàn sân khấu. | **Đã duyệt & Commit (`7364971`)** |
| **Hồi 5: Kết cảnh** | [`PortalWipeV2.tsx`](file:///Users/phamminhtri/Desktop/project/video-shotcraft/skills/video-shotcraft/examples/remotion/PortalWipeV2.tsx) | **CTA Ripple Pulse & Portal-Wipe 3D Dive:** Nút `"CHỌN GÓI"` phát sóng viền hồng, Camera lùi lấy đà (`scale: 0.95`) rồi phóng xuyên tâm `5.2x` thẳng vào giữa màn hình Smartphone. | **Đã duyệt & Commit (`7364971`)** |

---

## II. AUDIT 3 VẤN ĐỀ VỀ NHỊP ĐỘ (TIMING & PACING) TRONG CẢNH 3 CẦN TỐI ƯU NGAY

Qua kiểm thử thực tế trên Remotion Preview cùng Người dùng, hiện trạng thời lượng `20s (1200 frames)` của Cảnh 3 đang có **3 điểm bất hợp lý về phân bổ thời gian**:

### 1. Điểm nghẽn #1: Khoảng chờ thừa ở đầu Cảnh 3.1 (`~1.8s – 3.8s`)
- **Thực tế đo đạc:**
  - Cặp đôi chính (`couple.png`) bắt đầu trượt vào từ `F48` (`0.8s`) và đến **`F108 – F115` (`~1.8s – 1.9s`) đã đứng hoàn toàn chuẩn form tại trung tâm thảm xanh**.
  - Tuy nhiên, trong code hiện tại (`isQuirkyPlaneActive = frame >= 180 && frame <= 360`), phải đợi đến **`F180` (`3.0s`)** chiếc "Máy bay đỏng đảnh" mới bắt đầu hiện dần ra, và đến **`F230` (`3.83s`)** mới bắt đầu chao đảo (`wobble`)!
- **Hệ quả:** Từ `1.8s` đến `3.8s` có gần **2 giây trống trải**, cả sân khấu đứng chờ làm giảm độ cuốn ngay sau cú mở màn 3D Tilt-Reveal.
- **Hướng xử lý chuẩn:**
  - Ngay khi cặp đôi vừa định hình tại trung tâm (**`F105` ~ `1.75s`**), kích hoạt ngay chiếc **"Máy bay đỏng đảnh"** bay vào trên tầng mây.
  - Rút gọn pha bay ngang dạo đầu của máy bay từ `50 frames` xuống **`18 frames` (`F105 – F123`)**, đi thẳng vào chuỗi diễn xuất hài hước: **Wobble (`F123 – F155`) ➔ Phanh kít Brake Skid (`F155 – F180`) ➔ Nén lò xo Squash (`F180 – F205`) ➔ Búng thun Snap Flip 180° (`F205 – F220`) ➔ Quay đầu phóng chạy Zip-out & xả lốc xoáy đập trúng vali tại `F258` (`4.3s`)** (sớm hơn gần `1.7 giây` so với mốc `F360` cũ!).

---

### 2. Điểm nghẽn #2: Cao trào Hài hước Cảnh 3.2 bị lệch pha đạo cụ & thiếu thời gian thưởng thức
- **Đối chiếu với bức ảnh chuẩn (Hình 1 Người dùng gửi):**
  Khung hình đắt giá nhất của Cảnh 3.2 phải hội tụ **ĐỒNG THỜI 5 chi tiết hài hước**:
  1. **7 món đồ du lịch** bay lơ lửng tầng tầng lớp lớp bên trái trên nắp vali bung mở.
  2. **2 chiếc mũ cói** của cả bạn Nữ (`hat_tilted_clean.png`) và bạn Nam (`mu_nam_tight.png`) đang bay bổng chao nghiêng lơ lửng phía trên đầu.
  3. **Cặp đôi** (`cupple_khong_mu.png`) đang ôm mặt / giơ tay hoảng hốt toát mồ hôi hột.
  4. **Chú vịt vàng mắt xoắn ốc** (`vit_roiram.png`) + **vòng 3 ngôi sao choáng váng ⭐** đã đáp xuống nằm bệt cạnh đụn cát bên phải.
  5. **Mặt trời Meme** (`mat_troi_meme_face_only.png`) góc trên bên phải đang liếc mắt cười đểu cà khịa.
- **Nguyên nhân kỹ thuật khiến hiện tại người xem chưa kịp ngắm trọn vẹn khung hình này:**
  - **Lỗi lệch pha (Desync) giữa Mũ bay và Vịt vàng:**
    - Trong code hiện tại, `isHatFlying` chỉ chạy từ `F376` đến `F418` (tới `F404 – F418` là 2 chiếc mũ đã rơi ụp xuống đầu).
    - Trong khi đó, chú vịt vàng từ `F355 – F415` vẫn đang bay trên không, mãi tới **`F416 – F428` mới tiếp đất**!
    - Như vậy, khi vịt vừa ngồi xuống đất và hiện 3 ngôi sao choáng váng thì **2 chiếc mũ trên đầu cặp đôi đã rơi xuống mất**, làm mất đi bức tranh tổng thể như Hình 1!
  - **Lỗi thiếu thời gian dừng (Hold Duration) sau vòng quay Orbit:**
    - Sau khi Bullet-Time Orbit kết thúc ở `F418`, đoạn `F418 – F446` dùng Speed-Ramp tua nhanh đồng hồ nội cảnh từ `388.2` lên `446` chỉ trong `28 frames (0.46s)`, rồi vừa chạm `F450` là 7 món đồ bị hút ngược vào vali ngay lập tức!
    - Khán giả chưa kịp đảo mắt nhìn hết các góc (từ đồ đạc bay ➔ 2 chiếc mũ ➔ nét mặt cặp đôi ➔ chú vịt xoay sao ➔ ông Mặt trời Meme cười đểu) thì cảnh đã chuyển sang 3.3.
- **Hướng xử lý chuẩn ("Golden Comedy Hold"):**
  1. **Khóa đồng bộ 100% cả 5 yếu tố:**
     - **Giữ cả 2 chiếc mũ cói tiếp tục bay lơ lửng chao nghiêng (`flutter`) phía trên đầu cặp đôi** xuyên suốt toàn bộ Cảnh 3.2 (không cho rơi xuống đầu sớm giữa chừng; chỉ thu hồi/rơi về đúng vị trí vào cuối Cảnh 3.2 ngay trước khi sang 3.3).
     - Điều chỉnh nhịp bay của chú vịt vàng để chú vịt đáp xuống mặt cát cạnh đụn cát phải và bật vòng 3 ngôi sao ⭐ ngay khi Camera 3D hoàn tất pha Orbit, giúp **toàn bộ 5 yếu tố hiển thị trọn vẹn cùng lúc**.
  2. **Mở rộng thời gian dừng thưởng thức ("Savor Hold") thêm `~2.2 – 2.4 giây` (`~135 – 145 frames` ở tốc độ thực 1.0x):**
     - Sau pha Crash-Zoom & 3D Orbit (`F258 – F330`), giữ khung hình ở trạng thái **"Bức tranh Hài Hước Đỉnh Cao"** suốt từ **`F330` đến `F468` (`2.3 giây` tròn trịa)**:
       - 7 món đồ + 2 chiếc mũ lơ lửng bồng bềnh trong vòng xoáy gió hoạt hình.
       - Cặp đôi run nhẹ toát mồ hôi, vịt vàng ngồi lắc lư dưới 3 ngôi sao xoay tít.
       - **Điểm nhấn sáng tạo (Micro-Gag):** Ngay giữa khoảng dừng ngắm (`~F385 – F415`), khi mắt người xem vừa quét từ cặp đôi lên góc phải, **Mặt trời Meme** thực hiện thêm một cú **nhướng mày / nhích phóng đại nhẹ (`Double-Take Smirk Pulse`)** để thu hút ánh nhìn và chốt tiếng cười!

---

### 3. Điểm nghẽn #3: Thời lượng cuối Cảnh 3.5 bị dư thừa & Chuẩn hóa tổng thời lượng Cảnh 3 về `14.0s (840 frames)`
- **Thực tế hiện tại:** Cảnh 3 đang cài đặt `1200 frames (20.0s)`, trong đó từ `F638` đến `F1146` (**8.47 giây**) khung hình đứng tĩnh lặp lại nhịp thở của chiếc Smartphone.
- **Quyết định từ Người dùng:**
  - Tổng thời lượng nội dung chính của Cảnh 3 rút gọn chuẩn xác về **`12.0 giây (720 frames)`**, cộng thêm **`+2.0 giây (120 frames)`** cho hiệu ứng tương tác kết cảnh & chuyển giao = **Tổng cộng `14.0 giây (840 frames @ 60fps)`**.

#### 📊 BẢNG TIMELINE CHUẨN HÓA MỚI CHO CẢNH 3 (`840 FRAMES = 14.0 GIÂY`)

| Giai đoạn | Mốc Giây | Dải Frame (`60fps`) | Thời lượng | Nội dung & Kỹ thuật chi tiết |
| :--- | :--- | :--- | :--- | :--- |
| **1. Mở màn 3.1 & Cặp đôi vào tâm** | `0.0s – 1.8s` | `F0 – F108` | **1.8s** (`108f`) | • `F0 – F58`: Sân khấu dựng mở **3D Tilt-Reveal** + Air-Cushion Brake, các cụm đảo/cây dừa/thảm bung nở.<br>• `F45 – F108`: Cặp đôi trượt êm vào trung tâm thảm xanh, **đứng chuẩn form 100% tại `F108 (1.8s)`**. |
| **2. "Máy bay đỏng đảnh" vào ngay lập tức** | `1.75s – 4.3s` | `F105 – F258` | **2.55s** (`153f`) | • `F105 – F123`: Máy bay xuất hiện ngay trên tầng mây khi cặp đôi vừa định hình.<br>• `F123 – F155`: Wobble chao đảo.<br>• `F155 – F180`: Brake Skid phanh kít há mồm.<br>• `F180 – F205`: Squash & Bend nén lò xo.<br>• `F205 – F220`: Snap Flip búng thun lộn 180°.<br>• `F220 – F258`: Zip-out phóng chạy sang trái & thả **Lốc xoáy 3D đập trúng vali tại `F258 (4.3s)`**. |
| **3A. Nổ Vali & 3D Bullet-Time Orbit (3.2)** | `4.3s – 5.5s` | `F258 – F330` | **1.2s** (`72f`) | • `F245 – F258`: Camera lùi nhẹ lấy đà.<br>• `F258 – F266`: **8-frame Crash-Zoom Punch** vào tâm vụ nổ vali + rung chấn + sóng xung kích kép.<br>• `F266 – F330`: **Bullet-Time 3D Orbit** lượn qua 7 món đồ & 2 chiếc mũ đang vọt lên đỉnh, chú vịt xoay tít 720° rồi đáp xuống cát phải, Mặt trời nhảy cấp **Jump-Cut Pop**. |
| **3B. "Golden Comedy Hold" — Ngắm trọn Bức tranh 3.2 (Hình 1)** | `5.5s – 7.8s` | `F330 – F468` | **2.3s** (`138f`) | • **Giữ nguyên 100% tốc độ thực (1.0x) trong 2.3 giây:**<br>  - **7 món đồ** + **2 chiếc mũ cói** bay lơ lửng bồng bềnh trên đầu.<br>  - **Cặp đôi** hoảng hốt toát mồ hôi.<br>  - **Chú vịt vàng** ngồi bệt dưới cát phải với **3 ngôi sao ⭐ xoay tít**.<br>  - **Mặt trời Meme** cười đểu cà khịa + nhướng mày **Double-Take Pulse** ở `F385 – F415`. |
| **4. Thu hồi & Khiên Hồng đập sập `Impact-Burst-Kit` (3.3 ➔ 3.4)** | `7.8s – 9.6s` | `F468 – F576` | **1.8s** (`108f`) | • `F468 – F490`: 7 món đồ & 2 mũ thu hồi nhanh vào vali, bối cảnh 3.2 xoáy sập **3D Vortex Implosion**.<br>• `F490 – F496`: **Khiên Hồng & Cặp đôi Hero** đập sập từ sát ống kính xuống sàn tại **`HIT_34 = 496`**.<br>• `F496 – F545`: Nén dẹt 3f, nổ **18 mảnh đa giác + sóng xung kích**, đẩy dạt đạo cụ 2 bên (`neighborPushEnv`) và hồi vị về đúng tọa độ chuẩn `STAGING_SHOT_3_4`.<br>• `F545 – F576`: Cặp đôi Hero tỏa sáng tự tin trong Khiên Hồng. |
| **5. Smartphone `Kanada Perspective Snap` (3.5)** | `9.6s – 12.0s` | `F576 – F720` | **2.4s** (`144f`) | • `F576 – F596`: Tiêu đề *"Sẵn sàng cho hành trình"* văng 3D từ trái vào.<br>• `F594 – F612`: **Smartphone Mockup** vẩy mắt cá `Kanada Perspective Snap` đập phẳng tại **`SNAP_35 = 612`** kèm **36 tia Anime Focus + 7 vệt xé gió**.<br>• `F612 – F630`: Các thẻ UI bên trong Smartphone bung sóng Radial Ripple + Mũi tên hồng uốn cong chỉ sang.<br>• `F630 – F720` (`1.5s`): Khung hình ổn định sắc nét đúng chuẩn thiết kế gốc `slide4_travel.png`. |
| **6. Hiệu ứng bổ sung kết cảnh & Chuyển giao (+2s)** | `12.0s – 14.0s` | `F720 – F840` | **2.0s** (`120f`) | • `F720 – F780`: Nút `"CHỌN GÓI"` thực hiện cú **Press-Down & Neon Ripple Click** nổi bật.<br>• `F780 – F840`: Chuẩn bị bàn giao sang chuỗi **Nối tiếp Liên hoàn các nhóm Bảo hiểm khác** (hoặc phóng Portal-Wipe). |

---

## III. AUDIT & KẾ HOẠCH SÁNG TẠO: CHUỖI NỐI TIẾP XUYÊN SUỐT ĐA NHÓM BẢO HIỂM (TRAVEL ➔ XE CỘ ➔ SỨC KHỎE ➔ CHÁY NỔ ➔ 4 BƯỚC MUA)

### 1. Bài toán Chiến lược từ Người dùng
- Theo Storyboard Canva ban đầu, sau Cảnh 3 (Bảo hiểm Du lịch) sẽ đi vào Cảnh 4 (Các nhóm sản phẩm) rồi Cảnh 5 (4 bước mua bảo hiểm & CMS).
- Hiện tại [`Scene4_InsuranceCategories.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/components/scenes/v2/Scene4_InsuranceCategories.tsx) chỉ đang hiển thị một tấm ảnh chụp tĩnh (`slide5_categories.png`), trong khi nếu dựng từng tiểu cảnh 20 giây cho mỗi loại bảo hiểm (Ô tô, Xe máy, Sức khỏe, Cháy nổ) như Cảnh 3 thì quá tốn thời gian và kéo dài video không cần thiết.
- **Ý tưởng đột phá của Người dùng:** **Tận dụng chính bố cục cuối Cảnh 3 (Sân khấu Khiên Hồng bảo vệ ở giữa + Smartphone `TOPbaohiem` ở bên phải)** để làm **mạch nối tiếp xuyên suốt (Continuous Relay)**: đạo cụ trung tâm biến đổi liên hoàn sang tình huống mới (ví dụ: *đi xe lăn bánh vào Khiên ➔ màn hình Smartphone nhảy ra Card mua Bảo hiểm Xe*), vừa nhanh, vừa đồng bộ 100% ngôn ngữ "tuýt mạnh chuyển hình", vừa giới thiệu đầy đủ hệ sinh thái sản phẩm trước khi vào Cảnh 4 bước đặt mua!

### 2. Kiểm kê Kho Tài Nguyên 4K Tách Nền Đã Có Sẵn Trong Repo
Qua kiểm toán thư mục [`public/assets/elements/screen2/`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/), chúng ta **đã có sẵn 100% tài nguyên 3D Alpha PNG độ phân giải cao** khớp hoàn toàn với phong cách 3D Hồng thương hiệu của Cảnh 3:

| Thứ tự Chặng | Nhóm Bảo Hiểm | Asset Chủ Thể 3D Trung Tâm (Trong Khiên Hồng) | Asset Card Mua Hàng (Nhảy ra trên Smartphone) | Thông điệp Tiêu đề Bên Trái |
| :--- | :--- | :--- | :--- | :--- |
| **Chặng 0 (Gốc)** | **Bảo hiểm Du lịch** | Cặp đôi Hero (`nguoi_nam.png` + `nguoi_nu.png`) + Đảo dừa + Vali hồng (`screen3/3.4/`) | Card Bảo hiểm Du lịch (`dulich.png` / UI gốc 3.5) | *"Sẵn sàng / cho hành trình"* |
| **Chặng 1** | **Bảo hiểm Ô tô & Xe máy** | • Ô tô 3D hồng trên làn đường nhựa: [`oto.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/oto.png), [`oto1.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/oto1.png), [`oto2.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/oto2.png)<br>• Xe máy Vespa 3D hồng trên đường nhựa: [`xemay.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/xemay.png), [`xemay1.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/xemay1.png) | • Card TNDS Ô tô: [`cum3_card5_oto.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/cum3_card5_oto.png)<br>• Card TNDS Xe máy: [`cum3_card4_xemay.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/cum3_card4_xemay.png) | *"Vững tay lái / trên mọi cung đường"* |
| **Chặng 2** | **Bảo hiểm Sức khỏe & Y tế** | • Khiên Y tế chữ thập + Ống nghe 3D hồng: [`yte.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/yte.png)<br>• Bàn tay 3D búng tay: [`bungtay.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/bungtay.png) | • Card Bảo hiểm Sức khỏe: [`cum3_card1_suckhoe.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/cum3_card1_suckhoe.png) | *"Điểm tựa sức khỏe / cho cả gia đình"* |
| **Chặng 3** | **Bảo hiểm Cháy nổ & Nhà tư nhân** | • Ngôi nhà 3D mái hồng + Cây xanh + Khiên Lửa: [`home.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/home.png) | • Card Bảo hiểm Cháy nổ: [`cum3_card2_chayno.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/cum3_card2_chayno.png) | *"An tâm tổ ấm / bảo vệ 24/7"* |

### 3. Thiết kế Kỹ thuật Chuyển hình Liên hoàn (3-Stop Relay Mechanics)
1. **Nhịp nối Du lịch ➔ Xe cộ (Speed-Road Whip-In):**
   - Cặp đôi Du lịch thu gọn theo trục Z, đồng thời làn đường nhựa của [`oto.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/oto.png) & [`xemay.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/xemay.png) lao vút từ cánh trái cắt ngang vào tâm **Khiên Hồng** với cú phanh `SC_EASE.airBrake` (đầu xe nhún nhẹ xuống rồi nảy hồi đàn hồi).
   - Cùng khoảnh khắc xe phanh kít: Màn hình **Smartphone bên phải** thực hiện cú **3D Card Snap** — bắn Card *"Bảo hiểm TNDS Ô tô"* & *"Bảo hiểm TNDS Xe máy"* nổi bật lên mặt kính điện thoại kèm sóng xung kích hồng!
2. **Nhịp nối Xe cộ ➔ Sức khỏe (3D Revolving Shield Flip):**
   - Khung **Khiên Hồng** xoay lật 180° quanh trục Y (`rotateY: 0° -> 180°`), mặt sau lật ra **Khiên Y tế + Ống nghe 3D** ([`yte.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/yte.png)) đập nhịp tim `Heartbeat Scale Pulse`.
   - Màn hình **Smartphone** nảy bung **Card *"Bảo hiểm Sức khỏe"*** ([`cum3_card1_suckhoe.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/cum3_card1_suckhoe.png)).
3. **Nhịp nối Sức khỏe ➔ Cháy nổ / Nhà cửa (Impact-Burst Pop-Up House):**
   - **Ngôi nhà 3D mái hồng + Khiên Lửa** ([`home.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/home.png)) đập `Impact-Burst-Kit` xuống thảm trung tâm kèm 18 mảnh đa giác phát sáng.
   - Màn hình **Smartphone** nảy bung **Card *"Bảo hiểm Cháy nổ"*** ([`cum3_card2_chayno.png`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/public/assets/elements/screen2/cum3_card2_chayno.png)).
4. **Cú Chốt ➔ Portal-Wipe Dive vào Cảnh 4 Bước Mua Bảo Hiểm:**
   - Nút `"CHỌN GÓI"` trên Smartphone lún xuống **Click!** ➔ Camera thực hiện cú **Portal-Wipe 3D Dive (`5.2x`)** xuyên qua màn hình Smartphone, mở thẳng vào giao diện **4 Bước Mua Bảo Hiểm 1-Chạm (`Chọn sản phẩm ➔ Đọc thông tin ➔ Nhập thông tin ➔ Xác nhận`)**!

---

## IV. LỘ TRÌNH THỰC THI TỪNG BƯỚC (ACTION PLAN)

- [ ] **Bước 1 (Ưu tiên thực hiện ngay):** Tinh chỉnh nhịp thời gian trong [`Scene3_TravelAdventure.tsx`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/components/scenes/v2/Scene3_TravelAdventure.tsx) và [`videoConfigV2.ts`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/src/config/videoConfigV2.ts) về chuẩn **`14.0s (840 frames = 12s nội dung + 2s kết cảnh)`**:
  - Đẩy "Máy bay đỏng đảnh" xuất hiện ngay ở `F105 (~1.75s)` khi cặp đôi vừa đứng chuẩn form.
  - Khóa đồng bộ 5 thành phần của **Bức tranh Hài Hước 3.2** (giữ 2 mũ cói bay lơ lửng + 7 món đồ + vịt vàng ngồi xoay 3 ngôi sao ⭐ + Mặt trời Meme cười đểu nhướng mày) và kéo dài thời gian dừng ngắm lên **`2.3 giây` (`F330 – F468`)**.
  - Gói gọn Shot 3.3 ➔ 3.4 ➔ 3.5 từ `F468` đến `F720 (12.0s)` + `2.0s` hiệu ứng kết cảnh (`F720 – F840`).
- [ ] **Bước 2 (Sau khi Người dùng nghiệm thu Bước 1 trên Remotion Preview):** Xây dựng chuỗi **Nối tiếp Liên hoàn Đa Nhóm Bảo Hiểm (Ô tô/Xe máy ➔ Sức khỏe ➔ Cháy nổ)** nối mượt 100% từ bố cục Khiên Hồng + Smartphone của cuối Cảnh 3 trước khi phóng vào Cảnh 4 bước đặt mua.

