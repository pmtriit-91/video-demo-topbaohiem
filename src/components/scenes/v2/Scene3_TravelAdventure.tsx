import React from 'react';
import { useCurrentFrame, useVideoConfig, staticFile, Img, interpolate, spring } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';

/**
 * GIAI ĐOẠN 2: DIỄN HOẠT CHUYỂN ĐỘNG CHO SHOT 3.1 (LIVING DIORAMA & CINEMATIC FLY-OVER)
 * ----------------------------------------------------------------------------------
 * Cải tiến theo phản hồi & định hướng sáng tạo:
 * 1. ✈️ Lead-in Airplane Fly-over (Frame 0 - 85): Chiếc máy bay mô hình bay qua bầu trời làm
 *    cầu nối chuyển cảnh từ Scene 2 sang Scene 3. Vệt bay cuốn theo luồng gió đánh thức thế giới Paper-cut.
 * 2. 🌊 Wave / Trail Reveal: Các tiểu cảnh bên dưới bung nở tuần tự theo bước lướt của máy bay:
 *    - Trái: Bậc thang trái + dừa xanh nở ra.
 *    - Giữa: Đĩa thảm tròn xanh mở rộng + đụn cát trồi lên.
 *    - Phải: Bậc thang xoắn + dừa hồng + ghế nghỉ & phao vịt đáp xuống cát.
 * 3. 👫 Hero Couple Cinematic Glide: Triệt tiêu hoàn toàn rung lắc giật cục; cặp đôi lướt vào
 *    khoan thai, thanh lịch với độ hãm êm ái, tiếp đất nhẹ nhàng trên thảm tròn xanh và thở nhẹ thư thái.
 * 4. 🎥 2.5D Depth Camera Rig: Góc máy kết hợp Depth-Layer-Moves và Tilt-Glide từ video-shotcraft,
 *    đón máy bay từ trên cao rồi hạ xuống mở rộng toàn cảnh diorama bãi biển nhiệt đới.
 * 5. 📍 Bảo toàn 100% tọa độ tĩnh và các giá trị translate đã căn chỉnh thủ công.
 */

// Bảng tọa độ tĩnh chuẩn xác của từng mảnh ghép 3.1
const STAGING_SHOT_3_1 = {
    // 1. Nền biển & trời Paper-Cut (16:9)
    bg: {
        src: 'assets/elements/screen3/3.1/bg_chinh_2.png',
        zIndex: 1,
    },
    // 2. Mặt trời Paper-Cut nhiều tia (Góc trên bên phải)
    sun: {
        src: 'assets/elements/screen3/3.1/mat_troi.png',
        left: '79.20%',
        top: '3.56%',
        width: '12.80%',
        zIndex: 4,
    },
    // 3. Mây 1 (Mây giấy vân màu nước góc trên bên trái)
    cloud1: {
        src: 'assets/elements/screen3/3.1/may_1_1.png',
        left: '3.73%',
        top: '2.61%',
        width: '12.60%',
        zIndex: 5,
    },
    // 4. Mây 2 (Mây bồng bềnh trung tâm bầu trời)
    cloud2: {
        src: 'assets/elements/screen3/3.1/may_2.png',
        left: '34.00%',
        top: '1.90%',
        width: '12.53%',
        zIndex: 5,
    },
    // 5. Mây 3 (Mây tầng giữa khoảng trời bên phải)
    cloud3: {
        src: 'assets/elements/screen3/3.1/may_3.png',
        left: '59.67%',
        top: '10.19%',
        width: '13.47%',
        zIndex: 5,
    },
    // 6. Chiếc máy bay mô hình (Cầu nối chuyển cảnh lướt ngang bầu trời)
    airplane: {
        src: 'assets/elements/screen3/3.1/may_bay.png',
        width: '27.50%',
        zIndex: 9,
    },
    // 7. Bậc thang podium hồng bên trái + đồi xanh (Hậu cảnh mép trái)
    leftPodiumHills: {
        src: 'assets/elements/screen3/3.1/bat_thang_hong_left.png',
        left: '0.17%',
        top: '35.64%',
        width: '35.48%',
        zIndex: 10,
    },
    // 8. Cây dừa xanh lớn (Nghiêng từ bờ trái vươn tán sang trung tâm)
    greenPalm: {
        src: 'assets/elements/screen3/3.1/cay_dua_xanh.png',
        left: '9.93%',
        top: '5.24%',
        width: '25.33%',
        zIndex: 12,
    },
    // 9. Cây dừa hồng thanh mảnh (Vươn tán che chở góc phải trước mặt trời)
    pinkPalm: {
        src: 'assets/elements/screen3/3.1/cay_dua_hong.png',
        left: '69.23%',
        top: '13.75%',
        width: '19.82%',
        zIndex: 11,
    },
    // 10. Bậc thang podium hình trụ tròn xoắn ốc bên phải + bụi cây ngọc
    rightPodiumStairs: {
        src: 'assets/elements/screen3/3.1/bat_thang_hong_right.png',
        left: '72.83%',
        top: '35.17%',
        width: '27.08%',
        zIndex: 13,
    },
    // 11. Điểm xuyết cánh hoa/vòng cung hồng nghệ thuật trên bậc thang phải
    pinkArcBird: {
        src: 'assets/elements/screen3/3.1/chim_do.png',
        left: '78.43%',
        top: '54.99%',
        width: '16.45%',
        zIndex: 14,
    },
    // 12. Đĩa thảm tròn đồng tâm màu xanh pastel (Sân khấu trung tâm cặp đôi đứng lên)
    bluePodiumCarpet: {
        src: 'assets/elements/screen3/3.1/tham_xanh_2.png',
        left: '23.00%',
        top: '81.50%',
        width: '58.00%',
        height: '13.50%',
        zIndex: 15,
    },
    // 13. Đụn cát giấy xếp lớp tiền cảnh bên trái
    leftDune: {
        src: 'assets/elements/screen3/3.1/dun_cat_left.png',
        left: '0.00%',
        top: '64.53%',
        width: '30.72%',
        zIndex: 18,
    },
    // 14. Đụn cát giấy xếp lớp tiền cảnh bên phải
    rightDune: {
        src: 'assets/elements/screen3/3.1/dun_cat_right.png',
        left: '78.53%',
        top: '78.93%',
        width: '35.47%',
        zIndex: 18,
    },
    // 15. Cặp đôi thanh lịch kéo vali hồng (Hero trung tâm khung hình)
    couple: {
        src: 'assets/elements/screen3/3.1/couple.png',
        shockWithHatSrc: 'assets/elements/screen3/3.1/cupple_lolang_3.png',
        shockNoHatSrc: 'assets/elements/screen3/3.2/tachnen/cupple_khong_mu.png',
        flyingHatSrc: 'assets/elements/screen3/3.2/tachnen/hat_tilted_clean.png',
        flyingManHatSrc: 'assets/elements/screen3/3.2/tachnen/mu_nam_tight.png',
        left: '8.83%',
        top: '16.41%',
        width: '75.47%',
        zIndex: 25,
    },
    // 16. Ghế nghỉ bãi biển sọc trắng xanh thanh lịch
    beachChair: {
        src: 'assets/elements/screen3/3.1/ghe_xanh.png',
        left: '72.85%',
        top: '66.61%',
        width: '17.33%',
        zIndex: 26,
    },
    // 17. Chú phao vịt vàng 3D siêu dễ thương (Mép sóng bên phải)
    rubberDuck: {
        src: 'assets/elements/screen3/3.1/vit.png',
        worriedSrc: 'assets/elements/screen3/3.1/vit_lolang.png',
        dizzySrc: 'assets/elements/screen3/3.1/vit_roiram.png',
        left: '67.83%',
        top: '76.00%',
        width: '10.63%',
        zIndex: 28,
    },
};

// Bảng tài nguyên bộ Pose hoạt hình "Chiếc máy bay đỏng đảnh" (Task 2 & Task 4)
const QUIRKY_PLANE_ASSETS = {
    hover: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/plane_pose_1_hover.png',
    wobble: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/plane_pose_2_wobble-trant.png',
    skid: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/plane_pose_2b_brake_skid-trant.png',
    squash: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/plane_pose_3_squash_bend_trant.png',
    snap: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/plane_pose_4_snap_flip_trant.png',
    zip: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/plane_pose_5_zip_run_trant.png',
    vortex: 'assets/elements/screen3/airplane_quirky/maybay-tachnen/wind_swirl_vortex_trant.png',
};

// Bảng tài nguyên bộ 3 chi tiết Cà Khịa & Hài Dón (Shot 3.2 F360+)
// Lựa chọn biến thể nụ cười mặt trời ('meme_master' | 'v1_leo' | 'v2_anya' | 'v3_cheshire' | 'v4_sideeye' | 'original_preview')
export const SUN_SMIRK_VARIANT:
    | 'meme_master'
    | 'v1_leo'
    | 'v2_anya'
    | 'v3_cheshire'
    | 'v4_sideeye'
    | 'original_preview' = 'meme_master';

export const SUN_SMIRK_ASSETS = {
    meme_master: 'assets/elements/screen3/3.2/mat_troi_smirk_meme_master.png', // Siêu phẩm Meme Mặt Trời cười đểu cà khịa của Bạn
    v1_leo: 'assets/elements/screen3/3.2/mat_troi_smirk_v1_leo.png', // The Smug Leo / Noble Side-Eye
    v2_anya: 'assets/elements/screen3/3.2/mat_troi_smirk_v2_anya.png', // The Anya 'Heh' Crescent Smirk
    v3_cheshire: 'assets/elements/screen3/3.2/mat_troi_smirk_v3_cheshire.png', // The Mischievous Wide Tooth Grin
    v4_sideeye: 'assets/elements/screen3/3.2/mat_troi_smirk_v4_sideeye.png', // The Deadpan Judging Kermit Eye
    original_preview: 'assets/elements/screen3/3.2/mat_troi_smirk_preview.png',
};

const SHOT_3_2_COMEDY_ASSETS = {
    // Mặt trời gốc kết hợp biểu cảm cười khinh bỉ (Smirk) chuẩn 100% màu vàng chanh gốc
    sunSmirk: SUN_SMIRK_ASSETS[SUN_SMIRK_VARIANT],
};

// Bảng tài nguyên 7 vật dụng du lịch bay lơ lửng trên nắp vali bên trái (Shot 3.2 F360+)
const FLOATING_VALI_PROPS = [
    {
        name: 'ticket',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/ticket.png',
        targetX: 14.5, // Tầng cao mép trái
        targetY: 36.0,
        width: 10.5,
        baseRotate: -14,
        z: 110,
        stagger: 0,
        speed: 0.08,
        phase: 0,
        ampY: 6.5,
        ampX: 3,
        ampRot: 5,
    },
    {
        name: 'passport',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/passport.png',
        targetX: 23.5, // Tầng cao phía trong (gần bạn nữ nhưng không che người)
        targetY: 33.0,
        width: 8.8,
        baseRotate: 10,
        z: 95,
        stagger: 3,
        speed: 0.07,
        phase: 1.2,
        ampY: 5.5,
        ampX: 2.5,
        ampRot: 4.5,
    },
    {
        name: 'ao_thun',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/ao_thun.png',
        targetX: 8.5, // Tầng giữa mép trái
        targetY: 48.0,
        width: 11.2,
        baseRotate: -8,
        z: 85,
        stagger: 5,
        speed: 0.09,
        phase: 2.4,
        ampY: 7.5,
        ampX: 3.5,
        ampRot: 6,
    },
    {
        name: 'may_anh',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/may_anh.png',
        targetX: 18.5, // Trung tâm cụm, nhô ra trước camera nhất
        targetY: 47.5,
        width: 9.5,
        baseRotate: 6,
        z: 135,
        stagger: 2,
        speed: 0.075,
        phase: 3.6,
        ampY: 6.0,
        ampX: 2.5,
        ampRot: 4,
    },
    {
        name: 'tui_xach',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/tui_xach.png',
        targetX: 11.0, // Tầng dưới bên trái (sát nắp vali)
        targetY: 59.5,
        width: 9.8,
        baseRotate: 12,
        z: 70,
        stagger: 7,
        speed: 0.065,
        phase: 4.8,
        ampY: 5.0,
        ampX: 2,
        ampRot: 3.5,
    },
    {
        name: 'book',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/book.png',
        targetX: 22.0, // Tầng dưới bên phải nắp vali
        targetY: 58.0,
        width: 8.2,
        baseRotate: -9,
        z: 55,
        stagger: 9,
        speed: 0.085,
        phase: 5.5,
        ampY: 4.5,
        ampX: 2,
        ampRot: 4,
    },
    {
        name: 'thoi_son',
        src: 'assets/elements/screen3/3.2/dna_vali/tachnen/thoi_son.png',
        targetX: 16.5, // Nhỏ xinh lơ lửng ngay mép miệng vali
        targetY: 67.0,
        width: 5.6,
        baseRotate: 16,
        z: 75,
        stagger: 4,
        speed: 0.11,
        phase: 1.8,
        ampY: 4.0,
        ampX: 1.5,
        ampRot: 7,
    },
];

// Bảng hạt bụi gió lấp lánh hoạt hình bay lơ lửng quanh cụm đồ (Shot 3.2 F360+)
const WIND_DUST_PARTICLES = [
    { targetX: 13, targetY: 34, speed: 0.12, ampX: 14, ampY: 8, phase: 0.4, char: '✦', size: 14, color: '#38BDF8' },
    { targetX: 21, targetY: 36, speed: 0.15, ampX: 12, ampY: 10, phase: 1.8, char: '•', size: 11, color: '#FFFFFF' },
    { targetX: 9, targetY: 46, speed: 0.11, ampX: 15, ampY: 9, phase: 3.1, char: '✦', size: 13, color: '#E0F2FE' },
    { targetX: 18, targetY: 50, speed: 0.14, ampX: 13, ampY: 11, phase: 4.6, char: '•', size: 12, color: '#7DD3FC' },
    { targetX: 14, targetY: 61, speed: 0.16, ampX: 14, ampY: 8, phase: 2.2, char: '✦', size: 14, color: '#FFFFFF' },
    { targetX: 23, targetY: 63, speed: 0.13, ampX: 11, ampY: 12, phase: 5.5, char: '•', size: 10, color: '#38BDF8' },
];

// Component đường xoáy gió vector hoạt hình 3D (Cartoon Wind Swirl)
const CartoonWindSwirl: React.FC<{
    left: number;
    top: number;
    width: number;
    aspectRatio: number;
    rotation: number;
    opacity: number;
    scale: number;
    id: string;
    reverse?: boolean;
    zIndex?: number;
}> = ({ left, top, width, aspectRatio, rotation, opacity, scale, id, reverse, zIndex = 50 }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                aspectRatio,
                transform: `translate(-50%, -50%) rotateX(62deg) rotateZ(${rotation}deg) scale(${scale})`,
                transformOrigin: 'center center',
                opacity,
                zIndex,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 10px rgba(56, 189, 248, 0.45)) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.75))',
            }}
        >
            <svg viewBox="0 0 200 90" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`windGrad_${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                        <stop offset="20%" stopColor="#E0F2FE" stopOpacity="0.95" />
                        <stop offset="65%" stopColor="#38BDF8" stopOpacity="0.85" />
                        <stop offset="92%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Luồng gió chính xoắn uốn lượn mượt mà */}
                <path
                    d={
                        reverse
                            ? 'M 185 45 C 185 68, 145 84, 100 84 C 55 84, 15 68, 15 45 C 15 22, 60 8, 105 8 C 145 8, 175 22, 175 42 C 175 58, 140 70, 105 70 C 75 70, 48 58, 48 45'
                            : 'M 15 45 C 15 22, 55 6, 100 6 C 145 6, 185 22, 185 45 C 185 68, 140 82, 95 82 C 55 82, 25 68, 25 48 C 25 32, 60 20, 95 20 C 125 20, 152 32, 152 45'
                    }
                    fill="none"
                    stroke={`url(#windGrad_${id})`}
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeDasharray="220 60"
                    strokeDashoffset={rotation * 2.2}
                />
                {/* Vệt gió phụ thanh mảnh đi kèm tăng cảm giác gió rít hoạt hình */}
                <path
                    d={
                        reverse
                            ? 'M 160 38 C 160 52, 130 64, 98 64 C 66 64, 40 52, 40 38 C 40 25, 70 16, 102 16'
                            : 'M 40 52 C 40 38, 70 26, 102 26 C 134 26, 160 38, 160 52 C 160 65, 130 74, 98 74'
                    }
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeDasharray="100 80"
                    strokeDashoffset={-rotation * 1.8}
                    opacity="0.85"
                />
            </svg>
        </div>
    );
};

// Component Cơn Gió "Bỉ Ổi" lướt ngang Full Màn Hình (100% Dynamic Vector SVG Animation)
const DynamicWindStreamers: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    // Diễn hoạt trong khoảng Frame 366 đến Frame 430 (64 frames ~ 1.0s)
    const isWindActive = frame >= 366 && frame <= 430;
    if (!isWindActive) return null;

    const windProgress = (frame - 366) / 64; // 0 -> 1

    // Độ mờ tổng thể: xuất hiện nhanh, giữ sáng khi quét qua, tan biến ở cuối
    const opacity = interpolate(windProgress, [0, 0.12, 0.78, 1], [0, 0.95, 0.95, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Tọa độ dịch chuyển ngang của cả hệ thống luồng khí: từ ngoài mép trái (-450px) sang phải (+2400px)
    const sweepX = interpolate(windProgress, [0, 1], [-450, 2400], {
        easing: (t) => t * (2 - t), // Ease-out mượt mà lướt xé gió
    });

    // Nhịp sóng uốn lượn hình sin lan truyền liên tục (Travelling Sine Wave)
    const wavePhase = (frame - 366) * 0.18;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 28, // Quét trước mặt cặp đôi (zIndex 25)
                pointerEvents: 'none',
                opacity,
                overflow: 'visible',
            }}
        >
            <svg
                viewBox="0 0 1920 1080"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                }}
            >
                <defs>
                    {/* Dải gradient sáng lấp lánh cho luồng gió chính */}
                    <linearGradient id="mainWindGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                        <stop offset="25%" stopColor="#7DD3FC" stopOpacity="0.85" />
                        <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.95" />
                        <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>

                    {/* Gradient cho tia khí phụ mỏng manh */}
                    <linearGradient id="wispWindGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0" />
                        <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
                    </linearGradient>

                    {/* Filter phát sáng hào quang gió (Breeze Glow) */}
                    <filter id="windGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Nhóm luồng gió dịch chuyển theo sweepX */}
                <g transform={`translate(${sweepX - 800}, 0)`} filter="url(#windGlow)">
                    {/* 1. Luồng gió chính (Main Streamer) - uốn lượn S-curve quét ngang đầu bạn nữ (Y ~ 420) */}
                    <path
                        d={`M 0 540 C 350 ${540 + Math.sin(wavePhase) * 45}, 700 ${390 + Math.cos(wavePhase) * 40}, 1100 ${410 + Math.sin(wavePhase + 1) * 35} C 1450 ${430 + Math.cos(wavePhase + 1) * 40}, 1750 360, 2100 340`}
                        fill="none"
                        stroke="url(#mainWindGrad)"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray="950 350"
                        strokeDashoffset={-windProgress * 1200}
                    />

                    {/* Lõi sáng trắng tinh khôi ở tâm luồng gió chính */}
                    <path
                        d={`M 0 540 C 350 ${540 + Math.sin(wavePhase) * 45}, 700 ${390 + Math.cos(wavePhase) * 40}, 1100 ${410 + Math.sin(wavePhase + 1) * 35} C 1450 ${430 + Math.cos(wavePhase + 1) * 40}, 1750 360, 2100 340`}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="800 500"
                        strokeDashoffset={-windProgress * 1200 - 40}
                        opacity="0.95"
                    />

                    {/* 2. Dải gió phụ phía trên (Upper Accent Wisp) - quẹt lướt vành nón (Y ~ 370) */}
                    <path
                        d={`M 250 470 C 550 ${380 + Math.cos(wavePhase + 0.5) * 35}, 900 ${340 + Math.sin(wavePhase + 0.5) * 30}, 1300 ${370 + Math.cos(wavePhase + 1.2) * 25} C 1600 390, 1900 320, 2250 300`}
                        fill="none"
                        stroke="url(#wispWindGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="700 400"
                        strokeDashoffset={-windProgress * 1400}
                    />

                    {/* 3. Dải gió phụ phía dưới (Lower Swirl Ribbon) - lượn vòng cung trêu tức bạn nam (Y ~ 480) */}
                    <path
                        d={`M 150 600 C 500 ${560 + Math.sin(wavePhase + 2) * 40}, 850 ${460 + Math.cos(wavePhase + 2) * 35}, 1250 ${480 + Math.sin(wavePhase + 2.5) * 30} C 1550 500, 1850 420, 2200 400`}
                        fill="none"
                        stroke="url(#wispWindGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="650 450"
                        strokeDashoffset={-windProgress * 1100}
                    />

                    {/* 4. Hạt tinh thể gió lấp lánh bay theo luồng khí */}
                    {[
                        { rx: 550, ry: 410, size: 5, color: '#FFFFFF', delay: 0 },
                        { rx: 750, ry: 380, size: 4, color: '#BAE6FD', delay: 1 },
                        { rx: 950, ry: 430, size: 6, color: '#38BDF8', delay: 2 },
                        { rx: 1150, ry: 390, size: 5, color: '#FFFFFF', delay: 3 },
                        { rx: 1350, ry: 420, size: 4, color: '#7DD3FC', delay: 4 },
                        { rx: 1550, ry: 370, size: 6, color: '#FFFFFF', delay: 5 },
                        { rx: 1750, ry: 350, size: 5, color: '#BAE6FD', delay: 6 },
                    ].map((dot, idx) => {
                        const bob = Math.sin(wavePhase + dot.delay) * 12;
                        return (
                            <circle
                                key={idx}
                                cx={dot.rx}
                                cy={dot.ry + bob}
                                r={dot.size}
                                fill={dot.color}
                                opacity="0.9"
                            />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export const Scene3_TravelAdventure: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    // ==========================================
    // 🎥 1. CÚ MÁY 2.5D DIORAMA (DEPTH-LAYER-MOVES & TILT-GLIDE)
    // ==========================================
    // Đoạn đầu (Frame 0 - 75): Camera hơi nâng đón máy bay ở tầng trên
    const camIntroTilt = interpolate(frame, [0, 75], [35, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const camIntroScale = interpolate(frame, [0, 75], [1.045, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Đoạn sau (Frame 75 - 360): Slow push-in vi mô tạo chiều sâu điện ảnh
    const camAmbientPush = interpolate(frame, [75, 360], [1.0, 1.03], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Cú rung chấn vi mô khi vệt lốc xoáy chạm nắp vali (Frame 360 - 378)
    const impactProgress = interpolate(frame, [360, 378], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const impactShakeX = frame >= 360 && frame < 378 ? Math.sin((frame - 360) * 1.8) * 4.0 * impactProgress : 0;
    const impactShakeY = frame >= 360 && frame < 378 ? Math.cos((frame - 360) * 1.8) * 3.0 * impactProgress : 0;

    const finalCamScale = camIntroScale * camAmbientPush;
    const finalCamY = camIntroTilt + impactShakeY;
    const finalCamX = impactShakeX;

    // ==========================================
    // ✈️ 2. MÁY BAY MÔ HÌNH CHUYỂN CẢNH (FLY-OVER HOOK)
    // ==========================================
    // Máy bay lướt từ trái sang phải bầu trời trong 85 frames (1.4s đầu)
    // Tọa độ X: từ -30% (ngoài màn hình trái) bay sang 115% (ra khỏi màn hình phải)
    const planeProgress = interpolate(frame, [0, 85], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const planeLeft = interpolate(planeProgress, [0, 1], [-30, 115]);
    // Đường bay hơi lượn nhẹ dạng vòng cung tự nhiên
    const planeTop = interpolate(planeProgress, [0, 0.45, 1], [6.0, 7.8, 5.0]);
    const planeRotate = interpolate(planeProgress, [0, 0.5, 1], [2.5, 0.5, -2.0]);
    // Nhịp bồng bềnh của luồng không khí
    const planeFloat = Math.sin(frame * 0.15) * 2.5;

    // ==========================================
    // 🛩️ 2.5. HOẠT CẢNH "CHIẾC MÁY BAY ĐỎNG ĐẢNH" (FRAME 180 - 360)
    // ==========================================
    // Xuất hiện trên tầng mây đầu bạn nam sau khi cặp đôi ổn định vị trí (F180+)
    const isQuirkyPlaneActive = frame >= 180 && frame <= 360;

    let quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.hover;
    let quirkyPlaneX = 0;
    let quirkyPlaneY = 0;
    let quirkyPlaneRotate = 0;
    let quirkyPlaneScale = 1;
    let quirkyPlaneScaleX = 1;
    let quirkyPlaneOpacity = 1;
    let quirkyPlaneShadow = '0 14px 22px rgba(15, 23, 42, 0.22)';

    if (frame >= 180 && frame < 230) {
        // [Giai đoạn 1: F180 - F230] Hover lơ lửng nhẹ nhàng, mũi ngóc nhẹ
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.hover;
        quirkyPlaneY = Math.sin((frame - 180) * 0.12) * 4;
        quirkyPlaneRotate = 1.5 + Math.sin((frame - 180) * 0.08) * 1.5;
        quirkyPlaneOpacity = interpolate(frame, [180, 195], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        quirkyPlaneShadow = `0 ${14 + Math.sin((frame - 180) * 0.12) * 3}px ${22 + Math.sin((frame - 180) * 0.12) * 4}px rgba(15, 23, 42, 0.22)`;
    } else if (frame >= 230 && frame < 265) {
        // [Giai đoạn 2: F230 - F265] Wobble chao đảo đỏng đảnh, hụt trớn
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.wobble;
        quirkyPlaneY = Math.sin((frame - 230) * 0.22) * 7;
        quirkyPlaneRotate = Math.sin((frame - 230) * 0.2) * 6;
        quirkyPlaneX = Math.sin((frame - 230) * 0.15) * 5;
        quirkyPlaneShadow = `0 ${15 + Math.sin((frame - 230) * 0.22) * 4}px ${24 + Math.sin((frame - 230) * 0.2) * 5}px rgba(15, 23, 42, 0.24)`;
    } else if (frame >= 265 && frame < 290) {
        // [Giai đoạn 3: F265 - F290] Brake Skid phanh kít trên không, há hốc mồm
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.skid;
        const skidProgress = interpolate(frame, [265, 290], [0, 1], { extrapolateRight: 'clamp' });
        quirkyPlaneX = interpolate(skidProgress, [0, 0.4, 1], [0, -18, -12]);
        quirkyPlaneY = frame % 2 === 0 ? 2 : -2; // Rung giật bần bật do phanh kít
        quirkyPlaneRotate = -3;
        quirkyPlaneShadow = '0 10px 16px rgba(15, 23, 42, 0.28)';
    } else if (frame >= 290 && frame < 315) {
        // [Giai đoạn 4: F290 - F315] Squash & Bend cong quéo dồn nén lò xo
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.squash;
        const squashProgress = interpolate(frame, [290, 315], [0, 1], { extrapolateRight: 'clamp' });
        quirkyPlaneScale = 1 + Math.sin(squashProgress * Math.PI) * 0.08;
        quirkyPlaneX = -12 + Math.sin((frame - 290) * 0.3) * 3;
        quirkyPlaneY = Math.sin((frame - 290) * 0.3) * 3;
        quirkyPlaneShadow = `0 ${18 + Math.sin(squashProgress * Math.PI) * 6}px ${28 + Math.sin(squashProgress * Math.PI) * 8}px rgba(15, 23, 42, 0.26)`;
    } else if (frame >= 315 && frame < 328) {
        // [Giai đoạn 5: F315 - F328] Snap Flip búng thun lộn vòng 180 độ
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.snap;
        quirkyPlaneRotate = interpolate(frame, [315, 328], [0, -25]);
        quirkyPlaneScale = 1.05;
        quirkyPlaneX = interpolate(frame, [315, 328], [-12, -40]);
        quirkyPlaneShadow = '0 8px 32px rgba(15, 23, 42, 0.32)';
    } else if (frame >= 328 && frame <= 360) {
        // [Giai đoạn 6: F328 - F360] Zip-out quay đầu 180 độ tháo chạy sang trái
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.zip;
        quirkyPlaneScaleX = -1; // Lật ngược chiều ngang: đầu quay sang trái, đuôi xả khói sang phải
        const zipDistance = interpolate(frame, [328, 360], [0, -2800], {
            extrapolateLeft: 'clamp',
            easing: (t) => t * t * t, // Gia tốc phi tuyến tính phóng xé gió
        });
        quirkyPlaneX = -40 + zipDistance;
        quirkyPlaneY = interpolate(frame, [328, 360], [0, -80]);
        quirkyPlaneRotate = 4; // Chúc nhẹ đầu sang trái theo hướng lao
        quirkyPlaneShadow = '0 10px 24px rgba(15, 23, 42, 0.20)';
    }

    // Luồng lốc xoáy giấy 3D (Wind Vortex) rơi từ máy bay xuống vali (F320 - F368)
    const isVortexActive = frame >= 320 && frame <= 368;
    const vortexProgress = interpolate(frame, [320, 360], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Điểm xuất phát từ máy bay (top ~11%, left ~52%), xoáy rơi thẳng xuống vali bạn nam (top ~57%, left ~48.5%)
    const vortexTop = interpolate(vortexProgress, [0, 0.7, 1], [11, 42, 57]);
    const vortexLeft = interpolate(vortexProgress, [0, 0.7, 1], [52, 50, 48.5]);
    const vortexScale =
        frame <= 360
            ? interpolate(vortexProgress, [0, 0.6, 1], [0.25, 0.9, 1.15])
            : interpolate(frame, [360, 368], [1.15, 1.45], { extrapolateRight: 'clamp' });
    const vortexRotate = interpolate(vortexProgress, [0, 1], [0, 720]) + (frame > 360 ? (frame - 360) * 14 : 0);
    const vortexOpacity =
        frame <= 360
            ? interpolate(vortexProgress, [0, 0.2, 0.85, 1], [0, 1, 0.95, 0.9])
            : interpolate(frame, [360, 368], [0.9, 0], { extrapolateRight: 'clamp' });

    // ==========================================
    // ☀️ 3. MẶT TRỜI & TẦNG MÂY GIẤY (LIVING SKY)
    // ==========================================
    // Mặt trời đã hiện diện sẵn, tỏa sáng & xoay chậm thư thái
    const sunEntrance = interpolate(frame, [0, 20], [0.85, 1.0], {
        extrapolateRight: 'clamp',
    });
    const sunScale = 1 + Math.sin(frame * 0.04) * 0.015;
    const sunRotate = frame * 0.07;

    // 🌞 Hoạt cảnh Mặt Trời "Cười Khinh Bỉ / Smirk" (Shot 3.2 F360+)
    const isSunReacting = frame >= 362;
    // Cú giật mình nhẹ "double-take" trước khi phát hiện biến cố (F362 - F368)
    const sunShockJolt = isSunReacting && frame < 368 ? Math.sin((frame - 362) * 1.5) * 3 : 0;
    // 3D Flip card lật mặt trời sang nét mặt cười đểu (F366 - F378)
    const sunFlipT = interpolate(frame, [366, 378], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const sunFlipRotY = interpolate(sunFlipT, [0, 0.5, 1], [0, 90, 0]);
    const isSmirkVisible = sunFlipT >= 0.5;

    // Khi đã đổi mặt Smirk: nghiêng đầu -7.5° nhìn xéo xuống cặp đôi + nhịp cười rung rinh
    const smirkTilt = isSmirkVisible ? -7.5 + Math.sin((frame - 378) * 0.08) * 2.2 : 0;
    const smirkChuckleY = isSmirkVisible ? Math.sin((frame - 378) * 0.22) * 2.5 : 0;
    const smirkChuckleScale = isSmirkVisible ? 1 + Math.sin((frame - 378) * 0.22) * 0.025 : 1;

    // 👒 Hoạt cảnh Chiếc Mũ Cói Bạn Nữ & Bạn Nam bị gió tốc lật bay bổng (Shot 3.2 F376 - F418)
    const isHatFlying = frame >= 376 && frame < 418;
    let hatFlyY = 0;
    let hatFlyTilt = 0;
    let hatFlyScale = 1;
    let hatFlyOpacity = 1;

    let guyHatFlyY = 0;
    let guyHatFlyTilt = 0;
    let guyHatFlyScale = 1;
    let guyHatFlyOpacity = 1;

    if (frame >= 376 && frame < 390) {
        // [Pha 1: F376 - F390] Gió tạt vào, nón bốc vút lên cao khỏi đầu và chao nghiêng
        const t = (frame - 376) / 14;
        const ease = 1 - Math.pow(1 - t, 2);
        hatFlyY = interpolate(ease, [0, 1], [0, -52]);
        hatFlyTilt = interpolate(ease, [0, 1], [0, -18]);
        hatFlyScale = interpolate(ease, [0, 1], [1.0, 1.05]);
        hatFlyOpacity = interpolate(t, [0, 0.15], [0.8, 1]);

        guyHatFlyY = interpolate(ease, [0, 1], [0, -48]);
        guyHatFlyTilt = interpolate(ease, [0, 1], [0, 14]);
        guyHatFlyScale = interpolate(ease, [0, 1], [1.0, 1.05]);
        guyHatFlyOpacity = interpolate(t, [0, 0.15], [0.8, 1]);
    } else if (frame >= 390 && frame < 404) {
        // [Pha 2: F390 - F404] Đỉnh gió: Nón chao đảo lơ lửng bồng bềnh trên không trung
        const flutter = Math.sin((frame - 390) * 0.75) * 4;
        hatFlyY = -52 + Math.sin((frame - 390) * 0.5) * 5;
        hatFlyTilt = -18 + flutter;
        hatFlyScale = 1.05;
        hatFlyOpacity = 1;

        const guyFlutter = Math.sin((frame - 390) * 0.8) * 3.5;
        guyHatFlyY = -48 + Math.sin((frame - 390) * 0.55) * 4.5;
        guyHatFlyTilt = 14 + guyFlutter;
        guyHatFlyScale = 1.05;
        guyHatFlyOpacity = 1;
    } else if (frame >= 404 && frame < 418) {
        // [Pha 3: F404 - F418] Gió vừa dứt, nón rơi êm xuống đầu đàn hồi lò xo
        const dropSpring = spring({
            frame: frame - 404,
            fps,
            config: { damping: 11, stiffness: 130 },
        });
        hatFlyY = interpolate(dropSpring, [0, 1], [-52, 0]);
        hatFlyTilt = interpolate(dropSpring, [0, 1], [-18, 0]);
        hatFlyScale = interpolate(dropSpring, [0, 0.7, 1], [1.05, 0.98, 1.0]);
        hatFlyOpacity = interpolate(dropSpring, [0.85, 1], [1, 0.2]);

        guyHatFlyY = interpolate(dropSpring, [0, 1], [-48, 0]);
        guyHatFlyTilt = interpolate(dropSpring, [0, 1], [14, 0]);
        guyHatFlyScale = interpolate(dropSpring, [0, 0.7, 1], [1.05, 0.98, 1.0]);
        guyHatFlyOpacity = interpolate(dropSpring, [0.85, 1], [1, 0.2]);
    }

    // Mây trôi Parallax đa tầng ngược chiều
    const cloud1Parallax = interpolate(frame, [0, 360], [-10, 35]);
    const cloud2Parallax = interpolate(frame, [0, 360], [25, -25]);
    const cloud3Parallax = interpolate(frame, [0, 360], [-8, 28]);

    // ==========================================
    // 🌊 4. HIỆU ỨNG VỆT BUNG NỞ (WAVE / TRAIL POP-UP)
    // ==========================================
    // Khi máy bay bay qua, các cụm bối cảnh tuần tự bung nở mượt mà

    // [Cụm 1 - Phía Trái: Frame 15 - 65]
    const leftPodiumSpring = spring({
        frame: frame - 15,
        fps,
        config: { damping: 18, stiffness: 80 },
    });
    const leftPodiumOffsetX = interpolate(leftPodiumSpring, [0, 1], [-100, 0]);

    const greenPalmSpring = spring({
        frame: frame - 22,
        fps,
        config: { damping: 15, stiffness: 75 },
    });
    const greenPalmScale = interpolate(greenPalmSpring, [0, 1], [0.7, 1.0]);
    const greenPalmSway = Math.sin(frame * 0.04) * 0.8;

    // [Cụm 2 - Trung Tâm Sân Khấu: Frame 30 - 75]
    const carpetSpring = spring({
        frame: frame - 30,
        fps,
        config: { damping: 16, stiffness: 85 },
    });
    const carpetScale = interpolate(carpetSpring, [0, 1], [0.75, 1.0]);

    const leftDuneSpring = spring({ frame: frame - 28, fps, config: { damping: 18, stiffness: 80 } });
    const leftDuneRise = interpolate(leftDuneSpring, [0, 1], [70, 0]);

    const rightDuneSpring = spring({ frame: frame - 36, fps, config: { damping: 18, stiffness: 80 } });
    const rightDuneRise = interpolate(rightDuneSpring, [0, 1], [70, 0]);

    // [Cụm 3 - Phía Phải: Frame 45 - 90]
    const rightPodiumSpring = spring({
        frame: frame - 42,
        fps,
        config: { damping: 18, stiffness: 80 },
    });
    const rightPodiumOffsetX = interpolate(rightPodiumSpring, [0, 1], [90, 0]);

    const pinkPalmSpring = spring({
        frame: frame - 48,
        fps,
        config: { damping: 15, stiffness: 75 },
    });
    const pinkPalmScale = interpolate(pinkPalmSpring, [0, 1], [0.7, 1.0]);
    const pinkPalmSway = Math.sin(frame * 0.042 + 1.2) * 1.0;

    const pinkArcSpring = spring({
        frame: frame - 52,
        fps,
        config: { damping: 16, stiffness: 90 },
    });

    const chairSpring = spring({
        frame: frame - 54,
        fps,
        config: { damping: 15, stiffness: 90 },
    });
    const chairDrop = interpolate(chairSpring, [0, 1], [-40, 0]);

    const duckSpring = spring({
        frame: frame - 58,
        fps,
        config: { damping: 13, stiffness: 95 },
    });
    const duckDrop = interpolate(duckSpring, [0, 1], [-50, 0]);
    const duckBob = Math.sin(frame * 0.08) * 3.5;
    const duckRock = Math.sin(frame * 0.08) * 2.2;

    // ==========================================
    // 👫 5. CẶP ĐÔI HERO (CINEMATIC GENTLE GLIDE - TRIỆT TIÊU RUNG LẮC)
    // ==========================================
    // Cặp đôi xuất hiện từ tốn, trang nhã sau khi đĩa thảm xanh đã nở vững chắc (từ Frame 48)
    const coupleEntrance = spring({
        frame: frame - 48,
        fps,
        config: { damping: 24, stiffness: 50 }, // Damping cao -> Chuyển động lướt cực êm ái, hoàn toàn không giật cục
    });

    // Lướt nhẹ nhàng từ cánh trái vào đúng tâm đĩa thảm
    const coupleOffsetX = interpolate(coupleEntrance, [0, 1], [-220, 0]);
    // Khẽ đáp chân nhẹ nhàng khi chạm thảm
    const coupleOffsetY = interpolate(coupleEntrance, [0, 0.7, 1], [-18, 2, 0]);
    const coupleScale = interpolate(coupleEntrance, [0, 1], [0.94, 1.0]);

    // Khi đang lướt vào (Frame 48 - 130), chỉ có nhịp gió lướt vi mô vô cùng êm (~1px)
    const isGliding = frame >= 48 && frame < 135;
    const glideFloat = isGliding ? Math.sin((frame - 48) * 0.1) * 1.0 : 0;

    // Sau khi dừng chân vững vàng (Frame 135 - 360), nhịp thở đại dương thư thái
    const idleBreathing = frame >= 135 && frame < 360 ? Math.sin((frame - 135) * 0.04) * 1.5 : 0;
    const subtleSway = frame >= 135 && frame < 360 ? Math.sin((frame - 135) * 0.03) * 0.35 : 0;

    // ==========================================
    // 😱 5.5. SHOT 3.2: CẶP ĐÔI GIẬT MÌNH & VALI BUNG NẮP (FRAME 360+)
    // ==========================================
    const isShocked = frame >= 360;
    // Cú nảy giật mình tức thì (Startle Jolt)
    const shockSpring = spring({
        frame: frame - 360,
        fps,
        config: { damping: 12, stiffness: 220, mass: 0.7 },
    });
    // Nảy người lên cao ~14px rồi đáp vững chãi xuống thảm
    const shockJumpY = isShocked ? interpolate(shockSpring, [0, 0.35, 1], [0, -14, 0]) : 0;
    // Rung giật bần bật vi mô vì hoảng hốt (F372+)
    const shockShiver = isShocked && frame >= 372 ? Math.sin((frame - 372) * 0.45) * 0.85 : 0;
    // Khẽ đung đưa mồ hôi cartoon
    const shockBreath = isShocked && frame >= 380 ? Math.sin((frame - 380) * 0.06) * 1.2 : 0;
    const currentCoupleSrc = !isShocked
        ? STAGING_SHOT_3_1.couple.src
        : isHatFlying
          ? STAGING_SHOT_3_1.couple.shockNoHatSrc
          : STAGING_SHOT_3_1.couple.shockWithHatSrc;

    // ==========================================
    // 🦆 5.6. SHOT 3.2: CHÚ VỊT BỊ LỐC XOÁY CUỐN BAY, XOAY TÍT 360° ĐỈNH CAO & ĐÁP CẠNH GHẾ XANH
    // ==========================================
    // 1. Frame 0 - 354: Bập bềnh thư thả mép sóng (vit.png)
    // 2. Frame 355 - 371: Lốc xoáy hút bốc bổng lên cao (vit_roiram.png, xoay vòng 1: 0 -> 360°)
    // 3. Frame 372 - 391: ĐỈNH QUỸ ĐẠO: Xoay tròn tít tít 360° thứ hai (360° -> 720°)
    // 4. Frame 392 - 415: Lượn cầu vồng parabol rơi êm xuống cát cạnh ghế xanh
    // 5. Frame 416 - 427: Tiếp đất nén dẹt đàn hồi (Squash & Stretch)
    // 6. Frame 428+: Ngồi bệt choáng váng lắc lư cạnh chân ghế xanh + 3D Orbit Halo

    const isDuckSwirled = frame >= 355;
    const isDuckLifting = frame >= 355 && frame < 372;
    const isDuckSpinningTop = frame >= 372 && frame < 392;
    const isDuckDescending = frame >= 392 && frame < 416;
    const isDuckLanding = frame >= 416 && frame < 428;
    const isDuckSafe = frame >= 428;

    // Ảnh vịt: F355+ chuyển sang mắt xoắn ốc hoa mắt vit_roiram.png
    const currentDuckSrc = isDuckSwirled ? STAGING_SHOT_3_1.rubberDuck.dizzySrc : STAGING_SHOT_3_1.rubberDuck.src;

    // Tọa độ X (Từ 0 -> -28px hút về lốc xoáy -> lượn sang +48px cạnh ghế xanh)
    let duckFlightX = 0;
    if (frame < 355) {
        duckFlightX = 0;
    } else if (isDuckLifting) {
        // Hút chếch sang trái về phía tâm lốc xoáy: 0 -> -28px
        const t = (frame - 355) / 17;
        duckFlightX = interpolate(t, [0, 1], [0, -28], { easing: (x) => x * x });
    } else if (isDuckSpinningTop) {
        // Đỉnh quỹ đạo: lơ lửng và lượn nhẹ từ -28px sang -12px
        const t = (frame - 372) / 20;
        duckFlightX = interpolate(t, [0, 1], [-28, -12]);
    } else if (isDuckDescending) {
        // Lượn cầu vồng sang phải đáp cạnh ghế: -12px -> +48px
        const t = (frame - 392) / 24;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        duckFlightX = interpolate(ease, [0, 1], [-12, 48]);
    } else {
        // Yên vị an toàn cạnh ghế xanh
        duckFlightX = 48;
    }

    // Tọa độ Y (Bốc cao -115px -> Đỉnh nhấp nhô -> Rơi êm xuống -28px cạnh chân ghế)
    let duckFlightY = 0;
    if (frame < 355) {
        duckFlightY = duckBob;
    } else if (isDuckLifting) {
        // Bốc vút lên cao: 0 -> -115px
        const t = (frame - 355) / 17;
        duckFlightY = interpolate(t, [0, 1], [0, -115], { easing: (x) => 1 - Math.pow(1 - x, 2) });
    } else if (isDuckSpinningTop) {
        // Lơ lửng đỉnh sóng: khẽ nhấp nhô quanh -115px đến -119px
        const t = (frame - 372) / 20;
        duckFlightY = -115 - Math.sin(t * Math.PI) * 4;
    } else if (isDuckDescending) {
        // Rơi êm ái xuống mặt cát: -115px -> -28px
        const t = (frame - 392) / 24;
        duckFlightY = interpolate(t, [0, 1], [-115, -28], { easing: (x) => x * x });
    } else if (isDuckLanding) {
        // Tiếp đất nảy nhẹ lò xo
        const t = (frame - 416) / 12;
        duckFlightY = -28 + Math.sin(t * Math.PI) * -5;
    } else {
        // Ngồi thở nhẹ trên cát cạnh ghế
        duckFlightY = -28 + Math.sin((frame - 428) * 0.05) * 1.2;
    }

    // Tọa độ Z (3D Spatial Depth: bay vọt ra phía trước camera khi ở trên không)
    let duckFlightZ = 0;
    if (frame < 355) {
        duckFlightZ = 0;
    } else if (isDuckLifting) {
        duckFlightZ = interpolate(frame, [355, 372], [0, 120]);
    } else if (isDuckSpinningTop) {
        duckFlightZ = 120;
    } else if (isDuckDescending) {
        duckFlightZ = interpolate(frame, [392, 416], [120, 0]);
    } else {
        duckFlightZ = 0;
    }

    // Góc xoay (Rotation):
    // - Pha bốc lên: xoay 1 vòng 0 -> 360°
    // - Đỉnh quỹ đạo: CÚ XOAY TÍT 360° THỨ HAI (360° -> 720°)
    // - Rơi xuống: ổn định thăng bằng 720° (tương đương 0°)
    // - Sau tiếp đất: lắc lư lảo đảo ±4.5°
    let duckRotation = 0;
    if (frame < 355) {
        duckRotation = duckRock;
    } else if (isDuckLifting) {
        const t = (frame - 355) / 17;
        duckRotation = t * 360;
    } else if (isDuckSpinningTop) {
        // 🌪️ CÚ XOAY TÍT 360° ĐỈNH CAO: Gia tốc mượt mà ở giữa
        const t = (frame - 372) / 20;
        const spinEase = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        duckRotation = 360 + spinEase * 360;
    } else if (isDuckDescending) {
        duckRotation = 720;
    } else if (isDuckLanding) {
        duckRotation = 720;
    } else {
        // Lắc lư lảo đảo vì còn choáng váng
        duckRotation = 720 + Math.sin((frame - 428) * 0.15) * 4.5;
    }

    // Co dãn hình thể đàn hồi (Squash & Stretch)
    let duckSquashX = 1;
    let duckSquashY = 1;
    if (isDuckLifting) {
        // Bị kéo dài thon theo chiều dọc khi bốc lên
        duckSquashX = 0.94;
        duckSquashY = 1.08;
    } else if (isDuckSpinningTop) {
        duckSquashX = 1;
        duckSquashY = 1;
    } else if (isDuckLanding) {
        // Tiếp đất nén dẹt rồi nảy hồi
        const t = (frame - 416) / 12;
        duckSquashX = 1 + Math.sin(t * Math.PI) * 0.1;
        duckSquashY = 1 - Math.sin(t * Math.PI) * 0.1;
    }

    // Tỉ lệ scale cho ảnh vuông 2048x2048 (vit_roiram có padding 1:1)
    const duckDisplayScale = isDuckSwirled ? 1.48 : 1.0;
    const duckAlignOffsetY = isDuckSwirled ? 18 : 0;

    // Bóng sàn thích ứng 2.5D:
    // Khi vịt bay lên cao, bóng mờ dần và thu nhỏ; khi rơi xuống đất cạnh ghế, bóng đậm lại
    const duckAltitude = Math.max(0, -duckFlightY);
    const duckShadowOpacity = interpolate(duckAltitude, [0, 90], [0.55, 0.1], {
        extrapolateRight: 'clamp',
    });
    const duckShadowScale = interpolate(duckAltitude, [0, 90], [1.0, 0.5], {
        extrapolateRight: 'clamp',
    });

    // 🌟 VÒNG 3 NGÔI SAO CHOÁNG VÁNG 3D XOAY TÍT QUANH ĐỈNH ĐẦU
    // Bắt đầu hé nở từ Frame 375 (ngay trên đỉnh xoay tít) và tỏa sáng rực rỡ khi tiếp đất!
    const starHaloVisible = isDuckSwirled && frame >= 375;
    const starHaloOpacity = interpolate(frame, [375, 395], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const starOrbitSpeed = (frame - 375) * 0.12;
    const dizzyStars = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((phase) => {
        const a = starOrbitSpeed + phase;
        const sinVal = Math.sin(a);
        const cosVal = Math.cos(a);
        return {
            x: cosVal * 42,
            y: sinVal * 12 - 108,
            scale: interpolate(sinVal, [-1, 1], [0.75, 1.25]),
            opacity: interpolate(sinVal, [-1, 1], [0.65, 1.0]) * starHaloOpacity,
            zIndex: sinVal > 0 ? 32 : 27,
        };
    });

    // ==========================================
    // 📍 TỌA ĐỘ GỐC DO BẠN TINH CHỈNH (PRESERVED 100%)
    // ==========================================
    const BASE_OFFSETS = {
        leftPodiumHills: { x: -6.5, y: 46.2 },
        greenPalm: { x: 0.9, y: 48.5 },
        pinkArcBird: { x: -458.5, y: -320.7 },
        bluePodiumCarpet: { x: 133.6, y: 2.9 },
        leftDune: { x: 0, y: -25.2 },
        rightDune: { x: -537.6, y: -483.9 },
        couple: { x: 203.5, y: -13.8 },
        beachChair: { x: -38.2, y: -58.9 },
        rubberDuck: { x: -91.8, y: -5.0 },
    };

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                backgroundColor: colors.bgLight,
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                perspective: 2000,
                transformStyle: 'preserve-3d',
            }}
        >
            {/* KHUNG DIORAMA 2.5D CÓ CÚ MÁY TILT-GLIDE & DEPTH-LAYER-MOVES */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `scale(${finalCamScale}) translate(${finalCamX}px, ${finalCamY}px)`,
                    transformOrigin: '50% 55%',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* 1. NỀN BIỂN VÀ BÃI CÁT PAPER-CUT (16:9) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.bg.src)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: STAGING_SHOT_3_1.bg.zIndex,
                        pointerEvents: 'none',
                    }}
                />

                {/* 2. MẶT TRỜI GIẤY NHIỀU TIA & BIỂU CẢM CƯỜI KHINH BỈ (SMIRK SIDE-EYE) */}
                <div
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.sun.left,
                        top: STAGING_SHOT_3_1.sun.top,
                        width: STAGING_SHOT_3_1.sun.width,
                        zIndex: STAGING_SHOT_3_1.sun.zIndex,
                        pointerEvents: 'none',
                        opacity: sunEntrance,
                        transform: !isSmirkVisible
                            ? `translate(53px, ${-25 + sunShockJolt}px) scale(${sunScale}) rotate(${sunRotate}deg) rotateY(${sunFlipRotY}deg)`
                            : `translate(53px, ${-25 + smirkChuckleY}px) scale(${sunScale * smirkChuckleScale}) rotate(${smirkTilt}deg) rotateY(${sunFlipRotY}deg)`,
                        transformOrigin: 'center center',
                        perspective: 800,
                    }}
                >
                    <Img
                        src={staticFile(!isSmirkVisible ? STAGING_SHOT_3_1.sun.src : SHOT_3_2_COMEDY_ASSETS.sunSmirk)}
                        style={{
                            width: '120%',
                            height: 'auto',
                            display: 'block',
                            filter: isSmirkVisible ? 'drop-shadow(0 10px 22px rgba(245, 158, 11, 0.40))' : undefined,
                            translate: '87px -174.2px'
                        }}
                    />
                </div>

                {/* 3. TẦNG MÂY GIẤY 1 (Góc trên bên trái) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.cloud1.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.cloud1.left,
                        top: STAGING_SHOT_3_1.cloud1.top,
                        width: STAGING_SHOT_3_1.cloud1.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.cloud1.zIndex,
                        pointerEvents: 'none',
                        transform: `translateX(${cloud1Parallax}px)`,
                    }}
                />

                {/* 4. TẦNG MÂY GIẤY 2 (Trung tâm bầu trời) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.cloud2.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.cloud2.left,
                        top: STAGING_SHOT_3_1.cloud2.top,
                        width: STAGING_SHOT_3_1.cloud2.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.cloud2.zIndex,
                        pointerEvents: 'none',
                        transform: `translateX(${cloud2Parallax}px)`,
                    }}
                />

                {/* 5. TẦNG MÂY GIẤY 3 (Phía trên bên phải) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.cloud3.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.cloud3.left,
                        top: STAGING_SHOT_3_1.cloud3.top,
                        width: STAGING_SHOT_3_1.cloud3.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.cloud3.zIndex,
                        pointerEvents: 'none',
                        transform: `translateX(${cloud3Parallax}px)`,
                    }}
                />

                {/* ✈️ 6. CHIẾC MÁY BAY MÔ HÌNH (CẦU NỐI CHUYỂN CẢNH FLY-OVER HOOK) */}
                {planeProgress < 1 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_1.airplane.src)}
                        style={{
                            position: 'absolute',
                            left: `${planeLeft}%`,
                            top: `${planeTop}%`,
                            width: STAGING_SHOT_3_1.airplane.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_1.airplane.zIndex,
                            pointerEvents: 'none',
                            transform: `translateY(${planeFloat}px) rotate(${planeRotate}deg)`,
                            transformOrigin: 'center center',
                            filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.12))',
                        }}
                    />
                )}

                {/* 🛩️ 6.5. CHIẾC MÁY BAY ĐỎNG ĐẢNH TRÊN TẦNG MÂY ĐẦU BẠN NAM (F180 - F360) */}
                {isQuirkyPlaneActive && (
                    <Img
                        src={staticFile(quirkyPlaneSrc)}
                        style={{
                            position: 'absolute',

                            // Ngay trên đầu bạn nam, trên tầng mây
                            left: '49.0%',

                            top: '8.2%',
                            width: '26.0%',
                            height: 'auto',
                            zIndex: 22,
                            pointerEvents: 'none',
                            opacity: quirkyPlaneOpacity,
                            transform: `translate(${quirkyPlaneX}px, ${quirkyPlaneY}px) scale(${quirkyPlaneScaleX * quirkyPlaneScale}, ${quirkyPlaneScale}) rotate(${quirkyPlaneRotate}deg)`,
                            transformOrigin: 'center center',
                            filter: `drop-shadow(${quirkyPlaneShadow})`,
                            translate: '-245.5px -224.8px',
                        }}
                    />
                )}

                {/* 🌪️ 6.6. VỆT LỐC XOÁY GIẤY 3D THỔI XUỐNG VALI (KÍCH HOẠT SHOT 3.2) */}
                {isVortexActive && (
                    <Img
                        src={staticFile(QUIRKY_PLANE_ASSETS.vortex)}
                        style={{
                            position: 'absolute',
                            left: `${vortexLeft}%`,
                            top: `${vortexTop}%`,
                            width: '18.0%',
                            height: 'auto',
                            zIndex: 27, // Nằm trên cả cặp đôi (zIndex 25) để lốc xoáy thổi trực diện vào vali
                            pointerEvents: 'none',
                            opacity: vortexOpacity,
                            transform: `scale(${vortexScale}) rotate(${vortexRotate}deg)`,
                            transformOrigin: 'center center',
                            filter: 'drop-shadow(0 12px 20px rgba(15, 23, 42, 0.22))',
                        }}
                    />
                )}

                {/* 🌪️ 6.7. CƠN GIÓ "BỈ ỔI" LƯỚT QUANH FULL MÀN HÌNH (100% DYNAMIC VECTOR SVG STREAMERS) */}
                <DynamicWindStreamers frame={frame} fps={fps} />

                {/* 7. BẬC THANG PODIUM HỒNG BÊN TRÁI & TÁN ĐỒI XANH */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.leftPodiumHills.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.leftPodiumHills.left,
                        top: STAGING_SHOT_3_1.leftPodiumHills.top,
                        width: STAGING_SHOT_3_1.leftPodiumHills.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.leftPodiumHills.zIndex,
                        pointerEvents: 'none',
                        opacity: leftPodiumSpring,
                        transform: `translate(${BASE_OFFSETS.leftPodiumHills.x + leftPodiumOffsetX}px, ${BASE_OFFSETS.leftPodiumHills.y}px)`,
                        filter: 'drop-shadow(0 12px 18px rgba(15, 23, 42, 0.12))',
                    }}
                />

                {/* 8. CÂY DỪA XANH LỚN BÊN TRÁI */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.greenPalm.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.greenPalm.left,
                        top: STAGING_SHOT_3_1.greenPalm.top,
                        width: STAGING_SHOT_3_1.greenPalm.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.greenPalm.zIndex,
                        pointerEvents: 'none',
                        opacity: greenPalmSpring,
                        transform: `translate(${BASE_OFFSETS.greenPalm.x}px, ${BASE_OFFSETS.greenPalm.y}px) scale(${greenPalmScale}) rotate(${greenPalmSway}deg)`,
                        transformOrigin: '25% 95%',
                        filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.14))',
                    }}
                />

                {/* 9. CÂY DỪA HỒNG BÊN PHẢI (Trước mặt trời) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.pinkPalm.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.pinkPalm.left,
                        top: STAGING_SHOT_3_1.pinkPalm.top,
                        width: STAGING_SHOT_3_1.pinkPalm.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.pinkPalm.zIndex,
                        pointerEvents: 'none',
                        opacity: pinkPalmSpring,
                        transform: `scale(${pinkPalmScale}) rotate(${pinkPalmSway}deg)`,
                        transformOrigin: '80% 95%',
                        filter: 'drop-shadow(0 12px 18px rgba(15, 23, 42, 0.12))',
                    }}
                />

                {/* 10. BẬC THANG XOẮN ỐC BÊN PHẢI */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.rightPodiumStairs.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.rightPodiumStairs.left,
                        top: STAGING_SHOT_3_1.rightPodiumStairs.top,
                        width: STAGING_SHOT_3_1.rightPodiumStairs.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.rightPodiumStairs.zIndex,
                        pointerEvents: 'none',
                        opacity: rightPodiumSpring,
                        transform: `translateX(${rightPodiumOffsetX}px)`,
                        filter: 'drop-shadow(0 14px 20px rgba(15, 23, 42, 0.13))',
                    }}
                />

                {/* 11. VÒNG CUNG NGHỆ THUẬT / CÁNH CHIM HỒNG (Điểm xuyết trên cầu thang phải) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.pinkArcBird.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.pinkArcBird.left,
                        top: STAGING_SHOT_3_1.pinkArcBird.top,
                        width: STAGING_SHOT_3_1.pinkArcBird.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.pinkArcBird.zIndex,
                        pointerEvents: 'none',
                        opacity: pinkArcSpring,
                        transform: `translate(${BASE_OFFSETS.pinkArcBird.x}px, ${BASE_OFFSETS.pinkArcBird.y}px) scale(${pinkArcSpring})`,
                        filter: 'drop-shadow(0 8px 14px rgba(15, 23, 42, 0.14))',
                    }}
                />

                {/* 12. ĐĨA THẢM TRÒN XANH PASTEL (Podium trung tâm - BÓNG SẮC NÉT CHUẨN PAPER-CUT) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.bluePodiumCarpet.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.bluePodiumCarpet.left,
                        top: STAGING_SHOT_3_1.bluePodiumCarpet.top,
                        width: STAGING_SHOT_3_1.bluePodiumCarpet.width,
                        height: STAGING_SHOT_3_1.bluePodiumCarpet.height,
                        zIndex: STAGING_SHOT_3_1.bluePodiumCarpet.zIndex,
                        pointerEvents: 'none',
                        opacity: carpetSpring,
                        transform: `translate(${BASE_OFFSETS.bluePodiumCarpet.x}px, ${BASE_OFFSETS.bluePodiumCarpet.y}px) scale(${carpetScale})`,
                        transformOrigin: 'center center',
                        filter: 'drop-shadow(0 3px 3px rgba(15, 23, 42, 0.40)) drop-shadow(0 6px 12px rgba(15, 23, 42, 0.22))',
                    }}
                />

                {/* 13. ĐỤN CÁT TRẮNG XẾP LỚP TIỀN CẢNH BÊN TRÁI */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.leftDune.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.leftDune.left,
                        top: STAGING_SHOT_3_1.leftDune.top,
                        width: STAGING_SHOT_3_1.leftDune.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.leftDune.zIndex,
                        pointerEvents: 'none',
                        opacity: leftDuneSpring,
                        transform: `translate(${BASE_OFFSETS.leftDune.x}px, ${BASE_OFFSETS.leftDune.y + leftDuneRise}px)`,
                        filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.12))',
                    }}
                />

                {/* 14. ĐỤN CÁT TRẮNG XẾP LỚP TIỀN CẢNH BÊN PHẢI */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.rightDune.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.rightDune.left,
                        top: STAGING_SHOT_3_1.rightDune.top,
                        width: STAGING_SHOT_3_1.rightDune.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.rightDune.zIndex,
                        pointerEvents: 'none',
                        opacity: rightDuneSpring,
                        transform: `translate(${BASE_OFFSETS.rightDune.x}px, ${BASE_OFFSETS.rightDune.y + rightDuneRise}px)`,
                        filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.12))',
                    }}
                />

                {/* 14.5. BÓNG TIẾP ĐẤT & CHIẾU SÀN DƯỚI 2 CHIẾC VALI TRÊN MẶT THẢM */}
                {!isShocked ? (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_1.couple.left,
                            top: STAGING_SHOT_3_1.couple.top,
                            width: STAGING_SHOT_3_1.couple.width,
                            aspectRatio: '1671 / 941',
                            zIndex: 24, // Nằm ngay dưới couple (zIndex 25) và trên mặt thảm (zIndex 15)
                            pointerEvents: 'none',
                            opacity: coupleEntrance,
                            transform: `translate(${BASE_OFFSETS.couple.x + coupleOffsetX}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + glideFloat + idleBreathing}px) scale(${coupleScale}) rotate(${subtleSway}deg)`,
                            transformOrigin: 'center bottom',
                        }}
                    >
                        {/* Bóng chiếu sàn dưới người phụ nữ */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '25.2%',
                                top: '90.2%',
                                width: '17.8%',
                                height: '5.6%',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(12, 74, 110, 0.70) 0%, rgba(15, 23, 42, 0.48) 45%, rgba(15, 23, 42, 0) 75%)',
                                filter: 'blur(5px)',
                                transform: 'rotate(-1deg)',
                            }}
                        />

                        {/* Bóng chiếu sàn dưới người đàn ông */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '41.6%',
                                top: '89.8%',
                                width: '22.4%',
                                height: '5.2%',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(12, 74, 110, 0.55) 0%, rgba(15, 23, 42, 0.38) 50%, rgba(15, 23, 42, 0) 80%)',
                                filter: 'blur(9px)',
                                transform: 'rotate(0.5deg)',
                            }}
                        />
                    </div>
                ) : (
                    /* HỆ THỐNG BÓNG SÀN SHOT 3.2: 2 VALI BUNG NẮP & ĐỒ ĐẠC TRÀN RA */
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_1.couple.left,
                            top: STAGING_SHOT_3_1.couple.top,
                            width: STAGING_SHOT_3_1.couple.width,
                            aspectRatio: '2400 / 1340',
                            zIndex: 24,
                            pointerEvents: 'none',
                            opacity: coupleEntrance,
                            transform: `translate(${BASE_OFFSETS.couple.x + coupleOffsetX + shockShiver}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + shockJumpY + shockBreath}px) scale(${coupleScale})`,
                            transformOrigin: 'center bottom',
                        }}
                    >
                        {/* Bóng sàn dưới vali to bên trái bung ngửa + quần áo tràn */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '7.5%',
                                top: '88.5%',
                                width: '31.0%',
                                height: '6.8%',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(12, 74, 110, 0.72) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0) 80%)',
                                filter: 'blur(6px)',
                                transform: 'rotate(-2deg)',
                            }}
                        />
                        {/* Bóng sàn dưới chân bạn nữ */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '36.5%',
                                top: '91.8%',
                                width: '9.5%',
                                height: '4.5%',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(12, 74, 110, 0.65) 0%, rgba(15, 23, 42, 0.40) 50%, rgba(15, 23, 42, 0) 75%)',
                                filter: 'blur(5px)',
                            }}
                        />
                        {/* Bóng sàn dưới chân bạn nam */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '55.2%',
                                top: '91.2%',
                                width: '13.5%',
                                height: '4.8%',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(12, 74, 110, 0.60) 0%, rgba(15, 23, 42, 0.38) 50%, rgba(15, 23, 42, 0) 80%)',
                                filter: 'blur(7px)',
                            }}
                        />
                        {/* Bóng sàn dưới vali nhỏ bên phải bật nắp */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '63.5%',
                                top: '88.0%',
                                width: '25.0%',
                                height: '6.2%',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(12, 74, 110, 0.68) 0%, rgba(15, 23, 42, 0.42) 50%, rgba(15, 23, 42, 0) 80%)',
                                filter: 'blur(6px)',
                                transform: 'rotate(1deg)',
                            }}
                        />
                    </div>
                )}

                {/* 15. CẶP ĐÔI DU LỊCH (SHOT 3.1 THONG DONG -> SHOT 3.2 HOẢNG HỐT VALI BUNG NẮP & TỐC NÓN) */}
                <div
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.couple.left,
                        top: STAGING_SHOT_3_1.couple.top,
                        width: STAGING_SHOT_3_1.couple.width,
                        height: 'auto',
                        aspectRatio: !isShocked ? '1671 / 941' : '2400 / 1340',
                        zIndex: STAGING_SHOT_3_1.couple.zIndex,
                        pointerEvents: 'none',
                        opacity: coupleEntrance,
                        transform: !isShocked
                            ? `translate(${BASE_OFFSETS.couple.x + coupleOffsetX}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + glideFloat + idleBreathing}px) scale(${coupleScale}) rotate(${subtleSway}deg)`
                            : `translate(${BASE_OFFSETS.couple.x + coupleOffsetX + shockShiver}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + shockJumpY + shockBreath}px) scale(${coupleScale})`,
                        transformOrigin: 'center bottom',
                        filter: 'drop-shadow(0 4px 6px rgba(15, 23, 42, 0.45)) drop-shadow(-4px 16px 24px rgba(15, 23, 42, 0.30)) drop-shadow(-8px 32px 48px rgba(15, 23, 42, 0.22))',
                        translate: '83.5px -16.5px',
                    }}
                >
                    {/* Thân cặp đôi (Khi không bay nón: cupple_lolang_3.png nguyên vẹn 100%; Khi gió tốc nón: cupple_khong_mu.png với tóc bồng bềnh sạch sẽ) */}
                    <Img
                        src={staticFile(currentCoupleSrc)}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                    />

                    {/* Chiếc mũ cói nguyên vẹn bay bổng trên không trung khi gió quét qua (F376 - F418) */}
                    {isShocked && isHatFlying && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '39.92%',
                                top: '17.20%',
                                width: '19.15%',
                                transform: `translate(-50%, -50%) translateY(${hatFlyY}px) rotate(${hatFlyTilt}deg) scale(${hatFlyScale})`,
                                transformOrigin: 'center center',
                                filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.35))',
                                opacity: hatFlyOpacity,
                                pointerEvents: 'none',
                            }}
                        >
                            <Img
                                src={staticFile(STAGING_SHOT_3_1.couple.flyingHatSrc)}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    translate: '-11.7px -205.8px',
                                }}
                            />
                        </div>
                    )}

                    {/* Chiếc mũ bạn nam bay bổng trên không trung khi gió quét qua (F376 - F418) */}
                    {isShocked && isHatFlying && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '60.42%',
                                top: '13.25%',
                                width: '17.92%',
                                transform: `translate(-50%, -50%) translateY(${guyHatFlyY}px) rotate(${guyHatFlyTilt}deg) scale(${guyHatFlyScale})`,
                                transformOrigin: 'center center',
                                filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.35))',
                                opacity: guyHatFlyOpacity,
                                pointerEvents: 'none',
                            }}
                        >
                            <Img
                                src={staticFile(STAGING_SHOT_3_1.couple.flyingManHatSrc)}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    translate: '-22.6px -243.8px',
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* 15.5. CỤM 7 VẬT DỤNG DU LỊCH BAY LƠ LỬNG TRÊN VALI NGƯỜI NỮ BÊN TRÁI & VÒNG XOÁY GIÓ HOẠT HÌNH (SHOT 3.2 FRAME 360+) */}
                {isShocked && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_1.couple.left,
                            top: STAGING_SHOT_3_1.couple.top,
                            width: STAGING_SHOT_3_1.couple.width,
                            aspectRatio: '2400 / 1340',
                            zIndex: 26, // Nằm trên couple (zIndex 25)
                            pointerEvents: 'none',
                            transform: `translate(${BASE_OFFSETS.couple.x + coupleOffsetX + shockShiver}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + shockJumpY + shockBreath}px) scale(${coupleScale})`,
                            transformOrigin: 'center bottom',
                            transformStyle: 'preserve-3d',
                            translate: '83.5px -16.5px',
                        }}
                    >
                        {/* 🌀 HỆ THỐNG VÒNG XOÁY GIÓ HOẠT HÌNH & HẠT BỤI GIÓ 3D (CARTOON WIND SWIRLS) */}
                        {(() => {
                            const windSwirlSpring = spring({
                                frame: frame - 360,
                                fps,
                                config: { damping: 15, stiffness: 90 },
                            });
                            const windSwirlOpacity = interpolate(windSwirlSpring, [0, 0.3, 1], [0, 0.95, 0.9]);
                            const windSwirlScale = interpolate(windSwirlSpring, [0, 0.7, 1], [0.2, 1.08, 1.0]);

                            return (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        translate: '141px -134.3px',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {/* [Lớp Gió Sau] 3 Vòng xoáy chính ôm trọn 3 tầng đồ vật */}
                                    <CartoonWindSwirl
                                        id="top"
                                        left={19}
                                        top={34.5}
                                        width={24}
                                        aspectRatio={2.1}
                                        rotation={(frame - 360) * 4.2}
                                        opacity={windSwirlOpacity}
                                        scale={windSwirlScale}
                                        zIndex={45}
                                    />
                                    <CartoonWindSwirl
                                        id="mid"
                                        left={14}
                                        top={48.0}
                                        width={26}
                                        aspectRatio={2.2}
                                        rotation={-(frame - 360) * 4.8}
                                        opacity={windSwirlOpacity}
                                        scale={windSwirlScale}
                                        reverse
                                        zIndex={45}
                                    />
                                    <CartoonWindSwirl
                                        id="low"
                                        left={16.5}
                                        top={61.5}
                                        width={23}
                                        aspectRatio={2.0}
                                        rotation={(frame - 360) * 3.8}
                                        opacity={windSwirlOpacity}
                                        scale={windSwirlScale}
                                        zIndex={45}
                                    />

                                    {/* [Lớp Gió Trước & Hạt Bụi Lấp Lánh] Đan xen đè lên đồ vật tạo chiều sâu không gian 3D */}
                                    <CartoonWindSwirl
                                        id="front_cam"
                                        left={18.5}
                                        top={47.5}
                                        width={16}
                                        aspectRatio={2.0}
                                        rotation={(frame - 360) * 5.6}
                                        opacity={windSwirlOpacity * 0.85}
                                        scale={windSwirlScale * 0.95}
                                        zIndex={140}
                                    />
                                    <CartoonWindSwirl
                                        id="front_ticket"
                                        left={14.5}
                                        top={36.0}
                                        width={14}
                                        aspectRatio={2.0}
                                        rotation={-(frame - 360) * 6.2}
                                        opacity={windSwirlOpacity * 0.85}
                                        scale={windSwirlScale * 0.95}
                                        reverse
                                        zIndex={140}
                                    />

                                    {/* Hạt bụi gió lấp lánh (Wind Sparkle Dust Particles) bay lơ lửng */}
                                    {WIND_DUST_PARTICLES.map((dust, dIdx) => {
                                        const launchFrame = 360 + (dIdx % 3) * 2;
                                        const dustSpring = spring({
                                            frame: frame - launchFrame,
                                            fps,
                                            config: { damping: 13, stiffness: 95 },
                                        });
                                        const dustOpacity = interpolate(dustSpring, [0, 0.3, 1], [0, 0.95, 0.85]);
                                        const dLeft = interpolate(dustSpring, [0, 1], [17.5, dust.targetX]);
                                        const dTop = interpolate(dustSpring, [0, 1], [78.0, dust.targetY]);

                                        const floatTime = Math.max(0, frame - launchFrame - 10);
                                        const dX = Math.cos(floatTime * dust.speed + dust.phase) * dust.ampX;
                                        const dY = Math.sin(floatTime * dust.speed * 1.2 + dust.phase) * dust.ampY;

                                        return (
                                            <div
                                                key={`dust_${dIdx}`}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${dLeft}%`,
                                                    top: `${dTop}%`,
                                                    transform: `translate(-50%, -50%) translate(${dX}px, ${dY}px)`,
                                                    fontSize: dust.size,
                                                    lineHeight: 1,
                                                    color: dust.color,
                                                    opacity: dustOpacity,
                                                    zIndex: 145,
                                                    filter: `drop-shadow(0 2px 4px ${dust.color})`,
                                                    userSelect: 'none',
                                                    pointerEvents: 'none',
                                                }}
                                            >
                                                {dust.char}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}

                        {FLOATING_VALI_PROPS.map((prop, idx) => {
                            const launchFrame = 360 + prop.stagger;
                            const launchSpring = spring({
                                frame: frame - launchFrame,
                                fps,
                                config: { damping: 14, stiffness: 85, mass: 0.7 },
                            });
                            const opacity = interpolate(launchSpring, [0, 0.25, 1], [0, 1, 1]);
                            const scale = interpolate(launchSpring, [0, 0.7, 1], [0.35, 1.1, 1.0]);

                            // Bắn từ đáy vali (17.5%, 78.0%) lên trạm lơ lửng trên nắp vali
                            const currentLeft = interpolate(launchSpring, [0, 1], [17.5, prop.targetX]);
                            const currentTop = interpolate(launchSpring, [0, 1], [78.0, prop.targetY]);

                            // Chuyển động lơ lửng hữu cơ (Organic Floating Hover Wave)
                            const floatTime = Math.max(0, frame - launchFrame - 15);
                            const hoverY = Math.sin(floatTime * prop.speed + prop.phase) * prop.ampY;
                            const hoverX = Math.cos(floatTime * prop.speed * 0.7 + prop.phase) * prop.ampX;
                            const hoverRot =
                                prop.baseRotate + Math.sin(floatTime * prop.speed + prop.phase) * prop.ampRot;

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        position: 'absolute',
                                        left: `${currentLeft}%`,
                                        top: `${currentTop}%`,
                                        width: `${prop.width}%`,
                                        aspectRatio: '1 / 1',
                                        opacity,
                                        transform: `translate(-50%, -50%) translate3d(${hoverX}px, ${hoverY}px, ${prop.z}px) rotate(${hoverRot}deg) scale(${scale})`,
                                        transformOrigin: 'center center',
                                        filter: 'drop-shadow(0 4px 6px rgba(15, 23, 42, 0.22)) drop-shadow(0 10px 16px rgba(15, 23, 42, 0.15))',
                                    }}
                                >
                                    <Img
                                        src={staticFile(prop.src)}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                            translate: '141px -134.3px',
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 16. GHẾ NGHỈ BÃI BIỂN SỌC XANH TRẮNG (SHARP WOODEN LEG CONTACT SHADOW) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_1.beachChair.src)}
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.beachChair.left,
                        top: STAGING_SHOT_3_1.beachChair.top,
                        width: STAGING_SHOT_3_1.beachChair.width,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_1.beachChair.zIndex,
                        pointerEvents: 'none',
                        opacity: chairSpring,
                        transform: `translate(${BASE_OFFSETS.beachChair.x}px, ${BASE_OFFSETS.beachChair.y + chairDrop}px)`,
                        filter: 'drop-shadow(-3px 5px 7px rgba(15, 23, 42, 0.45)) drop-shadow(-6px 18px 25px rgba(15, 23, 42, 0.28))',
                        translate: '44.7px 15.9px',
                    }}
                />

                {/* 17. CHÚ PHAO VỊT VÀNG 3D (BỊ LỐC XOÁY CUỐN BAY, XOAY TÍT 360° ĐỈNH CAO & ĐÁP CẠNH GHẾ XANH) */}
                <div
                    style={{
                        position: 'absolute',
                        left: STAGING_SHOT_3_1.rubberDuck.left,
                        top: STAGING_SHOT_3_1.rubberDuck.top,
                        width: STAGING_SHOT_3_1.rubberDuck.width,
                        aspectRatio: '1 / 1',
                        zIndex: isDuckSwirled && frame < 416 ? 31 : STAGING_SHOT_3_1.rubberDuck.zIndex,
                        pointerEvents: 'none',
                        opacity: duckSpring,
                        transform: `translate3d(${BASE_OFFSETS.rubberDuck.x + duckFlightX}px, ${BASE_OFFSETS.rubberDuck.y + duckDrop + duckFlightY + duckAlignOffsetY}px, ${duckFlightZ}px) rotate(${duckRotation}deg)`,
                        transformOrigin: 'center center',
                    }}
                >
                    {/* Bóng sàn 2.5D thích ứng theo độ cao và tiếp đất (Contact Shadow) */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: isDuckSwirled ? '16%' : '8%',
                            left: '50%',
                            width: '68%',
                            height: '18%',
                            borderRadius: '50%',
                            background:
                                'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.48) 0%, rgba(15, 23, 42, 0.18) 50%, rgba(15, 23, 42, 0) 75%)',
                            transform: `translateX(-50%) scale(${duckShadowScale})`,
                            opacity: duckShadowOpacity,
                            pointerEvents: 'none',
                            zIndex: -1,
                        }}
                    />

                    {/* Thân chú vịt (Shot 3.1 bồng bềnh -> F355+ cuốn bay xoay tít với vit_roiram.png) */}
                    <Img
                        src={staticFile(currentDuckSrc)}
                        style={{
                            width: '100%',
                            height: 'auto',
                            transform: `scale(${duckDisplayScale}) scaleX(${duckSquashX}) scaleY(${duckSquashY})`,
                            transformOrigin: 'center center',
                            filter: 'drop-shadow(-3px 5px 7px rgba(15, 23, 42, 0.45)) drop-shadow(-6px 16px 22px rgba(15, 23, 42, 0.26))',
                        }}
                    />

                    {/* 🌟 Vòng 3 ngôi sao choáng váng 3D xoay tít trên đỉnh đầu vịt */}
                    {starHaloVisible && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '22%',
                                pointerEvents: 'none',
                            }}
                        >
                            {dizzyStars.map((s, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        position: 'absolute',
                                        left: s.x,
                                        top: s.y,
                                        zIndex: s.zIndex,
                                        transform: `scale(${s.scale}) translate(-50%, -50%)`,
                                        opacity: s.opacity,
                                        fontSize: 26,
                                        lineHeight: 1,
                                        filter: 'drop-shadow(0 2px 5px rgba(245, 158, 11, 0.75))',
                                        userSelect: 'none',
                                    }}
                                >
                                    ⭐
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
