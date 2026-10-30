# BẢNG AUDIT TOÀN DIỆN CẢNH 3: TRAVEL ADVENTURE (SHOT 3.1 ➔ SHOT 3.4 / 3.5)

> **Dự án:** Video quảng cáo hệ sinh thái công nghệ TOPbaohiem & InsureGO CMS  
> **Cấu hình:** Remotion 4K / 2K / 1080p @ 60 FPS · Thời lượng mục tiêu tối ưu: 14.0s (840 Frames = 12s nội dung + 2s kết cảnh)  
> **File chính:** `src/components/scenes/v2/Scene3_TravelAdventure.tsx`  
> **Branch Git:** `v2-canva` · Commit mới nhất: `7364971` *(Model 4 Argon — Nâng cấp 5 Hồi `video-shotcraft`)*  
> **Design gốc Canva:** Master Design `DAHXeqlNPGA` · Cảnh 3 Subproject `DAHZE9aKYm8` · Ảnh chuẩn: `slide4_travel.png`  
> **📌 Tài liệu Audit Nhịp độ (12s+2s) & Kế hoạch Nối tiếp Đa nhóm Bảo hiểm mới nhất:** Xem chi tiết tại [`audit_scene3_pacing_and_category_relay_plan.md`](file:///Users/phamminhtri/Desktop/project/quancao-topbaohiem/docs/audits/scene3/audit_scene3_pacing_and_category_relay_plan.md)

---

## I. TỔNG QUAN CẤU TRÚC 3 HỒI - 5 SHOT

```mermaid
timeline
    title LỘ TRÌNH DIỄN HOẠT CẢNH 3 (1200 FRAMES @ 60FPS)
    section HỒI 1 : KHỞI HÀNH (0s - 6s)
        Shot 3.1 (F0 - F360) : Cặp đôi bước vào ốc đảo bãi biển : Máy bay bay ngang : Bối cảnh bãi biển Paper-Cut mở ra
    section HỒI 2 : SỰ CỐ VUI NHỘN (6s - 7.5s)
        Shot 3.2 (F360 - F450) : Máy bay thổi lốc xoáy : Vali bung nắp & 7 đồ du lịch vọt lên : Lật tung nón đôi : Vịt choáng váng : Mặt trời cười khinh bỉ
    section HỒI 3 : HÓA GIẢI & VỀ ĐÍCH (7.5s - 20s)
        Shot 3.3 (F450 - F550) : Lực từ tính hút 7 đồ vào vali : Khiên hồng giáng thế : Sóng xung kích hào quang hồng : Mặt trời hòa hoãn
        Assemble (F502 - F575) : Cặp đôi chuyển sang Hero : Đổi thảm cát hạt mè nét : Bãi biển, đảo dừa, ghế hồng, phao vịt ráp vào tọa độ
        Shot 3.4 & 3.5 (F580 - F1200) : Camera về chuẩn 1.00 : Heading & Smartphone trượt vào : Mũi tên hồng chỉ nút CHỌN GÓI : Living diorama & CTA pulse
```

---

## II. MA TRẬN SO SÁNH CHI TIẾT TỪNG SHOT (SHOT 3.1 ➔ SHOT 3.5)

| Tiêu Chí                      | Shot 3.1: Khởi Hành (F0 - F360)                         | Shot 3.2: Sự Cố Hài Dón (F360 - F450)                    | Shot 3.3: Thu Hồi & Giáng Thế (F450 - F550)                             | Shot 3.4: Lắp Ráp & Cặp Đôi Hero (F502 - F580)                          | Shot 3.5: Chốt Hạ CTA & Smartphone (F600 - F1200)                                      |
| :---------------------------- | :------------------------------------------------------ | :------------------------------------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **Thời lượng**                | 0.0s – 6.0s (360 frames)                                | 6.0s – 7.5s (90 frames)                                  | 7.5s – 9.16s (100 frames)                                               | 8.36s – 9.66s (giao thoa)                                               | 10.0s – 20.0s (600 frames)                                                             |
| **Tâm điểm nhân vật**         | `couple.png` kéo vali hồng bước vào tươi tắn            | `cupple_lolang_3.png` ôm mặt hốt hoảng                   | Cặp đôi thở phào nhẹ nhõm, mờ dần nhường chỗ                            | `nguoi_nam.png` & `nguoi_nu.png` hiên ngang đứng trong khiên            | Cặp đôi Hero ngắm nhìn điện thoại, thở nhẹ tự nhiên (`idleBreath`)                     |
| **Bóng nhân vật**             | Bóng elip chiếu sàn dưới chân & 2 vali                  | Bóng elip mở rộng theo nhịp giật mình                    | Bóng cũ mờ dần theo `shockedCoupleFade`                                 | **Viền đen đế giày ôm khít** (`clipPath: polygon`) + Bóng chiếu sàn kép | Duy trì 100% bóng ôm khít đế giày + bóng sàn mềm mại                                   |
| **Trạng thái vali & hành lý** | Vali hồng đóng kín, 2 vali song hành                    | Nắp vali trái bung, 7 món đồ vọt lên bồng bềnh           | **Lực từ tính hút 7 món đồ** xoay nhẹ, thu nhỏ chui vào vali            | Vali hồng đứng cạnh chân bạn nam tiếp đất vững vàng                     | Vali hồng đứng chốt vị trí chuẩn ảnh mẫu Slide 4                                       |
| **Đạo cụ bãi biển**           | Bậc thang hồng 2 bên, đụn cát, ghế xanh, thảm tròn xanh | Giữ nguyên bối cảnh 3.1, chú vịt bị văng lên không trung | Bối cảnh 3.1 mờ dần (`oldDioramaFade`: 1 $\rightarrow$ 0)               | **Thảm cát hạt mè nét**, nước biển, đảo dừa, ghế hồng, phao vịt đáp đất | Toàn bộ ốc đảo bãi biển đạt trạng thái "Living diorama"                                |
| **Khiên bảo vệ**              | Chưa xuất hiện                                          | Chưa xuất hiện                                           | **Khiên hồng rơi từ trời cao**, nhún đàn hồi lò xo, phát sóng xung kích | Huy hiệu vali nhỏ & chữ _"Bảo hiểm du lịch"_ nảy nở trên đỉnh           | Khiên hồng làm khung bao bọc cặp đôi, ánh sáng rực rỡ                                  |
| **Mặt trời & Bầu trời**       | Mặt trời xoay tia sáng hiền hòa, 3 cụm mây trôi         | Mặt trời lật 3D cười đểu khinh bỉ, liếc mắt              | Nét cười đểu mờ dần, mặt trời dịu lại                                   | Mặt trời & 3 cụm mây trượt mượt mà về tọa độ 3.4                        | Mặt trời xoay nhẹ liên tục, mây trôi bồng bềnh 2.5D                                    |
| **Camera 2.5D**               | Pan nhẹ + Push-in Ambient (`scale: 1.03`)               | Rung nhẹ (`windShakeX/Y`) theo luồng gió                 | Rung tiếp đất (`shieldShakeY`) khi khiên chạm sàn                       | Mở rộng góc (`camTransitionScale` 1.03 $\rightarrow$ 1.00)              | Giữ vững `scale(1.0) translate(0,0)` tuyệt đối khớp Slide 4                            |
| **Giao diện thương mại**      | Chưa xuất hiện                                          | Chưa xuất hiện                                           | Chưa xuất hiện                                                          | Chưa xuất hiện                                                          | **Heading trái**, **Smartphone Mockup**, **Mũi tên hồng**, **Nút "CHỌN GÓI" đập nhịp** |

---

## III. CHI TIẾT KỸ THUẬT & GIẢI PHÁP ĐÃ GIẢI QUYẾT

### 1. Giải pháp bóng ôm khít đế giày & bóng thảm trung tâm (Pixel-Perfect Contact Shadows)

- **Bóng đế giày Bạn Nam:**
    ```tsx
    clipPath: 'polygon(0% 95.2%, 100% 95.2%, 100% 100%, 0% 100%)',
    filter: 'brightness(0) contrast(200%) blur(1.5px)',
    transform: 'translateY(1.8px) scaleX(1.01)',
    opacity: 0.95
    ```
- **Bóng đế giày Bạn Nữ:**
    ```tsx
    clipPath: 'polygon(0% 94.8%, 100% 94.8%, 100% 100%, 0% 100%)',
    filter: 'brightness(0) contrast(200%) blur(1.2px)',
    transform: 'translateY(1.6px) scaleX(1.01)',
    opacity: 0.95
    ```
- **Bóng viền ôm khít viền thảm trung tâm:**
    ```tsx
    filter: 'drop-shadow(0 4px 0 rgba(71, 85, 105, 0.45)) drop-shadow(0 14px 22px rgba(15, 23, 42, 0.40))';
    ```

---

### 2. Bộ lọc kết cấu hạt mè nét căng cho thảm cát (Dual-Threshold Sand Stipple Filter)

Khắc phục hiện tượng ảnh thảm gốc bị nhòa mờ làm nhân vật như nổi trôi, áp dụng 2 tầng SVG noise procedural:

- **Tầng hạt mè đen (`dotsDark_flow`):** `feTurbulence(baseFrequency="0.82 0.85")` + `feColorMatrix` dập ngưỡng gắt $\rightarrow$ `mixBlendMode: 'multiply'`, `opacity: 0.85`.
- **Tầng hạt mè trắng (`dotsLight_flow`):** `feTurbulence(baseFrequency="0.92 0.95")` + `feColorMatrix` dập ngưỡng sáng $\rightarrow$ `mixBlendMode: 'screen'`, `opacity: 0.65`.
- Kết quả: Bề mặt cát có độ đanh nét, sần tự nhiên của chất liệu giấy mỹ thuật cao cấp.

---

### 3. Chuỗi cơ học thu hồi từ tính & khiên giáng thế (Shot 3.3 Physics)

- **7 vật dụng thu hồi:**
    - Vé máy bay, hộ chiếu, áo thun, máy ảnh, túi clutch, sách, thỏi son được tính toán quỹ đạo lùi dần về tọa độ gốc vali trái (`left: 17.5%`, `top: 78.0%`).
    - Stagger delay từ F450 đến F475, thu nhỏ dần theo hàm `scale(itemScale)` và xoay đều 360° trước khi chui vào đáy vali.
- **Khiên hồng giáng thế (F470 - F550):**
    - Sử dụng spring physics `damping: 14, stiffness: 75, mass: 1.1`.
    - Quãng rơi từ `translateY(-1100px)` chạm đất tạo độ lún nảy đàn hồi (bounce back).
    - Kích hoạt sóng xung kích hào quang hồng `pulseScale` lan từ 0.2 đến 2.3 trong 40 frames.

---

### 4. Đồng bộ Camera 2.5D & Khử hoàn toàn giật cục (Zero-Deviation Camera)

- Tại Shot 3.1 & 3.2, camera có độ nhích nhẹ `scale(1.03)` để tạo chiều sâu diorama.
- Trong khoảng F510 – F580, hệ số bù camera `camTransitionScale` hạ mượt mà từ `1.0 / 1.03` về `1.0`.
- Từ Frame 580 đến 1200, camera xác lập chuẩn tuyệt đối `scale(1.0) translate(0px, 0px)`, đảm bảo 100% tọa độ của `STAGING_SHOT_3_4` khớp từng pixel với bản thiết kế gốc `slide4_travel.png`.

---

## IV. BẢN ĐỒ TÀI NGUYÊN HOÀN CHỈNH (ASSET AUDIT MATRIX)

| Asset File                          | Vai trò              |   Shot 3.1   |      Shot 3.2       |     Shot 3.3     |     Shot 3.4/3.5      | Trạng thái kỹ thuật  |
| :---------------------------------- | :------------------- | :----------: | :-----------------: | :--------------: | :-------------------: | :------------------- |
| `couple.png`                        | Cặp đôi đi dạo       |   **Hiện**   |         Ẩn          |        Ẩn        |          Ẩn           | Khớp 100%            |
| `cupple_lolang_3.png`               | Cặp đôi hoảng hốt    |      Ẩn      |      **Hiện**       |      Fading      |          Ẩn           | Khớp 100%            |
| `cupple_khong_mu.png`               | Cặp đôi bay nón      |      Ẩn      | **Hiện** (F376-418) |        Ẩn        |          Ẩn           | Khớp 100%            |
| `hat_tilted_clean.png`              | Nón bạn nữ bay lật   |      Ẩn      |   **Bay & Boing**   |        Ẩn        |          Ẩn           | Khớp 100%            |
| `mu_nam_tight.png`                  | Nón bạn nam bay lật  |      Ẩn      |   **Bay & Boing**   |        Ẩn        |          Ẩn           | Khớp 100%            |
| 7 Món hành lý du lịch               | Đồ đạc bay lơ lửng   |      Ẩn      |   **Lơ lửng 3D**    | **Hút vào vali** |          Ẩn           | Khớp 100%            |
| `khung_trung_tam.png`               | Khiên hồng bảo vệ    |      Ẩn      |         Ẩn          | **Rơi tiếp đất** |   **Cố định vững**    | Khớp 100%            |
| `khien_tren_khung_trungtam.png`     | Huy hiệu khiên vali  |      Ẩn      |         Ẩn          |  **Pop-in nảy**  |      **Cố định**      | Khớp 100%            |
| `tam_tham_trungtam.png`             | Thảm cát mới 3.4     |      Ẩn      |         Ẩn          |   **Bung nở**    |  **Có mè + bóng đế**  | Hoàn hảo             |
| `nguoi_nam.png`                     | Bạn nam Hero         |      Ẩn      |         Ẩn          |  **Xuất hiện**   |  **Có bóng ôm giày**  | Hoàn hảo             |
| `nguoi_nu.png`                      | Bạn nữ Hero          |      Ẩn      |         Ẩn          |  **Xuất hiện**   |  **Có bóng ôm giày**  | Hoàn hảo             |
| `nuoc_bien.png`                     | Sóng biển xếp lớp    |      Ẩn      |         Ẩn          |   **Dâng lên**   |   **Sóng bập bềnh**   | Khớp 100%            |
| `dao_giay.png`                      | Đảo dừa giấy trái    |      Ẩn      |         Ẩn          |  **Trượt vào**   | **Cố định hậu cảnh**  | Khớp 100%            |
| `ghehong.png`                       | Ghế bãi biển hồng    |      Ẩn      |         Ẩn          |   **Đáp đất**    | **Có bóng chân ghế**  | Khớp 100%            |
| `vali_hong.png`                     | Vali hồng đứng       |      Ẩn      |         Ẩn          |   **Đáp đất**    |  **Có bóng bánh xe**  | Khớp 100%            |
| `vit_vang.png` + `tham_cua_vit.png` | Vịt phao sọc hồng    |      Ẩn      |         Ẩn          |   **Đáp đất**    |   **Dập dềnh bơi**    | Khớp 100%            |
| `mat_troi.png`                      | Mặt trời Paper-Cut   | **Tia xoay** |    **Cười đểu**     |   **Hòa hoãn**   |    **Tia xoay êm**    | Trượt vị trí mượt mà |
| `may_1`, `may_2`, `may_3`           | 3 Tầng mây giấy      | **Parallax** |    **Parallax**     | **Trượt về 3.4** |   **Neo chuẩn 3.4**   | Trượt vị trí mượt mà |
| Smartphone UI + CTA                 | Điện thoại & Nút gói |      Ẩn      |         Ẩn          |        Ẩn        | **Trượt vào & Pulse** | Sẵn sàng cho Cảnh 4  |

---

## V. KIỂM ĐỊNH KỸ THUẬT & ĐỘ TIN CẬY (QUALITY VERIFICATION)

- [x] **TypeScript Typecheck:** `bun x tsc --noEmit` đạt mã thoát `0` (Zero errors).
- [x] **Remotion Test Still Renders:** Đã test render các khung hình then chốt `Frame 450`, `Frame 520`, `Frame 560`, `Frame 750` thành công 100%, không bị văng lỗi runtime.
- [x] **Git Cleanliness:** Toàn bộ mã nguồn đã được commit lên branch `v2-canva` với mã băm `57b79c0`.
- [x] **Static Preview Blueprint:** Thành phần `StaticStaging34` trong composition `Scene3-Shot34-Static` được bảo toàn nguyên vẹn để đối chiếu kiểm tra bất kỳ lúc nào.
- [x] **Continuous Playback:** Diễn hoạt liền mạch từ giây thứ 0 đến giây thứ 20 (F0 ➔ F1200) hoàn toàn không có cú cắt thô hay giật màn hình.
