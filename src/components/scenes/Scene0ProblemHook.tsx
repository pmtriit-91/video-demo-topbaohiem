import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing, Img, staticFile } from 'remotion';
import { LucideIcon, ShieldAlert, FileText, Clock, AlertTriangle, HelpCircle, Sparkles, Lightbulb } from 'lucide-react';
import { AlarmClockComicSticker, MagnifyingComicSticker, ContractComicSticker, WarningSweatComicSticker } from '../ui/ComicStickers';

// =========================================================================
// CẤU HÌNH 4 CÂU HỎI NỖI ĐAU (NEARLY SQUARE BOXES, EXTRA LARGE READABLE TEXT)
// =========================================================================
interface CardConfig {
    id: number;
    title: string;
    badge: string;
    badgeColor: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    popFrame: number;
    holdUntil: number; // Thời điểm bắt đầu rời trung tâm bay về góc
    dockEnd: number;   // Thời điểm cập bến hoàn toàn ở góc
    cornerKey: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    spotlightW: number;
    spotlightH: number;
    cornerW: number;
    cornerH: number;
}

const CARDS_DATA: CardConfig[] = [
    {
        id: 1,
        title: 'Mua Ở Đâu Uy Tín?',
        badge: 'RỦI RO',
        badgeColor: '#f59e0b',
        icon: ShieldAlert,
        iconBg: '#fef3c7',
        iconColor: '#d97706',
        popFrame: 200,
        holdUntil: 305, // Giữ ở tâm ~1.75s để đọc trọn vẹn
        dockEnd: 330,   // Lướt về góc trong 25 frames
        cornerKey: 'top-left',
        spotlightW: 860,
        spotlightH: 560,
        cornerW: 740,
        cornerH: 480,
    },
    {
        id: 2,
        title: 'Quyền Lợi Ra Sao?',
        badge: 'MA TRẬN',
        badgeColor: '#ef4444',
        icon: FileText,
        iconBg: '#fee2e2',
        iconColor: '#dc2626',
        popFrame: 340,
        holdUntil: 445, // Giữ ở tâm ~1.75s để đọc
        dockEnd: 470,   // Lướt về góc trong 25 frames
        cornerKey: 'top-right',
        spotlightW: 860,
        spotlightH: 560,
        cornerW: 740,
        cornerH: 480,
    },
    {
        id: 3,
        title: 'Thủ Tục Cấp Đơn Rườm Rà?',
        badge: 'MẤT THỜI GIAN',
        badgeColor: '#6366f1',
        icon: Clock,
        iconBg: '#e0e7ff',
        iconColor: '#4f46e5',
        popFrame: 480,
        holdUntil: 585, // Giữ ở tâm ~1.75s để đọc
        dockEnd: 610,   // Lướt về góc trong 25 frames
        cornerKey: 'bottom-left',
        spotlightW: 880,
        spotlightH: 570,
        cornerW: 760,
        cornerH: 490,
    },
    {
        id: 4,
        title: 'Bồi Thường Có Khó Khăn?',
        badge: 'LO LẮNG',
        badgeColor: '#06b6d4',
        icon: AlertTriangle,
        iconBg: '#cffafe',
        iconColor: '#0891b2',
        popFrame: 620,
        holdUntil: 725, // Giữ ở tâm ~1.75s để đọc
        dockEnd: 750,   // Lướt về góc trong 25 frames
        cornerKey: 'bottom-right',
        spotlightW: 860,
        spotlightH: 560,
        cornerW: 740,
        cornerH: 480,
    },
];

// =========================================================================
// HÀM RENDER ĐÁM MÂY SUY NGHĨ COMIC (THOUGHT CLOUD SVG + 3 CHẤM TRÒN DẪN HƯỚNG)
// Chuẩn 100% theo ảnh mẫu: Múi cong bồng bềnh, bóng đổ offset đen, action arcs
// =========================================================================
const CLOUD_PATH_D = `
    M 220,120
    C 240,45 360,45 405,95
    C 440,35 530,35 570,85
    C 615,40 705,65 725,130
    C 785,155 805,245 765,305
    C 800,365 745,440 670,430
    C 625,475 530,480 480,435
    C 430,480 335,470 295,420
    C 230,455 145,415 145,345
    C 75,295 85,200 145,155
    C 155,100 205,85 220,120
    Z
`.replace(/\s+/g, ' ').trim();

function getThoughtDots(tail: 'spotlight' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') {
    switch (tail) {
        case 'top-left':
            // Đuôi hướng sang phải xuống dưới (chỉ vào đầu/vai nhân vật)
            return [
                { cx: 640, cy: 450, r: 28 },
                { cx: 700, cy: 495, r: 18 },
                { cx: 745, cy: 530, r: 11 },
            ];
        case 'top-right':
            // Đuôi hướng sang trái xuống dưới (chỉ vào đầu/vai nhân vật)
            return [
                { cx: 240, cy: 450, r: 28 },
                { cx: 180, cy: 495, r: 18 },
                { cx: 135, cy: 530, r: 11 },
            ];
        case 'bottom-left':
            // Đuôi hướng sang phải lên trên (chỉ vào vai/đầu nhân vật)
            return [
                { cx: 620, cy: 45, r: 26 },
                { cx: 675, cy: 5, r: 17 },
                { cx: 720, cy: -28, r: 10 },
            ];
        case 'bottom-right':
            // Đuôi hướng sang trái lên trên (chỉ vào vai/đầu nhân vật)
            return [
                { cx: 230, cy: 45, r: 26 },
                { cx: 175, cy: 5, r: 17 },
                { cx: 130, cy: -28, r: 10 },
            ];
        default:
            // Spotlight: Đuôi chúc xuống dưới tâm đầu nhân vật
            return [
                { cx: 370, cy: 465, r: 28 },
                { cx: 355, cy: 515, r: 18 },
                { cx: 345, cy: 550, r: 11 },
            ];
    }
}

// =========================================================================
// COMPONENT PHÂN CẢNH 0: BẢN GỐC CHUẨN ĐIỆN ẢNH (NEARLY SQUARE BOXES & BIG TEXT)
// =========================================================================
export const Scene0ProblemHook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const is4K = width >= 3840;
    const s = is4K ? 1 : width / 3840;

    const cx = width / 2;
    const cy = height / 2;

    // =========================================================================
    // 1. TIMELINE & ANIMATION CỦA CẢNH
    // =========================================================================
    // Tổng thời lượng: 730 frames (~12.16s @ 60fps)

    // A. Máy đánh chữ gõ "Muốn Mua Bảo Hiểm Online," ở trung tâm chậm rãi (Frame 12 -> 76 ~1.1s)
    const fullPrefixText = 'Muốn Mua Bảo Hiểm Online,';
    const typingProgress = interpolate(frame, [12, 76], [0, fullPrefixText.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const charCount = Math.floor(typingProgress);
    const typedText = fullPrefixText.slice(0, charCount);
    const showCursor = frame >= 8 && frame < 80 && Math.floor(frame / 5) % 2 === 0;

    // B. Cú đục thủng lỗ "NHƯNG...?" tại trung tâm (Hole Punch Impact: Frame 80+)
    const punchSpring = spring({
        frame: Math.max(0, frame - 80),
        fps,
        config: { damping: 9, mass: 0.45, stiffness: 140 },
    });
    const punchShake =
        frame >= 80 && frame < 96
            ? Math.sin((frame - 80) * 2.2) * Math.max(0, 1 - (frame - 80) / 16) * (8 * s)
            : 0;

    // C. Quỹ đạo lướt từ Trung tâm lên Đỉnh (Docking to Top Header: Frame 140 -> 175)
    const dockSpring = spring({
        frame: Math.max(0, frame - 140),
        fps,
        config: { damping: 15, mass: 0.85, stiffness: 75 },
    });
    const headerY = interpolate(dockSpring, [0, 1], [cy - 60 * s, height * 0.045]);
    const headerScale = interpolate(dockSpring, [0, 1], [1.18, 1.0]);

    // D. Nhân vật trung tâm xuất hiện sau khi tiêu đề đã lướt lên đỉnh (Frame 165 -> 200)
    const characterEntrance = spring({
        frame: Math.max(0, frame - 165),
        fps,
        config: { damping: 15, mass: 0.95, stiffness: 80 },
    });

    // Nhịp thở & nghiêng đầu suy nghĩ vi mô
    const breath = Math.sin(frame * 0.06) * (6 * s);
    const headTilt = Math.sin(frame * 0.03) * 1.8;

    // =========================================================================
    // 2. NGÒI NỔ DẤU HỎI ? (CLEAN & POWERFUL SNAP POP)
    // =========================================================================
    const getBeatDynamics = (popFrame: number) => {
        const diff = frame - popFrame;

        // Pha 1: Nén tích tụ lò xo (Anticipation Squash: 14 frames)
        if (diff >= -14 && diff < 0) {
            const t = (diff + 14) / 14;
            return {
                scaleX: interpolate(t, [0, 1], [1, 1.24]),
                scaleY: interpolate(t, [0, 1], [1, 0.75]),
                wiggleX: Math.sin(diff * 1.9) * (4 * s) * t,
                wiggleY: Math.cos(diff * 2.3) * (2.5 * s) * t,
                isCharging: true,
                isPopping: false,
            };
        }

        // Pha 2: Nảy búng dứt khoát (Clean Pop Release: 16 frames)
        if (diff >= 0 && diff <= 16) {
            const t = diff / 16;
            return {
                scaleX: interpolate(t, [0, 0.25, 1], [1.38, 0.94, 1]),
                scaleY: interpolate(t, [0, 0.25, 1], [1.55, 1.08, 1]),
                wiggleX: 0,
                wiggleY: 0,
                isCharging: false,
                isPopping: true,
            };
        }

        return {
            scaleX: 1,
            scaleY: 1,
            wiggleX: 0,
            wiggleY: 0,
            isCharging: false,
            isPopping: false,
        };
    };

    const d1 = getBeatDynamics(CARDS_DATA[0].popFrame);
    const d2 = getBeatDynamics(CARDS_DATA[1].popFrame);
    const d3 = getBeatDynamics(CARDS_DATA[2].popFrame);
    const d4 = getBeatDynamics(CARDS_DATA[3].popFrame);

    const activeDynamics =
        d1.isCharging || d1.isPopping
            ? d1
            : d2.isCharging || d2.isPopping
            ? d2
            : d3.isCharging || d3.isPopping
            ? d3
            : d4;

    // Phản lực giật mình nhún vai nhẹ nhàng của nhân vật
    const calcRecoil = (popFrame: number) => {
        const diff = frame - popFrame;
        if (diff < 0 || diff > 20) return 0;
        const t = diff / 20;
        if (t < 0.25) return interpolate(t, [0, 0.25], [0, 9 * s]);
        return interpolate(t, [0.25, 0.6, 1], [9 * s, -3 * s, 0]);
    };
    const recoilY =
        calcRecoil(CARDS_DATA[0].popFrame) +
        calcRecoil(CARDS_DATA[1].popFrame) +
        calcRecoil(CARDS_DATA[2].popFrame) +
        calcRecoil(CARDS_DATA[3].popFrame);

    // =========================================================================
    // 3. CAO TRÀO QUÁ TẢI (OVERLOAD) & A-HA MOMENT GIẢI PHÓNG
    // =========================================================================
    const OVERLOAD_START = 655;
    const AHA_START = 678;

    // Chùng vai bối rối khi cả 4 bóng chat đã bao vây
    const overloadDip = interpolate(frame, [OVERLOAD_START, OVERLOAD_START + 18], [0, 10 * s], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Thở phào nhẹ nhõm vươn người thẳng lên khi có giải pháp
    const reliefRise = interpolate(frame, [AHA_START, AHA_START + 24], [0, -14 * s], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    const characterTotalY = breath + recoilY + overloadDip + reliefRise;

    // Rung lắc nhẹ ở đoạn quá tải
    const overloadJitter =
        frame >= OVERLOAD_START && frame <= AHA_START
            ? (Math.sin(frame * 1.6) * 3 * (frame - OVERLOAD_START)) / 23
            : 0;

    // Hiệu ứng bừng sáng A-ha Moment
    const ahaProgress = interpolate(frame, [AHA_START, AHA_START + 22], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const ahaShockwaveScale = interpolate(ahaProgress, [0, 1], [0.3, 3.2]);
    const ahaShockwaveOpacity = interpolate(ahaProgress, [0, 0.2, 1], [0, 0.85, 0]);

    // Dấu hỏi tan biến khi A-ha bừng sáng
    const questionDisperse = interpolate(frame, [AHA_START, AHA_START + 14], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.4, 0, 0.2, 1),
    });

    // Fade out êm đềm chuyển sang Scene 1
    const sceneFadeOut = interpolate(frame, [712, 730], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // =========================================================================
    // 4. KÍCH THƯỚC & TỌA ĐỘ PIXEL CHUẨN (KHỐI GẦN VUÔNG, CHỮ SIÊU TO RÕ)
    // =========================================================================
    const charH = Math.round(1160 * s);
    const charW = Math.round(charH * (968 / 1615));

    // Đẩy nhân vật ở nửa dưới màn hình để chừa không gian nửa trên rộng rãi cho khối vuông
    const charMarginTop = Math.round(300 * s);

    // Điểm nổ (Tâm Dấu ?)
    const originX = cx + Math.round(200 * s);
    const originY = Math.round(height * 0.36);

    // Hàm tính tọa độ 4 góc: Đám mây suy nghĩ ôm lấy nhân vật tự nhiên, chuỗi bong bóng hướng vào trung tâm
    const getCornerCoords = (key: CardConfig['cornerKey'], cW: number, cH: number) => {
        const marginX = Math.round(520 * s);
        const topY = Math.round(200 * s);
        const bottomY = Math.round(1100 * s);

        switch (key) {
            case 'top-left':
                return { left: marginX, top: topY };
            case 'top-right':
                return { left: Math.round(width - marginX - cW), top: topY };
            case 'bottom-left':
                return { left: marginX, top: bottomY };
            case 'bottom-right':
                return { left: Math.round(width - marginX - cW), top: bottomY };
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: sceneFadeOut,
                zIndex: 1,
            }}
        >
            {/* NHÚNG GOOGLE FONTS PLUS JAKARTA SANS CHUẨN TIẾNG VIỆT 100% */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap');
            `}</style>

            {/* 0. NỀN STUDIO SÁNG SỦA, TINH TẾ & MẠNG LƯỚI CHẤM DOT-MATRIX */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, rgba(148, 163, 184, 0.25) 1.5px, transparent 1.5px)`,
                    backgroundSize: `${36 * s}px ${36 * s}px`,
                    opacity: 0.6,
                    pointerEvents: 'none',
                }}
            />

            {/* Vầng sáng dịu nhẹ trung tâm */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: Math.round(1400 * s),
                    height: Math.round(1000 * s),
                    borderRadius: '50%',
                    background:
                        'radial-gradient(ellipse at center, rgba(237, 1, 124, 0.04) 0%, rgba(2, 132, 199, 0.03) 45%, transparent 75%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                }}
            />

            {/* ============================================================= */}
            {/* 1. KHỐI CÂU HỎI LỚN: GÕ CHỮ TRUNG TÂM -> ĐỤC THỦNG NHƯNG -> LƯỚT LÊN ĐỈNH */}
            {/* ============================================================= */}
            {frame >= 8 && (
                <div
                    style={{
                        position: 'absolute',
                        top: headerY,
                        left: '50%',
                        transform: `translateX(-50%) scale(${headerScale})`,
                        transformOrigin: 'center center',
                        zIndex: 25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 22 * s,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                    }}
                >
                    {/* Vế 1: Chữ gõ Typewriter từng ký tự */}
                    <span
                        style={{
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                            fontSize: Math.max(28, 54 * s),
                            fontWeight: 900,
                            color: '#0f172a',
                            letterSpacing: '-0.03em',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                            display: 'inline-flex',
                            alignItems: 'center',
                        }}
                    >
                        {typedText}
                        {showCursor && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 4 * s,
                                    height: 52 * s,
                                    backgroundColor: '#ed017c',
                                    marginLeft: 6 * s,
                                    borderRadius: 2 * s,
                                }}
                            />
                        )}
                    </span>

                    {/* Vế 2: Cú đục thủng lỗ trên Background dành riêng cho "NHƯNG...?" */}
                    {frame >= 78 && (
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 14 * s,
                                padding: `${10 * s}px ${34 * s}px`,
                                borderRadius: 24 * s,
                                // Hiệu ứng khoét thủng nền: Nền đỏ rực cảnh báo bên trong hố sâu
                                background: 'linear-gradient(145deg, #b91c1c 0%, #ef4444 55%, #991b1b 100%)',
                                // Inset Shadow tạo cảm giác thành hố bị khoét sâu xuống bề mặt giấy
                                boxShadow: `
                                    inset 0px ${6 * s}px ${16 * s}px rgba(0, 0, 0, 0.8),
                                    inset 0px -${3 * s}px ${8 * s}px rgba(255, 255, 255, 0.3),
                                    0px ${12 * s}px ${30 * s}px rgba(220, 38, 38, 0.55),
                                    0px 0px ${60 * s}px rgba(239, 68, 68, 0.4)
                                `,
                                border: `${Math.max(2, 3.5 * s)}px dashed #ffffff`,
                                transform: `scale(${punchSpring}) rotate(${interpolate(punchSpring, [0, 1], [-18, -3.5])}deg) translate(${punchShake}px, ${punchShake}px)`,
                                transformOrigin: 'center center',
                            }}
                        >
                            {/* Tia nứt rạn xung quanh mép lỗ thủng */}
                            <svg
                                style={{
                                    position: 'absolute',
                                    width: '140%',
                                    height: '200%',
                                    top: '-50%',
                                    left: '-20%',
                                    pointerEvents: 'none',
                                    overflow: 'visible',
                                }}
                            >
                                <path
                                    d="M 15 35 L 35 15 L 60 22"
                                    fill="none"
                                    stroke="#dc2626"
                                    strokeWidth={Math.max(1.5, 2.5 * s)}
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 320 60 L 350 78 L 380 68"
                                    fill="none"
                                    stroke="#dc2626"
                                    strokeWidth={Math.max(1.5, 2.5 * s)}
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Icon cảnh báo rung nhẹ trong lỗ thủng */}
                            <AlertTriangle
                                size={Math.max(24, 42 * s)}
                                color="#fef08a"
                                style={{
                                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6))',
                                    transform: `rotate(${Math.sin(frame * 0.25) * 8}deg)`,
                                }}
                            />

                            {/* Chữ NHƯNG...? nổi bật trong hố thủng */}
                            <span
                                style={{
                                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                                    fontSize: Math.max(34, 62 * s),
                                    fontWeight: 950,
                                    color: '#ffffff',
                                    letterSpacing: '0.04em',
                                    textShadow: `0 3px 6px rgba(0, 0, 0, 0.8), 0 0 ${20 * s}px #fef08a`,
                                }}
                            >
                                NHƯNG...?
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* ============================================================= */}
            {/* 2. KHU VỰC TRUNG TÂM: NHÂN VẬT THỰC TẾ SUY NGHĨ (EDITORIAL) */}
            {/* ============================================================= */}
            <div
                style={{
                    position: 'relative',
                    width: charW,
                    height: charH,
                    marginTop: charMarginTop,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${characterEntrance}) translateY(${characterTotalY}px)`,
                    opacity: characterEntrance,
                    zIndex: 10,
                }}
            >
                {/* A. Vòng tròn hào quang & Quỹ đạo suy nghĩ */}
                <svg
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '50%',
                        transform: `translateX(-50%) rotate(${frame * 0.3}deg)`,
                        width: Math.round(860 * s),
                        height: Math.round(860 * s),
                        pointerEvents: 'none',
                    }}
                    viewBox="0 0 500 500"
                >
                    <circle
                        cx="250"
                        cy="250"
                        r="180"
                        fill="none"
                        stroke="rgba(203, 213, 225, 0.75)"
                        strokeWidth="1.8"
                        strokeDasharray="8 8"
                    />
                    <circle
                        cx="250"
                        cy="250"
                        r="225"
                        fill="none"
                        stroke="rgba(237, 1, 124, 0.2)"
                        strokeWidth="1.5"
                        strokeDasharray="12 10"
                    />
                </svg>

                {/* B. Icon dấu chấm hỏi nhỏ bay quanh đầu */}
                <div
                    style={{
                        position: 'absolute',
                        top: '5%',
                        left: '-8%',
                        transform: `scale(${1 + Math.sin(frame * 0.1) * 0.08}) translateY(${Math.sin(frame * 0.05) * 5 * s}px)`,
                        width: 52 * s,
                        height: 52 * s,
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: `${Math.max(2, 2.5 * s)}px solid #0f172a`,
                        boxShadow: `${3 * s}px ${3 * s}px 0px #0f172a`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0f172a',
                    }}
                >
                    <HelpCircle size={28 * s} strokeWidth={2.4} />
                </div>

                {/* ========================================================= */}
                {/* C. CỤM NGÒI NỔ DẤU HỎI LỚN ĐẶC TRƯNG (CLEAN SNAP POP) */}
                {/* ========================================================= */}
                <div
                    style={{
                        position: 'absolute',
                        top: '1%',
                        right: '-22%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `translate(${Math.cos(frame * 0.05) * 8 * s + activeDynamics.wiggleX}px, ${Math.sin(frame * 0.07) * 12 * s + activeDynamics.wiggleY}px) scale(${questionDisperse})`,
                        opacity: questionDisperse,
                        zIndex: 25,
                        pointerEvents: 'none',
                    }}
                >
                    {/* Sóng xung kích sạch sẽ mỏng manh khi nổ */}
                    {CARDS_DATA.map((c) => {
                        const diff = frame - c.popFrame;
                        if (diff < 0 || diff > 18) return null;
                        const t = diff / 18;
                        const scale = interpolate(t, [0, 1], [0.35, 2.6]);
                        const opacity = interpolate(t, [0, 0.2, 0.8, 1], [0, 0.85, 0.5, 0]);

                        return (
                            <div
                                key={c.id}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) scale(${scale})`,
                                    width: Math.round(150 * s),
                                    height: Math.round(150 * s),
                                    borderRadius: '50%',
                                    border: `${Math.max(2.5, 3.5 * s)}px solid ${c.badgeColor}`,
                                    opacity,
                                    pointerEvents: 'none',
                                }}
                            />
                        );
                    })}

                    {/* Vầng hào quang thở nhẹ nhàng */}
                    <div
                        style={{
                            position: 'absolute',
                            width: Math.round(300 * s),
                            height: Math.round(300 * s),
                            borderRadius: '50%',
                            background:
                                'radial-gradient(circle, rgba(237, 1, 124, 0.2) 0%, rgba(245, 158, 11, 0.1) 45%, transparent 70%)',
                            filter: 'blur(30px)',
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Dấu hỏi chính: Nén lò xo & nổ búng sạch sẽ */}
                    <span
                        style={{
                            fontFamily: 'var(--font-primary), system-ui, -apple-system, sans-serif',
                            fontSize: Math.round(275 * s),
                            fontWeight: 900,
                            color: '#ffffff',
                            lineHeight: 1,
                            userSelect: 'none',
                            transform: `scale(${activeDynamics.scaleX}, ${activeDynamics.scaleY})`,
                            transformOrigin: 'bottom center',
                            filter:
                                'drop-shadow(0 20px 40px rgba(15, 23, 42, 0.2)) drop-shadow(0 4px 12px rgba(15, 23, 42, 0.1))',
                            WebkitTextStroke: `${Math.max(3, 4 * s)}px #0f172a`,
                            letterSpacing: '-0.05em',
                        }}
                    >
                        ?
                    </span>
                </div>

                {/* D. HÌNH ẢNH NHÂN VẬT THỰC TẾ SẮC NÉT (ÁNH MẮT NGƯỚC LÊN NHÌN BOX CHAT) */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${headTilt}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    <Img
                        src={staticFile('assets/anh-doituong-cutout.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 25px 40px rgba(15, 23, 42, 0.12))',
                        }}
                    />
                </div>

                {/* E. ĐIỂM SÁNG A-HA MOMENT (BỪNG SÁNG KHI TÌM THẤY GIẢI PHÁP) */}
                {ahaProgress > 0.01 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-8%',
                            left: '56%',
                            transform: 'translateX(-50%)',
                            zIndex: 40,
                        }}
                    >
                        <div
                            style={{
                                width: 72 * s,
                                height: 72 * s,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #ed017c 100%)',
                                border: `${Math.max(2.5, 3.2 * s)}px solid #0f172a`,
                                boxShadow: `${4 * s}px ${4 * s}px 0px #0f172a, 0 0 45px rgba(245, 158, 11, 0.8)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                transform: `scale(${interpolate(ahaProgress, [0, 0.45, 1], [0.4, 1.25, 1])})`,
                            }}
                        >
                            <Lightbulb size={40 * s} strokeWidth={2.5} />
                        </div>

                        {/* Vòng sóng xung kích xua tan nỗi lo */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) scale(${ahaShockwaveScale})`,
                                width: 150 * s,
                                height: 150 * s,
                                borderRadius: '50%',
                                border: `${Math.max(3, 4 * s)}px solid #f59e0b`,
                                opacity: ahaShockwaveOpacity,
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                )}
            </div>

            {/* ============================================================= */}
            {/* 3. BỐN ĐÁM MÂY SUY NGHĨ COMIC: TIÊU ĐỀ TO RÕ, SẠCH SẼ & THOÁNG ĐÃNG */}
            {/* ============================================================= */}
            {CARDS_DATA.map((card, idx) => {
                if (frame < card.popFrame) return null;

                // Kích thước chuẩn xác theo từng card (tùy thuộc vào lượng nội dung)
                const targetW = Math.round(card.spotlightW * s);
                const targetH = Math.round(card.spotlightH * s);
                const cornerW = Math.round(card.cornerW * s);
                const cornerH = Math.round(card.cornerH * s);

                const centerLeft = cx - targetW / 2;
                // Đáy đám mây ở ~ 840px trên đỉnh đầu nhân vật -> 3 bong bóng suy nghĩ chúc thẳng xuống đỉnh tóc
                const centerTop = Math.round(840 * s - targetH);
                const corner = getCornerCoords(card.cornerKey, cornerW, cornerH);

                // Giai đoạn 1: Bung nổ từ điểm nổ ra TRUNG TÂM TRÊN ĐẦU (Center Pop-in)
                const launchSpring = spring({
                    frame: frame - card.popFrame,
                    fps,
                    config: { damping: 11, mass: 0.65, stiffness: 125 },
                });

                // Giai đoạn 2: Lướt từ TRUNG TÂM TRÊN ĐẦU về GÓC (Docking Glide)
                const dockProgress =
                    frame < card.holdUntil
                        ? 0
                        : interpolate(frame, [card.holdUntil, card.dockEnd], [0, 1], {
                              easing: Easing.bezier(0.16, 1, 0.3, 1),
                              extrapolateLeft: 'clamp',
                              extrapolateRight: 'clamp',
                          });

                // Vị trí X, Y hiện tại (từ Điểm Nổ -> Vùng trên đầu -> Góc)
                const currentX =
                    dockProgress === 0
                        ? interpolate(launchSpring, [0, 1], [originX - targetW / 2, centerLeft])
                        : interpolate(dockProgress, [0, 1], [centerLeft, corner.left]);

                const currentY =
                    dockProgress === 0
                        ? interpolate(launchSpring, [0, 1], [originY, centerTop])
                        : interpolate(dockProgress, [0, 1], [centerTop, corner.top]);

                // Chiều rộng & Chiều cao co giãn mượt mà theo từng card
                const currentWidth =
                    dockProgress === 0 ? targetW : Math.round(interpolate(dockProgress, [0, 1], [targetW, cornerW]));
                const currentHeight =
                    dockProgress === 0 ? targetH : Math.round(interpolate(dockProgress, [0, 1], [targetH, cornerH]));

                // Scale nảy khi phóng ra và lúc tan biến ở A-ha Moment
                const isSpotlight = frame >= card.popFrame && frame < card.holdUntil;
                const popScale = dockProgress === 0 ? launchSpring : 1;

                // Xác định kiểu đuôi nối: ở Spotlight đuôi chĩa xuống đỉnh đầu, ở góc hướng về nhân vật
                const tailType =
                    dockProgress < 0.6
                        ? 'spotlight'
                        : (card.cornerKey as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right');

                const dots = getThoughtDots(tailType);

                // Cơ chế vỡ tan biến sạch sẽ ở A-ha Moment
                const popStart = AHA_START + idx * 4;
                const disperseDiff = frame - popStart;
                let disperseScale = 1;
                let disperseOpacity = 1;
                let showBurstSparks = false;

                if (frame >= popStart) {
                    if (disperseDiff <= 6) {
                        disperseScale = interpolate(disperseDiff, [0, 6], [1, 1.15]);
                    } else if (disperseDiff <= 18) {
                        disperseScale = 0;
                        disperseOpacity = 0;
                        showBurstSparks = true;
                    } else {
                        disperseScale = 0;
                        disperseOpacity = 0;
                    }
                }

                // Hiển thị bóng chat
                const showTail = disperseOpacity > 0;

                // Lơ lửng vi mô
                const floatY =
                    dockProgress === 1
                        ? Math.sin(frame * 0.045 + idx * 1.5) * (7 * s)
                        : isSpotlight
                        ? Math.sin(frame * 0.05) * (3.5 * s)
                        : 0;

                // CỠ CHỮ SIÊU TO RÕ RÀNG (KHÔNG CÒN GẠCH ĐẦU DÒNG VỤN VẶT)
                const titleSize = Math.max(
                    26,
                    Math.round(interpolate(dockProgress, [0, 1], [56 * s, 46 * s]))
                );
                const badgeSize = Math.max(
                    14,
                    Math.round(interpolate(dockProgress, [0, 1], [22 * s, 18 * s]))
                );

                const IconComponent = card.icon;

                return (
                    <div
                        key={card.id}
                        style={{
                            position: 'absolute',
                            left: `${currentX}px`,
                            top: `${currentY + floatY + (dockProgress === 1 ? overloadJitter : 0)}px`,
                            width: `${currentWidth}px`,
                            height: `${currentHeight}px`,
                            transform: `scale(${popScale * disperseScale})`,
                            opacity: disperseOpacity,
                            zIndex: isSpotlight ? 35 : 15,
                        }}
                    >
                        {/* 1. SVG ĐÁM MÂY SUY NGHĨ COMIC (THÂN ĐÁM MÂY + BÓNG ĐỔ OFFSET ĐEN + 3 BÓNG TRÒN DẪN) */}
                        {showTail && (
                            <svg
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'visible',
                                    pointerEvents: 'none',
                                    zIndex: 1,
                                }}
                                viewBox="0 0 850 560"
                            >
                                {/* Lớp bóng đổ Comic Pop-Art (Offset Shadow màu đen y hệt ảnh mẫu của user) */}
                                <g transform={`translate(${10 * s}, ${14 * s})`}>
                                    <path d={CLOUD_PATH_D} fill="#0f172a" opacity={0.88} />
                                    {dots.map((d, i) => (
                                        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#0f172a" opacity={0.88} />
                                    ))}
                                </g>

                                {/* Thân đám mây chính màu trắng viền đen dày */}
                                <path
                                    d={CLOUD_PATH_D}
                                    fill="#ffffff"
                                    stroke="#0f172a"
                                    strokeWidth={Math.max(3.6, 5 * s)}
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                />

                                {/* Vệt chuyển động comic (Action arcs) */}
                                <path
                                    d="M 230,65 C 280,45 330,55 355,70"
                                    fill="none"
                                    stroke="#0f172a"
                                    strokeWidth={Math.max(2.4, 3.2 * s)}
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 140,360 C 120,385 135,410 160,420"
                                    fill="none"
                                    stroke="#0f172a"
                                    strokeWidth={Math.max(2.4, 3.2 * s)}
                                    strokeLinecap="round"
                                />

                                {/* Chuỗi 3 bong bóng suy nghĩ trắng viền đen */}
                                {dots.map((d, i) => (
                                    <circle
                                        key={i}
                                        cx={d.cx}
                                        cy={d.cy}
                                        r={d.r}
                                        fill="#ffffff"
                                        stroke="#0f172a"
                                        strokeWidth={Math.max(3, 4 * s)}
                                    />
                                ))}
                            </svg>
                        )}

                        {/* 2. STICKER HOẠT HÌNH COMIC ĐỘNG GÁC TRÊN MÉP NGOÀI ĐÁM MÂY (RENG RENG / SOI KÍNH / CHÓNG MẶT / MỒ HÔI) */}
                        {showTail && (
                            <div
                                style={{
                                    position: 'absolute',
                                    zIndex: 12,
                                    pointerEvents: 'none',
                                    ...(card.id === 1
                                        ? { top: '-4%', left: '22%' }
                                        : card.id === 2
                                        ? { top: '-8%', right: '9%' }
                                        : card.id === 3
                                        ? { top: '-7%', left: '13%' } // Đồng hồ vintage nghiêng -15 độ đậu vững trên gờ mây
                                        : { top: '-8%', right: '9%' }),
                                }}
                            >
                                {card.id === 1 && (
                                    <MagnifyingComicSticker
                                        frame={frame}
                                        isSpotlight={isSpotlight}
                                        size={Math.round(interpolate(dockProgress, [0, 1], [130 * s, 105 * s]))}
                                        s={s}
                                    />
                                )}
                                {card.id === 2 && (
                                    <ContractComicSticker
                                        frame={frame}
                                        isSpotlight={isSpotlight}
                                        size={Math.round(interpolate(dockProgress, [0, 1], [250 * s, 205 * s]))}
                                        s={s}
                                    />
                                )}
                                {card.id === 3 && (
                                    <AlarmClockComicSticker
                                        frame={frame}
                                        isSpotlight={isSpotlight}
                                        size={Math.round(interpolate(dockProgress, [0, 1], [135 * s, 110 * s]))}
                                        s={s}
                                    />
                                )}
                                {card.id === 4 && (
                                    <WarningSweatComicSticker
                                        frame={frame}
                                        isSpotlight={isSpotlight}
                                        size={Math.round(interpolate(dockProgress, [0, 1], [240 * s, 195 * s]))}
                                        s={s}
                                    />
                                )}
                            </div>
                        )}

                        {/* 3. CHÙM SAO VỠ TUNG SẠCH SẼ TẠI A-HA MOMENT */}
                        {showBurstSparks && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pointerEvents: 'none',
                                    zIndex: 30,
                                }}
                            >
                                <Sparkles size={80 * s} color={card.badgeColor} strokeWidth={2.6} />
                            </div>
                        )}

                        {/* 4. NỘI DUNG TRỌNG TÂM: CÂU HỎI ĐỘC THOẠI TO RÕ RÀNG, HOÀN TOÀN KHÔNG CÒN GẠCH ĐẦU DÒNG */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '22%',
                                bottom: '24%',
                                left: '18%',
                                right: '18%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: Math.round(interpolate(dockProgress, [0, 1], [18 * s, 14 * s])),
                                zIndex: 2,
                                textAlign: 'center',
                                pointerEvents: 'none',
                            }}
                        >
                            {/* BADGE TAG RỰC RỠ, GỌN GÀNG, ĐẬM CHẤT COMIC POP-ART */}
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: `${Math.round(interpolate(dockProgress, [0, 1], [7 * s, 5 * s]))}px ${Math.round(interpolate(dockProgress, [0, 1], [22 * s, 18 * s]))}px`,
                                    borderRadius: 999,
                                    background: card.badgeColor,
                                    border: `${Math.max(2.2, 2.8 * s)}px solid #0f172a`,
                                    boxShadow: `${2.8 * s}px ${2.8 * s}px 0px #0f172a`,
                                    color: '#ffffff',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: badgeSize,
                                        fontWeight: 900,
                                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {card.badge}
                                </span>
                            </div>

                            {/* TIÊU ĐỀ CÂU HỎI SIÊU TO, ĐẬM ĐÀ, CỰC KỲ DỄ ĐỌC */}
                            <span
                                style={{
                                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                                    fontSize: titleSize,
                                    fontWeight: 900,
                                    color: '#0f172a',
                                    letterSpacing: '-0.025em',
                                    lineHeight: 1.18,
                                    textAlign: 'center',
                                    textWrap: 'balance',
                                }}
                            >
                                {card.title}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
