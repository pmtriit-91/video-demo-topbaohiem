import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, staticFile, Img, spring, Easing } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';
import { VortexSwirl3D } from '../../3d/VortexSwirl3D';

export const Scene2_TopBaoHiemShowcase: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    // Nhịp bồng bềnh nhẹ nhàng tự nhiên (Floating micro-motion)
    const floatY = Math.sin(frame * 0.05) * 6;
    const floatAltY = Math.cos(frame * 0.04) * 5;

    // ==============================================================
    // HIỆU ỨNG DẢI SÓNG GIẤY XANH MINT Ở ĐÁY (ĐỒNG BỘ CHUẨN FORM CẢNH 1 & CANVA)
    // ==============================================================
    // Nhịp dập dờn vi mô điều hòa (Harmonic undulation)
    const waveFloatY = Math.sin(frame * 0.035) * 6;
    const waveLayer2FloatX = Math.cos(frame * 0.03) * 16;

    const waveL1_left = Math.sin(frame * 0.045) * 10;
    const waveL1_mid = Math.sin(frame * 0.04 + 1.3) * 12;
    const waveL1_right = Math.cos(frame * 0.042 + 0.6) * 10;

    const waveL2_left = Math.sin(frame * 0.038 + 1.8) * 8;
    const waveL2_mid = Math.sin(frame * 0.044 + 2.7) * 10;
    const waveL2_right = Math.cos(frame * 0.036 + 1.9) * 8;

    // Tọa độ động Layer 1 (Tiền cảnh - nâng đỡ bàn tay, MacBook & chân iPhone)
    const l1_p0_y = 710 + waveL1_left;
    const l1_c1_y = 725 + waveL1_left * 0.8;
    const l1_c2_y = 775 + waveL1_mid * 0.7;
    const l1_p1_y = 790 + waveL1_mid;

    const l1_c3_y = 830 + waveL1_mid * 0.8;
    const l1_c4_y = 855 + waveL1_right * 0.7;
    const l1_p2_y = 840 + waveL1_right;

    const l1_c5_y = 810 + waveL1_right * 0.8;
    const l1_c6_y = 680 + waveL1_right * 0.6;
    const l1_p3_y = 580 + waveL1_right * 0.5;

    const pathWaveLayer1 = `M 0, ${l1_p0_y.toFixed(1)} C 500, ${l1_c1_y.toFixed(1)} 900, ${l1_c2_y.toFixed(1)} 1300, ${l1_p1_y.toFixed(1)} C 1800, ${l1_c3_y.toFixed(1)} 2300, ${l1_c4_y.toFixed(1)} 2750, ${l1_p2_y.toFixed(1)} C 3200, ${l1_c5_y.toFixed(1)} 3550, ${l1_c6_y.toFixed(1)} 3840, ${l1_p3_y.toFixed(1)} L 3840, 960 L 0, 960 Z`;
    const crestLineLayer1 = `M 0, ${l1_p0_y.toFixed(1)} C 500, ${l1_c1_y.toFixed(1)} 900, ${l1_c2_y.toFixed(1)} 1300, ${l1_p1_y.toFixed(1)} C 1800, ${l1_c3_y.toFixed(1)} 2300, ${l1_c4_y.toFixed(1)} 2750, ${l1_p2_y.toFixed(1)} C 3200, ${l1_c5_y.toFixed(1)} 3550, ${l1_c6_y.toFixed(1)} 3840, ${l1_p3_y.toFixed(1)}`;

    // Tọa độ động Layer 2 (Hậu cảnh - nhô cao tạo chiều sâu Origami 3D)
    const l2_p0_y = 665 + waveL2_left;
    const l2_c1_y = 680 + waveL2_left * 0.8;
    const l2_c2_y = 735 + waveL2_mid * 0.7;
    const l2_p1_y = 750 + waveL2_mid;

    const l2_c3_y = 790 + waveL2_mid * 0.8;
    const l2_c4_y = 815 + waveL2_right * 0.7;
    const l2_p2_y = 800 + waveL2_right;

    const l2_c5_y = 760 + waveL2_right * 0.8;
    const l2_c6_y = 630 + waveL2_right * 0.6;
    const l2_p3_y = 530 + waveL2_right * 0.5;

    const pathWaveLayer2 = `M 0, ${l2_p0_y.toFixed(1)} C 500, ${l2_c1_y.toFixed(1)} 900, ${l2_c2_y.toFixed(1)} 1300, ${l2_p1_y.toFixed(1)} C 1800, ${l2_c3_y.toFixed(1)} 2300, ${l2_c4_y.toFixed(1)} 2750, ${l2_p2_y.toFixed(1)} C 3200, ${l2_c5_y.toFixed(1)} 3550, ${l2_c6_y.toFixed(1)} 3840, ${l2_p3_y.toFixed(1)} L 3840, 960 L 0, 960 Z`;

    // ==============================================================
    // HỆ THỐNG VIRTUAL CAMERA RIG 2.5D (VIDEO-SHOTCRAFT STANDARDS)
    // ==============================================================
    // Task 1.1: Khởi tạo Camera Rig với các trục chuẩn (Pitch, Yaw, Roll, Pan, Z-depth)
    // Thiết lập baseline trực diện để bảo toàn 100% tọa độ từng pixel của bố cục tĩnh đã căn chỉnh.
    const camPanX = 0;
    const camPanY = 0;
    const camPanZ = 0;
    const camPitch = 0; // rotateX (nghiêng chúc/ngửa)
    const camYaw = 0; // rotateY (xoay phối cảnh 3/4)
    const camRoll = 0; // rotateZ (nghiêng chân trời)
    const camScale = 1;

    // ==============================================================
    // TASK 1.2: DIỄN HOẠT CÚ BÚNG TAY SNAP! CỦA BÀN TAY ÁO HỒNG
    // ==============================================================
    // Giai đoạn 1: Lấy đà dồn lực (0 - 12f)
    // Giai đoạn 2: Búng nảy cực mạnh (12 - 20f)
    // Giai đoạn 3: Lò xo đàn hồi hồi quy (20 - 55f)
    // Giai đoạn 4: Thở vi mô điều hòa (55f+)
    let handSnapScale = 1;
    let handSnapRotate = 0;
    let handSnapY = 0;

    if (frame < 12) {
        // Lấy đà lùi nhẹ
        const p = frame / 12;
        handSnapScale = 1 - p * 0.02;
        handSnapRotate = -p * 1.5;
        handSnapY = p * 6;
    } else if (frame < 55) {
        // Lò xo đàn hồi sau cú Snap
        const t = (frame - 12) / 60;
        const decay = Math.exp(-t * 9);
        const oscillation = Math.sin(t * 32);
        handSnapScale = 1 + 0.05 * decay * oscillation;
        handSnapRotate = 2.5 * decay * Math.cos(t * 26);
        handSnapY = -12 * decay * Math.cos(t * 24);
    } else if (frame < 340) {
        // Nhịp thở bồng bềnh vi mô điều hòa
        handSnapY = Math.sin((frame - 55) * 0.04) * 4;
    } else if (frame < 352) {
        // Lấy đà dồn lực cú búng tay thứ 2 (F340 - F352)
        const p2 = (frame - 340) / 12;
        handSnapScale = 1 - p2 * 0.03;
        handSnapRotate = -p2 * 2.5;
        handSnapY = p2 * 7;
    } else if (frame < 372) {
        // Cú búng nảy dứt khoát tại F352 & DỪNG LẠI 1 NHỊP ĐỂ NGƯỜI XEM THẤY RÕ (F352 - F372, Hold 20 frames)
        const t2 = (frame - 352) / 60;
        const decay2 = Math.exp(-t2 * 10);
        const oscillation2 = Math.sin(t2 * 32);
        handSnapScale = 1 + 0.06 * decay2 * oscillation2;
        handSnapRotate = 3 * decay2 * Math.cos(t2 * 26);
        handSnapY = -14 * decay2 * Math.cos(t2 * 24);
    } else if (frame < 395) {
        // Sau nhịp dừng, bàn tay hạ êm khi vòng xoáy khởi động (F372 - F395)
        handSnapY = -2;
    } else {
        handSnapY = 0;
    }

    // Bàn tay áo hồng rút êm khỏi sân khấu sau nhịp dừng búng tay (F374 - F392)
    const handContainerOpacity = interpolate(frame, [374, 392], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const handContainerTranslateY = interpolate(frame, [374, 392], [0, 80], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Sóng xung kích hồng lan tỏa từ đầu ngón tay (Shockwave Ripple 1)
    const rippleProgress = interpolate(frame, [12, 40], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const rippleScale = interpolate(rippleProgress, [0, 1], [0.2, 2.4]);
    const rippleOpacity = interpolate(rippleProgress, [0, 0.2, 0.8, 1], [0, 0.8, 0.2, 0]);

    // Sóng xung kích hồng lần 2 (Shockwave Ripple 2 - F352 - F378)
    const ripple2Progress = interpolate(frame, [352, 378], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const ripple2Scale = interpolate(ripple2Progress, [0, 1], [0.2, 2.6]);
    const ripple2Opacity = interpolate(ripple2Progress, [0, 0.2, 0.8, 1], [0, 0.9, 0.25, 0]);

    // Tia sáng sao vàng phát quang (Sparkle Starburst 1)
    const starEntrance = interpolate(frame, [12, 18, 30], [0, 1.35, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const starRotation = interpolate(frame, [12, 120], [0, 360], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'extend',
    });
    const starOpacity = interpolate(frame, [10, 13], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Tia sáng sao vàng phát quang lần 2 (Sparkle Starburst 2 - F352 - F372)
    const star2Entrance = interpolate(frame, [352, 358, 370], [0, 1.4, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const star2Rotation = interpolate(frame, [352, 450], [0, 360], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'extend',
    });
    const star2Opacity = interpolate(frame, [350, 353, 370, 374], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 3 ngôi sao vệ tinh nhỏ bắn bung ra khi búng tay
    const miniStarDist = interpolate(frame, [12, 38], [0, 75], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const miniStarOpacity = interpolate(frame, [12, 20, 38], [0, 0.9, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // ==============================================================
    // TASK 1.3: DIỄN HOẠT BUNG XÒE 5 THẺ BÀI (DECK-DEAL FLYOUT)
    // ==============================================================
    // Vị trí gốc xuất phát từ đầu ngón tay búng tay (relative với container 5 thẻ)
    const cardOriginX = 40;
    const cardOriginY = 160;
    const cardOriginRotate = -18;

    const computeCardMotion = (
        startFrame: number,
        targetTop: number,
        targetLeft: number,
        targetRotate: number,
        arcHeight: number,
    ) => {
        if (frame < startFrame) {
            return {
                top: cardOriginY,
                left: cardOriginX,
                transform: `rotate(${cardOriginRotate}deg) scale(0.1)`,
                opacity: 0,
                pointerEvents: 'none' as const,
            };
        }

        const elapsed = frame - startFrame;
        const spr = spring({
            frame: elapsed,
            fps: 60,
            config: {
                damping: 14,
                stiffness: 90,
                mass: 0.85,
            },
        });

        // Tọa độ bay vòng cung Parabol
        const curX = interpolate(spr, [0, 1], [cardOriginX, targetLeft]);
        const arcProgress = Math.min(1, Math.max(0, spr));
        const arc = Math.sin(arcProgress * Math.PI) * arcHeight;
        const curY = interpolate(spr, [0, 1], [cardOriginY, targetTop]) + arc;

        // Góc xoay bung dần từ ngón tay tới góc cánh quạt định hình
        const curRotate = interpolate(spr, [0, 1], [cardOriginRotate, targetRotate]);

        // Độ nở phóng to đàn hồi
        const curScale = interpolate(spr, [0, 1], [0.25, 1]);

        // Độ mờ hiện dần
        const curOpacity = interpolate(elapsed, [0, 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });

        return {
            top: curY,
            left: curX,
            transform: `rotate(${curRotate}deg) scale(${curScale})`,
            opacity: curOpacity,
            pointerEvents: 'auto' as const,
        };
    };

    // Tính toán chuyển động cho 5 thẻ bài bảo hiểm (so le từ F26 đến F125)
    const card1Motion = computeCardMotion(26, -310, 100, -12, -50);
    const card2Motion = computeCardMotion(44, -355, 375, 0, -65);
    const card3Motion = computeCardMotion(62, -315, 655, 18, -50);
    const card4Motion = computeCardMotion(80, 35, 225, -4, -30);
    const card5Motion = computeCardMotion(98, 45, 545, 14, -30);

    // ==============================================================
    // TASK 1.4: DIỄN HOẠT NẢY LÒ XO BADGE "TÌM HIỂU DỄ DÀNG" & KÍNH LÚP 3D (POP-SPRING)
    // ==============================================================
    // Khởi đầu bật nảy ngay sau khi 5 thẻ bài an tọa (Frame 138 - ~2.3s)
    const badgeStartFrame = 138;
    const badgeElapsed = Math.max(0, frame - badgeStartFrame);

    let badgeScale = 0;
    let badgeTranslateY = 50;
    let badgeOpacity = 0;
    let badgeFloatY = 0;

    if (frame >= badgeStartFrame) {
        const badgeSpring = spring({
            frame: badgeElapsed,
            fps: 60,
            config: {
                damping: 13,
                stiffness: 95,
                mass: 0.85,
            },
        });
        badgeScale = interpolate(badgeSpring, [0, 1], [0.35, 1]);
        badgeTranslateY = interpolate(badgeSpring, [0, 1], [50, 0]);
        badgeOpacity = interpolate(badgeElapsed, [0, 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        // Nhịp thở bồng bềnh vi mô điều hòa sau khi đáp đất (từ frame 190+)
        if (frame > 190) {
            badgeFloatY = Math.sin((frame - 190) * 0.045) * 5;
        }
    }

    // Icon kính lúp 3D (kinh-lup.png) nảy với độ trễ nhẹ (stagger 8 frames)
    const lupStartFrame = 146;
    const lupElapsed = Math.max(0, frame - lupStartFrame);
    let lupScale = 0;
    let lupRotate = -18;

    if (frame >= lupStartFrame) {
        const lupSpring = spring({
            frame: lupElapsed,
            fps: 60,
            config: {
                damping: 12,
                stiffness: 105,
                mass: 0.75,
            },
        });
        lupScale = interpolate(lupSpring, [0, 1], [0.45, 1]);
        lupRotate = interpolate(lupSpring, [0, 1], [-18, 0]);
        // Độ lắc nghiêng 3D vi mô tự nhiên khi kính lúp ở trạng thái thở
        if (frame > 200) {
            lupRotate = Math.sin((frame - 200) * 0.04) * 2.5;
        }
    }

    // ==============================================================
    // TASK 2.1: DIỄN HOẠT DẢI SÓNG MINT DÂNG HỮU CƠ & THIẾT BỊ TRƯỢT VÀO
    // ĐỒNG BỘ CÙNG NHỊP VỚI BADGE "TÌM HIỂU DỄ DÀNG" (F138)
    // ==============================================================
    // 1. Nhịp sóng mint dâng hữu cơ (Wave Surge) đón thiết bị (F128 - F228)
    let waveSurgeY = 0;
    if (frame >= 128 && frame < 228) {
        const surgeProgress = (frame - 128) / 100;
        waveSurgeY = -Math.sin(surgeProgress * Math.PI) * 22;
    }

    // 2. Chiếc MacBook 3D trượt vào (F138 - F210, CÙNG NHỊP CHÍNH XÁC VỚI BADGE)
    const macStartFrame = 138;
    const macElapsed = Math.max(0, frame - macStartFrame);
    let macTranslateX = 200;
    let macTranslateY = 60;
    let macScale = 0.94;
    let macOpacity = 0;
    let macShadowScale = 0.3;
    let macShadowOpacity = 0;

    if (frame >= macStartFrame) {
        const macSpring = spring({
            frame: macElapsed,
            fps: 60,
            config: {
                damping: 18,
                stiffness: 75,
                mass: 1.1,
            },
        });
        macTranslateX = interpolate(macSpring, [0, 1], [200, 0]);
        macTranslateY = interpolate(macSpring, [0, 1], [60, 0]);
        macScale = interpolate(macSpring, [0, 1], [0.94, 1]);
        macOpacity = interpolate(macElapsed, [0, 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        macShadowScale = interpolate(macSpring, [0, 1], [0.35, 1]);
        macShadowOpacity = interpolate(macSpring, [0, 1], [0, 1]);
    }

    // 3. Chiếc iPhone 3D trượt vào (F150 - F225, trễ nhẹ 12 frames sau MacBook tạo lớp lang chiều sâu)
    const iphoneStartFrame = 150;
    const iphoneElapsed = Math.max(0, frame - iphoneStartFrame);
    let iphoneTranslateX = 160;
    let iphoneTranslateY = 75;
    let iphoneScale = 0.92;
    let iphoneOpacity = 0;
    let iphoneShadowScale = 0.3;
    let iphoneShadowOpacity = 0;

    if (frame >= iphoneStartFrame) {
        const iphoneSpring = spring({
            frame: iphoneElapsed,
            fps: 60,
            config: {
                damping: 17,
                stiffness: 80,
                mass: 1.05,
            },
        });
        iphoneTranslateX = interpolate(iphoneSpring, [0, 1], [160, 0]);
        iphoneTranslateY = interpolate(iphoneSpring, [0, 1], [75, 0]);
        iphoneScale = interpolate(iphoneSpring, [0, 1], [0.92, 1]);
        iphoneOpacity = interpolate(iphoneElapsed, [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        iphoneShadowScale = interpolate(iphoneSpring, [0, 1], [0.35, 1]);
        iphoneShadowOpacity = interpolate(iphoneSpring, [0, 1], [0, 1]);
    }

    // 4. Đám mây trắng 3D góc trên phải trôi êm vào tầm ngắm (F132 - F200)
    const cloudWhiteStartFrame = 132;
    const cloudWhiteElapsed = Math.max(0, frame - cloudWhiteStartFrame);
    let cloudWhiteTranslateY = -45;
    let cloudWhiteTranslateX = 35;
    let cloudWhiteOpacity = 0;

    if (frame >= cloudWhiteStartFrame) {
        const cloudSpring = spring({
            frame: cloudWhiteElapsed,
            fps: 60,
            config: {
                damping: 20,
                stiffness: 60,
                mass: 1.1,
            },
        });
        cloudWhiteTranslateY = interpolate(cloudSpring, [0, 1], [-45, 0]);
        cloudWhiteTranslateX = interpolate(cloudSpring, [0, 1], [35, 0]);
        cloudWhiteOpacity = interpolate(cloudWhiteElapsed, [0, 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
    }

    // 5. Mũi tên hồng uốn lượn xuất hiện mượt mà sau khi thiết bị đã an tọa vững chãi (F195 - F215)
    const arrowStartFrame = 195;
    const arrowOpacity = interpolate(frame, [arrowStartFrame, arrowStartFrame + 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // ==============================================================
    // TASK 3.1: DIỄN HOẠT CÚ TIẾP ĐẤT CHIẾC KHIÊN 3D HỒNG (IMPACT SETTLE)
    // ==============================================================
    // Khởi đầu rơi ngay sau khi iPhone đã trượt vào đứng vững (Frame 215 ~ 3.58s)
    const shieldStartFrame = 215;
    const shieldElapsed = Math.max(0, frame - shieldStartFrame);
    let shieldDropY = -280;
    let shieldScale = 1.18;
    let shieldOpacity = 0;
    let shieldShadowScale = 0.25;
    let shieldShadowOpacity = 0;

    if (frame >= shieldStartFrame) {
        const shieldSpring = spring({
            frame: shieldElapsed,
            fps: 60,
            config: {
                damping: 14,
                stiffness: 105,
                mass: 0.9,
            },
        });
        shieldDropY = interpolate(shieldSpring, [0, 1], [-280, 0]);
        shieldScale = interpolate(shieldSpring, [0, 1], [1.18, 1]);
        shieldOpacity = interpolate(shieldElapsed, [0, 5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        shieldShadowScale = interpolate(shieldSpring, [0, 1], [0.25, 1]);
        shieldShadowOpacity = interpolate(shieldSpring, [0, 1], [0, 1]);
    }

    // Xung phát quang ở dấu check trắng giữa khiên khi tiếp đất vững chãi (F238 - F260)
    const shieldTickPulse = interpolate(frame, [238, 246, 258], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // ==============================================================
    // TASK 3.2: VÒNG XOÁY TRUNG TÂM (CO VÀO TÂM & BUNG RA CÁC GÓC) (F372 - F415)
    // ==============================================================
    // GIAI ĐOẠN 1: Co xoắn ốc vào vòng xoáy trung tâm màn hình (Inward Swirl: F372 -> F396)
    const pullProgress = interpolate(frame, [372, 396], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.35, 0, 0.22, 1),
    });

    // GIAI ĐOẠN 2: Bùng nổ ly tâm bung văng ra 4 góc màn hình (Corner Burst: F396 -> F415)
    const burstProgress = interpolate(frame, [396, 415], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.12, 0.88, 0.3, 1),
    });
    const burstScale = Math.max(0, 1 - burstProgress * 1.25);
    const burstFade = interpolate(burstProgress, [0, 0.65, 1], [1, 0.35, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 1. CỤM 5 THẺ BÀI: Co vào tâm xoáy (F372-F396) -> Bung văng ra góc trên-trái & dưới-trái (F396-F415)
    const cardsPullX = pullProgress * 1350;
    const cardsPullY = pullProgress * 650;
    const cardsPullRotate = pullProgress * -260;
    const cardsPullScale = 1 - pullProgress * 0.72; // Co nhỏ về 0.28 khi chạm tâm
    const cardsBurstX = burstProgress * -1900;
    const cardsBurstY = burstProgress * -1100;
    const cardsBurstRotate = burstProgress * -360;

    // 2. BADGE KÍNH LÚP: Co vào tâm xoáy -> Bung văng lên đỉnh màn hình
    const badgePullX = pullProgress * 950;
    const badgePullY = pullProgress * -670;
    const badgePullRotate = pullProgress * 180;
    const badgePullScale = 1 - pullProgress * 0.8;
    const badgeBurstX = burstProgress * -700;
    const badgeBurstY = burstProgress * -1500;

    // 3. MŨI TÊN HỒNG: Tan biến hòa vào dòng xoáy
    const arrowVortexFade = interpolate(frame, [370, 386], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 4. CỤM PHẢI (IPHONE & KHIÊN 3D): Co vào tâm xoáy -> Bung văng ra 2 góc bên phải
    const rightPullX = pullProgress * -1350;
    const rightPullY = pullProgress * -250;
    const rightPullRotate = pullProgress * 140;
    const rightPullScale = 1 - pullProgress * 0.75;
    const rightBurstX = burstProgress * 1900;
    const rightBurstY = burstProgress * 1200;
    const rightBurstRotate = burstProgress * 220;

    // 5. ĐÁM MÂY TRẮNG: Co vào tâm -> Bung văng ra góc trên-phải
    const cloudPullX = pullProgress * -1060;
    const cloudPullY = pullProgress * 550;
    const cloudBurstX = burstProgress * 1800;
    const cloudBurstY = burstProgress * -1400;

    // 6. ĐÁM MÂY XANH MINT GÓC DƯỚI TRÁI: Co vào tâm xoáy (F372-F396) -> Bung văng ra góc dưới-trái (F396-F415)
    const mintCloudPullX = pullProgress * 1500;
    const mintCloudPullY = pullProgress * -850;
    const mintCloudBurstX = burstProgress * -1600;
    const mintCloudBurstY = burstProgress * 1200;

    // ==============================================================
    // NGOẠI TRỪ MACBOOK: MACBOOK KHÔNG BỊ HÚT VÀO XOÁY, MÀ TRƯỢT SANG TÂM TRỞ THÀNH TÂM BÃO TĨNH LẶNG!
    // ==============================================================
    // Chiếc MacBook cũ nghiêng 3D trượt nhẹ từ vị trí nghiêng về tâm sân khấu
    const oldMacSlideX = interpolate(frame, [372, 392], [0, -420], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const oldMacFade = interpolate(frame, [386, 396], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chiếc MacBook trực diện 90° xuất hiện tại tâm từ F386, an tọa vững chãi giữa bão xoáy
    const macFrontStart = 386;
    const macFrontElapsed = Math.max(0, frame - macFrontStart);
    let macFrontScale = 0.88;
    let macFrontTranslateY = 60;
    let macFrontOpacity = 0;
    let macFrontShadowScale = 0.35;
    let macFrontShadowOpacity = 0;

    if (frame >= macFrontStart) {
        const macFrontSpring = spring({
            frame: macFrontElapsed,
            fps: 60,
            config: {
                damping: 16,
                stiffness: 110,
                mass: 0.9,
            },
        });
        macFrontScale = interpolate(macFrontSpring, [0, 1], [0.88, 1]);
        macFrontTranslateY = interpolate(macFrontSpring, [0, 1], [60, 0]);
        macFrontOpacity = interpolate(macFrontElapsed, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        macFrontShadowScale = interpolate(macFrontSpring, [0, 1], [0.35, 1]);
        macFrontShadowOpacity = interpolate(macFrontSpring, [0, 1], [0, 0.25]);
    }

    // ==============================================================
    // TIỀN CHUYỂN CẢNH: NHỊP DỪNG TĨNH MACBOOK + 5 CHẶNG DỪNG TƯƠNG TÁC (INTERACTIVE STAGED TOUR)
    // ==============================================================
    // ==============================================================
    // 1. Độ hiển thị con trỏ chuột tương tác (hiện từ F485, mờ dần hoàn tất vai trò khi chạm Footer F1760 - F1790)
    const macCursorOpacity = interpolate(frame, [485, 505, 1760, 1790], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 2. Quỹ đạo con trỏ chuột:
    // Chặng 1 (Head, F485 – F690): Lướt Sức khoẻ -> Cháy nổ -> Du lịch
    // Chặng 2 (Quy trình mua 4 bước gọn gàng ~3.2s, F690 – F952): Lướt lần lượt Card 1 -> Card 2 -> Card 3 -> Card 4
    // Chặng 3 (Banner thông tin tinh gọn ~1.3s, F952 – F1095): Lướt Banner Cháy nổ -> Banner TNDS Xe máy
    // Chặng 4 (Vì sao chọn TOPbaohiem, F1095 – F1300): Lướt qua 4 cam kết cốt lõi (So sánh -> Tiết kiệm -> Quyền lợi -> Hỗ trợ)
    // Chặng 5 (Đối tác của chúng tôi, F1300 – F1440): Lướt dàn logo đối tác uy tín (Bảo Việt -> BIC/MIC -> PVI/Bảo Long)
    // Chặng 6 (Blog TopBaoHiem, F1440 – F1650): Lướt qua 3 bài viết cẩm nang kinh nghiệm mua bảo hiểm
    // Chặng 7 (Footer Chân trang, F1650 – F1790): Lướt xuống logo TOPbaohiem & hotline ở Footer
    const macCursorX = interpolate(
        frame,
        [
            // Chặng 1: Head (F485 - F690)
            485, 515, 545, 570, 600, 640, 665, 690,
            // Chặng 2: Quy trình mua (F690 - F952, dừng tĩnh 3.2s F760 - F952)
            725, 760, 795, 808, 845, 856, 895, 904, 952,
            // Chặng 3: Banner tĩnh (F952 - F1095, dừng tĩnh 1.3s F1015 - F1095)
            985, 1015, 1050, 1065, 1095,
            // Chặng 4: Vì sao chọn TOPbaohiem (F1095 - F1300, dừng tĩnh F1160 - F1300)
            1130, 1160, 1195, 1230, 1265, 1300,
            // Chặng 5: Đối tác (F1300 - F1440, dừng tĩnh F1360 - F1440 < 2.5s)
            1330, 1360, 1400, 1440,
            // Chặng 6: Blog (F1440 - F1650, dừng tĩnh F1510 - F1650)
            1475, 1510, 1550, 1600, 1650,
            // Chặng 7: Footer (F1650 - F1790, dừng tĩnh F1720 - F1790)
            1685, 1720, 1760, 1790,
        ],
        [
            // Chặng 1: Head
            1480, 800, 495, 780, 1070, 1070, 1686, 1200,
            // Chặng 2: Quy trình mua 4 card (X: 720 -> 1040 -> 1370 -> 1700)
            950, 720, 720, 1040, 1040, 1370, 1370, 1700, 1700,
            // Chặng 3: Banner 1 & Banner 2 (X: 820 -> 1380)
            1300, 820, 820, 1380, 1380,
            // Chặng 4: Vì sao chọn TOPbaohiem (X: 680 -> 1020 -> 1360 -> 1700)
            1100, 680, 1020, 1360, 1700, 1700,
            // Chặng 5: Đối tác (X: 950 -> 1200 -> 1450)
            1300, 950, 1200, 1450,
            // Chặng 6: Blog (X: 700 -> 1200 -> 1700)
            1200, 700, 1200, 1700, 1700,
            // Chặng 7: Footer (X: 1350 -> 1050)
            1350, 1050, 1050, 1050,
        ],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
    );
    const macCursorY = interpolate(
        frame,
        [
            // Chặng 1: Head (F485 - F690)
            485, 515, 545, 570, 600, 640, 665, 690,
            // Chặng 2: Quy trình mua (F690 - F952, dừng tĩnh 3.2s F760 - F952)
            725, 760, 795, 808, 845, 856, 895, 904, 952,
            // Chặng 3: Banner tĩnh (F952 - F1095, dừng tĩnh 1.3s F1015 - F1095)
            985, 1015, 1050, 1065, 1095,
            // Chặng 4: Vì sao chọn TOPbaohiem (F1095 - F1300, dừng tĩnh F1160 - F1300)
            1130, 1160, 1195, 1230, 1265, 1300,
            // Chặng 5: Đối tác (F1300 - F1440, dừng tĩnh F1360 - F1440 < 2.5s)
            1330, 1360, 1400, 1440,
            // Chặng 6: Blog (F1440 - F1650, dừng tĩnh F1510 - F1650)
            1475, 1510, 1550, 1600, 1650,
            // Chặng 7: Footer (F1650 - F1790, dừng tĩnh F1720 - F1790)
            1685, 1720, 1760, 1790,
        ],
        [
            // Chặng 1: Head
            520, 750, 1055, 1000, 1055, 1055, 1055, 850,
            // Chặng 2: Quy trình mua (nút bấm ở đáy Y: 1055)
            750, 1055, 1055, 1055, 1055, 1055, 1055, 1055, 1055,
            // Chặng 3: Banner (Y: 800)
            780, 800, 800, 800, 800,
            // Chặng 4: Vì sao (Y: 780)
            700, 780, 780, 780, 780, 780,
            // Chặng 5: Đối tác (Y: 820)
            720, 820, 820, 820,
            // Chặng 6: Blog (Y: 750)
            700, 750, 750, 750, 750,
            // Chặng 7: Footer (Y: 850)
            700, 850, 850, 850,
        ],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
    );

    // 3. Hiệu ứng Hover Card từng nhóm bảo hiểm trong Chặng 1 (Head):
    // Card 1: Sức khoẻ (F535 - F565)
    const card1Hover = interpolate(frame, [535, 545, 558, 568], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Card 2: Cháy nổ (F575 - F650) - Trọng tâm Hover Card chuẩn ảnh 1 người dùng
    const card2Hover = interpolate(frame, [575, 595, 638, 650], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Card 3: Du lịch (F652 - F685)
    const card3Hover = interpolate(frame, [652, 663, 676, 686], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 3b. Hiệu ứng Focus lần lượt 4 Card Quy trình mua trong Chặng 2 (F760 – F952, nhịp 3.2s gọn gàng):
    // Bước 1: CHỌN LOẠI BH (F760 - F808, 48 frames ~0.8s)
    const step1Focus = interpolate(frame, [760, 770, 800, 808], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Bước 2: CHỌN GÓI (F808 - F856, 48 frames ~0.8s)
    const step2Focus = interpolate(frame, [808, 818, 848, 856], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Bước 3: NHẬP THÔNG TIN (F856 - F904, 48 frames ~0.8s)
    const step3Focus = interpolate(frame, [856, 866, 896, 904], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Bước 4: THANH TOÁN (F904 - F952, 48 frames ~0.8s)
    const step4Focus = interpolate(frame, [904, 914, 944, 952], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Lớp phủ viền xám chuyển giao cho Card 1 khi focus rời sang Card 2, 3, 4 (chỉ duy nhất 1 card mang viền hồng)
    const card1Unfocus = interpolate(frame, [808, 816, 952, 970], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 4. Vị trí cuộn trang (webScrollY):
    // Chặng 1 (Head, F0 – F690): Giữ tĩnh tuyệt đối tại -7px để người xem tương tác cụm Head
    // Chặng 2 (Quy trình mua, F690 – F952):
    //   - F690 -> F760 (70 frames ~1.17s): Cuộn êm ái từ -7px xuống -1100px
    //   - F760 -> F952 (192 frames = đúng 3.2s gọn gàng!): Dừng tĩnh tuyệt đối tại -1100px focus lần lượt 4 bước
    // Chặng 3 (Banner thông tin nhóm bảo hiểm, F952 – F1095):
    //   - F952 -> F1015 (63 frames ~1.05s): Cuộn êm ái từ -1100px xuống -1850px
    //   - F1015 -> F1095 (80 frames = ~1.33s tinh gọn): Dừng tĩnh tuyệt đối tại -1850px theo dõi 2 banner lớn
    // Chặng 4 (Vì sao chọn TOPbaohiem, F1095 – F1300):
    //   - F1095 -> F1160 (65 frames ~1.08s): Cuộn êm ái từ -1850px xuống -2520px
    //   - F1160 -> F1300 (140 frames ~2.33s): Dừng tĩnh tuyệt đối tại -2520px chiêm ngưỡng 4 trụ cột cam kết
    // Chặng 5 (Đối tác của chúng tôi, F1300 – F1440, tinh gọn < 2.5s):
    //   - F1300 -> F1360 (60 frames = 1.0s): Cuộn êm ái từ -2520px xuống -3580px
    //   - F1360 -> F1440 (80 frames = 1.33s): Dừng tĩnh tại -3580px lướt qua các thương hiệu uy tín
    // Chặng 6 (Blog TopBaoHiem, F1440 – F1650):
    //   - F1440 -> F1510 (70 frames ~1.17s): Cuộn êm ái từ -3580px xuống -5080px
    //   - F1510 -> F1650 (140 frames ~2.33s): Dừng tĩnh tuyệt đối tại -5080px theo dõi 3 bài viết kiến thức
    // Chặng 7 (Footer & Hồi quy 3D Head, F1650 – F1860+):
    //   - F1650 -> F1720 (70 frames ~1.17s): Cuộn êm ái chạm đáy Footer tại -5660px
    //   - F1720 -> F1790 (70 frames ~1.17s): Dừng tĩnh tại -5660px chiêm ngưỡng thông tin pháp lý & hotline
    //   - F1790 -> F1850 (60 frames = 1.0s): Cuộn vút trở lại Head (-7px) đồng bộ cùng cú xoay 3D phân tách!
    const webScrollY = interpolate(
        frame,
        [690, 760, 952, 1015, 1095, 1160, 1300, 1360, 1440, 1510, 1650, 1720, 1790, 1850],
        [-7, -1100, -1100, -1850, -1850, -2520, -2520, -3580, -3580, -5080, -5080, -5660, -5660, -7],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
    );

    // 5. Vỏ MacBook và bóng sàn mờ dần giải phóng màn hình (F1790 -> F1840)
    const macCasingOpacity = interpolate(frame, [1790, 1840], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 6. Chuyển đổi góc 3D Axonometric phân tách (F1790 -> F1860):
    // Tấm Web Canvas thoát ly vỏ máy, nghiêng góc 3D Axonometric (rotateX: 52°, rotateZ: -28°) chuẩn Shotcraft
    const web3DEntrance = interpolate(frame, [1790, 1860], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // 7. TASK 3.10: ĐẠI CẢNH 3D MỔ XẺ PHÂN TÁCH (EXPLODED VIEW) - PHÂN ĐOẠN 1 (F1860 - F2040+):
    // Camera lượn nhẹ quanh tấm Web (Camera Orbit Parallax) tạo thị sai độ sâu thực
    const web3DOrbit = interpolate(frame, [1860, 2040], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // B. Cú đập búa va đập nén lún cơ khí (Hammer Thud Formula - Phân đoạn 4):
    // Tầng Menu Bar cuối cùng đóng sập khít vào F2118, kích hoạt xung lực chấn động mạnh mẽ dao động tắt dần
    let thudZ = 0;
    let thudRotateX = 0;
    let thudScale = 0;
    if (frame >= 2118) {
        const tThud = frame - 2118;
        if (tThud < 32) {
            // Lún mạnh 24px dội nảy tắt dần
            thudZ = -24 * Math.exp(-tThud / 4.2) * Math.cos(tThud * 0.72);
            // Sàn đế chấn động chúc nhẹ theo phương va đập cơ khí
            thudRotateX = 2.2 * Math.exp(-tThud / 3.8) * Math.sin(tThud * 0.72);
            // Nén nhẹ scale quán tính
            thudScale = -0.018 * Math.exp(-tThud / 3.2) * Math.cos(tThud * 0.72);
        }
    }

    // Góc nghiêng kết hợp giữa giai đoạn chuyển cảnh, giai đoạn orbit và chấn động va đập cơ khí:
    const web3DRotateX = interpolate(web3DEntrance, [0, 1], [0, 52]) - 4 * web3DOrbit + thudRotateX; // 52° -> 48° + phản chấn
    const web3DRotateZ = interpolate(web3DEntrance, [0, 1], [0, -28]) + 8 * web3DOrbit; // -28° -> -20°
    const web3DTranslateZ = interpolate(web3DEntrance, [0, 1], [0, 120]) + 30 * web3DOrbit + thudZ;
    const web3DScale = interpolate(web3DEntrance, [0, 1], [1.4, 1.15]) * (1 - 0.05 * web3DOrbit) * (1 + thudScale);

    // Cường độ chấn động tác động lên bóng tiếp xúc mặt bàn (Tabletop Contact Shadow)
    const thudShadowIntensity =
        frame >= 2118 && frame - 2118 < 30
            ? Math.exp(-(frame - 2118) / 4.2) * Math.max(0, Math.cos((frame - 2118) * 0.72))
            : 0;

    // Xung viền chớp sáng va đập cơ khí đanh thép (Impact Flash) tại F2118
    const thudImpactFlash = frame >= 2118 && frame <= 2125 ? Math.exp(-(frame - 2118) / 2.2) * 0.85 : 0;

    // Tiến độ xuất hiện của các ô rãnh nét đứt (Dashed Slot Outlines) trên sàn đế (mờ dần khi các tầng sập xuống)
    const dashedSlotsProgress = interpolate(frame, [1865, 1910, 2085, 2118], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // ==============================================================
    // 8. TASK 3.10 - PHÂN ĐOẠN 2: LÒ XO BUNG TẦNG 3D THEO TRỤC Z (STAGGERED SPRING BLAST)
    // F1905 -> F1980+: Mỗi cụm tầng nhấc bổng lên độ cao Z định trước theo cơ chế lò xo nảy nhẹ
    // ==============================================================
    const springLayer1 = spring({
        frame: frame - 1905,
        fps: 60,
        config: { damping: 14, stiffness: 95, mass: 0.85 },
    });
    const springLayer2 = spring({
        frame: frame - 1915,
        fps: 60,
        config: { damping: 14, stiffness: 90, mass: 0.95 },
    });
    const springLayer3 = spring({
        frame: frame - 1925,
        fps: 60,
        config: { damping: 13, stiffness: 85, mass: 1.0 },
    });
    const springLayer4 = spring({
        frame: frame - 1935,
        fps: 60,
        config: { damping: 12, stiffness: 80, mass: 0.9 },
    });

    const pL1 = frame >= 1905 ? Math.max(0, springLayer1) : 0;
    const pL2 = frame >= 1915 ? Math.max(0, springLayer2) : 0;
    const pL3 = frame >= 1925 ? Math.max(0, springLayer3) : 0;
    const pL4 = frame >= 1935 ? Math.max(0, springLayer4) : 0;

    // ==============================================================
    // 10. TASK 3.10 - PHÂN ĐOẠN 4: HỢP THỂ ĐÓNG NẮP CƠ KHÍ & QUÉT SÁNG (PHYSICAL THUD & SHEEN SWEEP)
    // F2080 -> F2166: Hạ cánh ngược thứ tự, va đập nén lún 8px, vệt sáng quét chéo qua bề mặt
    // ==============================================================
    // A. Lò xo hạ cánh đóng nắp ngược thứ tự (Cụm 3 đáp trước -> Cụm 2 -> Cụm 1 sập cuối cùng):
    const springLand4 = spring({
        frame: frame - 2080,
        fps: 60,
        config: { damping: 16, stiffness: 110, mass: 0.9 },
    });
    const springLand3 = spring({
        frame: frame - 2084,
        fps: 60,
        config: { damping: 16, stiffness: 110, mass: 0.9 },
    });
    const springLand2 = spring({
        frame: frame - 2090,
        fps: 60,
        config: { damping: 16, stiffness: 115, mass: 0.95 },
    });
    const springLand1 = spring({
        frame: frame - 2098,
        fps: 60,
        config: { damping: 18, stiffness: 130, mass: 1.0 },
    });

    const landL4 = frame >= 2080 ? Math.min(1, Math.max(0, springLand4)) : 0;
    const landL3 = frame >= 2084 ? Math.min(1, Math.max(0, springLand3)) : 0;
    const landL2 = frame >= 2090 ? Math.min(1, Math.max(0, springLand2)) : 0;
    const landL1 = frame >= 2098 ? Math.min(1, Math.max(0, springLand1)) : 0;

    // Hệ số nâng Z thực tế sau khi tính cả nhịp bung lên và nhịp hạ cánh:
    const factorL1 = pL1 * (1 - landL1);
    const factorL2 = pL2 * (1 - landL2);
    const factorL3 = pL3 * (1 - landL3);
    const factorL4 = pL4 * (1 - landL4);

    // Độ cao Z thực tế của từng cụm tầng theo trục Z chuẩn phân tầng user yêu cầu:
    // - Cụm 1: Menu Bar trên cùng: NẰM CAO NHẤT (Z = 450px)
    // - Cụm 2: Cụm Title lớn "So sánh TOPbaohiem" & Hình ảnh: TẦNG THỨ 2 (Z = 280px)
    // - Cụm 3: Dàn Card bảo hiểm: TẦNG THẤP HƠN (Z = 135px - 145px)
    // - Cụm 4: Nền trang tầng trệt (Sàn đế chassis, Z = 0px)
    const zLayer1 = factorL1 * 450; // Cụm 1: Menu Bar nằm cao nhất 450px
    const zLayer2 = factorL2 * 280; // Cụm 2: Hero Banner tầng thứ hai 280px
    const zLayer3 = factorL3 * 135; // Cụm 3 (Cơ bản): Dàn Card bảo hiểm tầng thấp hơn 135px
    const zLayer4 = factorL4 * 145; // Cụm 3 (Hero Du lịch): Cùng tầng card thấp hơn (145px)

    // Độ mờ sàn đế khi các tầng bay lên, và phục hồi hoàn toàn khi các tầng hạ cánh đóng nắp
    // Hồi phục từ 0.06 lên 1.0 chính xác tại F2118 khi tầng cuối cùng sập khít
    const chassisFloorBaseOpacity = interpolate(frame, [1905, 1955, 2075, 2118], [1, 0.06, 0.06, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Lớp các tầng bay (Floating Layers) hòa nhập hoàn toàn vào sàn đế tại F2118:
    // Ngay khi búa va đập cơ khí sập khít, toàn bộ các mảnh cắt chuyển giao 100% sang sàn đế liền mạch
    const floatingLayersOpacity = interpolate(frame, [2114, 2118], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // D. Vệt sáng quang học quét chéo bề mặt bo mạch (Glaze Sheen Sweep):
    // Quét chéo góc 24° từ F2124 -> F2180: Nhịp điệu êm ái (~0.93s), diện tích rộng và độ tương phản cao
    const sheenProgress = interpolate(frame, [2124, 2180], [-55, 135], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.22, 0.05, 0.25, 1),
    });
    const sheenOpacity = interpolate(frame, [2124, 2132, 2170, 2180], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 9. TASK 3.10 - PHÂN ĐOẠN 3: HỆ THỐNG NHÃN CHỈ DẪN KỸ THUẬT SỐ (TECHNICAL CALLOUTS / HUD)
    // Xuất hiện từ F1965 -> F2085: Các đường tia vector SVG gập góc vươn ra từ điểm neo 3D + hộp nhãn công nghệ
    const calloutProgress = interpolate(frame, [1965, 1995], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const calloutFadeOut = interpolate(frame, [2060, 2085], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const calloutOpacity = calloutProgress * calloutFadeOut;

    // ==============================================================
    // 11. TASK 3.11: CLICK THẺ DU LỊCH & DOLLY-THROUGH PHÓNG XUYÊN SANG CẢNH 3 (F2180 – F2400)
    // ==============================================================
    // A. Con trỏ chuột lướt vào nút "So sánh ngay ➔" trên thẻ Du lịch (F2180 -> F2215)
    const cursor311Progress = interpolate(frame, [2180, 2215], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const cursor311X = interpolate(cursor311Progress, [0, 1], [1560, 1334]);
    const cursor311Y = interpolate(cursor311Progress, [0, 1], [930, 761.5]);
    const cursor311Opacity = interpolate(frame, [2180, 2190, 2235, 2245], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // B. Cú click chuột tại F2222: Nút nhún nhẹ và sáng viền hồng
    const clickPressProgress = interpolate(frame, [2220, 2223, 2228], [1, 0.88, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const travelBtnHover = interpolate(frame, [2205, 2215, 2320, 2350], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // C. Vòng sóng Click Ripple bùng nở từ tâm nút (F2222 -> F2248)
    const clickRippleProgress = interpolate(frame, [2222, 2248], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const clickRippleScale = interpolate(clickRippleProgress, [0, 1], [0.3, 3.2]);
    const clickRippleOpacity = interpolate(clickRippleProgress, [0, 0.2, 1], [0.95, 0.85, 0]);

    // D. Cú phóng xuyên Dolly-Through / Crash Zoom của Camera vào lòng chiếc vali du lịch (F2236 -> F2400)
    const dollyProgress = interpolate(frame, [2236, 2400], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.38, 0.05, 0.15, 1),
    });

    // Góc nghiêng chuyển dần về phẳng trực diện (0°) để lao thẳng trực diện vào chiếc vali
    const cameraDollyRotateX = interpolate(dollyProgress, [0, 0.75], [web3DRotateX, 0]);
    const cameraDollyRotateZ = interpolate(dollyProgress, [0, 0.75], [web3DRotateZ, 0]);

    // Scale phóng lớn cực đại từ 1 lên 8.2x lao vào lòng chiếc vali
    const cameraDollyScale = web3DScale * (1 + 7.2 * Math.pow(dollyProgress, 1.55));
    const cameraDollyTranslateZ = web3DTranslateZ + 900 * dollyProgress;

    // Trọng tâm zoom hướng chuẩn xác vào chiếc vali du lịch trên canvas web (X: 74%, Y: 65%)
    const dollyOriginX = interpolate(dollyProgress, [0, 0.3], [50, 74]);
    const dollyOriginY = interpolate(dollyProgress, [0, 0.3], [50, 65]);

    // Luồng ánh sáng xuyên không (Pass-through Portal Flash) tại các frame cuối cùng của Scene 2 (F2360 -> F2400)
    const portalFlashOpacity = interpolate(frame, [2360, 2400], [0, 0.98], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.4, 0, 0.2, 1),
    });

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                // Nền sáng trong trẻo, sắc nét tuyệt đối chuẩn Canva gốc (không dùng gradient mờ sương)
                backgroundColor: '#F8FAFC',
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                perspective: 2600,
                perspectiveOrigin: '50% 50%',
            }}
        >
            {/* VIRTUAL CAMERA RIG STAGE: Khung điều khiển toàn bộ không gian 3D của Scene 2 */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    width,
                    height,
                    transformStyle: 'preserve-3d',
                    transform: `translate3d(${camPanX}px, ${camPanY}px, ${camPanZ}px) rotateX(${camPitch}deg) rotateY(${camYaw}deg) rotateZ(${camRoll}deg) scale(${camScale})`,
                    transformOrigin: '50% 50%',
                }}
            >
                {/* ============================================================== */}
                {/* A. HEADER GÓC TRÊN TRÁI: NHÃN PHÂN CẢNH & THƯƠNG HIỆU TOPBAOHIEM */}
                {/* ============================================================== */}
                <div
                    style={{
                        position: 'absolute',
                        top: 90,
                        left: 140,
                        zIndex: 10,
                    }}
                >
                    {/* Tiêu đề thương hiệu lớn */}
                    <div
                        style={{
                            fontSize: 165,
                            fontWeight: 900,
                            color: colors.brandPink,
                            letterSpacing: '-2px',
                            lineHeight: 1.05,
                            fontFamily: "'Space Grotesk', sans-serif",
                        }}
                    >
                        TOPbaohiem
                    </div>

                    {/* Slogan mô tả phụ */}
                    <div
                        style={{
                            fontSize: 58,
                            fontWeight: 600,
                            color: '#475569',
                            marginTop: 12,
                            letterSpacing: '-0.5px',
                        }}
                    >
                        Website bán bảo hiểm trực tuyến
                    </div>
                </div>

                {/* ============================================================== */}
                {/* B. ĐÁY KHUNG HÌNH: DẢI SÓNG GIẤY XANH MINT 3D ĐỒNG BỘ CẢNH 1 */}
                {/* ============================================================== */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 3840,
                        height: 960,
                        pointerEvents: 'none',
                        zIndex: 2,
                        transform: `translateY(${waveFloatY + waveSurgeY}px)`,
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

                        {/* Lớp sóng giấy mint nền sau (Layer 2) */}
                        <path
                            d={pathWaveLayer2}
                            fill="url(#mintWaveGrad2)"
                            transform={`translate(${waveLayer2FloatX * 0.7}, 0)`}
                        />

                        {/* Lớp sóng giấy mint chính tiền cảnh (Layer 1) */}
                        <path d={pathWaveLayer1} fill="url(#mintWaveGrad1)" />

                        {/* Đường viền nếp gấp giấy mỏng uốn lượn đồng bộ trên đỉnh sóng */}
                        <path d={crestLineLayer1} stroke="#8CE0CB" strokeWidth="3.5" fill="none" opacity="0.6" />
                    </svg>
                </div>

                {/* Đám mây xanh mint góc trái ôm cổ tay (mayxanh.png) - Tách riêng lớp bóng phía sau và giữ ảnh mây nét căng */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 650,
                        height: 342,
                        zIndex: 17, // Nổi phía trước cổ tay áo hồng ôm viền tự nhiên
                        pointerEvents: 'none',
                        transform: `translateY(${Math.sin(frame * 0.03) * 4 + mintCloudPullY + mintCloudBurstY}px) translateX(${mintCloudPullX + mintCloudBurstX}px) scale(${burstScale})`,
                        opacity: burstFade,
                    }}
                >
                    {/* 1. Bóng tiếp xúc chân đám mây trên mặt sàn mint */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 38,
                            left: '6%',
                            width: '86%',
                            height: 38,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(15, 23, 42, 0.20)',
                            filter: 'blur(15px)',
                            transform: 'scaleY(0.42)',
                        }}
                    />

                    {/* 2. LỚP BÓNG PHÍA SAU (Nằm ở zIndex thấp hơn, hắt sang phải & bottom) */}
                    {/* Tầng 1: Vệt bóng hắt loang mềm ra phía sau bên phải */}
                    <Img
                        src={staticFile('assets/elements/screen2/mayxanh.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '18px -41px',
                            filter: 'brightness(0) opacity(0.22) blur(20px)',
                        }}
                    />

                    {/* Tầng 2: Viền bóng tiếp xúc sắc nét ôm theo các múi cong bên phải */}
                    <Img
                        src={staticFile('assets/elements/screen2/mayxanh.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '6px -45.5px',
                            filter: 'brightness(0) opacity(0.18) blur(3px)',
                        }}
                    />

                    {/* Tầng 3: Vệt bóng đổ dưới chân bottom lan toả mềm */}
                    <Img
                        src={staticFile('assets/elements/screen2/mayxanh.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '2px -34px',
                            filter: 'brightness(0) opacity(0.24) blur(16px)',
                        }}
                    />

                    {/* Tầng 4: Bóng tiếp xúc đậm nét mép đáy nằm ngang */}
                    <Img
                        src={staticFile('assets/elements/screen2/mayxanh.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '0px -40px',
                            filter: 'brightness(0) opacity(0.32) blur(5px)',
                        }}
                    />

                    {/* Tầng 5: Bóng rỉa nhẹ sườn trái */}
                    <Img
                        src={staticFile('assets/elements/screen2/mayxanh.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '-3px -46px',
                            filter: 'brightness(0) opacity(0.12) blur(6px)',
                        }}
                    />

                    {/* 3. LỚP ĐÁM MÂY XANH MINT CHÍNH (FOREGROUND) - 100% NÉT CĂNG NGUYÊN BẢN, KHÔNG BỊ FILTER LÀM MỜ */}
                    <Img
                        src={staticFile('assets/elements/screen2/mayxanh.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '0px -47.1px',
                        }}
                    />
                </div>

                {/* Đám mây trắng 3D góc trên phải - Tách riêng lớp bóng phía sau và giữ ảnh mây nét căng */}
                <div
                    style={{
                        position: 'absolute',
                        top: 90,
                        left: 2980,
                        width: 680,
                        height: 668,
                        zIndex: 3,
                        pointerEvents: 'none',
                        transform: `translateY(${cloudWhiteTranslateY + Math.cos(frame * 0.035) * 5 + cloudPullY + cloudBurstY}px) translateX(${cloudWhiteTranslateX + Math.sin(frame * 0.025) * 4 + cloudPullX + cloudBurstX}px) scale(${burstScale})`,
                        opacity: cloudWhiteOpacity * burstFade,
                    }}
                >
                    {/* 1. LỚP BÓNG PHÍA SAU (Nằm ở zIndex thấp hơn, hắt sang phải & rỉa quanh đáy/trái chuẩn nguyên mẫu) */}
                    {/* Tầng 1: Vệt bóng hắt loang mềm ra nền tường phía sau bên phải */}
                    <Img
                        src={staticFile('assets/elements/screen2/maytrang.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '153px -85px',
                            filter: 'brightness(0) opacity(0.24) blur(22px)',
                        }}
                    />

                    {/* Tầng 2: Viền bóng tiếp xúc sắc nét ôm theo các múi cong bên phải */}
                    <Img
                        src={staticFile('assets/elements/screen2/maytrang.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '136px -91px',
                            filter: 'brightness(0) opacity(0.15) blur(3px)',
                        }}
                    />

                    {/* Tầng 3: Bóng rỉa loang nhẹ ôm quanh sườn trái (Ambient Left Rim) */}
                    <Img
                        src={staticFile('assets/elements/screen2/maytrang.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '124px -91px',
                            filter: 'brightness(100) opacity(0.08) blur(20px)',
                        }}
                    />

                    {/* Tầng 4: Vệt bóng đổ dưới bottom đám mây lan toả mềm mại (Bottom Cast Shadow) */}
                    <Img
                        src={staticFile('assets/elements/screen2/maytrang.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '130px -75px',
                            filter: 'brightness(0) opacity(0.24) blur(18px)',
                        }}
                    />

                    {/* Tầng 5: Bóng tiếp xúc đậm nét ngay dưới mép đáy nằm ngang (Bottom Contact Shadow) */}
                    <Img
                        src={staticFile('assets/elements/screen2/maytrang.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '129px -83px',
                            filter: 'brightness(0) opacity(0.35) blur(6px)',
                        }}
                    />

                    {/* 2. LỚP ĐÁM MÂY CHÍNH (FOREGROUND) - 100% NÉT CĂNG NGUYÊN BẢN, KHÔNG BỊ FILTER LÀM MỜ */}
                    <Img
                        src={staticFile('assets/elements/screen2/maytrang.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '128.5px -93.5px',
                        }}
                    />
                </div>

                {/* Nhánh lá xanh mint sau mép phải iPhone (Mint Leaf Accent - Chuẩn mẫu Canva) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 1320,
                        right: -10,
                        zIndex: 4, // Dưới iPhone (zIndex: 8), trên dải sóng (zIndex: 2)
                        pointerEvents: 'none',
                        transform: `translateY(${Math.sin(frame * 0.04) * 5}px) rotate(${Math.cos(frame * 0.03) * 1.5}deg)`,
                        filter: 'drop-shadow(-8px 12px 24px rgba(16, 185, 129, 0.15))',
                    }}
                >
                    <svg width="220" height="380" viewBox="0 0 220 380" fill="none">
                        <path
                            d="M 220,180 C 130,160 50,100 20,20 C 10,80 30,190 90,260 C 140,320 200,350 220,360 Z"
                            fill="#A7E4D3"
                            opacity="0.9"
                        />
                        <path
                            d="M 220,210 C 145,210 85,160 55,90 C 50,140 70,220 120,280 C 160,330 205,355 220,360 Z"
                            fill="#8CE0CB"
                            opacity="0.95"
                        />
                        <path
                            d="M 220,360 C 160,300 95,200 45,70"
                            stroke="#52B79E"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.75"
                        />
                    </svg>
                </div>

                {/* ============================================================== */}
                {/* C. TIỀN CẢNH BÊN TRÁI: BÀN TAY BÚNG TAY SNAP! & CỤM 4 THẺ BÀI */}
                {/* ============================================================== */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 60,
                        width: 820,
                        height: 1420,
                        zIndex: 15,
                        pointerEvents: 'none',
                    }}
                >
                    {/* 1. Bàn tay áo hồng búng tay (bungtay.png) - Diễn hoạt Snap có xung lực đàn hồi */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -40,
                            left: 20,
                            width: 580,
                            height: 1140,
                            transformOrigin: 'bottom center',
                            transform: `translateY(${handSnapY + handContainerTranslateY}px) scale(${handSnapScale}) rotate(${handSnapRotate}deg)`,
                            opacity: handContainerOpacity,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/bungtay.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                translate: '-80px -171.7px',
                                filter: 'drop-shadow(24px 32px 42px rgba(15, 23, 42, 0.26)) drop-shadow(8px 14px 18px rgba(0, 0, 0, 0.18))',
                            }}
                        />

                        {/* Sóng xung kích hồng lan tỏa từ đầu ngón tay khi búng tay 1 (Shockwave Ripple 1) */}
                        {rippleOpacity > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 110,
                                    right: 35,
                                    width: 140,
                                    height: 140,
                                    borderRadius: '50%',
                                    border: '3.5px solid rgba(237, 3, 124, 0.85)',
                                    boxShadow: '0 0 24px rgba(237, 3, 124, 0.5), inset 0 0 16px rgba(237, 3, 124, 0.3)',
                                    transform: `translate(-50%, -50%) scale(${rippleScale})`,
                                    opacity: rippleOpacity,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}

                        {/* Sóng xung kích hồng lần 2 (Shockwave Ripple 2 - F368 - F395) */}
                        {ripple2Opacity > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 110,
                                    right: 35,
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    border: '4px solid rgba(237, 3, 124, 0.9)',
                                    boxShadow:
                                        '0 0 30px rgba(237, 3, 124, 0.65), inset 0 0 20px rgba(237, 3, 124, 0.4)',
                                    transform: `translate(-50%, -50%) scale(${ripple2Scale})`,
                                    opacity: ripple2Opacity,
                                    pointerEvents: 'none',
                                }}
                            />
                        )}

                        {/* Ngôi sao phát quang vàng rực rỡ lần 2 (Eureka Sparkle Starburst 2) */}
                        {star2Opacity > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 110,
                                    right: 35,
                                    transform: `translate(-50%, -50%) scale(${star2Entrance}) rotate(${star2Rotation}deg)`,
                                    transformOrigin: 'center center',
                                    pointerEvents: 'none',
                                    opacity: star2Opacity,
                                    filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.95)) drop-shadow(0 0 8px #FFF)',
                                }}
                            >
                                <svg width="84" height="84" viewBox="0 0 72 72" fill="none">
                                    <path
                                        d="M 36,4 Q 36,36 4,36 Q 36,36 36,68 Q 36,36 68,36 Q 36,36 36,4 Z"
                                        fill="#FBBF24"
                                    />
                                    <circle cx="36" cy="36" r="6" fill="#FFFFFF" />
                                </svg>
                            </div>
                        )}

                        {/* Ngôi sao phát quang vàng rực rỡ (Eureka Sparkle Starburst) */}
                        {starOpacity > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 110,
                                    right: 35,
                                    transform: `translate(-50%, -50%) scale(${starEntrance}) rotate(${starRotation}deg)`,
                                    transformOrigin: 'center center',
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.85)) drop-shadow(0 0 6px #FFF)',
                                }}
                            >
                                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                                    <path
                                        d="M 36,4 Q 36,36 4,36 Q 36,36 36,68 Q 36,36 68,36 Q 36,36 36,4 Z"
                                        fill="#FBBF24"
                                    />
                                    <circle cx="36" cy="36" r="6" fill="#FFFFFF" />
                                </svg>
                            </div>
                        )}

                        {/* Các tia sao vệ tinh bắn ra xung quanh khi búng tay */}
                        {miniStarOpacity > 0.01 && (
                            <>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 110 - miniStarDist * 0.8,
                                        right: 35 + miniStarDist * 0.6,
                                        transform: `translate(-50%, -50%) scale(${1 - miniStarDist / 120}) rotate(${frame * 4}deg)`,
                                        opacity: miniStarOpacity,
                                        pointerEvents: 'none',
                                        fontSize: 24,
                                    }}
                                >
                                    ✨
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 110 + miniStarDist * 0.5,
                                        right: 35 + miniStarDist * 0.9,
                                        transform: `translate(-50%, -50%) scale(${1 - miniStarDist / 120}) rotate(${-frame * 3}deg)`,
                                        opacity: miniStarOpacity,
                                        pointerEvents: 'none',
                                        fontSize: 18,
                                    }}
                                >
                                    🌟
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 110 - miniStarDist * 0.4,
                                        right: 35 - miniStarDist * 0.7,
                                        transform: `translate(-50%, -50%) scale(${1 - miniStarDist / 120}) rotate(${frame * 5}deg)`,
                                        opacity: miniStarOpacity,
                                        pointerEvents: 'none',
                                        fontSize: 20,
                                    }}
                                >
                                    ✦
                                </div>
                            </>
                        )}
                    </div>

                    {/* 2. Cụm 5 Thẻ bài nhỏ xòe ra hình cánh quạt cạnh ngón tay (Task 1.3 Deck-deal Flyout) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 250,
                            left: 360,
                            width: 340,
                            height: 340,
                            transform: `translateY(${floatAltY}px) translate3d(${cardsPullX + cardsBurstX}px, ${cardsPullY + cardsBurstY}px, 0) rotate(${cardsPullRotate + cardsBurstRotate}deg) scale(${cardsPullScale * burstScale})`,
                            opacity: burstFade,
                        }}
                    >
                        {/* Thẻ 1: Y tế */}
                        <div
                            style={{
                                position: 'absolute',
                                top: card1Motion.top,
                                left: card1Motion.left,
                                width: 285,
                                height: 305,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 24,
                                boxShadow:
                                    '0 2px 5px rgba(15, 23, 42, 0.08), 0 6px 12px rgba(15, 23, 42, 0.07), 14px 22px 36px rgba(15, 23, 42, 0.14), 4px 12px 48px rgba(15, 23, 42, 0.06), inset 0 1.5px 2px #FFFFFF, inset 0 -1.5px 2px rgba(244, 63, 94, 0.05)',
                                border: '2.5px solid #FFF0F3',
                                transform: card1Motion.transform,
                                opacity: card1Motion.opacity,
                                pointerEvents: card1Motion.pointerEvents,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 14,
                                zIndex: 1,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/yte.png')}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thẻ 2: Nhà cửa */}
                        <div
                            style={{
                                position: 'absolute',
                                top: card2Motion.top,
                                left: card2Motion.left,
                                width: 285,
                                height: 305,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 24,
                                boxShadow:
                                    '0 2px 5px rgba(15, 23, 42, 0.08), 0 6px 12px rgba(15, 23, 42, 0.07), 14px 22px 36px rgba(15, 23, 42, 0.14), 4px 12px 48px rgba(15, 23, 42, 0.06), inset 0 1.5px 2px #FFFFFF, inset 0 -1.5px 2px rgba(244, 63, 94, 0.05)',
                                border: '2.5px solid #FFF0F3',
                                transform: card2Motion.transform,
                                opacity: card2Motion.opacity,
                                pointerEvents: card2Motion.pointerEvents,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 14,
                                zIndex: 1,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/home.png')}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thẻ 3: Du lịch */}
                        <div
                            style={{
                                position: 'absolute',
                                top: card3Motion.top,
                                left: card3Motion.left,
                                width: 285,
                                height: 305,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 24,
                                boxShadow:
                                    '0 2px 5px rgba(15, 23, 42, 0.08), 0 6px 12px rgba(15, 23, 42, 0.07), 16px 24px 38px rgba(15, 23, 42, 0.14), 4px 12px 48px rgba(15, 23, 42, 0.06), inset 0 1.5px 2px #FFFFFF, inset 0 -1.5px 2px rgba(244, 63, 94, 0.05)',
                                border: '2.5px solid #FFF0F3',
                                transform: card3Motion.transform,
                                opacity: card3Motion.opacity,
                                pointerEvents: card3Motion.pointerEvents,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 14,
                                zIndex: 1,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/dulich.png')}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thẻ 4: Ô tô */}
                        <div
                            style={{
                                position: 'absolute',
                                top: card4Motion.top,
                                left: card4Motion.left,
                                width: 285,
                                height: 305,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 24,
                                boxShadow:
                                    '0 2px 6px rgba(15, 23, 42, 0.09), 0 8px 16px rgba(15, 23, 42, 0.08), 16px 26px 40px rgba(15, 23, 42, 0.16), 4px 14px 50px rgba(15, 23, 42, 0.07), inset 0 1.5px 2px #FFFFFF, inset 0 -1.5px 2px rgba(244, 63, 94, 0.05)',
                                border: '2.5px solid #FFF0F3',
                                transform: card4Motion.transform,
                                opacity: card4Motion.opacity,
                                pointerEvents: card4Motion.pointerEvents,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 14,
                                zIndex: 2,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/oto.png')}
                                style={{ width: '120%', height: '120%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thẻ 5: Xe máy */}
                        <div
                            style={{
                                position: 'absolute',
                                top: card5Motion.top,
                                left: card5Motion.left,
                                width: 285,
                                height: 305,
                                backgroundColor: '#FFFFFF',
                                borderRadius: 24,
                                boxShadow:
                                    '0 2px 6px rgba(15, 23, 42, 0.09), 0 8px 16px rgba(15, 23, 42, 0.08), 18px 26px 40px rgba(15, 23, 42, 0.16), 4px 14px 50px rgba(15, 23, 42, 0.07), inset 0 1.5px 2px #FFFFFF, inset 0 -1.5px 2px rgba(244, 63, 94, 0.05)',
                                border: '2.5px solid #FFF0F3',
                                transform: card5Motion.transform,
                                opacity: card5Motion.opacity,
                                pointerEvents: card5Motion.pointerEvents,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 14,
                                zIndex: 2,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/xemay.png')}
                                style={{ width: '120%', height: '120%', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* 3. Mũi tên cong màu hồng uốn lượn sang màn hình laptop (arrow.png) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 490,
                            left: 570,
                            width: 730,
                            height: 245,
                            transform: `translateY(${floatY * 0.5}px)`,
                            filter: 'drop-shadow(0 10px 20px rgba(225, 29, 72, 0.20))',
                            opacity: arrowOpacity * arrowVortexFade,
                            pointerEvents: frame >= arrowStartFrame ? 'auto' : 'none',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/arrow.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                translate: '118.3px 29.4px',
                            }}
                        />
                    </div>

                    {/* 4. Badge "Tìm hiểu dễ dàng" kèm icon kính lúp 3D (Task 1.4 Pop-Spring) */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 350,
                            left: 650,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 22,
                            backgroundColor: '#FFFFFF',
                            padding: '16px 36px 16px 20px',
                            borderRadius: 999,
                            boxShadow: '0 14px 36px rgba(223, 63, 116, 0.08)',
                            border: `2px solid ${colors.brandPink}`,
                            width: 610,
                            transform: `translate3d(${badgePullX + badgeBurstX}px, ${badgeTranslateY + badgeFloatY + badgePullY + badgeBurstY}px, 0) rotate(${badgePullRotate}deg) scale(${badgeScale * badgePullScale * burstScale})`,
                            transformOrigin: '50% 50%',
                            opacity: badgeOpacity * burstFade,
                            pointerEvents: frame >= badgeStartFrame ? 'auto' : 'none',
                        }}
                    >
                        {/* Icon kính lúp 3D (kinh-lup.png) */}
                        <div
                            style={{
                                width: 200,
                                height: 200,
                                flexShrink: 0,
                                transform: `scale(${lupScale}) rotate(${lupRotate}deg)`,
                                transformOrigin: '50% 50%',
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/kinh-lup.png')}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                fontSize: 64,
                                fontWeight: 800,
                                letterSpacing: '-0.5px',
                                lineHeight: 1.35,
                            }}
                        >
                            <span style={{ color: colors.brandPink }}>Tìm hiểu</span>
                            <span style={{ color: '#2B121E' }}>dễ dàng</span>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* C. TRUNG TÂM: CHIẾC LAPTOP MACBOOK 3D & GIAO DIỆN TRANG CHỦ (Task 2.1 Slide-in) */}
                {/* ============================================================== */}
                <div
                    style={{
                        position: 'absolute',
                        top: 160,
                        left: 1120,
                        width: 2626,
                        height: 1768,
                        zIndex: 5,
                        transform: `translate3d(${macTranslateX + oldMacSlideX}px, ${macTranslateY}px, 0) scale(${macScale})`,
                        transformOrigin: '50% 65%',
                        opacity: macOpacity * oldMacFade,
                        pointerEvents: frame >= macStartFrame ? 'auto' : 'none',
                    }}
                >
                    {/* Bóng tiếp xúc mặt bàn của MacBook */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 55,
                            left: '8%',
                            width: '84%',
                            height: 90,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(15, 23, 42, 0.12)',
                            filter: 'blur(30px)',
                            transform: `scaleY(0.4) scaleX(${macShadowScale})`,
                            opacity: macShadowOpacity,
                        }}
                    />

                    {/* 1. LAYER MÀN HÌNH (BÊN DƯỚI): MẶT TIỀN TRANG CHỦ QUANG HỌC BIẾN DẠNG 4K */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/homepage-screen-warped.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                translate: '-412.9px 116.2px',
                                scale: 0.951,
                            }}
                        />
                    </div>

                    {/* 2. LAYER VỎ KHUNG (BÊN TRÊN): MACBOOK NGUYÊN BẢN TÁCH NỀN CỦA BẠN */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 2,
                            filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.12))',
                            pointerEvents: 'none',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/macbook.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                translate: '-405.8px 116.3px',
                            }}
                        />
                    </div>
                </div>

                {/* ============================================================== */}
                {/* D. PHÍA PHẢI: CHIẾC IPHONE ĐỒNG HÀNH & KHIÊN 3D TIỀN CẢNH (Task 2.1 Slide-in) */}
                {/* ============================================================== */}
                <div
                    style={{
                        position: 'absolute',
                        top: 660,
                        right: 140,
                        width: 884,
                        height: 1326,
                        transform: `translate3d(${iphoneTranslateX + rightPullX + rightBurstX}px, ${iphoneTranslateY + floatAltY + rightPullY + rightBurstY}px, 0) rotate(${rightPullRotate + rightBurstRotate}deg) scale(${iphoneScale * rightPullScale * burstScale})`,
                        transformOrigin: '50% 70%',
                        opacity: iphoneOpacity * burstFade,
                        pointerEvents: frame >= iphoneStartFrame ? 'auto' : 'none',
                        zIndex: 8,
                    }}
                >
                    {/* 1. Bóng iPhone — loe rộng về phía sau, đậm hơn theo góc nghiêng */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 180,
                            bottom: -10,
                            width: 950,
                            height: 425,
                            pointerEvents: 'none',
                            zIndex: 1,
                            transform: `rotate(-28deg) scale(${iphoneShadowScale})`,
                            transformOrigin: 'center center',
                            opacity: iphoneShadowOpacity,
                        }}
                    >
                        {/* Lớp 1: Quầng bóng rộng — loang xa về phía sau và bên phải */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '40%',
                                bottom: -40,
                                width: '88%',
                                height: '100%',
                                borderRadius: '10%',
                                background:
                                    'radial-gradient(ellipse at 43% 48%, rgba(40, 57, 57, 0.18) 0%, rgba(40, 57, 57, 0.14) 30%, rgba(40, 57, 57, 0.075) 55%, rgba(40, 57, 57, 0.025) 76%, transparent 100%)',
                                filter: 'blur(20px)',
                                transform: 'scaleY(0.88)',
                            }}
                        />

                        {/* Lớp 2: Thân bóng — mở rộng theo hướng nghiêng của cạnh đáy */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '40%',
                                bottom: -80,
                                width: '62%',
                                height: '72%',
                                background:
                                    'radial-gradient(ellipse at 42% 55%, rgba(35, 46, 48, 0.25) 0%, rgba(35, 46, 48, 0.19) 35%, rgba(35, 46, 48, 0.09) 65%, rgba(35, 46, 48, 0.015) 85%, transparent 100%)',
                                filter: 'blur(10px)',
                                transform: 'scaleY(0.82)',
                            }}
                        />
                    </div>

                    {/* 2. LAYER MÀN HÌNH IPHONE (BÊN DƯỚI): TRANG CHỦ MOBILE QUANG HỌC 4K RETINA */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/iphone-screen-warped.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                rotate: '3.1deg',
                                translate: '102.4px 55.3px',
                            }}
                        />
                    </div>

                    {/* 3. LAYER VỎ KHUNG IPHONE 3D (BÊN TRÊN): KHUNG MÁY NGUYÊN BẢN FIGMA IPHONE_3 VỚI BÓNG KHỐI 3D */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 2,
                            pointerEvents: 'none',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/iphone_3.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                rotate: '3.1deg',
                                translate: '102.4px 69.4px',
                                filter: 'drop-shadow(26px 36px 48px rgba(15, 23, 42, 0.25)) drop-shadow(8px 16px 20px rgba(0, 0, 0, 0.16))',
                            }}
                        />
                    </div>

                    {/* 4. Bóng khiên loe rộng trên mặt sàn mint */}
                    <div
                        style={{
                            position: 'absolute',
                            left: -300,
                            bottom: -22,
                            width: 680,
                            height: 90,
                            pointerEvents: 'none',
                            transform: `rotate(-10deg) scale(${shieldShadowScale})`,
                            transformOrigin: '55% 50%',
                            opacity: shieldShadowOpacity,
                            zIndex: 9,
                        }}
                    >
                        {/* Lớp 1: Quầng bóng loe rộng, tan mượt sang hai bên */}
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 20,
                                width: '100%',
                                height: '100%',
                                background:
                                    'radial-gradient(ellipse at 50% 45%, rgba(48, 62, 65, 0.16) 0%, rgba(48, 62, 65, 0.12) 30%, rgba(48, 62, 65, 0.06) 55%, rgba(48, 62, 65, 0.025) 72%, transparent 100%)',
                                filter: 'blur(12px)',
                                transform: 'scaleY(0.82)',
                            }}
                        />

                        {/* Lớp 2: Thân bóng rộng, đậm vừa phải */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '7%',
                                bottom: 3,
                                width: '86%',
                                height: '140%',
                                background:
                                    'radial-gradient(ellipse at 50% 50%, rgba(38, 48, 53, 0.23) 0%, rgba(38, 48, 53, 0.15) 40%, rgba(38, 48, 53, 0.045) 72%, transparent 100%)',
                                filter: 'blur(1px)',
                                transform: 'scaleY(1.08)',
                            }}
                        />

                        {/* Lớp 3: Bóng tiếp xúc tập trung dưới mũi nhọn */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '37%',
                                bottom: 2,
                                width: '38%',
                                height: '85%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(30, 39, 43, 0.30) 0%, rgba(30, 39, 43, 0.18) 42%, rgba(30, 39, 43, 0.04) 75%, transparent 100%)',
                                filter: 'blur(2px)',
                                transform: 'scaleY(0.95)',
                            }}
                        />
                    </div>

                    {/* 5. Chiếc khiên hồng 3D đặt nổi bật trước chân iPhone (khien.png) */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -25,
                            left: -100,
                            width: 450,
                            height: 450,
                            zIndex: 10,
                            opacity: shieldOpacity,
                            transform: `translate3d(0, ${shieldDropY + (shieldElapsed > 25 ? ((shieldElapsed - 25) / 15 < 1 ? ((shieldElapsed - 25) / 15) * floatY : floatY) : 0)}px, 0) scale(${shieldScale})`,
                            transformOrigin: '50% 90%',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/khien.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                scale: 1.506,
                                translate: '-68.3px 7.9px',
                                /* Giảm tối đa drop-shadow của bản thân ảnh khiên để không bị lỗi bóng giả chồng lên nhau */
                                filter: 'drop-shadow(-2px 4px 6px rgba(15, 23, 42, 0.12))',
                            }}
                        />

                        {/* Xung phát quang nhẹ (sparkle glow) khi mũi khiên tiếp đất vững vàng */}
                        {shieldTickPulse > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '38%',
                                    top: '50%',
                                    width: 140,
                                    height: 140,
                                    borderRadius: '50%',
                                    background:
                                        'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(244, 63, 94, 0.35) 45%, transparent 75%)',
                                    transform: `translate(-50%, -50%) scale(${1 + shieldTickPulse * 0.6})`,
                                    opacity: shieldTickPulse,
                                    pointerEvents: 'none',
                                    mixBlendMode: 'screen',
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* ============================================================== */}
                {/* VÒNG XOÁY NĂNG LƯỢNG 3D THREE.JS (VORTEX SWIRL 3D) TẠI TRUNG TÂM (F370 - F425) */}
                {/* ============================================================== */}
                {frame >= 370 && frame <= 425 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 20,
                            pointerEvents: 'none',
                        }}
                    >
                        <VortexSwirl3D
                            frame={frame}
                            width={width}
                            height={height}
                            vortexStartFrame={372}
                            vortexSwirlFrame={396}
                            vortexBurstFrame={415}
                        />
                    </div>
                )}

                {/* ============================================================== */}
                {/* E. TRUNG TÂM SÂN KHẤU: MACBOOK TRỰC DIỆN 90° VỚI MÀN HÌNH RETINA (F385+) */}
                {/* ============================================================== */}
                {frame >= macFrontStart && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 360,
                            left: 720,
                            width: 2400,
                            height: 1462,
                            zIndex: 25,
                            transform: `translate3d(0, ${macFrontTranslateY}px, 0) scale(${macFrontScale})`,
                            transformOrigin: '50% 65%',
                            opacity: macFrontOpacity,
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Bóng tiếp xúc mặt bàn của MacBook trực diện */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 45,
                                left: '5%',
                                width: '90%',
                                height: 100,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(15, 23, 42, 0.28)',
                                filter: 'blur(35px)',
                                transform: `scaleY(0.4) scaleX(${macFrontShadowScale})`,
                                opacity: macFrontShadowOpacity * macCasingOpacity,
                            }}
                        />

                        {/* 1. MÀN HÌNH NẰM TRONG LÒNG KÍNH -> THOÁT LY VỎ MÁY VÀO 3D AXONOMETRIC PHÂN TÁCH */}
                        {/* A. BÓNG TIẾP XÚC MẶT BÀN CỦA ĐẾ SÀN KHI VÀO 3D (TABLETOP CONTACT SHADOW) */}
                        {web3DEntrance > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '17%',
                                    top:
                                        web3DEntrance > 0.001
                                            ? `${interpolate(web3DEntrance, [0, 1], [17, 20.5])}%`
                                            : '17%',
                                    width: '67%',
                                    height: '75%',
                                    borderRadius: 24,
                                    backgroundColor: `rgba(15, 23, 42, ${0.18 + 0.12 * thudShadowIntensity})`,
                                    filter: `blur(${Math.max(16, 35 - 12 * thudShadowIntensity)}px)`,
                                    transformOrigin: `${dollyOriginX}% ${dollyOriginY}%`,
                                    transform: `perspective(2400px) rotateX(${cameraDollyRotateX}deg) rotateZ(${cameraDollyRotateZ}deg) translateZ(-15px) translate(20px, 30px) scale(${cameraDollyScale})`,
                                    opacity: Math.max(0, 1 - dollyProgress * 1.5),
                                    pointerEvents: 'none',
                                    zIndex: 0,
                                }}
                            />
                        )}

                        {/* B. KHUNG CONTAINER 3D CHA (PRESERVE-3D, MANG MA TRẬN XOAY VÀ SCALE) */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '17%',
                                top:
                                    web3DEntrance > 0.001
                                        ? `${interpolate(web3DEntrance, [0, 1], [17, 20.5])}%`
                                        : '17%',
                                width: '67%',
                                height: '75%',
                                zIndex: 1,
                                transformOrigin: `${dollyOriginX}% ${dollyOriginY}%`,
                                transform:
                                    web3DEntrance > 0.001
                                        ? `perspective(2400px) rotateX(${cameraDollyRotateX}deg) rotateZ(${cameraDollyRotateZ}deg) translateZ(${cameraDollyTranslateZ}px) scale(${cameraDollyScale})`
                                        : 'scale(1.4)',
                                transformStyle: 'preserve-3d',
                                overflow: 'visible',
                            }}
                        >
                            {/* 0. LÁT CẮT VIỀN ĐỘ DÀY SÀN ĐẾ 3D (CHASSIS BASE EXTRUSION - NẰM NGOÀI OVERFLOW: HIDDEN ĐỂ KHÔNG BỊ CẮT GÓC BO TRÒN) */}
                            {web3DEntrance > 0.01 && (
                                <>
                                    {[
                                        { step: 0.7, color: '#F8FAFC' },
                                        { step: 1.4, color: '#F1F5F9' },
                                        { step: 2.1, color: '#E2E8F0' },
                                        { step: 2.8, color: '#E2E8F0' },
                                        { step: 3.5, color: '#CBD5E1' },
                                    ].map((item, idx) => {
                                        const isBottom = idx === 4;
                                        return (
                                            <div
                                                key={idx}
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: web3DEntrance > 0.01 ? 18 : 14,
                                                    backgroundColor: item.color,
                                                    transform: `translateZ(-${item.step}px)`,
                                                    boxShadow: isBottom
                                                        ? `0 ${interpolate(web3DEntrance, [0, 1], [0, 24])}px ${interpolate(web3DEntrance, [0, 1], [0, 50])}px rgba(15, 23, 42, ${interpolate(web3DEntrance, [0, 1], [0, 0.15])}), 0 ${interpolate(web3DEntrance, [0, 1], [0, 8])}px ${interpolate(web3DEntrance, [0, 1], [0, 16])}px rgba(15, 23, 42, ${interpolate(web3DEntrance, [0, 1], [0, 0.08])})`
                                                        : undefined,
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        );
                                    })}
                                </>
                            )}

                            {/* 1. MẶT SÀN ĐẾ CHASSIS 3D (DESKTOP CHASSIS BASE BOARD - Z = 0) */}
                            {/* SÀN ĐẾ NÀY CÓ OVERFLOW: HIDDEN ĐỂ CHỈ HIỂN THỊ TRỌN VẸN PHẦN HEAD TRANG CHỦ, CẮT SẠCH TOÀN BỘ PHẦN THÂN WEB DÀI 10188px NHƯ ẢNH USER GỬI */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: web3DEntrance > 0.01 ? 18 : 14,
                                    backgroundColor: '#FFFFFF',
                                    boxShadow:
                                        web3DEntrance > 0.01
                                            ? '0 0 0 1px rgba(226, 232, 240, 0.9), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.03)'
                                            : undefined,
                                    overflow: 'hidden',
                                    transform: 'translateZ(0px)',
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Ảnh Head trang chủ TOPbaohiem 4K siêu nét - Khi vào 3D chuyển sang head_chassis_base.png cắt gọn mặt sàn */}
                                <Img
                                    src={
                                        frame >= 1860
                                            ? staticFile('assets/elements/screen2/head_chassis_base.png')
                                            : staticFile('assets/elements/screen2/fullsize-trangchu.png')
                                    }
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '120%',
                                        height: 'auto',
                                        translate: `-182.5px ${webScrollY}px`,
                                        opacity: chassisFloorBaseOpacity,
                                    }}
                                />

                                {/* LỚP OVERLAY TƯƠNG TÁC GIAO DIỆN TRANG CHỦ (INTERACTIVE STAGED TOUR OVERLAY) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '120%',
                                        height: 'auto',
                                        translate: `-182.5px ${webScrollY}px`,
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {/* ------------------------------------------------------------------ */}
                                    {/* CHẶNG 1: HOVER CARD & NÚT SO SÁNH NGAY NỔI BẬT (CHUẨN ẢNH USER)     */}
                                    {/* ------------------------------------------------------------------ */}

                                    {/* THẺ 1: BẢO HIỂM SỨC KHOẺ (Hover lướt qua F535 - F565) */}
                                    {card1Hover > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 324,
                                                top: 601,
                                                width: 418,
                                                height: 220,
                                                borderRadius: 22,
                                                border: '2px solid #ED017C',
                                                boxShadow: '0 8px 24px rgba(237, 1, 124, 0.2)',
                                                opacity: card1Hover,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}
                                    {card1Hover > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 352,
                                                top: 735,
                                                width: 204,
                                                height: 53,
                                                borderRadius: 9999,
                                                backgroundColor: '#ED017C',
                                                boxShadow: '0 6px 16px rgba(237, 1, 124, 0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#FFFFFF',
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                opacity: card1Hover,
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <span>So sánh ngay</span>
                                            <span style={{ marginLeft: 6, fontSize: 17, lineHeight: 1 }}>➔</span>
                                        </div>
                                    )}

                                    {/* THẺ 2: BẢO HIỂM CHÁY NỔ (TRỌNG TÂM HOVER CARD CHUẨN 100% ẢNH 1 USER) */}
                                    {card2Hover > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 764,
                                                top: 601,
                                                width: 418,
                                                height: 220,
                                                borderRadius: 22,
                                                border: '2.5px solid #ED017C',
                                                boxShadow:
                                                    '0 12px 36px rgba(237, 1, 124, 0.28), 0 0 16px rgba(237, 1, 124, 0.15)',
                                                opacity: card2Hover,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}
                                    {card2Hover > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 792,
                                                top: 735,
                                                width: 204,
                                                height: 53,
                                                borderRadius: 9999,
                                                backgroundColor: '#ED017C',
                                                boxShadow: '0 8px 24px rgba(237, 1, 124, 0.5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#FFFFFF',
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                opacity: card2Hover,
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <span>So sánh ngay</span>
                                            <span style={{ marginLeft: 6, fontSize: 17, lineHeight: 1 }}>➔</span>
                                        </div>
                                    )}

                                    {/* THẺ 3: BẢO HIỂM DU LỊCH (Hover lướt qua F652 - F685) */}
                                    {card3Hover > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 1204,
                                                top: 601,
                                                width: 418,
                                                height: 220,
                                                borderRadius: 22,
                                                border: '2px solid #ED017C',
                                                boxShadow: '0 8px 24px rgba(237, 1, 124, 0.2)',
                                                opacity: card3Hover,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}
                                    {card3Hover > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: 1232,
                                                top: 735,
                                                width: 204,
                                                height: 53,
                                                borderRadius: 9999,
                                                backgroundColor: '#ED017C',
                                                boxShadow: '0 6px 16px rgba(237, 1, 124, 0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#FFFFFF',
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                opacity: card3Hover,
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <span>So sánh ngay</span>
                                            <span style={{ marginLeft: 6, fontSize: 17, lineHeight: 1 }}>➔</span>
                                        </div>
                                    )}

                                    {/* ------------------------------------------------------------------ */}
                                    {/* CHẶNG 2: FOCUS LẦN LƯỢT 4 THẺ QUY TRÌNH MUA BẢO HIỂM (F760 – F1060, 5S) */}
                                    {/* CHUẨN XÁC VỊ TRÍ BORDER VÒNG NGOÀI (OUTER BORDER), 1 BORDER DUY NHẤT */}
                                    {/* ------------------------------------------------------------------ */}

                                    {/* LỚP PHỦ VIỀN XÁM CHO CARD 1 KHI FOCUS RỜI SANG CARD 2, 3, 4 (ĐẢM BẢO DUY NHẤT 1 CARD HỒNG) */}
                                    {card1Unfocus > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                boxSizing: 'border-box',
                                                left: 333,
                                                top: 1502.5,
                                                width: 289,
                                                height: 562,
                                                borderRadius: 20,
                                                border: '2.5px solid #D9D9D9',
                                                opacity: card1Unfocus,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}

                                    {/* THẺ 1: CHỌN LOẠI BH (F760 - F835, Viền hồng ngoài cùng rực sáng hào quang) */}
                                    {step1Focus > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                boxSizing: 'border-box',
                                                left: 333,
                                                top: 1502.5,
                                                width: 289,
                                                height: 562,
                                                borderRadius: 20,
                                                border: '2.5px solid #ED017C',
                                                boxShadow:
                                                    '0 12px 32px rgba(237, 1, 124, 0.35), 0 0 18px rgba(237, 1, 124, 0.22)',
                                                opacity: step1Focus,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}

                                    {/* THẺ 2: CHỌN GÓI (F835 - F910, Viền hồng vòng ngoài đè khít viền xám) */}
                                    {step2Focus > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                boxSizing: 'border-box',
                                                left: 664.5,
                                                top: 1502.5,
                                                width: 289,
                                                height: 562,
                                                borderRadius: 20,
                                                border: '2.5px solid #ED017C',
                                                boxShadow:
                                                    '0 14px 38px rgba(237, 1, 124, 0.42), 0 0 22px rgba(237, 1, 124, 0.3)',
                                                opacity: step2Focus,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}

                                    {/* THẺ 3: NHẬP THÔNG TIN (F910 - F985, Viền hồng vòng ngoài đè khít viền xám) */}
                                    {step3Focus > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                boxSizing: 'border-box',
                                                left: 996,
                                                top: 1502.5,
                                                width: 289,
                                                height: 562,
                                                borderRadius: 20,
                                                border: '2.5px solid #ED017C',
                                                boxShadow:
                                                    '0 12px 32px rgba(237, 1, 124, 0.35), 0 0 18px rgba(237, 1, 124, 0.22)',
                                                opacity: step3Focus,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}

                                    {/* THẺ 4: THANH TOÁN (F985 - F1060, Viền hồng vòng ngoài đè khít viền xám) */}
                                    {step4Focus > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                boxSizing: 'border-box',
                                                left: 1327.5,
                                                top: 1502.5,
                                                width: 289,
                                                height: 562,
                                                borderRadius: 20,
                                                border: '2.5px solid #ED017C',
                                                boxShadow:
                                                    '0 12px 32px rgba(237, 1, 124, 0.35), 0 0 18px rgba(237, 1, 124, 0.22)',
                                                opacity: step4Focus,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}

                                    {/* ------------------------------------------------------------------ */}
                                    {/* TASK 3.10 - PHÂN ĐOẠN 1: CÁC Ô RÃNH NÉT ĐỨT (DASHED SLOTS) TRÊN ĐẾ SÀN HEAD (F1865+) */}
                                    {/* Khớp chuẩn từng cụm linh kiện Head theo ảnh user: Nav, Hero Text, Hero Image, 3 Card lớn, 2 Card nhỏ */}
                                    {/* ------------------------------------------------------------------ */}
                                    {dashedSlotsProgress > 0.01 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                opacity: dashedSlotsProgress,
                                                pointerEvents: 'none',
                                                zIndex: 2,
                                            }}
                                        >
                                            {/* ============================================================== */}
                                            {/* CỤM 1: MENU BAR TRÊN CÙNG (Logo, Navigation & Quản lý)         */}
                                            {/* ============================================================== */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312,
                                                    top: 10,
                                                    width: 1315,
                                                    height: 80,
                                                    borderRadius: 16,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.45)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.04)',
                                                    boxShadow: 'inset 0 0 16px rgba(237, 1, 124, 0.08)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />

                                            {/* ============================================================== */}
                                            {/* CỤM 2: TITLE LỚN "SO SÁNH TOPBAOHIEM" & HÌNH ẢNH (GOM 1 KHỐI)   */}
                                            {/* Bao trọn: Badge BCT, Headline, 3 Lợi ích & Hình gia đình/khiên */}
                                            {/* ============================================================== */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312,
                                                    top: 135,
                                                    width: 1315,
                                                    height: 425,
                                                    borderRadius: 24,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.5)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.04)',
                                                    boxShadow: 'inset 0 0 24px rgba(237, 1, 124, 0.08)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />

                                            {/* ============================================================== */}
                                            {/* CỤM 3: PHẦN CÁC CARD LOẠI BẢO HIỂM (KHỚP CHUẨN 100% TỪNG CARD)  */}
                                            {/* ============================================================== */}

                                            {/* Card 1: Bảo hiểm Sức khoẻ (Nổi bật) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 324,
                                                    top: 601,
                                                    width: 418,
                                                    height: 220,
                                                    borderRadius: 22,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.45)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.04)',
                                                    boxShadow: 'inset 0 0 16px rgba(237, 1, 124, 0.08)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />

                                            {/* Card 2: Bảo hiểm Cháy nổ */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 764,
                                                    top: 601,
                                                    width: 418,
                                                    height: 220,
                                                    borderRadius: 22,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.45)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.04)',
                                                    boxShadow: 'inset 0 0 16px rgba(237, 1, 124, 0.08)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />

                                            {/* Card 3: Bảo hiểm Du lịch */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 1204,
                                                    top: 601,
                                                    width: 418,
                                                    height: 220,
                                                    borderRadius: 22,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.6)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.06)',
                                                    boxShadow:
                                                        'inset 0 0 18px rgba(237, 1, 124, 0.12), 0 0 14px rgba(237, 1, 124, 0.12)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />

                                            {/* Card 4: Bảo hiểm TNDS Xe máy (Đã căn chỉnh khớp 100% tọa độ thực tế) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 485,
                                                    top: 846,
                                                    width: 478,
                                                    height: 130,
                                                    borderRadius: 20,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.45)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.04)',
                                                    boxShadow: 'inset 0 0 14px rgba(237, 1, 124, 0.08)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />

                                            {/* Card 5: Bảo hiểm TNDS Ô tô (Đã căn chỉnh khớp 100% tọa độ thực tế) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 984,
                                                    top: 846,
                                                    width: 478,
                                                    height: 130,
                                                    borderRadius: 20,
                                                    border: '2.5px dashed rgba(237, 1, 124, 0.45)',
                                                    backgroundColor: 'rgba(237, 1, 124, 0.04)',
                                                    boxShadow: 'inset 0 0 14px rgba(237, 1, 124, 0.08)',
                                                    boxSizing: 'border-box',
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* ============================================================== */}
                                    {/* TASK 3.11: UI TƯƠNG TÁC THẺ DU LỊCH & NÚT SO SÁNH (F2180 – F2400) */}
                                    {/* ============================================================== */}
                                    {frame >= 2180 && (
                                        <>
                                            {/* 1. Viền sáng phát quang Thẻ Du Lịch khi được chọn */}
                                            {travelBtnHover > 0.01 && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 1204,
                                                        top: 601,
                                                        width: 418,
                                                        height: 220,
                                                        borderRadius: 22,
                                                        border: '2.5px solid #ED017C',
                                                        backgroundColor: 'rgba(237, 1, 124, 0.08)',
                                                        boxShadow:
                                                            '0 0 28px rgba(237, 1, 124, 0.35), inset 0 0 20px rgba(237, 1, 124, 0.15)',
                                                        opacity: travelBtnHover,
                                                        pointerEvents: 'none',
                                                        zIndex: 12,
                                                    }}
                                                />
                                            )}

                                            {/* 2. Nút "So sánh ngay ➔" nền hồng rực, nhún click chân thực */}
                                            {travelBtnHover > 0.01 && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 1232,
                                                        top: 735,
                                                        width: 204,
                                                        height: 53,
                                                        borderRadius: 9999,
                                                        background: 'linear-gradient(135deg, #FF1A8C 0%, #ED017C 100%)',
                                                        boxShadow:
                                                            '0 8px 24px rgba(237, 1, 124, 0.5), 0 0 16px rgba(237, 1, 124, 0.35)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#FFFFFF',
                                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        fontSize: 16,
                                                        fontWeight: 700,
                                                        transform: `scale(${clickPressProgress})`,
                                                        transformOrigin: '50% 50%',
                                                        opacity: travelBtnHover,
                                                        pointerEvents: 'none',
                                                        zIndex: 13,
                                                    }}
                                                >
                                                    <span>So sánh ngay</span>
                                                    <span style={{ marginLeft: 6, fontSize: 17, lineHeight: 1 }}>
                                                        ➔
                                                    </span>
                                                </div>
                                            )}

                                            {/* 3. Vòng sóng Click Ripple bùng nở từ tâm nút (F2222 -> F2248) */}
                                            {clickRippleOpacity > 0.01 && (
                                                <>
                                                    {/* Lớp sóng A: Vòng viền hồng neon */}
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            left: 1334,
                                                            top: 761.5,
                                                            width: 80,
                                                            height: 80,
                                                            borderRadius: '50%',
                                                            border: '3px solid #ED017C',
                                                            backgroundColor: 'rgba(237, 1, 124, 0.18)',
                                                            boxShadow:
                                                                '0 0 24px rgba(237, 1, 124, 0.6), inset 0 0 16px rgba(237, 1, 124, 0.3)',
                                                            transform: `translate(-50%, -50%) scale(${clickRippleScale})`,
                                                            opacity: clickRippleOpacity,
                                                            pointerEvents: 'none',
                                                            zIndex: 14,
                                                        }}
                                                    />
                                                    {/* Lớp sóng B: Vòng viền trắng bạc bổ trợ */}
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            left: 1334,
                                                            top: 761.5,
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: '50%',
                                                            border: '2px solid #FFFFFF',
                                                            boxShadow: '0 0 16px #FFFFFF',
                                                            transform: `translate(-50%, -50%) scale(${clickRippleScale * 0.85})`,
                                                            opacity: clickRippleOpacity * 0.9,
                                                            pointerEvents: 'none',
                                                            zIndex: 14,
                                                        }}
                                                    />
                                                </>
                                            )}

                                            {/* 4. Con trỏ chuột macOS 3D lướt vào nút và thực hiện cú click */}
                                            {cursor311Opacity > 0.01 && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: cursor311X,
                                                        top: cursor311Y,
                                                        opacity: cursor311Opacity,
                                                        transform: `translate(-6px, -4px) scale(${clickPressProgress})`,
                                                        transformOrigin: '0% 0%',
                                                        filter: 'drop-shadow(0 10px 22px rgba(0, 0, 0, 0.38))',
                                                        pointerEvents: 'none',
                                                        zIndex: 20,
                                                    }}
                                                >
                                                    {/* Spotlight quầng tròn quanh con trỏ */}
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: 14,
                                                            left: 14,
                                                            width: 54,
                                                            height: 54,
                                                            borderRadius: '50%',
                                                            border: '2px solid rgba(237, 1, 124, 0.85)',
                                                            backgroundColor: 'rgba(237, 1, 124, 0.16)',
                                                            boxShadow: '0 0 16px rgba(237, 1, 124, 0.45)',
                                                            transform: 'translate(-50%, -50%)',
                                                            pointerEvents: 'none',
                                                        }}
                                                    />
                                                    {/* Mũi con trỏ macOS chuẩn */}
                                                    <svg
                                                        width="44"
                                                        height="44"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        style={{ position: 'relative', zIndex: 2 }}
                                                    >
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
                                        </>
                                    )}
                                </div>
                                {/* ĐÓNG LỚP OVERLAY TƯƠNG TÁC */}
                            </div>
                            {/* ĐÓNG 1. MẶT SÀN ĐẾ CHASSIS 3D (OVERFLOW: HIDDEN CẮT GỌN CHỈ GIỮ LẠI PHẦN HEAD TRANG CHỦ) */}

                            {/* 1.4 XUNG CHẤN ĐỘNG CƠ KHÍ HAMMER THUD IMPACT FLASH (F2118 - F2125) */}
                            {thudImpactFlash > 0.01 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: web3DEntrance > 0.01 ? 18 : 14,
                                        boxShadow: `0 0 ${45 * thudImpactFlash}px rgba(255, 255, 255, ${thudImpactFlash}), inset 0 0 ${25 * thudImpactFlash}px rgba(255, 255, 255, ${0.7 * thudImpactFlash})`,
                                        pointerEvents: 'none',
                                        zIndex: 34,
                                        transform: 'translateZ(7px)',
                                    }}
                                />
                            )}

                            {/* 1.5 VỆT SÁNG TRẮNG BẠC PLATINUM QUÉT CHÉO (SILVER WHITE SPECULAR SHEEN - PHÂN ĐOẠN 4) */}
                            {sheenOpacity > 0.01 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: web3DEntrance > 0.01 ? 18 : 14,
                                        overflow: 'hidden',
                                        pointerEvents: 'none',
                                        zIndex: 35,
                                        transform: 'translateZ(6px)',
                                    }}
                                >
                                    {/* Lớp A: Dải quầng sáng bạc mềm lan tỏa (Soft Silver Ambient Glaze - width 90%) */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-60%',
                                            left: `${sheenProgress - 15}%`,
                                            width: '90%',
                                            height: '240%',
                                            transform: 'rotate(24deg)',
                                            background:
                                                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(241,245,249,0.35) 30%, rgba(255,255,255,0.75) 50%, rgba(241,245,249,0.35) 70%, rgba(255,255,255,0) 100%)',
                                            opacity: sheenOpacity * 0.9,
                                            filter: 'blur(15px)',
                                        }}
                                    />

                                    {/* Lớp B: Lưỡi sáng gương bạc sắc sảo (Silver Mirror Specular Core - width 50%) */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-60%',
                                            left: `${sheenProgress}%`,
                                            width: '50%',
                                            height: '240%',
                                            transform: 'rotate(24deg)',
                                            background:
                                                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 35%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.45) 65%, rgba(255,255,255,0) 100%)',
                                            opacity: sheenOpacity,
                                            filter: 'blur(3px)',
                                            boxShadow:
                                                '0 0 35px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.7), 0 8px 30px rgba(15, 23, 42, 0.08)',
                                        }}
                                    >
                                        {/* Tia lõi phát quang trắng tinh khiết 8px ở tâm vệt sáng */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                bottom: 0,
                                                left: '50%',
                                                width: 8,
                                                transform: 'translateX(-50%)',
                                                backgroundColor: '#FFFFFF',
                                                boxShadow: '0 0 16px #FFFFFF, 0 0 35px rgba(255, 255, 255, 1)',
                                                filter: 'blur(1px)',
                                            }}
                                        />
                                    </div>

                                    {/* Lớp C: Viền sáng phản quang mép kính trắng bạc (Silver Rim Highlight) */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: web3DEntrance > 0.01 ? 18 : 14,
                                            boxShadow: `inset 0 0 ${18 * sheenOpacity}px rgba(255, 255, 255, ${0.85 * sheenOpacity}), inset 0 0 1.5px rgba(255, 255, 255, ${0.9 * sheenOpacity})`,
                                            opacity: sheenOpacity,
                                        }}
                                    />
                                </div>
                            )}

                            {/* ============================================================== */}
                            {/* 2. CÁC TẦNG BAY 3D NỔI TRÊN TRỤC Z (EXPLODED 3D FLOATING LAYERS) */}
                            {/* Nổi bổng theo lò xo nảy nhẹ, kèm bóng chiếu sàn đáy & độ dày cạnh khối */}
                            {/* Tự động hòa nhập liền mạch vào sàn đế và tắt hoàn toàn khi sập khít F2118 */}
                            {/* ============================================================== */}
                            {frame >= 1905 && frame <= 2125 && floatingLayersOpacity > 0.005 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '120%',
                                        height: 'auto',
                                        translate: `-182.5px ${webScrollY}px`,
                                        transformStyle: 'preserve-3d',
                                        pointerEvents: 'none',
                                        zIndex: 10,
                                        opacity: floatingLayersOpacity,
                                    }}
                                >
                                    {/* -------------------------------------------------------------- */}
                                    {/* A. CỤM 1: MENU BAR TRÊN CÙNG (Bay lên Z = 450px - NẰM CAO NHẤT) */}
                                    {/* -------------------------------------------------------------- */}
                                    {factorL1 > 0.005 && (
                                        <>
                                            {/* Neo 1: Bóng đổ chiếu xuống sàn đáy (Cast Shadow) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312 + zLayer1 * 0.16,
                                                    top: 10 + zLayer1 * 0.22,
                                                    width: 1315,
                                                    height: 80,
                                                    borderRadius: 16,
                                                    backgroundColor: 'rgba(15, 23, 42, 0.35)',
                                                    filter: `blur(${8 + zLayer1 * 0.06}px)`,
                                                    opacity:
                                                        Math.min(1, factorL1 * 1.5) *
                                                        Math.max(0, 0.5 - zLayer1 / 1400) *
                                                        factorL1,
                                                    transform: 'translateZ(2px)',
                                                }}
                                            />
                                            {/* Neo 2: Độ dày viền kính công nghệ siêu mỏng (Ultra-thin Tech Glass) */}
                                            {factorL1 > 0.03 &&
                                                [1.8, 3.5].map((step, idx) => {
                                                    const edgeColors = ['#E11D48', '#BE123C'];
                                                    return (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 312,
                                                                top: 10,
                                                                width: 1315,
                                                                height: 80,
                                                                borderRadius: 16,
                                                                backgroundColor: edgeColors[idx],
                                                                boxShadow: `0 1.5px 0 ${edgeColors[idx]}`,
                                                                transform: `translateZ(${Math.max(1, zLayer1 - step)}px)`,
                                                                pointerEvents: 'none',
                                                            }}
                                                        />
                                                    );
                                                })}
                                            {/* Neo 3: Mặt trước Tầng kính UI siêu nét */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312,
                                                    top: 10,
                                                    width: 1315,
                                                    height: 80,
                                                    borderRadius: 16,
                                                    overflow: 'hidden',
                                                    transform: `translateZ(${zLayer1}px)`,
                                                    boxShadow:
                                                        factorL1 > 0.01
                                                            ? `0 ${28 * factorL1}px ${60 * factorL1}px rgba(15, 23, 42, ${0.25 * factorL1}), 0 0 0 ${1 * factorL1}px rgba(255, 255, 255, ${0.95 * factorL1}), inset 0 ${1.5 * factorL1}px 2px rgba(255, 255, 255, ${0.75 * factorL1})`
                                                            : 'none',
                                                    backgroundColor: '#ED017C',
                                                }}
                                            >
                                                <Img
                                                    src={staticFile('assets/elements/screen2/cum1_menubar.png')}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                    }}
                                                />
                                                {/* Kính lướt sáng phản chiếu ánh sáng */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background:
                                                            'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 50%)',
                                                        opacity: factorL1,
                                                        pointerEvents: 'none',
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* -------------------------------------------------------------- */}
                                    {/* B. CỤM 2: HERO BANNER BLOCK (Bay lên Z = 280px - TẦNG THỨ 2)   */}
                                    {/* -------------------------------------------------------------- */}
                                    {factorL2 > 0.005 && (
                                        <>
                                            {/* Neo 1: Bóng đổ chiếu xuống sàn đáy */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312 + zLayer2 * 0.16,
                                                    top: 135 + zLayer2 * 0.22,
                                                    width: 1315,
                                                    height: 425,
                                                    borderRadius: 24,
                                                    backgroundColor: 'rgba(15, 23, 42, 0.35)',
                                                    filter: `blur(${10 + zLayer2 * 0.07}px)`,
                                                    opacity:
                                                        Math.min(1, factorL2 * 1.5) *
                                                        Math.max(0, 0.5 - zLayer2 / 1400) *
                                                        factorL2,
                                                    transform: 'translateZ(2px)',
                                                }}
                                            />
                                            {/* Neo 2: Độ dày viền kính công nghệ siêu mỏng (Ultra-thin Tech Glass) */}
                                            {factorL2 > 0.03 &&
                                                [1.8, 3.5].map((step, idx) => {
                                                    const edgeColors = ['#F8FAFC', '#E2E8F0'];
                                                    return (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 312,
                                                                top: 135,
                                                                width: 1315,
                                                                height: 425,
                                                                borderRadius: 24,
                                                                backgroundColor: edgeColors[idx],
                                                                boxShadow: `0 1.5px 0 ${edgeColors[idx]}`,
                                                                transform: `translateZ(${Math.max(1, zLayer2 - step)}px)`,
                                                                pointerEvents: 'none',
                                                            }}
                                                        />
                                                    );
                                                })}
                                            {/* Neo 3: Mặt trước Tầng kính UI siêu nét */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312,
                                                    top: 135,
                                                    width: 1315,
                                                    height: 425,
                                                    borderRadius: 24,
                                                    overflow: 'hidden',
                                                    transform: `translateZ(${zLayer2}px)`,
                                                    boxShadow:
                                                        factorL2 > 0.01
                                                            ? `0 ${32 * factorL2}px ${65 * factorL2}px rgba(15, 23, 42, ${0.22 * factorL2}), 0 0 0 ${1 * factorL2}px rgba(255, 255, 255, ${0.95 * factorL2}), inset 0 ${2 * factorL2}px 2px rgba(255, 255, 255, ${0.95 * factorL2})`
                                                            : 'none',
                                                    backgroundColor: '#FFFFFF',
                                                }}
                                            >
                                                <Img
                                                    src={staticFile('assets/elements/screen2/cum2_herobanner.png')}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                    }}
                                                />
                                                {/* Kính lướt sáng phản chiếu ánh sáng */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background:
                                                            'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 50%)',
                                                        opacity: factorL2,
                                                        pointerEvents: 'none',
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* -------------------------------------------------------------- */}
                                    {/* C. CỤM 3: DÀN CARD BẢO HIỂM CƠ BẢN (Bay lên Z = 135px - TẦNG THẤP HƠN) */}
                                    {/* -------------------------------------------------------------- */}
                                    {factorL3 > 0.005 && (
                                        <>
                                            {[
                                                {
                                                    key: 'card-suckhoe',
                                                    x: 324,
                                                    y: 601,
                                                    w: 418,
                                                    h: 220,
                                                    r: 22,
                                                    img: 'assets/elements/screen2/cum3_card1_suckhoe.png',
                                                },
                                                {
                                                    key: 'card-chayno',
                                                    x: 764,
                                                    y: 601,
                                                    w: 418,
                                                    h: 220,
                                                    r: 22,
                                                    img: 'assets/elements/screen2/cum3_card2_chayno.png',
                                                },
                                                {
                                                    key: 'card-xemay',
                                                    x: 485,
                                                    y: 846,
                                                    w: 478,
                                                    h: 130,
                                                    r: 20,
                                                    img: 'assets/elements/screen2/cum3_card4_xemay.png',
                                                },
                                                {
                                                    key: 'card-oto',
                                                    x: 984,
                                                    y: 846,
                                                    w: 478,
                                                    h: 130,
                                                    r: 20,
                                                    img: 'assets/elements/screen2/cum3_card5_oto.png',
                                                },
                                            ].map((c) => (
                                                <React.Fragment key={c.key}>
                                                    {/* Bóng chiếu sàn */}
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            left: c.x + zLayer3 * 0.16,
                                                            top: c.y + zLayer3 * 0.22,
                                                            width: c.w,
                                                            height: c.h,
                                                            borderRadius: c.r,
                                                            backgroundColor: 'rgba(15, 23, 42, 0.35)',
                                                            filter: `blur(${10 + zLayer3 * 0.07}px)`,
                                                            opacity:
                                                                Math.min(1, factorL3 * 1.5) *
                                                                Math.max(0, 0.5 - zLayer3 / 1400) *
                                                                factorL3,
                                                            transform: 'translateZ(2px)',
                                                        }}
                                                    />
                                                    {/* Độ dày viền kính công nghệ siêu mỏng (Ultra-thin Tech Glass) */}
                                                    {factorL3 > 0.03 &&
                                                        [1.6, 3.2].map((step, idx) => {
                                                            const cardEdgeColors = ['#F8FAFC', '#E2E8F0'];
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        left: c.x,
                                                                        top: c.y,
                                                                        width: c.w,
                                                                        height: c.h,
                                                                        borderRadius: c.r,
                                                                        backgroundColor: cardEdgeColors[idx],
                                                                        boxShadow: `0 1.5px 0 ${cardEdgeColors[idx]}`,
                                                                        transform: `translateZ(${Math.max(1, zLayer3 - step)}px)`,
                                                                        pointerEvents: 'none',
                                                                    }}
                                                                />
                                                            );
                                                        })}
                                                    {/* Mặt trước Card */}
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            left: c.x,
                                                            top: c.y,
                                                            width: c.w,
                                                            height: c.h,
                                                            borderRadius: c.r,
                                                            overflow: 'hidden',
                                                            transform: `translateZ(${zLayer3}px)`,
                                                            boxShadow:
                                                                factorL3 > 0.01
                                                                    ? `0 ${20 * factorL3}px ${45 * factorL3}px rgba(15, 23, 42, ${0.18 * factorL3}), 0 0 0 ${1 * factorL3}px rgba(255, 255, 255, ${0.95 * factorL3}), inset 0 ${1.5 * factorL3}px 1.5px rgba(255, 255, 255, ${0.9 * factorL3})`
                                                                    : 'none',
                                                            backgroundColor: '#FFFFFF',
                                                        }}
                                                    >
                                                        <Img
                                                            src={staticFile(c.img)}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                display: 'block',
                                                            }}
                                                        />
                                                        {/* Kính lướt sáng */}
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                inset: 0,
                                                                background:
                                                                    'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 50%)',
                                                                opacity: factorL3,
                                                                pointerEvents: 'none',
                                                            }}
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </>
                                    )}

                                    {/* -------------------------------------------------------------- */}
                                    {/* D. CỤM 3: THẺ BẢO HIỂM DU LỊCH (Cùng tầng card thấp hơn Z = 145px) */}
                                    {/* -------------------------------------------------------------- */}
                                    {factorL4 > 0.005 && (
                                        <>
                                            {/* Bóng chiếu sàn */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 1204 + zLayer4 * 0.16,
                                                    top: 601 + zLayer4 * 0.22,
                                                    width: 418,
                                                    height: 220,
                                                    borderRadius: 22,
                                                    backgroundColor: 'rgba(15, 23, 42, 0.38)',
                                                    filter: `blur(${12 + zLayer4 * 0.08}px)`,
                                                    opacity:
                                                        Math.min(1, factorL4 * 1.5) *
                                                        Math.max(0, 0.55 - zLayer4 / 1400) *
                                                        factorL4,
                                                    transform: 'translateZ(2px)',
                                                }}
                                            />
                                            {/* Độ dày viền kính công nghệ siêu mỏng (Ultra-thin Tech Glass: 3.2px viền hồng ruby) */}
                                            {factorL4 > 0.03 &&
                                                [1.6, 3.2].map((step, idx) => {
                                                    const rubyEdgeColors = ['#FBCFE8', '#F472B6'];
                                                    return (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                position: 'absolute',
                                                                left: 1204,
                                                                top: 601,
                                                                width: 418,
                                                                height: 220,
                                                                borderRadius: 22,
                                                                backgroundColor: rubyEdgeColors[idx],
                                                                boxShadow: `0 1.5px 0 ${rubyEdgeColors[idx]}`,
                                                                transform: `translateZ(${Math.max(1, zLayer4 - step)}px)`,
                                                                pointerEvents: 'none',
                                                            }}
                                                        />
                                                    );
                                                })}
                                            {/* Mặt trước Hero Card */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 1204,
                                                    top: 601,
                                                    width: 418,
                                                    height: 220,
                                                    borderRadius: 22,
                                                    overflow: 'hidden',
                                                    transform: `translateZ(${zLayer4}px)`,
                                                    boxShadow:
                                                        factorL4 > 0.01
                                                            ? `0 ${28 * factorL4}px ${60 * factorL4}px rgba(15, 23, 42, ${0.24 * factorL4}), 0 0 0 ${2 * factorL4}px #ED017C, 0 0 ${28 * factorL4}px rgba(237, 1, 124, ${0.4 * factorL4}), inset 0 ${1.5 * factorL4}px 2px rgba(255, 255, 255, ${0.95 * factorL4})`
                                                            : 'none',
                                                    backgroundColor: '#FFFFFF',
                                                }}
                                            >
                                                <Img
                                                    src={staticFile('assets/elements/screen2/cum3_card3_dulich.png')}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                    }}
                                                />
                                                {/* Hào quang lấp lánh Hero Card */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background:
                                                            'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(237, 1, 124, 0.08) 60%, rgba(237, 1, 124, 0.15) 100%)',
                                                        opacity: factorL4,
                                                        pointerEvents: 'none',
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* -------------------------------------------------------------- */}
                                    {/* E. PHÂN ĐOẠN 3: HỆ THỐNG NHÃN KỸ THUẬT SỐ (TECHNICAL CALLOUTS - CHUẨN SHOTCRAFT ẢNH 1) */}
                                    {/* -------------------------------------------------------------- */}
                                    {calloutOpacity > 0.005 && (
                                        <>
                                            {/* CALLOUT 1: CỤM 1 - TOP MENU BAR (BÊN PHẢI, Z = 450px) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 1627,
                                                    top: 50,
                                                    transform: `translate3d(0, 0, ${zLayer1}px) rotateZ(${-web3DRotateZ}deg) rotateX(${-web3DRotateX}deg)`,
                                                    transformOrigin: '0 0',
                                                    transformStyle: 'preserve-3d',
                                                    opacity: calloutOpacity,
                                                    pointerEvents: 'none',
                                                    zIndex: 40,
                                                }}
                                            >
                                                {/* Điểm neo tròn đặc (Solid Blue Anchor Dot) */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 0,
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: '50%',
                                                        backgroundColor: '#2563EB',
                                                        border: '2.5px solid #FFFFFF',
                                                        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.45)',
                                                        transform: 'translate(-50%, -50%)',
                                                        pointerEvents: 'none',
                                                    }}
                                                />

                                                {/* Tia vector SVG gập góc dẫn sang phải */}
                                                <svg
                                                    width="260"
                                                    height="70"
                                                    viewBox="0 0 260 70"
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: -45,
                                                        overflow: 'visible',
                                                    }}
                                                >
                                                    <path
                                                        d="M 0 45 L 80 45 L 125 15 L 240 15"
                                                        fill="none"
                                                        stroke="#2563EB"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeDasharray="255"
                                                        strokeDashoffset={255 * (1 - calloutProgress)}
                                                    />
                                                </svg>

                                                {/* Cụm chữ Typography chuẩn Shotcraft (Không dùng hộp thẻ) */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 255,
                                                        top: -95,
                                                        whiteSpace: 'nowrap',
                                                        transform: `translateX(${(1 - calloutProgress) * 20}px)`,
                                                        opacity: interpolate(calloutProgress, [0.3, 1], [0, 1], {
                                                            extrapolateLeft: 'clamp',
                                                            extrapolateRight: 'clamp',
                                                        }),
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            gap: 16,
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: '#2563EB',
                                                                fontSize: 48,
                                                                fontWeight: 800,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                                letterSpacing: -0.5,
                                                            }}
                                                        >
                                                            01
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: '#0F172A',
                                                                fontSize: 50,
                                                                fontWeight: 800,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                                letterSpacing: -0.8,
                                                            }}
                                                        >
                                                            Điều hướng
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: '#64748B',
                                                            fontSize: 32,
                                                            fontWeight: 500,
                                                            marginTop: 8,
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        }}
                                                    >
                                                        Top Navigation & Tra cứu nhanh
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CALLOUT 2: CỤM 2 - HERO BANNER (BÊN TRÁI, Z = 280px) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 312,
                                                    top: 295,
                                                    transform: `translate3d(0, 0, ${zLayer2}px) rotateZ(${-web3DRotateZ}deg) rotateX(${-web3DRotateX}deg)`,
                                                    transformOrigin: '0 0',
                                                    transformStyle: 'preserve-3d',
                                                    opacity: calloutOpacity,
                                                    pointerEvents: 'none',
                                                    zIndex: 40,
                                                }}
                                            >
                                                {/* Điểm neo tròn đặc (Solid Blue Anchor Dot) */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 0,
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: '50%',
                                                        backgroundColor: '#2563EB',
                                                        border: '2.5px solid #FFFFFF',
                                                        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.45)',
                                                        transform: 'translate(-50%, -50%)',
                                                        pointerEvents: 'none',
                                                    }}
                                                />

                                                {/* Tia vector SVG gập góc dẫn sang trái */}
                                                <svg
                                                    width="260"
                                                    height="70"
                                                    viewBox="0 0 260 70"
                                                    style={{
                                                        position: 'absolute',
                                                        left: -260,
                                                        top: -20,
                                                        overflow: 'visible',
                                                    }}
                                                >
                                                    <path
                                                        d="M 260 20 L 180 20 L 135 50 L 20 50"
                                                        fill="none"
                                                        stroke="#2563EB"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeDasharray="255"
                                                        strokeDashoffset={255 * (1 - calloutProgress)}
                                                    />
                                                </svg>

                                                {/* Cụm chữ Typography chuẩn Shotcraft (Bên trái, căn phải theo line) */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        right: 255,
                                                        top: -30,
                                                        whiteSpace: 'nowrap',
                                                        textAlign: 'right',
                                                        transform: `translateX(${-(1 - calloutProgress) * 20}px)`,
                                                        opacity: interpolate(calloutProgress, [0.3, 1], [0, 1], {
                                                            extrapolateLeft: 'clamp',
                                                            extrapolateRight: 'clamp',
                                                        }),
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            justifyContent: 'flex-end',
                                                            gap: 16,
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: '#2563EB',
                                                                fontSize: 48,
                                                                fontWeight: 800,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                                letterSpacing: -0.5,
                                                            }}
                                                        >
                                                            02
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: '#0F172A',
                                                                fontSize: 50,
                                                                fontWeight: 800,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                                letterSpacing: -0.8,
                                                            }}
                                                        >
                                                            Cam kết toàn diện
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: '#64748B',
                                                            fontSize: 32,
                                                            fontWeight: 500,
                                                            marginTop: 8,
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        }}
                                                    >
                                                        So sánh minh bạch & An tâm gia đình
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CALLOUT 3: CỤM 3 - DÀN CARD SẢN PHẨM (BÊN PHẢI, Z = 145px) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 1622,
                                                    top: 711,
                                                    transform: `translate3d(0, 0, ${zLayer4}px) rotateZ(${-web3DRotateZ}deg) rotateX(${-web3DRotateX}deg)`,
                                                    transformOrigin: '0 0',
                                                    transformStyle: 'preserve-3d',
                                                    opacity: calloutOpacity,
                                                    pointerEvents: 'none',
                                                    zIndex: 40,
                                                }}
                                            >
                                                {/* Điểm neo tròn đặc (Solid Blue Anchor Dot) */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 0,
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: '50%',
                                                        backgroundColor: '#2563EB',
                                                        border: '2.5px solid #FFFFFF',
                                                        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.45)',
                                                        transform: 'translate(-50%, -50%)',
                                                        pointerEvents: 'none',
                                                    }}
                                                />

                                                {/* Tia vector SVG gập góc dẫn sang phải */}
                                                <svg
                                                    width="260"
                                                    height="70"
                                                    viewBox="0 0 260 70"
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: -20,
                                                        overflow: 'visible',
                                                    }}
                                                >
                                                    <path
                                                        d="M 0 20 L 80 20 L 125 50 L 240 50"
                                                        fill="none"
                                                        stroke="#2563EB"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeDasharray="255"
                                                        strokeDashoffset={255 * (1 - calloutProgress)}
                                                    />
                                                </svg>

                                                {/* Cụm chữ Typography chuẩn Shotcraft (Không dùng hộp thẻ) */}
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 255,
                                                        top: -30,
                                                        whiteSpace: 'nowrap',
                                                        transform: `translateX(${(1 - calloutProgress) * 20}px)`,
                                                        opacity: interpolate(calloutProgress, [0.3, 1], [0, 1], {
                                                            extrapolateLeft: 'clamp',
                                                            extrapolateRight: 'clamp',
                                                        }),
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            gap: 16,
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: '#2563EB',
                                                                fontSize: 48,
                                                                fontWeight: 800,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                                letterSpacing: -0.5,
                                                            }}
                                                        >
                                                            03
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: '#0F172A',
                                                                fontSize: 50,
                                                                fontWeight: 800,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                                letterSpacing: -0.8,
                                                            }}
                                                        >
                                                            Sản phẩm đa dạng
                                                        </span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: '#64748B',
                                                            fontSize: 32,
                                                            fontWeight: 500,
                                                            marginTop: 8,
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        }}
                                                    >
                                                        5 nhóm bảo hiểm thiết yếu 1-chạm
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* ĐÓNG B. KHUNG CONTAINER 3D CHA (PRESERVE-3D) */}

                        {/* Con trỏ chuột tương tác lướt vào & cuộn trang */}
                        {macCursorOpacity > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: macCursorX,
                                    top: macCursorY,
                                    transform: 'translate(-50%, -50%)',
                                    opacity: macCursorOpacity,
                                    zIndex: 15,
                                    filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35))',
                                    pointerEvents: 'none',
                                }}
                            >
                                {/* 1. UI VÒNG TRÒN CHỈ ĐIỂM CON TRỎ CHUỘT (CURSOR SPOTLIGHT RING) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 14,
                                        left: 14,
                                        width: 64,
                                        height: 64,
                                        borderRadius: '50%',
                                        border: '2.5px solid rgba(237, 1, 124, 0.85)',
                                        backgroundColor: 'rgba(237, 1, 124, 0.18)',
                                        boxShadow:
                                            '0 0 18px rgba(237, 1, 124, 0.45), inset 0 0 10px rgba(237, 1, 124, 0.25)',
                                        transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.1) * 0.06})`,
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* 2. VÒNG SÓNG XUNG KÍCH NHẸ (SONAR PULSE RING) ĐỊNH VỊ CON TRỎ */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 14,
                                        left: 14,
                                        width: 86,
                                        height: 86,
                                        borderRadius: '50%',
                                        border: '1.5px solid rgba(237, 1, 124, 0.45)',
                                        transform: `translate(-50%, -50%) scale(${1 + ((frame % 36) / 36) * 0.35})`,
                                        opacity: (1 - (frame % 36) / 36) * 0.7,
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* 3. MŨI CON TRỎ CHUỘT MACOS SẮC NÉT */}
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ position: 'relative', zIndex: 2 }}
                                >
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

                        {/* 2. LAYER VỎ KHUNG MACBOOK TRỰC DIỆN (BÊN TRÊN, LÒNG KHOÉT TRONG SUỐT 100%) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 2,
                                filter: 'drop-shadow(0 30px 70px rgba(0, 0, 0, 0.16))',
                                opacity: macCasingOpacity,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/macbook_90.png')}
                                style={{
                                    width: '140.5%',
                                    height: '141%',
                                    objectFit: 'contain',
                                    translate: '-482.4px -250px',
                                    scale: 0.931,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* ============================================================== */}
            {/* TASK 3.11: LUỒNG SÁNG XUYÊN KHÔNG (PORTAL FLASH) LAO VÀO CẢNH 3 */}
            {/* ============================================================== */}
            {portalFlashOpacity > 0.01 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'radial-gradient(circle at 66% 62%, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 248, 0.96) 35%, rgba(237, 1, 124, 0.35) 70%, rgba(255, 255, 255, 0.1) 100%)',
                        opacity: portalFlashOpacity,
                        pointerEvents: 'none',
                        zIndex: 100,
                    }}
                />
            )}
        </div>
    );
};
