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

### HỒI 2: DÒNG NĂNG LƯỢNG MŨI TÊN & CAMERA RIG 2.5D LƯỚT VÀO MACBOOK
*Thời gian: Frames 420 – 1020 (7.0s – 17.0s / 600 frames)*  
*Góc máy chủ đạo: Camera Pan Right & 2.5D Orbit (Pitch 8.5°, Yaw -4.0°, lia từ cụm thẻ sang màn hình MacBook).*

| Mốc Frame | Phân cảnh & Hành động | Hiệu ứng Chuyển động & Vật lý (Shotcraft & Three.js) |
| :--- | :--- | :--- |
| **420 – 600**<br>*(7.0s – 10.0s)* | **Vẽ Mũi tên Hồng & Luồng Năng Lượng Truyền Dẫn** | • Mũi tên cong màu hồng (`arrow.png`) mở ra từ cụm thẻ theo nét vẽ mask uốn lượn sang mép bàn phím laptop.<br>• **Dòng hạt năng lượng phát sáng (Energy Flow):** Một luồng hạt neon hồng tập trung chạy chuẩn xác dọc theo sống lưng mũi tên, truyền dữ liệu từ cụm thẻ cắm thẳng vào màn hình MacBook (không phân tán ra ngoài màn hình). |
| **600 – 1020**<br>*(10.0s – 17.0s)* | **Camera Orbit đặc tả Giao diện So Sánh trên MacBook** | • Camera Rig lia mượt (`Pan Tracking`) sang tâm màn hình MacBook.<br>• Màn hình Retina bừng sáng, hiển thị rõ ràng ma trận so sánh các gói bảo hiểm.<br>• Vệt quét sáng quang học chéo 18° (`Glaze Sheen`) lướt qua mặt kính màn hình. |

---

### HỒI 3: NHỊP THỞ TĨNH, BUNG TRANG WEB (POP-OUT UNFRAME) & ĐẠI CẢNH MỔ XẺ 3D (EXPLODED VIEW) TRỌNG TÂM PHẦN HEAD TRANG CHỦ
*Thời gian dự kiến: Frames 260 – 620 (~4.3s – 10.3s / 360 frames)*  
*Chuẩn kỹ thuật: 100% tuân thủ Recipe Card `space-camera-moves` (Exploded-view), `ExplodedView.tsx` và hệ thống SFX từ repo Video-Shotcraft.*

| Mốc Frame | Phân cảnh & Hành động | Hiệu ứng Chuyển động & Kỹ thuật Video-Shotcraft (Tuyệt đối không bịa đặt) |
| :--- | :--- | :--- |
| **260 – 360**<br>*(4.3s – 6.0s)* | **Nhịp thở tĩnh đại cảnh (Grand Hold)** | • Toàn bộ đại cảnh (5 thẻ bài, badge kính lúp, sàn mint, MacBook, iPhone, khiên 3D) an tọa vững vàng.<br>• Chuyển động bồng bềnh hữu cơ siêu nhẹ (`Math.sin`), không giật lag, giữ nhịp thở tĩnh để người xem thẩm thấu trọn vẹn bố cục 10/10 đẳng cấp. |
| **340 – 420**<br>*(5.6s – 7.0s)* | **Tiền chuyển cảnh: Cú búng tay Snap! thứ 2 $\rightarrow$ Dừng lại 1 nhịp (Hold 20f) $\rightarrow$ Vòng xoáy trung tâm Three.js (Co vào tâm & Bung 4 góc) $\rightarrow$ MacBook trực diện 90°** | • **Cú búng tay Snap! thứ 2 (F340 – F352):** Bàn tay áo hồng lấy đà và búng nảy dứt khoát tại F352, bung tỏa ngôi sao vàng rực rỡ và sóng xung kích ma thuật (SFX: `audio/sfx/transition/transition-snap.mp3`).<br>• **Dừng lại 1 nhịp (Hold 20 frames - F352 – F372):** Toàn bộ khung hình giữ nhịp dừng thở tĩnh, người xem thấy trọn vẹn tư thế búng tay và ánh sáng ngôi sao vàng.<br>• **Vòng xoáy trung tâm Three.js (Two-Phase Vortex - F372 – F415):**<br>&nbsp;&nbsp;▫ **Giai đoạn 1 (Co vào tâm - F372 – F396):** Vòng xoáy 3D ma thuật `VortexSwirl3D` (480 hạt photon phát quang Additive Blending) xoay tít tại tâm (`1920, 1080`), hút toàn bộ cụm 5 thẻ bài, badge kính lúp, iPhone, khiên hồng và đám mây xoay xoắn ốc co nhỏ về tâm (SFX: `audio/sfx/transition/whoosh-swirl.mp3`).<br>&nbsp;&nbsp;▫ **Giai đoạn 2 (Bung nổ ra 4 góc - F396 – F415):** Vòng xoáy nổ bùng ly tâm, bắn văng các item ra 4 góc màn hình rồi tan biến hoàn toàn, giải phóng trọn vẹn sân khấu!<br>• **NGOẠI TRỪ MACBOOK (Tâm bão tĩnh lặng):** MacBook cũ trượt sang tâm (F372 – F392), chuyển đổi mượt mà sang **MacBook góc trực diện 90°** (`macbook_front_90_transparent.png`, F386 – F415) an tọa vững vàng tại trung tâm màn hình, không bị xoáy cuốn đi.<br>• **SÁNG TẠO BUNG TRANG WEB (POP-OUT UNFRAME - F415 – F425):** Phần Head của trang chủ TOPbaohiem (`fullsize-trangchu.png`) nhấc bổng trục Z (`translateZ: +120px`), thoát ly khỏi khung máy MacBook, chuẩn bị bước vào đại cảnh mổ xẻ 3D! |
| **420 – 540**<br>*(7.0s – 9.0s)* | **ĐẠI CẢNH MỔ XẺ 3D (EXPLODED VIEW) TRỌNG TÂM TOÀN BỘ PHẦN "HEAD" TRANG CHỦ** | • **Chuyển trọng tâm 100% sang không gian Head trang chủ:** Hoàn toàn không dùng MacBook làm đối tượng nữa, mà lấy toàn bộ không gian **Head trang chủ TOPbaohiem** làm một Page Canvas 3D độc lập chuẩn video demo `exploded-view.mp4` và file gốc `ExplodedView.tsx`.<br>• **Tiếp quản góc quay 3/4 Axonometric (Axonometric 3/4 Orbit - F420 – F450):** Camera 3D của Shotcraft (`perspective: 2400`) bắt đầu nghiêng lật từ góc trực diện (`rotateX: 0° ➔ 54°`, `rotateZ: 0° ➔ -32°`) bằng đường cong `ramp(f, 420, 30, EASE.smooth)`. Camera lùi nhẹ `scale: 0.56 ➔ 0.47` và dịch chuyển tọa độ tâm `cy: 40px ➔ 180px` để nhường trọn không gian cho khối tầng Z bung lên.<br>• **MỔ XẺ 5 TẦNG UI THEO TRỤC Z (F420 – F460):** Áp dụng chuẩn công thức vật lý lò xo Shotcraft `springAt(f, EXPLODE + i * STAGGER, { damping: 15, stiffness: 120 })` với khoảng cách nhịp `STAGGER = 5 frames` (SFX: `audio/sfx/mech/mech-tech-movement.mp3` & `gear-lock-metallic.mp3`):<br>&nbsp;&nbsp;▫ **Tầng 0 (Sàn đáy Baseplate - Z: 0):** Tấm nền sàn Head bo góc $R = 26px$, hiển thị các khe cắm viền đứt (`dashed slot sockets`, `border: 3px dashed rgba(47,91,255,0.28)`) làm bệ đỡ kiến trúc.<br>&nbsp;&nbsp;▫ **Tầng 1 (Top Nav Header - Z: +140px):** Logo TOPbaohiem, Menu điều hướng sản phẩm, Hotline & Nút tra cứu nhanh.<br>&nbsp;&nbsp;▫ **Tầng 2 (Hero Banner & Cam kết - Z: +260px):** Banner gia đình an tâm, thông điệp bảo vệ toàn diện & 3 badge cam kết bồi thường minh bạch.<br>&nbsp;&nbsp;▫ **Tầng 3 (4 Thẻ Bảo Hiểm Cơ Bản - Z: +380px):** Cụm 4 thẻ vệ tinh (Sức khỏe, Ô tô, Xe máy, Nhà tư nhân) với thông số phí và quyền lợi bảo vệ.<br>&nbsp;&nbsp;▫ **Tầng 4 (Thẻ Du Lịch & Vali 3D Hero - Z: +520px):** Riêng **Thẻ Bảo hiểm Du lịch** cùng chiếc vali 3D hồng (`dulich.png`) vươn cao nhất, vali nổi thêm `+60px` trên mặt thẻ (tổng độ cao Z = 580px), tỏa hào quang hồng neon rực rỡ!<br>• **3 NEO CHIỀU SÂU VẬT LÝ SHOTCRAFT (DEPTH ANCHORS):**<br>&nbsp;&nbsp;1. **Bóng đổ đa tầng (Layered Drop Shadow):** Đổ chuẩn xác xuống mặt sàn đáy Baseplate theo công thức Shotcraft: `left = x + h * 0.18, top = y + h * 0.26, filter: blur(10 + h * 0.09px), opacity: (0.8 - h / 1400)`.<br>&nbsp;&nbsp;2. **Viền cạnh 3D dày thực thể (Thickness Edge):** Mỗi module khi bay lên đều có lớp đáy dày 8px màu `#b9c6de` bên dưới, tạo cảm giác khối linh kiện phần cứng công nghệ Apple.<br>&nbsp;&nbsp;3. **Khe cắm nét đứt (Dashed Slot Sockets):** Giữ nguyên các ô viền nét đứt trên sàn đáy tương ứng với từng module bay lên.<br>• **Chao lượn thị sai vi mô (Parallax Orbit - F450 – F530):** Trong lúc 5 tầng lơ lửng, camera chao nhẹ góc `rotateZ: -32° ➔ -22°` và `rotateX: 54° ➔ 50°` để người xem cảm nhận thị sai chiều sâu điện ảnh 3D cực kỳ đẳng cấp. |
| **540 – 620**<br>*(9.0s – 10.3s)* | **Con trỏ Chuột Click & Phóng lớn Dolly-through sang Cảnh 3** | • Con trỏ chuột macOS Vector lướt vào không gian 3D, click dứt khoát vào nút *"So sánh ngay ➔"* trên thẻ Du lịch (đang nổi ở tầng Z cao nhất).<br>• Vòng sóng hồng Click Ripple bùng nở $\rightarrow$ Thẻ Du lịch bừng sáng (SFX: `audio/sfx/ui/button-click.mp3` hoặc `audio/sfx/transition/transition-tech-slide.mp3`).<br>• Camera kích hoạt cú phóng xuyên (Dolly-through / Crash zoom qua chiếc vali du lịch, SFX: `audio/sfx/transition/whoosh-big.mp3`) $\rightarrow$ Nền chuyển sang biển xanh nhiệt đới, mở ra **Cảnh 3 (Du lịch phiêu lưu)**! |

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

### Nhóm Task 3: Nhịp Thở Tĩnh, Đại Cảnh Exploded View & Chuyển Cảnh 3
- **Task 3.1b: [ ] CHỜ THỰC HIỆN** — Khóa nhịp thở tĩnh toàn cảnh (Hold F260 – F360, ~1.7s) bồng bềnh hữu cơ thư thái.  
  *Nghiệm thu 3.1b:* Bạn kiểm tra độ mượt mà, tĩnh lặng và độ đầm của đại cảnh sau khi khiên tiếp đất.
- **Task 3.2: [ ] CHỜ THỰC HIỆN** — Tiền chuyển cảnh: Cú búng tay Snap! thứ 2 $\rightarrow$ Xoáy lốc ly tâm $\rightarrow$ MacBook trực diện 90° $\rightarrow$ **Bung trang web (Pop-out Unframe)** thoát ly vỏ máy & vỏ MacBook lùi sâu biến mất (F360 – F420).  
  *Nghiệm thu 3.2:* Bạn kiểm tra độ ma thuật của cú búng tay thứ 2, nhịp xoáy dọn sạch sân khấu, và khoảnh khắc phần Head trang chủ bung ra khỏi lòng MacBook êm ái và vỏ máy lùi biến mất.
- **Task 3.3: [ ] CHỜ THỰC HIỆN** — Cú Mổ xẻ 3D Exploded View tập trung vào không gian phần Head trang chủ (F420 – F540):
  * Thoát ly hoàn toàn vỏ MacBook, lấy toàn bộ không gian **Head trang chủ TOPbaohiem** làm Page Canvas 3D độc lập chuẩn video demo `exploded-view.mp4`.
  * Tiếp quản góc quay 3/4 Axonometric (`perspective: 2400`, `rotateX: 54° ➔ 50°`, `rotateZ: -32° ➔ -22°`).
  * Bung tách 5 tầng UI theo trục Z chuẩn công thức Shotcraft (Mặt sàn đáy có khe cắm nét đứt $\rightarrow$ Header $\rightarrow$ Banner $\rightarrow$ Thẻ cơ bản $\rightarrow$ Thẻ Du lịch + Vali 3D vươn cao nhất).
  * 3 Neo chiều sâu: Bóng đổ đa tầng theo độ cao Z + viền cạnh 3D dày 8px + khe cắm nét đứt ở đáy.  
  *Nghiệm thu 3.3:* Bạn kiểm tra độ sâu 3D, độ sắc nét và nhịp bung tách theo đúng video mẫu `exploded-view.mp4`.
- **Task 3.4: [ ] CHỜ THỰC HIỆN** — Con trỏ chuột lướt vào Click nút *"So sánh ngay ➔"* của thẻ Du lịch + Phóng lớn Dolly-through bay sang Cảnh 3 (F540 – F620).  
  *Nghiệm thu 3.4:* Bạn nghiệm thu toàn diện cú click và hiệu ứng xuyên màn hình sang Cảnh 3.

