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

    // 1. Phân bổ kích thước 2 cụm (Cột Trái Typography ~32%, Cụm Phải Thiết Bị 3D ~51.5%)
    const macW = Math.round(width * 0.515);
    const macH = Math.round(macW * (10 / 16)); // Chuẩn 16:10 MacBook Liquid Retina
    const macScreenPadding = Math.round(macW * 0.012);
    const macScreenW = macW - macScreenPadding * 2;
    const macScreenH = macH - macScreenPadding * 2 - Math.round(macW * 0.008);
    const widgetBtnSize = Math.round(macScreenW * 0.046);

    const phoneW = Math.round(width * 0.118);
    const phoneH = Math.round(phoneW * 2.05); // Tỉ lệ iPhone 16 Pro

    const leftColW = Math.round(width * 0.32);

    // 2. Chuyển động xuất hiện thiết bị (Entrance Spring)
    const deviceEntrance = spring({
        frame,
        fps,
        config: { damping: 16, mass: 1.1, stiffness: 80 },
    });

    // 3. Góc xoay 3D Spatial Camera (Pan & Tilt theo nhịp)
    const macRotY = interpolate(frame, [0, 180, 480, 780, 960, 1080], [-8, -5, -3, -2, 0, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const macRotX = interpolate(frame, [0, 180, 480, 780, 960, 1080], [6, 4, 3, 2, 0, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const macScale = interpolate(
        frame,
        [0, 120, 850, 980, 1080],
        [0.92, 1, 1.02, 1.05, 1.25], // Cuối scene push-in điện ảnh chuẩn bị chuyển sang Scene 2
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    // 4. Cơ chế Lăn Trang Parallax Chậm Rãi (Full-Length Smooth Momentum Scroll)
    // Ảnh thiết kế mới: 2910 x 10188 (chuẩn Retina siêu nét trang chủ TopBaoHiem)
    const imgW = 2910;
    const imgH = 10188;
    const renderedPageH = Math.round(imgH * (macScreenW / imgW));
    const maxScroll = Math.max(0, renderedPageH - macScreenH);

    // Vị trí các mốc nội dung trên ảnh fullsize-trangchu.png (2910 x 10188):
    // - Hero & Thẻ Sản Phẩm Hot: 0
    // - Quy trình mua 4 bước & Banners: Y ~ 4000 (scale: 4000/2910 * macScreenW)
    // - Đối tác lớn (PTI, PVI, BIC, PJICO, BAOVIET): Y ~ 6200 (scale: 6200/2910 * macScreenW)
    // - Chạm đáy Footer có dấu Bộ Công Thương: maxScroll
    const scrollTargetQuyTrinh = Math.round((4000 / imgW) * macScreenW);
    const scrollTargetDoiTac = Math.round((6200 / imgW) * macScreenW);

    const scrollY = interpolate(
        frame,
        [
            0, // Khởi đầu: Hero & Header
            120, // Giữ nguyên ở Hero để nhận diện thương hiệu
            360, // Tương tác chuột click tab/thẻ bảo hiểm
            480, // Lăn êm ái xuống Quy trình mua 4 bước & Banners
            680, // Dừng nhẹ xem quy trình
            800, // Lăn xuống Khối Đối tác lớn & Mạng lưới bảo lãnh
            960, // Lăn chạm đáy: FAQ, Tin tức & Footer Bộ Công Thương
            1080, // Giữ chân trang trước khi zoom
        ],
        [
            0, // Hero
            0, // Dwell Hero
            0, // Tương tác thẻ
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

    // 5. Ánh sáng quét qua mặt kính Retina (Cinematic Glare / Sheen)
    const glareX = interpolate(frame, [0, 500, 1080], [-100, 250, 400], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 6. Con trỏ chuột tương tác Studio trên MacBook
    const cursorOpacity = interpolate(frame, [100, 140, 480, 520], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const cursorX = interpolate(
        frame,
        [120, 240, 360, 440],
        [
            macScreenW * 0.5,
            macScreenW * 0.38,
            Math.round((990 / imgW) * macScreenW),
            Math.round((990 / imgW) * macScreenW),
        ],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorY = interpolate(
        frame,
        [120, 240, 360, 440],
        [
            Math.round(macScreenH * 0.2),
            Math.round((560 / imgW) * macScreenW),
            Math.round((560 / imgW) * macScreenW),
            Math.round((560 / imgW) * macScreenW),
        ],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorClick = interpolate(frame, [355, 365, 375], [1, 0.82, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const cardHoverPulse = interpolate(frame, [360, 390, 440], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 7. Đồng bộ màn hình trên iPhone 16 Pro (Mobile Step Sync 2 -> 3 -> 4)
    const phoneStep = frame < 520 ? 2 : frame < 800 ? 3 : 4;
    const phoneTransition = spring({
        frame: frame < 520 ? frame : frame < 800 ? frame - 520 : frame - 800,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    // 8. Hiệu ứng gõ chữ Typewriter Kinetic & Dynamic Topics (Cột Trái Dẫn Dắt)
    const fullLine1 = 'SO SÁNH MINH BẠCH';
    const fullLine2 = 'CẤP ĐƠN 1-CHẠM';

    const chars1 = Math.min(
        fullLine1.length,
        Math.max(
            0,
            Math.floor(
                interpolate(frame, [15, 55], [0, fullLine1.length], {
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
                interpolate(frame, [55, 90], [0, fullLine2.length], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }),
            ),
        ),
    );
    const typedLine2 = fullLine2.slice(0, chars2);

    const showCursor1 = frame < 55;
    const showCursor2 = frame >= 55;
    const cursorBlink = Math.floor(frame / 16) % 2 === 0;

    const leftColEntrance = spring({
        frame: Math.max(0, frame - 5),
        fps,
        config: { damping: 16, mass: 0.9, stiffness: 90 },
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
            {/* 0. NỀN SÁNG CAO CẤP STUDIO (LUXURY LIGHT STUDIO BACKGROUND) */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse 95% 75% at 50% 28%, #ffffff 0%, #f8fafc 40%, #eef2f6 75%, #e2e8f0 100%)',
                    zIndex: 0,
                }}
            >
                {/* Ánh sáng đèn studio mềm trên đỉnh */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '15%',
                        right: '15%',
                        height: '50%',
                        background:
                            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.4) 60%, transparent 100%)',
                        filter: 'blur(50px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Lưới toạ độ kiến trúc số siêu mảnh (Subtle Studio Architectural Grid) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
                            linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
                        `,
                        backgroundSize: `${64 * s}px ${64 * s}px`,
                        maskImage: 'radial-gradient(ellipse 80% 65% at 50% 45%, #000 35%, transparent 85%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 45%, #000 35%, transparent 85%)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Ánh phản chiếu sàn studio dưới chân thiết bị */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '35%',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(203, 213, 225, 0.35) 100%)',
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
                            background: 'rgba(225, 29, 72, 0.08)',
                            border: '1px solid rgba(225, 29, 72, 0.28)',
                            boxShadow: '0 4px 16px rgba(225, 29, 72, 0.1)',
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

                    <span style={{ fontSize: 18 * s, color: 'rgba(15, 23, 42, 0.25)' }}>/</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 * s }}>
                        <Laptop size={18 * s} color="#64748b" />
                        <span
                            style={{
                                fontFamily: 'var(--font-primary)',
                                fontSize: Math.max(12, 17 * s),
                                fontWeight: 600,
                                color: '#334155',
                            }}
                        >
                            MacBook Air M3 13-inch
                        </span>
                        <span style={{ fontSize: 16 * s, color: 'rgba(15, 23, 42, 0.2)' }}>•</span>
                        <Smartphone size={17 * s} color="#64748b" />
                        <span
                            style={{
                                fontFamily: 'var(--font-primary)',
                                fontSize: Math.max(12, 17 * s),
                                fontWeight: 600,
                                color: '#334155',
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
                        background: 'rgba(255, 255, 255, 0.88)',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
                        backdropFilter: 'blur(16px)',
                    }}
                >
                    <Sparkles color="#0284c7" size={18 * s} />
                    <span
                        style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: Math.max(12, 17 * s),
                            fontWeight: 600,
                            color: '#0f172a',
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
                        color: '#0f172a',
                        letterSpacing: -1 * s,
                        marginBottom: 20 * s,
                    }}
                >
                    {/* Dòng 1: SO SÁNH MINH BẠCH */}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#0f172a' }}>{typedLine1}</span>
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
                                        color: '#1e293b',
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
                                        color: '#475569',
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
                                background: 'rgba(255, 255, 255, 0.75)',
                                border: '1px solid rgba(15, 23, 42, 0.08)',
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
                                    color: '#64748b',
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========================================================= */}
            {/* 2. CỤM PHẢI: THIẾT BỊ 3D OVERLAP (MACBOOK + IPHONE)       */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: '52%',
                    right: Math.round(width * 0.11),
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* WRAPPER CỤM THIẾT BỊ LỒNG GHÉP 3D */}
                <div
                    style={{
                        position: 'relative',
                        width: macW,
                        height: macH,
                    }}
                >
                    {/* ========================================== */}
                    {/* A. CHIẾC MACBOOK AIR M3 13-INCH RETINA     */}
                    {/* ========================================== */}
                    <div
                        style={{
                            position: 'relative',
                            width: macW,
                            height: macH,
                            transformStyle: 'preserve-3d',
                            transform: `scale(${macScale * deviceEntrance}) rotateX(${macRotX}deg) rotateY(${macRotY}deg)`,
                            transition: 'transform 0.05s linear',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Shadow dưới chân máy chiếu xuống mặt sàn nền sáng */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -Math.round(macH * 0.042),
                                width: '102%',
                                height: Math.round(macH * 0.15),
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.22) 45%, transparent 75%)',
                                filter: 'blur(24px)',
                                transform: 'translateZ(-60px) rotateX(90deg) translateY(24px)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* VỎ MÁY TRÊN (MacBook Display Lid) */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                borderRadius: Math.round(macW * 0.016),
                                padding: `${macScreenPadding}px ${macScreenPadding}px ${macScreenPadding * 1.5}px ${macScreenPadding}px`,
                                background:
                                    'linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 32%, #94a3b8 68%, #64748b 100%)',
                                boxShadow:
                                    '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 2px 4px rgba(255, 255, 255, 0.7) inset, 0 -1px 2px rgba(71, 85, 105, 0.4) inset',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Viền Bezel Đen Tuyển OLED bao quanh màn hình */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: Math.round(macW * 0.012),
                                    background: '#050608',
                                    boxShadow: '0 0 0 2px #000000 inset',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {/* Tai thỏ MacBook Notch & Camera Cảm Biến */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: Math.round(macW * 0.085),
                                        height: Math.round(macH * 0.024),
                                        background: '#050608',
                                        borderRadius: '0 0 10px 10px',
                                        zIndex: 25,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8 * s,
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                                    }}
                                >
                                    {/* Ống kính Camera FaceTime HD */}
                                    <div
                                        style={{
                                            width: 7 * s,
                                            height: 7 * s,
                                            borderRadius: '50%',
                                            background: 'radial-gradient(circle at 35% 35%, #1e293b 0%, #020617 100%)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                        }}
                                    />
                                    {/* Đèn LED xanh lục */}
                                    <div
                                        style={{
                                            width: 4 * s,
                                            height: 4 * s,
                                            borderRadius: '50%',
                                            background: '#22c55e',
                                            boxShadow: '0 0 6px #22c55e',
                                        }}
                                    />
                                </div>

                                {/* KHUNG VIEWPORT MÀN HÌNH RETINA 16:10 CHỨA NỘI DUNG WEB CUỘN DỌC */}
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: Math.round(macW * 0.009),
                                        backgroundColor: '#ffffff',
                                    }}
                                >
                                    {/* ẢNH FULL PAGE TRANG CHỦ TOPBAOHIEM (2910 x 10312 px) */}
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

                                        {/* Hiệu ứng Highlight Pulse lên thẻ/tab bảo hiểm khi chuột click */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: Math.round((528 / 2910) * macScreenW),
                                                left: `${(713 / 2910) * 100}%`,
                                                width: `${(554 / 2910) * 100}%`,
                                                height: Math.round((63 / 2910) * macScreenW),
                                                borderRadius: 12 * s,
                                                border: `${3 * s}px solid #ed017c`,
                                                boxShadow: `0 0 ${40 * cardHoverPulse}px rgba(237, 1, 124, ${0.75 * cardHoverPulse})`,
                                                backgroundColor: `rgba(237, 1, 124, ${0.12 * cardHoverPulse})`,
                                                opacity: cardHoverPulse,
                                                pointerEvents: 'none',
                                                transition: 'opacity 0.2s ease',
                                            }}
                                        />
                                    </div>

                                    {/* CON TRỎ CHUỘT APPLE-STYLE TƯƠNG TÁC STUDIO */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: cursorY,
                                            left: cursorX,
                                            zIndex: 40,
                                            opacity: cursorOpacity,
                                            transform: `scale(${cursorClick})`,
                                            pointerEvents: 'none',
                                            filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4))',
                                        }}
                                    >
                                        <MousePointer2
                                            size={Math.max(20, 36 * s)}
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
                                                    width: 40 * s,
                                                    height: 40 * s,
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
                                            background: `linear-gradient(115deg, transparent ${glareX - 40}%, rgba(255, 255, 255, 0.08) ${glareX}%, transparent ${glareX + 40}%)`,
                                            pointerEvents: 'none',
                                            zIndex: 35,
                                        }}
                                    />

                                    {/* CỤM NÚT HỖ TRỢ & GIỎ HÀNG CỐ ĐỊNH (FLOATING ACTION WIDGET) */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: Math.round(macScreenH * 0.085),
                                            right: Math.round(macScreenW * 0.112),
                                            zIndex: 38,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: Math.round(widgetBtnSize * 0.26),
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {/* Nút 1: Giỏ Hàng Xanh Lá với Badge Số Lượng "2" */}
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: widgetBtnSize,
                                                height: widgetBtnSize,
                                                borderRadius: '50%',
                                                background: '#effcf3',
                                                boxShadow:
                                                    '0 4px 14px rgba(46, 162, 56, 0.18), 0 2px 6px rgba(0, 0, 0, 0.06)',
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
                                                {/* Tay cầm giỏ hàng */}
                                                <path
                                                    d="M7 4L10 9M17 4L14 9"
                                                    stroke="#2ea238"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                {/* Vành giỏ hàng */}
                                                <path
                                                    d="M4 9H20"
                                                    stroke="#2ea238"
                                                    strokeWidth="2.2"
                                                    strokeLinecap="round"
                                                />
                                                {/* Thân giỏ hàng */}
                                                <path
                                                    d="M5.5 10L6.8 19C6.9 19.6 7.4 20 8 20H16C16.6 20 17.1 19.6 17.2 19L18.5 10"
                                                    fill="#2ea238"
                                                    stroke="#2ea238"
                                                    strokeWidth="1.5"
                                                    strokeLinejoin="round"
                                                />
                                                {/* 3 nan khe giỏ */}
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

                                            {/* Badge số 2 xanh lá đậm */}
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

                                        {/* Nút 2: Hỗ Trợ / Chat Hồng Magenta với Vòng Sóng Xung Kích (Pulse Halo) */}
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
                                            {/* Vòng hào quang ngoài cùng nhịp thở nhẹ nhàng */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    width: Math.round(widgetBtnSize * 1.55),
                                                    height: Math.round(widgetBtnSize * 1.55),
                                                    borderRadius: '50%',
                                                    background: 'rgba(237, 1, 124, 0.12)',
                                                    transform: `scale(${1 + Math.sin((frame / 20) * Math.PI) * 0.08})`,
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                            {/* Vòng đệm viền hồng mềm */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    width: Math.round(widgetBtnSize * 1.24),
                                                    height: Math.round(widgetBtnSize * 1.24),
                                                    borderRadius: '50%',
                                                    background: 'rgba(244, 114, 182, 0.45)',
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                            {/* Nút tròn chính Magenta */}
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    width: widgetBtnSize,
                                                    height: widgetBtnSize,
                                                    borderRadius: '50%',
                                                    background:
                                                        'linear-gradient(135deg, #f43f5e 0%, #e11d48 40%, #be123c 100%)',
                                                    boxShadow: '0 6px 18px rgba(225, 29, 72, 0.45)',
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
                            </div>
                        </div>

                        {/* THÂN MÁY DƯỚI (MacBook Pro/Air M3 Lower Chassis, Hinge & Rubber Feet) */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -Math.round(macH * 0.048),
                                width: Math.round(macW * 1.045),
                                height: Math.round(macH * 0.054),
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                        >
                            {/* 1. Đế cao su bên trái (Left Rubber Foot) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: '4%',
                                    bottom: -Math.round(macH * 0.006),
                                    width: Math.round(macW * 0.045),
                                    height: Math.round(macH * 0.01),
                                    borderRadius: '0 0 6px 6px',
                                    background: 'linear-gradient(180deg, #1e2430 0%, #090c12 100%)',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                                }}
                            />

                            {/* 2. Đế cao su bên phải (Right Rubber Foot) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '4%',
                                    bottom: -Math.round(macH * 0.006),
                                    width: Math.round(macW * 0.045),
                                    height: Math.round(macH * 0.01),
                                    borderRadius: '0 0 6px 6px',
                                    background: 'linear-gradient(180deg, #1e2430 0%, #090c12 100%)',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
                                }}
                            />

                            {/* 3. Khối bản lề đen (Display Hinge) kết nối màn hình với thân máy */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -Math.round(macH * 0.006),
                                    width: Math.round(macW * 0.72),
                                    height: Math.round(macH * 0.01),
                                    background: 'linear-gradient(180deg, #05070a 0%, #161b24 50%, #080a0f 100%)',
                                    borderRadius: '4px 4px 0 0',
                                    zIndex: 1,
                                }}
                            />

                            {/* 4. Mâm nhôm nguyên khối đầm chắc (Solid Aluminum Chassis Deck - Deeper Apple Silver) */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    background:
                                        'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 10%, #94a3b8 32%, #64748b 68%, #475569 92%, #334155 100%)',
                                    borderRadius: '0 0 16px 16px',
                                    boxShadow:
                                        '0 24px 50px rgba(0, 0, 0, 0.8), 0 2px 0 rgba(255, 255, 255, 0.7) inset, 0 -2px 4px rgba(51, 65, 85, 0.5) inset',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    zIndex: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Đường viền ánh sáng kim loại phản quang mép trên (Specular Edge Sheen) */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '1.5px',
                                        background:
                                            'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 25%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.7) 75%, rgba(255,255,255,0.2) 100%)',
                                        zIndex: 3,
                                    }}
                                />

                                {/* Rãnh khuyết mở nắp máy (Precision Thumb Notch - Deeper Silver Machined Cavity) */}
                                <div
                                    style={{
                                        width: Math.round(macW * 0.11),
                                        height: Math.round(macH * 0.015),
                                        background: 'linear-gradient(180deg, #cbd5e1 0%, #94a3b8 45%, #64748b 100%)',
                                        borderRadius: '0 0 8px 8px',
                                        boxShadow:
                                            '0 2px 4px rgba(30, 41, 59, 0.5) inset, 0 1px 0 rgba(255, 255, 255, 0.7)',
                                        border: '1px solid rgba(100, 116, 139, 0.5)',
                                        borderTop: 'none',
                                        zIndex: 4,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ========================================== */}
                    {/* B. CHIẾC IPHONE 16 PRO RETINA ĐỒNG BỘ     */}
                    {/* ========================================== */}
                    <div
                        style={{
                            position: 'absolute',
                            right: -Math.round(phoneW * 0.58),
                            bottom: -Math.round(macH * 0.015),
                            width: phoneW,
                            height: phoneH,
                            transformStyle: 'preserve-3d',
                            transform: `scale(${deviceEntrance}) rotateX(3deg) rotateY(-8deg) translateZ(40px)`,
                            zIndex: 15,
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
                            color: '#475569',
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
                            color: '#0f172a',
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
                        color: '#475569',
                        fontWeight: 600,
                    }}
                >
                    Trang chủ TopBaoHiem • Tương thích hoàn hảo mọi kích cỡ màn hình
                </div>
            </div>
        </div>
    );
};
