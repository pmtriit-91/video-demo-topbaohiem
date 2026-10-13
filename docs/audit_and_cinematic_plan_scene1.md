# BÁO CÁO KIỂM TOÁN (AUDIT) & KẾ HOẠCH NÂNG CẤP ĐIỆN ẢNH SCENE 1
> **Dự án:** Video Quảng cáo InsurTech TOPbaohiem & InsureGO CMS (Remotion 4K/2K/1080p @ 60fps)  
> **Phân cảnh kiểm toán:** Scene 1 (`Băn khoăn → Búng tay` / `Scene1_ProblemSnap.tsx`)  
> **Tài liệu tham chiếu chuẩn quốc tế:** [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) (Kỹ nghệ làm phim quảng cáo sản phẩm công nghệ của Apple, Linear, ClickUp, Raycast, Framer...)

---

## I. KIỂM TOÁN HIỆN TRẠNG (AUDIT): THIẾT KẾ GỐC (ẢNH 1) vs VIDEO HIỆN TẠI (ẢNH 2)

Sau khi đối chiếu từng pixel giữa bản vẽ storyboard Canva và bản dựng Remotion thực tế, chúng ta xác định được 3 vấn đề thị giác cốt lõi:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SO SÁNH TRỰC QUAN                                                                      │
├────────────────────────────────────────────┬───────────────────────────────────────────┤
│ THIẾT KẾ GỐC CANVA (ẢNH 1)                 │ VIDEO HIỆN TẠI (ẢNH 2)                    │
├────────────────────────────────────────────┼───────────────────────────────────────────┤
│ • Nhân vật là "Hero Subject" to lớn,       │ • Nhân vật bị thu nhỏ quá mức (~45%       │
│   chiếm 75% chiều cao khung hình.          │   chiều cao), lơ lửng cách đáy 80px.      │
│ • Thân dưới chạm sát đáy màn hình.         │ • Nhìn như sticker nhỏ dán tạm bợ.        │
│ • Dải lụa xanh mint uốn lượn dâng cao ở    │ • Dải xanh mint bẹp dí ở đáy (380px),     │
│   trái (đỡ thẻ 3) và phải (đỡ MacBook).    │   màu quá nhạt (#E2F7F2) chìm vào nền.    │
│ • Không gian có cấu trúc "sân khấu 3 lớp". │ • Bố cục bị rỗng, thiếu trọng tâm.        │
└────────────────────────────────────────────┴───────────────────────────────────────────┘
```

### 1. Vấn đề 1: Đối tượng Nhân vật chính (Character Scale & Anchor)
* **Thực trạng trong code:**
  - Kích thước hiện tại: `width: 760, height: 1140` trên canvas 4K (`3840 x 2160`).
  - Vị trí: `bottom: 80, left: 1500`.
  - Thực tế chiều cao hiển thị chỉ đạt **~45% khung hình**, khiến nhân vật lọt thỏm giữa khoảng không gian mênh mông.
* **Tác động tiêu cực:**
  - Khán giả không nhìn rõ nét mặt biểu cảm (từ băn khoăn, nhíu mày sang tươi cười ngộ ra giải pháp).
  - Nhân vật không đóng được vai trò "trục liên kết" giữa nỗi đau (bên trái) và giải pháp công nghệ (bên phải).
* **Tiêu chuẩn cần đạt (theo Canva gốc):**
  - Chiều cao phải đạt **1550px – 1650px** (~75% khung hình 4K).
  - Điểm tiếp đất: `bottom: 0px` (thân dưới cắt ngang ngực/bụng dưới mép màn hình).
  - Đỉnh đầu nhân vật vươn cao ngang mép trên của Thẻ giấy số 1.
  - Cánh tay phải vươn sang che phủ một phần đế bàn phím MacBook, tạo sự gắn kết chặt chẽ về mặt không gian.

---

### 2. Vấn đề 2: Dải lụa xanh mint ở Bottom (Grounding Ribbon Plane)
* **Thực trạng trong code:**
  - Đang là 2 đường path SVG mỏng dẹt với `height: 380px`, `fill: #E2F7F2` (độ tương phản quá thấp so với nền kem trắng ngà).
  - Nằm bẹp ở đáy, không có mối liên hệ hình học nào với các phần tử xung quanh.
* **Bản chất trong thiết kế gốc Canva:**
  - Dải xanh mint không phải chỉ là "đồ trang trí cho vui", mà là **Mặt sàn phối cảnh (Visual Horizon Plane)**:
    1. **Mép trái dâng cao:** Bắt đầu từ tọa độ Y ~ 1450px (chiếm ~33% từ đáy lên), tạo bệ đỡ cho Thẻ giấy số 3.
    2. **Ở giữa võng xuống:** Uốn lượn mềm mại theo đường cong tự nhiên, ôm trọn lấy phần hông và lưng nhân vật.
    3. **Mép phải nâng lên:** Tạo thành một "bệ phóng/đế đỡ" cho chiếc laptop MacBook.
  - Màu sắc phải là tone xanh mint pastel tươi sáng, có độ no màu rõ rệt (`#BCEEE2` / `#9EE5D4`) kết hợp bóng đổ mềm mại (`drop-shadow`) để tách lớp rõ ràng.

---

### 3. Vấn đề 3: Tư duy Dựng phim — "Slide 2D phẳng" vs "Phim Quảng cáo Công nghệ"
* **Thực trạng:** 
  - Các phần tử hiện tại đang đi theo lối mòn: Cho từng thẻ trượt từ `translateX(-800)` vào `translateX(0)` rồi đứng yên.
  - Camera hoàn toàn bất động (Static 1-frame camera).
  - Đây là tư duy của **slide thuyết trình chuyển động**, khiến video có cảm giác "thụt lùi công nghệ", không thể hiện được tính hiện đại của một nền tảng InsurTech thế hệ mới.

---

## II. HỌC HỎI TỪ VIDEO-SHOTCRAFT: CÁC NGUYÊN LÝ ĐIỆN ẢNH VÀNG

Repo [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) cung cấp 124 shot recipes và bộ quy tắc thẩm mỹ (`aesthetic-rules.md`) được đúc kết từ các video quảng cáo phần mềm đỉnh cao. Chúng ta sẽ áp dụng các nguyên lý này trực tiếp vào Scene 1:

### 1. Bộ Quy tắc Thẩm mỹ Áp dụng cho Scene 1

| Mã quy tắc | Tên quy tắc trong Shotcraft | Ứng dụng cụ thể vào Scene 1 của TOPbaohiem |
| :--- | :--- | :--- |
| **Q5** | **Đơn chủ thể + Trục hành động trọn vẹn (Single Hero Subject Arc)** | Cảnh mở đầu phải tôn vinh **MỘT CHỦ THỂ DUY NHẤT** làm nhân vật dẫn đường. Nhân vật nam áo hồng là Hero, có hành trình cảm xúc trọn vẹn: *Băn khoăn (cầm điện thoại) → Nhìn thấy cơ hội → Búng tay khai sáng*. |
| **Q1 & Q10** | **Chất lượng Mockup chuẩn xuất bản (Publishing-grade UI)** | Màn hình MacBook không thể chỉ là khung xám vô hồn (`MOCK UI`). Phải có giao diện bảo hiểm trực quan, sắc nét (Search bar, thẻ gói bảo hiểm AIA/Prudential/Manulife...), tạo cảm giác một sản phẩm công nghệ thật đang hoạt động. |
| **Q7** | **Đặc tả 2.5D có khối lượng & góc nghiêng (2.5D Perspective Tilt)** | Chiếc laptop không nằm dẹt 2D mà có chiều sâu 2.5D (góc nghiêng `rotateY: -12deg`, `rotateX: 4deg`), tạo cảm giác một thiết bị vật lý sang trọng đang mở ra trước mắt người xem. |
| **R1 & R3** | **Nhịp thở sau khi tiếp đất & Thời lượng chủ thể ≥ 3s (Breathing & Pacing)** | Các thông tin câu hỏi rơi vào vị trí phải có nhịp tĩnh (hold) ít nhất 0.8s – 1s để người xem kịp đọc và thẩm thấu, không lướt qua quá vội vàng. |
| **R2** | **Vận tốc từ gia tốc vật lý (Physics & Accelerating Momentum)** | Không dùng chuyển động đều (`linear`). 3 tờ giấy thông tin khi xuất hiện phải rơi xuống với lực quán tính (Spring physics with overshoot), dội nhẹ như giấy thật rơi trên bàn. |
| **Q3 & R4** | **Camera ổn định, nói không với rung lắc nghiệp dư (Rock-solid Camera)** | Không dùng rung lắc handheld giả tạo. Mọi chuyển động máy quay đều là chuyển động mượt mà của thanh trượt (Dolly / Crane / Pan) có mục đích rõ ràng. |

---

## III. THIẾT KẾ ĐẠO DIỄN: KỊCH BẢN CHUYỂN ĐỘNG ĐA GÓC MÁY (MULTI-SHOT CHOREOGRAPHY)

Thay vì giữ 1 góc máy cố định trong suốt 6 giây, Scene 1 sẽ được vận hành qua **hệ thống Camera Ảo 3D (Virtual 3D Camera)** với 3 phân đoạn thị giác (Acts):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TIMELINE PHÂN CẢNH 1 (0s - 6.0s / 360 frames @ 60fps)                                 │
├────────────────────┬───────────────────────────────────┬───────────────────────────────┤
│ ACT 1 (0s - 2.0s)  │ ACT 2 (2.0s - 4.2s)               │ ACT 3 (4.2s - 6.0s)           │
│ BĂN KHOĂN DỒN DẬP  │ DẢI LỤA MỞ RA & MACBOOK 2.5D      │ CÚ BÚNG TAY KHAI SÁNG (SNAP)  │
├────────────────────┼───────────────────────────────────┼───────────────────────────────┤
│ • Camera Dolly-In  │ • Camera Tracking Pan Right       │ • Micro Lens Impact Punch     │
│   zoom 1.04x nhẹ.  │ • 2.5D Orbit góc nhìn sang Laptop.│ • Character Snap & Smile.     │
│ • Paper Drop cơ học│ • Laptop trượt vào với dải lụa    │ • Idea Bulb Starlight Burst.  │
│   theo nhịp beat.  │   Origami 3 lớp cuộn sóng.        │ • 3 thẻ giấy lùi Z-space fade.│
└────────────────────┴───────────────────────────────────┴───────────────────────────────┘
```

### Chi tiết từng Act:

#### Act 1: Băn khoăn Dồn dập (Frames 0 – 120 / 0s – 2.0s)
* **Góc máy:** Medium Shot hơi chếch về bên trái, camera di chuyển tới từ từ (**Dolly In** từ scale `1.00` lên `1.04`).
* **Hành động:**
  - Nhân vật chính khổng lồ xuất hiện ở trung tâm, nét mặt đắn đo suy nghĩ, cầm điện thoại.
  - Từng thẻ giấy note rơi xuống theo nhịp giật tự nhiên (**Paper Drop Effect**):
    - Frame 15: Thẻ 1 (`Chọn hãng nào?`) rơi xuống dập ghim đanh gọn.
    - Frame 35: Thẻ 2 (`Quyền lợi ra sao?`) dán đè washi tape hồng.
    - Frame 55: Thẻ 3 (`Thủ tục có phức tạp không?`) chạm đáy dải mint green.
  - Mỗi thẻ rơi xuống kèm một nhịp đàn hồi nhẹ (Spring damping: 14, stiffness: 120).

#### Act 2: Chuyển dịch Không gian & Khai mở Công nghệ (Frames 120 – 250 / 2.0s – 4.2s)
* **Góc máy:** **Camera Pan Right & Subtle 2.5D Orbit**.
  - Camera lia mượt sang phải và hơi hạ nhẹ góc nhìn, hướng sự chú ý của người xem từ màn hình điện thoại nhỏ sang màn hình MacBook lớn.
* **Hành động:**
  - Chiếc laptop MacBook trắng trượt vào từ bên phải với góc phối cảnh `perspective(1600px)` và `rotateY: -14deg → -4deg`.
  - Dải lụa xanh mint ở dưới đáy uốn sóng nhịp nhàng, nâng đỡ đế laptop.
  - Dải lụa Origami hồng phía sau bung nở (sẽ triển khai bóc tách 3 dải lướt theo yêu cầu sau).

#### Act 3: Khoảnh khắc Búng tay "Eureka!" (Frames 250 – 360 / 4.2s – 6.0s)
* **Góc máy:** **Center Re-focus & Lens Punch** (Camera giật nhẹ 1.02x ngay frame búng tay rồi spring êm về 1.0x).
* **Hành động:**
  - Nhân vật chuyển đổi biểu cảm sang tư thế búng tay tươi cười.
  - Bóng đèn ý tưởng (`idea.png`) nổ bung tia sáng (Starlight burst particles).
  - 3 tờ giấy note câu hỏi lùi dần vào chiều sâu Z (`translateZ: -100px`, `opacity: 0.2 → 0`) thể hiện nỗi lo toan đã được xóa bỏ hoàn toàn.
  - Sân khấu nhường trọn vẹn sự chú ý cho màn hình hệ sinh thái TOPbaohiem trên laptop.

---

## IV. BẢN VẼ THÔNG SỐ KỸ THUẬT (TECHNICAL BLUEPRINT)

### 1. Thông số Kích thước & Tọa độ Nhân vật (Canvas 3840 x 2160)
```tsx
// Cấu hình Hero Character mới:
const heroCharacterStyle = {
    position: 'absolute',
    bottom: 0,                     // Tiếp đất sát mép đáy màn hình
    left: 1440,                    // Đặt tại vị trí 37.5% chiều ngang (tâm điểm sân khấu)
    transform: 'translateX(-50%)',
    width: 1120,                   // Tăng độ rộng từ 760 -> 1120 (+47%)
    height: 1620,                  // Tăng chiều cao từ 1140 -> 1620 (~75% màn hình)
    zIndex: 4,
    filter: 'drop-shadow(0 35px 50px rgba(0,0,0,0.18)) drop-shadow(0 10px 20px rgba(225,29,72,0.15))',
};
```

### 2. Thông số Dải lụa Xanh Mint (Organic Mint Horizon)
```tsx
// Dải xanh mint mới: Cao độ lượn sóng từ trái qua phải
const mintWaveSvgPath = `
    M 0, 1420 
    C 450, 1420   850, 1780   1440, 1850 
    C 2000, 1920  2600, 1580  3300, 1540 
    C 3600, 1520  3780, 1600  3840, 1620 
    L 3840, 2160  L 0, 2160   Z
`;
// Màu sắc: Layer 1: #BCEEE2 (đậm, tươi), Layer 2: #D8F7F0 (bổ trợ chiều sâu)
```

---

## V. KẾ HOẠCH HÀNH ĐỘNG (ACTION PLAN) & CÁC BƯỚC THỐNG NHẤT

Để đảm bảo chuẩn xác từng bước và tuân thủ nguyên tắc cộng tác chặt chẽ:

1. **Bước 1: Tinh chỉnh Bố cục Tĩnh (Layout Foundation)**
   - Nâng cấp kích thước nhân vật áo hồng lên tỷ lệ 75% (`height: 1620px`, `bottom: 0`).
   - Tái tạo đường cong vector dải xanh mint với cao độ chuẩn xác ôm trọn bố cục.
   - Kiểm tra lại sự tương quan giữa Thẻ giấy 1-2-3, Nhân vật, và MacBook trên màn hình preview.
2. **Bước 2: Xây dựng Camera Rig Ảo 3D (Shotcraft Camera Rig)**
   - Bọc toàn bộ scene trong `CameraContainer` với các biến nội suy: `cameraScale`, `cameraPanX`, `cameraTiltY`.
   - Lập trình nhịp máy quay chuyển dịch từ Act 1 (cận cảnh băn khoăn) sang Act 2 (đặc tả laptop).
3. **Bước 3: Hiệu ứng Máy bay giấy & Cú búng tay (Deferred to Stage 3)**
   - Sau khi bạn nghiệm thu bố cục và camera của Bước 1 & 2, chúng ta sẽ bắt tay vào hiệu ứng bóc tách 3 dải lụa máy bay giấy (`maybay_giay.png`) và particle nổ bừng sáng lúc búng tay.

---

## VI. NHẬT KÝ THỰC THI BƯỚC 1 (STEP 1 EXECUTION LOG)

Đã hoàn thành và tinh chỉnh toàn diện Bước 1 theo phản hồi thực tế:
1. **Hero Character Upgrade:**
   - Kích thước nhân vật tăng lên `1020 x 1650px` (~76% chiều cao 4K), neo đáy `bottom: 0px`.
   - Cánh tay phải nhân vật gác tự nhiên lên góc trái đế MacBook, loại bỏ hoàn toàn cảm giác sticker lơ lửng.
2. **Organic Mint Ribbon Horizon:**
   - Thiết kế lại dải lụa sóng mint 2 lớp với cao độ đỉnh 1420px (nâng đỡ Thẻ 3) và dốc lên 1560px (đỡ MacBook).
3. **Cụm Dẫn Chuyện (Narrative Hook - Phương án A):**
   - Loại bỏ hoàn toàn khối chip trắng rỗng ở những frame đầu tiên (`charCount > 0 && frame >= 10`).
   - Kiểu chữ Typewriter sắc nét, thanh thoát hiển thị trực tiếp trên nền giấy kem ngà.
   - Tag nhãn dán `NHƯNG...` dập nổ bằng Washi tape đỏ hồng tại frame 72, sau đó cả cụm nhẹ nhàng lướt lên vị trí tiêu đề đỉnh (`Y: 130px`).
4. **Loại bỏ Hoàn toàn Cụm Chip Đen ở Chân màn hình:**
   - Đã xóa dứt điểm thanh phụ đề voice-over ở chân màn hình, trả lại không gian thoáng đãng, sang trọng cho toàn bộ bố cục.

