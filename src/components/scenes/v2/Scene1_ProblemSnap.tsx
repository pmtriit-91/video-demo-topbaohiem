import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, Img, Easing } from 'remotion';
import { Search, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';
import { DropdownStackPress } from './DropdownStackPress';
import { WarpHyperdrive3D } from '../../3d/WarpHyperdrive3D';
import { TopLeftWebsiteBackdrop3D } from './TopLeftWebsiteBackdrop3D';

export const Scene1_ProblemSnap: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    // Chuẩn hóa hệ quy chiếu 4K chuẩn (3840 x 2160) để mọi độ phân giải 1080p / 2K / 4K đều đồng nhất 100%
    const baseWidth = 3840;
    const baseHeight = 2160;
    const scale = width / baseWidth;

    // =========================================================================
    // 0. CỤM HOOK DẪN CHUYỆN: "Muốn mua bảo hiểm online," -> "NHƯNG..."
    // =========================================================================
    const fullPrefixText = 'Muốn mua bảo hiểm online,';
    const typingProgress = interpolate(frame, [10, 65], [0, fullPrefixText.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const charCount = Math.floor(typingProgress);
    const typedText = fullPrefixText.slice(0, charCount);
    const showCursor = charCount > 0 && frame < 72 && Math.floor(frame / 6) % 2 === 0;

    // Fade-in êm ái cho cụm dẫn chuyện ngay khi bắt đầu gõ (không xuất hiện chip trắng rỗng ở frame 0)
    const hookEntranceOpacity = interpolate(frame, [10, 16], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chữ "NHƯNG..." bùng nổ ở Frame 72
    const punchSpring = spring({
        frame: Math.max(0, frame - 72),
        fps,
        config: { damping: 9, mass: 0.45, stiffness: 180 },
    });

    // Yahoo Buzz Shake chấn động nhẹ tần số cao tắt dần
    const buzzElapsed = frame - 72;
    const isBuzzing = buzzElapsed >= 0 && buzzElapsed < 24;
    const buzzDecay = isBuzzing ? Math.pow(1 - buzzElapsed / 24, 1.8) : 0;
    const buzzX = isBuzzing ? Math.sin(buzzElapsed * 3.8) * buzzDecay * 16 : 0;
    const buzzY = isBuzzing ? Math.cos(buzzElapsed * 4.4) * buzzDecay * 10 : 0;
    const buzzRot = isBuzzing ? Math.sin(buzzElapsed * 3.2) * buzzDecay * 2.5 : 0;

    // Quỹ đạo lướt từ Trung tâm lên Đỉnh (Docking to Top Header: Frames 135 -> 175)
    const dockSpring = spring({
        frame: Math.max(0, frame - 135),
        fps,
        config: { damping: 14, mass: 0.9, stiffness: 65 },
    });
    const hookY = interpolate(dockSpring, [0, 1], [940, 130]);
    const hookScale = interpolate(dockSpring, [0, 1], [1.18, 0.88]);

    // 0.2. HIỆU ỨNG DẢI SÓNG GIẤY XANH MINT Ở ĐÁY (Phương án B: Dynamic Surge + Bézier Morphing)
    const waveEntrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 70 },
    });
    const waveEntranceY = interpolate(waveEntrance, [0, 1], [300, 0]);
    const waveFloatY = Math.sin(frame * 0.035) * 6;
    const waveLayer2FloatX = Math.cos(frame * 0.03) * 18;

    // A. Sóng cuộn dập dờn điều hòa tuần hoàn (Harmonic Undulation)
    const waveL1_left = Math.sin(frame * 0.045) * 18;
    const waveL1_mid = Math.sin(frame * 0.04 + 1.3) * 28;
    const waveL1_right = Math.cos(frame * 0.042 + 0.6) * 24;

    const waveL2_left = Math.sin(frame * 0.038 + 1.8) * 16;
    const waveL2_mid = Math.sin(frame * 0.044 + 2.7) * 26;
    const waveL2_right = Math.cos(frame * 0.036 + 1.9) * 22;

    // B. Sóng trào điểm nhấn cao trào (Dynamic Surge Events):
    // 1. Surge khi MacBook trượt vào từ phải (Frames 365 - 435): Sóng phải dâng trào đón laptop
    // 1. Surge khi MacBook trượt vào từ phải (Frames 160 - 230): Sóng phải dâng trào đón laptop
    const mbSurgeProgress = Math.max(0, Math.min(1, (frame - 160) / 60));
    const mbSurge = frame >= 160 && frame <= 230 ? Math.sin(mbSurgeProgress * Math.PI) * -52 : 0;
    const mbSurgeL2 = frame >= 160 && frame <= 230 ? Math.sin(mbSurgeProgress * Math.PI) * -35 : 0;

    // 2. MỐC NHỊP BÚNG TAY EUREKA (Chuyển sang giải pháp sau khi toàn cảnh băn khoăn diễn ra chậm rãi, thư thả)
    const EUREKA_START_FRAME = 630;

    // Surge khi búng tay Eureka Snap! (Frames EUREKA_START_FRAME -> +70): Sóng cuộn trào lan tỏa toàn màn hình
    const snapSurgeProgress = Math.max(0, Math.min(1, (frame - EUREKA_START_FRAME) / 60));
    const snapSurgeMid =
        frame >= EUREKA_START_FRAME && frame <= EUREKA_START_FRAME + 70
            ? Math.sin(snapSurgeProgress * Math.PI) * -45
            : 0;
    const snapSurgeSides =
        frame >= EUREKA_START_FRAME && frame <= EUREKA_START_FRAME + 70
            ? Math.sin(snapSurgeProgress * Math.PI) * -28
            : 0;

    // C. Tọa độ động cho Layer 1 (Tiền cảnh)
    const l1_p0_y = 220 + waveL1_left + snapSurgeSides * 0.5;
    const l1_c1_y = 230 + waveL1_left * 0.9 + snapSurgeSides * 0.6;
    const l1_c2_y = 520 + waveL1_mid * 0.8 + snapSurgeMid * 0.7;
    const l1_p1_y = 660 + waveL1_mid + snapSurgeMid; // Trũng giữa dưới chân Hero

    const l1_c3_y = 780 + waveL1_mid * 0.7 + snapSurgeMid * 0.8;
    const l1_c4_y = 420 + waveL1_right * 0.8 + mbSurge * 0.7;
    const l1_p2_y = 360 + waveL1_right + mbSurge; // Đỉnh đỡ MacBook

    const l1_c5_y = 320 + waveL1_right * 0.9 + mbSurge * 0.8;
    const l1_c6_y = 370 + waveL1_right * 0.7 + mbSurge * 0.5;
    const l1_p3_y = 390 + waveL1_right * 0.5 + mbSurge * 0.4;

    const pathWaveLayer1 = `M 0, ${l1_p0_y.toFixed(1)} C 420, ${l1_c1_y.toFixed(1)} 880, ${l1_c2_y.toFixed(1)} 1520, ${l1_p1_y.toFixed(1)} C 2100, ${l1_c3_y.toFixed(1)} 2650, ${l1_c4_y.toFixed(1)} 3180, ${l1_p2_y.toFixed(1)} C 3520, ${l1_c5_y.toFixed(1)} 3740, ${l1_c6_y.toFixed(1)} 3840, ${l1_p3_y.toFixed(1)} L 3840, 960 L 0, 960 Z`;
    const crestLineLayer1 = `M 0, ${l1_p0_y.toFixed(1)} C 420, ${l1_c1_y.toFixed(1)} 880, ${l1_c2_y.toFixed(1)} 1520, ${l1_p1_y.toFixed(1)} C 2100, ${l1_c3_y.toFixed(1)} 2650, ${l1_c4_y.toFixed(1)} 3180, ${l1_p2_y.toFixed(1)} C 3520, ${l1_c5_y.toFixed(1)} 3740, ${l1_c6_y.toFixed(1)} 3840, ${l1_p3_y.toFixed(1)}`;

    // D. Tọa độ động cho Layer 2 (Hậu cảnh - lệch pha)
    const l2_p0_y = 280 + waveL2_left;
    const l2_c1_y = 290 + waveL2_left * 0.9;
    const l2_c2_y = 540 + waveL2_mid * 0.8;
    const l2_p1_y = 620 + waveL2_mid + snapSurgeMid * 0.7;

    const l2_c3_y = 700 + waveL2_mid * 0.7 + snapSurgeMid * 0.5;
    const l2_c4_y = 380 + waveL2_right * 0.8 + mbSurgeL2 * 0.7;
    const l2_p2_y = 320 + waveL2_right + mbSurgeL2;

    const l2_c5_y = 280 + waveL2_right * 0.9 + mbSurgeL2 * 0.8;
    const l2_c6_y = 320 + waveL2_right * 0.7 + mbSurgeL2 * 0.5;
    const l2_p3_y = 340 + waveL2_right * 0.5 + mbSurgeL2 * 0.4;

    const pathWaveLayer2 = `M 0, ${l2_p0_y.toFixed(1)} C 450, ${l2_c1_y.toFixed(1)} 900, ${l2_c2_y.toFixed(1)} 1480, ${l2_p1_y.toFixed(1)} C 2050, ${l2_c3_y.toFixed(1)} 2600, ${l2_c4_y.toFixed(1)} 3150, ${l2_p2_y.toFixed(1)} C 3500, ${l2_c5_y.toFixed(1)} 3720, ${l2_c6_y.toFixed(1)} 3840, ${l2_p3_y.toFixed(1)} L 3840, 960 L 0, 960 Z`;

    // 0.3. ENTRANCE CỦA DẢI CÁNH MÁY BAY GIẤY ORIGAMI PHÍA PHẢI (Xuất hiện đồng điệu cùng nhịp búng tay Eureka tông hồng: Frame EUREKA_START_FRAME+)
    const maybayEntrance = spring({
        frame: Math.max(0, frame - EUREKA_START_FRAME),
        fps,
        config: { damping: 14, mass: 0.85, stiffness: 70 },
    });
    const maybaySlideX = interpolate(maybayEntrance, [0, 1], [850, 0]);
    const maybayOpacity = interpolate(maybayEntrance, [0, 1], [0, 1]);
    const maybayScale = interpolate(maybayEntrance, [0, 1], [0.88, 1]);

    // 0.5. HIỆU ỨNG LAPTOP MACBOOK MOCK UI (Xuất hiện cùng nhịp với trang giấy câu hỏi đầu tiên: Frame 160+)
    const laptopEntrance = spring({
        frame: frame - 160,
        fps,
        config: { damping: 14, stiffness: 50 },
    });
    const laptopSlideX = interpolate(laptopEntrance, [0, 1], [500, 0]);
    const laptopRotateY = interpolate(laptopEntrance, [0, 1], [-14, 0]);
    const laptopOpacity = interpolate(laptopEntrance, [0, 1], [0, 1]);
    const laptopFloatY = Math.sin(frame * 0.04 + 1.2) * 8;
    const laptopTilt = Math.cos(frame * 0.03 + 0.5) * 0.6;

    // Stop-motion frame jitter nhẹ mô phỏng hoạt hình giấy thủ công 12fps/24fps feel
    const jitterX = Math.sin(frame * 0.4) * 2;
    const jitterY = Math.cos(frame * 0.3) * 2;

    // 0.8. ENTRANCE CỦA NHÂN VẬT HERO CHỦ THỂ (Dâng lên tiếp đất sát đáy khi hook lướt lên đỉnh)
    const charEntranceSpring = spring({
        frame: Math.max(0, frame - 125),
        fps,
        config: { damping: 16, mass: 0.95, stiffness: 75 },
    });
    const charEntranceY = interpolate(charEntranceSpring, [0, 1], [400, 0]);
    const charEntranceOpacity = interpolate(charEntranceSpring, [0, 1], [0, 1]);

    // 1. NHỊP 1: 3 THẺ CÂU HỎI RƠI TRỌNG LỰC 2.5D & VẬT LÝ GIẤY THỦ CÔNG (CHẬM RÃI, THƯ THẢ TOÀN CẢNH)
    // Thẻ 1: Rơi từ frame 160 (chao liệng ~40f), ghim kẹp dập đanh tại frame 205 (dừng đọc thư thả đến 275)
    const card1Spring = spring({
        frame: frame - 160,
        fps,
        config: { damping: 14, mass: 1.15, stiffness: 45 },
    });
    const clip1Spring = spring({
        frame: frame - 205,
        fps,
        config: { damping: 9, mass: 0.6, stiffness: 130 },
    });
    const card1Y = interpolate(card1Spring, [0, 1], [-480, 0]);
    const card1X = interpolate(card1Spring, [0, 1], [-90, 0]);
    const card1RotX = interpolate(card1Spring, [0, 1], [42, 0]);
    const card1RotY = interpolate(card1Spring, [0, 1], [-24, 0]);
    const card1Scale = interpolate(card1Spring, [0, 1], [1.18, 1]);
    const card1Flutter = Math.sin(Math.max(0, frame - 160) * 0.18) * (1 - Math.min(1, card1Spring)) * 16;
    const card1Opacity = interpolate(card1Spring, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
    const clip1Y = interpolate(clip1Spring, [0, 1], [-140, 0]);
    const clip1Scale = interpolate(clip1Spring, [0, 0.4, 1], [1.45, 0.94, 1]);
    const clip1Opacity = interpolate(clip1Spring, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });

    // Thẻ 2: Rơi từ frame 275 (chao liệng ~40f), băng dính hồng dán đè tại frame 320 (dừng đọc thư thả đến 395)
    const card2Spring = spring({
        frame: frame - 275,
        fps,
        config: { damping: 14, mass: 1.15, stiffness: 45 },
    });
    const tape2Spring = spring({
        frame: frame - 320,
        fps,
        config: { damping: 10, mass: 0.7, stiffness: 120 },
    });
    const card2Y = interpolate(card2Spring, [0, 1], [-500, 0]);
    const card2X = interpolate(card2Spring, [0, 1], [-110, 0]);
    const card2RotX = interpolate(card2Spring, [0, 1], [44, 0]);
    const card2RotY = interpolate(card2Spring, [0, 1], [-20, 0]);
    const card2Scale = interpolate(card2Spring, [0, 1], [1.18, 1]);
    const card2Flutter = Math.sin(Math.max(0, frame - 275) * 0.18) * (1 - Math.min(1, card2Spring)) * 16;
    const card2Opacity = interpolate(card2Spring, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
    const tape2Scale = interpolate(tape2Spring, [0, 0.35, 1], [1.4, 0.95, 1]);
    const tape2Opacity = interpolate(tape2Spring, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });

    // Thẻ 3: Rơi từ frame 395 (chao liệng ~40f), băng dính xanh dán đè tại frame 440 (dừng đọc thư thả đến 520)
    const card3Spring = spring({
        frame: frame - 395,
        fps,
        config: { damping: 14, mass: 1.15, stiffness: 45 },
    });
    const tape3Spring = spring({
        frame: frame - 440,
        fps,
        config: { damping: 10, mass: 0.7, stiffness: 120 },
    });
    const card3Y = interpolate(card3Spring, [0, 1], [-520, 0]);
    const card3X = interpolate(card3Spring, [0, 1], [-100, 0]);
    const card3RotX = interpolate(card3Spring, [0, 1], [45, 0]);
    const card3RotY = interpolate(card3Spring, [0, 1], [-22, 0]);
    const card3Scale = interpolate(card3Spring, [0, 1], [1.18, 1]);
    const card3Flutter = Math.sin(Math.max(0, frame - 395) * 0.18) * (1 - Math.min(1, card3Spring)) * 16;
    const card3Opacity = interpolate(card3Spring, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });
    const tape3Scale = interpolate(tape3Spring, [0, 0.35, 1], [1.4, 0.95, 1]);
    const tape3Opacity = interpolate(tape3Spring, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' });

    // Chuyển động thở của nhân vật
    const charBreathing = Math.sin(frame * 0.08) * 8;
    const charScale = 1 + Math.sin(frame * 0.06) * 0.015;

    // 2. NHỊP 2: Ý TƯỞNG EUREKA BÙNG SÁNG (Búng tay Snap tìm ra giải pháp: Frame 525 - 690 ~ 8.75s - 11.5s)
    const eurekaFrame = frame - EUREKA_START_FRAME;
    const eurekaSpring = spring({
        frame: eurekaFrame,
        fps,
        config: { damping: 11, stiffness: 150 },
    });
    const starRotation = (frame * 2.5) % 360;

    // 2.5. HOẠT CẢNH MÀN HÌNH MACBOOK THEO CONCEPT MINH HỌA (SEARCH CAPSULE + SPINNER + DẤU HỎI ? BĂN KHOĂN)
    // A. Entrance của thanh tìm kiếm nổi 2.5D (khi laptop bắt đầu vào sân khấu cùng Thẻ 1: Frame 170+)
    const searchEntranceSpring = spring({
        frame: Math.max(0, frame - 170),
        fps,
        config: { damping: 13, mass: 0.8, stiffness: 110 },
    });

    // B. ĐỒNG BỘ NỘI DUNG THANH TÌM KIẾM TƯƠNG ỨNG TỪNG MẪU GIẤY (CHẬM RÃI, THƯ THẢ TOÀN CẢNH):
    // - Phase 1 (Frame 170 -> 274): Thẻ 1 xuất hiện -> gõ "Mua ở đâu uy tín?" (~105 frames ~ 1.75s)
    // - Phase 2 (Frame 275 -> 394): Thẻ 2 xuất hiện -> gõ "Quyền lợi ra sao?" (~120 frames = 2.0s)
    // - Phase 3 (Frame 395 -> 519): Thẻ 3 xuất hiện -> gõ "Thủ tục có phức tạp không?" (~125 frames ~ 2.08s)
    // - Phase 4 (Frame 520 -> 629): Chốt hạ băn khoăn -> quay lại "Mua bảo hiểm online ở đâu uy tín?" kéo dài 1.83s (110 frames) rồi mới sang nhịp búng tay
    let typedSearchQuery = '';
    let isTypingActive = false;

    if (frame < 170) {
        typedSearchQuery = '';
        isTypingActive = false;
    } else if (frame < 275) {
        // Thẻ 1: "Mua ở đâu uy tín?"
        const text1 = 'Mua ở đâu uy tín?';
        const p1 = Math.floor(
            interpolate(frame, [175, 215], [0, text1.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }),
        );
        typedSearchQuery = text1.slice(0, p1);
        isTypingActive = frame >= 175 && frame < 275;
    } else if (frame < 395) {
        // Thẻ 2: "Quyền lợi ra sao?"
        const text2 = 'Quyền lợi ra sao?';
        const p2 = Math.floor(
            interpolate(frame, [285, 325], [0, text2.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }),
        );
        typedSearchQuery = text2.slice(0, p2);
        isTypingActive = frame >= 285 && frame < 395;
    } else if (frame < 520) {
        // Thẻ 3: "Thủ tục có phức tạp không?" (Kéo dài đọc thoải mái thư thả)
        const text3 = 'Thủ tục có phức tạp không?';
        const p3 = Math.floor(
            interpolate(frame, [405, 450], [0, text3.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }),
        );
        typedSearchQuery = text3.slice(0, p3);
        isTypingActive = frame >= 405 && frame < 520;
    } else {
        // Sau khi mẫu giấy cuối dán xong & đọc trọn vẹn: Quay lại câu hỏi chốt tổng quát (Frame 520 -> 630, đúng 1.83s ~ 110 frames rồi mới sang búng tay)
        const textFinal = 'Mua bảo hiểm online ở đâu uy tín?';
        const pFinal = Math.floor(
            interpolate(frame, [525, 565], [0, textFinal.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
            }),
        );
        typedSearchQuery = textFinal.slice(0, pFinal);
        isTypingActive = frame >= 525 && frame < EUREKA_START_FRAME;
    }

    const showSearchCursor = isTypingActive && Math.floor(frame / 6) % 2 === 0;

    // C. Lần lượt 4 dấu chấm hỏi ? nảy ra đồng điệu cùng 3 mẫu giấy & câu hỏi chốt
    const q1Spring = spring({
        frame: Math.max(0, frame - 190),
        fps,
        config: { damping: 10, mass: 0.7, stiffness: 130 },
    });
    const q2Spring = spring({
        frame: Math.max(0, frame - 305),
        fps,
        config: { damping: 10, mass: 0.7, stiffness: 130 },
    });
    const q3Spring = spring({
        frame: Math.max(0, frame - 425),
        fps,
        config: { damping: 10, mass: 0.7, stiffness: 130 },
    });
    const q4Spring = spring({
        frame: Math.max(0, frame - 535),
        fps,
        config: { damping: 10, mass: 0.7, stiffness: 130 },
    });

    // C. Dao động băn khoăn chao đảo 2.5D của các dấu hỏi
    const qFloat1 = Math.sin(frame * 0.12) * 8;
    const qRot1 = Math.cos(frame * 0.09) * 5;
    const qFloat2 = Math.sin(frame * 0.11 + 1.2) * 6;
    const qRot2 = Math.cos(frame * 0.08 + 1.0) * -5;
    const qFloat4 = Math.sin(frame * 0.1 + 2.5) * 6;

    // D. Chuyển tiếp khi Búng tay / Eureka: cụm băn khoăn tan biến, giải pháp TOPBAOHIEM hiện lên
    const confusionExitOpacity = interpolate(eurekaSpring, [0, 0.4], [1, 0], {
        extrapolateRight: 'clamp',
    });
    const confusionExitScale = interpolate(eurekaSpring, [0, 1], [1, 0.65], {
        extrapolateRight: 'clamp',
    });
    const solutionEntranceSpring = spring({
        frame: Math.max(0, frame - (EUREKA_START_FRAME + 4)),
        fps,
        config: { damping: 12, mass: 0.8, stiffness: 120 },
    });

    // =========================================================================
    // 2.7. HERO SEARCH CAPSULE (Frames 725 -> 955)
    // - Sau cú búng tay Eureka (Frame 630): DỪNG ĐÚNG 1 NHỊP 1.5S (Frames 630 -> 720 = 90 frames)
    //   để người xem chiêm ngưỡng dải cánh máy bay giấy Origami và bóng đèn ý tưởng bay ra!
    // =========================================================================
    // A. Nảy ra của thanh Hero Search Capsule cỡ lớn giữa màn hình (Frame 725+)
    const heroSearchEntrance = spring({
        frame: Math.max(0, frame - 725),
        fps,
        config: { damping: 14, mass: 0.85, stiffness: 120 },
    });

    // C. Typewriter gõ link "https://topbaohiem.vn" (Frames 755 -> 870: nhịp gõ đĩnh đạc, rõ nét từng phím)
    const heroUrlText = 'https://topbaohiem.vn';
    const heroUrlCharCount = Math.floor(
        interpolate(frame, [755, 870], [0, heroUrlText.length], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        }),
    );
    const typedHeroUrl = heroUrlText.slice(0, heroUrlCharCount);
    // Con trỏ nhấp nháy trong lúc gõ (755-870) và đứng nhấp nháy thở chờ mắt người đọc (870-910)
    const showHeroCursor = frame >= 755 && frame < 910 && Math.floor(frame / 8) % 2 === 0;

    // GÕ XONG LINK "https://topbaohiem.vn" -> DÂNG KHUNG SEARCH LÊN CAO (Frames 910 -> 955)
    // Dịch chuyển input lên phía trên (-600px) để mở rộng toàn bộ không gian trung tâm cho sân khấu 3D cắt lớp
    const inputElevation = interpolate(frame, [910, 955], [0, -600], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.33, 1, 0.68, 1),
    });

    // D. DROPDOWN STACK-PRESS KÍCH HOẠT ĐỒNG THỜI KHI SEARCH BAR DÂNG LÊN (Frame 910)
    const dropdownTriggerFrame = 910;

    // Xác định activeHoverIndex khi con trỏ chuột rà qua 3 thẻ tính năng (Frames 1570 -> 1720: nhịp thở thong thả)
    let activeHoverIndex = -1;
    if (frame >= 1570 && frame < 1620) {
        activeHoverIndex = 1; // So sánh đa hãng
    } else if (frame >= 1620 && frame < 1670) {
        activeHoverIndex = 2; // Tiết kiệm chi phí
    } else if (frame >= 1670 && frame < 1720) {
        activeHoverIndex = 3; // Cấp đơn 1-chạm & An toàn
    }

    // E. HIỆU ỨNG CON TRỎ CHUỘT (MOUSE POINTER) TƯƠNG TÁC (Frames 1560 -> 2040):
    // 1. Con trỏ chuột xuất hiện nhẹ nhàng tại mép trái Dropdown: Frame 1560 -> 1570
    const cursorOpacity = interpolate(frame, [1560, 1570], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 2. Tọa độ X của chuột:
    // - 1560 -> 1570: Xuất hiện ở -700px (bên trái Thẻ 1)
    // - 1570 -> 1620: Rà qua Thẻ 1 (-700px -> -180px)
    // - 1620 -> 1670: Lướt sang Thẻ 2 (-180px -> +240px)
    // - 1670 -> 1720: Lướt sang Thẻ 3 (+240px -> +620px)
    // - 1720 -> 1780: Lượn vòng chếch lên nút "Truy cập" (+620px -> +1072px)
    // - 1780+: Đứng tại tâm nút (+1072px)
    const cursorX = interpolate(frame, [1560, 1570, 1620, 1670, 1720, 1780], [-700, -700, -180, 240, 620, 1072], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * t * (3 - 2 * t),
    });

    // 3. Tọa độ Y của chuột:
    // Khay dock bắt đầu ở top: calc(50% + 120px - 600px) = calc(50% - 480px)
    // Slot 1 (Thẻ 1): center Y ≈ -275px (-480 + 122 + 83)
    // Slot 2 (Thẻ 2): center Y ≈ -79px (-480 + 318 + 83)
    // Slot 3 (Thẻ 3): center Y ≈ +117px (-480 + 514 + 83)
    // Nút "Truy cập": center Y ≈ -600px
    const baseY = interpolate(frame, [1560, 1570, 1620, 1670, 1720, 1780], [-275, -275, -79, 117, 117, -600], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * t * (3 - 2 * t),
    });
    const cursorWiggle = frame >= 1570 && frame <= 1720 ? Math.sin((frame - 1570) * 0.16) * 2.2 : 0;
    const cursorY = baseY + cursorWiggle;

    // 4. Trạng thái Hover trên nút "Truy cập" (Frames 1780+)
    const isHoveringButton = frame >= 1780;

    // 5. Thao tác Click chuột vào nút "Truy cập" (Frames 1855 -> 1875)
    const isClicking = frame >= 1855 && frame <= 1875;

    // Scale của nút "Truy cập":
    const buttonScale = isClicking ? 0.93 : isHoveringButton ? (frame < 1855 ? 1.05 : 1.02) : 1.0;

    // Scale của con trỏ chuột khi click
    const cursorScale = isClicking ? 0.86 : 1.0;

    // 6. Sóng sáng Pulse Ripple tỏa ra từ nút khi bấm (Frames 1855 -> 1895)
    const clickPulse = interpolate(frame, [1855, 1895], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // F. CAMERA RIG 3D ĐIỆN ẢNH (Kế thừa từ Video-Shotcraft: space-camera-moves & cursor-flyover):
    // 1. Góc ngửa/chúc (Pitch - rotateX):
    // - 720 -> 910: 0deg (nhìn trực diện khi gõ link)
    // - 910 -> 955: 0deg -> 8.5deg (chúc xuống để đón khay dock và tạo chiều sâu khi input dâng lên)
    // - 955 -> 1514: 8.5deg -> 10.5deg (giữ góc nghiêng 3D điện ảnh khi 3 thẻ lần lượt phóng lớn và đập vào khay)
    // - 1514 -> 1720: 10.5deg (theo dõi chuột rà soát khay)
    // - 1720 -> 1780: Trả về 2.0deg (hướng trực diện về nút Truy cập ở trên cao)
    // - 1855 -> 1875: Giật nhẹ impact khi bấm (-0.8deg)
    // - 1880+: Giữ thẳng hướng tâm khi lao xuyên qua (0deg)
    const camPitch = interpolate(
        frame,
        [720, 910, 955, 1104, 1309, 1514, 1720, 1780, 1860, 1875],
        [0, 0, 8.5, 9.8, 10.5, 10.5, 10.5, 2.0, 1.2, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 1, 0.68, 1) },
    );

    // 2. Góc xoay ngang (Yaw - rotateY):
    const camYaw = interpolate(frame, [720, 910, 955, 1514, 1720, 1780, 1875], [0, 0, -6.0, -4.5, -4.5, 2.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.33, 1, 0.68, 1),
    });

    // 3. Góc nghiêng chân trời (Roll - rotateZ):
    const camRoll = interpolate(frame, [910, 955, 1720, 1780, 1875], [0, -0.6, -0.6, 0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 4. Camera Tracking vị trí (Tịnh tiến theo con trỏ chuột - Camera Rig pan):
    const camTargetX = interpolate(frame, [910, 955, 1514, 1720, 1780, 1875], [0, 30, 40, 50, -110, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.33, 1, 0.68, 1),
    });
    const camTargetY = interpolate(
        frame,
        [910, 955, 1514, 1620, 1670, 1720, 1780, 1875],
        [0, 60, 60, 50, 35, 15, 0, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 1, 0.68, 1) },
    );

    // 5. Cú nảy giật camera khi click nút (Camera Impact Bounce):
    const clickBounce = frame >= 1855 && frame <= 1875 ? Math.sin((frame - 1855) * 0.45) * 4.5 : 0;

    // 7. HYBRID ZOOM-THROUGH WARP PORTAL (Frames 1855 -> 1930):
    // Phóng to thanh Hero Search và lao xuyên qua tâm nút "Truy cập" sang Cảnh 2
    const warpProgress = interpolate(frame, [1855, 1920], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.55, 0, 0.82, 0.45),
    });
    const warpScale = interpolate(warpProgress, [0, 1], [1, 5.8]);
    const warpBlur = interpolate(warpProgress, [0, 0.4, 1], [0, 4, 28]);
    const warpOpacity = interpolate(warpProgress, [0, 0.65, 0.95, 1], [1, 1, 0.3, 0]);

    // Ánh sáng cổng Portal Flash bùng nổ từ vị trí nút "Truy cập"
    const portalFlashOpacity = interpolate(frame, [1855, 1885, 1930], [0, 0.98, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Vệt sáng rà soát (Scan Beam) mờ lướt dưới khung input theo con trỏ chuột
    const scanProgress = interpolate(frame, [1630, 1780], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const showScanBeam = frame >= 1630 && frame <= 1780;

    // 3. NHỊP 3: CÚ BÚNG TAY SNAP! & CHUYỂN TIẾP TRẮNG/HỒNG SANG CẢNH 2
    const snapFrame = frame - EUREKA_START_FRAME;
    const isSnap = snapFrame >= 0;

    // Sóng năng lượng hồng mở rộng sau cú búng tay Eureka (Frame 630+)
    const shockwaveRadius = interpolate(snapFrame, [0, 50], [0, 3200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const shockwaveOpacity = interpolate(snapFrame, [0, 15, 50], [0.95, 0.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Thu nhỏ các thẻ câu hỏi và hook khi búng tay để nhường chỗ cho Cảnh 2
    const cardsExitScale = interpolate(snapFrame, [0, 30], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const hookExitOpacity = interpolate(snapFrame, [0, 20], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chuyển tiếp trắng/hồng mềm sang Cảnh 2 (Frames 1910 -> 1950)
    const fadeToScene2 = interpolate(frame, [1910, 1950], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                backgroundColor: colors.bgLight,
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            {/* CONTAINER 4K VIEWPORT CO GIÃN ĐỘNG (ĐẢM BẢO 1080P / 2K / 4K KHÔNG LỆCH) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: baseWidth,
                    height: baseHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                {/* 1. NỀN GIẤY PAPER-CRAFT (Radial Soft Pink & Dấu Chấm Bi Thủ Công) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 50% 40%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
                    }}
                />

                {/* TOÀN BỘ CỤM PART 1 (BĂN KHOĂN, LAPTOP, SÓNG MINT, NHÂN VẬT, 3 THẺ GIẤY XÉ): UNMOUNT TẠI FRAME 740 KHI BẮT ĐẦU CẢNH 2 ĐỂ GIẢI PHÓNG VRAM GPU */}
                {frame < 740 && (
                    <>
                        {/* 1.5. LỚP ĐỒI SÓNG GIẤY XANH MINT Ở ĐÁY MÀN HÌNH (LAYERED PAPER WAVE - CHUẨN PHỐI CẢNH CANVA STORYBOARD) */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: 3840,
                                height: 960,
                                pointerEvents: 'none',
                                zIndex: 1,
                                transform: `translateY(${waveEntranceY + waveFloatY}px)`,
                                filter: 'drop-shadow(0 -12px 28px rgba(16, 185, 129, 0.12))',
                            }}
                        >
                            <svg width="3840" height="960" viewBox="0 0 3840 960" fill="none">
                                <defs>
                                    {/* Gradient xanh mint pastel tươi sáng đặc trưng Canva */}
                                    <linearGradient id="mintWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#C4EFE3" />
                                        <stop offset="40%" stopColor="#B3EADB" />
                                        <stop offset="75%" stopColor="#C6EFE4" />
                                        <stop offset="100%" stopColor="#A8E4D3" />
                                    </linearGradient>
                                    <linearGradient id="mintWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#D8F7EE" stopOpacity="0.85" />
                                        <stop offset="50%" stopColor="#C7F1E5" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#B6ECDE" stopOpacity="0.85" />
                                    </linearGradient>
                                </defs>

                                {/* Lớp sóng giấy mint nền sau (Layer 2 - Sóng cuộn dập dờn & dâng trào 3D Parallax) */}
                                <path
                                    d={pathWaveLayer2}
                                    fill="url(#mintWaveGrad2)"
                                    transform={`translate(${waveLayer2FloatX * 0.7}, 0)`}
                                />

                                {/* Lớp sóng giấy mint chính tiền cảnh (Layer 1 - Sóng trào theo nhịp xuất hiện MacBook & Eureka Snap) */}
                                <path d={pathWaveLayer1} fill="url(#mintWaveGrad1)" />

                                {/* Đường viền nếp gấp giấy mỏng uốn lượn đồng bộ trên đỉnh sóng */}
                                <path
                                    d={crestLineLayer1}
                                    stroke="#8CE0CB"
                                    strokeWidth="3.5"
                                    fill="none"
                                    opacity="0.6"
                                />
                            </svg>
                        </div>

                        {/* 3.5. DẢI CÁNH GIẤY GẤP NỔI KHỐI ORIGAMI PHÍA PHẢI (PAPER RIBBON WING - XUẤT HIỆN ĐỒNG ĐIỆU CÙNG NHỊP BÚNG TAY EUREKA TÔNG HỒNG) */}
                        {frame >= EUREKA_START_FRAME && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 100,
                                    right: -60,
                                    width: 1560,
                                    height: 1730,
                                    pointerEvents: 'none',
                                    opacity: maybayOpacity,
                                    transform: `translateX(${maybaySlideX}px) translateY(${Math.sin(frame * 0.05) * 6 + jitterY}px) scale(${maybayScale}) rotate(${Math.cos(frame * 0.03) * 0.6}deg)`,
                                    filter: 'drop-shadow(-25px 35px 50px rgba(225, 29, 72, 0.22)) drop-shadow(-8px 12px 18px rgba(0,0,0,0.07))',
                                    zIndex: 2,
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen1/maybay_giay.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        translate: '53.5px -201.4px',
                                    }}
                                />
                            </div>
                        )}

                        {/* 3.8. CHIẾC LAPTOP MACBOOK TRẮNG MOCK UI (LƯỚT NHẸ VÀO TỪ PHẢI + 2.5D PERSPECTIVE + MÀN HÌNH BĂN KHOĂN) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 760,
                                left: 1720,
                                width: 1848,
                                height: 1032,
                                pointerEvents: 'none',
                                opacity: laptopOpacity,
                                transform: `translateX(${laptopSlideX}px) translateY(${laptopFloatY + jitterY}px) rotate(${laptopTilt}deg) perspective(1400px) rotateY(${laptopRotateY}deg)`,
                                transformStyle: 'preserve-3d',
                                filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.12)) drop-shadow(0 8px 16px rgba(225, 29, 72, 0.06))',
                                zIndex: 3,
                            }}
                        >
                            {/* KHUNG LAPTOP MACBOOK GỐC */}
                            <Img
                                src={staticFile('assets/elements/screen1/macbook_3.png')}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    transform: 'translateZ(0px)',
                                }}
                            />

                            {/* VÙNG MÀN HÌNH RETINA (CẮT KHỚP CHÍNH XÁC THEO POLYGON MÀN HÌNH & OVERFLOW HIDDEN) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    clipPath:
                                        'polygon(40.0% 6.9%, 86.8% 7.6%, 87.6% 8.6%, 85.4% 69.8%, 36.8% 64.6%, 39.2% 8.0%)',
                                    WebkitClipPath:
                                        'polygon(40.0% 6.9%, 86.8% 7.6%, 87.6% 8.6%, 85.4% 69.8%, 36.8% 64.6%, 39.2% 8.0%)',
                                    overflow: 'hidden',
                                    zIndex: 2,
                                    transform: 'translateZ(15px)',
                                    pointerEvents: 'none',
                                }}
                            >
                                {/* LỚP NỀN TRẮNG MỜ GIẢI PHÁP TOPBAOHIEM (PHỦ TRỌN MÀN HÌNH, CLIPPED 100% BỞI POLYGON KHUNG MÁY) */}
                                {solutionEntranceSpring > 0.001 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            opacity: solutionEntranceSpring,
                                            backgroundColor: 'rgba(255, 255, 255, 0.78)',
                                            backdropFilter: 'blur(8px)',
                                        }}
                                    />
                                )}

                                {/* LAYER 1: THANH TÌM KIẾM TRÊN ĐỈNH & CỤM BĂN KHOĂN (HỆ TRỤC CHUẨN A: rotate(0.95deg) skewX(-2.38deg)) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '38.6%',
                                        left: '62.3%',
                                        width: 910,
                                        height: 652,
                                        transform: 'translate(-50%, -50%) rotate(0.95deg) skewX(-2.38deg)',
                                        transformOrigin: 'center center',
                                    }}
                                >
                                    {/* LỚP NỀN CHE CỤM 3 CHẤM & THANH XÁM PLACEHOLDER GỐC DƯỚI THANH TÌM KIẾM */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 66,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: 800,
                                            height: 76,
                                            backgroundColor: '#F3F4F8',
                                            borderRadius: 18,
                                            zIndex: 1,
                                        }}
                                    />

                                    {/* 0. THANH TÌM KIẾM NẰM TRONG MÀN HÌNH MACBOOK (HERO SEARCH CAPSULE RETINA) */}
                                    {searchEntranceSpring > 0.001 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 56,
                                                left: '50%',
                                                width: 760,
                                                height: 72,
                                                borderRadius: 36,
                                                backgroundColor: '#FFFFFF',
                                                border: '1.5px solid rgba(225, 29, 72, 0.24)',
                                                boxShadow:
                                                    '0 12px 28px rgba(0, 0, 0, 0.10), 0 4px 10px rgba(225, 29, 72, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '0 14px 0 8px',
                                                gap: 12,
                                                zIndex: 10,
                                                transform: `translateX(-50%) scale(${searchEntranceSpring})`,
                                                opacity: searchEntranceSpring,
                                                transformOrigin: 'center center',
                                            }}
                                        >
                                            {/* Nút kính lúp màu hồng bo tròn bên trái / Khóa SSL */}
                                            <div
                                                style={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: 26,
                                                    backgroundColor: frame < EUREKA_START_FRAME ? '#ED017C' : '#059669',
                                                    background:
                                                        frame < EUREKA_START_FRAME
                                                            ? 'linear-gradient(135deg, #FF2E79 0%, #ED017C 100%)'
                                                            : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow:
                                                        frame < EUREKA_START_FRAME
                                                            ? '0 4px 12px rgba(237, 1, 124, 0.4)'
                                                            : '0 4px 12px rgba(16, 185, 129, 0.4)',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {frame < EUREKA_START_FRAME ? (
                                                    <Search size={25} color="#FFFFFF" strokeWidth={2.8} />
                                                ) : (
                                                    <Lock size={23} color="#FFFFFF" strokeWidth={2.8} />
                                                )}
                                            </div>

                                            {/* Nội dung thanh tìm kiếm */}
                                            <div
                                                style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {frame < EUREKA_START_FRAME ? (
                                                    <span
                                                        style={{
                                                            fontSize: 34,
                                                            fontWeight: 900,
                                                            color: '#1E293B',
                                                            letterSpacing: '-0.02em',
                                                            whiteSpace: 'nowrap',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        {typedSearchQuery}
                                                        {showSearchCursor && (
                                                            <span
                                                                style={{
                                                                    display: 'inline-block',
                                                                    width: 3.5,
                                                                    height: 32,
                                                                    backgroundColor: '#ED017C',
                                                                    marginLeft: 4,
                                                                    borderRadius: 2,
                                                                }}
                                                            />
                                                        )}
                                                    </span>
                                                ) : (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <span
                                                            style={{
                                                                fontSize: 38,
                                                                fontWeight: 800,
                                                                color: '#0F172A',
                                                                letterSpacing: '-0.01em',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            https://topbaohiem.vn
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontSize: 25,
                                                                fontWeight: 800,
                                                                color: '#ED017C',
                                                                backgroundColor: '#FDF2F8',
                                                                padding: '3px 8px',
                                                                borderRadius: 6,
                                                                border: '1px solid rgba(237, 1, 124, 0.2)',
                                                                whiteSpace: 'nowrap',
                                                            }}
                                                        >
                                                            GIẢI PHÁP TỐI ƯU
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 1. CỤM BĂN KHOĂN: LOADING SPINNER & CÁC DẤU CHẤM HỎI ? HỖN LOẠN (FRAMES 0 - 480) */}
                                    {confusionExitOpacity > 0.001 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                opacity: confusionExitOpacity,
                                                transform: `scale(${confusionExitScale})`,
                                                transformOrigin: 'center center',
                                            }}
                                        >
                                            {/* Vòng xoay Loading Spinner ở trung tâm lệch phải (chuẩn theo ảnh minh họa) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '48%',
                                                    left: '56%',
                                                    transform: 'translate(-50%, -50%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))',
                                                }}
                                            >
                                                <svg
                                                    width={92}
                                                    height={92}
                                                    viewBox="0 0 100 100"
                                                    style={{
                                                        transform: `rotate(${(frame * 12) % 360}deg)`,
                                                    }}
                                                >
                                                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                                                        (deg, i) => (
                                                            <rect
                                                                key={deg}
                                                                x={46.5}
                                                                y={10}
                                                                width={7}
                                                                height={22}
                                                                rx={3.5}
                                                                fill="#334155"
                                                                opacity={0.16 + (i / 11) * 0.84}
                                                                transform={`rotate(${deg} 50 50)`}
                                                            />
                                                        ),
                                                    )}
                                                </svg>
                                            </div>

                                            {/* Dấu hỏi 1 (Lớn nhất, màu hồng đỏ #ED017C - đúng vị trí ảnh minh họa) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: '26%',
                                                    top: '34%',
                                                    fontSize: 120,
                                                    fontWeight: 900,
                                                    lineHeight: 1,
                                                    color: '#ED017C',
                                                    filter: 'drop-shadow(0 8px 16px rgba(237, 1, 124, 0.3))',
                                                    transform: `translateY(${qFloat1}px) rotate(${qRot1}deg) scale(${q1Spring})`,
                                                    opacity: q1Spring,
                                                    transformOrigin: 'bottom center',
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                }}
                                            >
                                                ?
                                            </div>

                                            {/* Dấu hỏi 2 (Trung bình, màu đỏ đậm #E11D48 - ở góc trên phải) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: '44%',
                                                    top: '28%',
                                                    fontSize: 72,
                                                    fontWeight: 900,
                                                    lineHeight: 1,
                                                    color: '#E11D48',
                                                    filter: 'drop-shadow(0 6px 12px rgba(225, 29, 72, 0.25))',
                                                    transform: `translateY(${qFloat2}px) rotate(${qRot2}deg) scale(${q2Spring})`,
                                                    opacity: q2Spring,
                                                    transformOrigin: 'bottom center',
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                }}
                                            >
                                                ?
                                            </div>

                                            {/* Dấu hỏi 3 (Nhỏ, màu đỏ hồng #F43F5E - góc trên xa) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: '82%',
                                                    top: '26%',
                                                    fontSize: 58,
                                                    fontWeight: 900,
                                                    lineHeight: 1,
                                                    color: '#F43F5E',
                                                    filter: 'drop-shadow(0 4px 10px rgba(244, 63, 94, 0.2))',
                                                    transform: `translateY(${qFloat1 * 0.7}px) rotate(${-qRot1}deg) scale(${q3Spring})`,
                                                    opacity: q3Spring,
                                                    transformOrigin: 'bottom center',
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                }}
                                            >
                                                ?
                                            </div>

                                            {/* Dấu hỏi 4 (Trung bình, màu xám #64748B - góc dưới phải) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: '78%',
                                                    top: '56%',
                                                    fontSize: 84,
                                                    fontWeight: 900,
                                                    lineHeight: 1,
                                                    color: '#64748B',
                                                    filter: 'drop-shadow(0 6px 14px rgba(100, 116, 139, 0.2))',
                                                    transform: `translateY(${qFloat4}px) rotate(${qRot2 * 0.8}deg) scale(${q4Spring})`,
                                                    opacity: q4Spring,
                                                    transformOrigin: 'bottom center',
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                }}
                                            >
                                                ?
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* LAYER 2: CARD GIẢI PHÁP TRUNG TÂM (HỆ TRỤC CHUẨN B: rotate(2.35deg) skewX(-1.78deg) skewY(-0.18deg)) */}
                                {solutionEntranceSpring > 0.001 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '38.6%',
                                            left: '62.3%',
                                            width: 910,
                                            height: 652,
                                            transform: 'translate(-50%, -50%) rotate(2.35deg) skewX(-1.78deg) skewY(-0.18deg)',
                                            transformOrigin: 'center center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingTop: 85,
                                            opacity: solutionEntranceSpring,
                                            zIndex: 5,
                                        }}
                                    >
                                        <div
                                            style={{
                                                transform: `scale(${interpolate(solutionEntranceSpring, [0, 0.7], [0.92, 1])})`,
                                                transformOrigin: 'center center',
                                                padding: '38px 56px',
                                                borderRadius: 26,
                                                backgroundColor: '#FFFFFF',
                                                border: '2px solid rgba(237, 1, 124, 0.32)',
                                                boxShadow:
                                                    '0 22px 55px rgba(237, 1, 124, 0.22), 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: 16,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <CheckCircle2 size={26} color="#10B981" strokeWidth={2.8} />
                                                <span
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: 800,
                                                        letterSpacing: '0.08em',
                                                        color: '#059669',
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    ĐÃ XÁC THỰC GIẢI PHÁP
                                                </span>
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: 62,
                                                    fontWeight: 900,
                                                    color: '#ED017C',
                                                    letterSpacing: '-0.025em',
                                                    lineHeight: 1.05,
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                    filter: 'drop-shadow(0 4px 12px rgba(237, 1, 124, 0.25))',
                                                }}
                                            >
                                                TOPBAOHIEM.VN
                                            </div>

                                            <span
                                                style={{
                                                    fontSize: 28,
                                                    fontWeight: 600,
                                                    color: '#475569',
                                                }}
                                            >
                                                Nền tảng so sánh bảo hiểm trực tuyến minh bạch
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 0. CỤM HOOK DẪN CHUYỆN: "Muốn mua bảo hiểm online," -> "NHƯNG..." (DOCKING LÊN ĐỈNH) */}
                        {frame >= 10 && charCount > 0 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: hookY,
                                    left: '50%',
                                    transform: `translateX(-50%) translateY(${buzzY}px) translateX(${buzzX}px) scale(${hookScale * cardsExitScale})`,
                                    opacity: hookExitOpacity * hookEntranceOpacity,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 28,
                                    zIndex: 10,
                                    pointerEvents: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {/* Chữ Typewriter thanh thoát, sắc nét (không bọc trong chip/pill trắng rỗng gây chấm trắng ở frame đầu) */}
                                <span
                                    style={{
                                        fontSize: 68,
                                        fontWeight: 800,
                                        color: '#1E293B',
                                        letterSpacing: '-0.5px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        textShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                                    }}
                                >
                                    {typedText}
                                    {showCursor && (
                                        <span
                                            style={{
                                                fontSize: 68,
                                                fontWeight: 900,
                                                color: colors.brandPink,
                                                marginLeft: 6,
                                            }}
                                        >
                                            |
                                        </span>
                                    )}
                                </span>

                                {/* Tag nhãn "NHƯNG..." dập nổ phong cách Washi Tape đỏ hồng */}
                                {frame >= 72 && (
                                    <div
                                        style={{
                                            transform: `scale(${punchSpring}) rotate(${-3.5 + buzzRot}deg)`,
                                            backgroundColor: colors.brandPink,
                                            color: '#FFFFFF',
                                            padding: '16px 42px 18px',
                                            borderRadius: 18,
                                            fontSize: 68,
                                            fontWeight: 900,
                                            letterSpacing: '1.5px',
                                            boxShadow: '0 15px 35px rgba(225, 29, 72, 0.42)',
                                            border: '4px solid #FFFFFF',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        NHƯNG...
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 4. KHỐI TRUNG TÂM: MẢNH GHÉP NHÂN VẬT HERO CHỦ THỂ 2.5D ÁO HỒNG (CHUẨN TỶ LỆ 75% CHIỀU CAO KHUNG HÌNH) */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 1540,
                                transform: `translateX(-50%) translateY(${charEntranceY}px) scale(${charScale})`,
                                transformOrigin: 'bottom center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                opacity: charEntranceOpacity,
                                filter: 'drop-shadow(0 35px 50px rgba(0, 0, 0, 0.18)) drop-shadow(0 12px 25px rgba(225, 29, 72, 0.16))',
                                zIndex: 4,
                            }}
                        >
                            {/* Container nhân vật Hero: Kích thước 1020 x 1650 khớp chuẩn độ phân giải gốc ảnh 972 x 1620 */}
                            <div
                                style={{
                                    width: 1020,
                                    height: 1650,
                                    position: 'relative',
                                }}
                            >
                                {/* 1. Trạng thái Băn khoăn / Suy nghĩ (Frames 0 -> EUREKA_START_FRAME) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: interpolate(
                                            frame,
                                            [EUREKA_START_FRAME - 5, EUREKA_START_FRAME + 5],
                                            [1, 0],
                                            {
                                                extrapolateLeft: 'clamp',
                                                extrapolateRight: 'clamp',
                                            },
                                        ),
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Img
                                        src={staticFile('assets/elements/screen1/thinking.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>

                                {/* 2. Trạng thái Lóe sáng & Búng tay Snap (Frames EUREKA_START_FRAME+) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: interpolate(
                                            frame,
                                            [EUREKA_START_FRAME - 5, EUREKA_START_FRAME + 5],
                                            [0, 1],
                                            {
                                                extrapolateLeft: 'clamp',
                                                extrapolateRight: 'clamp',
                                            },
                                        ),
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Img
                                        src={staticFile('assets/elements/screen1/anh2k.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>

                                {/* Dấu chấm hỏi giấy xoay quanh đầu nhân vật khi đang phân vân */}
                                {frame < EUREKA_START_FRAME && (
                                    <>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 90,
                                                right: 180,
                                                fontSize: 80,
                                                color: colors.accentYellow,
                                                fontWeight: 900,
                                                transform: `rotate(${Math.cos(frame * 0.1) * 15}deg)`,
                                                filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.45))',
                                            }}
                                        >
                                            💭
                                        </div>
                                    </>
                                )}

                                {/* BÓNG ĐÈN Ý TƯỞNG EUREKA BÙNG LÊN TRÊN ĐẦU (Frames EUREKA_START_FRAME+) */}
                                {frame >= EUREKA_START_FRAME && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: -170,
                                            right: -80,
                                            width: 540,
                                            height: 540,
                                            transform: `scale(${eurekaSpring}) rotate(${Math.sin((frame - EUREKA_START_FRAME) * 0.08) * 3}deg)`,
                                            transformOrigin: 'bottom left',
                                            opacity: eurekaSpring,
                                            pointerEvents: 'none',
                                            filter: 'drop-shadow(0 25px 45px rgba(225, 29, 72, 0.45)) drop-shadow(0 6px 14px rgba(0,0,0,0.12))',
                                        }}
                                    >
                                        <Img
                                            src={staticFile('assets/elements/screen1/idea.png')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                translate: '251.2px -72.2px',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 5. 3 MẢNH GIẤY XÉ GHI CHÚ BĂN KHOĂN THỦ CÔNG CHUẨN STORYBOARD CANVA (CỘT TRÁI) */}
                        {/* THẺ 1: Chọn loại nào? (Ghim kẹp giấy hồng) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 260,
                                left: 220,
                                width: 580,
                                height: 390,
                                opacity: card1Opacity,
                                transform: `perspective(1200px) translateX(${card1X}px) translateY(${card1Y}px) scale(${cardsExitScale * card1Scale}) rotateX(${card1RotX}deg) rotateY(${card1RotY}deg) rotate(${-5 + card1Flutter}deg)`,
                                transformOrigin: 'top center',
                                zIndex: 5,
                                filter: `drop-shadow(0 ${interpolate(card1Spring, [0, 1], [40, 15])}px ${interpolate(card1Spring, [0, 1], [50, 30])}px rgba(0,0,0,${interpolate(card1Spring, [0, 1], [0.04, 0.09])})) drop-shadow(0 4px 10px rgba(225, 29, 72, 0.06))`,
                            }}
                        >
                            {/* Nền giấy xé giay.png */}
                            <Img
                                src={staticFile('assets/elements/screen1/giay.png')}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'fill',
                                }}
                            />

                            {/* Ghim kẹp giấy hồng gym_giay.png (Dập đanh một nhịp sau khi giấy tiếp đất) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -42,
                                    left: 42,
                                    width: 80,
                                    height: 130,
                                    transform: `translateY(${clip1Y}px) scale(${clip1Scale}) rotate(-8deg)`,
                                    transformOrigin: 'top center',
                                    opacity: clip1Opacity,
                                    zIndex: 2,
                                    filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen1/gym_giay.png')}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>

                            {/* Nội dung chữ: Mua ở đâu uy tín? */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: '20px 40px 20px 110px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    textAlign: 'left',
                                    color: colors.brandPink,
                                    lineHeight: 1.12,
                                    letterSpacing: '-1px',
                                    transform: 'rotate(-4.2deg)',
                                    transformOrigin: 'left center',
                                    zIndex: 1,
                                    marginLeft: 10,
                                }}
                            >
                                <span style={{ fontSize: 76, fontWeight: 900 }}>Mua ở đâu</span>
                                <span style={{ fontSize: 62, fontWeight: 800, marginTop: 8 }}>uy tín?</span>
                            </div>

                            {/* Dấu hỏi chấm to màu xanh navy đậm bên cạnh */}
                            <div
                                style={{
                                    position: 'absolute',
                                    right: -10,
                                    top: 20,
                                    fontSize: 150,
                                    fontWeight: 900,
                                    color: '#1E293B',
                                    lineHeight: 1,
                                    transform: `rotate(${Math.sin(frame * 0.08) * 8}deg)`,
                                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                                    zIndex: 3,
                                }}
                            >
                                ?
                            </div>
                        </div>

                        {/* THẺ 2: Quyền lợi ra sao? (Băng keo hồng bangkeohong.png) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 680,
                                left: 180,
                                width: 600,
                                height: 400,
                                opacity: card2Opacity,
                                transform: `perspective(1200px) translateX(${card2X}px) translateY(${card2Y}px) scale(${cardsExitScale * card2Scale}) rotateX(${card2RotX}deg) rotateY(${card2RotY}deg) rotate(${4 + card2Flutter}deg)`,
                                transformOrigin: 'top center',
                                zIndex: 5,
                                filter: `drop-shadow(0 ${interpolate(card2Spring, [0, 1], [40, 15])}px ${interpolate(card2Spring, [0, 1], [50, 30])}px rgba(0,0,0,${interpolate(card2Spring, [0, 1], [0.04, 0.09])})) drop-shadow(0 4px 10px rgba(225, 29, 72, 0.06))`,
                            }}
                        >
                            {/* Nền giấy xé giay.png */}
                            <Img
                                src={staticFile('assets/elements/screen1/giay.png')}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'fill',
                                }}
                            />

                            {/* Miếng băng dính washi tape hồng bangkeohong.png (Dán đè ép dính sau khi giấy rơi) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -32,
                                    left: -20,
                                    width: 170,
                                    height: 114,
                                    transform: `scale(${tape2Scale}) rotate(-24deg)`,
                                    transformOrigin: 'center center',
                                    opacity: tape2Opacity,
                                    zIndex: 2,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen1/bangkeohong.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        translate: '-43.4px 48.2px',
                                        rotate: '17.9deg',
                                        scale: 1.062,
                                    }}
                                />
                            </div>

                            {/* Nội dung chữ: Quyền lợi ra sao? */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: '20px 40px 20px 110px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    textAlign: 'left',
                                    color: '#1E293B',
                                    lineHeight: 1.12,
                                    letterSpacing: '-1px',
                                    transform: 'rotate(-4.2deg)',
                                    transformOrigin: 'left center',
                                    zIndex: 1,
                                    marginLeft: 50,
                                }}
                            >
                                <span style={{ fontSize: 70, fontWeight: 900 }}>Quyền lợi</span>
                                <span style={{ fontSize: 62, fontWeight: 800, marginTop: 12 }}>ra sao?</span>
                            </div>

                            {/* Dấu hỏi chấm to màu xanh navy đậm bên cạnh */}
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 25,
                                    fontSize: 150,
                                    fontWeight: 900,
                                    color: '#1E293B',
                                    lineHeight: 1,
                                    transform: `rotate(${Math.cos(frame * 0.08) * 8}deg)`,
                                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                                    zIndex: 3,
                                }}
                            >
                                ?
                            </div>
                        </div>

                        {/* THẺ 3: Thủ tục có phức tạp không? (Băng keo xanh bangkeoxanh.png) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 1120,
                                left: 240,
                                width: 610,
                                height: 410,
                                opacity: card3Opacity,
                                transform: `perspective(1200px) translateX(${card3X}px) translateY(${card3Y}px) scale(${cardsExitScale * card3Scale}) rotateX(${card3RotX}deg) rotateY(${card3RotY}deg) rotate(${-3 + card3Flutter}deg)`,
                                transformOrigin: 'top center',
                                zIndex: 5,
                                filter: `drop-shadow(0 ${interpolate(card3Spring, [0, 1], [40, 15])}px ${interpolate(card3Spring, [0, 1], [50, 30])}px rgba(0,0,0,${interpolate(card3Spring, [0, 1], [0.04, 0.09])})) drop-shadow(0 4px 10px rgba(225, 29, 72, 0.06))`,
                            }}
                        >
                            {/* Nền giấy xé giay.png */}
                            <Img
                                src={staticFile('assets/elements/screen1/giay.png')}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'fill',
                                }}
                            />

                            {/* Miếng băng dính washi tape xanh bangkeoxanh.png (Dán đè ép dính tựa đỉnh sóng mint) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -26,
                                    left: -28,
                                    width: 190,
                                    height: 94,
                                    transform: `scale(${tape3Scale}) rotate(-10deg)`,
                                    transformOrigin: 'center center',
                                    opacity: tape3Opacity,
                                    zIndex: 2,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen1/bangkeoxanh.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        translate: '0.8px 42.7px',
                                    }}
                                />
                            </div>

                            {/* Nội dung chữ: Thủ tục có phức tạp không? */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: '20px 40px 20px 110px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    textAlign: 'left',
                                    color: colors.brandPink,
                                    lineHeight: 1.12,
                                    letterSpacing: '-1px',
                                    transform: 'rotate(-4.2deg)',
                                    transformOrigin: 'left center',
                                    zIndex: 1,
                                    paddingLeft: '60px',
                                }}
                            >
                                <span style={{ fontSize: 62, fontWeight: 900 }}>Thủ tục có</span>
                                <span style={{ fontSize: 62, fontWeight: 900, marginTop: 8 }}>phức tạp</span>
                                <span style={{ fontSize: 62, fontWeight: 900, marginTop: 8 }}>không?</span>
                            </div>

                            {/* Dấu hỏi chấm to màu hồng đỏ bên cạnh */}
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 40,
                                    fontSize: 150,
                                    fontWeight: 900,
                                    color: colors.brandPink,
                                    lineHeight: 1,
                                    transform: `rotate(${Math.sin(frame * 0.09 + 1) * 8}deg)`,
                                    filter: 'drop-shadow(0 8px 16px rgba(225, 29, 72, 0.3))',
                                    zIndex: 3,
                                }}
                            >
                                ?
                            </div>
                        </div>
                    </>
                )}

                {/* 7. HIỆU ỨNG BÚNG TAY SNAP! BÙNG NỔ SÓNG NĂNG LƯỢNG HỒNG (Frames 740 - 840) */}
                {isSnap && shockwaveOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: shockwaveRadius,
                            height: shockwaveRadius,
                            borderRadius: '50%',
                            border: `12px solid ${colors.brandPink}`,
                            backgroundColor: `${colors.brandPink}18`,
                            opacity: shockwaveOpacity,
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* 7.5. HERO SEARCH & DROPDOWN STACK-PRESS (Frames 720 - 2040) */}
                {frame >= 720 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 35,
                            pointerEvents: 'none',
                        }}
                    >
                        {/* LAYER THREE.JS: KHÔNG GIAN HẠT 3D & HYPERDRIVE WARP SPEED TUNNEL (CHỈ MOUNT KHI WARP CHUYỂN CẢNH: FRAME >= 1845) */}
                        {frame >= 1845 && (
                            <WarpHyperdrive3D
                                frame={frame}
                                width={3840}
                                height={2160}
                                warpStartFrame={1855}
                                warpEndFrame={1930}
                            />
                        )}

                        {/* TẤM NỀN TRANG CHỦ 3D ĐỘC LẬP (GÓC CỐ ĐỊNH CHUẨN ẢNH 3, KHÔNG BỊ XOAY THEO CAMERA RIG CỦA NHÓM INPUT) */}
                        <TopLeftWebsiteBackdrop3D frame={frame} fps={fps} startFrame={725} />

                        {/* HỆ THỐNG CAMERA RIG 3D ĐIỆN ẢNH (KẾ THỪA VIDEO-SHOTCRAFT: SPACE-CAMERA-MOVES & CURSOR-FLYOVER) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                perspective: 2600,
                                perspectiveOrigin: '50% 50%',
                                pointerEvents: 'none',
                                zIndex: 50, // Nhóm input & dropdown có zIndex lớn nhất, luôn hiển thị trên lớp layout trang chủ
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transformStyle: 'preserve-3d',
                                    transform: `translate3d(${camTargetX}px, ${camTargetY + clickBounce}px, 0) rotateX(${camPitch}deg) rotateY(${camYaw}deg) rotateZ(${camRoll}deg) scale(${warpScale})`,
                                    transformOrigin:
                                        warpScale > 1.001 ? 'calc(50% + 1072px) calc(50% - 600px)' : '50% 50%',
                                    filter: warpBlur > 0.1 ? `blur(${warpBlur}px)` : undefined,
                                    opacity: warpOpacity,
                                }}
                            >
                                {/* Thanh Hero Search Bar dâng lên mở rộng không gian 3D */}
                                {heroSearchEntrance > 0.001 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, calc(-50% + ${inputElevation}px)) scale(${heroSearchEntrance})`,
                                            width: 2560,
                                            height: 200,
                                            borderRadius: 100,
                                            backgroundColor: '#FFFFFF',
                                            border: '4px solid rgba(255, 255, 255, 0.98)',
                                            boxShadow:
                                                '0 3px 0 #FFF1F2, 0 6px 0 #FFE4E6, 0 10px 0 #FECDD3, 0 14px 0 #FDA4AF, 0 18px 0 #FB7185, 0 45px 110px rgba(15, 23, 42, 0.24), 0 16px 40px rgba(225, 29, 72, 0.22), inset 0 3px 8px rgba(255, 255, 255, 1), inset 0 -3px 6px rgba(225, 29, 72, 0.08)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0 32px 0 28px',
                                            gap: 32,
                                            opacity: heroSearchEntrance,
                                            zIndex: 39,
                                        }}
                                    >
                                        {/* Ổ khóa xanh lá bảo mật (Green Security Lock) */}
                                        <div
                                            style={{
                                                width: 136,
                                                height: 136,
                                                borderRadius: 68,
                                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 12px 28px rgba(16, 185, 129, 0.45)',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Lock size={68} color="#FFFFFF" strokeWidth={3} />
                                        </div>

                                        {/* Text gõ URL https://topbaohiem.vn cỡ lớn */}
                                        <div
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 92,
                                                    fontWeight: 900,
                                                    color: '#0F172A',
                                                    letterSpacing: '-0.025em',
                                                    whiteSpace: 'nowrap',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                }}
                                            >
                                                {typedHeroUrl}
                                                {showHeroCursor && (
                                                    <span
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 8,
                                                            height: 86,
                                                            backgroundColor: '#ED017C',
                                                            marginLeft: 10,
                                                            borderRadius: 4,
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        </div>

                                        {/* Nút "Truy cập" màu hồng bên phải cỡ lớn */}
                                        <div
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 16,
                                                height: 136,
                                                padding: '0 56px',
                                                borderRadius: 68,
                                                background: isHoveringButton
                                                    ? 'linear-gradient(135deg, #FF1464 0%, #D8006F 100%)'
                                                    : 'linear-gradient(135deg, #FF2E79 0%, #ED017C 100%)',
                                                color: '#FFFFFF',
                                                transform: `scale(${buttonScale})`,
                                                transformOrigin: 'center center',
                                                boxShadow: isClicking
                                                    ? '0 0 65px rgba(237, 1, 124, 0.95), 0 0 130px rgba(237, 1, 124, 0.55)'
                                                    : isHoveringButton
                                                      ? '0 18px 48px rgba(237, 1, 124, 0.65), 0 0 35px rgba(237, 1, 124, 0.45)'
                                                      : '0 12px 35px rgba(237, 1, 124, 0.45)',
                                                flexShrink: 0,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 48,
                                                    fontWeight: 900,
                                                    letterSpacing: '0.01em',
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                }}
                                            >
                                                Truy cập
                                            </span>
                                            <ArrowRight
                                                size={46}
                                                color="#FFFFFF"
                                                strokeWidth={3.4}
                                                style={{
                                                    transform: `translateX(${isHoveringButton ? 6 : 0}px)`,
                                                }}
                                            />

                                            {/* Ripple sáng khi bấm */}
                                            {clickPulse > 0 && clickPulse < 1 && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: -12,
                                                        borderRadius: 80,
                                                        border: '4px solid rgba(237, 1, 124, 0.9)',
                                                        boxShadow: '0 0 40px rgba(237, 1, 124, 0.85)',
                                                        opacity: 1 - clickPulse,
                                                        transform: `scale(${1 + clickPulse * 0.35})`,
                                                        pointerEvents: 'none',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* DROPDOWN 3D MODULAR STACK-PRESS (PHƯƠNG ÁN B: 3D HERO EXPLODED + SLAM DOWN STACK-PRESS) */}
                                <DropdownStackPress
                                    frame={frame}
                                    fps={fps}
                                    triggerFrame={dropdownTriggerFrame}
                                    activeHoverIndex={activeHoverIndex}
                                    inputElevation={inputElevation}
                                />

                                {/* Vệt sáng rà soát (Scan Beam) mờ mờ lướt dưới mép khung input theo con trỏ chuột */}
                                {showScanBeam && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, calc(-50% + ${inputElevation}px))`,
                                            width: 2560,
                                            height: 200,
                                            pointerEvents: 'none',
                                            zIndex: 39,
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: -8,
                                                left: `${interpolate(scanProgress, [0, 1], [220, 2100])}px`,
                                                width: 260,
                                                height: 6,
                                                borderRadius: 3,
                                                background:
                                                    'linear-gradient(90deg, transparent 0%, rgba(237, 1, 124, 0.85) 50%, transparent 100%)',
                                                filter: 'blur(2px) drop-shadow(0 0 12px rgba(237, 1, 124, 0.85))',
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Con trỏ chuột tương tác (Rà soát 3 thẻ Dropdown rồi lượn lên nút Truy cập) */}
                                {cursorOpacity > 0.01 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
                                            opacity: cursorOpacity,
                                            zIndex: 45,
                                            filter: 'drop-shadow(0 10px 22px rgba(0, 0, 0, 0.38))',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {/* Đốm sáng hồng theo mũi chuột khi rà soát */}
                                        {frame >= 1730 && frame <= 1880 && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    left: -5,
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.42)',
                                                    filter: 'blur(4px)',
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        )}
                                        <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
                                                fill="#0F172A"
                                                stroke="#FFFFFF"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* HIỆU ỨNG TIA SÁNG WARP SPEED LINES (HƯỚNG TÂM TỪ NÚT TRUY CẬP) */}
                        {warpProgress > 0.04 && warpProgress < 0.96 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    pointerEvents: 'none',
                                    zIndex: 48,
                                    opacity: interpolate(warpProgress, [0.04, 0.25, 0.75, 0.96], [0, 0.95, 0.95, 0]),
                                }}
                            >
                                <svg width="3840" height="2160" viewBox="0 0 3840 2160" fill="none">
                                    {/* Vòng sóng xung kích tỏa ra */}
                                    <circle
                                        cx={3840 / 2 + 1072}
                                        cy={2160 / 2 - 600}
                                        r={interpolate(warpProgress, [0, 1], [40, 2600])}
                                        stroke="rgba(237, 1, 124, 0.7)"
                                        strokeWidth={interpolate(warpProgress, [0, 1], [16, 2])}
                                        fill="none"
                                    />
                                    <circle
                                        cx={3840 / 2 + 1072}
                                        cy={2160 / 2 - 600}
                                        r={interpolate(warpProgress, [0, 1], [10, 1800])}
                                        stroke="rgba(255, 255, 255, 0.9)"
                                        strokeWidth={interpolate(warpProgress, [0, 1], [10, 1])}
                                        fill="none"
                                    />
                                    {/* 20 tia sáng xuyên tâm tốc độ cao */}
                                    {[...Array(20)].map((_, i) => {
                                        const angle = (i * 360) / 20;
                                        const rad = (angle * Math.PI) / 180;
                                        const r1 = interpolate(warpProgress, [0, 1], [60, 220]);
                                        const r2 = interpolate(warpProgress, [0, 1], [350, 2800]);
                                        const x1 = 3840 / 2 + 1072 + Math.cos(rad) * r1;
                                        const y1 = 2160 / 2 - 600 + Math.sin(rad) * r1;
                                        const x2 = 3840 / 2 + 1072 + Math.cos(rad) * r2;
                                        const y2 = 2160 / 2 - 600 + Math.sin(rad) * r2;
                                        return (
                                            <line
                                                key={i}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke={
                                                    i % 2 === 0 ? 'rgba(237, 1, 124, 0.75)' : 'rgba(255, 255, 255, 0.9)'
                                                }
                                                strokeWidth={interpolate(warpProgress, [0, 0.5, 1], [2, 5, 1])}
                                                strokeLinecap="round"
                                            />
                                        );
                                    })}
                                </svg>
                            </div>
                        )}

                        {/* CỔNG ÁNH SÁNG PORTAL FLASH BÙNG NỔ TỪ TÂM NÚT TRUY CẬP */}
                        {portalFlashOpacity > 0.001 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: `radial-gradient(circle at calc(50% + 1072px) calc(50% - 600px), rgba(255, 255, 255, 1) 0%, rgba(255, 228, 235, 0.92) 35%, rgba(255, 255, 255, 0.96) 70%, ${colors.bgLight} 100%)`,
                                    opacity: portalFlashOpacity,
                                    pointerEvents: 'none',
                                    zIndex: 50,
                                }}
                            />
                        )}
                    </div>
                )}

                {/* 8. MÀN CHUYỂN TIẾP TRẮNG/HỒNG SANG CẢNH 2 */}
                {fadeToScene2 > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: colors.bgLight,
                            opacity: fadeToScene2,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </div>
        </div>
    );
};
