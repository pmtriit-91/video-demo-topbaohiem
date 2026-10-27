import React from 'react';
import { useVideoConfig, staticFile, Img } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';

/**
 * GIAI ĐOẠN 1: SƯỜN BỐ CỤC TĨNH (STATIC STAGING BLUEPRINT) CHO SHOT 3.1
 * Tỷ lệ tọa độ (Left, Top, Width, Height, Z-Index) đã được kiểm toán & đối soát
 * toán học 1:1 chuẩn xác với bức ảnh gốc `full_anh_3.1.png` (6000 x 3375).
 *
 * Toàn bộ 16 lớp phần tử Paper-Cut độc lập được định vị tuyệt đối theo % khung hình,
 * tự động co giãn sắc nét trên cả 1080p, 2K và 4K.
 * Tạm thời KHÔNG chạy animation chuyển động để Bạn trực tiếp ngắm & duyệt bố cục.
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
    // 6. Bậc thang podium hồng bên trái + đồi xanh (Hậu cảnh mép trái)
    leftPodiumHills: {
        src: 'assets/elements/screen3/3.1/bat_thang_hong_left.png',
        left: '0.17%',
        top: '35.64%',
        width: '35.48%',
        zIndex: 10,
    },
    // 7. Cây dừa xanh lớn (Nghiêng từ bờ trái vươn tán sang trung tâm)
    greenPalm: {
        src: 'assets/elements/screen3/3.1/cay_dua_xanh.png',
        left: '9.93%',
        top: '5.24%',
        width: '25.33%',
        zIndex: 12,
    },
    // 8. Cây dừa hồng thanh mảnh (Vươn tán che chở góc phải trước mặt trời)
    pinkPalm: {
        src: 'assets/elements/screen3/3.1/cay_dua_hong.png',
        left: '69.23%',
        top: '13.75%',
        width: '19.82%',
        zIndex: 11,
    },
    // 9. Bậc thang podium hình trụ tròn xoắn ốc bên phải + bụi cây ngọc
    rightPodiumStairs: {
        src: 'assets/elements/screen3/3.1/bat_thang_hong_right.png',
        left: '72.83%',
        top: '35.17%',
        width: '27.08%',
        zIndex: 13,
    },
    // 10. Điểm xuyết cánh hoa/vòng cung hồng nghệ thuật trên bậc thang phải
    pinkArcBird: {
        src: 'assets/elements/screen3/3.1/chim_do.png',
        left: '78.43%',
        top: '54.99%',
        width: '16.45%',
        zIndex: 14,
    },
    // 11. Đĩa thảm tròn đồng tâm màu xanh pastel (Sân khấu trung tâm cặp đôi đứng lên)
    bluePodiumCarpet: {
        src: 'assets/elements/screen3/3.1/tham_xanh_2.png',
        left: '23.00%',
        top: '81.50%',
        width: '58.00%',
        height: '13.50%',
        zIndex: 15,
    },
    // 12. Đụn cát giấy xếp lớp tiền cảnh bên trái
    leftDune: {
        src: 'assets/elements/screen3/3.1/dun_cat_left.png',
        left: '0.00%',
        top: '64.53%',
        width: '30.72%',
        zIndex: 18,
    },
    // 13. Đụn cát giấy xếp lớp tiền cảnh bên phải
    rightDune: {
        src: 'assets/elements/screen3/3.1/dun_cat_right.png',
        left: '78.53%',
        top: '78.93%',
        width: '35.47%',
        zIndex: 18,
    },
    // 14. Cặp đôi thanh lịch kéo vali hồng (Hero trung tâm khung hình)
    couple: {
        src: 'assets/elements/screen3/3.1/couple.png',
        left: '8.83%',
        top: '16.41%',
        width: '75.47%',
        zIndex: 25,
    },
    // 15. Ghế nghỉ bãi biển sọc trắng xanh thanh lịch
    beachChair: {
        src: 'assets/elements/screen3/3.1/ghe_xanh.png',
        left: '72.85%',
        top: '66.61%',
        width: '17.33%',
        zIndex: 26,
    },
    // 16. Chú phao vịt vàng 3D siêu dễ thương (Mép sóng bên phải)
    rubberDuck: {
        src: 'assets/elements/screen3/3.1/vit.png',
        left: '67.83%',
        top: '76.00%',
        width: '10.63%',
        zIndex: 28,
    },
};

export const Scene3_TravelAdventure: React.FC = () => {
    const { width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

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
            {/* 1. LỚP NỀN BIỂN VÀ BÃI CÁT PAPER-CUT (16:9 bao phủ toàn khung) */}
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

            {/* 2. MẶT TRỜI GIẤY NHIỀU TIA (Góc trên bên phải) */}
            <Img
                src={staticFile(STAGING_SHOT_3_1.sun.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_1.sun.left,
                    top: STAGING_SHOT_3_1.sun.top,
                    width: STAGING_SHOT_3_1.sun.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_1.sun.zIndex,
                    pointerEvents: 'none',
                }}
            />

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
                }}
            />

            {/* 6. BẬC THANG PODIUM HỒNG BÊN TRÁI & TÁN ĐỒI XANH */}
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
                    translate: '-6.5px 46.2px',
                }}
            />

            {/* 7. CÂY DỪA XANH LỚN BÊN TRÁI */}
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
                    translate: '0.9px 48.5px',
                }}
            />

            {/* 8. CÂY DỪA HỒNG BÊN PHẢI (Trước mặt trời) */}
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
                }}
            />

            {/* 9. BẬC THANG XOẮN ỐC BÊN PHẢI */}
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
                }}
            />

            {/* 10. VÒNG CUNG NGHỆ THUẬT / CÁNH CHIM HỒNG (Điểm xuyết trên cầu thang phải) */}
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
                    translate: '-458.5px -320.7px',
                }}
            />

            {/* 11. ĐĨA THẢM TRÒN XANH PASTEL (Podium trung tâm) */}
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
                    translate: '133.6px 2.9px',
                }}
            />

            {/* 12. ĐỤN CÁT TRẮNG XẾP LỚP TIỀN CẢNH BÊN TRÁI */}
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
                    translate: '0px -25.2px',
                }}
            />

            {/* 13. ĐỤN CÁT TRẮNG XẾP LỚP TIỀN CẢNH BÊN PHẢI */}
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
                    translate: '-537.6px -483.9px',
                }}
            />

            {/* 14. CẶP ĐÔI DU LỊCH KÉO VALI HỒNG (Tâm điểm Hero) */}
            <Img
                src={staticFile(STAGING_SHOT_3_1.couple.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_1.couple.left,
                    top: STAGING_SHOT_3_1.couple.top,
                    width: STAGING_SHOT_3_1.couple.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_1.couple.zIndex,
                    pointerEvents: 'none',
                    translate: '203.5px -13.8px',
                }}
            />

            {/* 15. GHẾ NGHỈ BÃI BIỂN SỌC XANH TRẮNG */}
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
                    translate: '-38.2px -58.9px',
                }}
            />

            {/* 16. CHÚ PHAO VỊT VÀNG 3D DỄ THƯƠNG */}
            <Img
                src={staticFile(STAGING_SHOT_3_1.rubberDuck.src)}
                style={{
                    position: 'absolute',
                    left: STAGING_SHOT_3_1.rubberDuck.left,
                    top: STAGING_SHOT_3_1.rubberDuck.top,
                    width: STAGING_SHOT_3_1.rubberDuck.width,
                    height: 'auto',
                    zIndex: STAGING_SHOT_3_1.rubberDuck.zIndex,
                    pointerEvents: 'none',
                    translate: '-91.8px -5px',
                }}
            />
        </div>
    );
};
