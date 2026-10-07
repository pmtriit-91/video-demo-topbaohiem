import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, Img, Easing } from 'remotion';
import {
    Sparkles,
    Layers,
    CheckCircle2,
    MousePointer2,
    FileCheck,
    Building2,
    Zap,
    Smartphone,
    Laptop,
    ShieldCheck,
} from 'lucide-react';

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Kích thước chuẩn tính toán trực tiếp theo viewport để hỗ trợ 100% 1080p, 2K và 4K
    const is4K = width >= 3840;
    const s = is4K ? 1 : width / 3840; // Hệ số typographic

    // 1. Phân bổ kích thước 2 cụm:
    // A. Chuỗi hoạt cảnh mở nắp MacBook Pro Apple CDN (78 frames @ 3456x1824) - Dành riêng cho HỒI 0
    const appleFrameH = Math.round(height * 0.90);
    const appleFrameW = Math.round(appleFrameH * (3456 / 1824));

    // B. Chiếc MacBook Pro 90 độ trực diện ngang tầm mắt (2200 x 1340) - Dành cho HỒI 1 & HỒI 2 (Showcase Website)
    const mac90W = Math.round(width * 0.585);
    const mac90H = Math.round(mac90W * (1340 / 2200));
    const screen90X = Math.round(mac90W * (224 / 2200));
    const screen90Y = Math.round(mac90H * (40 / 1340));
    const screen90W = Math.round(mac90W * (1752 / 2200));
    const screen90H = Math.round(mac90H * (1136 / 1340));
    const widgetBtnSize = Math.round(screen90W * 0.046);

    const phoneW = Math.round(width * 0.112);
    const phoneH = Math.round(phoneW * 2.05); // Tỉ lệ iPhone 16 Pro

    const leftColW = Math.round(width * 0.32);

    // =========================================================================
    // HỒI 0: TIẾN TRÌNH MỞ NẮP TỰ NHIÊN (0 -> 110: APPLE & 3D ĐỒNG BỘ 1:1 CHUẨN 60FPS)
    // =========================================================================
    // Frame 1 -> 48: Apple video mở tự nhiên
    // Frame 49 -> 50: Chuyển tiếp & hòa trộn đà quán tính (momentum)
    // Frame 51 -> 110: 3D USDZ Apple mở mượt mà lên 90 độ, triệt tiêu hoàn toàn điểm dừng
    const currentOpenFrame = Math.min(110, Math.max(1, frame));
    const openFrameSrc = staticFile(
        `assets/macbook_open/frames_webp/frame_${String(currentOpenFrame).padStart(3, '0')}.webp`
    );

    // Pha 1 Fade Out & Chuyển sang Pha 2 (ngay khi mở nắp chạm mốc 90 độ tại frame 110-112)
    const state1Opacity = interpolate(frame, [110, 112], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const state1Scale = 1;

    // Pha 2: MacBook 90 độ khớp hoàn hảo 1:1 góc nhìn và vị trí
    const state2Opacity = interpolate(frame, [110, 112], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const state2Scale = 1;

    // Màn hình Liquid Retina 90 độ thức giấc bừng sáng (frame 110 -> 126)
    const screenWakeUp = interpolate(frame, [110, 126], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    });

    // Chiếc iPhone 16 Pro lướt vào tiếp ứng từ bên phải
    const phoneEntrance = spring({
        frame: Math.max(0, frame - 116),
        fps,
        config: { damping: 15, mass: 1.0, stiffness: 70 },
    });

    // Push-in nhẹ toàn bộ MacBook về cuối cảnh
    const macPushIn = interpolate(
        frame,
        [0, 120, 850, 980, 1080],
        [1, 1, 1.02, 1.05, 1.25],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    // =========================================================================
    // CƠ CHẾ LĂN TRANG PARALLAX CHẬM RÃI TRÊN MÀN HÌNH 90 ĐỘ (2910 x 10188 px)
    // =========================================================================
    const imgW = 2910;
    const imgH = 10188;
    const renderedPageH = Math.round(imgH * (screen90W / imgW));
    const maxScroll = Math.max(0, renderedPageH - screen90H);

    const scrollTargetQuyTrinh = Math.round((4000 / imgW) * screen90W);
    const scrollTargetDoiTac = Math.round((6200 / imgW) * screen90W);

    const scrollY = interpolate(
        frame,
        [
            0, // Khởi đầu: Hero & Header
            280, // Giữ nguyên ở Hero để click thẻ và nhận diện thương hiệu
            440, // Lăn êm ái xuống Quy trình mua 4 bước & Banners
            640, // Dừng nhẹ xem quy trình
            780, // Lăn xuống Khối Đối tác lớn & Mạng lưới bảo lãnh
            940, // Lăn chạm đáy: FAQ, Tin tức & Footer Bộ Công Thương
            1080, // Giữ chân trang trước khi zoom
        ],
        [
            0, // Hero
            0, // Dwell Hero
            -scrollTargetQuyTrinh, // Quy trình 4 bước
            -scrollTargetQuyTrinh, // Dwell quy trình
            -scrollTargetDoiTac, // Đối tác lớn
            -maxScroll, // Chạm đáy Footer Bộ Công Thương
            -maxScroll, // Kết thúc
        ],
        {
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        },
    );

    // Ánh sáng quét qua mặt kính Retina (Cinematic Glare / Sheen)
    // Ánh sáng quét qua mặt kính Retina (Cinematic Glare / Sheen khi mở sáng)
    const glareX = interpolate(frame, [110, 160, 650, 1080], [-100, 180, 240, 400], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Con trỏ chuột tương tác Studio trên MacBook 90 độ
    const cursorOpacity = interpolate(frame, [118, 140, 275, 310], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Tọa độ mục tiêu click nút "So sánh ngay" thẻ Sức khoẻ
    const targetCursorX = Math.round((700 / imgW) * screen90W);
    const targetCursorY = Math.round((1260 / imgW) * screen90W);

    const cursorX = interpolate(
        frame,
        [118, 180, 240, 290],
        [
            Math.round(screen90W * 0.5),
            targetCursorX,
            targetCursorX,
            targetCursorX + Math.round(screen90W * 0.04),
        ],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorY = interpolate(
        frame,
        [118, 180, 240, 290],
        [
            Math.round(screen90H * 0.25),
            targetCursorY,
            targetCursorY,
            targetCursorY + Math.round(screen90H * 0.06),
        ],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorClick = interpolate(frame, [205, 215, 225], [1, 0.82, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const cardHoverPulse = interpolate(frame, [210, 235, 275], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Đồng bộ màn hình trên iPhone 16 Pro (Mobile Step Sync 2 -> 3 -> 4)
    const phoneStep = frame < 520 ? 2 : frame < 800 ? 3 : 4;
    const phoneTransition = spring({
        frame: frame < 520 ? frame : frame < 800 ? frame - 520 : frame - 800,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    // HỒI 1: Hiệu ứng gõ chữ Typewriter Kinetic & Dynamic Topics (Cột Trái Dẫn Dắt)
    const fullLine1 = 'SO SÁNH MINH BẠCH';
    const fullLine2 = 'CẤP ĐƠN 1-CHẠM';

    const chars1 = Math.min(
        fullLine1.length,
        Math.max(
            0,
            Math.floor(
                interpolate(frame, [105, 145], [0, fullLine1.length], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }),
            ),
        ),
    );
    const typedLine1 = fullLine1.slice(0, chars1);

    const chars2 = Math.min(
        fullLine2.length,
        Math.max(
            0,
            Math.floor(
                interpolate(frame, [145, 185], [0, fullLine2.length], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }),
            ),
        ),
    );
    const typedLine2 = fullLine2.slice(0, chars2);

    const showCursor1 = frame >= 105 && frame < 145;
    const showCursor2 = frame >= 145;
    const cursorBlink = Math.floor(frame / 16) % 2 === 0;

    const leftColEntrance = spring({
        frame: Math.max(0, frame - 95),
        fps,
        config: { damping: 16, mass: 0.9, stiffness: 85 },
    });

    const TOPICS = [
        {
            badge: 'CỔNG BẢO HIỂM ĐIỆN TỬ',
            title: 'So Sánh Minh Bạch Đa Hãng',
            desc: 'Khách hàng dễ dàng tra cứu, so sánh biểu phí và quyền lợi bảo hiểm từ các thương hiệu lớn nhất Việt Nam.',
            color: '#ed017c',
            icon: Sparkles,
        },
        {
            badge: 'DANH MỤC TRỌNG ĐIỂM',
            title: 'Đầy Đủ Nghiệp Vụ Bảo Hiểm',
            desc: 'TNDS & Vật chất ô tô, xe máy; Bảo hiểm Sức khoẻ toàn diện; Cháy nổ bắt buộc NĐ 67 và Du lịch quốc tế.',
            color: '#0284c7',
            icon: Layers,
        },
        {
            badge: 'CÔNG NGHỆ 1-CHẠM TIÊN TIẾN',
            title: 'Cấp Đơn Tức Thì Trong 60 Giây',
            desc: 'Tích hợp AI OCR quét ảnh giấy tờ tự động điền đơn. Thanh toán linh hoạt qua MoMo, VNPay, thẻ Visa.',
            color: '#10b981',
            icon: Zap,
        },
        {
            badge: 'MẠNG LƯỚI ĐỐI TÁC HÀNG ĐẦU',
            title: 'Bảo Chứng Bởi 5 Tập Đoàn Lớn',
            desc: 'Liên kết trực tiếp cùng Bảo Việt, PVI, PTI, PJICO, BIC với mạng lưới bảo lãnh viện phí và gara toàn quốc.',
            color: '#f59e0b',
            icon: Building2,
        },
        {
            badge: 'PHÁP LÝ & BẢO MẬT CHUẨN MỰC',
            title: 'Chứng Nhận Bộ Công Thương',
            desc: 'Hệ thống vận hành minh bạch, đạt đầy đủ chứng nhận thương mại điện tử, bảo vệ quyền lợi khách hàng.',
            color: '#8b5cf6',
            icon: ShieldCheck,
        },
    ];

    // Opacity cho 5 giai đoạn nội dung đồng bộ với nhịp cuộn
    const callout1Opacity = interpolate(frame, [25, 55, 220, 245], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout2Opacity = interpolate(frame, [245, 275, 480, 510], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout3Opacity = interpolate(frame, [510, 540, 740, 770], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout4Opacity = interpolate(frame, [770, 800, 930, 960], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout5Opacity = interpolate(frame, [960, 980, 1050, 1080], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const topicOpacities = [callout1Opacity, callout2Opacity, callout3Opacity, callout4Opacity, callout5Opacity];

    // Fade out nhẹ toàn scene ở 25 frame cuối để chuyển cảnh sang Scene 2
    const sceneFadeOut = interpolate(frame, [1055, 1080], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: sceneFadeOut,
                zIndex: 2,
                perspective: 2500,
            }}
        >
            {/* ========================================================= */}
            {/* 0. NỀN STUDIO SANG TRỌNG CHUẨN APPLE KEYNOTE (DEEP BLACK) */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#000000',
                    zIndex: 0,
                }}
            >
                {/* Ánh sáng mềm tinh tế sau khối Typography bên trái */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '4%',
                        width: '38%',
                        height: '55%',
                        background:
                            'radial-gradient(ellipse at center, rgba(237, 1, 124, 0.08) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 80%)',
                        filter: 'blur(90px)',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* ========================================================= */}
            {/* 1. TOP HEADER BRANDING & PHÁT THẢO KHÔNG GIAN SANG TRỌNG */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: Math.round(height * 0.035),
                    left: Math.round(width * 0.035),
                    right: Math.round(width * 0.035),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 30,
                    opacity: interpolate(frame, [10, 50], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                {/* Logo & Category Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 * s }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12 * s,
                            padding: `${8 * s}px ${20 * s}px`,
                            borderRadius: 999,
                            background: 'rgba(237, 1, 124, 0.12)',
                            border: '1px solid rgba(237, 1, 124, 0.45)',
                            boxShadow: '0 4px 20px rgba(237, 1, 124, 0.25)',
                        }}
                    >
                        <span
                            style={{
                                width: 10 * s,
                                height: 10 * s,
                                borderRadius: '50%',
                                background: '#f43f5e',
                                boxShadow: '0 0 10px #f43f5e',
                                display: 'inline-block',
                            }}
                        />
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: Math.max(12, 18 * s),
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: '#e11d48',
                                textTransform: 'uppercase',
                            }}
                        >
                            LIVE PORTAL VIEW • TOPBAOHIEM.VN
                        </span>
                    </div>

                    <span style={{ fontSize: 18 * s, color: 'rgba(255, 255, 255, 0.25)' }}>/</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 * s }}>
                        <Laptop size={18 * s} color="#64748b" />
                        <span
                            style={{
                                fontFamily: 'var(--font-primary)',
                                fontSize: Math.max(12, 17 * s),
                                fontWeight: 600,
                                color: '#e2e8f0',
                            }}
                        >
                            MacBook Pro M4 Liquid Retina
                        </span>
                        <span style={{ fontSize: 16 * s, color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
                        <Smartphone size={17 * s} color="#64748b" />
                        <span
                            style={{
                                fontFamily: 'var(--font-primary)',
                                fontSize: Math.max(12, 17 * s),
                                fontWeight: 600,
                                color: '#e2e8f0',
                            }}
                        >
                            iPhone 16 Pro Retina
                        </span>
                    </div>
                </div>

                {/* Right Status Badge */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12 * s,
                        padding: `${8 * s}px ${22 * s}px`,
                        borderRadius: 999,
                        background: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(16px)',
                    }}
                >
                    <Sparkles color="#38bdf8" size={18 * s} />
                    <span
                        style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: Math.max(12, 17 * s),
                            fontWeight: 600,
                            color: '#ffffff',
                        }}
                    >
                        Cổng Mua Bán & So Sánh Bảo Hiểm Trực Tuyến Toàn Diện
                    </span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1. KHỐI TRÁI: KINETIC TYPOGRAPHY & TYPEWRITER HERO        */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: Math.round(width * 0.04),
                    width: leftColW,
                    transform: `translateY(-50%) translateX(${interpolate(leftColEntrance, [0, 1], [-35, 0])}px)`,
                    opacity: leftColEntrance,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    zIndex: 30,
                }}
            >
                {/* A. Tagline Pill Badge */}
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10 * s,
                        padding: `${8 * s}px ${20 * s}px`,
                        borderRadius: 999,
                        background: 'rgba(237, 1, 124, 0.08)',
                        border: '1.5px solid rgba(237, 1, 124, 0.28)',
                        boxShadow: '0 4px 20px rgba(237, 1, 124, 0.12)',
                        backdropFilter: 'blur(12px)',
                        marginBottom: 18 * s,
                    }}
                >
                    <Sparkles size={18 * s} color="#ed017c" />
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: Math.max(12, 16 * s),
                            fontWeight: 700,
                            color: '#ed017c',
                            letterSpacing: 0.8 * s,
                        }}
                    >
                        TOPBAOHIEM • INSURTECH TIÊN PHONG
                    </span>
                </div>

                {/* B. Typewriter Kinetic Headline (Dòng 1 & Dòng 2) */}
                <div
                    style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: Math.max(26, 50 * s),
                        fontWeight: 800,
                        lineHeight: 1.15,
                        color: '#ffffff',
                        letterSpacing: -1 * s,
                        marginBottom: 20 * s,
                    }}
                >
                    {/* Dòng 1: SO SÁNH MINH BẠCH */}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#ffffff' }}>{typedLine1}</span>
                        {showCursor1 && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 4 * s,
                                    height: Math.max(24, 46 * s),
                                    backgroundColor: '#ed017c',
                                    marginLeft: 4 * s,
                                    opacity: cursorBlink ? 1 : 0,
                                    boxShadow: '0 0 12px rgba(237, 1, 124, 0.8)',
                                }}
                            />
                        )}
                    </div>

                    {/* Dòng 2: CẤP ĐƠN 1-CHẠM */}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span
                            style={{
                                background: 'linear-gradient(90deg, #ed017c 0%, #e11d48 50%, #0284c7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {typedLine2}
                        </span>
                        {showCursor2 && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 4 * s,
                                    height: Math.max(24, 46 * s),
                                    backgroundColor: '#ed017c',
                                    marginLeft: 4 * s,
                                    opacity: cursorBlink ? 1 : 0,
                                    boxShadow: '0 0 12px rgba(237, 1, 124, 0.8)',
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* C. Dynamic Context Narrative Card */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        minHeight: Math.round(140 * s),
                        marginBottom: 24 * s,
                    }}
                >
                    {TOPICS.map((topic, idx) => {
                        const op = topicOpacities[idx];
                        const IconComp = topic.icon;
                        if (op <= 0.01) return null;
                        return (
                            <div
                                key={idx}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    opacity: op,
                                    transform: `translateY(${interpolate(op, [0, 1], [15, 0])}px)`,
                                    pointerEvents: 'none',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8 * s,
                                        padding: `${5 * s}px ${14 * s}px`,
                                        borderRadius: 999,
                                        backgroundColor: `${topic.color}15`,
                                        border: `1px solid ${topic.color}35`,
                                        color: topic.color,
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: Math.max(11, 14 * s),
                                        fontWeight: 700,
                                        marginBottom: 10 * s,
                                    }}
                                >
                                    <IconComp size={15 * s} /> {topic.badge}
                                </div>

                                <h4
                                    style={{
                                        fontFamily: 'var(--font-primary)',
                                        fontSize: Math.max(16, 24 * s),
                                        fontWeight: 700,
                                        color: '#f8fafc',
                                        margin: `0 0 ${8 * s}px 0`,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {topic.title}
                                </h4>

                                <p
                                    style={{
                                        fontFamily: 'var(--font-primary)',
                                        fontSize: Math.max(12, 17 * s),
                                        color: '#94a3b8',
                                        lineHeight: 1.55,
                                        margin: 0,
                                    }}
                                >
                                    {topic.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* D. Live Credibility Metrics */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14 * s,
                        width: '100%',
                    }}
                >
                    {[
                        { value: '75+', label: 'Đối Tác Hàng Đầu', color: '#ed017c' },
                        { value: '100%', label: 'Cấp Đơn Online', color: '#0284c7' },
                        { value: '60s', label: 'Xử Lý Siêu Tốc', color: '#10b981' },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            style={{
                                flex: 1,
                                padding: `${12 * s}px ${14 * s}px`,
                                borderRadius: 16 * s,
                                background: 'rgba(15, 23, 42, 0.75)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                                backdropFilter: 'blur(16px)',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: Math.max(16, 26 * s),
                                    fontWeight: 800,
                                    color: stat.color,
                                    lineHeight: 1.1,
                                    marginBottom: 4 * s,
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(10, 13 * s),
                                    fontWeight: 600,
                                    color: '#94a3b8',
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========================================================= */}
            {/* 2. CỤM PHẢI: THIẾT BỊ CHÍNH HÃNG APPLE (MACBOOK + IPHONE)  */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: Math.round(width * 0.035),
                    transform: `translateY(-50%) scale(${macPushIn})`,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* WRAPPER CỤM THIẾT BỊ (ĐỊNH HÌNH THEO KHUNG MACBOOK 90 ĐỘ) */}
                <div
                    style={{
                        position: 'relative',
                        width: mac90W,
                        height: mac90H,
                    }}
                >
                    {/* ========================================================================= */}
                    {/* A. PHA 1: CHUỖI MỞ NẮP 78 FRAMES TỰ NHIÊN (FADE OUT & PUSH-IN TẠI 48-62) */}
                    {/* ========================================================================= */}
                    {state1Opacity > 0.01 && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) scale(${state1Scale})`,
                                width: appleFrameW,
                                height: appleFrameH,
                                opacity: state1Opacity,
                                pointerEvents: 'none',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Img
                                src={openFrameSrc}
                                alt="MacBook Opening Sequence"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    )}

                    {/* ========================================================================= */}
                    {/* B. PHA 2 & 3: MACBOOK PRO 90 ĐỘ TRỰC DIỆN (CHÍNH HÃNG APPLE ĐÃ ĐỤC RỖNG)   */}
                    {/* ========================================================================= */}
                    {state2Opacity > 0.01 && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: mac90W,
                                height: mac90H,
                                opacity: state2Opacity,
                                transform: `scale(${state2Scale})`,
                                zIndex: 6,
                            }}
                        >
                            {/* 1. LỚP DƯỚI: NỘI DUNG MÀN HÌNH RETINA XDR (NẰM TRỌN TRONG LÒNG ĐỤC RỖNG) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: screen90X,
                                    top: screen90Y,
                                    width: screen90W,
                                    height: screen90H,
                                    overflow: 'hidden',
                                    backgroundColor: '#000000',
                                    opacity: screenWakeUp,
                                    borderRadius: `${Math.round(mac90W * 0.008)}px ${Math.round(mac90W * 0.008)}px 0 0`,
                                    boxShadow: `0 0 ${40 * screenWakeUp}px rgba(237, 1, 124, ${0.4 * screenWakeUp})`,
                                    zIndex: 2,
                                }}
                            >
                            {/* ẢNH FULL PAGE TRANG CHỦ TOPBAOHIEM (2910 x 10188 px) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${scrollY}px)`,
                                    willChange: 'transform',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/trangchu/fullsize-trangchu.png')}
                                    alt="TopBaoHiem Full Trang Chủ"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />

                                {/* Hiệu ứng Highlight Pulse lên thẻ Sức khoẻ khi chuột click */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: Math.round((900 / 2910) * screen90W),
                                        left: `${(490 / 2910) * 100}%`,
                                        width: `${(610 / 2910) * 100}%`,
                                        height: Math.round((540 / 2910) * screen90W),
                                        borderRadius: 20 * s,
                                        border: `${3 * s}px solid #ed017c`,
                                        boxShadow: `0 0 ${40 * cardHoverPulse}px rgba(237, 1, 124, ${0.75 * cardHoverPulse})`,
                                        backgroundColor: `rgba(237, 1, 124, ${0.12 * cardHoverPulse})`,
                                        opacity: cardHoverPulse,
                                        pointerEvents: 'none',
                                    }}
                                />
                            </div>

                            {/* CON TRỎ CHUỘT TƯƠNG TÁC */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: cursorY,
                                    left: cursorX,
                                    zIndex: 40,
                                    opacity: cursorOpacity,
                                    transform: `scale(${cursorClick})`,
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5))',
                                }}
                            >
                                <MousePointer2
                                    size={Math.max(16, 28 * s)}
                                    color="#0f172a"
                                    fill="#ffffff"
                                    strokeWidth={1.8}
                                />
                                {cardHoverPulse > 0 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: 32 * s,
                                            height: 32 * s,
                                            borderRadius: '50%',
                                            border: `${2 * s}px solid #e11d48`,
                                            transform: `scale(${1 + cardHoverPulse * 1.5})`,
                                            opacity: 1 - cardHoverPulse,
                                            pointerEvents: 'none',
                                        }}
                                    />
                                )}
                            </div>

                            {/* Dải Ánh Sáng Specular Glare quét qua mặt kính Retina */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: `linear-gradient(115deg, transparent ${glareX - 40}%, rgba(255, 255, 255, 0.12) ${glareX}%, transparent ${glareX + 40}%)`,
                                    pointerEvents: 'none',
                                    zIndex: 35,
                                }}
                            />

                            {/* CỤM NÚT HỖ TRỢ & GIỎ HÀNG CỐ ĐỊNH */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: Math.round(screen90H * 0.08),
                                    right: Math.round(screen90W * 0.06),
                                    zIndex: 38,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: Math.round(widgetBtnSize * 0.24),
                                    pointerEvents: 'none',
                                }}
                            >
                                {/* Nút Giỏ Hàng */}
                                <div
                                    style={{
                                        position: 'relative',
                                        width: widgetBtnSize,
                                        height: widgetBtnSize,
                                        borderRadius: '50%',
                                        background: '#effcf3',
                                        boxShadow:
                                            '0 4px 14px rgba(46, 162, 56, 0.25), 0 2px 6px rgba(0, 0, 0, 0.12)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <svg
                                        width={Math.round(widgetBtnSize * 0.52)}
                                        height={Math.round(widgetBtnSize * 0.52)}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M7 4L10 9M17 4L14 9"
                                            stroke="#2ea238"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4 9H20"
                                            stroke="#2ea238"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M5.5 10L6.8 19C6.9 19.6 7.4 20 8 20H16C16.6 20 17.1 19.6 17.2 19L18.5 10"
                                            fill="#2ea238"
                                            stroke="#2ea238"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <line
                                            x1="9.5"
                                            y1="12"
                                            x2="9.5"
                                            y2="17"
                                            stroke="#effcf3"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="12"
                                            y1="12"
                                            x2="12"
                                            y2="17"
                                            stroke="#effcf3"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="14.5"
                                            y1="12"
                                            x2="14.5"
                                            y2="17"
                                            stroke="#effcf3"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: -Math.round(widgetBtnSize * 0.05),
                                            right: -Math.round(widgetBtnSize * 0.05),
                                            width: Math.round(widgetBtnSize * 0.38),
                                            height: Math.round(widgetBtnSize * 0.38),
                                            borderRadius: '50%',
                                            background: '#286b2f',
                                            color: '#ffffff',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: Math.round(widgetBtnSize * 0.22),
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            border: '1.5px solid #ffffff',
                                        }}
                                    >
                                        2
                                    </div>
                                </div>

                                {/* Nút Hỗ Trợ Chat */}
                                <div
                                    style={{
                                        position: 'relative',
                                        width: widgetBtnSize,
                                        height: widgetBtnSize,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            width: Math.round(widgetBtnSize * 1.55),
                                            height: Math.round(widgetBtnSize * 1.55),
                                            borderRadius: '50%',
                                            background: 'rgba(237, 1, 124, 0.15)',
                                            transform: `scale(${1 + Math.sin((frame / 20) * Math.PI) * 0.08})`,
                                            pointerEvents: 'none',
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: widgetBtnSize,
                                            height: widgetBtnSize,
                                            borderRadius: '50%',
                                            background:
                                                'linear-gradient(135deg, #f43f5e 0%, #e11d48 40%, #be123c 100%)',
                                            boxShadow: '0 6px 18px rgba(225, 29, 72, 0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 2,
                                        }}
                                    >
                                        <svg
                                            width={Math.round(widgetBtnSize * 0.52)}
                                            height={Math.round(widgetBtnSize * 0.52)}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <rect x="3" y="5" width="18" height="14" rx="3.5" fill="#ffffff" />
                                            <path
                                                d="M7 9.5L12 13.5L17 9.5"
                                                stroke="#e11d48"
                                                strokeWidth="2.4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. LỚP TRÊN: KHUNG VỎ MACBOOK PRO 90 ĐỘ CHÍNH HÃNG APPLE (ĐÃ ĐỤC RỖNG MÀN HÌNH) */}
                            <Img
                                src={staticFile('assets/macbook_open/macbook_front_90_transparent.png')}
                                alt="MacBook Pro 90 Degree Front"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                }}
                            />
                        </div>
                    )}

                    {/* ========================================== */}
                    {/* C. CHIẾC IPHONE 16 PRO RETINA ĐỒNG BỘ     */}
                    {/* ========================================== */}
                    <div
                        style={{
                            position: 'absolute',
                            right: -Math.round(mac90W * 0.035),
                            bottom: -Math.round(mac90H * 0.05),
                            width: phoneW,
                            height: phoneH,
                            transformStyle: 'preserve-3d',
                            transform: `translateX(${interpolate(phoneEntrance, [0, 1], [Math.round(phoneW * 0.85), 0])}px) scale(${phoneEntrance}) rotateX(3deg) rotateY(-8deg) translateZ(40px)`,
                            opacity: phoneEntrance,
                            zIndex: 25,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Shadow dưới chân iPhone trên nền sáng */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '88%',
                                height: Math.round(phoneH * 0.08),
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.12) 50%, transparent 75%)',
                                filter: 'blur(16px)',
                                transform: 'rotateX(85deg) translateY(18px)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* KHUNG VỎ IPHONE 16 PRO TITANIUM */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                borderRadius: Math.round(phoneW * 0.12),
                                padding: `${Math.round(phoneW * 0.024)}px`,
                                background: 'linear-gradient(145deg, #475569 0%, #1e293b 40%, #0f172a 100%)',
                                border: `${Math.max(2, 3 * s)}px solid #64748b`,
                                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
                                display: 'flex',
                                flexDirection: 'column',
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Màn hình Super Retina XDR OLED */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: Math.round(phoneW * 0.095),
                                    background: '#ffffff',
                                    overflow: 'hidden',
                                    boxShadow: '0 0 0 2px #050608 inset',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Dynamic Island Pill */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: Math.round(phoneH * 0.016),
                                        width: Math.round(phoneW * 0.26),
                                        height: Math.round(phoneH * 0.032),
                                        borderRadius: 18,
                                        background: '#000000',
                                        zIndex: 30,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        paddingRight: 8 * s,
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 7 * s,
                                            height: 7 * s,
                                            borderRadius: '50%',
                                            background: 'radial-gradient(circle at 35% 35%, #1e293b 0%, #020617 100%)',
                                        }}
                                    />
                                </div>

                                {/* Nội dung Màn hình Mobile thay đổi linh hoạt theo các bước */}
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        paddingTop: Math.round(phoneH * 0.02),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transform: `scale(${interpolate(phoneTransition, [0, 1], [0.97, 1])})`,
                                        opacity: interpolate(phoneTransition, [0, 1], [0.65, 1]),
                                    }}
                                >
                                    <Img
                                        src={staticFile(
                                            phoneStep === 2
                                                ? 'assets/trangchu/mobile_step2.png'
                                                : phoneStep === 3
                                                  ? 'assets/trangchu/mobile_step3.png'
                                                  : 'assets/trangchu/mobile_step4.png',
                                        )}
                                        alt="Mobile Step Screen"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>

                                {/* Home Indicator Bar ở cạnh dưới */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 6 * s,
                                        width: Math.round(phoneW * 0.32),
                                        height: 3 * s,
                                        borderRadius: 4,
                                        background: '#0f172a',
                                        opacity: 0.6,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ========================================================= */}
            {/* 3. FOOTER PROGRESS BAR: THEO DÕI ĐỘ SÂU TRANG WEB         */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    bottom: Math.round(height * 0.03),
                    left: Math.round(width * 0.035),
                    right: Math.round(width * 0.035),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 30,
                    opacity: interpolate(frame, [30, 80], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    }),
                }}
            >
                {/* Thanh chỉ báo tiến trình cuộn trang */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16 * s,
                        flex: 1,
                        maxWidth: Math.round(width * 0.4),
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: Math.max(11, 16 * s),
                            color: '#94a3b8',
                            fontWeight: 700,
                        }}
                    >
                        PARALLAX SCROLL DEPTH
                    </span>
                    <div
                        style={{
                            flex: 1,
                            height: Math.max(4, 6 * s),
                            borderRadius: 999,
                            background: 'rgba(15, 23, 42, 0.08)',
                            border: '1px solid rgba(15, 23, 42, 0.06)',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                width: `${interpolate(-scrollY, [0, maxScroll], [10, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #e11d48, #0284c7)',
                                boxShadow: '0 0 10px rgba(225, 29, 72, 0.5)',
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: Math.max(11, 16 * s),
                            color: '#ffffff',
                            fontWeight: 700,
                        }}
                    >
                        {Math.round(
                            interpolate(-scrollY, [0, maxScroll], [0, 100], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            }),
                        )}
                        %
                    </span>
                </div>

                {/* Quick Info Slogan */}
                <div
                    style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: Math.max(12, 17 * s),
                        color: '#94a3b8',
                        fontWeight: 600,
                    }}
                >
                    Trang chủ TopBaoHiem • Tương thích hoàn hảo mọi kích cỡ màn hình
                </div>
            </div>
        </div>
    );
};
