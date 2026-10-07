import React from 'react';
import { interpolate, spring, useVideoConfig, staticFile, Img, Easing } from 'remotion';
import { Lock, ShieldCheck, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface SafariOmniboxProps {
    frame: number;
    width: number; // width of the laptop screen
    height: number; // height of the laptop screen
}

export const SafariOmnibox: React.FC<SafariOmniboxProps> = ({ frame, width, height }) => {
    const { fps } = useVideoConfig();
    const s = width / 1200; // scaling factor relative to base 1200px screen

    // 1. Giai đoạn hiển thị cửa sổ Safari (Frame 110 -> 160)
    // Cửa sổ xuất hiện từ frame 110
    if (frame < 110 || frame > 165) return null;

    // Entrance Spring cho toàn bộ cụm Safari (xuất hiện nhanh & gọn từ frame 108 để ổn định trước khi gõ)
    const safariEntrance = spring({
        frame: Math.max(0, frame - 108),
        fps,
        config: { damping: 14, mass: 0.7, stiffness: 130 },
    });

    // 2. Tiến trình gõ tên miền (Frame 115 -> 136)
    const fullDomain = 'https://topbaohiem.vn';
    const typingProgress = interpolate(frame, [115, 135], [0, fullDomain.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const currentTypedLength = Math.floor(typingProgress);
    const typedText = fullDomain.slice(0, currentTypedLength);

    // Con trỏ nhấp nháy
    const showCaret = frame >= 113 && frame < 140 && Math.floor(frame / 10) % 2 === 0;

    // 3. Dropdown thông minh (Xuất hiện ngay khi gõ qua ký tự "topb", đạt 100% độ rõ từ frame 128 đến 142)
    const dropdownEntrance = interpolate(frame, [124, 129], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Dropdown mờ đi ngay sau khi Enter được kích hoạt (frame 140 -> 143) để biến mất hoàn toàn trước khi website bừng sáng
    const dropdownExit = interpolate(frame, [140, 143], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const dropdownOpacity = dropdownEntrance * dropdownExit;

    // 4. Phím Enter kích hoạt & Thanh tiến trình tải trang (Frame 136 -> 146)
    const isEnterPressed = frame >= 136;
    const enterHighlight = interpolate(frame, [136, 140, 145], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Thanh progress bar tải trang trên đỉnh Omnibox (Frame 137 -> 146)
    const loadProgress = interpolate(frame, [137, 146], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const progressOpacity = interpolate(frame, [137, 145, 148], [1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 5. Chuyển đổi vị trí: Từ trung tâm phóng to -> Thu gọn thành thanh công cụ trên đỉnh (Frame 144 -> 154)
    const dockToTop = interpolate(frame, [144, 154], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Vị trí và kích thước cửa sổ
    const windowTop = interpolate(dockToTop, [0, 1], [height * 0.18, 0]);
    const windowOpacity = interpolate(frame, [152, 160], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
                pointerEvents: 'none',
                opacity: windowOpacity,
            }}
        >
            {/* CỬA SỔ TRÌNH DUYỆT SAFARI MACOS */}
            <div
                style={{
                    position: 'absolute',
                    top: `${windowTop}px`,
                    width: `${Math.min(width * 0.88, 860 * s)}px`,
                    transform: `scale(${interpolate(dockToTop, [0, 1], [safariEntrance, 1])})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* THANH OMNIBOX CHÍNH (FROSTED GLASS PILL BAR) */}
                <div
                    style={{
                        width: '100%',
                        height: `${Math.round(52 * s)}px`,
                        borderRadius: `${Math.round(26 * s)}px`,
                        background: 'rgba(10, 15, 29, 0.96)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                        border: isEnterPressed
                            ? `${Math.max(1, Math.round(1.5 * s))}px solid rgba(237, 1, 124, 0.8)`
                            : `${Math.max(1, Math.round(1.5 * s))}px solid rgba(255, 255, 255, 0.16)`,
                        boxShadow: isEnterPressed
                            ? `0 ${Math.round(10 * s)}px ${Math.round(40 * s)}px rgba(237, 1, 124, 0.35), 0 0 ${Math.round(20 * s)}px rgba(0, 229, 255, 0.25)`
                            : `0 ${Math.round(12 * s)}px ${Math.round(36 * s)}px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)`,
                        display: 'flex',
                        alignItems: 'center',
                        padding: `0 ${Math.round(18 * s)}px`,
                        gap: `${Math.round(14 * s)}px`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'border 0.2s, box-shadow 0.2s',
                    }}
                >
                    {/* Thanh tiến trình tải trang (Top Accent Line) */}
                    {progressOpacity > 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: `${loadProgress}%`,
                                height: `${Math.max(2, Math.round(2.5 * s))}px`,
                                background: 'linear-gradient(90deg, #ed017c 0%, #00e5ff 100%)',
                                opacity: progressOpacity,
                                boxShadow: '0 0 12px #00e5ff',
                            }}
                        />
                    )}

                    {/* 3 Nút tròn Traffic Lights kinh điển macOS */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: `${Math.round(8 * s)}px`,
                            marginRight: `${Math.round(4 * s)}px`,
                        }}
                    >
                        <div
                            style={{
                                width: `${Math.round(12 * s)}px`,
                                height: `${Math.round(12 * s)}px`,
                                borderRadius: '50%',
                                backgroundColor: '#ff5f56',
                                boxShadow: '0 0 6px rgba(255, 95, 86, 0.6)',
                            }}
                        />
                        <div
                            style={{
                                width: `${Math.round(12 * s)}px`,
                                height: `${Math.round(12 * s)}px`,
                                borderRadius: '50%',
                                backgroundColor: '#ffbd2e',
                                boxShadow: '0 0 6px rgba(255, 189, 46, 0.6)',
                            }}
                        />
                        <div
                            style={{
                                width: `${Math.round(12 * s)}px`,
                                height: `${Math.round(12 * s)}px`,
                                borderRadius: '50%',
                                backgroundColor: '#27c93f',
                                boxShadow: '0 0 6px rgba(39, 201, 63, 0.6)',
                            }}
                        />
                    </div>

                    {/* Biểu tượng Ổ khóa SSL bảo mật */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: `${Math.round(6 * s)}px`,
                            padding: `${Math.round(4 * s)}px ${Math.round(8 * s)}px`,
                            borderRadius: `${Math.round(6 * s)}px`,
                            background: isEnterPressed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Lock
                            size={Math.round(15 * s)}
                            color={isEnterPressed ? '#10b981' : '#94a3b8'}
                        />
                    </div>

                    {/* Nội dung Tên miền gõ từng ký tự */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: `${Math.max(13, Math.round(19 * s))}px`,
                            fontWeight: 600,
                            letterSpacing: '0.01em',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}
                    >
                        {/* Phần https:// */}
                        <span style={{ color: '#64748b', fontWeight: 500 }}>
                            {typedText.slice(0, 8)}
                        </span>

                        {/* Phần top */}
                        <span style={{ color: '#ffffff', fontWeight: 700 }}>
                            {typedText.slice(8, 11)}
                        </span>

                        {/* Phần baohiem */}
                        <span style={{ color: '#ed017c', fontWeight: 800 }}>
                            {typedText.slice(11, 18)}
                        </span>

                        {/* Phần .vn */}
                        <span style={{ color: '#00e5ff', fontWeight: 700 }}>
                            {typedText.slice(18)}
                        </span>

                        {/* Con trỏ văn bản nhấp nháy */}
                        {showCaret && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: `${Math.max(2, Math.round(2 * s))}px`,
                                    height: `${Math.round(22 * s)}px`,
                                    backgroundColor: '#ed017c',
                                    marginLeft: `${Math.round(2 * s)}px`,
                                    boxShadow: '0 0 8px #ed017c',
                                }}
                            />
                        )}
                    </div>

                    {/* Biểu tượng phím Enter (Keycap) */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: `${Math.round(4 * s)}px`,
                            padding: `${Math.round(4 * s)}px ${Math.round(10 * s)}px`,
                            borderRadius: `${Math.round(8 * s)}px`,
                            background: isEnterPressed
                                ? 'linear-gradient(135deg, #ed017c 0%, #db2777 100%)'
                                : 'rgba(255, 255, 255, 0.08)',
                            border: isEnterPressed
                                ? '1px solid #ed017c'
                                : '1px solid rgba(255, 255, 255, 0.12)',
                            color: isEnterPressed ? '#ffffff' : '#94a3b8',
                            fontSize: `${Math.max(10, Math.round(13 * s))}px`,
                            fontWeight: 700,
                            boxShadow: isEnterPressed ? '0 0 15px rgba(237, 1, 124, 0.6)' : 'none',
                        }}
                    >
                        <span>Truy cập</span>
                        <CornerDownLeft size={Math.round(13 * s)} />
                    </div>
                </div>

                {/* BẢNG GỢI Ý THÔNG MINH (SMART AUTOCOMPLETE DROPDOWN) */}
                {dropdownOpacity > 0.02 && (
                    <div
                        style={{
                            width: '100%',
                            marginTop: `${Math.round(10 * s)}px`,
                            borderRadius: `${Math.round(18 * s)}px`,
                            background: 'rgba(10, 15, 29, 0.97)',
                            backdropFilter: 'blur(35px)',
                            WebkitBackdropFilter: 'blur(35px)',
                            border: `${Math.max(1, Math.round(1 * s))}px solid rgba(255, 255, 255, 0.12)`,
                            boxShadow: `0 ${Math.round(20 * s)}px ${Math.round(60 * s)}px rgba(0, 0, 0, 0.8), 0 0 ${Math.round(30 * s)}px rgba(237, 1, 124, 0.15)`,
                            padding: `${Math.round(12 * s)}px`,
                            opacity: dropdownOpacity,
                            transform: `translateY(${interpolate(dropdownEntrance, [0, 1], [15 * s, 0])}px)`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: `${Math.round(8 * s)}px`,
                        }}
                    >
                        {/* Tiêu đề mục gợi ý */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: `0 ${Math.round(10 * s)}px`,
                                fontSize: `${Math.max(10, Math.round(12 * s))}px`,
                                fontWeight: 700,
                                color: '#94a3b8',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            <span>Gợi ý hàng đầu từ TopBaoHiem</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: `${Math.round(4 * s)}px`, color: '#00e5ff' }}>
                                <Sparkles size={Math.round(12 * s)} /> Kết quả chính xác
                            </span>
                        </div>

                        {/* Hàng kết quả chính: TopBaoHiem.vn */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: `${Math.round(14 * s)}px`,
                                padding: `${Math.round(12 * s)}px ${Math.round(14 * s)}px`,
                                borderRadius: `${Math.round(12 * s)}px`,
                                background: isEnterPressed
                                    ? 'rgba(237, 1, 124, 0.22)'
                                    : 'rgba(255, 255, 255, 0.06)',
                                border: isEnterPressed
                                    ? '1px solid rgba(237, 1, 124, 0.6)'
                                    : '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: isEnterPressed
                                    ? '0 0 20px rgba(237, 1, 124, 0.3)'
                                    : 'none',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {/* Logo khiên TopBaoHiem */}
                            <div
                                style={{
                                    width: `${Math.round(44 * s)}px`,
                                    height: `${Math.round(44 * s)}px`,
                                    borderRadius: `${Math.round(12 * s)}px`,
                                    background: 'linear-gradient(135deg, #ed017c 0%, #0284c7 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 15px rgba(237, 1, 124, 0.5)',
                                    flexShrink: 0,
                                }}
                            >
                                <ShieldCheck size={Math.round(26 * s)} color="#ffffff" />
                            </div>

                            {/* Thông tin nền tảng */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${Math.round(4 * s)}px` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: `${Math.round(8 * s)}px` }}>
                                    <span
                                        style={{
                                            fontSize: `${Math.max(13, Math.round(18 * s))}px`,
                                            fontWeight: 800,
                                            color: '#ffffff',
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        TopBaoHiem.vn
                                    </span>
                                    <span
                                        style={{
                                            fontSize: `${Math.max(11, Math.round(14 * s))}px`,
                                            color: '#94a3b8',
                                            fontWeight: 500,
                                        }}
                                    >
                                        — Cổng bảo hiểm điện tử số 1 Việt Nam
                                    </span>
                                </div>

                                {/* Badges uy tín */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: `${Math.round(8 * s)}px`, flexWrap: 'wrap' }}>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: `${Math.round(4 * s)}px`,
                                            padding: `${Math.round(2 * s)}px ${Math.round(8 * s)}px`,
                                            borderRadius: `${Math.round(6 * s)}px`,
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            border: '1px solid rgba(16, 185, 129, 0.4)',
                                            color: '#10b981',
                                            fontSize: `${Math.max(9, Math.round(11 * s))}px`,
                                            fontWeight: 700,
                                        }}
                                    >
                                        ✓ Đã xác thực Bộ Công Thương
                                    </span>

                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: `${Math.round(4 * s)}px`,
                                            padding: `${Math.round(2 * s)}px ${Math.round(8 * s)}px`,
                                            borderRadius: `${Math.round(6 * s)}px`,
                                            background: 'rgba(237, 1, 124, 0.12)',
                                            border: '1px solid rgba(237, 1, 124, 0.35)',
                                            color: '#f43f5e',
                                            fontSize: `${Math.max(9, Math.round(11 * s))}px`,
                                            fontWeight: 700,
                                        }}
                                    >
                                        ⚡ Cấp đơn trong 60 giây
                                    </span>

                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: `${Math.round(4 * s)}px`,
                                            padding: `${Math.round(2 * s)}px ${Math.round(8 * s)}px`,
                                            borderRadius: `${Math.round(6 * s)}px`,
                                            background: 'rgba(2, 132, 199, 0.15)',
                                            border: '1px solid rgba(2, 132, 199, 0.4)',
                                            color: '#38bdf8',
                                            fontSize: `${Math.max(9, Math.round(11 * s))}px`,
                                            fontWeight: 700,
                                        }}
                                    >
                                        🏢 5 Đối tác tập đoàn lớn
                                    </span>
                                </div>
                            </div>

                            {/* Mũi tên điều hướng */}
                            <div
                                style={{
                                    width: `${Math.round(32 * s)}px`,
                                    height: `${Math.round(32 * s)}px`,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: isEnterPressed ? '#ed017c' : '#94a3b8',
                                }}
                            >
                                <ArrowRight size={Math.round(16 * s)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
