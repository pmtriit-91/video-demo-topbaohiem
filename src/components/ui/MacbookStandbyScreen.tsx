import React from 'react';
import { interpolate, spring, useVideoConfig, staticFile, Img, Easing } from 'remotion';
import { Wifi, Battery } from 'lucide-react';

interface MacbookStandbyScreenProps {
    frame: number;
    startFrame: number;
    wakeProgress: number; // 0 -> 1 khi hòa tan sang website
    screenW: number;
    screenH: number;
}

export const MacbookStandbyScreen: React.FC<MacbookStandbyScreenProps> = ({
    frame,
    startFrame,
    wakeProgress,
    screenW,
    screenH,
}) => {
    const { fps } = useVideoConfig();

    // Hệ số co giãn tỉ lệ theo kích thước màn hình
    const s = screenW / 1752;

    // Thời gian tính từ lúc bắt đầu màn hình 90 độ
    const relFrame = Math.max(0, frame - startFrame);

    // =========================================================================
    // 1. HOẠT CẢNH NHÚN GÕ NHỊP KINETIC VUI VẺ (PLAYFUL KINETIC BEAT)
    // =========================================================================
    // A. Cụm chữ "TOP" nảy lò xo sang trái (thời lượng kéo dài êm dịu, rõ nét, xem cực thoải mái)
    const topTranslateX = interpolate(relFrame, [14, 38, 72, 98], [0, -20 * s, 3 * s, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const topRotate = interpolate(relFrame, [14, 38, 72, 98], [0, -3.0, 0.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const topScale = interpolate(relFrame, [14, 38, 72, 98], [1.0, 1.05, 0.99, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // B. Cụm chữ "baohiem" nảy tiếp ứng lên trên theo nhịp điệu (khoan thai, mượt mà, đồng điệu)
    const baohiemTranslateY = interpolate(relFrame, [26, 52, 86, 112], [0, -16 * s, 2.5 * s, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const baohiemRotate = interpolate(relFrame, [26, 52, 86, 112], [0, 2.0, -0.5, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const baohiemScale = interpolate(relFrame, [26, 52, 86, 112], [1.0, 1.04, 0.99, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // C. Thanh tiến trình Apple mỏng mượt mà (bắt đầu từ 0% ở relFrame 10, chạy khoan thai lên 100% ở relFrame 125)
    const loadPercent = interpolate(relFrame, [10, 125], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // D. Hòa tan êm dịu (Smooth Crossfade & Push-in) khi chuyển sang website thật
    const screenOpacity = interpolate(wakeProgress, [0, 0.7], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const screenPushIn = interpolate(wakeProgress, [0, 1], [1, 1.04], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    if (screenOpacity <= 0.001) return null;

    // Chiều cao chuẩn cân đối cho logo trên màn hình MacBook
    const targetLogoH = Math.round(screenH * 0.125);
    // Tỉ lệ gốc: top là 2188 x 700, baohiem là 2924 x 638
    const topW = Math.round(targetLogoH * (2188 / 700));
    const baohiemH = Math.round(targetLogoH * (638 / 700));
    const baohiemW = Math.round(baohiemH * (2924 / 638));

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: screenOpacity,
                transform: `scale(${screenPushIn})`,
                transformOrigin: 'center center',
                pointerEvents: 'none',
                overflow: 'hidden',
                backgroundColor: '#f8fafc',
            }}
        >
            {/* ================================================================= */}
            {/* 1. NỀN WALLPAPER MACOS DYNAMIC LIGHT (SẠCH SẼ & SANG TRỌNG)       */}
            {/* ================================================================= */}
            {/* Vòm sóng lụa hồng thương hiệu nhẹ nhàng ở góc dưới trái */}
            <div
                style={{
                    position: 'absolute',
                    left: '-15%',
                    bottom: '-25%',
                    width: '65%',
                    height: '80%',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(ellipse at center, rgba(237, 1, 124, 0.14) 0%, rgba(237, 1, 124, 0.03) 55%, transparent 75%)',
                    filter: `blur(${Math.round(80 * s)}px)`,
                }}
            />

            {/* Vòm sóng lụa cyan thương hiệu nhẹ nhàng ở góc trên phải */}
            <div
                style={{
                    position: 'absolute',
                    right: '-12%',
                    top: '-20%',
                    width: '60%',
                    height: '75%',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(ellipse at center, rgba(2, 132, 199, 0.12) 0%, rgba(2, 132, 199, 0.02) 55%, transparent 75%)',
                    filter: `blur(${Math.round(80 * s)}px)`,
                }}
            />

            {/* Ánh sáng trắng trung tâm làm ấm màn hình Studio */}
            <div
                style={{
                    position: 'absolute',
                    left: '20%',
                    top: '20%',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, transparent 65%)',
                    filter: `blur(${Math.round(60 * s)}px)`,
                }}
            />

            {/* ================================================================= */}
            {/* 2. THANH MENU BAR MACOS CHUẨN APPLE Ở ĐỈNH MÀN HÌNH              */}
            {/* ================================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: Math.round(36 * s),
                    padding: `0 ${Math.round(20 * s)}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.72)',
                    backdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                    zIndex: 10,
                    fontSize: Math.max(10, Math.round(13 * s)),
                    fontWeight: 600,
                    color: '#334155',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Trái: Menu hệ thống */}
                <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(18 * s) }}>
                    {/* Apple Logo SVG */}
                    <svg
                        width={Math.round(14 * s)}
                        height={Math.round(14 * s)}
                        viewBox="0 0 170 170"
                        fill="#0f172a"
                    >
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.85-11.96-14.42-6-9.16-10.8-19.14-14.42-29.93-3.61-10.79-5.42-21.32-5.42-31.59 0-14.16 3.55-25.75 10.65-34.78 7.1-9.03 16.03-13.62 26.79-13.78 4.8.13 10.15 1.45 16.06 3.96 5.91 2.51 9.68 3.82 11.31 3.94 1.85-.12 5.91-1.5 12.18-4.14 6.27-2.65 11.83-3.87 16.69-3.67 12.63.63 22.84 4.8 30.63 12.52-11.02 6.69-16.42 15.91-16.19 27.67.23 9.3 3.82 17.07 10.77 23.31 6.95 6.24 15.11 9.94 24.49 11.1-2.22 6.64-4.8 12.92-7.74 18.84zm-37.14-118.8c0 7.37-2.68 14.19-8.04 20.46-5.36 6.27-11.95 10.19-19.78 11.76-.23-1.04-.35-2.08-.35-3.12 0-7.14 2.89-14.07 8.67-20.78 5.78-6.71 12.44-10.65 19.98-11.82.08 1.16.12 2.33.12 3.5z" />
                    </svg>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>TopBaoHiem</span>
                    <span style={{ color: '#64748b' }}>Hệ thống</span>
                    <span style={{ color: '#64748b' }}>Xem</span>
                    <span style={{ color: '#64748b' }}>Cửa sổ</span>
                    <span style={{ color: '#64748b' }}>Trợ giúp</span>
                </div>

                {/* Phải: Trạng thái kết nối */}
                <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(14 * s), color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 * s }}>
                        <span
                            style={{
                                width: Math.round(7 * s),
                                height: Math.round(7 * s),
                                borderRadius: '50%',
                                backgroundColor: '#10b981',
                                display: 'inline-block',
                            }}
                        />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: Math.max(9, Math.round(11 * s)), fontWeight: 700, color: '#059669' }}>
                            SSL SECURED
                        </span>
                    </div>
                    <Wifi size={Math.round(15 * s)} color="#475569" strokeWidth={2.2} />
                    <Battery size={Math.round(16 * s)} color="#475569" strokeWidth={2.2} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: Math.max(9, Math.round(12 * s)), fontWeight: 600 }}>
                        10:24 AM
                    </span>
                </div>
            </div>

            {/* ================================================================= */}
            {/* 3. TRUNG TÂM: CỤM LOGO NHÚN KINETIC BEAT VUI NHỘN                 */}
            {/* ================================================================= */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: Math.round(26 * s),
                    paddingBottom: Math.round(30 * s),
                }}
            >
                {/* HÀNG LOGO: NỬA "TOP" & NỬA "BAOHIEM" NHÚN GÕ NHỊP TIẾP ỨNG */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: Math.round(8 * s),
                        filter: 'drop-shadow(0 12px 28px rgba(15, 23, 42, 0.08))',
                    }}
                >
                    {/* CỤM NỬA 1: ICON + "TOP" NHÚN NẢY SANG TRÁI VUI VẺ */}
                    <div
                        style={{
                            height: targetLogoH,
                            width: topW,
                            transform: `translateX(${topTranslateX}px) rotate(${topRotate}deg) scale(${topScale})`,
                            transformOrigin: 'bottom right',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Img
                            src={staticFile('assets/macbook_open/logo_part_top.png')}
                            alt="Top"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>

                    {/* CỤM NỬA 2: "baohiem" NHÚN TIẾP ỨNG LÊN TRÊN */}
                    <div
                        style={{
                            height: baohiemH,
                            width: baohiemW,
                            transform: `translateY(${baohiemTranslateY}px) rotate(${baohiemRotate}deg) scale(${baohiemScale})`,
                            transformOrigin: 'bottom left',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Img
                            src={staticFile('assets/macbook_open/logo_part_baohiem.png')}
                            alt="BaoHiem"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                </div>

                {/* THANH LOAD MỎNG CHUẨN APPLE (APPLE SLIM PROGRESS BAR) */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: Math.round(12 * s),
                        marginTop: Math.round(6 * s),
                    }}
                >
                    {/* Rãnh thanh load */}
                    <div
                        style={{
                            width: Math.round(260 * s),
                            height: Math.max(3, Math.round(4 * s)),
                            borderRadius: 999,
                            backgroundColor: 'rgba(203, 213, 225, 0.55)',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        {/* Tiến trình chạy mượt */}
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${loadPercent}%`,
                                borderRadius: 999,
                                background: 'linear-gradient(90deg, #ed017c 0%, #0284c7 100%)',
                                boxShadow: '0 0 10px rgba(237, 1, 124, 0.5)',
                            }}
                        />
                    </div>

                    {/* Dòng chữ phụ chú tinh tế */}
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: Math.max(10, Math.round(12 * s)),
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            color: '#94a3b8',
                            textTransform: 'uppercase',
                        }}
                    >
                        {loadPercent >= 100 ? 'HỆ THỐNG ĐÃ SẴN SÀNG' : 'ĐANG KẾT NỐI HỆ THỐNG BẢO HIỂM...'}
                    </span>
                </div>
            </div>
        </div>
    );
};
