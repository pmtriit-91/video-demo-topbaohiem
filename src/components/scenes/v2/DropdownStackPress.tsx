import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import { ShieldCheck, BadgePercent, Zap, CheckCircle2, Sparkles, Star } from 'lucide-react';

interface DropdownStackPressProps {
    frame: number;
    fps: number;
    triggerFrame?: number; // 885: khi input bắt đầu dâng lên và mở khay
    activeHoverIndex?: number; // 1, 2, 3 khi chuột rà qua
    inputElevation?: number; // Tọa độ dâng lên của input (-600px)
}

export const DropdownStackPress: React.FC<DropdownStackPressProps> = ({
    frame,
    fps,
    triggerFrame = 910,
    activeHoverIndex = -1,
    inputElevation = -600,
}) => {
    // 1. Độ xuất hiện tổng thể của Khay Kính Mờ (Glass Dock)
    const dockEntrance = spring({
        frame: Math.max(0, frame - triggerFrame),
        fps,
        config: { damping: 16, mass: 0.9, stiffness: 100 },
    });

    if (dockEntrance <= 0.001) {
        return null;
    }

    // 2. TIMELINE ĐỒ HỌA 3D CHUYÊN SÂU (MỖI THẺ CÓ ĐỦ NHỊP ĐỌC VÀ THẨM THẤU)
    // - Frame 910 -> 922: Khay dock bung ra định vị (~0.2s)
    // - Frame 922: Thẻ 1 lập tức xuất hiện, không để khay trống quá lâu
    const TIMING = [
        {
            // Thẻ 1: So sánh đa hãng
            flyStart: 922,
            heroArrive: 957,
            slamStart: 1077,
            slamEnd: 1104,
            hlStart: 967,
            hlEnd: 1037,
            sparkleStart: 982,
            sparkleEnd: 1052,
        },
        {
            // Thẻ 2: Tiết kiệm chi phí
            flyStart: 1127,
            heroArrive: 1162,
            slamStart: 1282,
            slamEnd: 1309,
            hlStart: 1172,
            hlEnd: 1242,
            sparkleStart: 1187,
            sparkleEnd: 1257,
        },
        {
            // Thẻ 3: Cấp đơn 1-chạm & Bảo mật
            flyStart: 1332,
            heroArrive: 1367,
            slamStart: 1487,
            slamEnd: 1514,
            hlStart: 1377,
            hlEnd: 1447,
            sparkleStart: 1392,
            sparkleEnd: 1462,
        },
    ];

    // Xung lực Stack-Press cho cả khay dock khi các thẻ đập xuống
    const SLAM_CUES = [TIMING[0].slamEnd, TIMING[1].slamEnd, TIMING[2].slamEnd];
    let dockPressY = 0;
    for (const cue of SLAM_CUES) {
        if (frame >= cue && frame <= cue + 14) {
            const p = interpolate(frame, [cue, cue + 4, cue + 14], [0, 6.0, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.inOut(Easing.sin),
            });
            dockPressY = Math.max(dockPressY, p);
        }
    }

    // Vệt sáng Glaze Sheen quét qua toàn bộ khay sau khi Thẻ 3 đã tiếp đất
    const glazeStart = 1516;
    const glazeEnd = 1555;
    const glazeX = interpolate(frame, [glazeStart, glazeEnd], [-400, 3000], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.42, 0, 0.25, 1),
    });
    const glazeOpacity = interpolate(frame, [glazeStart, glazeStart + 6, glazeEnd - 6, glazeEnd], [0, 0.92, 0.92, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Dữ liệu 3 thẻ tính năng
    const featureItems = [
        {
            id: 1,
            slotIndex: 0,
            title: 'So sánh đa hãng dễ dàng',
            descPrefix: 'Minh bạch quyền lợi ',
            highlightText: '15+ công ty bảo hiểm hàng đầu trong 30 giây',
            chip: '⚡ So sánh 30s',
            chipColor: '#059669',
            chipBg: '#ECFDF5',
            hlBg: 'rgba(16, 185, 129, 0.22)',
            icon: ShieldCheck,
            iconGrad: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            accentGlow: 'rgba(16, 185, 129, 0.35)',
            brandColorRgb: '16, 185, 129',
        },
        {
            id: 2,
            slotIndex: 1,
            title: 'Tiết kiệm chi phí tối đa',
            descPrefix: 'Giá gốc trực tiếp từ nhà bảo hiểm, ',
            highlightText: 'chiết khấu tới 25%, không phí ẩn',
            chip: '💰 Giá gốc trực tiếp',
            chipColor: '#E11D48',
            chipBg: '#FFF1F2',
            hlBg: 'rgba(225, 29, 72, 0.22)',
            icon: BadgePercent,
            iconGrad: 'linear-gradient(135deg, #FF2E79 0%, #ED017C 100%)',
            accentGlow: 'rgba(225, 29, 72, 0.35)',
            brandColorRgb: '225, 29, 72',
        },
        {
            id: 3,
            slotIndex: 2,
            title: 'Cấp đơn 1-chạm & An toàn bảo mật',
            descPrefix: 'Chứng nhận điện tử tức thì ',
            highlightText: 'chuẩn Bộ Tài Chính, hỗ trợ bồi thường 24/7',
            chip: '🛡️ Bảo mật 100%',
            chipColor: '#2563EB',
            chipBg: '#EFF6FF',
            hlBg: 'rgba(37, 99, 235, 0.22)',
            icon: Zap,
            iconGrad: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            accentGlow: 'rgba(37, 99, 235, 0.35)',
            brandColorRgb: '37, 99, 235',
        },
    ];

    // Tọa độ Y chuẩn của từng slot trong khay dock (được nâng cấp to lớn, thoải mái với khoảng cách gapY = 30px)
    // Huy hiệu: top 24px, cao 72px (đáy 96px)
    // Slot 1: top 122px, cao 166px (đáy 288px)
    // Slot 2: top 318px, cao 166px (đáy 484px) - gapY = 30px
    // Slot 3: top 514px, cao 166px (đáy 680px) - gapY = 30px
    // Total dock height: 708px (padding đáy 28px)
    const SLOT_Y = [122, 318, 514];
    const DOCK_WIDTH = 2560;
    const DOCK_HEIGHT = 708;
    const CARD_HEIGHT_DOCK = 166;
    const CARD_HEIGHT_HERO = 210;

    // Vị trí "3D Hero Mid-Air Spotlight" ở trung tâm màn hình (bên dưới khay dock đã dâng lên cao)
    const HERO_Y = 750; // Nằm ở giữa khoảng không rộng lớn bên dưới khay dock
    const HERO_Z = 380; // Phóng gần camera tạo chiều sâu 3D điện ảnh
    const HERO_SCALE = 1.12; // Phóng lớn uy nghi
    const HERO_ROTX = 8.0; // Góc chúc nhẹ 3D tinh tế, thấy rõ bề dày và viền kính
    const HERO_ROTY = -3.5; // Phối cảnh 3/4 điện ảnh nhẹ nhàng
    const HERO_ROTZ = -0.5;

    return (
        <div
            style={{
                position: 'absolute',
                top: `calc(50% + 120px + ${inputElevation}px)`,
                left: '50%',
                transform: `translate(-50%, ${dockPressY}px) scale(${dockEntrance}) translateZ(0)`,
                transformOrigin: 'top center',
                width: DOCK_WIDTH,
                transformStyle: 'preserve-3d',
                zIndex: 38,
            }}
        >
            {/* 1. LỚP NỀN KÍNH MỜ (GLASS DOCK PLATE CỠ LỚN KHỐI 3D) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 48,
                    backgroundColor: '#FFFFFF',
                    border: '4px solid rgba(255, 255, 255, 0.95)',
                    boxShadow:
                        '0 3px 0 #FFFFFF, 0 6px 0 #F1F5F9, 0 10px 0 #E2E8F0, 0 14px 0 #CBD5E1, 0 18px 0 #94A3B8, 0 45px 120px rgba(15, 23, 42, 0.22), 0 18px 45px rgba(225, 29, 72, 0.12), inset 0 3px 8px rgba(255, 255, 255, 1)',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    height: DOCK_HEIGHT,
                }}
            >
                {/* Vệt sáng Glaze Sheen quét qua toàn bộ Dock */}
                {glazeOpacity > 0.01 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: `${glazeX}px`,
                            width: 420,
                            transform: 'skewX(-22deg)',
                            background:
                                'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.88) 50%, transparent 100%)',
                            opacity: glazeOpacity,
                        }}
                    />
                )}
            </div>

            {/* 2. KHUNG CHỨA BÊN TRONG CỦA DOCK (Chiều cao 640px) */}
            <div
                style={{
                    position: 'relative',
                    padding: '24px 88px',
                    height: DOCK_HEIGHT,
                    boxSizing: 'border-box',
                }}
            >
                {/* A. THẺ 0: HUY HIỆU BỘ CÔNG THƯƠNG (Xuất hiện trước để định vị) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 24,
                        left: 28,
                        right: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 18,
                        height: 72,
                        borderRadius: 36,
                        background: 'linear-gradient(90deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%)',
                        border: '2.5px solid rgba(255, 255, 255, 0.95)',
                        boxShadow:
                            '0 2px 0 #FECDD3, 0 5px 0 #FDA4AF, 0 8px 18px rgba(225, 29, 72, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.95)',
                    }}
                >
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: 19,
                            backgroundColor: '#E11D48',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.45)',
                        }}
                    >
                        <CheckCircle2 size={24} color="#FFFFFF" strokeWidth={3} />
                    </div>
                    <span
                        style={{
                            fontSize: 28,
                            fontWeight: 900,
                            color: '#BE123C',
                            letterSpacing: '0.04em',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            textTransform: 'uppercase',
                        }}
                    >
                        NỀN TẢNG UY TÍN ĐÃ ĐƯỢC XÁC NHẬN BỞI BỘ CÔNG THƯƠNG
                    </span>
                    <Sparkles size={28} color="#E11D48" />
                </div>

                {/* B. 3 GHOST SLOTS (KHUNG CHỜ NÉT ĐỨT SẴN SÀNG ĐÓN 3 THẺ ĐẬP XUỐNG) */}
                {SLOT_Y.map((y, idx) => {
                    const t = TIMING[idx];
                    // Khi thẻ đã tiếp đất xong, ẩn hoàn toàn ghost slot để triệt tiêu 100% Z-fighting
                    if (frame >= t.slamEnd) {
                        return null;
                    }
                    const ghostOpacity = interpolate(
                        frame,
                        [t.slamStart, t.slamEnd],
                        [1, 0],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <div
                            key={`ghost-${idx}`}
                            style={{
                                position: 'absolute',
                                top: y,
                                left: 28,
                                right: 28,
                                height: CARD_HEIGHT_DOCK,
                                borderRadius: 32,
                                border: '2.5px dashed rgba(225, 29, 72, 0.22)',
                                backgroundColor: 'rgba(255, 241, 242, 0.28)',
                                boxSizing: 'border-box',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 32px',
                                gap: 24,
                                pointerEvents: 'none',
                                opacity: ghostOpacity,
                            }}
                        >
                            <div
                                style={{
                                    width: 88,
                                    height: 88,
                                    borderRadius: 26,
                                    border: '2.5px dashed rgba(225, 29, 72, 0.25)',
                                }}
                            />
                            <div
                                style={{
                                    width: 320,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: 'rgba(225, 29, 72, 0.08)',
                                }}
                            />
                        </div>
                    );
                })}

                {/* C. 3 THẺ TÍNH NĂNG CHỦ LỰC VỚI HIỆU ỨNG 3D EXPLODED HERO + HIGHLIGHT */}
                {featureItems.map((item, idx) => {
                    const t = TIMING[idx];
                    const slotY = SLOT_Y[idx];

                    // Chưa đến frame bay ra của thẻ này
                    if (frame < t.flyStart) {
                        return null;
                    }

                    // TÍNH TOÁN HOVER PROGRESS MƯỢT MÀ TỪNG FRAME (Khử giật và bậc nhảy đột ngột)
                    const HOVER_TIMING = [
                        { start: 1730, end: 1780, easeIn: 10, easeOut: 8 },
                        { start: 1780, end: 1830, easeIn: 10, easeOut: 8 },
                        { start: 1830, end: 1880, easeIn: 10, easeOut: 8 },
                    ];
                    const ht = HOVER_TIMING[idx];
                    let hoverProgress = 0;
                    if (frame >= ht.start && frame < ht.end) {
                        if (frame < ht.start + ht.easeIn) {
                            hoverProgress = interpolate(frame, [ht.start, ht.start + ht.easeIn], [0, 1], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            });
                        } else if (frame > ht.end - ht.easeOut) {
                            hoverProgress = interpolate(frame, [ht.end - ht.easeOut, ht.end], [1, 0], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            });
                        } else {
                            hoverProgress = 1.0;
                        }
                    } else if (activeHoverIndex === item.id) {
                        hoverProgress = 1.0;
                    }

                    // TÍNH TOÁN VỊ TRÍ, SCALE, TRỤC Z VÀ GÓC XOAY 3D
                    let currentY = slotY;
                    let currentZ = 0;
                    let currentScale = 1.0;
                    let currentRotX = 0;
                    let currentRotY = 0;
                    let currentRotZ = 0;
                    let currentOpacity = 1.0;
                    let currentHeight = CARD_HEIGHT_DOCK;
                    let isHeroPhase = false;

                    // 1. Giai đoạn Fly-in (Bay từ dưới lên vị trí Hero giữa màn hình)
                    if (frame >= t.flyStart && frame < t.heroArrive) {
                        const p = interpolate(frame, [t.flyStart, t.heroArrive], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                        });
                        currentY = interpolate(p, [0, 1], [HERO_Y + 180, HERO_Y]);
                        currentZ = interpolate(p, [0, 1], [30, HERO_Z]);
                        currentScale = interpolate(p, [0, 1], [0.92, HERO_SCALE]);
                        currentRotX = interpolate(p, [0, 1], [22, HERO_ROTX]);
                        currentRotY = interpolate(p, [0, 1], [-14, HERO_ROTY]);
                        currentRotZ = interpolate(p, [0, 1], [-2, HERO_ROTZ]);
                        currentOpacity = interpolate(p, [0, 0.3, 1], [0, 1, 1]);
                        currentHeight = interpolate(p, [0, 1], [CARD_HEIGHT_DOCK, CARD_HEIGHT_HERO]);
                        isHeroPhase = true;
                    }
                    // 2. Giai đoạn Dừng Lơ Lửng 3D Hero Mid-Air (Giữ 35 frames để người xem chiêm ngưỡng)
                    else if (frame >= t.heroArrive && frame < t.slamStart) {
                        const floatWave = Math.sin((frame - t.heroArrive) * 0.12) * 3.5;
                        currentY = HERO_Y + floatWave;
                        currentZ = HERO_Z;
                        currentScale = HERO_SCALE;
                        currentRotX = HERO_ROTX;
                        currentRotY = HERO_ROTY;
                        currentRotZ = HERO_ROTZ;
                        currentOpacity = 1.0;
                        currentHeight = CARD_HEIGHT_HERO;
                        isHeroPhase = true;
                    }
                    // 3. Giai đoạn Lao xuống Đập Nén vào Dock (Slam Down)
                    else if (frame >= t.slamStart && frame < t.slamEnd) {
                        const slamEase = Easing.bezier(0.45, 0.05, 0.25, 1.12);
                        const p = interpolate(frame, [t.slamStart, t.slamEnd], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: slamEase,
                        });
                        currentY = interpolate(p, [0, 1], [HERO_Y, slotY]);
                        currentZ = interpolate(p, [0, 1], [HERO_Z, 0]);
                        currentScale = interpolate(p, [0, 1], [HERO_SCALE, 1.0]);
                        currentRotX = interpolate(p, [0, 1], [HERO_ROTX, 0]);
                        currentRotY = interpolate(p, [0, 1], [HERO_ROTY, 0]);
                        currentRotZ = interpolate(p, [0, 1], [HERO_ROTZ, 0]);
                        currentHeight = interpolate(p, [0, 1], [CARD_HEIGHT_HERO, CARD_HEIGHT_DOCK]);
                        currentOpacity = 1.0;
                    }
                    // 4. Giai đoạn Đã Yên Vị Trong Dock (Settled in Dock)
                    else {
                        currentY = slotY - hoverProgress * 3;
                        currentZ = 4 + hoverProgress * 28;
                        currentScale = 1.0 + hoverProgress * 0.012;
                        currentRotX = 0;
                        currentRotY = 0;
                        currentRotZ = 0;
                        currentOpacity = 1.0;
                        currentHeight = CARD_HEIGHT_DOCK;

                        // Xung lực Stack-Press: Khi các thẻ sau đập xuống, thẻ này bị nén lún rồi nảy hồi
                        for (let k = idx + 1; k < TIMING.length; k++) {
                            const cue = TIMING[k].slamEnd;
                            if (frame >= cue && frame <= cue + 8) {
                                const press = interpolate(frame, [cue, cue + 3, cue + 8], [0, 5.0, 0], {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                });
                                currentY += press;
                            }
                        }
                    }

                    // HIỆU ỨNG NỔI BẬT NỘI DUNG KHI Ở PHA 3D HERO SPOTLIGHT
                    // A. Vệt bút dạ quang (Highlighter marker sweep)
                    const hlProgress = interpolate(frame, [t.hlStart, t.hlEnd], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    });

                    // B. Hiệu ứng nhịp nảy chip quyền lợi (Sparkle Flash)
                    const sparkleProgress = interpolate(frame, [t.sparkleStart, t.sparkleEnd], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });
                    const chipPulseScale =
                        isHeroPhase && sparkleProgress > 0 && sparkleProgress < 1
                            ? 1 + Math.sin(sparkleProgress * Math.PI) * 0.18
                            : 1;

                    // C. Ánh quang quét dọc viền thẻ 3D (3D Edge Glint)
                    const edgeGlintProgress = interpolate(frame, [t.heroArrive + 4, t.slamStart - 2], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });
                    const glintX = interpolate(edgeGlintProgress, [0, 1], [-300, 2800]);

                    const isHovered = hoverProgress > 0.01;
                    const IconComponent = item.icon;

                    // Viền kép siêu mảnh 2px chuẩn Retina, màu sắc chuyển êm ái sang tone brand (khử răng cưa & không lem mực)
                    const borderColor = isHeroPhase
                        ? 'rgba(255, 255, 255, 0.98)'
                        : hoverProgress > 0.01
                          ? `rgba(${item.brandColorRgb}, ${0.16 + hoverProgress * 0.48})`
                          : 'rgba(226, 232, 240, 0.92)';

                    // Bóng đổ cao cấp nhiều tầng: Bỏ bóng đỏ cứng xếp tầng & quầng phát sáng 40px gây lem mực
                    // Thay bằng bóng đổ mềm sâu đa tầng (diffused ambient shadow) + phớt nhẹ ánh sáng môi trường 12%
                    const cardShadow = isHeroPhase
                        ? `0 3px 0 #FFFFFF, 0 7px 0 #F1F5F9, 0 12px 0 #E2E8F0, 0 16px 0 #CBD5E1, 0 20px 0 #94A3B8, 0 60px 160px rgba(0, 0, 0, 0.38), 0 24px 60px rgba(0, 0, 0, 0.22), 0 0 60px ${item.accentGlow}, inset 0 3px 8px rgba(255, 255, 255, 1)`
                        : hoverProgress > 0.01
                          ? `0 2px 0 #FFFFFF, 0 5px 0 #F1F5F9, 0 8px 0 #E2E8F0, 0 8px 20px rgba(15, 23, 42, ${0.05 + hoverProgress * 0.04}), 0 20px 48px rgba(15, 23, 42, ${0.08 + hoverProgress * 0.08}), 0 12px 30px rgba(${item.brandColorRgb}, ${hoverProgress * 0.12}), inset 0 2px 5px rgba(255, 255, 255, 1)`
                          : '0 2px 0 #FFFFFF, 0 4px 0 #F1F5F9, 0 7px 0 #E2E8F0, 0 6px 16px rgba(15, 23, 42, 0.05), 0 14px 30px rgba(15, 23, 42, 0.06), inset 0 2px 4px rgba(255, 255, 255, 0.95)';

                    return (
                        <div
                            key={item.id}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 28,
                                right: 28,
                                height: currentHeight,
                                transform: `translate3d(0, ${currentY}px, ${currentZ}px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${currentRotZ}deg) scale(${currentScale})`,
                                transformOrigin: 'center center',
                                opacity: currentOpacity,
                                zIndex: isHeroPhase ? 50 : isHovered ? 40 : 10 + idx,
                                borderRadius: isHeroPhase ? 40 : 32,
                                backgroundColor: '#FFFFFF',
                                border: `${isHeroPhase ? 4 : 2}px solid ${borderColor}`,
                                boxShadow: cardShadow,
                                display: 'flex',
                                alignItems: 'center',
                                padding: isHeroPhase ? '0 44px' : '0 36px',
                                gap: isHeroPhase ? 36 : 28,
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                                WebkitFontSmoothing: 'antialiased',
                            }}
                        >
                            {/* Ánh quang Edge Glint quét chéo khi ở pha Hero 3D */}
                            {isHeroPhase && edgeGlintProgress > 0 && edgeGlintProgress < 1 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: `${glintX}px`,
                                        width: 220,
                                        transform: 'skewX(-28deg)',
                                        background:
                                            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.92) 50%, transparent 100%)',
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}

                            {/* 1. Icon khối 3D rực rỡ cỡ lớn */}
                            <div
                                style={{
                                    width: isHeroPhase ? 128 : 88,
                                    height: isHeroPhase ? 128 : 88,
                                    borderRadius: isHeroPhase ? 36 : 26,
                                    background: item.iconGrad,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: isHeroPhase
                                        ? `0 14px 32px ${item.accentGlow}`
                                        : `0 ${8 + hoverProgress * 4}px ${18 + hoverProgress * 8}px ${item.accentGlow}`,
                                    transform: !isHeroPhase && hoverProgress > 0.01 ? `scale(${1 + hoverProgress * 0.05})` : 'scale(1)',
                                    flexShrink: 0,
                                }}
                            >
                                <IconComponent
                                    size={isHeroPhase ? 68 : 46}
                                    color="#FFFFFF"
                                    strokeWidth={isHeroPhase ? 2.6 : 2.4}
                                />
                            </div>

                            {/* 2. Cụm Tiêu Đề & Mô Tả Cỡ Lớn */}
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: isHeroPhase ? 8 : 4,
                                    minWidth: 0,
                                }}
                            >
                                {/* Tiêu đề chính */}
                                <div
                                    style={{
                                        fontSize: isHeroPhase ? 48 : 44,
                                        fontWeight: 900,
                                        color: '#0F172A',
                                        letterSpacing: '-0.025em',
                                        lineHeight: 1.15,
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                >
                                    {item.title}
                                </div>

                                {/* Dòng mô tả & Vệt bút dạ quang Highlighter */}
                                <div
                                    style={{
                                        position: 'relative',
                                        fontSize: isHeroPhase ? 38 : 34,
                                        color: '#475569',
                                        lineHeight: 1.35,
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontWeight: 600,
                                        display: 'inline-block',
                                    }}
                                >
                                    <span>{item.descPrefix}</span>
                                    <span
                                        style={{
                                            position: 'relative',
                                            fontWeight: 800,
                                            color: isHeroPhase ? '#0F172A' : '#1E293B',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {/* Vệt Highlight Marker quét dưới chữ */}
                                        <span
                                            style={{
                                                position: 'absolute',
                                                bottom: 2,
                                                left: -4,
                                                width: isHeroPhase ? `${hlProgress * 102}%` : '100%',
                                                height: isHeroPhase ? 20 : 12,
                                                backgroundColor: item.hlBg,
                                                borderRadius: 6,
                                                zIndex: -1,
                                            }}
                                        />
                                        {item.highlightText}
                                    </span>
                                </div>
                            </div>

                            {/* 3. Chip Quyền Lợi Nổi Bật Bên Phải Cỡ Lớn */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: isHeroPhase ? '16px 36px' : '14px 28px',
                                    borderRadius: isHeroPhase ? 28 : 24,
                                    backgroundColor: item.chipBg,
                                    color: item.chipColor,
                                    fontSize: isHeroPhase ? 34 : 28,
                                    fontWeight: 900,
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    letterSpacing: '-0.015em',
                                    border: `2px solid ${item.chipColor}33`,
                                    boxShadow: isHeroPhase
                                        ? `0 8px 24px ${item.chipColor}26`
                                        : hoverProgress > 0.01
                                          ? `0 4px 14px ${item.chipColor}20`
                                          : undefined,
                                    transform: `scale(${isHeroPhase ? chipPulseScale : 1 + hoverProgress * 0.03})`,
                                    transformOrigin: 'right center',
                                    flexShrink: 0,
                                }}
                            >
                                <span>{item.chip}</span>
                                {isHeroPhase && (
                                    <Star
                                        size={34}
                                        color={item.chipColor}
                                        fill={item.chipColor}
                                        style={{
                                            transform: `rotate(${sparkleProgress * 180}deg) scale(${1 + Math.sin(sparkleProgress * Math.PI) * 0.4})`,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
