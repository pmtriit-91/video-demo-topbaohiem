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

// ==============================================================================
// 🌟 CHẾ ĐỘ HIỂN THỊ CẢNH 3:
// 'timeline_flow': Tự động chạy theo timeline liền mạch:
//    - Frame 0 -> 450 (00:00 - 00:07.15): Diễn hoạt Shot 3.1 & Shot 3.2 (máy bay, couple, tốc nón, mặt trời meme, 7 đồ bay)
//    - Frame 450+ (00:07.15+): Hiển thị khung đích đến Cảnh 3.4
// 'animated_shot31_32': Luôn chạy Shot 3.1 & 3.2 trên toàn bộ timeline
// 'static_staging_34': Khóa cứng Cảnh 3.4 trên toàn bộ timeline
// ==============================================================================
export const SCENE3_VIEW_MODE: 'timeline_flow' | 'animated_shot31_32' | 'static_staging_34' = 'timeline_flow';

// Bật true để hiển thị lớp phủ mờ bán trong suốt (50% opacity) của ảnh gốc Cảnh 3.4 giúp soi độ lệch pixel
export const SHOW_REFERENCE_OVERLAY: boolean = false;

// Bảng tọa độ tĩnh chuẩn xác của Cảnh 3.4 (Static Staging Blueprint 3.4)
export const STAGING_SHOT_3_4 = {
    // 1. Bầu trời & Mây
    cloud1: {
        src: 'assets/elements/screen3/3.4/may_1_1.png',
        left: '16.42%',
        top: '21.07%',
        width: '13.30%',
        zIndex: 2,
    },
    cloud2: {
        src: 'assets/elements/screen3/3.4/may_2.png',
        left: '29.91%',
        top: '5.25%',
        width: '10.48%',
        zIndex: 2,
    },
    sun: {
        src: 'assets/elements/screen3/3.4/mat_troi.png',
        left: '65.95%',
        top: '9.05%',
        width: '10.09%',
        zIndex: 3,
    },
    cloud3: {
        src: 'assets/elements/screen3/3.4/may_3.png',
        left: '60.54%',
        top: '19.61%',
        width: '10.34%',
        zIndex: 4,
    },
    // 2. Đảo dừa xanh và dải biển giấy (kéo dài toàn cảnh hậu cảnh)
    island: {
        src: 'assets/elements/screen3/3.4/dao_giay.png',
        left: '9.67%',
        top: '40.79%',
        width: '25.95%',
        zIndex: 7,
    },
    // 2.1 Nước biển (Dải sóng nước biển nhiều lớp nối liền chân bục cát và chân trời)
    seaWater: {
        src: 'assets/elements/screen3/3.4/nuoc_bien.png',
        left: '5.96%',
        top: '64.41%',
        width: '108.14%',
        zIndex: 6,
    },
    // 3. Khung khiên hồng neon trung tâm
    centralArch: {
        src: 'assets/elements/screen3/3.4/khung_trung_tam.png',
        left: '32.05%',
        top: '9.21%',
        width: '29.11%',
        zIndex: 10,
    },
    // 4. Tiêu đề chữ 'Bảo hiểm du lịch' bên trong đỉnh khiên
    archText: {
        left: '40.13%',
        top: '19.18%',
        zIndex: 7,
    },
    // 5. Huy hiệu khiên vali hồng nhỏ + tick xanh ở vai phải khung
    suitcaseBadge: {
        src: 'assets/elements/screen3/3.4/khien_tren_khung_trungtam.png',
        left: '46.99%',
        top: '11.90%',
        width: '20.56%',
        zIndex: 11,
    },
    // 6. Thảm cát trắng / bục trung tâm
    sandRug: {
        src: 'assets/elements/screen3/3.4/tam_tham_trungtam.png',
        left: '12.21%',
        top: '72.30%',
        width: '66.75%',
        zIndex: 4,
    },
    // 7. Thảm nước xanh gợn sóng dưới chân vịt
    duckPuddle: {
        src: 'assets/elements/screen3/3.4/tham_cua_vit.png',
        left: '55.79%',
        top: '80.07%',
        width: '17.53%',
        zIndex: 10,
    },
    // 8. Ghế nghỉ bãi biển sọc hồng
    beachChair: {
        src: 'assets/elements/screen3/3.4/ghehong.png',
        left: '8.27%',
        top: '64.04%',
        width: '30.42%',
        zIndex: 11,
    },
    // 9. Chú vịt vàng phao bơi sọc hồng trắng
    rubberDuck: {
        src: 'assets/elements/screen3/3.4/vit_vang.png',
        left: '55.22%',
        top: '74.82%',
        width: '17.30%',
        zIndex: 12,
    },
    // 10. Vali hồng đứng cạnh chân bạn nam
    pinkSuitcase: {
        src: 'assets/elements/screen3/3.4/vali_hong.png',
        left: '18.45%',
        top: '59.48%',
        width: '32.03%',
        zIndex: 999,
    },
    // 11. Bạn nam giơ vé máy bay, đeo máy ảnh
    boyHero: {
        src: 'assets/elements/screen3/3.4/nhanvat_nam.png',
        left: '28.05%',
        top: '33.43%',
        width: '21.97%',
        zIndex: 16,
    },
    // 12. Bạn nữ giữ nơ nón cói, túi xách hồng
    girlHero: {
        src: 'assets/elements/screen3/3.4/nhanvat_nu.png',
        left: '43.50%',
        top: '33.80%',
        width: '13.21%',
        zIndex: 15,
    },
    // 13. Mũi tên hồng uốn cong chỉ sang điện thoại
    pinkArrow: {
        src: 'assets/elements/screen3/3.4/arrow_hong.png',
        left: '61.52%',
        top: '41.66%',
        width: '10.69%',
        zIndex: 20,
    },
    // 14. Smartphone Mockup hiển thị ứng dụng Tốp bảo hiểm (bên phải)
    smartphone: {
        left: '76.66%',
        top: '25.95%',
        width: '19.53%',
        zIndex: 22,
    },
    // 15. Tiêu đề lớn bên trái
    headingLeft: {
        left: '2.34%',
        top: '15.51%',
        zIndex: 25,
    },
};

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
    meme_face_only: 'assets/elements/screen3/3.2/mat_troi_meme_face_only.png', // Tầng khuôn mặt Meme độc lập (giữ vành xoay liên tục)
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
    // Diễn hoạt ngay khi lốc xoáy đập bung vali (Frame 262 đến Frame 336 — 74 frames ~ 1.23s)
    const isWindActive = frame >= 262 && frame <= 336;
    if (!isWindActive) return null;

    const windProgress = (frame - 262) / 74; // 0 -> 1

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
    const wavePhase = (frame - 262) * 0.18;

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

/**
 * 🏝️ BỐ CỤC TĨNH CẢNH 3.4 (DESTINATION BLUEPRINT)
 * ------------------------------------------------
 * Tái hiện 100% bố cục khung hình đích 3.4 từ 16 asset đã được bóc tách và staged.
 * Khóa chết tọa độ tĩnh, hỗ trợ soi trùng khớp pixel với ảnh thiết kế gốc.
 */
interface StaticStaging34Props {
    width?: number;
    height?: number;
    colors?: any;
    showOverlay?: boolean;
}

export const StaticStaging34: React.FC<StaticStaging34Props> = (props) => {
    const videoConfig = useVideoConfig();
    const width = props.width ?? videoConfig.width;
    const height = props.height ?? videoConfig.height;
    const showOverlay = props.showOverlay ?? SHOW_REFERENCE_OVERLAY;
    // Tỷ lệ scale thích ứng theo độ phân giải (chuẩn 1080p: s=1, 4K UHD 2160p: s=2)
    const s = width / 1920;

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                backgroundColor: '#F8FAFC',
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            {/* Lớp phủ tham chiếu bán trong suốt (50%) để kiểm tra độ trùng khớp */}
            {showOverlay && (
                <Img
                    src={staticFile('assets/elements/screen3/ref_3_4.png')}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.5,
                        zIndex: 999,
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* ✍️ 1. TIÊU ĐỀ CHÍNH BÊN TRÁI: Sẵn sàng / cho hành trình */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.headingLeft.left,
                    top: STAGING_SHOT_3_4.headingLeft.top,
                    zIndex: STAGING_SHOT_3_4.headingLeft.zIndex,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6 * s,
                }}
            >
                <span
                    style={{
                        color: '#E11D48',
                        fontSize: 78 * s,
                        fontWeight: 900,
                        lineHeight: 1.12,
                        letterSpacing: -1 * s,
                        filter: `drop-shadow(0 ${3 * s}px ${8 * s}px rgba(225, 29, 72, 0.16))`,
                    }}
                >
                    Sẵn sàng
                </span>
                <span
                    style={{
                        color: '#1E293B',
                        fontSize: 74 * s,
                        fontWeight: 900,
                        lineHeight: 1.12,
                        letterSpacing: -1 * s,
                    }}
                >
                    cho hành trình
                </span>
            </div>

            {/* ☁️ 3. TẦNG MÂY 1 (Góc trên bên trái) */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.cloud1.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.cloud1.left,
                    top: STAGING_SHOT_3_4.cloud1.top,
                    width: STAGING_SHOT_3_4.cloud1.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.cloud1.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.04))',
                    translate: '-23.3px -365.1px',
                }}
            />

            {/* ☁️ 4. TẦNG MÂY 2 (Trung tâm trên cao) */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.cloud2.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.cloud2.left,
                    top: STAGING_SHOT_3_4.cloud2.top,
                    width: STAGING_SHOT_3_4.cloud2.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.cloud2.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.04))',
                    translate: '135.1px -49.7px',
                }}
            />

            {/* ☀️ 5. MẶT TRỜI VÀNG PAPER-CUT NHIỀU TIA */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.sun.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.sun.left,
                    top: STAGING_SHOT_3_4.sun.top,
                    width: STAGING_SHOT_3_4.sun.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.sun.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.45))',
                    translate: '214.2px -195.5px',
                }}
            />

            {/* ☁️ 6. TẦNG MÂY 3 (Phía trên bên phải che trước mặt trời) */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.cloud3.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.cloud3.left,
                    top: STAGING_SHOT_3_4.cloud3.top,
                    width: STAGING_SHOT_3_4.cloud3.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.cloud3.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.05))',
                    translate: '204.9px -177.4px',
                }}
            />

            {/* 🏝️ 7. HÒN ĐẢO DỪA GIẤY & DẢI BIỂN XANH HẬU CẢNH */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.island.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.island.left,
                    top: STAGING_SHOT_3_4.island.top,
                    width: STAGING_SHOT_3_4.island.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.island.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 12px 25px rgba(15, 23, 42, 0.08))',
                    translate: '-469.9px -230.3px',
                }}
            />

            {/* 🌊 7.1. DẢI SÓNG NƯỚC BIỂN NHIỀU LỚP HẬU CẢNH */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.seaWater.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.seaWater.left,
                    top: STAGING_SHOT_3_4.seaWater.top,
                    width: STAGING_SHOT_3_4.seaWater.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.seaWater.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 8px 20px rgba(14, 165, 233, 0.12))',
                    translate: '-385.2px -551px',
                }}
            />

            {/* 🌊 7.1. DẢI SÓNG NƯỚC BIỂN NHIỀU LỚP HẬU CẢNH */}

            {/* 🛡️ 8. KHUNG KHIÊN HỒNG NEON TRUNG TÂM */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.centralArch.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.centralArch.left,
                    top: STAGING_SHOT_3_4.centralArch.top,
                    width: STAGING_SHOT_3_4.centralArch.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.centralArch.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 18px 45px rgba(225, 29, 72, 0.18)) drop-shadow(0 8px 20px rgba(15, 23, 42, 0.10))',
                    translate: '55.9px -6.1px',
                }}
            />

            {/* 🏷️ 9. TIÊU ĐỀ 'BẢO HIỂM DU LỊCH' BÊN TRONG ĐỈNH KHUNG KHIÊN */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.archText.left,
                    top: STAGING_SHOT_3_4.archText.top,
                    zIndex: STAGING_SHOT_3_4.archText.zIndex,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4 * s,
                    pointerEvents: 'none',
                }}
            >
                <span
                    style={{
                        color: '#1E293B',
                        fontSize: 44 * s,
                        fontWeight: 900,
                        lineHeight: 1.12,
                        letterSpacing: -0.5 * s,
                    }}
                >
                    Bảo hiểm
                </span>
                <span
                    style={{
                        color: '#E11D48',
                        fontSize: 44 * s,
                        fontWeight: 900,
                        lineHeight: 1.12,
                        letterSpacing: -0.5 * s,
                    }}
                >
                    du lịch
                </span>
            </div>

            {/* 🛡️ 10. HUY HIỆU KHIÊN VALI HỒNG + TICK XANH Ở VAI PHẢI KHUNG */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.suitcaseBadge.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.suitcaseBadge.left,
                    top: STAGING_SHOT_3_4.suitcaseBadge.top,
                    width: STAGING_SHOT_3_4.suitcaseBadge.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.suitcaseBadge.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 14px 30px rgba(225, 29, 72, 0.28))',
                    translate: '43.6px -1px',
                }}
            />

            {/* 🏖️ 11. THẢM CÁT TRẮNG / BỤC TRUNG TÂM (KÈM BÓNG SILHOUETTE ÔM KHÍT ĐÁY THẢM) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.sandRug.left,
                    top: STAGING_SHOT_3_4.sandRug.top,
                    width: STAGING_SHOT_3_4.sandRug.width,
                    zIndex: STAGING_SHOT_3_4.sandRug.zIndex,
                    pointerEvents: 'none',
                    translate: '-27.3px -248.6px',
                }}
            >
                {/* 🌟 1. Viền bóng ôm sát mép dưới theo toàn bộ đường lượn sóng của thảm cát (Contact Bevel Shadow) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.sandRug.src)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: 'auto',
                        transform: `translateY(${3.5 * s}px)`,
                        filter: `brightness(0) blur(${1.8 * s}px)`,
                        opacity: 0.55,
                        pointerEvents: 'none',
                    }}
                />

                {/* 🌟 2. Lớp đệm bóng giấy papercraft lan tỏa phía dưới (Ambient Depth Shadow) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.sandRug.src)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: 'auto',
                        transform: `translateY(${7.0 * s}px)`,
                        filter: `brightness(0) blur(${5.0 * s}px)`,
                        opacity: 0.35,
                        pointerEvents: 'none',
                    }}
                />

                {/* 🌟 3. Tấm thảm cát chính (Tăng nét & tương phản bề mặt) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.sandRug.src)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'contrast(1.15) brightness(0.96) drop-shadow(0 8px 16px rgba(15, 23, 42, 0.10)) drop-shadow(0 22px 42px rgba(15, 23, 42, 0.12))',
                    }}
                />

                {/* 🌟 4. Lớp chấm đen sắc nét nổi bật (Crisp Black Stipple Dots) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        maskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                        WebkitMaskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='dotsDark'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0 0.04  0 0 0 11 -4.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dotsDark)'/%3E%3C/svg%3E")`,
                        backgroundSize: `${48 * s}px ${48 * s}px`,
                        backgroundRepeat: 'repeat',
                        mixBlendMode: 'multiply',
                        opacity: 0.5,
                    }}
                />

                {/* 🌟 5. Lớp chấm trắng tinh thể nổi bật đan xen (Crisp White Stipple Dots) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        maskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                        WebkitMaskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='dotsLight'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='2' stitchTiles='stitch' seed='99'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 11 -4.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dotsLight)'/%3E%3C/svg%3E")`,
                        backgroundSize: `${48 * s}px ${48 * s}px`,
                        backgroundRepeat: 'repeat',
                        mixBlendMode: 'screen',
                        opacity: 0.75,
                    }}
                />
            </div>

            {/* 🌊 12. THẢM NƯỚC XANH GỢN SÓNG DƯỚI CHÂN VỊT */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.duckPuddle.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.duckPuddle.left,
                    top: STAGING_SHOT_3_4.duckPuddle.top,
                    width: STAGING_SHOT_3_4.duckPuddle.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.duckPuddle.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.14)) drop-shadow(0 10px 22px rgba(14, 165, 233, 0.22))',
                    translate: '154.6px -94.1px'
                }}
            />

            {/* 🪑 13. GHẾ NGHỈ BÃI BIỂN SỌC HỒNG TRẮNG (BÓNG CHÂN TIẾP ĐẤT & BÓNG GẦM GHẾ) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.beachChair.left,
                    top: STAGING_SHOT_3_4.beachChair.top,
                    width: STAGING_SHOT_3_4.beachChair.width,
                    zIndex: STAGING_SHOT_3_4.beachChair.zIndex,
                    pointerEvents: 'none',
                    translate: '-46.2px -189.1px',
                    scale: 1.022,
                }}
            >
                {/* Bóng phủ sàn dưới gầm ghế hồng (Ambient Under-Chair Shadow) */}
                {/* <div
                    style={{
                        position: 'absolute',
                        left: '49.0%',
                        top: '92.0%',
                        width: '46.0%',
                        height: '8.5%',
                        transform: 'translate(-50%, -50%) rotate(-4deg)',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.18) 50%, rgba(15, 23, 42, 0) 75%)',
                        filter: `blur(${6 * s}px)`,
                    }}
                /> */}
                {/* 4 Điểm bóng tiếp xúc chân gỗ trên mặt cát (Leg Contact Dots) */}
                <div
                    style={{
                        position: 'absolute',
                        left: '35.0%',
                        top: '66.5%',
                        width: '25.0%',
                        height: '50.0%',
                        transform: 'translate(-35%, -50%) rotate(78deg) skewY(-20deg) skewX(-30deg)',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(71, 73, 78, 0.7) 0%, rgba(38, 41, 51, 0.20) 40%, rgba(38, 43, 56, 0) 90%)',
                        filter: `blur(${12 * s}px)`,
                    }}
                />
                <Img
                    src={staticFile(STAGING_SHOT_3_4.beachChair.src)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(-4px 8px 18px rgba(15, 23, 42, 0.22))',
                    }}
                />
            </div>

            {/* 🐥 14. CHÚ VỊT VÀNG PHAO BƠI SỌC HỒNG TRẮNG (BÓNG TIẾP XÚC MẶT NƯỚC) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.rubberDuck.left,
                    top: STAGING_SHOT_3_4.rubberDuck.top,
                    width: STAGING_SHOT_3_4.rubberDuck.width,
                    zIndex: STAGING_SHOT_3_4.rubberDuck.zIndex,
                    pointerEvents: 'none',
                    translate: '143.9px -107.8px',
                    scale: 0.958,
                }}
            >
                {/* Bóng tiếp xúc đáy phao tròn đè lên thảm nước (Contact Float Shadow) */}
                <div
                    style={{
                        position: 'absolute',
                        left: '52.0%',
                        top: '90.0%',
                        width: '52.0%',
                        height: '14.0%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(19, 23, 26, 0.58) 0%, rgba(7, 12, 22, 0.28) 45%, rgba(15, 23, 42, 0) 75%)',
                        filter: `blur(${1 * s}px)`,
                    }}
                />
                <Img
                    src={staticFile(STAGING_SHOT_3_4.rubberDuck.src)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(0 8px 18px rgba(15, 23, 42, 0.20))',
                        translate: '5.4px 1.5px'
                    }}
                />
            </div>

            {/* 🧳 15. CHIẾC VALI HỒNG ĐỨNG CẠNH CHÂN BẠN NAM (BÓNG TIẾP ĐẤT BÁNH XE & ĐÁY VALI) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.pinkSuitcase.left,
                    top: STAGING_SHOT_3_4.pinkSuitcase.top,
                    width: STAGING_SHOT_3_4.pinkSuitcase.width,
                    zIndex: STAGING_SHOT_3_4.pinkSuitcase.zIndex,
                    pointerEvents: 'none',
                    translate: '72.6px -54.2px',
                }}
            >
                {/* Bóng tiếp đất dưới 2 bánh xe và mép đáy vali hồng (Suitcase Ground Shadow) */}
                <div
                    style={{
                        position: 'absolute',
                        left: '49.5%',
                        top: '87.8%',
                        width: '25.0%',
                        height: '6.2%',
                        transform: 'translate(-55%, -50%) rotate(2deg) skewY(2deg) skewX(42deg)',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.32) 45%, rgba(15, 23, 42, 0) 75%)',
                        filter: `blur(${3.5 * s}px)`,
                    }}
                />
                <Img
                    src={staticFile(STAGING_SHOT_3_4.pinkSuitcase.src)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(0 14px 28px rgba(15, 23, 42, 0.24))',
                        translate: '3px -24.4px',
                    }}
                />
            </div>

            {/* 🙋‍♂️ 16. BẠN NAM GIƠ VÉ MÁY BAY, ĐEO MÁY ẢNH & KÍNH RÂM (BÓNG XIÊN TRỤC Z LOANG VỀ SAU BÊN PHẢI) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.boyHero.left,
                    top: STAGING_SHOT_3_4.boyHero.top,
                    width: STAGING_SHOT_3_4.boyHero.width,
                    zIndex: STAGING_SHOT_3_4.boyHero.zIndex,
                    pointerEvents: 'none',
                    translate: '79.1px -39.8px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: '43.0%',
                        top: '85.5%',
                        width: '38.0%',
                        height: '22.0%',
                        transform: 'translate(-35%, -50%) rotate(72deg) skewY(-20deg) skewX(-40deg)',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(35, 38, 46, 0.7) 0%, rgba(38, 41, 51, 0.20) 30%, rgba(38, 43, 56, 0) 90%)',
                        filter: `blur(${15 * s}px)`,
                    }}
                />

                {/* 👞 Viền bóng chỉ ôm khít mặt dưới đế giày Bạn Nam (Exact Sole Bottom Rim Only) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.boyHero.src)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: 'auto',
                        transform: `translateY(${1.8 * s}px)`,
                        filter: `brightness(0) blur(${1.1 * s}px)`,
                        opacity: 0.42,
                        clipPath: 'polygon(0% 95.2%, 100% 95.2%, 100% 100%, 0% 100%)',
                        pointerEvents: 'none',
                    }}
                />

                <Img
                    src={staticFile(STAGING_SHOT_3_4.boyHero.src)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(0 16px 32px rgba(15, 23, 42, 0.20))',
                    }}
                />
            </div>

            {/* 🙋‍♀️ 17. BẠN NỮ TAY GIỮ NÓN CÓI NƠ HỒNG, TÚI XÁCH HỒNG (BÓNG TIẾP ĐẤT ĐÔI GIÀY) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.girlHero.left,
                    top: STAGING_SHOT_3_4.girlHero.top,
                    width: STAGING_SHOT_3_4.girlHero.width,
                    zIndex: STAGING_SHOT_3_4.girlHero.zIndex,
                    pointerEvents: 'none',
                    translate: '90.8px -68.5px',
                }}
            >
                {/* Bóng nhân vật nữ */}
                <div
                    style={{
                        position: 'absolute',
                        left: '35.0%',
                        top: '89.5%',
                        width: '48.0%',
                        height: '29.0%',
                        transform: 'translate(-35%, -50%) rotate(62deg) skewY(-20deg) skewX(-40deg)',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(33, 35, 40, 0.7) 0%, rgba(38, 41, 51, 0.20) 40%, rgba(38, 43, 56, 0) 90%)',
                        filter: `blur(${15 * s}px)`,
                    }}
                />

                {/* 👠 Viền bóng chỉ ôm khít mặt dưới đế giày Bạn Nữ (Exact Sole Bottom Rim Only) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.girlHero.src)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: 'auto',
                        transform: `translateY(${1.8 * s}px)`,
                        filter: `brightness(0) blur(${1.1 * s}px)`,
                        opacity: 0.42,
                        clipPath: 'polygon(0% 94.8%, 100% 94.8%, 100% 100%, 0% 100%)',
                        pointerEvents: 'none',
                    }}
                />

                <Img
                    src={staticFile(STAGING_SHOT_3_4.girlHero.src)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        filter: 'drop-shadow(0 16px 32px rgba(15, 23, 42, 0.20))',
                    }}
                />
            </div>

            {/* 🏹 18. MŨI TÊN HỒNG UỐN CONG CHỈ SANG SMARTPHONE */}
            <Img
                src={staticFile(STAGING_SHOT_3_4.pinkArrow.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.pinkArrow.left,
                    top: STAGING_SHOT_3_4.pinkArrow.top,
                    width: STAGING_SHOT_3_4.pinkArrow.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_4.pinkArrow.zIndex,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 4px 12px rgba(225, 29, 72, 0.25))',
                    translate: '58.4px -136.1px',
                }}
            />

            {/* 📱 19. SMARTPHONE MOCKUP ỨNG DỤNG TỐP BẢO HIỂM (BÊN PHẢI) */}
            <div
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_4.smartphone.left,
                    top: STAGING_SHOT_3_4.smartphone.top,
                    width: STAGING_SHOT_3_4.smartphone.width,
                    aspectRatio: '1 / 1.76',
                    zIndex: STAGING_SHOT_3_4.smartphone.zIndex,
                    pointerEvents: 'none',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 44 * s,
                    border: `${10 * s}px solid #FFFFFF`,
                    boxShadow: `0 ${30 * s}px ${70 * s}px -${15 * s}px rgba(15, 23, 42, 0.25), 0 0 0 ${1.5 * s}px rgba(226, 232, 240, 0.85)`,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    padding: `${24 * s}px ${20 * s}px`,
                    boxSizing: 'border-box',
                    gap: 16 * s,
                }}
            >
                {/* Header thanh điều hướng: Logo + Menu */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 4 * s,
                    }}
                >
                    <div style={{ fontSize: 24 * s, fontWeight: 900, letterSpacing: -0.5 * s }}>
                        <span style={{ color: '#E11D48' }}>TOP</span>
                        <span style={{ color: '#0F172A' }}>baohiem</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4 * s,
                            cursor: 'pointer',
                        }}
                    >
                        <div
                            style={{ width: 22 * s, height: 2.5 * s, backgroundColor: '#64748B', borderRadius: 2 * s }}
                        />
                        <div
                            style={{ width: 22 * s, height: 2.5 * s, backgroundColor: '#64748B', borderRadius: 2 * s }}
                        />
                        <div
                            style={{ width: 22 * s, height: 2.5 * s, backgroundColor: '#64748B', borderRadius: 2 * s }}
                        />
                    </div>
                </div>

                {/* Card sản phẩm nổi bật: Bảo hiểm Du lịch */}
                <div
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 22 * s,
                        border: `${1.5 * s}px solid #F1F5F9`,
                        boxShadow: `0 ${4 * s}px ${16 * s}px rgba(15, 23, 42, 0.04)`,
                        position: 'relative',
                        height: '43%',
                        overflow: 'hidden',
                    }}
                >
                    {/* Minh họa gói du lịch: đóng vai trò như background bao trùm toàn bộ cụm card trên */}
                    <Img
                        src={staticFile('assets/elements/screen3/3.4/logo_vali_dulich.png')}
                        style={{
                            position: 'absolute',
                            left: '7.5%',
                            top: '9%',
                            width: '115%',
                            height: 'auto',
                            display: 'block',
                            pointerEvents: 'none',
                            filter: `drop-shadow(0 ${2 * s}px ${8 * s}px rgba(15, 23, 42, 0.06))`,
                        }}
                    />

                    {/* Cột chữ bên trái card */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 15 * s,
                            top: 22 * s,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3 * s,
                            zIndex: 2,
                        }}
                    >
                        <span
                            style={{
                                color: '#1E293B',
                                fontSize: 23 * s,
                                fontWeight: 800,
                                lineHeight: 1.15,
                                letterSpacing: -0.4 * s,
                            }}
                        >
                            Bảo hiểm
                        </span>
                        <span
                            style={{
                                color: '#E11D48',
                                fontSize: 23 * s,
                                fontWeight: 800,
                                lineHeight: 1.15,
                                letterSpacing: -0.4 * s,
                            }}
                        >
                            Du lịch
                        </span>
                    </div>
                </div>

                {/* Khối Skeleton & thông tin mô phỏng gói bảo hiểm (Card dưới) */}
                <div
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 20 * s,
                        border: `${1.5 * s}px solid #F1F5F9`,
                        boxShadow: `0 ${4 * s}px ${14 * s}px rgba(15, 23, 42, 0.03)`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16 * s,
                        padding: `${16 * s}px ${16 * s}px`,
                        height: '26%',
                        justifyContent: 'flex-start',
                    }}
                >
                    {/* Thanh hồng placeholder */}
                    <div
                        style={{
                            width: '50%',
                            height: 18 * s,
                            borderRadius: 9 * s,
                            backgroundColor: '#FCE7F3',
                        }}
                    />

                    {/* Các dòng gạch ngang xám mô phỏng text specs */}
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 * s }}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 * s }}>
                            <div
                                style={{
                                    width: '95%',
                                    height: 13 * s,
                                    borderRadius: 7 * s,
                                    backgroundColor: '#E2E8F0',
                                }}
                            />
                            <div
                                style={{
                                    width: '65%',
                                    height: 13 * s,
                                    borderRadius: 7 * s,
                                    backgroundColor: '#E2E8F0',
                                }}
                            />
                        </div>

                        {/* Ô vuông thumbnail placeholder */}
                        <div
                            style={{
                                width: 68 * s,
                                height: 56 * s,
                                borderRadius: 12 * s,
                                backgroundColor: '#F8FAFC',
                                border: `${1.5 * s}px solid #E2E8F0`,
                            }}
                        />
                    </div>
                </div>

                {/* Nút CTA lớn nổi bật: CHỌN GÓI */}
                <div
                    style={{
                        marginTop: 'auto',
                        backgroundColor: '#E11D48',
                        borderRadius: 14 * s,
                        padding: `${14 * s}px ${20 * s}px`,
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 20 * s,
                        fontWeight: 900,
                        letterSpacing: 1.2 * s,
                        boxShadow: `0 ${6 * s}px ${20 * s}px rgba(225, 29, 72, 0.35)`,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                    }}
                >
                    CHỌN GÓI
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// 🎬 VIDEO-SHOTCRAFT CORE MATH & FX PRIMITIVES (4K/2K @ 60FPS HEAVY-HITTING RIG)
// ============================================================================
const scBezier = (x1: number, y1: number, x2: number, y2: number) => (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    let u = t;
    for (let i = 0; i < 6; i++) {
        const x = ((ax * u + bx) * u + cx) * u - t;
        const dx = (3 * ax * u + 2 * bx) * u + cx;
        if (Math.abs(dx) < 1e-6) break;
        u -= x / dx;
    }
    return ((ay * u + by) * u + cy) * u;
};

const SC_EASE = {
    snappy: scBezier(0.16, 1, 0.3, 1),
    heavy: scBezier(0.7, 0, 0.15, 1),
    slam: (t: number) => t * t * t, // EASE_IN_CUBIC for 6f Impact-Burst-Kit slam
    twist: scBezier(0.62, 0, 0.3, 1), // Kanada 3D perspective twist settle curve
    airBrake: (t: number) => 1 - Math.pow(1 - t, 5), // Quint-out air-cushion brake
    portal: scBezier(0.7, 0, 0.3, 1), // Portal-Wipe window expansion curve
    smooth: scBezier(0.4, 0, 0.2, 1),
};

const scRamp = (f: number, start: number, dur: number, ease: (t: number) => number = (t) => t) => {
    if (dur <= 0) return f >= start ? 1 : 0;
    const raw = Math.max(0, Math.min(1, (f - start) / dur));
    return ease(raw);
};

const scMix = (a: number, b: number, t: number) => a + (b - a) * t;

// 18 mảnh đa giác bắn tỏa tròn khi Khiên Hồng đập sập xuống sàn (ImpactBurstKit.tsx)
const IMPACT_SHARDS_34 = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2 + ((i * 7) % 5) * 0.04;
    const r0 = 220 + (i % 3) * 35;
    const r1 = 580 + ((i * 37) % 340);
    const len = 48 + ((i * 19) % 56);
    const w = 9 + (i % 4) * 4;
    const isGold = i % 3 === 0;
    return { a, r0, r1, len, w, isGold };
});

// 7 vệt xé gió ngang + 36 tia Focus Anime cho cú vẩy mắt cá Kanada Perspective Snap (KanadaPerspectiveSnap.tsx)
const KANADA_STREAKS = [
    { y: 18, x0: -25, x1: 92, h: 6, delay: 0, dur: 12 },
    { y: 29, x0: -30, x1: 98, h: 12, delay: 1, dur: 13 },
    { y: 42, x0: -18, x1: 95, h: 4, delay: 2, dur: 11 },
    { y: 54, x0: -35, x1: 102, h: 15, delay: 0, dur: 14 },
    { y: 66, x0: -22, x1: 94, h: 5, delay: 3, dur: 11 },
    { y: 78, x0: -28, x1: 96, h: 10, delay: 1, dur: 13 },
    { y: 88, x0: -15, x1: 90, h: 4, delay: 2, dur: 10 },
];

const KANADA_FOCUS_RAYS = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2 + (i % 3) * 0.018;
    const inner = 220 + (i % 5) * 38;
    const w = 0.008 + (i % 4) * 0.004;
    return { a, inner, w };
});

export const Scene3_TravelAdventure: React.FC = () => {
    const rawFrame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;
    const s = width / 1920;

    // 🌟 CHẾ ĐỘ HIỂN THỊ CẢNH 3:
    // 1. Nếu chọn cố định 'static_staging_34': luôn hiển thị Cảnh 3.4
    if ((SCENE3_VIEW_MODE as string) === 'static_staging_34') {
        return <StaticStaging34 width={width} height={height} colors={colors} showOverlay={SHOW_REFERENCE_OVERLAY} />;
    }

    // ============================================================================
    // ⏱️ HỆ THỐNG ĐỒNG HỒ KÉP (DUAL-CLOCK) CHO BULLET-TIME ORBIT & GOLDEN COMEDY HOLD (SHOT 3.2)
    // ============================================================================
    // - Khi vali nổ tung ở F258 và toàn bộ 7 món đồ + 2 chiếc nón vọt lên đỉnh (F276),
    //   đồng hồ vật lý (frame) hãm Bullet-Time trong F276 - F302 để Camera 3D xoay vòng Orbit,
    //   rồi bắt kịp thời gian thực ngay tại F320.
    // - Từ F320 đến F465 (~2.42 giây tốc độ thực 1.0x): Khung hình giữ nguyên "Bức tranh Hài Hước Đỉnh Cao"
    //   (7 món đồ bay + 2 chiếc mũ lơ lửng + cặp đôi hốt hoảng + vịt ngồi xoay 3 ngôi sao + Mặt trời Meme cười đểu)
    //   để khán giả chiêm ngưỡng trọn vẹn!
    const frame = (() => {
        if (rawFrame <= 276 || rawFrame >= 320) return rawFrame;
        if (rawFrame <= 282) {
            const p = scRamp(rawFrame, 276, 6, SC_EASE.snappy);
            return scMix(276, 280.5, p);
        }
        if (rawFrame <= 302) {
            const p = (rawFrame - 282) / 20;
            return scMix(280.5, 284.0, p);
        }
        const p = scRamp(rawFrame, 302, 18, SC_EASE.heavy);
        return scMix(284.0, 320, p);
    })();

    // ============================================================================
    // 🎥 1. HỆ THỐNG CAMERA 3D 5 HỒI CHUẨN VIDEO-SHOTCRAFT (TILT-REVEAL / CRASH-ZOOM /
    //       BULLET-TIME ORBIT / IMPACT-BURST SLAM / KANADA SNAP / PORTAL-WIPE DIVE)
    //       (ĐÃ TỐI ƯU TIMELINE CHUẨN 14.0S = 840 FRAMES @ 60FPS)
    // ============================================================================

    // --- [HỒI 1: F0 - F58] TILT-REVEAL 3D POP-UP STAGE + AIR-CUSHION BRAKE (TiltReveal.tsx) ---
    // Sân khấu mở ra như lật dựng một cuốn sách Pop-Up 3D từ đường chân trời (68° -> -2.4° overshoot -> 0°)
    const introLiftMain = scRamp(rawFrame, 0, 32, SC_EASE.airBrake);
    const introOvershootSettle = scRamp(rawFrame, 32, 26, SC_EASE.snappy);
    const camIntroRotX =
        rawFrame < 32
            ? scMix(68, -2.4, introLiftMain)
            : rawFrame < 58
              ? scMix(-2.4, 0, introOvershootSettle)
              : 0;
    const camIntroRotY =
        rawFrame < 32
            ? scMix(14, -1.0, introLiftMain)
            : rawFrame < 58
              ? scMix(-1.0, 0, introOvershootSettle)
              : 0;
    const camIntroRotZ =
        rawFrame < 32
            ? scMix(-7.5, 0.5, introLiftMain)
            : rawFrame < 58
              ? scMix(0.5, 0, introOvershootSettle)
              : 0;
    const camIntroScale =
        rawFrame < 32
            ? scMix(1.52, 0.988, introLiftMain)
            : rawFrame < 58
              ? scMix(0.988, 1.0, introOvershootSettle)
              : 1.0;
    const camIntroY =
        rawFrame < 32
            ? scMix(165 * s, -8 * s, introLiftMain)
            : rawFrame < 58
              ? scMix(-8 * s, 0, introOvershootSettle)
              : 0;

    // --- [HỒI 1.5: F65 - F245] AMBIENT PUSH & QUIRKY PLANE TRACKING TILT ---
    const camAmbientPush = interpolate(rawFrame, [65, 245], [1.0, 1.035], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Khi máy bay đỏng đảnh phanh kít & nén lò xo trên trời (F150 - F256), camera hơi ngước nhẹ theo dõi
    const planeTrackEnv =
        rawFrame >= 150 && rawFrame < 256
            ? Math.sin(scRamp(rawFrame, 150, 106) * Math.PI)
            : 0;
    const camPlaneTrackRotX = planeTrackEnv * 4.5;
    const camPlaneTrackY = planeTrackEnv * 22 * s;

    // --- [HỒI 2: F245 - F468] CRASH-ZOOM IMPACT + BULLET-TIME 3D ORBIT + GOLDEN COMEDY HOLD ---
    // Pha 2A (F245 - F258): Anticipation pull-back (-4.5% scale) lấy đà trước khi lốc xoáy đập vào vali
    const windup32 = scRamp(rawFrame, 245, 13, SC_EASE.smooth);
    // Pha 2B (F258 - F266): 8-frame Crash-Zoom Punch thẳng vào tâm vụ nổ vali + cặp đôi!
    const crashIn32 = scRamp(rawFrame, 258, 8, SC_EASE.heavy);
    // Pha 2C (F274 - F326): Matrix Bullet-Time 3D Camera Orbit lượn vòng qua đồ đạc đang đứng hình!
    const orbitSwing1 = scRamp(rawFrame, 274, 18, SC_EASE.snappy); // Quăng sang góc nghiêng trái (-24° Y, +13° X)
    const orbitSwing2 = scRamp(rawFrame, 292, 16, SC_EASE.smooth); // Lượn vòng sang góc phải (+15° Y, +7° X)
    const orbitReturn = scRamp(rawFrame, 308, 20, SC_EASE.snappy); // Trả về chính diện (0°) tại F328 để mở Golden Comedy Hold!

    const crashZoomScale =
        rawFrame < 245
            ? 1.0
            : rawFrame < 258
              ? scMix(1.0, 0.955 / 1.035, windup32)
              : rawFrame < 266
                ? scMix(0.955 / 1.035, 1.26 / 1.035, crashIn32)
                : rawFrame < 308
                  ? (1.26 + Math.sin(((rawFrame - 266) / 42) * Math.PI) * 0.07) / 1.035
                  : rawFrame < 328
                    ? scMix(1.26 / 1.035, 1.02 / 1.035, orbitReturn)
                    : rawFrame < 468
                      ? scMix(1.02 / 1.035, 1.0, scRamp(rawFrame, 328, 140, SC_EASE.smooth))
                      : 1.0;

    const crashPanX =
        rawFrame < 258
            ? 0
            : rawFrame < 266
              ? scMix(0, 118 * s, crashIn32)
              : rawFrame < 292
                ? scMix(118 * s, 165 * s, orbitSwing1)
                : rawFrame < 308
                  ? scMix(165 * s, 65 * s, orbitSwing2)
                  : rawFrame < 328
                    ? scMix(65 * s, 0, orbitReturn)
                    : 0;

    const crashPanY =
        rawFrame < 258
            ? 0
            : rawFrame < 266
              ? scMix(0, -32 * s, crashIn32)
              : rawFrame < 292
                ? scMix(-32 * s, -54 * s, orbitSwing1)
                : rawFrame < 308
                  ? scMix(-54 * s, -18 * s, orbitSwing2)
                  : rawFrame < 328
                    ? scMix(-18 * s, 0, orbitReturn)
                    : 0;

    const orbitRotY =
        rawFrame < 258
            ? 0
            : rawFrame < 266
              ? scMix(0, -6, crashIn32)
              : rawFrame < 292
                ? scMix(-6, -24, orbitSwing1)
                : rawFrame < 308
                  ? scMix(-24, 15, orbitSwing2)
                  : rawFrame < 328
                    ? scMix(15, 0, orbitReturn)
                    : 0;

    const orbitRotX =
        rawFrame < 245
            ? 0
            : rawFrame < 258
              ? scMix(0, 5, windup32)
              : rawFrame < 266
                ? scMix(5, -4, crashIn32)
                : rawFrame < 292
                  ? scMix(-4, 13, orbitSwing1)
                  : rawFrame < 308
                    ? scMix(13, 7, orbitSwing2)
                    : rawFrame < 328
                      ? scMix(7, 0, orbitReturn)
                      : 0;

    const orbitRotZ =
        rawFrame < 258
            ? 0
            : rawFrame < 266
              ? scMix(0, -2.8, crashIn32)
              : rawFrame < 292
                ? scMix(-2.8, -4.5, orbitSwing1)
                : rawFrame < 308
                  ? scMix(-4.5, 2.8, orbitSwing2)
                  : rawFrame < 328
                    ? scMix(2.8, 0, orbitReturn)
                    : 0;

    // Rung chấn Va đập Cực mạnh khi Vali Nổ (F258 - F276, CrashImpactReal.tsx)
    const shake32T = rawFrame - 258;
    const shake32Env = shake32T >= 0 && shake32T < 18 ? 16 * s * Math.exp(-shake32T / 2.2) : 0;
    const impactShakeX = shake32Env * 0.65 * Math.sin(shake32T * 2.5 + 0.6);
    const impactShakeY = shake32Env * Math.cos(shake32T * 2.9);
    const impactShakeRot = (shake32Env / s) * 0.08 * Math.sin(shake32T * 3.7 + 1.9);

    // --- [HỒI 3: F474 - F545] WHIP-IMPLOSION TWIST -> IMPACT-BURST-KIT SLAM (ImpactBurstKit.tsx) ---
    // Khi chuẩn bị chuyển sang Cảnh 3.4:
    // F476 - F492: Camera lùi nhẹ + nghiêng ngửa đón Khiên Hồng & Cặp đôi Hero đang lơ lửng sát ống kính
    // F492 - F498 (6f): Khiên & Cặp đôi đập sập xuống sàn! Tại HIT_34 = 498, sóng xung kích & rung chấn nổ tung!
    const slamWindup = scRamp(rawFrame, 476, 16, SC_EASE.smooth);
    const slamHitRecover = scRamp(rawFrame, 498, 36, SC_EASE.snappy);
    const camSlamScale =
        rawFrame < 476
            ? 1.0
            : rawFrame < 492
              ? scMix(1.0, 0.94, slamWindup)
              : rawFrame < 498
                ? scMix(0.94, 1.06, scRamp(rawFrame, 492, 6, SC_EASE.slam))
                : rawFrame < 534
                  ? scMix(1.06, 1.0, slamHitRecover)
                  : 1.0;
    const camSlamRotX =
        rawFrame < 476
            ? 0
            : rawFrame < 492
              ? scMix(0, 9.5, slamWindup)
              : rawFrame < 498
                ? scMix(9.5, -3.2, scRamp(rawFrame, 492, 6, SC_EASE.slam))
                : rawFrame < 534
                  ? scMix(-3.2, 0, slamHitRecover)
                  : 0;
    const camSlamRotZ =
        rawFrame < 476
            ? 0
            : rawFrame < 492
              ? scMix(0, 2.4, slamWindup)
              : rawFrame < 498
                ? scMix(2.4, -1.8, scRamp(rawFrame, 492, 6, SC_EASE.slam))
                : rawFrame < 534
                  ? scMix(-1.8, 0, slamHitRecover)
                  : 0;

    // Rung chấn Hạng Nặng khi Khiên Hồng chạm đất tại HIT_34 = 498 (ImpactBurstKit.tsx)
    const shake34T = rawFrame - 498;
    const shake34Env = shake34T >= 0 && shake34T < 20 ? 20 * s * Math.exp(-shake34T / 2.1) : 0;
    const shieldShakeX = shake34Env * 0.55 * Math.sin(shake34T * 2.6 + 0.4);
    const shieldShakeY = shake34Env * Math.cos(shake34T * 3.1);
    const shieldShakeRot = (shake34Env / s) * 0.09 * Math.sin(shake34T * 3.5 + 1.2);

    // Giai đoạn cân bằng khung hình về đúng tỉ lệ 1.0 cho Cảnh 3.4 (F472 - F498)
    const camTransitionScale = interpolate(rawFrame, [472, 498], [1.0, 1.0 / 1.035], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t),
    });

    // --- [HỒI 4: F594 - F634] KANADA PERSPECTIVE SNAP CAMERA RECOIL (KanadaPerspectiveSnap.tsx) ---
    // Khi chiếc Smartphone văng mắt cá đập phẳng vào khung phải tại SNAP = 612, toàn sân khấu giật nảy phản lực!
    const kanadaRecoilT = rawFrame - 612;
    const kanadaRecoilEnv =
        kanadaRecoilT >= 0 && kanadaRecoilT < 22
            ? Math.cos(kanadaRecoilT * 0.38) * Math.exp(-kanadaRecoilT / 5.5)
            : 0;
    const camKanadaRotY = kanadaRecoilEnv * 5.2;
    const camKanadaRotZ = kanadaRecoilEnv * 1.6;
    const camKanadaX = kanadaRecoilEnv * -22 * s;

    // --- [HỒI 5: F786 - F840] PORTAL-WIPE 3D DIVE VÀO MÀN HÌNH ĐIỆN THOẠI (PortalWipeV2.tsx) ---
    // Sau 12.0s (F720) + 1.1s hiệu ứng Click chọn gói, từ F786 - F802 (16f) lấy đà lùi nhẹ -> F802 - F840 (38f) phóng xuyên tâm Smartphone!
    const portalAntic = scRamp(rawFrame, 786, 16, SC_EASE.smooth);
    const portalDive = scRamp(rawFrame, 802, 38, SC_EASE.portal);
    const portalPanP = scRamp(rawFrame, 802, 22, SC_EASE.snappy);
    const camPortalScale =
        rawFrame < 786
            ? 1.0
            : rawFrame < 802
              ? scMix(1.0, 0.95, portalAntic)
              : scMix(0.95, 5.2, portalDive);
    const camPortalX =
        rawFrame < 802 ? 0 : -605 * s * (camPortalScale - (1 - portalPanP));
    const camPortalY =
        rawFrame < 786
            ? 0
            : rawFrame < 802
              ? scMix(0, 14 * s, portalAntic)
              : scMix(14 * s, 18 * s * camPortalScale, portalPanP);
    const camPortalRotY =
        rawFrame < 786
            ? 0
            : rawFrame < 802
              ? scMix(0, -3.5, portalAntic)
              : scMix(-3.5, 8, portalDive);
    const camPortalRotZ =
        rawFrame < 786
            ? 0
            : rawFrame < 802
              ? scMix(0, 1.5, portalAntic)
              : scMix(1.5, -5.5, portalDive);

    // --- TỔNG HỢP MA TRẬN CAMERA 3D ---
    const finalCamScale =
        camIntroScale * camAmbientPush * crashZoomScale * camTransitionScale * camSlamScale * camPortalScale;
    const finalCamX = crashPanX + impactShakeX + shieldShakeX + camKanadaX + camPortalX;
    const finalCamY = camIntroY + camPlaneTrackY + crashPanY + impactShakeY + shieldShakeY + camPortalY;
    const finalCamRotX = camIntroRotX + camPlaneTrackRotX + orbitRotX + camSlamRotX;
    const finalCamRotY = camIntroRotY + orbitRotY + camKanadaRotY + camPortalRotY;
    const finalCamRotZ =
        camIntroRotZ + orbitRotZ + impactShakeRot + camSlamRotZ + shieldShakeRot + camKanadaRotZ + camPortalRotZ;

    // Envelope độ sâu 3D (chỉ bật tách lớp translateZ khi Camera đang xoay nghiêng 3D,
    // và trả về đúng 0.0 tuyệt đối khi Camera nghỉ để bảo toàn 100.00% tọa độ pixel tĩnh!)
    const cam3DActiveEnv = Math.min(
        1,
        (Math.abs(finalCamRotX) + Math.abs(finalCamRotY) + Math.abs(finalCamRotZ)) / 10
    );
    const z3d = (depthPx: number) => depthPx * s * cam3DActiveEnv;

    // Tính vận tốc tức thời để kích hoạt <SpeedBlur> định hướng ở các cú quất máy nhanh (Whip / Slam / Dive)
    const speedBlurX =
        (rawFrame >= 258 && rawFrame <= 266 ? 14 : 0) +
        (rawFrame >= 275 && rawFrame <= 288 ? 7 : 0) +
        (rawFrame >= 594 && rawFrame <= 612 ? 16 : 0) +
        (rawFrame >= 808 && rawFrame <= 836 ? 12 : 0);
    const speedBlurY =
        (rawFrame >= 0 && rawFrame <= 24 ? 14 * (1 - rawFrame / 24) : 0) +
        (rawFrame >= 492 && rawFrame <= 499 ? 18 : 0) +
        (rawFrame >= 808 && rawFrame <= 836 ? 6 : 0);
    const isStageSpeedBlurActive = speedBlurX > 0.6 || speedBlurY > 0.6;


    // ==========================================
    // ✈️ 2. MÁY BAY MÔ HÌNH CHUYỂN CẢNH (FLY-OVER HOOK)
    // ==========================================
    // Máy bay lướt từ trái sang phải bầu trời trong 82 frames (1.36s đầu)
    const planeProgress = interpolate(frame, [0, 82], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const planeLeft = interpolate(planeProgress, [0, 1], [-30, 115]);
    const planeTop = interpolate(planeProgress, [0, 0.45, 1], [6.0, 7.8, 5.0]);
    const planeRotate = interpolate(planeProgress, [0, 0.5, 1], [2.5, 0.5, -2.0]);
    const planeFloat = Math.sin(frame * 0.15) * 2.5;

    // ==========================================
    // 🛩️ 2.5. HOẠT CẢNH "CHIẾC MÁY BAY ĐỎNG ĐẢNH" (FRAME 102 - 258 — VÀO NGAY KHI CẶP ĐÔI ĐỨNG CHUẨN FORM Ở ~1.8S!)
    // ==========================================
    // Thay vì chờ tới F180 (3.0s) gây khoảng trống thừa, ngay khi cặp đôi vừa định hình tại tâm (F102 ~ 1.7s),
    // chiếc máy bay đỏng đảnh xuất hiện ngay trên tầng mây đầu bạn nam và đi thẳng vào chuỗi diễn xuất hài hước!
    const isQuirkyPlaneActive = frame >= 102 && frame <= 258;

    let quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.hover;
    let quirkyPlaneX = 0;
    let quirkyPlaneY = 0;
    let quirkyPlaneRotate = 0;
    let quirkyPlaneScale = 1;
    let quirkyPlaneScaleX = 1;
    let quirkyPlaneOpacity = 1;
    let quirkyPlaneShadow = '0 14px 22px rgba(15, 23, 42, 0.22)';

    if (frame >= 102 && frame < 122) {
        // [Giai đoạn 1: F102 - F122 (20f)] Xuất hiện nhanh & Hover ngóc mũi nhẹ
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.hover;
        quirkyPlaneY = Math.sin((frame - 102) * 0.15) * 4;
        quirkyPlaneRotate = 1.5 + Math.sin((frame - 102) * 0.1) * 1.5;
        quirkyPlaneOpacity = interpolate(frame, [102, 114], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        quirkyPlaneShadow = `0 ${14 + Math.sin((frame - 102) * 0.15) * 3}px ${22 + Math.sin((frame - 102) * 0.15) * 4}px rgba(15, 23, 42, 0.22)`;
    } else if (frame >= 122 && frame < 154) {
        // [Giai đoạn 2: F122 - F154 (32f)] Wobble chao đảo đỏng đảnh, hụt trớn
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.wobble;
        quirkyPlaneY = Math.sin((frame - 122) * 0.24) * 7;
        quirkyPlaneRotate = Math.sin((frame - 122) * 0.22) * 6;
        quirkyPlaneX = Math.sin((frame - 122) * 0.16) * 5;
        quirkyPlaneShadow = `0 ${15 + Math.sin((frame - 122) * 0.24) * 4}px ${24 + Math.sin((frame - 122) * 0.22) * 5}px rgba(15, 23, 42, 0.24)`;
    } else if (frame >= 154 && frame < 178) {
        // [Giai đoạn 3: F154 - F178 (24f)] Brake Skid phanh kít trên không, há hốc mồm
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.skid;
        const skidProgress = interpolate(frame, [154, 178], [0, 1], { extrapolateRight: 'clamp' });
        quirkyPlaneX = interpolate(skidProgress, [0, 0.4, 1], [0, -18, -12]);
        quirkyPlaneY = frame % 2 === 0 ? 2 : -2; // Rung giật bần bật do phanh kít
        quirkyPlaneRotate = -3;
        quirkyPlaneShadow = '0 10px 16px rgba(15, 23, 42, 0.28)';
    } else if (frame >= 178 && frame < 204) {
        // [Giai đoạn 4: F178 - F204 (26f)] Squash & Bend cong quéo dồn nén lò xo
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.squash;
        const squashProgress = interpolate(frame, [178, 204], [0, 1], { extrapolateRight: 'clamp' });
        quirkyPlaneScale = 1 + Math.sin(squashProgress * Math.PI) * 0.08;
        quirkyPlaneX = -12 + Math.sin((frame - 178) * 0.3) * 3;
        quirkyPlaneY = Math.sin((frame - 178) * 0.3) * 3;
        quirkyPlaneShadow = `0 ${18 + Math.sin(squashProgress * Math.PI) * 6}px ${28 + Math.sin(squashProgress * Math.PI) * 8}px rgba(15, 23, 42, 0.26)`;
    } else if (frame >= 204 && frame < 218) {
        // [Giai đoạn 5: F204 - F218 (14f)] Snap Flip búng thun lộn vòng 180 độ
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.snap;
        quirkyPlaneRotate = interpolate(frame, [204, 218], [0, -25]);
        quirkyPlaneScale = 1.05;
        quirkyPlaneX = interpolate(frame, [204, 218], [-12, -40]);
        quirkyPlaneShadow = '0 8px 32px rgba(15, 23, 42, 0.32)';
    } else if (frame >= 218 && frame <= 258) {
        // [Giai đoạn 6: F218 - F258 (40f)] Zip-out quay đầu 180 độ tháo chạy sang trái
        quirkyPlaneSrc = QUIRKY_PLANE_ASSETS.zip;
        quirkyPlaneScaleX = -1; // Lật ngược chiều ngang: đầu quay sang trái, đuôi xả khói sang phải
        const zipDistance = interpolate(frame, [218, 258], [0, -2800], {
            extrapolateLeft: 'clamp',
            easing: (t) => t * t * t, // Gia tốc phi tuyến tính phóng xé gió
        });
        quirkyPlaneX = -40 + zipDistance;
        quirkyPlaneY = interpolate(frame, [218, 258], [0, -80]);
        quirkyPlaneRotate = 4;
        quirkyPlaneShadow = '0 10px 24px rgba(15, 23, 42, 0.20)';
    }

    // Luồng lốc xoáy giấy 3D (Wind Vortex) rơi từ máy bay xuống vali (F212 - F266, chạm vali đúng tại F258!)
    const isVortexActive = frame >= 212 && frame <= 266;
    const vortexProgress = interpolate(frame, [212, 258], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const vortexTop = interpolate(vortexProgress, [0, 0.7, 1], [11, 42, 57]);
    const vortexLeft = interpolate(vortexProgress, [0, 0.7, 1], [52, 50, 48.5]);
    const vortexScale =
        frame <= 258
            ? interpolate(vortexProgress, [0, 0.6, 1], [0.25, 0.9, 1.15])
            : interpolate(frame, [258, 266], [1.15, 1.45], { extrapolateRight: 'clamp' });
    const vortexRotate = interpolate(vortexProgress, [0, 1], [0, 720]) + (frame > 258 ? (frame - 258) * 14 : 0);
    const vortexOpacity =
        frame <= 258
            ? interpolate(vortexProgress, [0, 0.2, 0.85, 1], [0, 1, 0.95, 0.9])
            : interpolate(frame, [258, 266], [0.9, 0], { extrapolateRight: 'clamp' });

    // ==========================================
    // ☀️ 3. MẶT TRỜI & TẦNG MÂY GIẤY (LIVING SKY)
    // ==========================================
    const sunEntrance = interpolate(frame, [0, 20], [0.85, 1.0], {
        extrapolateRight: 'clamp',
    });
    const sunScale = 1 + Math.sin(frame * 0.04) * 0.015;
    const sunRotate = frame * 0.07;

    // 🌞 Khuôn mặt Meme ở trung tâm cố định: xuất hiện ngay tại F262+ và giữ suốt cao trào hài hước 3.2 tới F488!
    const isSmirkActive = frame >= 262 && frame < 488;
    const smirkIn = interpolate(frame, [262, 272], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const smirkOut = interpolate(frame, [464, 488], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const smirkOpacity = isSmirkActive ? smirkIn * smirkOut : 0;

    // Quỹ đạo chuyển tiếp mượt mà của Mặt Trời từ vị trí 3.1 sang vị trí chuẩn 3.4 (F490 - F555)
    const sunTransition = interpolate(frame, [490, 555], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t),
    });
    const sunLeftVal = interpolate(sunTransition, [0, 1], [79.20, 65.95]);
    const sunTopVal = interpolate(sunTransition, [0, 1], [3.56, 9.05]);
    const sunTransX = interpolate(sunTransition, [0, 1], [140 * s, 214.2 * s]);
    const sunTransY = interpolate(sunTransition, [0, 1], [-199.2 * s, -195.5 * s]);
    const sunScaleTrans = interpolate(sunTransition, [0, 1], [1.2, 1.0]);
    const sunWidthVal = interpolate(sunTransition, [0, 1], [12.80, 10.09]);

    // 👒 Hoạt cảnh Chiếc Mũ Cói Bạn Nữ & Bạn Nam bị gió tốc lật bay bổng (Shot 3.2: F268 - F484)
    // ĐẶC BIỆT: Giữ cả 2 chiếc mũ bay lơ lửng trên đầu suốt từ F284 đến F464 (~3.0s) để đồng bộ 100% với Bức tranh Hình 1!
    const isHatFlying = frame >= 268 && frame < 484;
    let hatFlyY = 0;
    let hatFlyTilt = 0;
    let hatFlyScale = 1;
    let hatFlyOpacity = 1;

    let guyHatFlyY = 0;
    let guyHatFlyTilt = 0;
    let guyHatFlyScale = 1;
    let guyHatFlyOpacity = 1;

    if (frame >= 268 && frame < 284) {
        // [Pha 1: F268 - F284 (16f)] Gió tạt vào, 2 nón bốc vút lên cao khỏi đầu và chao nghiêng
        const t = (frame - 268) / 16;
        const ease = 1 - Math.pow(1 - t, 2);
        hatFlyY = interpolate(ease, [0, 1], [0, -52]);
        hatFlyTilt = interpolate(ease, [0, 1], [0, -18]);
        hatFlyScale = interpolate(ease, [0, 1], [1.0, 1.05]);
        hatFlyOpacity = interpolate(t, [0, 0.15], [0.8, 1]);

        guyHatFlyY = interpolate(ease, [0, 1], [0, -48]);
        guyHatFlyTilt = interpolate(ease, [0, 1], [0, 14]);
        guyHatFlyScale = interpolate(ease, [0, 1], [1.0, 1.05]);
        guyHatFlyOpacity = interpolate(t, [0, 0.15], [0.8, 1]);
    } else if (frame >= 284 && frame < 464) {
        // [Pha 2: F284 - F464 (180 frames = 3.0s)] ĐỈNH GIÓ KÉO DÀI: Cả 2 chiếc nón lơ lửng bồng bềnh trên đầu suốt Golden Comedy Hold!
        const flutter = Math.sin((frame - 284) * 0.22) * 4.2;
        hatFlyY = -52 + Math.sin((frame - 284) * 0.16) * 5.5;
        hatFlyTilt = -18 + flutter;
        hatFlyScale = 1.05;
        hatFlyOpacity = 1;

        const guyFlutter = Math.sin((frame - 284) * 0.24 + 0.8) * 3.8;
        guyHatFlyY = -48 + Math.sin((frame - 284) * 0.18 + 0.6) * 5.0;
        guyHatFlyTilt = 14 + guyFlutter;
        guyHatFlyScale = 1.05;
        guyHatFlyOpacity = 1;
    } else if (frame >= 464 && frame < 484) {
        // [Pha 3: F464 - F484 (20f)] Kết thúc cảnh 3.2: Nón rơi êm xuống đầu đàn hồi lò xo cùng nhịp thu hồi hành lý!
        const dropSpring = spring({
            frame: frame - 464,
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

    // Mây trôi Parallax đa tầng ngược chiều & chuyển tiếp mượt mà vào tọa độ 3.4 (F490 - F555)
    const cloudTransition = interpolate(frame, [490, 555], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: (t) => t * (2 - t),
    });

    const cloud1Parallax = interpolate(frame, [0, 360], [-10 * s, 35 * s]);
    const cloud1Left = interpolate(cloudTransition, [0, 1], [3.73, 16.42]);
    const cloud1Top = interpolate(cloudTransition, [0, 1], [2.61, 21.07]);
    const cloud1Width = interpolate(cloudTransition, [0, 1], [12.60, 13.30]);
    const cloud1TransX = interpolate(cloudTransition, [0, 1], [cloud1Parallax, -23.3 * s]);
    const cloud1TransY = interpolate(cloudTransition, [0, 1], [0, -365.1 * s]);

    const cloud2Parallax = interpolate(frame, [0, 360], [25 * s, -25 * s]);
    const cloud2Left = interpolate(cloudTransition, [0, 1], [34.00, 29.91]);
    const cloud2Top = interpolate(cloudTransition, [0, 1], [1.90, 5.25]);
    const cloud2Width = interpolate(cloudTransition, [0, 1], [12.53, 10.48]);
    const cloud2TransX = interpolate(cloudTransition, [0, 1], [cloud2Parallax, 135.1 * s]);
    const cloud2TransY = interpolate(cloudTransition, [0, 1], [0, -49.7 * s]);

    const cloud3Parallax = interpolate(frame, [0, 360], [-8 * s, 28 * s]);
    const cloud3Left = interpolate(cloudTransition, [0, 1], [59.67, 60.54]);
    const cloud3Top = interpolate(cloudTransition, [0, 1], [10.19, 19.61]);
    const cloud3Width = interpolate(cloudTransition, [0, 1], [13.47, 10.34]);
    const cloud3TransX = interpolate(cloudTransition, [0, 1], [cloud3Parallax, 204.9 * s]);
    const cloud3TransY = interpolate(cloudTransition, [0, 1], [0, -177.4 * s]);

    // ==========================================
    // 🌊 4. HIỆU ỨNG VỆT BUNG NỞ (WAVE / TRAIL POP-UP)
    // ==========================================
    // [Cụm 1 - Phía Trái: Frame 12 - 60]
    const leftPodiumSpring = spring({
        frame: frame - 12,
        fps,
        config: { damping: 18, stiffness: 85 },
    });
    const leftPodiumOffsetX = interpolate(leftPodiumSpring, [0, 1], [-100, 0]);

    const greenPalmSpring = spring({
        frame: frame - 18,
        fps,
        config: { damping: 15, stiffness: 80 },
    });
    const greenPalmScale = interpolate(greenPalmSpring, [0, 1], [0.7, 1.0]);
    const greenPalmSway = Math.sin(frame * 0.04) * 0.8;

    // [Cụm 2 - Trung Tâm Sân Khấu: Frame 24 - 68]
    const carpetSpring = spring({
        frame: frame - 24,
        fps,
        config: { damping: 16, stiffness: 90 },
    });
    const carpetScale = interpolate(carpetSpring, [0, 1], [0.75, 1.0]);

    const leftDuneSpring = spring({ frame: frame - 22, fps, config: { damping: 18, stiffness: 85 } });
    const leftDuneRise = interpolate(leftDuneSpring, [0, 1], [70, 0]);

    const rightDuneSpring = spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 85 } });
    const rightDuneRise = interpolate(rightDuneSpring, [0, 1], [70, 0]);

    // [Cụm 3 - Phía Phải: Frame 36 - 80]
    const rightPodiumSpring = spring({
        frame: frame - 36,
        fps,
        config: { damping: 18, stiffness: 85 },
    });
    const rightPodiumOffsetX = interpolate(rightPodiumSpring, [0, 1], [90, 0]);

    const pinkPalmSpring = spring({
        frame: frame - 40,
        fps,
        config: { damping: 15, stiffness: 80 },
    });
    const pinkPalmScale = interpolate(pinkPalmSpring, [0, 1], [0.7, 1.0]);
    const pinkPalmSway = Math.sin(frame * 0.042 + 1.2) * 1.0;

    const pinkArcSpring = spring({
        frame: frame - 44,
        fps,
        config: { damping: 16, stiffness: 95 },
    });

    const chairSpring = spring({
        frame: frame - 46,
        fps,
        config: { damping: 15, stiffness: 95 },
    });
    const chairDrop = interpolate(chairSpring, [0, 1], [-40, 0]);

    const duckSpring = spring({
        frame: frame - 50,
        fps,
        config: { damping: 13, stiffness: 100 },
    });
    const duckDrop = interpolate(duckSpring, [0, 1], [-50, 0]);
    const duckBob = Math.sin(frame * 0.08) * 3.5;
    const duckRock = Math.sin(frame * 0.08) * 2.2;

    // ==========================================
    // 👫 5. CẶP ĐÔI HERO (CINEMATIC GENTLE GLIDE - ĐỨNG CHUẨN FORM TẠI F105 ~ 1.75S)
    // ==========================================
    const coupleEntrance = spring({
        frame: frame - 42,
        fps,
        config: { damping: 22, stiffness: 62 }, // Lướt êm và khóa nét chuẩn form đúng tại ~F105 (1.75s)
    });

    const coupleOffsetX = interpolate(coupleEntrance, [0, 1], [-220, 0]);
    const coupleOffsetY = interpolate(coupleEntrance, [0, 0.7, 1], [-18, 2, 0]);
    const coupleScale = interpolate(coupleEntrance, [0, 1], [0.94, 1.0]);

    const isGliding = frame >= 42 && frame < 108;
    const glideFloat = isGliding ? Math.sin((frame - 42) * 0.1) * 1.0 : 0;

    const idleBreathing = frame >= 108 && frame < 258 ? Math.sin((frame - 108) * 0.04) * 1.5 : 0;
    const subtleSway = frame >= 108 && frame < 258 ? Math.sin((frame - 108) * 0.03) * 0.35 : 0;

    // ==========================================
    // 😱 5.5. SHOT 3.2: CẶP ĐÔI GIẬT MÌNH & VALI BUNG NẮP (FRAME 258+)
    // ==========================================
    const isShocked = frame >= 258;
    const shockSpring = spring({
        frame: frame - 258,
        fps,
        config: { damping: 12, stiffness: 220, mass: 0.7 },
    });
    const shockJumpY = isShocked ? interpolate(shockSpring, [0, 0.35, 1], [0, -14, 0]) : 0;
    const shockShiver = isShocked && frame >= 270 ? Math.sin((frame - 270) * 0.45) * 0.85 : 0;
    const shockBreath = isShocked && frame >= 278 ? Math.sin((frame - 278) * 0.06) * 1.2 : 0;
    const currentCoupleSrc = !isShocked
        ? STAGING_SHOT_3_1.couple.src
        : isHatFlying
          ? STAGING_SHOT_3_1.couple.shockNoHatSrc
          : STAGING_SHOT_3_1.couple.shockWithHatSrc;

    // ==========================================
    // 🦆 5.6. SHOT 3.2: CHÚ VỊT BỊ LỐC XOÁY CUỐN BAY, XOAY TÍT 720° & ĐÁP SỚM TẠI F305 ĐỂ ĐỒNG BỘ BỨC TRANH HÌNH 1!
    // ==========================================
    // 1. Frame 0 - 254: Bập bềnh thư thả mép sóng (vit.png)
    // 2. Frame 255 - 268 (13f): Lốc xoáy hút bốc bổng lên cao (vit_roiram.png, xoay vòng 1: 0 -> 360°)
    // 3. Frame 268 - 284 (16f): ĐỈNH QUỸ ĐẠO: Xoay tròn tít tít 360° thứ hai (360° -> 720°)
    // 4. Frame 284 - 304 (20f): Lượn cầu vồng parabol rơi êm xuống cát cạnh ghế xanh/đụn cát phải
    // 5. Frame 304 - 314 (10f): Tiếp đất nén dẹt đàn hồi (Squash & Stretch)
    // 6. Frame 314 - 495 (181f = 3.0s!): Ngồi bệt choáng váng lắc lư cạnh đụn cát phải + 3 ngôi sao ⭐ xoay tít!

    const isDuckSwirled = frame >= 255;
    const isDuckLifting = frame >= 255 && frame < 268;
    const isDuckSpinningTop = frame >= 268 && frame < 284;
    const isDuckDescending = frame >= 284 && frame < 304;
    const isDuckLanding = frame >= 304 && frame < 314;
    const isDuckSafe = frame >= 314;

    const currentDuckSrc = isDuckSwirled ? STAGING_SHOT_3_1.rubberDuck.dizzySrc : STAGING_SHOT_3_1.rubberDuck.src;

    let duckFlightX = 0;
    if (frame < 255) {
        duckFlightX = 0;
    } else if (isDuckLifting) {
        const t = (frame - 255) / 13;
        duckFlightX = interpolate(t, [0, 1], [0, -28], { easing: (x) => x * x });
    } else if (isDuckSpinningTop) {
        const t = (frame - 268) / 16;
        duckFlightX = interpolate(t, [0, 1], [-28, -12]);
    } else if (isDuckDescending) {
        const t = (frame - 284) / 20;
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        duckFlightX = interpolate(ease, [0, 1], [-12, 48]);
    } else {
        duckFlightX = 48;
    }

    let duckFlightY = 0;
    if (frame < 255) {
        duckFlightY = duckBob;
    } else if (isDuckLifting) {
        const t = (frame - 255) / 13;
        duckFlightY = interpolate(t, [0, 1], [0, -115], { easing: (x) => 1 - Math.pow(1 - x, 2) });
    } else if (isDuckSpinningTop) {
        const t = (frame - 268) / 16;
        duckFlightY = -115 - Math.sin(t * Math.PI) * 4;
    } else if (isDuckDescending) {
        const t = (frame - 284) / 20;
        duckFlightY = interpolate(t, [0, 1], [-115, -28], { easing: (x) => x * x });
    } else if (isDuckLanding) {
        const t = (frame - 304) / 10;
        duckFlightY = -28 + Math.sin(t * Math.PI) * -5;
    } else {
        duckFlightY = -28 + Math.sin((frame - 314) * 0.05) * 1.2;
    }

    let duckFlightZ = 0;
    if (frame < 255) {
        duckFlightZ = 0;
    } else if (isDuckLifting) {
        duckFlightZ = interpolate(frame, [255, 268], [0, 120]);
    } else if (isDuckSpinningTop) {
        duckFlightZ = 120;
    } else if (isDuckDescending) {
        duckFlightZ = interpolate(frame, [284, 304], [120, 0]);
    } else {
        duckFlightZ = 0;
    }

    let duckRotation = 0;
    if (frame < 255) {
        duckRotation = duckRock;
    } else if (isDuckLifting) {
        const t = (frame - 255) / 13;
        duckRotation = t * 360;
    } else if (isDuckSpinningTop) {
        const t = (frame - 268) / 16;
        const spinEase = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        duckRotation = 360 + spinEase * 360;
    } else if (isDuckDescending) {
        duckRotation = 720;
    } else if (isDuckLanding) {
        duckRotation = 720;
    } else {
        duckRotation = 720 + Math.sin((frame - 314) * 0.15) * 4.5;
    }

    let duckSquashX = 1;
    let duckSquashY = 1;
    if (isDuckLifting) {
        duckSquashX = 0.94;
        duckSquashY = 1.08;
    } else if (isDuckSpinningTop) {
        duckSquashX = 1;
        duckSquashY = 1;
    } else if (isDuckLanding) {
        const t = (frame - 304) / 10;
        duckSquashX = 1 + Math.sin(t * Math.PI) * 0.1;
        duckSquashY = 1 - Math.sin(t * Math.PI) * 0.1;
    }

    const duckDisplayScale = isDuckSwirled ? 1.48 : 1.0;
    const duckAlignOffsetY = isDuckSwirled ? 18 : 0;

    const duckAltitude = Math.max(0, -duckFlightY);
    const duckShadowOpacity = interpolate(duckAltitude, [0, 90], [0.55, 0.1], {
        extrapolateRight: 'clamp',
    });
    const duckShadowScale = interpolate(duckAltitude, [0, 90], [1.0, 0.5], {
        extrapolateRight: 'clamp',
    });

    // 🌟 VÒNG 3 NGÔI SAO CHOÁNG VÁNG 3D XOAY TÍT QUANH ĐỈNH ĐẦU (Bật sáng từ F272 xuyên suốt Golden Comedy Hold!)
    const starHaloVisible = isDuckSwirled && frame >= 272;
    const starHaloOpacity = interpolate(frame, [272, 288], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const starOrbitSpeed = (frame - 272) * 0.12;
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

    // ==========================================
    // 🌪️ CHUYỂN TIẾP HÚT XOÁY 3D & ĐẬP SẬP CẢNH 3.4 (WHIP-IMPLOSION -> IMPACT-BURST-KIT SLAM)
    // ==========================================
    // Thay vì mờ dần phẳng lì, toàn bộ đạo cụ Shot 3.1/3.2 bị hút xoáy sập vào tâm trong 18f (F476 - F494)
    // ngay trước khi Khiên Hồng & Cặp đôi Hero đập sập xuống sàn tại HIT_34 = 498!
    const implode31P = scRamp(rawFrame, 476, 18, SC_EASE.slam);
    const oldDioramaFade = interpolate(rawFrame, [480, 497], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const implodeScale = scMix(1.0, 0.35, implode31P);
    const implodeRotZ = scMix(0, -16, implode31P);
    const implodeY = scMix(0, 95 * s, implode31P);

    // Cặp đôi hoảng hốt bị cuốn vào tâm chớp sáng nhường chỗ cho cặp đôi Hero đập xuống (F478 - F495)
    const shockedCoupleFade = interpolate(rawFrame, [478, 495], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // ==========================================
    // 🛡️ SHOT 3.3 -> 3.4: KHIÊN HỒNG & CẶP ĐÔI ĐẬP SẬP "IMPACT-BURST-KIT" (FRAME 480 - 544)
    // ==========================================
    // Theo chuẩn ImpactBurstKit.tsx của video-shotcraft:
    // - F480 - F492 (12f): Lơ lửng sát trước ống kính máy quay (scale 1.52 -> 1.58, DOF blur 6.5px -> 0px) lấy đà
    // - F492 - F498 (6f): Đập sập xuống sàn theo hàm bậc 3 (SC_EASE.slam), chạm đất đúng tại HIT_34 = 498!
    // - F498 - F501 (3f): Nén dẹt Squash (scaleX 1.07, scaleY 0.92) -> F501 - F521: Bật nảy đàn hồi về 1.0!
    const HIT_34 = 498;
    const shieldHoverP = scRamp(rawFrame, 480, 12, SC_EASE.smooth);
    const shieldSlamP = scRamp(rawFrame, 492, 6, SC_EASE.slam);
    const shieldReboundP = scRamp(rawFrame, 501, 20, SC_EASE.snappy);

    const shieldOpacity = interpolate(rawFrame, [480, 486], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const shieldDropY =
        rawFrame < 492
            ? scMix(-220 * s, -165 * s, shieldHoverP)
            : rawFrame < 498
              ? scMix(-165 * s, 0, shieldSlamP)
              : rawFrame < 501
                ? 8 * s
                : rawFrame < 521
                  ? scMix(8 * s, 0, shieldReboundP)
                  : 0;
    const shieldSlamScaleX =
        rawFrame < 492
            ? scMix(1.52, 1.58, shieldHoverP)
            : rawFrame < 498
              ? scMix(1.58, 1.0, shieldSlamP)
              : rawFrame < 501
                ? 1.07
                : rawFrame < 521
                  ? scMix(1.07, 1.0, shieldReboundP)
                  : 1.0;
    const shieldSlamScaleY =
        rawFrame < 492
            ? scMix(1.52, 1.58, shieldHoverP)
            : rawFrame < 498
              ? scMix(1.58, 1.0, shieldSlamP)
              : rawFrame < 501
                ? 0.92
                : rawFrame < 521
                  ? scMix(0.92, 1.0, shieldReboundP)
                  : 1.0;
    const shieldDofBlur =
        rawFrame >= 480 && rawFrame < 497
            ? scMix(6.5 * s, 0, scRamp(rawFrame, 480, 17))
            : 0;

    // 🌊 SÓNG CHẤN ĐỘNG LAN TRUYỀN ĐẨY BẬT ĐẠO CỤ XUNG QUANH (Wavefront Neighbor Push - ImpactBurstKit.tsx)
    // 3 frames sau khi Khiên & Cặp đôi đập xuống đất (F501), sóng xung kích hất văng Đảo dừa, Ghế hồng, Vali hồng, Vịt phao
    // ra hai bên rồi dao động tắt dần cos(t*0.42)*exp(-t/9.5), trả về đúng 0px tại F544!
    const neighborPushT = rawFrame - (HIT_34 + 3);
    const neighborPushEnv =
        neighborPushT >= 0 && neighborPushT < 44
            ? Math.cos(neighborPushT * 0.42) * Math.exp(-neighborPushT / 9.5)
            : 0;
    const pushLeftX = -42 * s * neighborPushEnv;
    const pushLeftRot = -4.0 * neighborPushEnv;
    const pushRightX = 42 * s * neighborPushEnv;
    const pushRightRot = 4.0 * neighborPushEnv;

    // 2. Sóng xung kích hào quang hồng kép + 18 mảnh đa giác lan tỏa khi khiên tiếp đất (F498 - F542)
    const isShieldPulseActive = rawFrame >= 498 && rawFrame <= 542;
    const pulseProgress = interpolate(rawFrame, [498, 536], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const pulseScale = interpolate(pulseProgress, [0, 1], [0.2, 2.5]);
    const pulseOpacity = interpolate(pulseProgress, [0, 0.12, 0.7, 1], [0, 0.92, 0.4, 0]);

    // 3. Huy hiệu khiên vali hồng nhỏ + tick xanh ở vai phải khung nảy ra
    const badgeSpring = spring({
        frame: rawFrame - 498,
        fps,
        config: { damping: 11, stiffness: 135 },
    });
    const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1.0]);
    const badgeOpacity = interpolate(badgeSpring, [0, 0.2, 1], [0, 1, 1]);

    // 4. Tiêu đề 'Bảo hiểm du lịch' bên trong đỉnh khiên
    const archTextSpring = spring({
        frame: rawFrame - 500,
        fps,
        config: { damping: 14, stiffness: 110 },
    });
    const archTextY = interpolate(archTextSpring, [0, 1], [-35 * s, 0]);
    const archTextOpacity = interpolate(archTextSpring, [0, 0.25, 1], [0, 1, 1]);

    // 5. Cặp đôi Hero (Bạn Nam & Bạn Nữ tách biệt) đập sập từ sát ống kính xuống cùng Khiên Hồng (Impact-Burst-Kit)
    const heroCoupleOpacity = interpolate(rawFrame, [482, 488], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const heroCoupleDropY =
        rawFrame < 492
            ? scMix(-180 * s, -135 * s, shieldHoverP)
            : rawFrame < 498
              ? scMix(-135 * s, 0, shieldSlamP)
              : rawFrame < 501
                ? 10 * s
                : rawFrame < 521
                  ? scMix(10 * s, 0, shieldReboundP)
                  : 0;
    const heroSlamScaleX = shieldSlamScaleX;
    const heroSlamScaleY = shieldSlamScaleY;
    const heroIdleBreath = rawFrame >= 526 ? Math.sin((rawFrame - 526) * 0.04) * 1.2 * s : 0;
    const heroGirlIdleBreath = rawFrame >= 526 ? Math.sin((rawFrame - 526) * 0.04 + 0.6) * 1.2 * s : 0;

    // 6. Thảm cát trung tâm mới bung nở đón cú đập
    const sandRugSpring = spring({
        frame: rawFrame - 486,
        fps,
        config: { damping: 14, stiffness: 105 },
    });
    const sandRugScale = interpolate(sandRugSpring, [0, 1], [0.65, 1.0]);
    const sandRugOpacity = interpolate(sandRugSpring, [0, 0.2, 1], [0, 1, 1]);

    // 7. Dải nước biển xanh nhiều lớp dâng lên
    const seaWaterSpring = spring({
        frame: rawFrame - 494,
        fps,
        config: { damping: 16, stiffness: 85 },
    });
    const seaWaterRiseY = interpolate(seaWaterSpring, [0, 1], [160 * s, 0]);
    const seaWaterOpacity = interpolate(seaWaterSpring, [0, 0.25, 1], [0, 1, 1]);
    const seaWaterWave = rawFrame >= 526 ? Math.sin((rawFrame - 526) * 0.04) * 2.0 * s : 0;

    // 8. Đảo dừa giấy hậu cảnh trượt vào + chịu lực hất sóng xung kích (pushLeftX)
    const islandSpring = spring({
        frame: rawFrame - 496,
        fps,
        config: { damping: 15, stiffness: 95 },
    });
    const islandSlideX = interpolate(islandSpring, [0, 1], [-140 * s, 0]) + pushLeftX * 0.85;
    const islandOpacity = interpolate(islandSpring, [0, 0.25, 1], [0, 1, 1]);

    // 9. Ghế hồng đáp xuống cát + bị hất văng nhẹ bởi sóng xung kích Khiên Hồng (pushLeftX, pushLeftRot)
    const pinkChairSpring = spring({
        frame: rawFrame - 497,
        fps,
        config: { damping: 13, stiffness: 105 },
    });
    const pinkChairDropY = interpolate(pinkChairSpring, [0, 1], [-120 * s, 0]);
    const pinkChairOpacity = interpolate(pinkChairSpring, [0, 0.2, 1], [0, 1, 1]);

    // 10. Vali hồng đứng cạnh chân bạn nam đáp xuống + phản hồi sóng xung kích
    const pinkSuitcaseSpring = spring({
        frame: rawFrame - 498,
        fps,
        config: { damping: 12, stiffness: 110 },
    });
    const pinkSuitcaseDropY = interpolate(pinkSuitcaseSpring, [0, 1], [-110 * s, 0]);
    const pinkSuitcaseOpacity = interpolate(pinkSuitcaseSpring, [0, 0.2, 1], [0, 1, 1]);

    // 11. Thảm nước & chú vịt vàng phao bơi đáp xuống + phản hồi sóng xung kích (pushRightX, pushRightRot)
    const duckPuddleSpring = spring({
        frame: rawFrame - 499,
        fps,
        config: { damping: 14, stiffness: 100 },
    });
    const duckPuddleScale = interpolate(duckPuddleSpring, [0, 1], [0.4, 1.0]);
    const duckPuddleOpacity = interpolate(duckPuddleSpring, [0, 0.2, 1], [0, 1, 1]);

    const duckSpring34 = spring({
        frame: rawFrame - 500,
        fps,
        config: { damping: 12, stiffness: 110 },
    });
    const duckDropY34 = interpolate(duckSpring34, [0, 1], [-110 * s, 0]);
    const duckOpacity34 = interpolate(duckSpring34, [0, 0.2, 1], [0, 1, 1]);
    const duckBob34 = rawFrame >= 546 ? Math.sin((rawFrame - 546) * 0.08) * 2.0 * s : 0;

    // ==========================================
    // 📱 SHOT 3.5: CÚ VẨY MẮT CÁ "KANADA PERSPECTIVE SNAP" CHO TIÊU ĐỀ & SMARTPHONE (FRAME 576+)
    // ==========================================
    // 12. Tiêu đề chính bên trái: Văng phối cảnh 3D từ cánh trái đập phẳng (F576 - F600)
    const headingMoveP = scRamp(rawFrame, 576, 16, SC_EASE.heavy);
    const headingTwistP = scRamp(rawFrame, 576, 18, SC_EASE.twist);
    const headingReboundT = rawFrame - 592;
    const headingReboundEnv =
        headingReboundT >= 0 && headingReboundT < 14
            ? Math.sin((headingReboundT / 14) * Math.PI)
            : 0;
    const headingX = rawFrame < 592 ? scMix(-540 * s, 0, headingMoveP) : 0;
    const headingRotY =
        rawFrame < 594
            ? scMix(52, 0, headingTwistP)
            : headingReboundEnv * -5.5;
    const headingRotZ =
        rawFrame < 594
            ? scMix(-8, 0, headingTwistP)
            : headingReboundEnv * 1.2;
    const headingScale =
        rawFrame < 592
            ? scMix(1.42, 0.96, headingMoveP)
            : scMix(0.96, 1.0, scRamp(rawFrame, 592, 12, SC_EASE.snappy));
    const headingOpacity = interpolate(rawFrame, [576, 581], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 13. Smartphone Mockup: Cú Vẩy Mắt Cá "Kanada Perspective Snap" (KanadaPerspectiveSnap.tsx, F594 - F626)
    // - F594 - F612 (18f): Lao từ góc mắt cá cực đại (perspective 260 -> 1800, scale 1.68 -> 0.95 -> 1.0)
    // - Góc xoắn 3 trục rotate3d(0.45, -1, 0.12, 64° -> 0°) trả phẳng trễ hơn vị trí 2 frames (F594 - F614) tạo cú vẩy cổ tay!
    // - Tại SNAP_35 = 612: Điện thoại đập phẳng với cú nảy overshoot rotateY (+7.5° -> 0°) + bung 36 tia Focus & 7 vệt xé gió!
    const SNAP_35 = 612;
    const phoneMoveP = scRamp(rawFrame, 594, 18, SC_EASE.snappy);
    const phoneTwistP = scRamp(rawFrame, 594, 20, SC_EASE.twist);
    const phoneReboundP = scRamp(rawFrame, 612, 14, SC_EASE.snappy);
    const phoneSnapOvershoot =
        rawFrame >= 612 && rawFrame < 626
            ? Math.sin(((rawFrame - 612) / 14) * Math.PI)
            : 0;

    const phoneOpacity = interpolate(rawFrame, [594, 597], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const phoneSlideX = rawFrame < 612 ? scMix(520 * s, 0, phoneMoveP) : 0;
    const phoneSlideY = rawFrame < 612 ? scMix(-110 * s, 0, phoneMoveP) : 0;
    const phoneKanadaScale =
        rawFrame < 612
            ? scMix(1.68, 0.95, phoneMoveP)
            : rawFrame < 626
              ? scMix(0.95, 1.0, phoneReboundP)
              : 1.0;
    const phoneTwistDeg = rawFrame < 614 ? scMix(64, 0, phoneTwistP) : 0;
    const phoneSnapRotY = phoneSnapOvershoot * 7.5;
    const phoneSnapRotZ = phoneSnapOvershoot * -1.8;

    // Nhịp bung Radial Ripple cho các thẻ bên trong Smartphone ngay trong pha vẩy Kanada Snap (F598 - F628)
    const phoneCard1Spring = spring({
        frame: rawFrame - 598,
        fps,
        config: { damping: 12, stiffness: 140 },
    });
    const phoneCard2Spring = spring({
        frame: rawFrame - 605,
        fps,
        config: { damping: 12, stiffness: 140 },
    });
    const phoneCtaEntranceSpring = spring({
        frame: rawFrame - 612,
        fps,
        config: { damping: 11, stiffness: 150 },
    });

    // 14. Mũi tên hồng uốn cong chỉ sang điện thoại (bung nảy ngay sau khi điện thoại khóa nét)
    const arrowSpring = spring({
        frame: rawFrame - 624,
        fps,
        config: { damping: 11, stiffness: 135 },
    });
    const arrowScale = interpolate(arrowSpring, [0, 1], [0, 1.0]);
    const arrowOpacity = interpolate(arrowSpring, [0, 0.2, 1], [0, 1, 1]);

    // 15. Hiệu ứng Click tương tác chủ động + Radial Ripple cho nút CTA "CHỌN GÓI" trong 2s kết cảnh (F720 - F786)
    const isCtaPulsing = rawFrame >= 728 && rawFrame <= 776;
    const ctaPulseP = isCtaPulsing ? (rawFrame - 728) / 48 : 0;
    const ctaBump =
        rawFrame >= 724 && rawFrame < 734
            ? -0.075 * Math.sin(((rawFrame - 724) / 10) * Math.PI) // Nhấn lún nút trước khi bung sóng
            : isCtaPulsing
              ? Math.sin(ctaPulseP * Math.PI) * 0.085
              : 0;
    const ctaGlow = isCtaPulsing ? Math.sin(ctaPulseP * Math.PI) * 28 : 0;

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                background:
                    rawFrame < 494
                        ? 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 55%, #FDE68A 100%)'
                        : colors.bgLight,
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                perspective: 1850 * s,
                transformStyle: 'preserve-3d',
            }}
        >
            {/* KHUNG DIORAMA 3D VỚI MA TRẬN CAMERA 5 HỒI (TILT-REVEAL / CRASH-ZOOM / BULLET-TIME ORBIT / SLAM / PORTAL) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translate3d(${finalCamX}px, ${finalCamY}px, 0px) scale(${finalCamScale}) rotateX(${finalCamRotX}deg) rotateY(${finalCamRotY}deg) rotateZ(${finalCamRotZ}deg)`,
                    transformOrigin: rawFrame < 65 ? '50% 82%' : '50% 55%',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* 1. NỀN BIỂN VÀ BÃI CÁT PAPER-CUT (16:9) */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: oldDioramaFade,
                            transform: `translate3d(0px, ${implodeY * 0.4}px, ${z3d(-150)}px) scale(${(1 + 0.42 * cam3DActiveEnv) * scMix(1, 0.72, implode31P)}) rotateZ(${implodeRotZ * 0.35}deg)`,
                            transformOrigin: '50% 55%',
                        }}
                    />
                )}

                {/* 2. MẶT TRỜI: KHUÔN MẶT TRUNG TÂM CỐ ĐỊNH + VÒNG NGOÀI TAM GIÁC XOAY VÒNG & BLUR NHÒA LÓE SÁNG */}
                <div
                    style={{
                        position: 'absolute',
                        left: `${sunLeftVal}%`,
                        top: `${sunTopVal}%`,
                        width: `${sunWidthVal}%`,
                        zIndex: STAGING_SHOT_3_4.sun.zIndex,
                        pointerEvents: 'none',
                        opacity: sunEntrance,
                        transform: `translate3d(${sunTransX + pushRightX * 0.45}px, ${sunTransY}px, ${z3d(-95)}px) scale(${sunScale * sunScaleTrans})`,
                        transformOrigin: 'center center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: 'auto',
                            position: 'relative',
                        }}
                    >
                        {/* ☀️ VÒNG NGOÀI: CÁC TAM GIÁC TIA MẶT TRỜI XOAY VÒNG NHƯ CODE GỐC + BLUR NHÒA LÓE SÁNG */}
                        <div
                            style={{
                                width: '100%',
                                height: 'auto',
                                transform: `rotate(${sunRotate}deg)`,
                                transformOrigin: '50% 50%',
                                position: 'relative',
                            }}
                        >
                            {/* Lớp 1: Các tam giác sắc nét xoay vòng như code gốc */}
                            <Img
                                src={staticFile(STAGING_SHOT_3_4.sun.src)}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.45))',
                                    translate: '-67.6px 255.1px'
                                }}
                            />

                            {/* Lớp 2: Hiệu ứng blur nhòa lóe sáng lên các tam giác tia mặt trời */}
                            <Img
                                src={staticFile(STAGING_SHOT_3_4.sun.src)}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    filter: 'blur(10px) brightness(1.35) drop-shadow(0 0 25px rgba(253, 224, 71, 0.85))',
                                    opacity: 0.7 + Math.sin(frame * 0.08) * 0.15,
                                    mixBlendMode: 'screen',
                                    pointerEvents: 'none',
                                    translate: '-75.9px 255.5px'
                                }}
                            />
                        </div>

                        {/* 😃 TRUNG TÂM: KHUÔN MẶT CỐ ĐỊNH (KÈM NHỊP JUMP-CUT PUNCH-IN & DOUBLE-TAKE SMIRK PULSE TRONG NHỊP DỪNG VÀNG) */}
                        {smirkOpacity > 0 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    opacity: smirkOpacity,
                                    pointerEvents: 'none',
                                    transform: `scale(${
                                        rawFrame >= 268 && rawFrame < 278
                                            ? 1.18
                                            : rawFrame >= 278 && rawFrame < 294
                                              ? 1.34
                                              : rawFrame >= 375 && rawFrame <= 415
                                                ? 1.0 + 0.16 * Math.sin(((rawFrame - 375) / 40) * Math.PI)
                                                : 1.0
                                    }) rotate(${
                                        rawFrame >= 375 && rawFrame <= 415
                                            ? -5.5 * Math.sin(((rawFrame - 375) / 40) * Math.PI)
                                            : 0
                                    }deg)`,
                                    transformOrigin: '35% 75%',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen3/3.2/mat_troi_meme_face_only.png')}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        filter: 'drop-shadow(0 8px 18px rgba(245, 158, 11, 0.35))',
                                        translate: '-193.2px 181.1px'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. TẦNG MÂY GIẤY 1 (Góc trên bên trái) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.cloud1.src)}
                    style={{
                        position: 'absolute',
                        left: `${cloud1Left}%`,
                        top: `${cloud1Top}%`,
                        width: `${cloud1Width}%`,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_4.cloud1.zIndex,
                        pointerEvents: 'none',
                        transform: `translate3d(${cloud1TransX + pushLeftX * 0.4}px, ${cloud1TransY}px, ${z3d(-70)}px)`,
                    }}
                />

                {/* 4. TẦNG MÂY GIẤY 2 (Trung tâm bầu trời) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.cloud2.src)}
                    style={{
                        position: 'absolute',
                        left: `${cloud2Left}%`,
                        top: `${cloud2Top}%`,
                        width: `${cloud2Width}%`,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_4.cloud2.zIndex,
                        pointerEvents: 'none',
                        transform: `translate3d(${cloud2TransX + pushLeftX * 0.25}px, ${cloud2TransY}px, ${z3d(-55)}px)`,
                    }}
                />

                {/* 5. TẦNG MÂY GIẤY 3 (Phía trên bên phải) */}
                <Img
                    src={staticFile(STAGING_SHOT_3_4.cloud3.src)}
                    style={{
                        position: 'absolute',
                        left: `${cloud3Left}%`,
                        top: `${cloud3Top}%`,
                        width: `${cloud3Width}%`,
                        height: 'auto',
                        zIndex: STAGING_SHOT_3_4.cloud3.zIndex,
                        pointerEvents: 'none',
                        transform: `translate3d(${cloud3TransX + pushRightX * 0.4}px, ${cloud3TransY}px, ${z3d(-60)}px)`,
                        translate: '305.7px -82px'
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
                            transform: `translate3d(0px, ${planeFloat}px, ${z3d(140)}px) rotate(${planeRotate}deg)`,
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
                            transform: `translate3d(${quirkyPlaneX}px, ${quirkyPlaneY}px, ${z3d(110)}px) scale(${quirkyPlaneScaleX * quirkyPlaneScale}, ${quirkyPlaneScale}) rotate(${quirkyPlaneRotate}deg)`,
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
                            transform: `translate3d(0px, 0px, ${z3d(135)}px) scale(${vortexScale}) rotate(${vortexRotate}deg)`,
                            transformOrigin: 'center center',
                            filter: 'drop-shadow(0 12px 20px rgba(15, 23, 42, 0.22))',
                        }}
                    />
                )}

                {/* 💥 6.65. SÓNG XUNG KÍCH NỔ VALI + VÒNG QUỸ ĐẠO BULLET-TIME FREEZE (CrashImpactReal + BulletTimeFreezeOrbit) */}
                {rawFrame >= 257 && rawFrame <= 326 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: '43.5%',
                            top: '64.0%',
                            width: 0,
                            height: 0,
                            zIndex: 29,
                            pointerEvents: 'none',
                            transform: `translate3d(0px, 0px, ${z3d(155)}px)`,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* 2 Vòng sóng xung kích nổ bung ngay khi lốc xoáy chạm vali (F258 - F278) */}
                        {rawFrame >= 258 &&
                            rawFrame <= 278 &&
                            [0, 3].map((delay, k) => {
                                const p = scRamp(rawFrame, 258 + delay, 16, SC_EASE.snappy);
                                const rad = scMix(60 * s, (k === 0 ? 780 : 540) * s, p);
                                const op = (1 - p) * (k === 0 ? 0.9 : 0.65) * (rawFrame >= 258 + delay ? 1 : 0);
                                return (
                                    <div
                                        key={`crash_ring_${k}`}
                                        style={{
                                            position: 'absolute',
                                            left: -rad,
                                            top: -rad * 0.55,
                                            width: rad * 2,
                                            height: rad * 1.1,
                                            borderRadius: '50%',
                                            border: `${(k === 0 ? 5 : 3) * s}px solid ${k === 0 ? '#38BDF8' : '#FBBF24'}`,
                                            boxShadow: `0 0 ${28 * s}px ${k === 0 ? 'rgba(56, 189, 248, 0.75)' : 'rgba(251, 191, 36, 0.65)'}`,
                                            opacity: op,
                                        }}
                                    />
                                );
                            })}

                        {/* Vòng Halo 3D Bullet-Time & Tia Scanline quét qua đồ đạc đang đóng băng trên không (F276 - F322) */}
                        {rawFrame >= 276 && rawFrame <= 322 && (() => {
                            const btEnv =
                                scRamp(rawFrame, 276, 8, SC_EASE.snappy) *
                                (1 - scRamp(rawFrame, 312, 10, SC_EASE.smooth));
                            const scanY = scMix(-360 * s, 160 * s, scRamp(rawFrame, 278, 34, SC_EASE.smooth));
                            return (
                                <>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: -420 * s,
                                            top: -210 * s,
                                            width: 840 * s,
                                            height: 420 * s,
                                            borderRadius: '50%',
                                            border: `${2.5 * s}px dashed rgba(56, 189, 248, ${(0.65 * btEnv).toFixed(3)})`,
                                            boxShadow: `0 0 ${32 * s}px rgba(56, 189, 248, ${(0.35 * btEnv).toFixed(3)})`,
                                            transform: `rotateX(68deg) rotateZ(${(rawFrame - 276) * 2.8}deg)`,
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: -460 * s,
                                            top: scanY,
                                            width: 920 * s,
                                            height: 3 * s,
                                            background:
                                                'linear-gradient(90deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.92) 50%, rgba(56,189,248,0) 100%)',
                                            boxShadow: `0 0 ${18 * s}px rgba(56, 189, 248, 0.85)`,
                                            opacity: btEnv,
                                        }}
                                    />
                                </>
                            );
                        })()}
                    </div>
                )}

                {/* 🌪️ 6.7. CƠN GIÓ "BỈ ỔI" LƯỚT QUANH FULL MÀN HÌNH (100% DYNAMIC VECTOR SVG STREAMERS) */}
                <DynamicWindStreamers frame={frame} fps={fps} />

                {/* 7. BẬC THANG PODIUM HỒNG BÊN TRÁI & TÁN ĐỒI XANH */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: leftPodiumSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.leftPodiumHills.x + leftPodiumOffsetX + implode31P * 260 * s}px, ${BASE_OFFSETS.leftPodiumHills.y + implodeY}px, ${z3d(-40)}px) scale(${implodeScale}) rotateZ(${implodeRotZ}deg)`,
                            filter: 'drop-shadow(0 12px 18px rgba(15, 23, 42, 0.12))',
                        }}
                    />
                )}

                {/* 8. CÂY DỪA XANH LỚN BÊN TRÁI */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: greenPalmSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.greenPalm.x + implode31P * 220 * s}px, ${BASE_OFFSETS.greenPalm.y + implodeY}px, ${z3d(-25)}px) scale(${greenPalmScale * implodeScale}) rotate(${greenPalmSway + implodeRotZ}deg)`,
                            transformOrigin: '25% 95%',
                            filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.14))',
                        }}
                    />
                )}

                {/* 9. CÂY DỪA HỒNG BÊN PHẢI (Trước mặt trời) */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: pinkPalmSpring * oldDioramaFade,
                            transform: `translate3d(${-implode31P * 220 * s}px, ${implodeY}px, ${z3d(-30)}px) scale(${pinkPalmScale * implodeScale}) rotate(${pinkPalmSway - implodeRotZ}deg)`,
                            transformOrigin: '80% 95%',
                            filter: 'drop-shadow(0 12px 18px rgba(15, 23, 42, 0.12))',
                        }}
                    />
                )}

                {/* 10. BẬC THANG XOẮN ỐC BÊN PHẢI */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: rightPodiumSpring * oldDioramaFade,
                            transform: `translate3d(${rightPodiumOffsetX - implode31P * 260 * s}px, ${implodeY}px, ${z3d(-20)}px) scale(${implodeScale}) rotateZ(${-implodeRotZ}deg)`,
                            filter: 'drop-shadow(0 14px 20px rgba(15, 23, 42, 0.13))',
                        }}
                    />
                )}

                {/* 11. VÒNG CUNG NGHỆ THUẬT / CÁNH CHIM HỒNG (Điểm xuyết trên cầu thang phải) */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: pinkArcSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.pinkArcBird.x - implode31P * 200 * s}px, ${BASE_OFFSETS.pinkArcBird.y + implodeY}px, ${z3d(-15)}px) scale(${pinkArcSpring * implodeScale})`,
                            filter: 'drop-shadow(0 8px 14px rgba(15, 23, 42, 0.14))',
                        }}
                    />
                )}

                {/* 12. ĐĨA THẢM TRÒN XANH PASTEL (Podium trung tâm - BÓNG SẮC NÉT CHUẨN PAPER-CUT) */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: carpetSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.bluePodiumCarpet.x}px, ${BASE_OFFSETS.bluePodiumCarpet.y + implodeY * 0.5}px, ${z3d(20)}px) scale(${carpetScale * implodeScale}) rotateZ(${implodeRotZ}deg)`,
                            transformOrigin: 'center center',
                            filter: 'drop-shadow(0 3px 3px rgba(15, 23, 42, 0.40)) drop-shadow(0 6px 12px rgba(15, 23, 42, 0.22))',
                        }}
                    />
                )}

                {/* 13. ĐỤN CÁT TRẮNG XẾP LỚP TIỀN CẢNH BÊN TRÁI */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: leftDuneSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.leftDune.x + implode31P * 180 * s}px, ${BASE_OFFSETS.leftDune.y + leftDuneRise}px, ${z3d(95)}px) scale(${implodeScale})`,
                            filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.12))',
                        }}
                    />
                )}

                {/* 14. ĐỤN CÁT TRẮNG XẾP LỚP TIỀN CẢNH BÊN PHẢI */}
                {oldDioramaFade > 0.001 && (
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
                            opacity: rightDuneSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.rightDune.x - implode31P * 180 * s}px, ${BASE_OFFSETS.rightDune.y + rightDuneRise}px, ${z3d(95)}px) scale(${implodeScale})`,
                            filter: 'drop-shadow(0 14px 22px rgba(15, 23, 42, 0.12))',
                        }}
                    />
                )}

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
                            opacity: coupleEntrance * shockedCoupleFade,
                            transform: `translate3d(${BASE_OFFSETS.couple.x + coupleOffsetX}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + glideFloat + idleBreathing}px, ${z3d(55)}px) scale(${coupleScale * implodeScale}) rotate(${subtleSway}deg)`,
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
                            opacity: coupleEntrance * shockedCoupleFade,
                            transform: `translate3d(${BASE_OFFSETS.couple.x + coupleOffsetX + shockShiver}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + shockJumpY + shockBreath}px, ${z3d(55)}px) scale(${coupleScale * implodeScale})`,
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
                {shockedCoupleFade > 0.001 && (
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
                            opacity: coupleEntrance * shockedCoupleFade,
                            transform: !isShocked
                                ? `translate3d(${BASE_OFFSETS.couple.x + coupleOffsetX}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + glideFloat + idleBreathing}px, ${z3d(60)}px) scale(${coupleScale * implodeScale}) rotate(${subtleSway}deg)`
                                : `translate3d(${BASE_OFFSETS.couple.x + coupleOffsetX + shockShiver}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + shockJumpY + shockBreath}px, ${z3d(60)}px) scale(${coupleScale * implodeScale}) rotateZ(${implodeRotZ}deg)`,
                            transformOrigin: 'center bottom',
                            transformStyle: 'preserve-3d',
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
                                    transform: `translate(-50%, -50%) translate3d(0px, ${hatFlyY}px, ${z3d(125)}px) rotate(${hatFlyTilt}deg) scale(${hatFlyScale})`,
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
                                    transform: `translate(-50%, -50%) translate3d(0px, ${guyHatFlyY}px, ${z3d(145)}px) rotate(${guyHatFlyTilt}deg) scale(${guyHatFlyScale})`,
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
                )}

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
                            transform: `translate3d(${BASE_OFFSETS.couple.x + coupleOffsetX + shockShiver}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + shockJumpY + shockBreath}px, ${z3d(135)}px) scale(${coupleScale})`,
                            transformOrigin: 'center bottom',
                            transformStyle: 'preserve-3d',
                            translate: '83.5px -16.5px',
                        }}
                    >
                        {/* 🌀 HỆ THỐNG VÒNG XOÁY GIÓ HOẠT HÌNH & HẠT BỤI GIÓ 3D (CARTOON WIND SWIRLS) */}
                        {(() => {
                            const windSwirlSpring = spring({
                                frame: frame - 258,
                                fps,
                                config: { damping: 15, stiffness: 90 },
                            });
                            let windSwirlOpacity = interpolate(windSwirlSpring, [0, 0.3, 1], [0, 0.95, 0.9]);
                            if (frame >= 464) {
                                const swirlFade = interpolate(frame, [464, 488], [1, 0], {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                });
                                windSwirlOpacity *= swirlFade;
                            }
                            if (windSwirlOpacity <= 0.001) return null;
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
                                        rotation={(frame - 258) * 4.2}
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
                                        rotation={-(frame - 258) * 4.8}
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
                                        rotation={(frame - 258) * 3.8}
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
                                        rotation={(frame - 258) * 5.6}
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
                                        rotation={-(frame - 258) * 6.2}
                                        opacity={windSwirlOpacity * 0.85}
                                        scale={windSwirlScale * 0.95}
                                        reverse
                                        zIndex={140}
                                    />

                                    {/* Hạt bụi gió lấp lánh (Wind Sparkle Dust Particles) bay lơ lửng */}
                                    {WIND_DUST_PARTICLES.map((dust, dIdx) => {
                                        const launchFrame = 258 + (dIdx % 3) * 2;
                                        const dustSpring = spring({
                                            frame: frame - launchFrame,
                                            fps,
                                            config: { damping: 13, stiffness: 95 },
                                        });
                                        let dustOpacity = interpolate(dustSpring, [0, 0.3, 1], [0, 0.95, 0.85]);
                                        if (frame >= 464) {
                                            dustOpacity *= interpolate(frame, [464, 490], [1, 0], {
                                                extrapolateLeft: 'clamp',
                                                extrapolateRight: 'clamp',
                                            });
                                        }
                                        if (dustOpacity <= 0.001) return null;
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
                            const launchFrame = 258 + prop.stagger;
                            const launchSpring = spring({
                                frame: frame - launchFrame,
                                fps,
                                config: { damping: 14, stiffness: 85, mass: 0.7 },
                            });
                            const initialOpacity = interpolate(launchSpring, [0, 0.25, 1], [0, 1, 1]);
                            const initialScale = interpolate(launchSpring, [0, 0.7, 1], [0.35, 1.1, 1.0]);

                            // Bắn từ đáy vali (17.5%, 78.0%) lên trạm lơ lửng trên nắp vali
                            const currentLeft = interpolate(launchSpring, [0, 1], [17.5, prop.targetX]);
                            const currentTop = interpolate(launchSpring, [0, 1], [78.0, prop.targetY]);

                            // Chuyển động lơ lửng hữu cơ (Organic Floating Hover Wave)
                            const floatTime = Math.max(0, frame - launchFrame - 15);
                            const hoverY = Math.sin(floatTime * prop.speed + prop.phase) * prop.ampY;
                            const hoverX = Math.cos(floatTime * prop.speed * 0.7 + prop.phase) * prop.ampX;
                            const hoverRot =
                                prop.baseRotate + Math.sin(floatTime * prop.speed + prop.phase) * prop.ampRot;

                            // 🧳 GIAI ĐOẠN THU HỒI HÀNH LÝ VÀO VALI (SHOT 3.3: F464 - F494)
                            let finalLeft = currentLeft;
                            let finalTop = currentTop;
                            let finalScale = initialScale;
                            let finalOpacity = initialOpacity;
                            let finalRot = hoverRot;

                            if (frame >= 464) {
                                const recallStart = 464 + prop.stagger * 1.2;
                                const recallSpring = spring({
                                    frame: frame - recallStart,
                                    fps,
                                    config: { damping: 15, stiffness: 110, mass: 0.8 },
                                });
                                finalLeft = interpolate(recallSpring, [0, 1], [prop.targetX, 17.5]);
                                finalTop = interpolate(recallSpring, [0, 1], [prop.targetY, 78.0]);
                                finalScale = interpolate(recallSpring, [0, 0.4, 1], [initialScale, initialScale * 0.7, 0]);
                                finalOpacity = interpolate(recallSpring, [0, 0.6, 1], [initialOpacity, initialOpacity * 0.7, 0]);
                                finalRot = interpolate(recallSpring, [0, 1], [hoverRot, hoverRot + 180]);
                            }

                            if (finalOpacity <= 0.001) return null;

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        position: 'absolute',
                                        left: `${finalLeft}%`,
                                        top: `${finalTop}%`,
                                        width: `${prop.width}%`,
                                        aspectRatio: '1 / 1',
                                        opacity: finalOpacity,
                                        transform: `translate(-50%, -50%) translate3d(${hoverX}px, ${hoverY}px, ${prop.z}px) rotate(${finalRot}deg) scale(${finalScale})`,
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
                {oldDioramaFade > 0.001 && (
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
                            opacity: chairSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.beachChair.x - implode31P * 140 * s}px, ${BASE_OFFSETS.beachChair.y + chairDrop + implodeY * 0.5}px, ${z3d(85)}px) scale(${implodeScale}) rotateZ(${-implodeRotZ}deg)`,
                            filter: 'drop-shadow(-3px 5px 7px rgba(15, 23, 42, 0.45)) drop-shadow(-6px 18px 25px rgba(15, 23, 42, 0.28))',
                            translate: '44.7px 15.9px',
                        }}
                    />
                )}

                {/* 17. CHÚ PHAO VỊT VÀNG 3D (BỊ LỐC XOÁY CUỐN BAY, XOAY TÍT 360° ĐỈNH CAO & ĐÁP CẠNH GHẾ XANH) */}
                {oldDioramaFade > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_1.rubberDuck.left,
                            top: STAGING_SHOT_3_1.rubberDuck.top,
                            width: STAGING_SHOT_3_1.rubberDuck.width,
                            aspectRatio: '1 / 1',
                            zIndex: isDuckSwirled && frame < 304 ? 31 : STAGING_SHOT_3_1.rubberDuck.zIndex,
                            pointerEvents: 'none',
                            opacity: duckSpring * oldDioramaFade,
                            transform: `translate3d(${BASE_OFFSETS.rubberDuck.x + duckFlightX}px, ${BASE_OFFSETS.rubberDuck.y + duckDrop + duckFlightY + duckAlignOffsetY}px, ${duckFlightZ + z3d(115)}px) scale(${implodeScale}) rotate(${duckRotation}deg)`,
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
                                            opacity: s.opacity * oldDioramaFade,
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
                )}

                {/* ========================================================================= */}
                {/* 🌟 CẢNH 3.3 & CẢNH 3.4/3.5: CÁC MẢNH GHÉP TẬP HỢP VÀ THIẾT KẾ ĐÍCH ĐẾN 🌟 */}
                {/* ========================================================================= */}

                {/* 🏝️ 18. HÒN ĐẢO DỪA GIẤY & DẢI BIỂN XANH HẬU CẢNH */}
                {islandOpacity > 0.001 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_4.island.src)}
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.island.left,
                            top: STAGING_SHOT_3_4.island.top,
                            width: STAGING_SHOT_3_4.island.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_4.island.zIndex,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 12px 25px rgba(15, 23, 42, 0.08))',
                            translate: '-469.9px -230.3px',
                            transform: `translate3d(${islandSlideX}px, 0px, ${z3d(-55)}px) rotate(${pushLeftRot * 0.55}deg)`,
                            transformOrigin: '50% 80%',
                            opacity: islandOpacity,
                        }}
                    />
                )}

                {/* 🌊 19. DẢI SÓNG NƯỚC BIỂN NHIỀU LỚP HẬU CẢNH */}
                {seaWaterOpacity > 0.001 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_4.seaWater.src)}
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.seaWater.left,
                            top: STAGING_SHOT_3_4.seaWater.top,
                            width: STAGING_SHOT_3_4.seaWater.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_4.seaWater.zIndex,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 8px 20px rgba(14, 165, 233, 0.12))',
                            translate: '-385.2px -551px',
                            transform: `translate3d(0px, ${seaWaterRiseY + seaWaterWave}px, ${z3d(-80)}px)`,
                            opacity: seaWaterOpacity,
                        }}
                    />
                )}

                {/* 💫 20. HỆ THỐNG NỔ SÓNG XUNG KÍCH & 18 MẢNH ĐA GIÁC "IMPACT-BURST-KIT" KHI KHIÊN ĐẬP SẬP (F490 - F542) */}
                {rawFrame >= 490 && rawFrame <= 542 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: '46.6%',
                            top: '58.5%',
                            width: 0,
                            height: 0,
                            zIndex: 14,
                            pointerEvents: 'none',
                            transform: `translate3d(0px, 0px, ${z3d(72)}px)`,
                        }}
                    >
                        {/* Nhịp chớp nhân trắng-hồng thu hút ánh nhìn ngay điểm giao thoa (F490 - F501, CardFlockTumble.tsx) */}
                        {rawFrame >= 490 && rawFrame <= 501 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: -650 * s,
                                    top: -650 * s,
                                    width: 1300 * s,
                                    height: 1300 * s,
                                    borderRadius: '50%',
                                    background:
                                        'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(237,3,124,0.75) 32%, rgba(237,3,124,0) 70%)',
                                    transform: `scale(${scMix(0.3, 1.45, scRamp(rawFrame, 490, 11, SC_EASE.snappy))})`,
                                    opacity:
                                        rawFrame < 497
                                            ? scRamp(rawFrame, 490, 6)
                                            : 1 - scRamp(rawFrame, 497, 4),
                                    mixBlendMode: 'screen',
                                }}
                            />
                        )}

                        {/* 2 Vòng sóng xung kích đồng tâm (Dual Shockwave Rings - ImpactBurstKit.tsx) */}
                        {isShieldPulseActive &&
                            [0, 4].map((d, k) => {
                                const p = scRamp(rawFrame, HIT_34 + d, 32, SC_EASE.snappy);
                                const radW = scMix(120 * s, (k === 0 ? 1480 : 1080) * s, p);
                                const radH = radW * 0.32;
                                const op = (1 - p) * (k === 0 ? 0.92 : 0.65) * (rawFrame >= HIT_34 + d ? 1 : 0);
                                return (
                                    <div
                                        key={`shield_ring_${k}`}
                                        style={{
                                            position: 'absolute',
                                            left: -radW / 2,
                                            top: -radH / 2,
                                            width: radW,
                                            height: radH,
                                            borderRadius: '50%',
                                            border: `${(k === 0 ? 5 : 3) * s}px solid ${k === 0 ? '#E11D48' : '#FBBF24'}`,
                                            boxShadow: `0 0 ${28 * s}px ${k === 0 ? '#E11D48' : '#FBBF24'}, inset 0 0 ${16 * s}px ${k === 0 ? '#E11D48' : '#FBBF24'}`,
                                            opacity: op,
                                            filter: `blur(${1.5 * s}px)`,
                                        }}
                                    />
                                );
                            })}

                        {/* 18 Mảnh đa giác năng lượng bắn tỏa tròn từ tâm cú đập (Polygon Shards - ImpactBurstKit.tsx) */}
                        {rawFrame >= HIT_34 && rawFrame <= HIT_34 + 28 && (
                            <svg
                                width={1600 * s}
                                height={1200 * s}
                                style={{
                                    position: 'absolute',
                                    left: -800 * s,
                                    top: -680 * s,
                                    overflow: 'visible',
                                }}
                            >
                                {IMPACT_SHARDS_34.map((sh, idx) => {
                                    const p = scRamp(rawFrame, HIT_34 + (idx % 3), 22, SC_EASE.snappy);
                                    const r = scMix(sh.r0 * s, sh.r1 * s, p);
                                    const len = sh.len * s * (1 - p * 0.65);
                                    const w = sh.w * s * (1 - p * 0.45);
                                    const cx = 800 * s + Math.cos(sh.a) * r;
                                    const cy = 620 * s + Math.sin(sh.a) * r * 0.68;
                                    const deg = (sh.a * 180) / Math.PI;
                                    const op = (1 - p) * (rawFrame >= HIT_34 + (idx % 3) ? 0.92 : 0);
                                    return (
                                        <polygon
                                            key={`shard_${idx}`}
                                            points={`${-len * 0.5},0 0,${-w * 0.5} ${len * 0.5},0 0,${w * 0.5}`}
                                            transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${deg.toFixed(1)})`}
                                            fill={sh.isGold ? '#FBBF24' : '#E11D48'}
                                            opacity={op}
                                        />
                                    );
                                })}
                            </svg>
                        )}
                    </div>
                )}

                {/* 🛡️ 21. KHUNG KHIÊN HỒNG NEON TRUNG TÂM (ĐẬP SẬP IMPACT-BURST-KIT TỪ SÁT ỐNG KÍNH) */}
                {shieldOpacity > 0.001 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_4.centralArch.src)}
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.centralArch.left,
                            top: STAGING_SHOT_3_4.centralArch.top,
                            width: STAGING_SHOT_3_4.centralArch.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_4.centralArch.zIndex,
                            pointerEvents: 'none',
                            filter: `${shieldDofBlur > 0.2 ? `blur(${shieldDofBlur.toFixed(1)}px) ` : ''}drop-shadow(0 18px 45px rgba(225, 29, 72, 0.18)) drop-shadow(0 8px 20px rgba(15, 23, 42, 0.10))`,
                            translate: '55.9px -6.1px',
                            transform: `translate3d(0px, ${shieldDropY}px, ${z3d(65)}px) scale(${shieldSlamScaleX}, ${shieldSlamScaleY})`,
                            transformOrigin: '50% 88%',
                            opacity: shieldOpacity,
                        }}
                    />
                )}

                {/* 🏷️ 22. TIÊU ĐỀ 'BẢO HIỂM DU LỊCH' BÊN TRONG ĐỈNH KHUNG KHIÊN */}
                {archTextOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.archText.left,
                            top: STAGING_SHOT_3_4.archText.top,
                            zIndex: STAGING_SHOT_3_4.archText.zIndex,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4 * s,
                            pointerEvents: 'none',
                            transform: `translate3d(0px, ${archTextY}px, ${z3d(55)}px)`,
                            opacity: archTextOpacity,
                        }}
                    >
                        <span
                            style={{
                                color: '#1E293B',
                                fontSize: 44 * s,
                                fontWeight: 900,
                                lineHeight: 1.12,
                                letterSpacing: -0.5 * s,
                            }}
                        >
                            Bảo hiểm
                        </span>
                        <span
                            style={{
                                color: '#E11D48',
                                fontSize: 44 * s,
                                fontWeight: 900,
                                lineHeight: 1.12,
                                letterSpacing: -0.5 * s,
                            }}
                        >
                            du lịch
                        </span>
                    </div>
                )}

                {/* 🛡️ 23. HUY HIỆU KHIÊN VALI HỒNG + TICK XANH Ở VAI PHẢI KHUNG */}
                {badgeOpacity > 0.001 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_4.suitcaseBadge.src)}
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.suitcaseBadge.left,
                            top: STAGING_SHOT_3_4.suitcaseBadge.top,
                            width: STAGING_SHOT_3_4.suitcaseBadge.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_4.suitcaseBadge.zIndex,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 14px 30px rgba(225, 29, 72, 0.28))',
                            translate: '43.6px -1px',
                            transform: `translate3d(${pushRightX * 0.55}px, 0px, ${z3d(95)}px) scale(${badgeScale}) rotate(${pushRightRot * 0.85}deg)`,
                            transformOrigin: 'center center',
                            opacity: badgeOpacity,
                        }}
                    />
                )}

                {/* 🏖️ 24. THẢM CÁT TRẮNG / BỤC TRUNG TÂM (KÈM BÓNG SILHOUETTE ÔM KHÍT ĐÁY THẢM & HẠT MÈ TĂNG NÉT) */}
                {sandRugOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.sandRug.left,
                            top: STAGING_SHOT_3_4.sandRug.top,
                            width: STAGING_SHOT_3_4.sandRug.width,
                            zIndex: 8, // Nằm trên nước biển (6), đảo dừa (7) và dưới khung khiên (10)
                            pointerEvents: 'none',
                            translate: '-27.3px -248.6px',
                            transform: `translate3d(0px, 0px, ${z3d(20)}px) scale(${sandRugScale})`,
                            transformOrigin: '50% 50%',
                            opacity: sandRugOpacity,
                        }}
                    >
                        {/* 🌟 1. Viền bóng ôm sát mép dưới theo toàn bộ đường lượn sóng của thảm cát (Contact Bevel Shadow) */}
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.sandRug.src)}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: 'auto',
                                transform: `translateY(${3.5 * s}px)`,
                                filter: `brightness(0) blur(${1.8 * s}px)`,
                                opacity: 0.55,
                                pointerEvents: 'none',
                            }}
                        />

                        {/* 🌟 2. Lớp đệm bóng giấy papercraft lan tỏa phía dưới (Ambient Depth Shadow) */}
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.sandRug.src)}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: 'auto',
                                transform: `translateY(${7.0 * s}px)`,
                                filter: `brightness(0) blur(${5.0 * s}px)`,
                                opacity: 0.35,
                                pointerEvents: 'none',
                            }}
                        />

                        {/* 🌟 3. Tấm thảm cát chính (Tăng nét & tương phản bề mặt) */}
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.sandRug.src)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'contrast(1.15) brightness(0.96) drop-shadow(0 8px 16px rgba(15, 23, 42, 0.10)) drop-shadow(0 22px 42px rgba(15, 23, 42, 0.12))',
                            }}
                        />

                        {/* 🌟 4. Lớp chấm đen sắc nét nổi bật (Crisp Black Stipple Dots) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                                maskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                                WebkitMaskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                                maskSize: '100% 100%',
                                WebkitMaskSize: '100% 100%',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='dotsDark_flow'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.08  0 0 0 0 0.06  0 0 0 0 0.04  0 0 0 11 -4.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dotsDark_flow)'/%3E%3C/svg%3E")`,
                                backgroundSize: `${48 * s}px ${48 * s}px`,
                                backgroundRepeat: 'repeat',
                                mixBlendMode: 'multiply',
                                opacity: 0.5,
                            }}
                        />

                        {/* 🌟 5. Lớp chấm trắng tinh thể nổi bật đan xen (Crisp White Stipple Dots) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                pointerEvents: 'none',
                                maskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                                WebkitMaskImage: `url(${staticFile(STAGING_SHOT_3_4.sandRug.src)})`,
                                maskSize: '100% 100%',
                                WebkitMaskSize: '100% 100%',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='dotsLight_flow'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='2' stitchTiles='stitch' seed='99'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 11 -4.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23dotsLight_flow)'/%3E%3C/svg%3E")`,
                                backgroundSize: `${48 * s}px ${48 * s}px`,
                                backgroundRepeat: 'repeat',
                                mixBlendMode: 'screen',
                                opacity: 0.75,
                            }}
                        />
                    </div>
                )}

                {/* 🌊 25. THẢM NƯỚC XANH GỢN SÓNG DƯỚI CHÂN VỊT */}
                {duckPuddleOpacity > 0.001 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_4.duckPuddle.src)}
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.duckPuddle.left,
                            top: STAGING_SHOT_3_4.duckPuddle.top,
                            width: STAGING_SHOT_3_4.duckPuddle.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_4.duckPuddle.zIndex,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 4px 10px rgba(15, 23, 42, 0.14)) drop-shadow(0 10px 22px rgba(14, 165, 233, 0.22))',
                            translate: '154.6px -94.1px',
                            transform: `translate3d(${pushRightX * 0.85}px, 0px, ${z3d(65)}px) scale(${duckPuddleScale})`,
                            transformOrigin: 'center center',
                            opacity: duckPuddleOpacity,
                        }}
                    />
                )}

                {/* 🪑 26. GHẾ NGHỈ BÃI BIỂN SỌC HỒNG TRẮNG (BÓNG CHÂN TIẾP ĐẤT & BÓNG GẦM GHẾ + WAVEFRONT PUSH) */}
                {pinkChairOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.beachChair.left,
                            top: STAGING_SHOT_3_4.beachChair.top,
                            width: STAGING_SHOT_3_4.beachChair.width,
                            zIndex: STAGING_SHOT_3_4.beachChair.zIndex,
                            pointerEvents: 'none',
                            translate: '-46.2px -189.1px',
                            scale: 1.022,
                            transform: `translate3d(${pushLeftX}px, ${pinkChairDropY}px, ${z3d(90)}px) rotate(${pushLeftRot}deg)`,
                            transformOrigin: '50% 85%',
                            opacity: pinkChairOpacity,
                        }}
                    >
                        {/* 4 Điểm bóng tiếp xúc chân gỗ trên mặt cát (Leg Contact Dots) */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '35.0%',
                                top: '66.5%',
                                width: '25.0%',
                                height: '50.0%',
                                transform: 'translate(-35%, -50%) rotate(78deg) skewY(-20deg) skewX(-30deg)',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(71, 73, 78, 0.7) 0%, rgba(38, 41, 51, 0.20) 40%, rgba(38, 43, 56, 0) 90%)',
                                filter: `blur(${12 * s}px)`,
                            }}
                        />
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.beachChair.src)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'drop-shadow(-4px 8px 18px rgba(15, 23, 42, 0.22))',
                            }}
                        />
                    </div>
                )}

                {/* 🐥 27. CHÚ VỊT VÀNG PHAO BƠI SỌC HỒNG TRẮNG (BÓNG TIẾP XÚC MẶT NƯỚC + WAVEFRONT PUSH) */}
                {duckOpacity34 > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.rubberDuck.left,
                            top: STAGING_SHOT_3_4.rubberDuck.top,
                            width: STAGING_SHOT_3_4.rubberDuck.width,
                            zIndex: STAGING_SHOT_3_4.rubberDuck.zIndex,
                            pointerEvents: 'none',
                            translate: '143.9px -107.8px',
                            scale: 0.958,
                            transform: `translate3d(${pushRightX}px, ${duckDropY34 + duckBob34}px, ${z3d(105)}px) rotate(${pushRightRot * 1.15}deg)`,
                            transformOrigin: '50% 85%',
                            opacity: duckOpacity34,
                        }}
                    >
                        {/* Bóng tiếp xúc đáy phao tròn đè lên thảm nước (Contact Float Shadow) */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '52.0%',
                                top: '90.0%',
                                width: '52.0%',
                                height: '14.0%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(19, 23, 26, 0.58) 0%, rgba(7, 12, 22, 0.28) 45%, rgba(15, 23, 42, 0) 75%)',
                                filter: `blur(${1 * s}px)`,
                            }}
                        />
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.rubberDuck.src)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'drop-shadow(0 8px 18px rgba(15, 23, 42, 0.20))',
                                translate: '5.4px 1.5px',
                            }}
                        />
                    </div>
                )}

                {/* 🧳 28. CHIẾC VALI HỒNG ĐỨNG CẠNH CHÂN BẠN NAM (BÓNG TIẾP ĐẤT BÁNH XE & ĐÁY VALI + WAVEFRONT PUSH) */}
                {pinkSuitcaseOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.pinkSuitcase.left,
                            top: STAGING_SHOT_3_4.pinkSuitcase.top,
                            width: STAGING_SHOT_3_4.pinkSuitcase.width,
                            zIndex: STAGING_SHOT_3_4.pinkSuitcase.zIndex,
                            pointerEvents: 'none',
                            translate: '72.6px -54.2px',
                            transform: `translate3d(${pushLeftX * 0.55}px, ${pinkSuitcaseDropY}px, ${z3d(95)}px) rotate(${pushLeftRot * 0.65}deg)`,
                            transformOrigin: '50% 88%',
                            opacity: pinkSuitcaseOpacity,
                        }}
                    >
                        {/* Bóng tiếp đất dưới 2 bánh xe và mép đáy vali hồng (Suitcase Ground Shadow) */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '49.5%',
                                top: '87.8%',
                                width: '25.0%',
                                height: '6.2%',
                                transform: 'translate(-55%, -50%) rotate(2deg) skewY(2deg) skewX(42deg)',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.32) 45%, rgba(15, 23, 42, 0) 75%)',
                                filter: `blur(${3.5 * s}px)`,
                            }}
                        />
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.pinkSuitcase.src)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'drop-shadow(0 14px 28px rgba(15, 23, 42, 0.24))',
                                translate: '3px -24.4px',
                            }}
                        />
                    </div>
                )}

                {/* 🙋‍♂️ 29. BẠN NAM GIƠ VÉ MÁY BAY, ĐEO MÁY ẢNH & KÍNH RÂM (ĐẬP SẬP IMPACT-BURST-KIT + SQUASH & REBOUND) */}
                {heroCoupleOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.boyHero.left,
                            top: STAGING_SHOT_3_4.boyHero.top,
                            width: STAGING_SHOT_3_4.boyHero.width,
                            zIndex: STAGING_SHOT_3_4.boyHero.zIndex,
                            pointerEvents: 'none',
                            translate: '79.1px -39.8px',
                            transform: `translate3d(0px, ${heroCoupleDropY + heroIdleBreath}px, ${z3d(80)}px) scale(${heroSlamScaleX}, ${heroSlamScaleY})`,
                            transformOrigin: '50% 92%',
                            filter: shieldDofBlur > 0.2 ? `blur(${(shieldDofBlur * 0.85).toFixed(1)}px)` : undefined,
                            opacity: heroCoupleOpacity,
                        }}
                    >
                        {/* Bóng nhân vật nam xiên trục Z loang về sau bên phải */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '43.0%',
                                top: '85.5%',
                                width: '38.0%',
                                height: '22.0%',
                                transform: 'translate(-35%, -50%) rotate(72deg) skewY(-20deg) skewX(-40deg)',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(35, 38, 46, 0.7) 0%, rgba(38, 41, 51, 0.20) 30%, rgba(38, 43, 56, 0) 90%)',
                                filter: `blur(${15 * s}px)`,
                            }}
                        />

                        {/* 👞 Viền bóng chỉ ôm khít mặt dưới đế giày Bạn Nam (Exact Sole Bottom Rim Only) */}
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.boyHero.src)}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: 'auto',
                                transform: `translateY(${1.8 * s}px)`,
                                filter: `brightness(0) blur(${1.1 * s}px)`,
                                opacity: 0.42,
                                clipPath: 'polygon(0% 95.2%, 100% 95.2%, 100% 100%, 0% 100%)',
                                pointerEvents: 'none',
                            }}
                        />

                        <Img
                            src={staticFile(STAGING_SHOT_3_4.boyHero.src)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'drop-shadow(0 16px 32px rgba(15, 23, 42, 0.20))',
                            }}
                        />
                    </div>
                )}

                {/* 🙋‍♀️ 30. BẠN NỮ TAY GIỮ NÓN CÓI NƠ HỒNG, TÚI XÁCH HỒNG (ĐẬP SẬP IMPACT-BURST-KIT + SQUASH & REBOUND) */}
                {heroCoupleOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.girlHero.left,
                            top: STAGING_SHOT_3_4.girlHero.top,
                            width: STAGING_SHOT_3_4.girlHero.width,
                            zIndex: STAGING_SHOT_3_4.girlHero.zIndex,
                            pointerEvents: 'none',
                            translate: '90.8px -68.5px',
                            transform: `translate3d(0px, ${heroCoupleDropY + heroGirlIdleBreath}px, ${z3d(78)}px) scale(${heroSlamScaleX}, ${heroSlamScaleY})`,
                            transformOrigin: '50% 92%',
                            filter: shieldDofBlur > 0.2 ? `blur(${(shieldDofBlur * 0.85).toFixed(1)}px)` : undefined,
                            opacity: heroCoupleOpacity,
                        }}
                    >
                        {/* Bóng nhân vật nữ */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '35.0%',
                                top: '89.5%',
                                width: '48.0%',
                                height: '29.0%',
                                transform: 'translate(-35%, -50%) rotate(62deg) skewY(-20deg) skewX(-40deg)',
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(33, 35, 40, 0.7) 0%, rgba(38, 41, 51, 0.20) 40%, rgba(38, 43, 56, 0) 90%)',
                                filter: `blur(${15 * s}px)`,
                            }}
                        />

                        {/* 👠 Viền bóng chỉ ôm khít mặt dưới đế giày Bạn Nữ (Exact Sole Bottom Rim Only) */}
                        <Img
                            src={staticFile(STAGING_SHOT_3_4.girlHero.src)}
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: 'auto',
                                transform: `translateY(${1.8 * s}px)`,
                                filter: `brightness(0) blur(${1.1 * s}px)`,
                                opacity: 0.42,
                                clipPath: 'polygon(0% 94.8%, 100% 94.8%, 100% 100%, 0% 100%)',
                                pointerEvents: 'none',
                            }}
                        />

                        <Img
                            src={staticFile(STAGING_SHOT_3_4.girlHero.src)}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'drop-shadow(0 16px 32px rgba(15, 23, 42, 0.20))',
                            }}
                        />
                    </div>
                )}

                {/* 🏹 31. MŨI TÊN HỒNG UỐN CONG CHỈ SANG SMARTPHONE */}
                {arrowOpacity > 0.001 && (
                    <Img
                        src={staticFile(STAGING_SHOT_3_4.pinkArrow.src)}
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.pinkArrow.left,
                            top: STAGING_SHOT_3_4.pinkArrow.top,
                            width: STAGING_SHOT_3_4.pinkArrow.width,
                            height: 'auto',
                            zIndex: STAGING_SHOT_3_4.pinkArrow.zIndex,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 4px 12px rgba(225, 29, 72, 0.25))',
                            translate: '58.4px -136.1px',
                            transform: `translate3d(0px, 0px, ${z3d(110)}px) scale(${arrowScale})`,
                            transformOrigin: 'left center',
                            opacity: arrowOpacity,
                        }}
                    />
                )}

                {/* ✍️ 32. TIÊU ĐỀ CHÍNH BÊN TRÁI: Sẵn sàng / cho hành trình (KANADA 3D SNAP) */}
                {headingOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: STAGING_SHOT_3_4.headingLeft.left,
                            top: STAGING_SHOT_3_4.headingLeft.top,
                            zIndex: STAGING_SHOT_3_4.headingLeft.zIndex,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6 * s,
                            transform: `perspective(${600 * s}px) translate3d(${headingX}px, 0px, ${z3d(115)}px) rotateY(${headingRotY}deg) rotateZ(${headingRotZ}deg) scale(${headingScale})`,
                            transformOrigin: 'left center',
                            opacity: headingOpacity,
                        }}
                    >
                        <span
                            style={{
                                color: '#E11D48',
                                fontSize: 78 * s,
                                fontWeight: 900,
                                lineHeight: 1.12,
                                letterSpacing: -1 * s,
                                filter: `drop-shadow(0 ${3 * s}px ${8 * s}px rgba(225, 29, 72, 0.16))`,
                            }}
                        >
                            Sẵn sàng
                        </span>
                        <span
                            style={{
                                color: '#1E293B',
                                fontSize: 74 * s,
                                fontWeight: 900,
                                lineHeight: 1.12,
                                letterSpacing: -1 * s,
                            }}
                        >
                            cho hành trình
                        </span>
                    </div>
                )}

                {/* ⚡ 32.5. HIỆU ỨNG VỆT XÉ GIÓ & 36 TIA FOCUS ANIME CHO CÚ VẨY MẮT CÁ SMARTPHONE (KanadaPerspectiveSnap.tsx, F594 - F626) */}
                {rawFrame >= 594 && rawFrame <= 628 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: STAGING_SHOT_3_4.smartphone.zIndex - 1,
                            pointerEvents: 'none',
                        }}
                    >
                        {/* 7 Vệt tốc độ xé gió ngang (Speed Streaks: F594 - F612) */}
                        {rawFrame <= 612 &&
                            KANADA_STREAKS.map((st, idx) => {
                                const u = scRamp(rawFrame, 594 + st.delay, st.dur, SC_EASE.snappy);
                                const xPct = scMix(110, 62, u);
                                const op = Math.sin(u * Math.PI) * 0.78;
                                if (op <= 0.01) return null;
                                return (
                                    <div
                                        key={`streak_${idx}`}
                                        style={{
                                            position: 'absolute',
                                            left: `${xPct}%`,
                                            top: `${st.y}%`,
                                            width: `${(st.x1 - st.x0) * 0.28}%`,
                                            height: st.h * s,
                                            borderRadius: st.h * s,
                                            background:
                                                idx % 2 === 0
                                                    ? 'linear-gradient(90deg, rgba(225,29,72,0.88), rgba(225,29,72,0))'
                                                    : 'linear-gradient(90deg, rgba(251,191,36,0.85), rgba(251,191,36,0))',
                                            opacity: op,
                                        }}
                                    />
                                );
                            })}

                        {/* 36 Tia Focus Anime bung quanh tâm Smartphone ngay khoảnh khắc SNAP_35 = 612 (F610 - F626) */}
                        {rawFrame >= 610 && rawFrame <= 626 && (() => {
                            const fEnv =
                                scRamp(rawFrame, 610, 3, SC_EASE.snappy) *
                                (1 - scRamp(rawFrame, 614, 12, SC_EASE.smooth));
                            const cx = width * 0.79;
                            const cy = height * 0.54;
                            const outer = 1100 * s;
                            return (
                                <svg
                                    width={width}
                                    height={height}
                                    style={{ position: 'absolute', inset: 0, opacity: fEnv * 0.65 }}
                                >
                                    {KANADA_FOCUS_RAYS.map((ray, rIdx) => {
                                        const rIn = ray.inner * s;
                                        const x0 = cx + Math.cos(ray.a) * rIn;
                                        const y0 = cy + Math.sin(ray.a) * rIn;
                                        const x1 = cx + Math.cos(ray.a - ray.w) * outer;
                                        const y1 = cy + Math.sin(ray.a - ray.w) * outer;
                                        const x2 = cx + Math.cos(ray.a + ray.w) * outer;
                                        const y2 = cy + Math.sin(ray.a + ray.w) * outer;
                                        return (
                                            <polygon
                                                key={`focus_${rIdx}`}
                                                points={`${x0.toFixed(1)},${y0.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
                                                fill={rIdx % 3 === 0 ? '#FBBF24' : '#E11D48'}
                                            />
                                        );
                                    })}
                                </svg>
                            );
                        })()}
                    </div>
                )}

                {/* 📱 33. SMARTPHONE MOCKUP ỨNG DỤNG TỐP BẢO HIỂM (KANADA PERSPECTIVE SNAP + RADIAL RIPPLE UI) */}
                {phoneOpacity > 0.001 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: STAGING_SHOT_3_4.smartphone.zIndex,
                            pointerEvents: 'none',
                            transform: `translateZ(${(rawFrame >= 594 && rawFrame <= 630 ? 240 * s : 0) + z3d(145)}px)`,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                left: STAGING_SHOT_3_4.smartphone.left,
                                top: STAGING_SHOT_3_4.smartphone.top,
                                width: STAGING_SHOT_3_4.smartphone.width,
                                aspectRatio: '1 / 1.76',
                                pointerEvents: 'none',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 44 * s,
                                border: `${10 * s}px solid #FFFFFF`,
                                boxShadow: `0 ${30 * s}px ${70 * s}px -${15 * s}px rgba(15, 23, 42, 0.25), 0 0 0 ${1.5 * s}px rgba(226, 232, 240, 0.85)`,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                padding: `${24 * s}px ${20 * s}px`,
                                boxSizing: 'border-box',
                                gap: 16 * s,
                                transform: `perspective(${scMix(260 * s, 1800 * s, phoneMoveP)}px) translate3d(${phoneSlideX}px, ${phoneSlideY}px, 0px) rotate3d(0.45, -1, 0.12, ${phoneTwistDeg}deg) rotateY(${phoneSnapRotY}deg) rotateZ(${phoneSnapRotZ}deg) scale(${phoneKanadaScale})`,
                                transformOrigin: '50% 50%',
                                opacity: phoneOpacity,
                            }}
                        >
                        {/* Header thanh điều hướng: Logo + Menu */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: 4 * s,
                            }}
                        >
                            <div style={{ fontSize: 24 * s, fontWeight: 900, letterSpacing: -0.5 * s }}>
                                <span style={{ color: '#E11D48' }}>TOP</span>
                                <span style={{ color: '#0F172A' }}>baohiem</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4 * s,
                                    cursor: 'pointer',
                                }}
                            >
                                <div
                                    style={{ width: 22 * s, height: 2.5 * s, backgroundColor: '#64748B', borderRadius: 2 * s }}
                                />
                                <div
                                    style={{ width: 22 * s, height: 2.5 * s, backgroundColor: '#64748B', borderRadius: 2 * s }}
                                />
                                <div
                                    style={{ width: 22 * s, height: 2.5 * s, backgroundColor: '#64748B', borderRadius: 2 * s }}
                                />
                            </div>
                        </div>

                        {/* Card sản phẩm nổi bật: Bảo hiểm Du lịch (Radial Ripple Entrance) */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 22 * s,
                                border: `${1.5 * s}px solid #F1F5F9`,
                                boxShadow: `0 ${4 * s}px ${16 * s}px rgba(15, 23, 42, 0.04)`,
                                position: 'relative',
                                height: '43%',
                                overflow: 'hidden',
                                transform: `scale(${interpolate(phoneCard1Spring, [0, 1], [0.86, 1.0])})`,
                                opacity: interpolate(phoneCard1Spring, [0, 0.25, 1], [0, 1, 1]),
                            }}
                        >
                            {/* Minh họa gói du lịch: đóng vai trò như background bao trùm toàn bộ cụm card trên */}
                            <Img
                                src={staticFile('assets/elements/screen3/3.4/logo_vali_dulich.png')}
                                style={{
                                    position: 'absolute',
                                    left: '7.5%',
                                    top: '9%',
                                    width: '115%',
                                    height: 'auto',
                                    display: 'block',
                                    pointerEvents: 'none',
                                    filter: `drop-shadow(0 ${2 * s}px ${8 * s}px rgba(15, 23, 42, 0.06))`,
                                }}
                            />

                            {/* Cột chữ bên trái card */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 15 * s,
                                    top: 22 * s,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3 * s,
                                    zIndex: 2,
                                }}
                            >
                                <span
                                    style={{
                                        color: '#1E293B',
                                        fontSize: 23 * s,
                                        fontWeight: 800,
                                        lineHeight: 1.15,
                                        letterSpacing: -0.4 * s,
                                    }}
                                >
                                    Bảo hiểm
                                </span>
                                <span
                                    style={{
                                        color: '#E11D48',
                                        fontSize: 23 * s,
                                        fontWeight: 800,
                                        lineHeight: 1.15,
                                        letterSpacing: -0.4 * s,
                                    }}
                                >
                                    Du lịch
                                </span>
                            </div>
                        </div>

                        {/* Khối Skeleton & thông tin mô phỏng gói bảo hiểm (Card dưới) */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 20 * s,
                                border: `${1.5 * s}px solid #F1F5F9`,
                                boxShadow: `0 ${4 * s}px ${14 * s}px rgba(15, 23, 42, 0.03)`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 16 * s,
                                padding: `${16 * s}px ${16 * s}px`,
                                height: '26%',
                                justifyContent: 'flex-start',
                                transform: `scale(${interpolate(phoneCard2Spring, [0, 1], [0.88, 1.0])})`,
                                opacity: interpolate(phoneCard2Spring, [0, 0.25, 1], [0, 1, 1]),
                            }}
                        >
                            {/* Thanh hồng placeholder */}
                            <div
                                style={{
                                    width: '50%',
                                    height: 18 * s,
                                    borderRadius: 9 * s,
                                    backgroundColor: '#FCE7F3',
                                }}
                            />

                            {/* Các dòng gạch ngang xám mô phỏng text specs */}
                            <div
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 * s }}
                            >
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 * s }}>
                                    <div
                                        style={{
                                            width: '95%',
                                            height: 13 * s,
                                            borderRadius: 7 * s,
                                            backgroundColor: '#E2E8F0',
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: '65%',
                                            height: 13 * s,
                                            borderRadius: 7 * s,
                                            backgroundColor: '#E2E8F0',
                                        }}
                                    />
                                </div>

                                {/* Ô vuông thumbnail placeholder */}
                                <div
                                    style={{
                                        width: 68 * s,
                                        height: 56 * s,
                                        borderRadius: 12 * s,
                                        backgroundColor: '#F8FAFC',
                                        border: `${1.5 * s}px solid #E2E8F0`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Nút CTA lớn nổi bật: CHỌN GÓI (kèm hiệu ứng nhịp đập & sóng Radial Ripple) */}
                        <div
                            style={{
                                position: 'relative',
                                marginTop: 'auto',
                                backgroundColor: '#E11D48',
                                borderRadius: 14 * s,
                                padding: `${14 * s}px ${20 * s}px`,
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: 20 * s,
                                fontWeight: 900,
                                letterSpacing: 1.2 * s,
                                boxShadow: `0 ${6 * s}px ${20 * s + ctaGlow}px rgba(225, 29, 72, ${0.35 + ctaBump * 2})`,
                                transform: `scale(${interpolate(phoneCtaEntranceSpring, [0, 1], [0.85, 1.0]) * (1 + ctaBump)})`,
                                opacity: interpolate(phoneCtaEntranceSpring, [0, 0.25, 1], [0, 1, 1]),
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                            }}
                        >
                            {isCtaPulsing && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: -6 * s,
                                        borderRadius: 18 * s,
                                        border: `${2.5 * s}px solid #E11D48`,
                                        transform: `scale(${scMix(1.0, 1.38, ctaPulseP)}, ${scMix(1.0, 1.85, ctaPulseP)})`,
                                        opacity: (1 - ctaPulseP) * 0.85,
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}
                            CHỌN GÓI
                        </div>
                    </div>
                </div>
                )}
            </div>

            {/* 🚪 LỚP ÁNH SÁNG PORTAL-WIPE KẾT NỐI MƯỢT MÀ SANG CẢNH 4 (F822 - F840, PortalWipeV2.tsx) */}
            {rawFrame >= 822 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 75% 55%, #FFFFFF 0%, ${colors.brandPinkSoft} 45%, ${colors.bgLight} 100%)`,
                        opacity: scRamp(rawFrame, 822, 18, SC_EASE.smooth),
                        zIndex: 9999,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
};
