import React from 'react';
import { interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { Lock, ShieldCheck, ArrowRight, CornerDownLeft, Sparkles, MousePointer2 } from 'lucide-react';

interface CenterSpotlightSearchProps {
    frame: number;
    width: number;
    height: number;
}

export const CenterSpotlightSearch: React.FC<CenterSpotlightSearchProps> = ({ frame, width, height }) => {
    const { fps } = useVideoConfig();

    // Hệ số co giãn tỉ lệ theo canvas (chuẩn 3840 x 2160)
    const is4K = width >= 3840;
    const s = is4K ? 1 : width / 3840;

    // Component chỉ hiển thị trong giai đoạn đầu (Frame 0 -> 278, đã tăng thêm 1s)
    if (frame < 5 || frame > 278) return null;

    // 1. TIMELINE PHÂN BỔ:
    // Frame 10 -> 26: Ô Search xuất hiện từ trung tâm (Spring phóng êm)
    const entrance = spring({
        frame: Math.max(0, frame - 10),
        fps,
        config: { damping: 16, mass: 0.85, stiffness: 100 },
    });

    // Frame 25 -> 95: Gõ từng ký tự "https://topbaohiem.vn" (chậm rãi, sắc nét, thư thả)
    const fullDomain = 'https://topbaohiem.vn';
    const typingProgress = interpolate(frame, [25, 95], [0, fullDomain.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const currentTypedLength = Math.floor(typingProgress);
    const typedText = fullDomain.slice(0, currentTypedLength);

    // Con trỏ nhấp nháy khi gõ
    const showCaret = frame >= 24 && frame < 156 && Math.floor(frame / 12) % 2 === 0;

    // NỘI DUNG DROPDOWN CHỈ HIỂN THỊ KHI BẮT ĐẦU GÕ XONG CHỮ TOP...
    // Hiệu ứng xổ xuống mướt mà, rõ ràng với duration đầy đủ (Frame 63 -> 105 ~ 42 frames, 0.7s)
    const dropdownEntrance = interpolate(frame, [63, 105], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    // Các thông số xổ xuống mượt mà & thấy rõ ràng của Dropdown (Trải rèm xổ dọc từ mép thanh search):
    const dropdownClipBottom = interpolate(dropdownEntrance, [0, 1], [100, 0]);
    const dropdownTranslateY = interpolate(dropdownEntrance, [0, 1], [-36 * s, 0]);
    const dropdownOpacity = interpolate(dropdownEntrance, [0, 0.25, 1], [0, 0.85, 1]);
    const dropdownScale = interpolate(dropdownEntrance, [0, 1], [0.95, 1]);

    // Chuyển động lướt trượt nhẹ theo tầng của nội dung bên trong (Staggered cascade)
    const innerHeaderOpacity = interpolate(dropdownEntrance, [0.15, 0.65], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const innerHeaderY = interpolate(dropdownEntrance, [0.15, 0.65], [-12 * s, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const innerCardOpacity = interpolate(dropdownEntrance, [0.3, 0.85], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const innerCardY = interpolate(dropdownEntrance, [0.3, 0.85], [-18 * s, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Frame 125 -> 154: Con trỏ chuột macOS lướt từ góc dưới phải vào nút "Truy cập ↵"
    const mouseEntrance = interpolate(frame, [125, 154], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Frame 156 -> 166: Chuột click nút Enter (co nhẹ + kích hoạt trạng thái Enter)
    const isEnterPressed = frame >= 156;
    const clickScale = interpolate(frame, [156, 160, 166], [1, 0.88, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // CHẬM LẠI NHỊP KHI BẤM TRUY CẬP (TĂNG THÊM 1 GIÂY):
    // Giữ nguyên trạng thái active từ frame 156 -> 258 (hơn 100 frames ~ 1.7s) để người xem kịp đọc trọn vẹn Dropdown.
    // Frame 258 -> 276: Spotlight Search phóng to nhẹ và tan biến (Zoom-in & Fade out) hoàn toàn
    const exitProgress = interpolate(frame, [258, 276], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
    const overallOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const overallScale = interpolate(exitProgress, [0, 1], [1, 1.06]);

    // Kích thước chuẩn ô Search to bản chính giữa màn hình (To, bề thế, dễ đọc)
    const searchWidth = Math.min(width * 0.76, Math.round(2360 * s));
    const searchHeight = Math.round(140 * s);
    const enterBtnWidth = Math.round(320 * s);

    // Tọa độ con trỏ chuột lướt vào nút Enter
    const cursorStartX = Math.round(220 * s);
    const cursorStartY = Math.round(260 * s);
    const cursorCurrentX = interpolate(mouseEntrance, [0, 1], [cursorStartX, 0]);
    const cursorCurrentY = interpolate(mouseEntrance, [0, 1], [cursorStartY, 0]);
    const cursorOpacity = interpolate(frame, [122, 130, 258, 268], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                pointerEvents: 'none',
                opacity: overallOpacity,
                transform: `scale(${overallScale})`,
            }}
        >
            {/* VÙNG CHỨA SPOTLIGHT SEARCH */}
            <div
                style={{
                    position: 'relative',
                    width: searchWidth,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: `scale(${entrance})`,
                    opacity: entrance,
                }}
            >
                {/* 1. BADGE TIÊU ĐỀ PHÍA TRÊN Ô SEARCH */}
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 12 * s,
                        padding: `${10 * s}px ${26 * s}px`,
                        borderRadius: 999,
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1.5px solid rgba(237, 1, 124, 0.25)',
                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                        marginBottom: 28 * s,
                        backdropFilter: 'blur(20px)',
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
                            fontSize: Math.max(13, 20 * s),
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            color: '#ed017c',
                            textTransform: 'uppercase',
                        }}
                    >
                        CỔNG BẢO HIỂM ĐIỆN TỬ VIỆT NAM • KHÁM PHÁ TRỰC TUYẾN
                    </span>
                </div>

                {/* 2. THANH Ô SEARCH SPOTLIGHT TO BẢN (FROSTED GLASS LIGHT) */}
                <div
                    style={{
                        width: '100%',
                        height: searchHeight,
                        borderRadius: Math.round(searchHeight / 2),
                        background: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: `${Math.max(1, Math.round(1.5 * s))}px solid rgba(203, 213, 225, 0.8)`,
                        boxShadow: `0 ${Math.round(30 * s)}px ${Math.round(80 * s)}px rgba(15, 23, 42, 0.09), 0 ${Math.round(8 * s)}px ${Math.round(20 * s)}px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.9) inset`,
                        display: 'flex',
                        alignItems: 'center',
                        padding: `0 ${Math.round(30 * s)}px`,
                        gap: Math.round(22 * s),
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* macOS Traffic Lights (3 nút tròn) */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: Math.round(14 * s),
                            marginRight: Math.round(8 * s),
                        }}
                    >
                        <div
                            style={{
                                width: Math.round(22 * s),
                                height: Math.round(22 * s),
                                borderRadius: '50%',
                                backgroundColor: '#ff5f56',
                                boxShadow: '0 1px 4px rgba(255, 95, 86, 0.4)',
                            }}
                        />
                        <div
                            style={{
                                width: Math.round(22 * s),
                                height: Math.round(22 * s),
                                borderRadius: '50%',
                                backgroundColor: '#ffbd2e',
                                boxShadow: '0 1px 4px rgba(255, 189, 46, 0.4)',
                            }}
                        />
                        <div
                            style={{
                                width: Math.round(22 * s),
                                height: Math.round(22 * s),
                                borderRadius: '50%',
                                backgroundColor: '#27c93f',
                                boxShadow: '0 1px 4px rgba(39, 201, 63, 0.4)',
                            }}
                        />
                    </div>

                    {/* Biểu tượng Ổ khoá SSL an toàn (Sạch sẽ, thanh lịch chuẩn Apple) */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: Math.round(10 * s),
                            padding: `${Math.round(10 * s)}px ${Math.round(18 * s)}px`,
                            borderRadius: Math.round(14 * s),
                            background: 'rgba(241, 245, 249, 0.85)',
                            border: '1.5px solid rgba(203, 213, 225, 0.6)',
                        }}
                    >
                        <Lock
                            size={Math.round(26 * s)}
                            color="#64748b"
                            strokeWidth={2.4}
                        />
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: Math.max(13, 19 * s),
                                fontWeight: 700,
                                color: '#64748b',
                            }}
                        >
                            BẢO MẬT
                        </span>
                    </div>

                    {/* Vùng gõ tên miền https://topbaohiem.vn (TO, RÕ RÀNG, SẮC NÉT) */}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: Math.max(26, Math.round(52 * s)),
                            fontWeight: 600,
                            letterSpacing: '0.01em',
                            fontFamily: 'var(--font-primary), system-ui, -apple-system, sans-serif',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    >
                        {/* https:// */}
                        <span style={{ color: '#94a3b8', fontWeight: 500 }}>{typedText.slice(0, 8)}</span>

                        {/* top */}
                        <span style={{ color: '#0f172a', fontWeight: 800 }}>{typedText.slice(8, 11)}</span>

                        {/* baohiem */}
                        <span style={{ color: '#ed017c', fontWeight: 900 }}>{typedText.slice(11, 18)}</span>

                        {/* .vn */}
                        <span style={{ color: '#0284c7', fontWeight: 800 }}>{typedText.slice(18)}</span>

                        {/* Con trỏ soạn thảo nhấp nháy */}
                        {showCaret && (
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: Math.max(3, Math.round(5 * s)),
                                    height: Math.round(58 * s),
                                    backgroundColor: '#ed017c',
                                    marginLeft: Math.round(4 * s),
                                    borderRadius: 2,
                                    boxShadow: '0 0 12px rgba(237, 1, 124, 0.8)',
                                }}
                            />
                        )}
                    </div>

                    {/* NÚT ENTER / TRUY CẬP (TO BẢN VÀ NỔI BẬT) */}
                    <div
                        id="enter-action-button"
                        style={{
                            position: 'relative',
                            width: enterBtnWidth,
                            height: Math.round(88 * s),
                            borderRadius: Math.round(44 * s),
                            background: isEnterPressed
                                ? 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)'
                                : 'linear-gradient(135deg, #ed017c 0%, #db2777 100%)',
                            boxShadow: '0 12px 28px rgba(237, 1, 124, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: Math.round(12 * s),
                            color: '#ffffff',
                            fontFamily: 'var(--font-primary)',
                            fontSize: Math.max(16, 26 * s),
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                            transform: `scale(${clickScale})`,
                            transition: 'transform 0.1s ease',
                        }}
                    >
                        <span>Truy cập</span>
                        <CornerDownLeft size={Math.round(26 * s)} strokeWidth={2.4} />

                        {/* CON TRỎ CHUỘT MACOS LƯỚT VÀO VÀ CLICK NÚT NÀY */}
                        {cursorOpacity > 0.01 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    right: Math.round(40 * s) + cursorCurrentX,
                                    bottom: Math.round(10 * s) - cursorCurrentY,
                                    zIndex: 100,
                                    opacity: cursorOpacity,
                                    transform: `scale(${interpolate(clickScale, [0.88, 1], [0.9, 1])})`,
                                    filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4))',
                                }}
                            >
                                <MousePointer2
                                    size={Math.max(32, 54 * s)}
                                    color="#0f172a"
                                    fill="#ffffff"
                                    strokeWidth={2}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. BẢNG GỢI Ý THÔNG MINH (SMART AUTOCOMPLETE DROPDOWN) */}
                {dropdownEntrance > 0.005 && (
                    <div
                        style={{
                            width: '100%',
                            marginTop: Math.round(18 * s),
                            borderRadius: Math.round(28 * s),
                            background: 'rgba(255, 255, 255, 0.96)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            border: isEnterPressed
                                ? `${Math.max(1, Math.round(1.5 * s))}px solid rgba(237, 1, 124, 0.5)`
                                : `${Math.max(1, Math.round(1.5 * s))}px solid rgba(226, 232, 240, 0.9)`,
                            boxShadow: isEnterPressed
                                ? `0 ${Math.round(35 * s)}px ${Math.round(85 * s)}px rgba(15, 23, 42, 0.12), 0 0 ${Math.round(22 * s)}px rgba(237, 1, 124, 0.18)`
                                : `0 ${Math.round(35 * s)}px ${Math.round(85 * s)}px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.95) inset`,
                            padding: Math.round(24 * s),
                            opacity: dropdownOpacity,
                            transformOrigin: 'top center',
                            transform: `translateY(${dropdownTranslateY}px) scale(${dropdownScale})`,
                            clipPath: `inset(0% 0% ${dropdownClipBottom}% 0% round ${Math.round(28 * s)}px)`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: Math.round(14 * s),
                            transition: 'border 0.2s ease, box-shadow 0.2s ease',
                        }}
                    >
                        {/* Tiêu đề Dropdown (Trôi nhẹ theo tầng thác nước) */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: `0 ${Math.round(16 * s)}px`,
                                fontSize: Math.max(12, 18 * s),
                                fontWeight: 700,
                                color: '#64748b',
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-mono)',
                                opacity: innerHeaderOpacity,
                                transform: `translateY(${innerHeaderY}px)`,
                            }}
                        >
                            <span>GỢI Ý TRỰC TUYẾN TỪ HỆ THỐNG</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 * s, color: '#0284c7' }}>
                                <Sparkles size={18 * s} /> ĐƯỢC XÁC THỰC CHÍNH THỨC
                            </span>
                        </div>

                        {/* Thẻ gợi ý TopBaoHiem.vn (Sạch sẽ, thanh lịch nguyên bản như ảnh 3, trượt vào mướt mà) */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: Math.round(24 * s),
                                padding: `${Math.round(20 * s)}px ${Math.round(24 * s)}px`,
                                borderRadius: Math.round(20 * s),
                                background: 'rgba(248, 250, 252, 0.9)',
                                border: `${Math.max(1, Math.round(1.5 * s))}px solid rgba(226, 232, 240, 0.7)`,
                                opacity: innerCardOpacity,
                                transform: `translateY(${innerCardY}px)`,
                            }}
                        >
                            {/* Icon khiên TopBaoHiem */}
                            <div
                                style={{
                                    width: Math.round(72 * s),
                                    height: Math.round(72 * s),
                                    borderRadius: Math.round(20 * s),
                                    background: 'linear-gradient(135deg, #ed017c 0%, #0284c7 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 24px rgba(237, 1, 124, 0.35)',
                                    flexShrink: 0,
                                }}
                            >
                                <ShieldCheck size={Math.round(42 * s)} color="#ffffff" strokeWidth={2.2} />
                            </div>

                            {/* Thông tin kết quả */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 * s }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 * s }}>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-primary)',
                                            fontSize: Math.max(18, 28 * s),
                                            fontWeight: 800,
                                            color: '#0f172a',
                                        }}
                                    >
                                        TopBaoHiem.vn
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-primary)',
                                            fontSize: Math.max(13, 20 * s),
                                            color: '#64748b',
                                            fontWeight: 600,
                                        }}
                                    >
                                        — Cổng Mua Bán & So Sánh Bảo Hiểm Trực Tuyến Toàn Diện
                                    </span>
                                </div>

                                {/* Badges uy tín */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 * s, flexWrap: 'wrap' }}>
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6 * s,
                                            padding: `${4 * s}px ${14 * s}px`,
                                            borderRadius: 999,
                                            background: 'rgba(16, 185, 129, 0.12)',
                                            border: '1px solid rgba(16, 185, 129, 0.35)',
                                            color: '#059669',
                                            fontSize: Math.max(11, 15 * s),
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-mono)',
                                        }}
                                    >
                                        ✓ Đã Đăng Ký Bộ Công Thương
                                    </span>

                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6 * s,
                                            padding: `${4 * s}px ${14 * s}px`,
                                            borderRadius: 999,
                                            background: 'rgba(237, 1, 124, 0.1)',
                                            border: '1px solid rgba(237, 1, 124, 0.3)',
                                            color: '#e11d48',
                                            fontSize: Math.max(11, 15 * s),
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-mono)',
                                        }}
                                    >
                                        ⚡ Cấp Đơn Trong 60 Giây
                                    </span>

                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6 * s,
                                            padding: `${4 * s}px ${14 * s}px`,
                                            borderRadius: 999,
                                            background: 'rgba(2, 132, 199, 0.1)',
                                            border: '1px solid rgba(2, 132, 199, 0.3)',
                                            color: '#0284c7',
                                            fontSize: Math.max(11, 15 * s),
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-mono)',
                                        }}
                                    >
                                        🏢 75+ Đối Tác Bảo Hiểm Lớn
                                    </span>
                                </div>
                            </div>

                            {/* Mũi tên điều hướng sạch sẽ như ảnh 3 */}
                            <div
                                style={{
                                    width: Math.round(48 * s),
                                    height: Math.round(48 * s),
                                    borderRadius: '50%',
                                    background: 'rgba(241, 245, 249, 0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#64748b',
                                    border: `${Math.max(1, Math.round(1 * s))}px solid rgba(226, 232, 240, 0.8)`,
                                }}
                            >
                                <ArrowRight size={Math.round(24 * s)} strokeWidth={2.4} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
