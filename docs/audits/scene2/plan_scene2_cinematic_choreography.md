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

### HỒI 3: CHIẾC KHIÊN 3D TIẾP ĐẤT & TƯƠNG TÁC ĐỒNG BỘ ĐA MÀN HÌNH
*Thời gian: Frames 1020 – 1500 (17.0s – 25.0s / 480 frames)*  
*Góc máy chủ đạo: Center-Rebalance (Kéo nhẹ góc máy ra toàn cảnh, bao quát cả Laptop và iPhone).*

| Mốc Frame | Phân cảnh & Hành động | Hiệu ứng Chuyển động & Vật lý (Shotcraft) |
| :--- | :--- | :--- |
| **1020 – 1170**<br>*(17.0s – 19.5s)* | **Cú đáp đất Chiếc Khiên Hồng 3D (Impact Settle)** | • Chiếc khiên 3D (`khien.png`) từ độ cao trục Z phía trên hạ cánh uy lực xuống vị trí chân iPhone.<br>• Khi tiếp đất: khiên nén lún và nảy đàn hồi (Damping 14, Stiffness 110), 3 lớp bóng sàn nở rộng và cố định vững chãi.<br>• Dấu tick trắng `✓` giữa khiên phát sáng nhẹ một xung quang học. |
| **1170 – 1350**<br>*(19.5s – 22.5s)* | **Con trỏ Chuột tương tác thẻ "Bảo hiểm Du lịch"** | • Con trỏ chuột lướt vào màn hình MacBook, rê chuột chuẩn xác vào thẻ *"Bảo hiểm Du lịch"*.<br>• Thẻ trên màn hình nhấc bổng trục Z (`+12px`), tỏa viền hồng phát quang.<br>• Màn hình iPhone ở bên phải lập tức đồng bộ cuộn trang tới đúng mục Du lịch (chứng minh tính Responsive & Real-time Sync). |
| **1350 – 1500**<br>*(22.5s – 25.0s)* | **Đại cảnh Hoàn mỹ & Nhịp thở Đỉnh cao (Hold ≥ 2.5s)** | • Camera Rig giữ góc phối cảnh 3/4 sang trọng nhất.<br>• Không gian sạch bóng, tôn vinh tối đa độ sắc nét của từng thiết bị.<br>• Người xem thẩm thấu trọn vẹn sự chuyên nghiệp, tiện lợi của nền tảng TOPbaohiem. |

---

### GIAI ĐOẠN CHUYỂN GIAO: BƯỚC ĐỆM PHÓNG TO SANG CẢNH 3 (DU LỊCH)
*Thời gian: Frames 1500 – 1740 (25.0s – 29.0s / 240 frames)*  

- **Hành động chuyển cảnh:** Con trỏ chuột click vào nút *"So sánh ngay"* của gói Bảo hiểm Du lịch $\rightarrow$ Thẻ Du lịch phóng lớn bay ra khỏi màn hình laptop, xoay nhẹ theo trục Z tiến thẳng về phía ống kính camera $\rightarrow$ Nền trời chuyển sang bãi biển xanh, mở ra Cảnh 3.

---

## III. THIẾT KẾ KIẾN TRÚC CAMERA RIG 2.5D (VIDEO-SHOTCRAFT STANDARDS)

Để toàn bộ các thành phần tham gia vào không gian 3 chiều có chiều sâu thực:

```tsx
// Cấu hình không gian phối cảnh 3D
const cameraContainerStyle = {
    width: 3840,
    height: 2160,
    perspective: 2200,             // Chiều sâu phối cảnh chuẩn điện ảnh
    perspectiveOrigin: '50% 50%',
    transformStyle: 'preserve-3d',
    transform: `
        translateZ(${camZ}px)
        translateX(${camPanX}px)
        translateY(${camPanY}px)
        rotateX(${camPitchX}deg)   // Nghiêng chúc/ngửa 3D
        rotateY(${camYawY}deg)     // Xoay phối cảnh 3/4
        rotateZ(${camRollZ}deg)    // Nghiêng chân trời sống động
    `,
};
```

---

## IV. VAI TRÒ CHỌN LỌC CỦA THREE.JS WEBGL (KHÔNG GÂY NHIỄU MÀN HÌNH)

| Phân hệ Three.js | Đối tượng WebGL Cụ thể | Vai trò Thẩm mỹ & Kỹ thuật |
| :--- | :--- | :--- |
| **Energy Arrow Stream** | `THREE.CatmullRomCurve3D` + Hạt gia tốc | • Hàng chục hạt năng lượng laser chạy **chính xác dọc theo sống lưng mũi tên** `arrow.png`.<br>• Minh họa trực quan dòng dữ liệu truyền từ tay người dùng vào máy tính, **không văng hạt bừa bãi ra màn hình**. |
| **Specular Sheen Sweep** | Mesh chéo với Gradient Material bán trong suốt | • Vệt quét sáng chéo quang học qua mặt kính màn hình Retina của MacBook và iPhone tạo độ bóng kính sang trọng. |
| **Ambient Bokeh** | ❌ **ĐÃ LOẠI BỎ THEO YÊU CẦU** | • Triệt tiêu hoàn toàn để giữ màn hình sạch trong, sắc nét tuyệt đối. |

---

## V. LỘ TRÌNH THỰC THI CHIA NHỎ (MICRO-TASKS ROADMAP & NGHIỆM THU TẠI CHỖ)

Mỗi micro-task sau khi hoàn thiện sẽ dừng lại để **Người dùng trực tiếp test trên màn hình preview Remotion (`bun run dev`)** và phản hồi:

### Nhóm Task 1: Camera Rig & Hồi 1 (Tiền Cảnh Trái)
- **Task 1.1: [x] ĐÃ HOÀN THÀNH & NGHIỆM THU** — Thiết lập Virtual Camera Rig 2.5D bọc toàn bộ Scene (giữ nguyên 100% tọa độ tĩnh hiện tại).
- **Task 1.2: [x] ĐÃ HOÀN THÀNH & NGHIỆM THU** — Diễn hoạt cú búng tay Snap! của bàn tay áo hồng (nảy ngón tay, tia sáng sao `✨` xoay gia tốc, sóng hồng lan tỏa).
- **Task 1.3: [x] ĐÃ HOÀN THÀNH & NGHIỆM THU** — Diễn hoạt bung xòe 5 thẻ bài (`deck-deal-flyout` so le từng thẻ từ ngón tay + lực vung vòng cung parabol + nảy đàn hồi settle).
- **Task 1.4: [x] ĐÃ HOÀN THÀNH & NGHIỆM THU** — Diễn hoạt nảy lò xo Badge *"Tìm hiểu dễ dàng"* & kính lúp 3D (`pop-spring`) + Khóa nhịp thở tĩnh Hồi 1 (F190 - F420).

### Nhóm Task 2: Hồi 2 (Thiết Bị, Sóng Mint & Mũi Tên Năng Lượng)
- **Task 2.1: [x] ĐÃ TRIỂN KHAI XONG (ĐANG CHỜ BẠN TEST & NGHIỆM THU)** — Diễn hoạt dải sóng giấy mint dâng hữu cơ + MacBook & iPhone trượt vào tầm ngắm + bóng sàn nở theo nhịp đáp.  
  *Nghiệm thu 2.1:* Bạn kiểm tra trên preview Remotion xem nhịp dâng sóng và độ êm, đầm chắc khi trượt 2 thiết bị (MacBook & iPhone) vào sân khấu.
- **Task 2.2:** Diễn hoạt vẽ mũi tên hồng `arrow.png` + luồng năng lượng truyền dẫn sang laptop.  
  *Nghiệm thu 2.2:* Bạn kiểm tra đường cong mũi tên và dòng năng lượng.
- **Task 2.3:** Diễn hoạt Camera Pan & Orbit lướt sang màn hình MacBook đặc tả giao diện so sánh + vệt quét sáng quang học `Glaze Sheen`.  
  *Nghiệm thu 2.3:* Bạn kiểm tra độ mượt của cú lia máy và vệt sáng kính.

### Nhóm Task 3: Hồi 3 (Khiên 3D, Chuột Tương Tác & Chuyển Giao)
- **Task 3.1:** Diễn hoạt cú tiếp đất Chiếc khiên 3D hồng (`Impact Settle` rơi từ trục Z + đàn hồi + bóng sàn nở chặt).  
  *Nghiệm thu 3.1:* Bạn kiểm tra độ đầm chắc khi khiên đáp đất trước iPhone.
- **Task 3.2:** Diễn hoạt con trỏ chuột rê vào thẻ "Bảo hiểm Du lịch" trên MacBook + màn hình iPhone đồng bộ cuộn trang.  
  *Nghiệm thu 3.2:* Bạn kiểm tra tương tác chuột và tính đồng bộ Responsive.
- **Task 3.3:** Khóa nhịp thở tĩnh toàn cảnh (Hold $\ge 2.5s$) và tạo bước đệm phóng to thẻ Du lịch sẵn sàng sang Cảnh 3.  
  *Nghiệm thu 3.3:* Bạn nghiệm thu toàn diện Cảnh 2 để chốt chuyển sang Cảnh 3.
