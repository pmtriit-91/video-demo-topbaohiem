import React from 'react';
import { interpolate, spring, Easing } from 'remotion';
import { ShieldCheck, BadgePercent, Zap, CheckCircle2, Sparkles } from 'lucide-react';

interface DropdownStackPressProps {
    frame: number;
    fps: number;
    triggerFrame?: number; // Mặc định là 735 (khi chữ topbaohiem vừa gõ xong)
    activeHoverIndex?: number; // Index thẻ đang được chuột rà qua (0, 1, 2, 3)
}

export const DropdownStackPress: React.FC<DropdownStackPressProps> = ({
    frame,
    fps,
    triggerFrame = 735,
    activeHoverIndex = -1,
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

    // 2. CUES VÀ NHỊP STACK-PRESS (Kế thừa từ video-shotcraft: list-stack-press)
    // 4 thẻ lần lượt rơi vào vị trí:
    // Thẻ 0: Frame triggerFrame + 4 (Huy hiệu Bộ Công Thương)
    // Thẻ 1: Frame triggerFrame + 18 (So sánh đa hãng)
    // Thẻ 2: Frame triggerFrame + 32 (Tiết kiệm chi phí)
    // Thẻ 3: Frame triggerFrame + 46 (Cấp đơn 1-chạm & An toàn)
    const CUES = [
        triggerFrame + 4,
        triggerFrame + 18,
        triggerFrame + 32,
        triggerFrame + 46,
    ];
    const DUR = 14;
    const FLY_EASE = Easing.bezier(0.35, 0.05, 0.22, 1.15); // Overshoot nhẹ đàn hồi

    // Tính toán xung lực Stack Press cho cả khay đỡ (khi thẻ mới rơi xuống, cả khay nhún xuống rồi nảy hồi)
    let dockPressY = 0;
    for (let i = 1; i < CUES.length; i++) {
        const cue = CUES[i];
        if (frame >= cue && frame <= cue + 10) {
            const p = interpolate(frame, [cue, cue + 3, cue + 10], [0, 5.5, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.inOut(Easing.sin),
            });
            dockPressY = Math.max(dockPressY, p);
        }
    }

    // Vệt sáng Glaze Sheen quét qua toàn bộ khay sau khi thẻ cuối cùng đã tiếp đất
    const glazeStart = CUES[3] + DUR + 2;
    const glazeEnd = glazeStart + 18;
    const glazeX = interpolate(frame, [glazeStart, glazeEnd], [-300, 2200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.42, 0, 0.25, 1),
    });
    const glazeOpacity = interpolate(
        frame,
        [glazeStart, glazeStart + 4, glazeEnd - 4, glazeEnd],
        [0, 0.85, 0.85, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Dữ liệu 4 thẻ
    const items = [
        {
            type: 'badge',
            title: 'NỀN TẢNG UY TÍN ĐÃ ĐƯỢC XÁC NHẬN BỞI BỘ CÔNG THƯƠNG',
        },
        {
            type: 'feature',
            icon: ShieldCheck,
            title: 'So sánh đa hãng dễ dàng',
            desc: 'Minh bạch quyền lợi 15+ công ty bảo hiểm hàng đầu trong 30 giây',
            chip: '⚡ So sánh 30s',
            chipColor: '#059669',
            chipBg: '#ECFDF5',
        },
        {
            type: 'feature',
            icon: BadgePercent,
            title: 'Tiết kiệm chi phí tối đa',
            desc: 'Giá gốc trực tiếp từ nhà bảo hiểm, chiết khấu tới 25%, không phí ẩn',
            chip: '💰 Giá gốc trực tiếp',
            chipColor: '#E11D48',
            chipBg: '#FFF1F2',
        },
        {
            type: 'feature',
            icon: Zap,
            title: 'Cấp đơn 1-chạm & An toàn bảo mật',
            desc: 'Chứng nhận điện tử tức thì chuẩn Bộ Tài Chính, hỗ trợ bồi thường 24/7',
            chip: '🛡️ Bảo mật 100%',
            chipColor: '#2563EB',
            chipBg: '#EFF6FF',
        },
    ];

    return (
        <div
            style={{
                position: 'absolute',
                top: 'calc(50% + 102px)',
                left: '50%',
                transform: `translate(-50%, ${dockPressY}px) scale(${dockEntrance})`,
                transformOrigin: 'top center',
                width: 1840,
                transformStyle: 'preserve-3d',
                zIndex: 38,
            }}
        >
            {/* Lớp nền Kính Mờ (Glass Dock Plate) có overflow: hidden riêng cho vệt Glaze Sheen */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 42,
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    border: '3px solid rgba(225, 29, 72, 0.22)',
                    boxShadow:
                        '0 40px 100px rgba(0, 0, 0, 0.16), 0 15px 40px rgba(225, 29, 72, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.95)',
                    overflow: 'hidden',
                    pointerEvents: 'none',
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
                            width: 280,
                            transform: 'skewX(-22deg)',
                            background:
                                'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.75) 50%, transparent 100%)',
                            opacity: glazeOpacity,
                        }}
                    />
                )}
            </div>

            {/* Khung chứa các thẻ Dropdown 3D Stack-Press */}
            <div
                style={{
                    position: 'relative',
                    padding: '20px 24px 22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    transformStyle: 'preserve-3d',
                }}
            >


            {/* 4 THẺ 3D MODULAR RƠI VÀO VỊ TRÍ */}
            {items.map((item, idx) => {
                const cue = CUES[idx];
                const cardProgress = interpolate(frame, [cue, cue + DUR], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: FLY_EASE,
                });

                // Nếu chưa tới frame của thẻ này thì ẩn
                if (frame < cue) {
                    return null;
                }

                // Chuyển động 3D rơi từ trên cao và trục Z xuống vị trí phẳng (Kỹ thuật space-camera exploded-view)
                const flyY = (1 - cardProgress) * 55; // Bay từ trên xuống 55px
                const flyZ = (1 - cardProgress) * 120; // Cao độ Z ban đầu 120px
                const flyRotX = (1 - cardProgress) * 16; // Nghiêng 16 độ
                const cardOpacity = interpolate(cardProgress, [0, 0.25, 1], [0, 1, 1]);

                // Xung lực riêng của thẻ khi các thẻ sau rơi xuống
                let cardSelfPress = 0;
                for (let j = idx + 1; j < CUES.length; j++) {
                    const nextCue = CUES[j];
                    if (frame >= nextCue && frame <= nextCue + 8) {
                        const p = interpolate(frame, [nextCue, nextCue + 3, nextCue + 8], [0, 4.5, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: Easing.inOut(Easing.sin),
                        });
                        cardSelfPress = Math.max(cardSelfPress, p);
                    }
                }

                // Hiệu ứng hover khi con trỏ chuột rà qua (Độ nhấc Z thực thụ 55px theo góc máy 2.5D)
                const isHovered = activeHoverIndex === idx;
                const hoverZ = isHovered ? 55 : 0;
                const targetZ = flyZ + hoverZ;

                if (item.type === 'badge') {
                    return (
                        <div
                            key={idx}
                            style={{
                                transform: `translateY(${flyY + cardSelfPress}px) translateZ(${targetZ}px) rotateX(${flyRotX}deg)`,
                                opacity: cardOpacity,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 14,
                                height: 56,
                                borderRadius: 28,
                                background: 'linear-gradient(90deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%)',
                                border: '1.5px solid rgba(225, 29, 72, 0.3)',
                                boxShadow: isHovered
                                    ? '0 12px 28px rgba(225, 29, 72, 0.3), 0 4px 10px rgba(0,0,0,0.06)'
                                    : '0 4px 12px rgba(225, 29, 72, 0.08)',
                                transformOrigin: 'center center',
                                transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    backgroundColor: '#E11D48',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 10px rgba(225, 29, 72, 0.4)',
                                }}
                            >
                                <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={3} />
                            </div>
                            <span
                                style={{
                                    fontSize: 24,
                                    fontWeight: 900,
                                    color: '#BE123C',
                                    letterSpacing: '0.04em',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    textTransform: 'uppercase',
                                }}
                            >
                                {item.title}
                            </span>
                            <Sparkles size={22} color="#E11D48" />
                        </div>
                    );
                }

                const IconComponent = item.icon || ShieldCheck;

                return (
                    <div
                        key={idx}
                        style={{
                            transform: `translateY(${flyY + cardSelfPress}px) translateZ(${targetZ}px) rotateX(${flyRotX}deg) scale(${isHovered ? 1.02 : 1})`,
                            opacity: cardOpacity,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 22,
                            padding: '16px 24px',
                            borderRadius: 24,
                            backgroundColor: isHovered ? 'rgba(255, 241, 242, 0.72)' : '#FFFFFF',
                            border: isHovered
                                ? '2px solid rgba(225, 29, 72, 0.5)'
                                : '1.5px solid rgba(226, 232, 240, 0.85)',
                            boxShadow: isHovered
                                ? '0 24px 55px rgba(225, 29, 72, 0.22), 0 8px 20px rgba(0, 0, 0, 0.08)'
                                : '0 6px 16px rgba(0, 0, 0, 0.04)',
                            transformOrigin: 'center center',
                            transition: 'all 0.14s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                    >
                        {/* Icon tròn nổi khối 3D */}
                        <div
                            style={{
                                width: 62,
                                height: 62,
                                borderRadius: 20,
                                background: 'linear-gradient(135deg, #FF2E79 0%, #ED017C 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 18px rgba(237, 1, 124, 0.32)',
                                flexShrink: 0,
                            }}
                        >
                            <IconComponent size={34} color="#FFFFFF" strokeWidth={2.6} />
                        </div>

                        {/* Tiêu đề & Phụ đề giải pháp */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 800,
                                    color: '#0F172A',
                                    letterSpacing: '-0.015em',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                }}
                            >
                                {item.title}
                            </div>
                            <div
                                style={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    color: '#64748B',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    lineHeight: 1.25,
                                }}
                            >
                                {item.desc}
                            </div>
                        </div>

                        {/* Chip nổi bật bên phải */}
                        <div
                            style={{
                                padding: '8px 20px',
                                borderRadius: 99,
                                backgroundColor: item.chipBg,
                                color: item.chipColor,
                                fontSize: 20,
                                fontWeight: 800,
                                letterSpacing: '0.02em',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                flexShrink: 0,
                                border: `1px solid ${item.chipColor}33`,
                            }}
                        >
                            {item.chip}
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
};
