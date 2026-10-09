import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Sequence, Img, staticFile, Easing } from 'remotion';
import {
    Sparkles,
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    Plane,
    Car,
    Heart,
    Flame,
    LayoutDashboard,
    FileCheck,
    Users,
    Smartphone,
    Laptop,
    Zap,
    TrendingUp,
    Lightbulb,
    Scan,
    QrCode,
    Building2,
    ChevronRight,
    Award,
    Eye
} from 'lucide-react';
import { Scene0ProblemHook } from './Scene0ProblemHook';

// =========================================================================
// CẤU HÌNH TIMELINE 6 HỒI KỊCH BẢN MASTER (TOTAL: 2600 FRAMES @ 60FPS ~ 43.3S)
// =========================================================================
export const ACT_TIMINGS = {
    act1_pain: { start: 0, duration: 660, label: '1. Băn Khoăn' },
    act2_snap: { start: 660, duration: 240, label: '2. Búng Tay Snap' },
    act3_vignettes: { start: 900, duration: 520, label: '3. Tiểu Cảnh Vui Nhộn' },
    act4_frontend: { start: 1420, duration: 420, label: '4. Website 1-Chạm' },
    act5_cms: { start: 1840, duration: 460, label: '5. Cỗ Máy CMS Ngầm' },
    act6_outro: { start: 2300, duration: 300, label: '6. Outro & Đầu Tư' },
};

export const MasterStoryboardDraft: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const is4K = width >= 3840;
    const s = is4K ? 1 : width / 3840;

    // Xác định Hồi hiện tại
    const getCurrentActIndex = () => {
        if (frame < 660) return 0;
        if (frame < 900) return 1;
        if (frame < 1420) return 2;
        if (frame < 1840) return 3;
        if (frame < 2300) return 4;
        return 5;
    };
    const currentActIndex = getCurrentActIndex();

    const ACT_KEYS = [
        ACT_TIMINGS.act1_pain,
        ACT_TIMINGS.act2_snap,
        ACT_TIMINGS.act3_vignettes,
        ACT_TIMINGS.act4_frontend,
        ACT_TIMINGS.act5_cms,
        ACT_TIMINGS.act6_outro,
    ];

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#070b14',
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                color: '#ffffff',
            }}
        >
            {/* =========================================================================
                LỚP TRÌNH DIỄN NỘI DUNG 6 HỒI
               ========================================================================= */}

            {/* HỒI 1: BĂN KHOĂN CỦA KHÁCH HÀNG (0 -> 660) */}
            {frame < 660 && (
                <div style={{ position: 'absolute', inset: 0 }}>
                    <Scene0ProblemHook />
                </div>
            )}

            {/* HỒI 2: CÚ BÚNG TAY EUREKA SNAP & THỨC TỈNH MACBOOK 3D (660 -> 900) */}
            {frame >= 660 && frame < 900 && (
                <Act2EurekaSnap frame={frame - 660} fps={fps} s={s} width={width} height={height} />
            )}

            {/* HỒI 3: CÁC TIỂU CẢNH BẢO HIỂM ĐỜI THƯỜNG VUI NHỘN (900 -> 1420) */}
            {frame >= 900 && frame < 1420 && (
                <Act3Vignettes frame={frame - 900} fps={fps} s={s} width={width} height={height} />
            )}

            {/* HỒI 4: QUY TRÌNH MUA 1-CHẠM TRÊN WEBSITE THẬT (1420 -> 1840) */}
            {frame >= 1420 && frame < 1840 && (
                <Act4Frontend1Touch frame={frame - 1420} fps={fps} s={s} width={width} height={height} />
            )}

            {/* HỒI 5: CỖ MÁY CMS VẬN HÀNH NGẦM PHÍA SAU (1840 -> 2300) */}
            {frame >= 1840 && frame < 2300 && (
                <Act5CMSDashboard frame={frame - 1840} fps={fps} s={s} width={width} height={height} />
            )}

            {/* HỒI 6: OUTRO & ĐẦU TƯ SỞ HỮU HỆ THỐNG TRỌN GÓI (2300 -> 2600) */}
            {frame >= 2300 && (
                <Act6OutroCTA frame={frame - 2300} fps={fps} s={s} width={width} height={height} />
            )}

            {/* =========================================================================
                HUD TIMELINE TRACKER TRÊN CÙNG (MASTER SCRIPT NAVIGATION BAR)
               ========================================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: 40 * s,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16 * s,
                    padding: `${14 * s}px ${28 * s}px`,
                    background: 'rgba(10, 16, 30, 0.88)',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 999,
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(237, 1, 124, 0.15)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 * s, marginRight: 12 * s }}>
                    <div
                        style={{
                            width: 10 * s,
                            height: 10 * s,
                            borderRadius: '50%',
                            background: '#ed017c',
                            boxShadow: '0 0 12px #ed017c',
                        }}
                    />
                    <span style={{ fontSize: 16 * s, fontWeight: 800, letterSpacing: '0.08em', color: '#ed017c' }}>
                        TOPBAOHIEM MASTER STORYBOARD
                    </span>
                </div>

                {ACT_KEYS.map((act, idx) => {
                    const isActive = idx === currentActIndex;
                    const isPassed = idx < currentActIndex;
                    return (
                        <div
                            key={act.label}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10 * s,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8 * s,
                                    padding: `${8 * s}px ${18 * s}px`,
                                    borderRadius: 999,
                                    background: isActive
                                        ? 'linear-gradient(135deg, #ed017c 0%, #a20050 100%)'
                                        : isPassed
                                          ? 'rgba(255, 255, 255, 0.08)'
                                          : 'rgba(255, 255, 255, 0.03)',
                                    color: isActive ? '#ffffff' : isPassed ? '#94a3b8' : '#475569',
                                    border: isActive
                                        ? '1px solid rgba(255, 255, 255, 0.4)'
                                        : '1px solid transparent',
                                    fontWeight: isActive ? 800 : 600,
                                    fontSize: 14 * s,
                                    transition: 'all 0.3s ease',
                                    boxShadow: isActive ? '0 0 20px rgba(237, 1, 124, 0.5)' : 'none',
                                }}
                            >
                                <span>{act.label}</span>
                            </div>
                            {idx < ACT_KEYS.length - 1 && (
                                <ChevronRight size={14 * s} color={isPassed ? '#ed017c' : 'rgba(255, 255, 255, 0.15)'} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// =========================================================================
// HỒI 2: CÚ BÚNG TAY EUREKA SNAP & THỨC TỈNH MACBOOK (FRAME 0 -> 240)
// =========================================================================
const Act2EurekaSnap: React.FC<{ frame: number; fps: number; s: number; width: number; height: number }> = ({
    frame,
    fps,
    s,
    width,
    height,
}) => {
    const shockwaveScale = interpolate(frame, [40, 110], [0, 2.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.1, 0.8, 0.2, 1),
    });
    const shockwaveOpacity = interpolate(frame, [40, 110], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const lightbulbPop = spring({
        frame: Math.max(0, frame - 10),
        fps,
        config: { damping: 10, mass: 0.7 },
    });

    const macbookScale = spring({
        frame: Math.max(0, frame - 70),
        fps,
        config: { damping: 14, mass: 1 },
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #1b0a24 0%, #070b14 70%)',
            }}
        >
            {/* Vòng sóng xung kích Búng tay màu hồng */}
            <div
                style={{
                    position: 'absolute',
                    width: 1400 * s,
                    height: 1400 * s,
                    borderRadius: '50%',
                    border: `${6 * s}px solid #ed017c`,
                    boxShadow: '0 0 80px #ed017c, inset 0 0 60px #ed017c',
                    transform: `scale(${shockwaveScale})`,
                    opacity: shockwaveOpacity,
                    pointerEvents: 'none',
                }}
            />

            {/* Pha 1: Khoảnh khắc búng tay (Frame 0 - 80) */}
            {frame < 85 && (
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 24 * s,
                        transform: `scale(${interpolate(frame, [0, 80], [0.95, 1.05])})`,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16 * s,
                            transform: `scale(${lightbulbPop})`,
                            background: 'rgba(237, 1, 124, 0.15)',
                            border: '2px solid #ed017c',
                            padding: `${16 * s}px ${36 * s}px`,
                            borderRadius: 999,
                            boxShadow: '0 0 50px rgba(237, 1, 124, 0.6)',
                        }}
                    >
                        <Lightbulb size={48 * s} color="#fbbf24" style={{ filter: 'drop-shadow(0 0 20px #fbbf24)' }} />
                        <span style={{ fontSize: 36 * s, fontWeight: 900, color: '#ffffff' }}>
                            AHA! BÚNG TAY TÌM RA GIẢI PHÁP
                        </span>
                    </div>

                    <h1
                        style={{
                            fontSize: 72 * s,
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            textAlign: 'center',
                            margin: 0,
                            background: 'linear-gradient(135deg, #ffffff 30%, #ed017c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        CÓ TOPBAOHIEM — MỌI THỨ CỰC KỲ ĐƠN GIẢN!
                    </h1>
                </div>
            )}

            {/* Pha 2: MacBook xuất hiện mở nắp (Frame 70 -> 240) */}
            {frame >= 70 && (
                <div
                    style={{
                        position: 'relative',
                        width: 2200 * s * 0.9,
                        height: 1340 * s * 0.9,
                        transform: `scale(${macbookScale})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Img
                        src={staticFile('assets/trangchu/topbaohiem_full_macbook.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 40px 100px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 60px rgba(237, 1, 124, 0.3))',
                        }}
                    />

                    {/* Badge thông báo mở nắp thành công */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 60 * s,
                            background: 'rgba(7, 11, 20, 0.92)',
                            backdropFilter: 'blur(20px)',
                            border: '1.5px solid rgba(237, 1, 124, 0.6)',
                            padding: `${16 * s}px ${32 * s}px`,
                            borderRadius: 999,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14 * s,
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        <Sparkles size={28 * s} color="#ed017c" />
                        <span style={{ fontSize: 24 * s, fontWeight: 800, color: '#ffffff' }}>
                            Màn hình Liquid Retina 90° thức giấc • Cổng bán bảo hiểm trực tuyến 1-chạm
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

// =========================================================================
// HỒI 3: CÁC TIỂU CẢNH BẢO HIỂM VUI NHỘN (FRAME 0 -> 520)
// =========================================================================
const Act3Vignettes: React.FC<{ frame: number; fps: number; s: number; width: number; height: number }> = ({
    frame,
    fps,
    s,
    width,
    height,
}) => {
    const currentSubBeat = frame < 170 ? 0 : frame < 340 ? 1 : 2;

    const cards = [
        {
            title: 'BẢO HIỂM DU LỊCH QUỐC TẾ & NỘI ĐỊA',
            subtitle: 'Câu chuyện vali, vé máy bay & hành trình an tâm trọn vẹn',
            badge: 'CHUẨN VISA SCHENGEN / MỸ',
            icon: Plane,
            color: '#06b6d4',
            image: 'assets/trangchu/travel_insurance.png',
            bullets: [
                '✈️ Bảo vệ chuyến bay, thất lạc hành lý toàn cầu',
                '🏥 Hỗ trợ y tế khẩn cấp 24/7 không giới hạn',
                '💳 Cấp hợp đồng điện tử song ngữ tích tắc',
            ],
        },
        {
            title: 'BẢO HIỂM TNDS & VẬT CHẤT XE CỘ',
            subtitle: 'Lưu thông vững vàng, loại bỏ mọi âu lo va quẹt rủi ro',
            badge: 'ẤN CHỈ ĐIỆN TỬ BỘ TÀI CHÍNH',
            icon: Car,
            color: '#f59e0b',
            image: 'assets/trangchu/car_tnds.png',
            bullets: [
                '⚡ Quét AI OCR Cà vẹt tự động điền trong 2 giây',
                '📱 Mã QR Code xuất trình cảnh sát giao thông hợp lệ',
                '🛡️ Cứu hộ 24/7 và sửa chữa chính hãng toàn quốc',
            ],
        },
        {
            title: 'BẢO HIỂM SỨC KHỎE TOÀN DIỆN',
            subtitle: 'Tấm khiên chở che y tế cho cả gia đình bạn',
            badge: 'BẢO LÃNH VIỆN PHÍ TRỰC TIẾP',
            icon: Heart,
            color: '#ed017c',
            image: 'assets/trangchu/health_insurance.png',
            bullets: [
                '🏥 250+ Bệnh viện quốc tế hàng đầu (Vinmec, FV, Hoàn Mỹ)',
                '📑 Bồi thường online 100% qua app trong 24h',
                '💰 Tiết kiệm tới 40% biểu phí qua ma trận so sánh',
            ],
        },
    ];

    const currentCard = cards[currentSubBeat];
    const cardEntrance = spring({
        frame: frame % 170,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #111a33 0%, #070b14 80%)',
                padding: 100 * s,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 80 * s,
                    width: '90%',
                    maxWidth: 3200 * s,
                    transform: `scale(${cardEntrance})`,
                }}
            >
                {/* Cột trái: Thẻ nội dung tiểu cảnh vui nhộn */}
                <div
                    style={{
                        flex: 1.1,
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(30px)',
                        border: `2px solid ${currentCard.color}`,
                        borderRadius: 36 * s,
                        padding: 60 * s,
                        boxShadow: `0 30px 80px rgba(0, 0, 0, 0.7), 0 0 60px ${currentCard.color}40`,
                    }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12 * s,
                            padding: `${10 * s}px ${24 * s}px`,
                            background: `${currentCard.color}22`,
                            border: `1.5px solid ${currentCard.color}`,
                            borderRadius: 999,
                            color: currentCard.color,
                            fontWeight: 800,
                            fontSize: 16 * s,
                            marginBottom: 24 * s,
                        }}
                    >
                        <currentCard.icon size={22 * s} />
                        <span>{currentCard.badge}</span>
                    </div>

                    <h2 style={{ fontSize: 48 * s, fontWeight: 900, margin: 0, color: '#ffffff', lineHeight: 1.2 }}>
                        {currentCard.title}
                    </h2>
                    <p style={{ fontSize: 24 * s, color: '#94a3b8', marginTop: 14 * s, marginBottom: 36 * s }}>
                        {currentCard.subtitle}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * s }}>
                        {currentCard.bullets.map((b, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16 * s,
                                    fontSize: 24 * s,
                                    fontWeight: 700,
                                    color: '#e2e8f0',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    padding: `${18 * s}px ${24 * s}px`,
                                    borderRadius: 18 * s,
                                }}
                            >
                                <span>{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cột phải: Giao diện thật của gói tương ứng trên website */}
                <div
                    style={{
                        flex: 0.9,
                        position: 'relative',
                        borderRadius: 36 * s,
                        overflow: 'hidden',
                        border: '2px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
                        height: 900 * s,
                        background: '#ffffff',
                    }}
                >
                    <Img
                        src={staticFile(currentCard.image)}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            insetInline: 0,
                            background: 'linear-gradient(to top, rgba(7, 11, 20, 0.95), transparent)',
                            padding: 30 * s,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span style={{ fontSize: 20 * s, fontWeight: 700, color: '#ffffff' }}>
                            🎯 Thu nhỏ về đúng thẻ sản phẩm trên website
                        </span>
                        <div
                            style={{
                                background: '#ed017c',
                                padding: `${8 * s}px ${20 * s}px`,
                                borderRadius: 999,
                                fontSize: 16 * s,
                                fontWeight: 800,
                            }}
                        >
                            Khám Phá Ngay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// =========================================================================
// HỒI 4: QUY TRÌNH MUA 1-CHẠM TRÊN WEBSITE THẬT (FRAME 0 -> 420)
// =========================================================================
const Act4Frontend1Touch: React.FC<{ frame: number; fps: number; s: number; width: number; height: number }> = ({
    frame,
    fps,
    s,
    width,
    height,
}) => {
    const steps = [
        {
            num: '01',
            title: 'Chọn Sản Phẩm',
            desc: 'Danh mục trực quan, rõ ràng',
            img: 'assets/trangchu/mobile_step1.png',
        },
        {
            num: '02',
            title: 'So Sánh Đa Hãng',
            desc: 'Bảo Việt vs PVI vs PTI minh bạch',
            img: 'assets/trangchu/compare_matrix.png',
        },
        {
            num: '03',
            title: 'AI OCR Quét 2s',
            desc: 'Tự động điền không cần gõ phím',
            img: 'assets/trangchu/checkout_ocr_form.png',
        },
        {
            num: '04',
            title: 'Cấp GCN Tức Thì',
            desc: 'Nhận mã QR ấn chỉ điện tử ngay',
            img: 'assets/trangchu/ecertificate_result.png',
        },
    ];

    const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #0d1527 0%, #070b14 85%)',
                padding: 80 * s,
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: 50 * s, transform: `scale(${entrance})` }}>
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10 * s,
                        padding: `${8 * s}px ${24 * s}px`,
                        background: 'rgba(237, 1, 124, 0.15)',
                        border: '1.5px solid #ed017c',
                        borderRadius: 999,
                        color: '#ed017c',
                        fontSize: 18 * s,
                        fontWeight: 800,
                        marginBottom: 16 * s,
                    }}
                >
                    <Zap size={20 * s} />
                    <span>TRẢI NGHIỆM MUA BẢO HIỂM 1-CHẠM TIÊN PHONG</span>
                </div>
                <h2 style={{ fontSize: 60 * s, fontWeight: 900, margin: 0, color: '#ffffff' }}>
                    Quy Trình 4 Bước Đơn Giản — Khách Hàng Nào Cũng Thao Tác Được
                </h2>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 36 * s,
                    width: '90%',
                    maxWidth: 3400 * s,
                }}
            >
                {steps.map((st, i) => {
                    const stepPop = spring({
                        frame: Math.max(0, frame - i * 15),
                        fps,
                        config: { damping: 12, mass: 0.7 },
                    });

                    return (
                        <div
                            key={st.num}
                            style={{
                                background: 'rgba(15, 23, 42, 0.9)',
                                backdropFilter: 'blur(20px)',
                                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: 28 * s,
                                overflow: 'hidden',
                                transform: `scale(${stepPop})`,
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                            }}
                        >
                            <div style={{ padding: `${24 * s}px ${30 * s}px` }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 32 * s, fontWeight: 900, color: '#ed017c' }}>{st.num}</span>
                                    <CheckCircle2 size={24 * s} color="#10b981" />
                                </div>
                                <h3 style={{ fontSize: 28 * s, fontWeight: 800, margin: `${8 * s}px 0 4px 0`, color: '#ffffff' }}>
                                    {st.title}
                                </h3>
                                <p style={{ fontSize: 18 * s, color: '#94a3b8', margin: 0 }}>{st.desc}</p>
                            </div>

                            <div
                                style={{
                                    height: 480 * s,
                                    background: '#ffffff',
                                    overflow: 'hidden',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <Img
                                    src={staticFile(st.img)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'top',
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// =========================================================================
// HỒI 5: CỖ MÁY CMS VẬN HÀNH NGẦM PHÍA SAU (FRAME 0 -> 460)
// =========================================================================
const Act5CMSDashboard: React.FC<{ frame: number; fps: number; s: number; width: number; height: number }> = ({
    frame,
    fps,
    s,
    width,
    height,
}) => {
    const flipRotateY = interpolate(frame, [0, 45], [-45, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.1, 0.9, 0.2, 1),
    });

    const cmsPillars = [
        {
            title: 'Dashboard Doanh Thu Thời Gian Thực',
            desc: '5 Thẻ KPI tài chính, biểu đồ doanh số 12 tháng nhảy số tự động',
            icon: TrendingUp,
            img: 'assets/cms/dashboard_panoramic.png',
        },
        {
            title: 'Tự Động Hóa Quản Lý Hợp Đồng',
            desc: '8 Trạng thái phê duyệt, tự động kết nối API cấp chứng nhận',
            icon: FileCheck,
            img: 'assets/cms/contracts_list.png',
        },
        {
            title: 'Mạng Lưới 75+ Đại Lý & KOL Affiliate',
            desc: 'Phân tầng hoa hồng thông minh, mở rộng doanh thu quy mô',
            icon: Users,
            img: 'assets/cms/kol_tree.png',
        },
    ];

    const currentPillar = frame < 150 ? 0 : frame < 300 ? 1 : 2;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #0f172a 0%, #030712 90%)',
                padding: 100 * s,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 80 * s,
                    width: '92%',
                    maxWidth: 3400 * s,
                    transform: `perspective(2000px) rotateY(${flipRotateY}deg)`,
                }}
            >
                {/* Cột trái: Thông điệp cỗ máy điều hành B2B */}
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12 * s,
                            padding: `${10 * s}px ${24 * s}px`,
                            background: 'rgba(56, 189, 248, 0.15)',
                            border: '1.5px solid #38bdf8',
                            borderRadius: 999,
                            color: '#38bdf8',
                            fontSize: 18 * s,
                            fontWeight: 800,
                            marginBottom: 24 * s,
                        }}
                    >
                        <LayoutDashboard size={22 * s} />
                        <span>HẬU TRƯỜNG CÔNG NGHỆ B2B / ERP</span>
                    </div>

                    <h2 style={{ fontSize: 56 * s, fontWeight: 900, color: '#ffffff', margin: 0, lineHeight: 1.15 }}>
                        Phía Sau Trải Nghiệm 1-Chạm Là Cỗ Máy CMS Vận Hành Tự Động
                    </h2>

                    <p style={{ fontSize: 24 * s, color: '#94a3b8', marginTop: 20 * s, marginBottom: 40 * s }}>
                        Doanh nghiệp và nhà đầu tư sở hữu toàn bộ nền tảng quản trị thông minh, không cần tốn chi phí xây dựng từ đầu.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * s }}>
                        {cmsPillars.map((p, idx) => {
                            const isSelected = idx === currentPillar;
                            return (
                                <div
                                    key={p.title}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 20 * s,
                                        padding: `${20 * s}px ${28 * s}px`,
                                        borderRadius: 20 * s,
                                        background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                        border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: 12 * s,
                                            borderRadius: 14 * s,
                                            background: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                                            color: isSelected ? '#030712' : '#ffffff',
                                        }}
                                    >
                                        <p.icon size={28 * s} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: 22 * s, fontWeight: 800, margin: 0, color: '#ffffff' }}>
                                            {p.title}
                                        </h4>
                                        <p style={{ fontSize: 16 * s, color: '#94a3b8', margin: `${4 * s}px 0 0 0` }}>
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cột phải: Màn hình CMS 4K thực tế */}
                <div
                    style={{
                        flex: 1.1,
                        borderRadius: 32 * s,
                        overflow: 'hidden',
                        border: '2px solid rgba(56, 189, 248, 0.4)',
                        boxShadow: '0 40px 120px rgba(0, 0, 0, 0.8), 0 0 80px rgba(56, 189, 248, 0.25)',
                        height: 960 * s,
                        background: '#090d16',
                    }}
                >
                    <Img
                        src={staticFile(cmsPillars[currentPillar].img)}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

// =========================================================================
// HỒI 6: OUTRO & ĐẦU TƯ SỞ HỮU HỆ THỐNG TRỌN GÓI (FRAME 0 -> 300)
// =========================================================================
const Act6OutroCTA: React.FC<{ frame: number; fps: number; s: number; width: number; height: number }> = ({
    frame,
    fps,
    s,
    width,
    height,
}) => {
    const popEntrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, #1e0b24 0%, #070b14 80%)',
                padding: 100 * s,
                textAlign: 'center',
            }}
        >
            <div style={{ transform: `scale(${popEntrance})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Img
                    src={staticFile('assets/logo-light.png')}
                    style={{
                        height: 120 * s,
                        objectFit: 'contain',
                        marginBottom: 40 * s,
                        filter: 'drop-shadow(0 0 40px rgba(237, 1, 124, 0.5))',
                    }}
                />

                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 12 * s,
                        padding: `${12 * s}px ${32 * s}px`,
                        background: 'rgba(237, 1, 124, 0.15)',
                        border: '2px solid #ed017c',
                        borderRadius: 999,
                        color: '#ed017c',
                        fontSize: 22 * s,
                        fontWeight: 900,
                        marginBottom: 30 * s,
                    }}
                >
                    <Award size={26 * s} />
                    <span>NỀN TẢNG INSURTECH CHÌA KHÓA TRAO TAY (TURNKEY SOLUTION)</span>
                </div>

                <h1 style={{ fontSize: 72 * s, fontWeight: 900, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
                    Sở Hữu Trọn Vẹn Hệ Sinh Thái Bán Bảo Hiểm Tự Động
                </h1>

                <p
                    style={{
                        fontSize: 28 * s,
                        color: '#94a3b8',
                        maxWidth: 2200 * s,
                        marginTop: 24 * s,
                        marginBottom: 50 * s,
                        lineHeight: 1.5,
                    }}
                >
                    Tích hợp sẵn Cổng Bán B2C • Cỗ máy CMS Quản Trị • API 75+ Hãng Bảo Hiểm Lớn • Mạng Lưới CTV Affiliate.
                </p>

                {/* Bố cục 3 thiết bị đồng bộ */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 40 * s }}>
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #ed017c 0%, #b8005b 100%)',
                            padding: `${22 * s}px ${56 * s}px`,
                            borderRadius: 999,
                            fontSize: 26 * s,
                            fontWeight: 900,
                            color: '#ffffff',
                            boxShadow: '0 20px 50px rgba(237, 1, 124, 0.5)',
                        }}
                    >
                        🌐 Khám Phá: https://topbaohiem.vn
                    </div>

                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1.5px solid rgba(255, 255, 255, 0.2)',
                            padding: `${22 * s}px ${56 * s}px`,
                            borderRadius: 999,
                            fontSize: 26 * s,
                            fontWeight: 800,
                            color: '#ffffff',
                        }}
                    >
                        📞 Hotline Chuyển Giao: 090.xxx.xxxx
                    </div>
                </div>
            </div>
        </div>
    );
};
