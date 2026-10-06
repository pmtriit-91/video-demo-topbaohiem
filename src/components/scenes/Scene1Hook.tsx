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
} from 'lucide-react';

export const Scene1Hook: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Kích thước chuẩn tính toán trực tiếp theo viewport để hỗ trợ 100% 1080p, 2K và 4K
    const is4K = width >= 3840;
    const s = is4K ? 1 : width / 3840; // Hệ số typographic

    // 1. Phân bổ kích thước 3 khối (MacBook 53%, iPhone 13.5%, HUD Callout 23.5%)
    const macW = Math.round(width * 0.53);
    const macH = Math.round(macW * (10 / 16)); // Chuẩn 16:10 MacBook Liquid Retina
    const macScreenPadding = Math.round(macW * 0.012);
    const macScreenW = macW - macScreenPadding * 2;
    const macScreenH = macH - macScreenPadding * 2 - Math.round(macW * 0.008);

    const phoneW = Math.round(width * 0.135);
    const phoneH = Math.round(phoneW * 2.05); // Tỉ lệ iPhone 16 Pro

    const calloutW = Math.round(width * 0.235);

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
    // Ảnh gốc: 2910 x 10312. Scale theo macScreenW:
    // Rendered Height = 10312 * (macScreenW / 2910)
    const renderedPageH = Math.round(10312 * (macScreenW / 2910));
    const maxScroll = Math.max(0, renderedPageH - macScreenH);

    // Vị trí các mốc nội dung trên ảnh:
    // - Hero: 0
    // - Gói bảo hiểm hot (Sức khoẻ, Cháy nổ, Xe máy...): Y ~ 1400 (scale: 1400/2910 * macScreenW)
    // - Quy trình mua 4 bước & Banners: Y ~ 2400 (scale: 2400/2910 * macScreenW)
    // - Đối tác 5 Đại gia (PVI, BIC, PJICO, Bảo Việt, MIC): Y ~ 5350 (scale: 5350/2910 * macScreenW)
    // - Chạm đáy Footer có dấu Bộ Công Thương: maxScroll
    const scrollTargetGoi = Math.round((1400 / 2910) * macScreenW);
    const scrollTargetQuyTrinh = Math.round((2400 / 2910) * macScreenW);
    const scrollTargetDoiTac = Math.round((5350 / 2910) * macScreenW);

    const scrollY = interpolate(
        frame,
        [
            0, // Khởi đầu: Hero & Header
            120, // Giữ nguyên ở Hero để nhận diện thương hiệu
            340, // Lăn êm ái xuống Các gói bảo hiểm hot
            460, // Dừng nhẹ (Dwell) tương tác chuột hover
            640, // Lăn xuống Quy trình mua 4 bước & Banners lớn
            740, // Dừng nhẹ xem quy trình
            860, // Lăn xuống Khối 5 Tập đoàn Bảo hiểm đối tác (PVI, BIC, PJICO, Bảo Việt, MIC)
            980, // Lăn chạm đáy: FAQ, Tin tức & Footer Bộ Công Thương
            1080, // Giữ chân trang trước khi zoom
        ],
        [
            0, // Hero
            0, // Dwell Hero
            -scrollTargetGoi, // Danh mục gói
            -scrollTargetGoi, // Dwell danh mục
            -scrollTargetQuyTrinh, // Quy trình 4 bước
            -scrollTargetQuyTrinh, // Dwell quy trình
            -scrollTargetDoiTac, // 5 Tập đoàn Đối tác
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
        [macScreenW * 0.5, macScreenW * 0.22, macScreenW * 0.16, macScreenW * 0.28],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const cursorY = interpolate(
        frame,
        [120, 240, 360, 440],
        [macScreenH * 0.15, macScreenH * 0.38, macScreenH * 0.44, macScreenH * 0.44],
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

    // 8. Dynamic HUD Callouts xuất hiện theo từng tầng nội dung trang web (Bên phải ngoài cùng)
    const callout1Opacity = interpolate(frame, [30, 60, 220, 250], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const callout2Opacity = interpolate(frame, [250, 280, 480, 510], [0, 1, 1, 0], {
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
                            background: 'rgba(225, 29, 72, 0.12)',
                            border: '1px solid rgba(225, 29, 72, 0.35)',
                            boxShadow: '0 0 24px rgba(225, 29, 72, 0.25)',
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
                                color: '#ffffff',
                                textTransform: 'uppercase',
                            }}
                        >
                            LIVE PORTAL VIEW • TOPBAOHIEM.VN
                        </span>
                    </div>

                    <span style={{ fontSize: 18 * s, color: 'rgba(255,255,255,0.3)' }}>/</span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 * s }}>
                        <Laptop size={18 * s} color="#94a3b8" />
                        <span
                            style={{
                                fontFamily: 'var(--font-primary)',
                                fontSize: Math.max(12, 17 * s),
                                fontWeight: 600,
                                color: '#cbd5e1',
                            }}
                        >
                            MacBook Air M3 13-inch
                        </span>
                        <span style={{ fontSize: 16 * s, color: 'rgba(255,255,255,0.2)' }}>•</span>
                        <Smartphone size={17 * s} color="#94a3b8" />
                        <span
                            style={{
                                fontFamily: 'var(--font-primary)',
                                fontSize: Math.max(12, 17 * s),
                                fontWeight: 600,
                                color: '#cbd5e1',
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
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(16px)',
                    }}
                >
                    <Sparkles color="#38bdf8" size={18 * s} />
                    <span
                        style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: Math.max(12, 17 * s),
                            fontWeight: 600,
                            color: '#e2e8f0',
                        }}
                    >
                        Cổng Mua Bán & So Sánh Bảo Hiểm Trực Tuyến Toàn Diện
                    </span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 2. KHỐI TRUNG TÂM: MACBOOK (53%) + IPHONE (13.5%) + HUD (23.5%) */}
            {/* ========================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: '52%',
                    left: Math.round(width * 0.035),
                    right: Math.round(width * 0.035),
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 10,
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
                    {/* Shadow dưới chân máy chiếu xuống mặt sàn */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 4,
                            width: '95%',
                            height: Math.round(macH * 0.08),
                            borderRadius: '50%',
                            background:
                                'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.45) 50%, transparent 80%)',
                            filter: 'blur(28px)',
                            transform: 'translateZ(-80px) rotateX(90deg) translateY(30px)',
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
                            background: 'linear-gradient(145deg, #2e3440 0%, #1a1e28 35%, #11141c 70%, #252b38 100%)',
                            boxShadow:
                                '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 2px 4px rgba(255, 255, 255, 0.3) inset',
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
                                        src={staticFile('assets/trangchu/topbaohiem_full_macbook.png')}
                                        alt="TopBaoHiem Full Trang Chủ"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />

                                    {/* Hiệu ứng Highlight Pulse lên thẻ "Bảo hiểm Sức khoẻ" khi chuột click */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: Math.round((500 / 2910) * macScreenW),
                                            left: '14%',
                                            width: '22%',
                                            height: Math.round((180 / 2910) * macScreenW),
                                            borderRadius: 14 * s,
                                            border: `${3 * s}px solid #e11d48`,
                                            boxShadow: `0 0 ${35 * cardHoverPulse}px rgba(225, 29, 72, ${0.7 * cardHoverPulse})`,
                                            backgroundColor: `rgba(225, 29, 72, ${0.08 * cardHoverPulse})`,
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
                            </div>
                        </div>
                    </div>

                    {/* THÂN MÁY DƯỚI (MacBook Lower Chassis & Display Hinge) */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -Math.round(macH * 0.016),
                            width: Math.round(macW * 1.025),
                            height: Math.round(macH * 0.02),
                            background: 'linear-gradient(180deg, #3a4150 0%, #1f232d 40%, #141720 100%)',
                            borderRadius: '0 0 20px 20px',
                            boxShadow: '0 18px 36px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(255, 255, 255, 0.2) inset',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            zIndex: 2,
                        }}
                    >
                        {/* Rãnh mở nắp máy (Thumb Notch) */}
                        <div
                            style={{
                                width: Math.round(macW * 0.08),
                                height: Math.round(macH * 0.007),
                                background: '#0e1118',
                                borderRadius: '0 0 6px 6px',
                                boxShadow: '0 1px 2px rgba(255, 255, 255, 0.1)',
                            }}
                        />
                    </div>
                </div>

                {/* ========================================== */}
                {/* B. CHIẾC IPHONE 16 PRO RETINA ĐỒNG BỘ     */}
                {/* ========================================== */}
                <div
                    style={{
                        position: 'relative',
                        width: phoneW,
                        height: phoneH,
                        transformStyle: 'preserve-3d',
                        transform: `scale(${deviceEntrance}) rotateX(3deg) rotateY(-7deg) translateZ(30px)`,
                        zIndex: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Shadow dưới chân iPhone */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 6,
                            width: '85%',
                            height: Math.round(phoneH * 0.06),
                            borderRadius: '50%',
                            background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, transparent 75%)',
                            filter: 'blur(18px)',
                            transform: 'rotateX(90deg) translateY(24px)',
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
                                    transform: `scale(${interpolate(phoneTransition, [0, 1], [0.96, 1])})`,
                                    opacity: phoneTransition,
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

                {/* ========================================== */}
                {/* C. DYNAMIC HUD CALLOUT CARD (BÊN PHẢI 23.5%) */}
                {/* ========================================== */}
                <div
                    style={{
                        position: 'relative',
                        width: calloutW,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        zIndex: 20,
                    }}
                >
                    {/* TẦNG 1: HERO VIEW (Frame 30 - 250) */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: callout1Opacity,
                            transform: `translateX(${interpolate(callout1Opacity, [0, 1], [30, 0])}px)`,
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(13, 21, 39, 0.9)',
                                border: '1px solid rgba(225, 29, 72, 0.45)',
                                boxShadow: '0 20px 50px rgba(225, 29, 72, 0.25)',
                                borderRadius: 24 * s,
                                padding: `${28 * s}px ${30 * s}px`,
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8 * s,
                                    padding: `${6 * s}px ${16 * s}px`,
                                    borderRadius: 999,
                                    background: 'rgba(225, 29, 72, 0.15)',
                                    color: '#f43f5e',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: Math.max(11, 15 * s),
                                    fontWeight: 700,
                                    marginBottom: 12 * s,
                                }}
                            >
                                <Sparkles size={16 * s} /> CỔNG BẢO HIỂM ĐIỆN TỬ
                            </div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(16, 30 * s),
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1.25,
                                    margin: `0 0 ${12 * s}px 0`,
                                }}
                            >
                                So Sánh Minh Bạch Đa Hãng
                            </h3>
                            <p
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(12, 18 * s),
                                    color: '#94a3b8',
                                    lineHeight: 1.5,
                                    margin: 0,
                                }}
                            >
                                Khách hàng dễ dàng tiếp cận sản phẩm từ các hãng bảo hiểm lớn nhất Việt Nam. Giao diện
                                mượt mà trên cả máy tính lẫn di động.
                            </p>
                        </div>
                    </div>

                    {/* TẦNG 2: ĐA DẠNG SẢN PHẨM (Frame 250 - 510) */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: callout2Opacity,
                            transform: `translateX(${interpolate(callout2Opacity, [0, 1], [30, 0])}px)`,
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(13, 21, 39, 0.9)',
                                border: '1px solid rgba(56, 189, 248, 0.45)',
                                boxShadow: '0 20px 50px rgba(56, 189, 248, 0.25)',
                                borderRadius: 24 * s,
                                padding: `${28 * s}px ${30 * s}px`,
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8 * s,
                                    padding: `${6 * s}px ${16 * s}px`,
                                    borderRadius: 999,
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    color: '#38bdf8',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: Math.max(11, 15 * s),
                                    fontWeight: 700,
                                    marginBottom: 12 * s,
                                }}
                            >
                                <Layers size={16 * s} /> DANH MỤC TRỌNG ĐIỂM
                            </div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(16, 30 * s),
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1.25,
                                    margin: `0 0 ${12 * s}px 0`,
                                }}
                            >
                                Đầy Đủ Nghiệp Vụ Bảo Hiểm
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 * s }}>
                                {[
                                    'Bảo hiểm Sức khoẻ & Trợ cấp Y tế toàn diện',
                                    'Cháy nổ bắt buộc Doanh nghiệp theo NĐ 67',
                                    'Du lịch Quốc tế đạt chuẩn Visa Schengen',
                                    'TNDS & Vật chất Ô tô, Xe máy tích hợp AI OCR',
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10 * s,
                                            fontSize: Math.max(11, 16 * s),
                                            color: '#e2e8f0',
                                            fontWeight: 500,
                                        }}
                                    >
                                        <CheckCircle2 size={18 * s} color="#38bdf8" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TẦNG 3: QUY TRÌNH MUA 4 BƯỚC 1-CHẠM (Frame 510 - 770) */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: callout3Opacity,
                            transform: `translateX(${interpolate(callout3Opacity, [0, 1], [30, 0])}px)`,
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(13, 21, 39, 0.9)',
                                border: '1px solid rgba(16, 185, 129, 0.45)',
                                boxShadow: '0 20px 50px rgba(16, 185, 129, 0.25)',
                                borderRadius: 24 * s,
                                padding: `${28 * s}px ${30 * s}px`,
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8 * s,
                                    padding: `${6 * s}px ${16 * s}px`,
                                    borderRadius: 999,
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    color: '#10b981',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: Math.max(11, 15 * s),
                                    fontWeight: 700,
                                    marginBottom: 12 * s,
                                }}
                            >
                                <Zap size={16 * s} /> QUY TRÌNH 1-CHẠM TIÊN TIẾN
                            </div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(16, 30 * s),
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1.25,
                                    margin: `0 0 ${12 * s}px 0`,
                                }}
                            >
                                Cấp Đơn Tức Thì Trong 60 Giây
                            </h3>
                            <p
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(12, 18 * s),
                                    color: '#94a3b8',
                                    lineHeight: 1.5,
                                    margin: 0,
                                }}
                            >
                                Người dùng chọn gói, AI tự động quét giấy tờ điền dữ liệu, thanh toán qua MoMo, VNPay,
                                thẻ Visa hoặc chuyển khoản ngân hàng.
                            </p>
                        </div>
                    </div>

                    {/* TẦNG 4: LIÊN KẾT 5 TẬP ĐOÀN BẢO HIỂM LỚN (Frame 770 - 960) */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: callout4Opacity,
                            transform: `translateX(${interpolate(callout4Opacity, [0, 1], [30, 0])}px)`,
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(13, 21, 39, 0.9)',
                                border: '1px solid rgba(251, 191, 36, 0.45)',
                                boxShadow: '0 20px 50px rgba(251, 191, 36, 0.25)',
                                borderRadius: 24 * s,
                                padding: `${28 * s}px ${30 * s}px`,
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8 * s,
                                    padding: `${6 * s}px ${16 * s}px`,
                                    borderRadius: 999,
                                    background: 'rgba(251, 191, 36, 0.15)',
                                    color: '#fbbf24',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: Math.max(11, 15 * s),
                                    fontWeight: 700,
                                    marginBottom: 12 * s,
                                }}
                            >
                                <Building2 size={16 * s} /> ĐỐI TÁC CHIẾN LƯỢC
                            </div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(16, 30 * s),
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1.25,
                                    margin: `0 0 ${12 * s}px 0`,
                                }}
                            >
                                Liên Kết Trực Tiếp 5 Đại Gia
                            </h3>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 8 * s,
                                    marginTop: 10 * s,
                                }}
                            >
                                {['PVI', 'BIC', 'PJICO', 'BẢO VIỆT', 'MIC'].map((brand, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            padding: `${8 * s}px ${16 * s}px`,
                                            borderRadius: 8 * s,
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: '#ffffff',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: Math.max(12, 16 * s),
                                            fontWeight: 700,
                                        }}
                                    >
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TẦNG 5: PHÁP LÝ VỮNG CHẮC & BỘ CÔNG THƯƠNG (Frame 960 - 1080) */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: callout5Opacity,
                            transform: `translateX(${interpolate(callout5Opacity, [0, 1], [30, 0])}px)`,
                            pointerEvents: 'none',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(13, 21, 39, 0.92)',
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                boxShadow: '0 20px 50px rgba(59, 130, 246, 0.25)',
                                borderRadius: 24 * s,
                                padding: `${28 * s}px ${30 * s}px`,
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8 * s,
                                    padding: `${6 * s}px ${16 * s}px`,
                                    borderRadius: 999,
                                    background: 'rgba(59, 130, 246, 0.15)',
                                    color: '#60a5fa',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: Math.max(11, 15 * s),
                                    fontWeight: 700,
                                    marginBottom: 12 * s,
                                }}
                            >
                                <FileCheck size={16 * s} /> PHÁP LÝ MINH BẠCH
                            </div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(16, 30 * s),
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1.25,
                                    margin: `0 0 ${12 * s}px 0`,
                                }}
                            >
                                Chứng Nhận Bộ Công Thương
                            </h3>
                            <p
                                style={{
                                    fontFamily: 'var(--font-primary)',
                                    fontSize: Math.max(12, 18 * s),
                                    color: '#94a3b8',
                                    lineHeight: 1.5,
                                    margin: 0,
                                }}
                            >
                                Đầy đủ tư cách pháp lý, hợp đồng minh bạch, ấn chỉ điện tử có mã QR tra cứu hợp chuẩn
                                Thông tư 04/2021/TT-BTC của Bộ Tài Chính.
                            </p>
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
                            fontWeight: 600,
                        }}
                    >
                        PARALLAX SCROLL DEPTH
                    </span>
                    <div
                        style={{
                            flex: 1,
                            height: Math.max(4, 6 * s),
                            borderRadius: 999,
                            background: 'rgba(255, 255, 255, 0.12)',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                width: `${interpolate(-scrollY, [0, maxScroll], [10, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #e11d48, #38bdf8)',
                                boxShadow: '0 0 12px rgba(225, 29, 72, 0.8)',
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
                        color: '#64748b',
                        fontWeight: 500,
                    }}
                >
                    Trang chủ TopBaoHiem • Tương thích hoàn hảo mọi kích cỡ màn hình
                </div>
            </div>
        </div>
    );
};
