import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, staticFile, Img, spring } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';

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
    const camYaw = 0;   // rotateY (xoay phối cảnh 3/4)
    const camRoll = 0;  // rotateZ (nghiêng chân trời)
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
    } else {
        // Nhịp thở bồng bềnh vi mô điều hòa
        handSnapY = Math.sin((frame - 55) * 0.04) * 4;
    }

    // Sóng xung kích hồng lan tỏa từ đầu ngón tay (Shockwave Ripple)
    const rippleProgress = interpolate(frame, [12, 40], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const rippleScale = interpolate(rippleProgress, [0, 1], [0.2, 2.4]);
    const rippleOpacity = interpolate(rippleProgress, [0, 0.2, 0.8, 1], [0, 0.8, 0.2, 0]);

    // Tia sáng sao vàng phát quang (Sparkle Starburst)
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
        arcHeight: number
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
                    top: 140,
                    left: 170,
                    zIndex: 10,
                }}
            >
                {/* Tiêu đề thương hiệu lớn */}
                <div
                    style={{
                        fontSize: 200,
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
                        fontSize: 78,
                        fontWeight: 600,
                        color: '#334155',
                        marginTop: 16,
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
                    transform: `translateY(${Math.sin(frame * 0.03) * 4}px)`,
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
                    transform: `translateY(${cloudWhiteTranslateY + Math.cos(frame * 0.035) * 5}px) translateX(${cloudWhiteTranslateX + Math.sin(frame * 0.025) * 4}px)`,
                    opacity: cloudWhiteOpacity,
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
                        transform: `translateY(${handSnapY}px) scale(${handSnapScale}) rotate(${handSnapRotate}deg)`,
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

                    {/* Sóng xung kích hồng lan tỏa từ đầu ngón tay khi búng tay (Shockwave Ripple) */}
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
                        transform: `translateY(${floatAltY}px)`,
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
                        opacity: arrowOpacity,
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
                        transform: `translateY(${badgeTranslateY + badgeFloatY}px) scale(${badgeScale})`,
                        transformOrigin: '50% 50%',
                        opacity: badgeOpacity,
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
                    transform: `translate3d(${macTranslateX}px, ${macTranslateY}px, 0) scale(${macScale})`,
                    transformOrigin: '50% 65%',
                    opacity: macOpacity,
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
                    transform: `translate3d(${iphoneTranslateX}px, ${iphoneTranslateY + floatAltY}px, 0) scale(${iphoneScale})`,
                    transformOrigin: '50% 70%',
                    opacity: iphoneOpacity,
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
                        transform: 'rotate(-10deg)',
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
                        transform: `translateY(${floatY}px)`,
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
                </div>
            </div>
            </div>
        </div>
    );
};
