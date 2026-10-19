# KẾ HOẠCH ĐẠO DIỄN ĐIỆN ẢNH & KỊCH BẢN CHUYỂN ĐỘNG CẢNH 2
> **Dự án:** Video Quảng cáo Hệ sinh thái InsurTech TOPbaohiem & InsureGO CMS  
> **Phân cảnh:** Scene 2 · TOPbaohiem Xuất Hiện Trên Đa Thiết Bị (`Scene2_TopBaoHiemShowcase.tsx`)  
> **Chuẩn chất lượng:** 4K UHD / 2K QHD @ 60 FPS · Open Duration  
> **Nền tảng kỹ thuật:** Remotion Engine + Repo [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) + WebGL Three.js  

---

## I. MỤC TIÊU CHIẾN LƯỢC & QUY TẮC BẤT BIẾN TỪ NGƯỜI DÙNG

> [!IMPORTANT]
> ### 2 NGUYÊN TẮC CỐT LÕI VỪA ĐƯỢC CHỐT VỚI NGƯỜI DÙNG:
> 1. **TRIỆT TIÊU TOÀN BỘ HIỆU ỨNG GÂY NHIỄU MÀN HÌNH (NO BOKEH / NO NOISE):**
>    - Tuyệt đối **KHÔNG sử dụng Ambient Floating Bokeh**, không rải hạt li ti lơ lửng khắp màn hình.
>    - Giữ trọn vẹn không gian nền trong trẻo, sạch bóng, sang trọng và sắc nét tuyệt đối chuẩn Apple Keynote / Linear.
> 2. **QUY TRÌNH CHIA NHỎ TASK (MICRO-TASKS) & NGƯỜI DÙNG TRỰC TIẾP TEST UI:**
>    - Chia nhỏ thành từng micro-task cụ thể, làm dứt điểm từng phần nhỏ.
>    - Mỗi task làm xong, **Người dùng là người trực tiếp kiểm thử (test UI)** trên màn hình Remotion preview (`bun run dev`) thực tế.
>    - Nếu có vấn đề phát sinh, Người dùng sẽ chỉ điểm để Agent sửa ngay tại chỗ.
>    - **Agent tuyệt đối KHÔNG tự ý chạy test UI ngầm** (browser subagent, headless devtools...) gây mất thời gian và lãng phí tài nguyên.

---

## II. BẢNG PHÂN BỔ TIMELINE CHI TIẾT (3 HỒI KỊCH BẢN - 1740 FRAMES ~ 29.0s @ 60FPS)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TIMELINE DIỄN HOẠT CẢNH 2 (TỔNG THỜI LƯỢNG THAM KHẢO: 1740 FRAMES ~ 29.0 GIÂY @ 60FPS)                  │
├─────────────────────┬────────────────────────────────────┬─────────────────────────────┬───────────────┤
│ HỒI 1 (ACT 1)       │ HỒI 2 (ACT 2)                      │ HỒI 3 (ACT 3)               │ CHUYỂN GIAO   │
│ BÚNG TAY & BUNG THẺ │ CAMERA ORBIT & TRUYỀN NĂNG LƯỢNG   │ KHIÊN 3D ĐÁP ĐẤT & HOVER    │ MỞ SANG CẢNH 3│
├─────────────────────┼────────────────────────────────────┼─────────────────────────────┼───────────────┤
│ Frames 0 – 420      │ Frames 420 – 1020                  │ Frames 1020 – 1500          │ Frames 1500   │
│ (0s – 7.0s)         │ (7.0s – 17.0s)                     │ (17.0s – 25.0s)             │ – 1740        │
└─────────────────────┴────────────────────────────────────┴─────────────────────────────┴───────────────┘
```

---

### HỒI 1: CÚ BÚNG TAY KÍCH HOẠT & CỤM 5 THẺ BÀI BUNG XÒE (DECK-DEAL FLYOUT)
*Thời gian: Frames 0 – 420 (0.0s – 7.0s / 420 frames)*  
*Góc máy chủ đạo: Camera Dolly In nhẹ (Scale 1.0 $\rightarrow$ 1.05), tập trung vào phân khu bên trái.*

| Mốc Frame | Phân cảnh & Hành động | Hiệu ứng Chuyển động & Vật lý (Shotcraft) |
| :--- | :--- | :--- |
| **0 – 60**<br>*(0s – 1.0s)* | **Cú búng tay Snap!**<br>Bàn tay áo hồng nảy nhẹ dứt khoát. | • Tia sáng sao `✨` phát quang bung nở, xoay tròn gia tốc.<br>• Sóng xung kích ánh sáng hồng lan tỏa hình elip từ ngón tay.<br>• Camera giật nhẹ phản lực 1.02x (`Impact Punch`) rồi hồi về êm ái. |
| **60 – 240**<br>*(1.0s – 4.0s)* | **Bung xòe 5 thẻ bài**<br>(`deck-deal-flyout`)<br>Từng thẻ phóng ra so le từ đầu ngón tay. | • **Kỹ thuật chia bài ảo thuật:** Từng thẻ bay ra với quỹ đạo vòng cung cong, từ ngón tay lao vút tới vị trí tương ứng (`FLY_EASE = bezier(0.35, 0.05, 0.22, 1.15)`):<br>  - F60: Thẻ 1 (Y tế) bay vào góc `-12°`<br>  - F90: Thẻ 2 (Nhà cửa) bay vào góc `0°`<br>  - F120: Thẻ 3 (Du lịch) bay vào góc `+18°`<br>  - F150: Thẻ 4 (Ô tô) phóng xuống góc `-4°`<br>  - F180: Thẻ 5 (Xe máy) phóng xuống góc `+14°`<br>• **Xung lực nén lún (`stackPress`):** Khi mỗi thẻ đáp đất, cả khay thẻ nhún nhẹ 3-4px rồi đàn hồi nảy lên. |
| **138 – 225**<br>*(2.3s – 3.75s)* | **Đồng bộ Sân khấu: Badge nảy & Cụm phải trượt vào**<br>*(Theo chỉ đạo đạo diễn)* | • **Cụm trái:** Capsule badge *"Tìm hiểu dễ dàng"* & kính lúp 3D bật nảy lò xo (`pop-spring`).<br>• **Cụm phải (Đồng pha hoàn hảo):**<br>  - F128: Dải sóng mint dâng hữu cơ đón thiết bị.<br>  - F132: Đám mây trắng 3D trôi êm vào góc trên phải.<br>  - F138: MacBook trắng 3D trượt vào cùng nhịp với Badge, bóng sàn nở rộng khi tiếp đất.<br>  - F150: iPhone 3D trượt vào nghiêng 3D, bóng sàn 2 tầng xoay loang mượt mà.<br>  - F195: Mũi tên hồng `arrow.png` fade-in mượt mà kết nối 2 cụm.<br>• Toàn cảnh không bị giật khối frame, các spring tính toán êm ái. |
| **225 – 420**<br>*(3.75s – 7.0s)* | **Nhịp thở tĩnh toàn cảnh sân khấu (Rest & Hold)** | • Toàn bộ đại cảnh (bàn tay, 5 thẻ, badge, MacBook, iPhone, 2 đám mây, sóng mint) cùng thở bồng bềnh vi mô điều hòa (Harmonic floating 5px), tôn vinh trọn vẹn bố cục sắc nét 10/10. |

---

### HỒI 2: VÒNG XOÁY THREE.JS, NHỊP DỪNG TĨNH, CUỘN TRANG & ĐẠI CẢNH MỔ XẺ 3D
*Thời gian: Frames 340 – 970 (5.6s – 16.2s)*  
*Góc máy chủ đạo: Camera Trực diện 90° $\rightarrow$ Orbit 3/4 Axonometric (Shotcraft Recipe).*

| Mốc Frame | Phân cảnh & Hành động | Hiệu ứng Chuyển động & Kỹ thuật Video-Shotcraft |
| :--- | :--- | :--- |
| **340 – 415**<br>*(5.6s – 6.9s)* | **Cú búng tay Snap! 2 $\rightarrow$ Vòng xoáy Three.js $\rightarrow$ MacBook trực diện 90°** | • Bàn tay áo hồng búng nảy dứt khoát tại F352 (SFX: `transition-snap.mp3`), giữ nhịp dừng tĩnh 20 frames.<br>• Vòng xoáy 3D ma thuật `VortexSwirl3D` hút toàn bộ cụm item ngoại vi vào tâm rồi nổ bung văng ra 4 góc (F372 – F415).<br>• Chiếc MacBook trực diện 90° an tọa vững chãi giữa sân khấu tại F386 – F415. |
| **415 – 510**<br>*(6.9s – 8.5s)* | **Nhịp dừng tĩnh thẩm thấu MacBook trực diện (~1.6s)** | • Toàn bộ sân khấu giữ nhịp thở tĩnh tuyệt đối 95 frames (~1.6s) để người xem thẩm thấu giao diện trang chủ TOPbaohiem đẳng cấp trên màn hình Retina MacBook. |
| **510 – 690**<br>*(8.5s – 11.5s)* | **CHẶNG 1: Head & Tương tác Hover Card Thẻ Bảo Hiểm (~3.0s)** | • Con trỏ chuột lướt vào lòng màn hình (F500 – F525).<br>• Chuột lướt qua thẻ *Sức khoẻ* rồi di chuyển vào tâm thẻ *Cháy nổ* (F540 – F630).<br>• **Hiệu ứng Hover Card (Chuẩn ảnh 1):** Khi chuột dừng trên thẻ *Cháy nổ*, viền thẻ sáng hồng neon `border: 2px solid #ED017C`, nút *"So sánh ngay ➔"* chuyển từ viền outline thành **nền hồng đặc `#ED017C` với chữ trắng**, thẻ nhấc nhẹ 3px.<br>• Chuột tiếp tục lướt nhẹ sang thẻ *Du lịch* (F630 – F680) rồi chuẩn bị cuộn trang. |
| **690 – 860**<br>*(11.5s – 14.3s)* | **CHẶNG 2: Quy trình mua bảo hiểm 4 bước (~2.8s)** | • Cuộn lướt êm ái từ F690 đến F730 đưa cụm *"Quy trình mua bảo hiểm chưa bao giờ dễ dàng đến thế"* vào trung tâm màn hình.<br>• Dừng tĩnh ~2.2s (F730 – F860).<br>• **Hiệu ứng Auto-focus (Chuẩn ảnh 2):** Viền thẻ bước 2 *"Chọn gói"* sáng hồng nổi bật (`border: 2px solid #ED017C`), minh họa trực quan quy trình so sánh minh bạch. |
| **860 – 1030**<br>*(14.3s – 17.2s)* | **CHẶNG 3: Banner Carousel & 4 Trụ cột "Vì sao chọn TOPbaohiem?" (~2.8s)** | • Cuộn lướt êm ái từ F860 đến F900 xuống phân khu Banner sản phẩm (xe máy, ô tô) và 4 cam kết giá trị cốt lõi.<br>• Dừng tĩnh ~2.2s (F900 – F1030) để người xem thẩm thấu: *So sánh thông minh, Tiết kiệm tối đa, Quyền lợi rõ ràng, Hỗ trợ tận tâm* (Chuẩn ảnh 3). |
| **1030 – 1190**<br>*(17.2s – 19.8s)* | **CHẶNG 4: Đối tác hãng bảo hiểm & Blog tin tức kiến thức (~2.7s)** | • Cuộn lướt từ F1030 đến F1070 qua dàn logo đối tác uy tín hàng đầu (Bảo Việt, PVI, PTI, Bảo Long...) và cụm bài viết blog cẩm nang bảo hiểm.<br>• Dừng tĩnh ~2.0s (F1070 – F1190) khẳng định độ phủ thương hiệu và niềm tin vững chắc. |
| **1190 – 1350**<br>*(19.8s – 22.5s)* | **CHẶNG 5: Chân trang (Footer xanh đậm) & Mờ dần vỏ máy MacBook (~2.7s)** | • Cuộn lướt từ F1190 đến F1240 chạm đáy chân trang tại `-5659px`.<br>• Dừng tĩnh chiêm ngưỡng Footer với chứng nhận uy tín Bộ Công Thương và hotline liên hệ.<br>• **Làm mờ dần vỏ máy (F1300 – F1350):** Vỏ khung MacBook và bóng chân máy mờ dần từ `1` về `0`, giải phóng độc lập tấm trang chủ. |
| **1350 – 1500**<br>*(22.5s – 25.0s)* | **ĐẠI CẢNH MỔ XẺ 3D (EXPLODED VIEW) TRỌNG TÂM TOÀN BỘ PHẦN "HEAD" TRANG CHỦ** | • **Tiếp quản góc quay 3/4 Axonometric (F1350 – F1380):** Camera nghiêng lật từ trực diện (`rotateX: 0° ➔ 54°`, `rotateZ: 0° ➔ -32°`) chuẩn recipe Shotcraft.<br>• **MỔ XẺ 5 TẦNG UI TRỤC Z (F1350 – F1400):** Sàn đáy Baseplate nét đứt (Z: 0), Top Nav (Z: +140px), Hero Banner (Z: +260px), 4 Thẻ Vệ tinh (Z: +380px), và Thẻ Du Lịch + Vali 3D Hero vươn cao nhất (Z: +520px).<br>• **Chao lượn thị sai vi mô (Parallax Orbit - F1400 – F1490):** Camera chao nhẹ góc tạo chiều sâu 3D đẳng cấp. |
| **1500 – 1620**<br>*(25.0s – 27.0s)* | **Con trỏ Chuột Click Thẻ Du Lịch & Phóng lớn Dolly-through sang Cảnh 3** | • Con trỏ chuột macOS Vector click dứt khoát vào nút *"So sánh ngay ➔"* trên thẻ Du lịch (SFX: `button-click.mp3`).<br>• Vòng sóng hồng Click Ripple bùng nở $\rightarrow$ Camera phóng xuyên (Crash Zoom qua vali du lịch) $\rightarrow$ Chuyển tiếp sang **Cảnh 3 (Du lịch phiêu lưu)**! |

---

## III. THIẾT KẾ KIẾN TRÚC EXPLODED VIEW 3D (CHUẨN 100% DEMO SHOTCRAFT `ExplodedView.tsx`)

Để đạt được hiệu ứng mổ xẻ chuẩn như video tham khảo `exploded-view.mp4` và mã nguồn gốc `ExplodedView.tsx`:

```tsx
// 1. Kích thước chuẩn Page Canvas & Phối cảnh 3D Axonometric
const W = 1600;
const H = 1000;
const R = 26; // Bo góc Canvas chuẩn Shotcraft
const PERSP = 2400; // Độ tụ chuẩn Apple Showcase

// 2. Camera Rig 3D chuyển động theo hàm thời gian (camAt)
const camAt = (f: number) => {
    const orbit = ramp(f, 450, 80, EASE.smooth); // Chao lượn thị sai
    const tall = ramp(f, 420, 30, EASE.smooth);  // Kéo lùi máy khi bung tầng
    return {
        rx: mix(54, 50, orbit),
        rz: mix(-34, -32, ramp(f, 420, 20, EASE.out)) + 10 * orbit, // -32° -> -22°
        s: mix(0.56, 0.47, tall),                                    // Thu nhỏ cho tầng Z vươn cao
        cx: 0,
        cy: mix(40, 180, tall),                                      // Hạ tâm máy quay
    };
};

// 3. Cấu trúc 5 Tầng mổ xẻ trên phần Head trang chủ TOPbaohiem (LAYERS)
const EXPLODED_LAYERS = [
    { key: 'top-nav',    x: 0,   y: 0,   w: 1600, h: 100, z: 140, r: 0,  label: { n: '01', t: 'Điều Hướng', d: 'Menu & Tra Cứu Nhanh' } },
    { key: 'banner',     x: 80,  y: 130, w: 1440, h: 320, z: 260, r: 22, label: { n: '02', t: 'Cam Kết', d: 'Bảo Vệ Toàn Diện & Minh Bạch' } },
    { key: 'basic-grid', x: 80,  y: 480, w: 1440, h: 460, z: 380, r: 22, label: { n: '03', t: 'Sản Phẩm', d: 'Sức Khỏe, Xe Máy, Ô Tô, Nhà' } },
    { key: 'travel-hero',x: 840, y: 480, w: 340,  h: 460, z: 520, r: 22, label: { n: '04', t: 'Hero Du Lịch', d: 'So Sánh Gói Toàn Cầu' } },
];

// 4. Công thức vật lý lò xo bung tầng (Stagger 5 frames)
const layerProgress = (f: number, index: number) => {
    return springAt(f, 420 + index * 5, { damping: 15, stiffness: 120 });
};

// 5. Ba Neo Chiều Sâu Vật Lý Chuẩn Shotcraft (Depth Anchors):
// - Neo 1: Bóng đổ phân tầng rơi xuống mặt sàn đáy
const shadowStyle = {
    left: layerX + heightZ * 0.18,
    top: layerY + heightZ * 0.26,
    filter: `blur(${(10 + heightZ * 0.09).toFixed(1)}px)`,
    opacity: Math.min(1, p * 1.5) * (0.8 - heightZ / 1400),
    transform: 'translateZ(1px)',
};

// - Neo 2: Lớp viền cạnh 3D (Thickness Edge)
const thicknessStyle = {
    background: '#b9c6de',
    transform: `translateZ(${Math.max(2.5, heightZ - 8)}px)`,
};

// - Neo 3: Khe cắm viền đứt trên sàn đáy (Dashed Slot Sockets)
const slotSocketStyle = {
    border: '3px dashed rgba(47, 91, 255, 0.28)',
    background: 'rgba(47, 91, 255, 0.03)',
    borderRadius: 22,
};
```

---

## IV. TÀI NGUYÊN SỬ DỤNG (TẬN DỤNG TỐI ĐA ASSETS ĐÃ CÓ & SFX SHOTCRAFT)

| Tài nguyên | File path | Vai trò trong Phân cảnh Hồi 3 |
| :--- | :--- | :--- |
| **Khung MacBook trực diện** | `public/assets/elements/screen2/macbook_front_90_transparent.png` | Khung máy góc nhìn thẳng với lòng màn hình khoét trong suốt 100%, làm bản lề trực diện trước khi phóng thích Web Canvas và lùi sâu tan biến. |
| **Giao diện trang chủ 4K** | `public/assets/elements/screen2/fullsize-trangchu.png` | Ảnh gốc độ phân giải cực cao, cắt viewport/clip-path chia tách thành các module UI siêu nét (Header, Banner, Lưới thẻ). |
| **Vali Du lịch 3D** | `public/assets/elements/screen2/dulich.png` | Chiếc vali hồng + hộ chiếu + máy bay tách nền 3D đặt nổi ở tầng cao nhất (Z: +520px + nổi riêng 60px). |
| **Con trỏ chuột Vector** | Vector SVG Retina 4K | Con trỏ chuột macOS trắng viền đen lướt vào click kích hoạt chuyển cảnh. |
| **SFX Búng tay** | `assets/audio/sfx/transition/transition-snap.mp3` | Tiếng búng tay ma thuật kích hoạt dọn dẹp sân khấu. |
| **SFX Xoáy lốc ly tâm** | `assets/audio/sfx/transition/whoosh-swirl.mp3` | Tiếng gió xoáy hút sạch cụm 5 thẻ bài và khiên hồng ra ngoài biên. |
| **SFX Bung trang web** | `assets/audio/sfx/mech/door-open-futuristic.mp3` & `transition/air-zoom-vacuum.mp3` | Tiếng nhấc bổng tấm Web Canvas và phóng thích khỏi vỏ máy MacBook. |
| **SFX Mổ xẻ 3D** | `assets/audio/sfx/mech/mech-tech-movement.mp3` & `gear-lock-metallic.mp3` | Tiếng trượt servo êm ái và tiếng chốt khóa cơ khí khi 5 tầng UI đạt độ cao Z. |
| **SFX Click & Chuyển cảnh** | `assets/audio/sfx/transition/transition-tech-slide.mp3` & `whoosh-big.mp3` | Tiếng click vào nút So Sánh và cú phóng xuyên Dolly-through sang Cảnh 3. |

---

## V. LỘ TRÌNH THỰC THI CHIA NHỎ (MICRO-TASKS ROADMAP & NGHIỆM THU TẠI CHỖ)

Mỗi micro-task sau khi hoàn thiện sẽ dừng lại để **Bạn trực tiếp test trên màn hình preview Remotion (`bun run dev`)** và phản hồi:

### Nhóm Task 1: Tiền Cảnh Trái (ĐÃ XONG 100%)
- **Task 1.1: [x] ĐÃ NGHIỆM THU** — Virtual Camera Rig 2.5D.
- **Task 1.2: [x] ĐÃ NGHIỆM THU** — Diễn hoạt cú búng tay Snap!
- **Task 1.3: [x] ĐÃ NGHIỆM THU** — Bung xòe 5 thẻ bài so le parabol.
- **Task 1.4: [x] ĐÃ NGHIỆM THU** — Badge *"Tìm hiểu dễ dàng"* & Kính lúp nảy lò xo.

### Nhóm Task 2: Hậu Cảnh Phải & Khiên (ĐÃ XONG 100%)
- **Task 2.1: [x] ĐÃ NGHIỆM THU** — Dải sóng mint + MacBook & iPhone trượt vào sàn.
- **Task 2.2: [x] ĐÃ HỦY** — Mũi tên hồng giữ hiển thị tự nhiên trong trẻo.
- **Task 3.1: [x] ĐÃ NGHIỆM THU** — Cú tiếp đất Chiếc khiên 3D hồng loáng sáng uy lực.

### Nhóm Task 3: 5 Chặng Dừng Tương Tác Trên Giao Diện Trang Chủ (Interactive Staged Tour) & Chuyển Cảnh
- **Task 3.1: [x] ĐÃ NGHIỆM THU** — Bàn tay áo hồng búng nảy dứt khoát tại F352 $\rightarrow$ Vòng xoáy 3D ma thuật `VortexSwirl3D` hút toàn bộ cụm item ngoại vi vào tâm rồi bung văng ra 4 góc (F372 – F415).
- **Task 3.2: [x] ĐÃ NGHIỆM THU** — Nhịp dừng tĩnh thẩm thấu MacBook trực diện 90° an tọa giữa sân khấu (~1.6s, F415 – F510).
- **Task 3.3: [x] ĐÃ HOÀN THÀNH (CHỜ BẠN NGHIỆM THU) — CHẶNG 1: Head & Tương tác Hover Card Thẻ Bảo Hiểm (F510 – F690, ~3.0s):**
  * Con trỏ chuột macOS lướt vào lòng màn hình có vòng Spotlight hồng và xung kích sonar pulse.
  * Chuột lướt qua thẻ *Sức khoẻ* (F535 – F565) $\rightarrow$ Thẻ Sức khoẻ sáng viền hồng + nút hồng đặc chữ trắng.
  * Chuột dừng tại nút *"So sánh ngay ➔"* trên thẻ *Cháy nổ* (F575 – F650, trọng tâm chuẩn 100% Ảnh 1 User gửi): Viền thẻ sáng hồng neon `2.5px solid #ED017C`, nút *"So sánh ngay ➔"* chuyển thành **nền hồng đặc `#ED017C` với chữ trắng** nổi bật, bóng đổ bừng sáng.
  * Chuột lướt sang thẻ *Du lịch* (F652 – F685) $\rightarrow$ Thẻ Du lịch sáng viền hồng + nút hồng đặc chữ trắng trước khi chuẩn bị cuộn trang sang Chặng 2.
- **Task 3.4: [x] ĐÃ HOÀN THÀNH (CHỜ BẠN NGHIỆM THU) — CHẶNG 2: Quy trình mua bảo hiểm 4 bước (F690 – F900, ~3.5s):**
  * Cuộn trang êm ái từ F690 đến F760 (`webScrollY` từ `-7px` xuống `-1100px`) đưa toàn bộ cụm *"Quy trình mua bảo hiểm chưa bao giờ dễ dàng đến thế"* vào vị trí trung tâm màn hình Retina MacBook.
  * Dừng tĩnh tuyệt đối ~2.33s (F760 – F900) tại `-1100px` để người xem thẩm thấu 4 bước.
  * Quỹ đạo con trỏ chuột lướt theo nhịp cuộn, trượt vào nút "CHỌN GÓI" của Thẻ bước 2 (thẻ đang có sẵn viền hồng và nút hồng trên ảnh gốc) với hiệu ứng Spotlight Ring & Sonar Pulse định vị ấn tượng.
  * *Nghiệm thu Chặng 2:* Sẵn sàng để Bạn kiểm tra trực tiếp trên trình duyệt `bun run dev`.
- **Task 3.5: [ ] CHỜ THỰC HIỆN — CHẶNG 3: Banner Carousel & 4 Trụ Cột "Vì sao chọn TOPbaohiem?" (F860 – F1030, ~2.8s):**
  * Cuộn trang xuống cụm Banner ưu đãi (Xe máy, Ô tô) và 4 cam kết giá trị cốt lõi.
  * Dừng tĩnh ~2.2s (Chuẩn Ảnh 3 User gửi).
  * *Nghiệm thu Chặng 3:* User kiểm tra vị trí dừng và tính thẩm thấu thông tin.
- **Task 3.6: [ ] CHỜ THỰC HIỆN — CHẶNG 4: Mạng Lưới Đối Tác Hãng & Blog Cẩm Nang (F1030 – F1190, ~2.7s):**
  * Cuộn lướt qua dàn thương hiệu bảo hiểm uy tín (Bảo Việt, PVI, PTI, Bảo Long...) và danh mục bài viết tư vấn.
  * Dừng tĩnh ~2.0s để khẳng định độ tin cậy và chuyên nghiệp.
  * *Nghiệm thu Chặng 4:* User kiểm tra độ mượt mà của dàn logo và blog.
- **Task 3.7: [ ] CHỜ THỰC HIỆN — CHẶNG 5: Chân Trang Footer & Khởi Đầu Tan Biến Vỏ Máy (F1190 – F1350, ~2.7s):**
  * Cuộn xuống chạm đáy chân trang tại Footer xanh đậm (`webScrollY = -5659px`).
  * Dừng tĩnh chiêm ngưỡng đầy đủ thông tin pháp lý & hotline.
  * Vỏ máy MacBook và bóng đổ chân máy bắt đầu mờ dần từ `1` về `0` (F1300 – F1350) để giải phóng tấm trang chủ.
  * *Nghiệm thu Chặng 5:* User kiểm tra điểm chạm đáy và hiệu ứng mờ dần vỏ máy.
- **Task 3.8: [ ] CHỜ THỰC HIỆN — ĐẠI CẢNH MỔ XẺ 3D (EXPLODED VIEW) TRỌNG TÂM PHẦN HEAD (F1350 – F1500, ~2.5s):**
  * Tiếp quản góc quay 3/4 Axonometric (`perspective: 2400`, `rotateX: 54° ➔ 50°`, `rotateZ: -32° ➔ -22°`).
  * Tách 5 tầng UI theo trục Z chuẩn công thức Shotcraft (Mặt sàn đáy nét đứt $\rightarrow$ Nav $\rightarrow$ Banner $\rightarrow$ Thẻ cơ bản $\rightarrow$ Thẻ Du lịch + Vali 3D).
  * *Nghiệm thu Task 3.8:* User kiểm tra chiều sâu 3D và tách lớp.
- **Task 3.9: [ ] CHỜ THỰC HIỆN — Click Thẻ Du Lịch & Dolly-through Phóng Xuyên Sang Cảnh 3 (F1500 – F1620, ~2.0s):**
  * Con trỏ click nút *"So sánh ngay ➔"* trên thẻ Du lịch $\rightarrow$ Click ripple bừng sáng $\rightarrow$ Camera lao xuyên qua vali du lịch chuyển sang Cảnh 3.
  * *Nghiệm thu Task 3.9:* Hoàn tất chuyển cảnh Scene 2 sang Scene 3.

