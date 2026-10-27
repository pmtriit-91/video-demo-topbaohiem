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

    const finalCamScale = camIntroScale * camAmbientPush;
    const finalCamY = camIntroTilt;

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

    // Luồng lốc xoáy giấy 3D (Wind Vortex) rơi từ máy bay xuống vali (F320 - F360)
    const isVortexActive = frame >= 320 && frame <= 360;
    const vortexProgress = interpolate(frame, [320, 360], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Điểm xuất phát từ máy bay (top ~12%, left ~52%), xoáy rơi thẳng xuống vali bạn nam (top ~58%, left ~49%)
    const vortexTop = interpolate(vortexProgress, [0, 0.7, 1], [11, 42, 57]);
    const vortexLeft = interpolate(vortexProgress, [0, 0.7, 1], [52, 50, 48.5]);
    const vortexScale = interpolate(vortexProgress, [0, 0.6, 1], [0.25, 0.9, 1.15]);
    const vortexRotate = interpolate(vortexProgress, [0, 1], [0, 720]); // Xoay 2 vòng xoáy lốc
    const vortexOpacity = interpolate(vortexProgress, [0, 0.2, 0.85, 1], [0, 1, 0.95, 0.9]);

    // ==========================================
    // ☀️ 3. MẶT TRỜI & TẦNG MÂY GIẤY (LIVING SKY)
    // ==========================================
    // Mặt trời đã hiện diện sẵn, tỏa sáng & xoay chậm thư thái
    const sunEntrance = interpolate(frame, [0, 20], [0.85, 1.0], {
        extrapolateRight: 'clamp',
    });
    const sunScale = 1 + Math.sin(frame * 0.04) * 0.015;
    const sunRotate = frame * 0.07;

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

    // Sau khi dừng chân vững vàng (Frame 135+), nhịp thở đại dương thư thái
    const idleBreathing = frame >= 135 ? Math.sin((frame - 135) * 0.04) * 1.5 : 0;
    const subtleSway = frame >= 135 ? Math.sin((frame - 135) * 0.03) * 0.35 : 0;

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
                    transform: `scale(${finalCamScale}) translateY(${finalCamY}px)`,
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
                        opacity: sunEntrance,
                        transform: `scale(${sunScale}) rotate(${sunRotate}deg)`,
                        transformOrigin: 'center center',
                        translate: '53px -25px',
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
                            translate: '-245.5px -224.8px'
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

                {/* 15. CẶP ĐÔI DU LỊCH KÉO VALI HỒNG (CINEMATIC GENTLE GLIDE + CANVA HERO SHADOW) */}
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
                        opacity: coupleEntrance,
                        transform: `translate(${BASE_OFFSETS.couple.x + coupleOffsetX}px, ${BASE_OFFSETS.couple.y + coupleOffsetY + glideFloat + idleBreathing}px) scale(${coupleScale}) rotate(${subtleSway}deg)`,
                        transformOrigin: 'center bottom',
                        filter: 'drop-shadow(0 4px 6px rgba(15, 23, 42, 0.45)) drop-shadow(-4px 16px 24px rgba(15, 23, 42, 0.30)) drop-shadow(-8px 32px 48px rgba(15, 23, 42, 0.22))',
                    }}
                />

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
                    }}
                />

                {/* 17. CHÚ PHAO VỊT VÀNG 3D DỄ THƯƠNG (DEEP WATER CONTACT SHADOW) */}
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
                        opacity: duckSpring,
                        transform: `translate(${BASE_OFFSETS.rubberDuck.x}px, ${BASE_OFFSETS.rubberDuck.y + duckDrop + duckBob}px) rotate(${duckRock}deg)`,
                        transformOrigin: 'center bottom',
                        filter: 'drop-shadow(-3px 6px 8px rgba(15, 23, 42, 0.55)) drop-shadow(-6px 18px 26px rgba(15, 23, 42, 0.32))',
                    }}
                />
            </div>
        </div>
    );
};
