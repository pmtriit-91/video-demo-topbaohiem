import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, Img } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';
import { PaperCard } from '../../ui/v2/PaperCard';
import { PaperCloud } from '../../ui/v2/PaperCloud';

export const Scene1_ProblemSnap: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    // Stop-motion frame jitter nhẹ mô phỏng hoạt hình giấy thủ công 12fps/24fps feel
    const jitterX = Math.sin(frame * 0.4) * 2;
    const jitterY = Math.cos(frame * 0.3) * 2;

    // 1. NHỊP 1: 3 THẺ CÂU HỎI TRƯỢT VÀO LỆCH NHỊP (Frames 0 - 480 ~ 0s - 8s)
    const card1Spring = spring({
        frame: frame - 15,
        fps,
        config: { damping: 14, stiffness: 90 },
    });
    const card2Spring = spring({
        frame: frame - 45,
        fps,
        config: { damping: 14, stiffness: 90 },
    });
    const card3Spring = spring({
        frame: frame - 75,
        fps,
        config: { damping: 14, stiffness: 90 },
    });

    // Chuyển động thở của nhân vật
    const charBreathing = Math.sin(frame * 0.08) * 8;
    const charScale = 1 + Math.sin(frame * 0.06) * 0.015;

    // 2. NHỊP 2: Ý TƯỞNG EUREKA BÙNG SÁNG (Frames 480 - 690 ~ 8s - 11.5s)
    const eurekaFrame = frame - 480;
    const eurekaSpring = spring({
        frame: eurekaFrame,
        fps,
        config: { damping: 11, stiffness: 150 },
    });
    const starRotation = (frame * 2.5) % 360;

    // 3. NHỊP 3: CÚ BÚNG TAY SNAP! (Frames 690 - 840 ~ 11.5s - 14s)
    const snapFrame = frame - 690;
    const isSnap = snapFrame >= 0;

    const snapSpring = spring({
        frame: snapFrame,
        fps,
        config: { damping: 10, stiffness: 220 },
    });

    // Sóng năng lượng hồng mở rộng sau cú búng tay
    const shockwaveRadius = interpolate(snapFrame, [0, 50], [0, 3200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const shockwaveOpacity = interpolate(snapFrame, [0, 15, 50], [0.95, 0.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Thu nhỏ các thẻ câu hỏi khi búng tay để nhường chỗ cho Cảnh 2
    const cardsExitScale = interpolate(snapFrame, [0, 30], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chuyển tiếp trắng/hồng mềm sang Cảnh 2 (Frames 800 - 840)
    const fadeToScene2 = interpolate(frame, [800, 840], [0, 1], {
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
            {/* 1. NỀN GIẤY PAPER-CRAFT (Radial Soft Pink & Dấu Chấm Bi Thủ Công) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 40%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(${colors.brandPink}22 2px, transparent 2px)`,
                    backgroundSize: '44px 44px',
                    opacity: 0.5,
                }}
            />

            {/* 2. CÁC ĐÁM MÂY GIẤY TRÔI PARALLAX NHẸ NHÀNG */}
            <PaperCloud x={120} y={140} scale={1.4} speed={0.4} opacity={0.9} />
            <PaperCloud x={3100} y={180} scale={1.6} speed={0.3} opacity={0.85} />
            <PaperCloud x={3200} y={950} scale={1.1} speed={0.5} opacity={0.65} />
            <PaperCloud x={400} y={1400} scale={1.3} speed={0.35} opacity={0.7} />

            {/* 3. HEADER ĐỊNH VỊ CHƯƠNG */}
            <div
                style={{
                    position: 'absolute',
                    top: 70,
                    left: 100,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                }}
            >
                <div
                    style={{
                        backgroundColor: colors.brandPink,
                        color: colors.bgWhite,
                        padding: '8px 24px',
                        borderRadius: 99,
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: '1px',
                        boxShadow: '0 6px 16px rgba(225, 29, 72, 0.3)',
                    }}
                >
                    CẢNH 1
                </div>
                <div
                    style={{
                        fontSize: 32,
                        fontWeight: 800,
                        color: colors.textPrimary,
                    }}
                >
                    Băn khoăn $\rightarrow$ Búng tay
                </div>
            </div>

            {/* 3.5. DẢI CÁNH GIẤY GẤP NỔI KHỐI ORIGAMI PHÍA PHẢI (PAPER RIBBON WING) */}
            <div
                style={{
                    position: 'absolute',
                    top: 140,
                    right: -40,
                    width: 1480,
                    height: 1640,
                    pointerEvents: 'none',
                    transform: `translateY(${Math.sin(frame * 0.05) * 6 + jitterY}px) rotate(${Math.cos(frame * 0.03) * 0.6}deg)`,
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
                    }}
                />
            </div>

            {/* 4. KHỐI TRUNG TÂM: MẢNH GHÉP NHÂN VẬT 2.5D ÁO HỒNG TÁCH RỜI */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 120,
                    left: '50%',
                    transform: `translateX(-50%) translateY(${charBreathing + jitterY}px) scale(${charScale})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    filter: 'drop-shadow(0 30px 45px rgba(225, 29, 72, 0.22)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))',
                }}
            >
                {/* Hình ảnh nhân vật chính áo hồng */}
                <div
                    style={{
                        width: 720,
                        height: 1080,
                        position: 'relative',
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

                    {/* Dấu chấm hỏi giấy xoay quanh đầu nhân vật khi đang phân vân (Frames 0 - 480) */}
                    {frame < 480 && (
                        <>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 100,
                                    left: 80,
                                    fontSize: 72,
                                    color: colors.brandPink,
                                    fontWeight: 900,
                                    transform: `rotate(${Math.sin(frame * 0.1) * 15}deg)`,
                                    filter: 'drop-shadow(0 4px 10px rgba(225, 29, 72, 0.3))',
                                }}
                            >
                                ❓
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 60,
                                    right: 120,
                                    fontSize: 64,
                                    color: colors.accentYellow,
                                    fontWeight: 900,
                                    transform: `rotate(${Math.cos(frame * 0.1) * 15}deg)`,
                                    filter: 'drop-shadow(0 4px 10px rgba(251, 191, 36, 0.4))',
                                }}
                            >
                                💭
                            </div>
                        </>
                    )}

                    {/* NGÔI SAO Ý TƯỞNG EUREKA BÙNG LÊN TRÊN ĐẦU (Frames 480+) */}
                    {frame >= 480 && (
                        <div
                            style={{
                                position: 'absolute',
                                top: -40,
                                right: 80,
                                transform: `scale(${eurekaSpring}) rotate(${starRotation}deg)`,
                                opacity: eurekaSpring,
                                pointerEvents: 'none',
                                filter: 'drop-shadow(0 15px 30px rgba(225, 29, 72, 0.5))',
                            }}
                        >
                            <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
                                <polygon
                                    points="100,10 125,70 190,75 140,120 155,185 100,150 45,185 60,120 10,75 75,70"
                                    fill="#E11D48"
                                    stroke="#FFFFFF"
                                    strokeWidth="8"
                                />
                                <circle cx="100" cy="100" r="32" fill="#FBBF24" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. 3 MẢNH GHÉP THẺ BÀI CÂU HỎI CẮT GIẤY THỦ CÔNG (ĐỘC LẬP) */}
            {/* THẺ 1: Chọn loại nào? (Góc trái trên) */}
            <div
                style={{
                    position: 'absolute',
                    top: 360,
                    left: interpolate(card1Spring, [0, 1], [-600, 320]),
                    opacity: card1Spring,
                    transform: `scale(${cardsExitScale})`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <PaperCard
                    title="Chọn loại nào?"
                    subtitle="Quá nhiều hãng & biểu phí rối rắm"
                    icon="❓"
                    badge="Bối rối"
                    angle={-6}
                    wiggle={true}
                    style={{ width: 560 }}
                />
            </div>

            {/* THẺ 2: Quyền lợi ra sao? (Góc phải giữa) */}
            <div
                style={{
                    position: 'absolute',
                    top: 540,
                    right: interpolate(card2Spring, [0, 1], [-600, 340]),
                    opacity: card2Spring,
                    transform: `scale(${cardsExitScale})`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <PaperCard
                    title="Quyền lợi ra sao?"
                    subtitle="Điều khoản dài dòng khó nắm bắt"
                    icon="📑"
                    badge="Phức tạp"
                    angle={5}
                    wiggle={true}
                    accentColor={colors.accentYellow}
                    style={{ width: 580 }}
                />
            </div>

            {/* THẺ 3: Thủ tục có phức tạp không? (Góc trái dưới) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 300,
                    left: interpolate(card3Spring, [0, 1], [-600, 420]),
                    opacity: card3Spring,
                    transform: `scale(${cardsExitScale})`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <PaperCard
                    title="Thủ tục phức tạp?"
                    subtitle="Giấy tờ thủ công, bồi thường chậm"
                    icon="⏳"
                    badge="Lo lắng"
                    angle={-3}
                    wiggle={true}
                    style={{ width: 590 }}
                />
            </div>

            {/* 6. BANNER PHỤ ĐỀ VOICE-OVER CHUẨN THEO KỊCH BẢN (CHÂN MÀN HÌNH) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 60,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(12px)',
                        color: colors.bgWhite,
                        padding: '16px 48px',
                        borderRadius: 99,
                        fontSize: 28,
                        fontWeight: 700,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        maxWidth: 1600,
                        textAlign: 'center',
                    }}
                >
                    {frame < 480
                        ? '“Mình muốn mua bảo hiểm, nhưng chưa biết nên chọn loại nào. Càng tìm hiểu càng dễ bị rối...”'
                        : frame < 690
                          ? '“Khoan! Mình có thể bắt đầu đơn giản hơn với TOPbaohiem.”'
                          : '“BÚNG TAY ĐỂ BẮT ĐẦU — TOPBAOHIEM.VN!”'}
                </div>
            </div>

            {/* 7. HIỆU ỨNG BÚNG TAY SNAP! BÙNG NỔ SÓNG NĂNG LƯỢNG HỒNG (Frames 690 - 840) */}
            {isSnap && (
                <>
                    {/* Vòng tròn sóng hồng bung tỏa toàn màn hình */}
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

                    {/* Thẻ SNAP! BÚNG TAY ĐỂ BẮT ĐẦU */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '42%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${snapSpring})`,
                            backgroundColor: colors.brandPink,
                            color: colors.bgWhite,
                            padding: '28px 72px',
                            borderRadius: 40,
                            boxShadow: '0 30px 80px rgba(225, 29, 72, 0.55), 0 10px 25px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 28,
                            border: `5px solid ${colors.bgWhite}`,
                            pointerEvents: 'none',
                        }}
                    >
                        <span style={{ fontSize: 72 }}>✨</span>
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontSize: 60,
                                    fontWeight: 900,
                                    letterSpacing: '-1.5px',
                                    lineHeight: 1.1,
                                }}
                            >
                                BÚNG TAY ĐỂ BẮT ĐẦU!
                            </div>
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 700,
                                    letterSpacing: '3px',
                                    opacity: 0.95,
                                    textTransform: 'uppercase',
                                    marginTop: 8,
                                }}
                            >
                                TOPbaohiem.vn
                            </div>
                        </div>
                        <span style={{ fontSize: 72 }}>🤌</span>
                    </div>
                </>
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
    );
};
