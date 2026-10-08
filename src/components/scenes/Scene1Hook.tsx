import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, Img, Easing } from 'remotion';
import { Sparkles, Layers, MousePointer2, Building2, Zap, Smartphone, Laptop, ShieldCheck } from 'lucide-react';
import { CenterSpotlightSearch } from '../ui/CenterSpotlightSearch';
import { MacbookStandbyScreen } from '../ui/MacbookStandbyScreen';

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Kích thước chuẩn tính toán trực tiếp theo viewport để hỗ trợ 100% 1080p, 2K và 4K
    const is4K = width >= 3840;
    const s = is4K ? 1 : width / 3840; // Hệ số typographic

    // =========================================================================
    // 1. PHÂN BỔ KÍCH THƯỚC CÁC THIẾT BỊ & KHÔNG GIAN
    // =========================================================================
    // A. Chuỗi hoạt cảnh mở nắp MacBook Pro 3D (110 frames @ 3456x1824, Alpha Transparent 100%)
    const appleFrameH = Math.round(height * 0.9);
    const appleFrameW = Math.round(appleFrameH * (3456 / 1824));

    // B. Chiếc MacBook Pro 90 độ trực diện ngang tầm mắt (2200 x 1340) - Dành cho Showcase Website
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
    // 2. TIMELINE PHÂN BỔ CHI TIẾT
    // =========================================================================
    // GIAI ĐOẠN 1: FRAME 0 -> 185
    // Spotlight Search to rõ ràng nằm chính giữa màn hình Studio Light, gõ https://topbaohiem.vn,
    // trỏ chuột lướt vào click Enter, sau đó phóng to nhẹ và fade out tại frame 175 -> 195.

    // GIAI ĐOẠN 2: FRAME 465 -> 575
    // Chiếc MacBook xuất hiện ở CHÍNH GIỮA màn hình ngay khi ô Search biến mất,
    // mở nắp từ 0° (đóng kín) lên 90° (thẳng đứng ngang tầm mắt).
    // Hình nền hiển thị logo gốc TopBaoHiem trên nền Studio sáng sạch sẽ.
    const openStartFrame = 465;
    const currentOpenFrame = Math.min(110, Math.max(1, frame - openStartFrame + 1));
    const openFrameSrc = staticFile(
        `assets/macbook_open/frames_webp/frame_${String(currentOpenFrame).padStart(3, '0')}.webp`,
    );

    // Độ hiển thị của Pha 1 (chuỗi 110 frames WebP 3D mở nắp: Frame 465 -> 574)
    const state1Opacity = interpolate(frame, [464, 467, 574, 575], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Độ hiển thị của Pha 2 (MacBook 90 độ trực diện: Frame 575+)
    const state2Opacity = interpolate(frame, [574, 575], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Màn hình Liquid Retina 90 độ thức giấc bừng sáng mở website thật (Frame 719 -> 744)
    // Dành trọn frame 575 -> 719 (~2.4s thoải mái) cho màn hình chờ macOS Dynamic Light & Logo Kinetic Beat & Thanh Loading!
    const screenWakeUp = interpolate(frame, [719, 744], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    });

    // GIAI ĐOẠN 3: FRAME 729 -> 779
    // MacBook trượt êm ái từ CHÍNH GIỮA màn hình sang VỊ TRÍ BÊN PHẢI (right: 3.5%)
    const deltaX = Math.round(width * 0.1725);
    const macCenterShift = interpolate(frame, [729, 779], [-deltaX, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Cột nội dung bên trái lướt vào (Frame 744 -> 784)
    const leftColEntrance = spring({
        frame: Math.max(0, frame - 744),
        fps,
        config: { damping: 16, mass: 0.9, stiffness: 85 },
    });

    // Chiếc iPhone 16 Pro lướt vào tiếp ứng từ bên phải (Frame 764 -> 804)
    const phoneEntrance = spring({
        frame: Math.max(0, frame - 764),
        fps,
        config: { damping: 15, mass: 1.0, stiffness: 70 },
    });

    // Push-in nhẹ toàn bộ MacBook về cuối cảnh (Frame 1039 -> 1269)
    const macPushIn = interpolate(frame, [0, 539, 1039, 1169, 1269], [1, 1, 1.02, 1.05, 1.25], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // =========================================================================
    // 3. CƠ CHẾ LĂN TRANG PARALLAX CHẬM RÃI TRÊN MÀN HÌNH 90 ĐỘ (2910 x 10188 px)
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
            0,
            854, // Giữ nguyên ở Hero để click thẻ và nhận diện thương hiệu
            964, // Lăn êm ái xuống Quy trình mua 4 bước & Banners
            1044, // Dừng nhẹ xem quy trình
            1124, // Lăn xuống Khối Đối tác lớn & Mạng lưới bảo lãnh
            1204, // Lăn chạm đáy: FAQ, Tin tức & Footer Bộ Công Thương
            1269, // Giữ chân trang
        ],
        [0, 0, -scrollTargetQuyTrinh, -scrollTargetQuyTrinh, -scrollTargetDoiTac, -maxScroll, -maxScroll],
        {
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        },
    );

    // Ánh sáng quét qua mặt kính Retina (Cinematic Glare / Sheen)
    const glareX = interpolate(frame, [719, 764, 889, 1269], [-100, 180, 240, 400], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Con trỏ chuột tương tác Studio trên MacBook 90 độ (Frame 779 -> 884)
    const cursorOpacity = interpolate(frame, [779, 799, 854, 884], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Tọa độ mục tiêu click nút "So sánh ngay" thẻ Sức khoẻ
    const targetCursorX = Math.round((700 / imgW) * screen90W);
    const targetCursorY = Math.round((1260 / imgW) * screen90W);

    const cursorX = interpolate(
        frame,
        [779, 809, 834, 864],
        [Math.round(screen90W * 0.5), targetCursorX, targetCursorX, targetCursorX + Math.round(screen90W * 0.04)],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorY = interpolate(
        frame,
        [779, 809, 834, 864],
        [Math.round(screen90H * 0.25), targetCursorY, targetCursorY, targetCursorY + Math.round(screen90H * 0.06)],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorClick = interpolate(frame, [809, 819, 829], [1, 0.82, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const cardHoverPulse = interpolate(frame, [814, 834, 864], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Đồng bộ màn hình trên iPhone 16 Pro (Mobile Step Sync 2 -> 3 -> 4)
    const phoneStep = frame < 889 ? 2 : frame < 1069 ? 3 : 4;
    const phoneTransition = spring({
        frame: frame < 889 ? frame - 764 : frame < 1069 ? frame - 889 : frame - 1069,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    // Gõ chữ Typewriter Kinetic (Cột Trái Dẫn Dắt từ Frame 754)
    const fullLine1 = 'SO SÁNH MINH BẠCH';
    const fullLine2 = 'CẤP ĐƠN 1-CHẠM';

    const chars1 = Math.min(
        fullLine1.length,
        Math.max(
            0,
            Math.floor(
                interpolate(frame, [754, 782], [0, fullLine1.length], {
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
                interpolate(frame, [782, 812], [0, fullLine2.length], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                }),
            ),
        ),
    );
    const typedLine2 = fullLine2.slice(0, chars2);

    const showCursor1 = frame >= 754 && frame < 782;
    const showCursor2 = frame >= 782;
    const cursorBlink = Math.floor(frame / 16) % 2 === 0;

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
    const callout1Opacity = interpolate(frame, [509, 539, 744, 774], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout2Opacity = interpolate(frame, [774, 804, 924, 954], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout3Opacity = interpolate(frame, [954, 984, 1049, 1079], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout4Opacity = interpolate(frame, [1079, 1109, 1169, 1199], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout5Opacity = interpolate(frame, [1199, 1219, 1244, 1269], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const topicOpacities = [callout1Opacity, callout2Opacity, callout3Opacity, callout4Opacity, callout5Opacity];

    // Fade out nhẹ toàn scene ở 25 frame cuối để chuyển cảnh sang Scene 2
    const sceneFadeOut = interpolate(frame, [1244, 1269], [1, 0], {
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
            {/* 0. NỀN STUDIO SÁNG SỦA SANG TRỌNG (APPLE STUDIO LIGHT)   */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
                    zIndex: 0,
                }}
            >
                {/* Ánh sáng mềm tinh tế sau khối Typography bên trái */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '4%',
                        width: '42%',
                        height: '65%',
                        background:
                            'radial-gradient(ellipse at center, rgba(237, 1, 124, 0.06) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 80%)',
                        filter: 'blur(90px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Vùng hắt sáng mềm mại sau MacBook */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        right: '6%',
                        width: '58%',
                        height: '70%',
                        background:
                            'radial-gradient(circle at center, rgba(255, 255, 255, 0.85) 0%, rgba(241, 245, 249, 0.4) 60%, transparent 85%)',
                        filter: 'blur(80px)',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* ========================================================= */}
            {/* 1. SPOTLIGHT SEARCH TO BẢN CHÍNH GIỮA (FRAME 0 -> 195)   */}
            {/* ========================================================= */}
            <CenterSpotlightSearch frame={frame} width={width} height={height} />

            {/* ========================================================= */}
            {/* 2. TOP HEADER BRANDING & KHÔNG GIAN SANG TRỌNG          */}
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
                            background: 'rgba(237, 1, 124, 0.1)',
                            border: '1px solid rgba(237, 1, 124, 0.35)',
                            boxShadow: '0 4px 16px rgba(237, 1, 124, 0.12)',
                        }}
                    >
                        <span
                            style={{
                                width: 10 * s,
                                height: 10 * s,
                                borderRadius: '50%',
                                background: '#ed017c',
                                boxShadow: '0 0 10px #ed017c',
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

                    <span style={{ fontSize: 18 * s, color: 'rgba(100, 116, 139, 0.35)' }}>/</span>

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
                            MacBook Pro M4 Liquid Retina
                        </span>
                        <span style={{ fontSize: 16 * s, color: 'rgba(100, 116, 139, 0.35)' }}>•</span>
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
                        background: 'rgba(255, 255, 255, 0.92)',
                        border: '1px solid rgba(226, 232, 240, 0.9)',
                        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.05)',
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
            {/* 3. KHỐI TRÁI: KINETIC TYPOGRAPHY & TYPEWRITER HERO        */}
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
                    pointerEvents: 'none',
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
                        boxShadow: '0 4px 16px rgba(237, 1, 124, 0.08)',
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
                                    padding: `${16 * s}px ${20 * s}px`,
                                    borderRadius: 20 * s,
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    border: '1.5px solid rgba(226, 232, 240, 0.85)',
                                    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                                    backdropFilter: 'blur(16px)',
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
                                        color: '#0f172a',
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
                                background: 'rgba(255, 255, 255, 0.92)',
                                border: '1.5px solid rgba(226, 232, 240, 0.85)',
                                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
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
            {/* 4. CỤM THIẾT BỊ: MACBOOK PRO & IPHONE 16 PRO               */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: Math.round(width * 0.035),
                    transform: `translateY(-50%) translateX(${macCenterShift}px) scale(${macPushIn})`,
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
                    {/* Bóng đổ Studio mềm mại dưới chân MacBook trên nền sáng (chỉ hiện khi MacBook xuất hiện) */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -Math.round(mac90H * 0.04),
                            left: '5%',
                            width: '90%',
                            height: Math.round(mac90H * 0.12),
                            borderRadius: '50%',
                            background:
                                'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.05) 50%, transparent 75%)',
                            filter: 'blur(20px)',
                            pointerEvents: 'none',
                            zIndex: 1,
                            opacity: interpolate(frame, [178, 188], [0, 1], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            }),
                        }}
                    />

                    {/* ========================================================================= */}
                    {/* A. PHA 1: CHUỖI MỞ NẮP 110 FRAMES 3D TỰ NHIÊN (0° ĐẾN 90°)               */}
                    {/* ========================================================================= */}
                    {state1Opacity > 0.01 && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
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
                    {/* B. PHA 2: MACBOOK PRO 90 ĐỘ TRỰC DIỆN (CHÍNH HÃNG APPLE ĐÃ ĐỤC RỖNG)      */}
                    {/* ========================================================================= */}
                    {state2Opacity > 0.01 && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: mac90W,
                                height: mac90H,
                                opacity: state2Opacity,
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
                                    backgroundColor: '#f8fafc',
                                    borderRadius: `${Math.round(mac90W * 0.008)}px ${Math.round(mac90W * 0.008)}px 0 0`,
                                    boxShadow: `0 0 ${40 * screenWakeUp}px rgba(237, 1, 124, ${0.2 * screenWakeUp})`,
                                    zIndex: 2,
                                }}
                            >
                                {/* 1.1 MÀN HÌNH CHỜ MACOS DYNAMIC LIGHT & PLAYFUL KINETIC LOGO */}
                                <MacbookStandbyScreen
                                    frame={frame}
                                    startFrame={385}
                                    wakeProgress={screenWakeUp}
                                    screenW={screen90W}
                                    screenH={screen90H}
                                />

                                {/* 1.2 ẢNH FULL PAGE TRANG CHỦ TOPBAOHIEM (2910 x 10188 px) - MỞ BỪNG RA */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        opacity: screenWakeUp,
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

                                {/* CON TRỎ CHUỘT TƯƠNG TÁC TRÊN MÀN HÌNH MACBOOK */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: cursorY,
                                        left: cursorX,
                                        zIndex: 40,
                                        opacity: cursorOpacity,
                                        transform: `scale(${cursorClick})`,
                                        pointerEvents: 'none',
                                        filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4))',
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
                                        background: `linear-gradient(115deg, transparent ${glareX - 40}%, rgba(255, 255, 255, 0.15) ${glareX}%, transparent ${glareX + 40}%)`,
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
                                        opacity: screenWakeUp,
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
                                                boxShadow: '0 6px 18px rgba(225, 29, 72, 0.4)',
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
                                    'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.06) 50%, transparent 75%)',
                                filter: 'blur(14px)',
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
                                background: 'linear-gradient(145deg, #cbd5e1 0%, #94a3b8 40%, #64748b 100%)',
                                border: `${Math.max(2, 3 * s)}px solid #94a3b8`,
                                boxShadow:
                                    '0 20px 60px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
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
                                    boxShadow: '0 0 0 2px #0f172a inset',
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
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
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
            {/* 5. FOOTER PROGRESS BAR: THEO DÕI ĐỘ SÂU TRANG WEB         */}
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
                    opacity: interpolate(frame, [315, 345], [0, 1], {
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
                            color: '#64748b',
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
                                background: 'linear-gradient(90deg, #ed017c, #0284c7)',
                                boxShadow: '0 0 10px rgba(237, 1, 124, 0.4)',
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
                        color: '#64748b',
                        fontWeight: 600,
                    }}
                >
                    Trang chủ TopBaoHiem • Tương thích hoàn hảo mọi kích cỡ màn hình
                </div>
            </div>
        </div>
    );
};
