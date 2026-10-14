import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import { ShieldCheck, BadgePercent, Zap, CheckCircle2, Sparkles, Star } from 'lucide-react';

interface DropdownStackPressProps {
    frame: number;
    fps: number;
    triggerFrame?: number; // 765: khi input bắt đầu dâng lên và mở khay
    activeHoverIndex?: number; // 1, 2, 3 khi chuột rà qua
    inputElevation?: number; // Tọa độ dâng lên của input (-600px)
}

export const DropdownStackPress: React.FC<DropdownStackPressProps> = ({
    frame,
    fps,
    triggerFrame = 765,
    activeHoverIndex = -1,
    inputElevation = -600,
}) => {
    // 1. Độ xuất hiện tổng thể của Khay Kính Mờ (Glass Dock)
    const dockEntrance = spring({
        frame: Math.max(0, frame - triggerFrame),
        fps,
        config: { damping: 14, mass: 0.8, stiffness: 120 },
    });

    if (dockEntrance <= 0.001) {
        return null;
    }

    // 2. TIMELINE ĐỒ HỌA 3D CHUYÊN SÂU (PHƯƠNG ÁN B: STAGGERED 3D HERO EXPLODED SEQUENCE)
    // - Frame 765 -> 790: Khay dock + Thẻ Huy hiệu Bộ Công Thương xuất hiện định vị
    // - Thẻ 1 (So sánh đa hãng):
    //   * Fly-in: 790 -> 810 (20f)
    //   * 3D Mid-Air Hero Hold & Highlight: 810 -> 845 (35f ~ 0.6s)
    //   * Slam Down & Stack-press: 845 -> 863 (18f)
    // - Thẻ 2 (Tiết kiệm chi phí):
    //   * Fly-in: 863 -> 883 (20f)
    //   * 3D Mid-Air Hero Hold & Highlight: 883 -> 918 (35f ~ 0.6s)
    //   * Slam Down & Stack-press: 918 -> 936 (18f)
    // - Thẻ 3 (Cấp đơn 1-chạm & Bảo mật):
    //   * Fly-in: 936 -> 956 (20f)
    //   * 3D Mid-Air Hero Hold & Highlight: 956 -> 991 (35f ~ 0.6s)
    //   * Slam Down & Stack-press: 991 -> 1009 (18f)
    // - Glaze Sheen quét qua cả khay: 1012 -> 1032
    const TIMING = [
        {
            // Thẻ 1
            flyStart: 790,
            heroArrive: 810,
            slamStart: 845,
            slamEnd: 863,
            hlStart: 814,
            hlEnd: 838,
            sparkleStart: 818,
            sparkleEnd: 842,
        },
        {
            // Thẻ 2
            flyStart: 863,
            heroArrive: 883,
            slamStart: 918,
            slamEnd: 936,
            hlStart: 887,
            hlEnd: 911,
            sparkleStart: 891,
            sparkleEnd: 915,
        },
        {
            // Thẻ 3
            flyStart: 936,
            heroArrive: 956,
            slamStart: 991,
            slamEnd: 1009,
            hlStart: 960,
            hlEnd: 984,
            sparkleStart: 964,
            sparkleEnd: 988,
        },
    ];

    // Xung lực Stack-Press cho cả khay dock khi các thẻ đập xuống
    const SLAM_CUES = [TIMING[0].slamEnd, TIMING[1].slamEnd, TIMING[2].slamEnd];
    let dockPressY = 0;
    for (const cue of SLAM_CUES) {
        if (frame >= cue && frame <= cue + 10) {
            const p = interpolate(frame, [cue, cue + 3, cue + 10], [0, 6.0, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.inOut(Easing.sin),
            });
            dockPressY = Math.max(dockPressY, p);
        }
    }

    // Vệt sáng Glaze Sheen quét qua toàn bộ khay sau khi Thẻ 3 đã tiếp đất
    const glazeStart = 1012;
    const glazeEnd = 1032;
    const glazeX = interpolate(frame, [glazeStart, glazeEnd], [-400, 3000], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.42, 0, 0.25, 1),
    });
    const glazeOpacity = interpolate(
        frame,
        [glazeStart, glazeStart + 4, glazeEnd - 4, glazeEnd],
        [0, 0.88, 0.88, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

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
        },
    ];

    // Tọa độ Y chuẩn của từng slot trong khay dock (được nâng cấp to lớn, thoải mái)
    // Huy hiệu: top 24px, cao 72px
    // Slot 1: top 116px, cao 144px
    // Slot 2: top 280px, cao 144px
    // Slot 3: top 444px, cao 144px
    // Total dock height: 612px
    const SLOT_Y = [116, 280, 444];
    const DOCK_WIDTH = 2560;
    const DOCK_HEIGHT = 612;
    const CARD_HEIGHT_DOCK = 144;
    const CARD_HEIGHT_HERO = 210;

    // Vị trí "3D Hero Mid-Air Spotlight" ở trung tâm màn hình (bên dưới khay dock đã dâng lên cao)
    const HERO_Y = 660; // Nằm ở giữa khoảng không rộng lớn bên dưới khay dock
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
                transform: `translate(-50%, ${dockPressY}px) scale(${dockEntrance})`,
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
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(36px)',
                    WebkitBackdropFilter: 'blur(36px)',
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

            {/* 2. KHUNG CHỨA BÊN TRONG CỦA DOCK (Chiều cao 612px) */}
            <div
                style={{
                    position: 'relative',
                    padding: '24px 28px',
                    height: DOCK_HEIGHT,
                    boxSizing: 'border-box',
                    transformStyle: 'preserve-3d',
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
                {SLOT_Y.map((y, idx) => (
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
                ))}

                {/* C. 3 THẺ TÍNH NĂNG CHỦ LỰC VỚI HIỆU ỨNG 3D EXPLODED HERO + HIGHLIGHT */}
                {featureItems.map((item, idx) => {
                    const t = TIMING[idx];
                    const slotY = SLOT_Y[idx];

                    // Chưa đến frame bay ra của thẻ này
                    if (frame < t.flyStart) {
                        return null;
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
                        currentY = slotY;
                        currentZ = 0;
                        currentScale = 1.0;
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

                        // Khi chuột rà qua thẻ này (Hover Elevation)
                        if (activeHoverIndex === item.id) {
                            currentZ = 52; // Nhấc bổng trục Z
                            currentScale = 1.025;
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

                    const isHovered = activeHoverIndex === item.id;
                    const IconComponent = item.icon;

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
                                transformStyle: 'preserve-3d',
                                opacity: currentOpacity,
                                zIndex: isHeroPhase ? 50 : isHovered ? 40 : 10 + idx,
                                borderRadius: isHeroPhase ? 40 : 32,
                                backgroundColor: '#FFFFFF',
                                border: isHovered
                                    ? '3px solid #E11D48'
                                    : isHeroPhase
                                    ? '4px solid rgba(255, 255, 255, 0.98)'
                                    : '2.5px solid rgba(225, 29, 72, 0.16)',
                                boxShadow: isHeroPhase
                                    ? `0 3px 0 #FFFFFF, 0 7px 0 #F1F5F9, 0 12px 0 #E2E8F0, 0 16px 0 #CBD5E1, 0 20px 0 #94A3B8, 0 60px 160px rgba(0, 0, 0, 0.38), 0 24px 60px rgba(0, 0, 0, 0.22), 0 0 60px ${item.accentGlow}, inset 0 3px 8px rgba(255, 255, 255, 1)`
                                    : isHovered
                                    ? `0 3px 0 #FFE4E6, 0 6px 0 #FECDD3, 0 10px 0 #FDA4AF, 0 24px 55px rgba(225, 29, 72, 0.24), 0 0 40px ${item.accentGlow}, inset 0 2px 6px rgba(255, 255, 255, 0.95)`
                                    : '0 2px 0 #F8FAFC, 0 5px 0 #E2E8F0, 0 8px 0 #CBD5E1, 0 12px 28px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.95)',
                                display: 'flex',
                                alignItems: 'center',
                                padding: isHeroPhase ? '0 44px' : '0 36px',
                                gap: isHeroPhase ? 36 : 28,
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                                transition: isHeroPhase ? 'none' : 'box-shadow 0.2s ease, border-color 0.2s ease',
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
                                        : `0 8px 18px ${item.accentGlow}`,
                                    flexShrink: 0,
                                    transition: 'all 0.15s ease-out',
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
                                        fontSize: isHeroPhase ? 48 : 38,
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
                                        fontSize: isHeroPhase ? 34 : 27,
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
                                                transition: 'width 0.05s linear',
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
                                    boxShadow: isHeroPhase ? `0 8px 24px ${item.chipColor}26` : undefined,
                                    transform: `scale(${chipPulseScale})`,
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
