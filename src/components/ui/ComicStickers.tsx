import React from 'react';
import { Img, staticFile, interpolate } from 'remotion';

// =========================================================================
// 1. STICKER ĐỒNG HỒ VINTAGE COMIC CẮT DÁN THỰC TẾ (CARD 3 - MẤT THỜI GIAN)
// Đổi theo hình ảnh user tải lên: Halftone vintage, viền giấy xé rách, nghiêng -15 độ
// =========================================================================
export const AlarmClockComicSticker: React.FC<{
    frame: number;
    isSpotlight: boolean;
    size: number;
    s: number;
}> = ({ frame, isSpotlight, size, s }) => {
    // Trục đồng hồ nghiêng sang trái 15 độ (-15deg), tạo độ lắc nhẹ nhàng tự nhiên
    const wiggle = isSpotlight
        ? Math.sin(frame * 0.16) * 4.5
        : Math.sin(frame * 0.08) * 2.2;
    const rotate = -15 + wiggle;

    // Nhịp thở vi mô rất nhẹ
    const breathe = 1 + Math.sin(frame * 0.1) * 0.02;

    // Kích thước chuẩn đẹp, sắc nét từng con số và quai chuông vintage
    const widthPx = Math.round(size * 1.06);
    const heightPx = Math.round(widthPx * (854 / 642));

    return (
        <div
            style={{
                width: widthPx,
                height: heightPx,
                position: 'relative',
                transform: `rotate(${rotate}deg) scale(${breathe})`,
                transformOrigin: 'bottom center',
                pointerEvents: 'none',
                filter: 'drop-shadow(4px 6px 0px rgba(15, 23, 42, 0.85)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
            }}
        >
            <Img
                src={staticFile('assets/dong-ho-comic-vintage.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />
        </div>
    );
};

// =========================================================================
// 2. STICKER KÍNH LÚP QUÉT NGANG TÌM KIẾM ĐỊA CHỈ WEB (CARD 1 - RỦI RO / UY TÍN)
// Hiệu ứng: Kính lúp chạy dài mềm mại theo phương ngang, mỗi lần quét qua hiện địa chỉ www://baohiem...
// =========================================================================
export const MagnifyingComicSticker: React.FC<{
    frame: number;
    isSpotlight: boolean;
    size: number;
    s: number;
}> = ({ frame, isSpotlight, size, s }) => {
    // Chu kỳ quét ngang mềm mại (mỗi chu kỳ ~85 frames @ 60fps)
    const scanPeriod = 85;
    const cycle = Math.floor(frame / scanPeriod);
    const cycleProgress = (frame % scanPeriod) / scanPeriod;

    // Quỹ đạo quét ngang sin mượt mà chạy từ trái qua phải và quay lại
    const scanProgress = (Math.sin(frame * 0.075) + 1) / 2; // 0 -> 1 -> 0
    const maxTravel = isSpotlight ? 130 * s : 65 * s;
    const scanX = (scanProgress - 0.5) * maxTravel;

    // Vận tốc quét để tạo góc nghiêng động (nghiêng theo chiều chuyển động)
    const velocity = Math.cos(frame * 0.075);
    const dynamicTilt = velocity * (isSpotlight ? 9 : 4.5);
    const rotate = -12 + dynamicTilt;

    // Nhịp thở vi mô
    const breathe = 1 + Math.sin(frame * 0.1) * 0.015;

    // Danh sách địa chỉ web người tiêu dùng hoang mang tìm kiếm
    const urlList = [
        'www://baohiem...',
        'www.baohiem-xyz.vn',
        'www.muabaohiem.com',
        'www://baohiem-uytin?',
    ];
    const currentUrl = urlList[cycle % urlList.length];

    const glassWidth = Math.round(size * 0.95);
    const glassHeight = Math.round(glassWidth * (944 / 621));

    // Kích thước thanh URL Bar
    const pillWidth = Math.round(interpolate(isSpotlight ? 1 : 0, [0, 1], [200 * s, 270 * s]));
    const pillHeight = Math.round(interpolate(isSpotlight ? 1 : 0, [0, 1], [34 * s, 44 * s]));
    const textSize = Math.round(interpolate(isSpotlight ? 1 : 0, [0, 1], [13 * s, 17 * s]));

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
            }}
        >
            {/* 1. THANH URL SEARCH BAR MINI PHONG CÁCH COMIC POP-ART */}
            <div
                style={{
                    position: 'absolute',
                    top: Math.round(36 * s),
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: pillWidth,
                    height: pillHeight,
                    background: '#ffffff',
                    borderRadius: 999,
                    border: `${Math.max(2.2, 3 * s)}px solid #0f172a`,
                    boxShadow: `${3 * s}px ${3.5 * s}px 0px #0f172a`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: `0 ${14 * s}px`,
                    gap: 8 * s,
                    zIndex: 5,
                    overflow: 'hidden',
                }}
            >
                {/* Icon cầu web nhỏ */}
                <span
                    style={{
                        fontSize: `${textSize}px`,
                        lineHeight: 1,
                        flexShrink: 0,
                    }}
                >
                    🌐
                </span>

                {/* Dòng chữ URL đổi theo chu kỳ quét */}
                <div
                    style={{
                        flex: 1,
                        fontFamily: '"Plus Jakarta Sans", monospace, sans-serif',
                        fontSize: `${textSize}px`,
                        fontWeight: 800,
                        color: '#0f172a',
                        letterSpacing: '-0.02em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <span style={{ color: '#d97706' }}>{currentUrl.slice(0, 6)}</span>
                    <span>{currentUrl.slice(6)}</span>
                </div>

                {/* Vệt sáng rọi hội tụ qua tròng kính lúp chạy theo scanX */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${50 + (scanX / (maxTravel / 2)) * 38}%`,
                        width: Math.round(65 * s),
                        transform: 'translateX(-50%)',
                        background:
                            'linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.4) 50%, transparent 100%)',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* 2. CHIẾC KÍNH LÚP VINTAGE LƯỚT NGANG MỀM MẠI PHÍA TRÊN THANH URL */}
            <div
                style={{
                    width: glassWidth,
                    height: glassHeight,
                    position: 'relative',
                    transform: `translateX(${scanX}px) rotate(${rotate}deg) scale(${breathe})`,
                    transformOrigin: '40% 30%',
                    zIndex: 10,
                    filter: 'drop-shadow(4px 6px 0px rgba(15, 23, 42, 0.85)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))',
                }}
            >
                <Img
                    src={staticFile('assets/kinh-lup-vintage-sticker.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                    }}
                />
            </div>
        </div>
    );
};

// =========================================================================
// 3. STICKER TẬP HỢP ĐỒNG / SỔ TAY MA TRẬN KÈM ĐINH GHIM NỔI BẬT (CARD 2)
// Thiết kế phóng to, đinh ghim đỏ to rõ ràng có khối 3D theo yêu cầu của user
// =========================================================================
// =========================================================================
// 3. STICKER TẬP HỢP ĐỒNG / SỔ TAY MA TRẬN KÈM ĐINH GHIM NỔI BẬT (CARD 2)
// Thiết kế sổ tay lò xo ma trận và chiếc đinh ghim đỏ siêu to rõ, khối 3D Pop-Art
// =========================================================================
export const ContractComicSticker: React.FC<{
    frame: number;
    isSpotlight: boolean;
    size: number;
    s: number;
}> = ({ frame, isSpotlight, size, s }) => {
    const tilt = isSpotlight
        ? Math.sin(frame * 0.15) * 6
        : Math.sin(frame * 0.05) * 2;
    const pinWiggle = isSpotlight ? Math.sin(frame * 0.28) * 5 : Math.sin(frame * 0.1) * 2;
    const dizzySpin = isSpotlight ? (frame * 5) % 360 : 0;

    return (
        <div
            style={{
                width: size,
                height: size,
                position: 'relative',
                transform: `rotate(${tilt}deg)`,
                transformOrigin: 'bottom center',
                pointerEvents: 'none',
            }}
        >
            <svg
                viewBox="0 0 260 260"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
                {/* Lớp bóng đổ Comic Pop-Art dày dặn cho toàn bộ sổ tay */}
                <g transform="translate(9, 11)" opacity={0.88}>
                    {/* Bóng tờ bìa sau */}
                    <rect x="36" y="36" width="155" height="185" rx="14" fill="#0f172a" transform="rotate(-9 113 128)" />
                    {/* Bóng cuốn sổ tay trước */}
                    <rect x="54" y="28" width="155" height="185" rx="14" fill="#0f172a" transform="rotate(6 131 120)" />
                </g>

                {/* 1. LỚP BÌA SAU / TỜ GIẤY SAU CỦA XẤP HỒ SƠ (MÀU HỒNG CAM NHẠT) */}
                <rect
                    x="36"
                    y="36"
                    width="155"
                    height="185"
                    rx="14"
                    fill="#ffe4e6"
                    stroke="#0f172a"
                    strokeWidth="9"
                    transform="rotate(-9 113 128)"
                />

                {/* 2. CUỐN SỔ TAY CHÍNH PHÍA TRƯỚC (NOTEBOOK HỢP ĐỒNG MA TRẬN) */}
                <g transform="rotate(6 131 120)">
                    {/* Thân sổ tay màu trắng tinh */}
                    <rect
                        x="54"
                        y="28"
                        width="155"
                        height="185"
                        rx="14"
                        fill="#ffffff"
                        stroke="#0f172a"
                        strokeWidth="9.5"
                    />

                    {/* Các tab màu chỉ mục (Index bookmark tabs) ở mép phải sổ tay */}
                    <path d="M 209,75 L 223,75 L 223,98 L 209,98 Z" fill="#fbbf24" stroke="#0f172a" strokeWidth="5" />
                    <path d="M 209,112 L 223,112 L 223,135 L 209,135 Z" fill="#fb923c" stroke="#0f172a" strokeWidth="5" />

                    {/* Hàng gáy xoắn lò xo Sổ tay (Spiral Notebook Rings) ở mép trái */}
                    {[58, 88, 118, 148, 178].map((yRing, idx) => (
                        <g key={idx}>
                            {/* Lỗ sổ tay */}
                            <circle cx="66" cy={yRing} r="5" fill="#0f172a" />
                            {/* Vòng kim loại lò xo móc qua */}
                            <path
                                d={`M 50,${yRing - 3} C 44,${yRing - 3} 44,${yRing + 7} 66,${yRing + 4}`}
                                fill="none"
                                stroke="#94a3b8"
                                strokeWidth="6"
                                strokeLinecap="round"
                            />
                            <path
                                d={`M 50,${yRing - 3} C 44,${yRing - 3} 44,${yRing + 7} 66,${yRing + 4}`}
                                fill="none"
                                stroke="#0f172a"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </g>
                    ))}

                    {/* Tiêu đề văn bản tài liệu màu đỏ */}
                    <line x1="82" y1="56" x2="148" y2="56" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" />

                    {/* Các dòng chữ điều khoản chi chít ma trận */}
                    <line x1="82" y1="80" x2="190" y2="80" stroke="#0f172a" strokeWidth="6.5" strokeLinecap="round" />
                    <line x1="82" y1="102" x2="178" y2="102" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                    <line x1="82" y1="124" x2="190" y2="124" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                    <line x1="82" y1="146" x2="168" y2="146" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                    <line x1="82" y1="168" x2="186" y2="168" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                    <line x1="82" y1="190" x2="152" y2="190" stroke="#0f172a" strokeWidth="6.5" strokeLinecap="round" />
                </g>

                {/* 3. CHIẾC ĐINH GHIM BẤM MÀU ĐỎ SIÊU TO NỔI BẬT KHỐI 3D POP-ART (GIANT RED PUSHPIN) */}
                {/* Đinh ghim cắm ở góc trên mép sổ tay, kích thước siêu to rõ ràng */}
                <g transform={`translate(${172}, ${36}) rotate(${pinWiggle})`}>
                    {/* Bóng đổ của chiếc đinh ghim xuống mặt giấy sổ tay */}
                    <ellipse cx="10" cy="30" rx="26" ry="11" fill="#0f172a" opacity={0.45} />

                    {/* Chân kim loại bằng thép sáng của đinh ghim cắm nghiêng xuyên qua trang giấy */}
                    <path
                        d="M -5,12 L -9,30 L 9,30 L 5,12 Z"
                        fill="#cbd5e1"
                        stroke="#0f172a"
                        strokeWidth="5"
                        strokeLinejoin="round"
                    />

                    {/* Vành cổ đinh ghim (collar ring) màu đỏ thẫm */}
                    <ellipse cx="0" cy="14" rx="23" ry="8.5" fill="#991b1b" stroke="#0f172a" strokeWidth="6" />

                    {/* Thân mũ đinh ghim tròn to khổng lồ (R=35px - cực kỳ to, rõ, ấn tượng) */}
                    <circle cx="0" cy="-6" r="35" fill="#ef4444" stroke="#0f172a" strokeWidth="8" />

                    {/* Lớp gradient bóng 3D nội tại của mũ đinh ghim */}
                    <circle cx="-5" cy="-10" r="26" fill="#f87171" opacity={0.75} />

                    {/* Vệt phản quang sáng bóng cong vút 3D trên đỉnh mũ đinh ghim */}
                    <path
                        d="M -18,-20 A 25 25 0 0 1 18,-22"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="7.5"
                        strokeLinecap="round"
                    />
                    {/* Đốm sáng phản quang tròn chói lóa */}
                    <circle cx="-9" cy="-17" r="5.5" fill="#ffffff" />
                </g>

                {/* 4. BIỂU TƯỢNG XOÁY ỐC CHÓNG MẶT KHI Ở SPOTLIGHT (DIZZY SPIRAL) */}
                {isSpotlight && (
                    <g
                        transform={`translate(34, 28) rotate(${dizzySpin})`}
                        style={{ transformOrigin: '34px 28px' }}
                    >
                        <circle cx="34" cy="28" r="20" fill="#fef2f2" stroke="#ef4444" strokeWidth="5" />
                        <path
                            d="M 34,14 A 14 14 0 0 1 48 28 A 8 8 0 0 1 40 36"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                        />
                    </g>
                )}
            </svg>
        </div>
    );
};

// =========================================================================
// 4. STICKER BIỂN BÁO + GIỌT MỒ HÔI LO LẮNG (LO LẮNG - CARD 4)
// Thiết kế phóng to, nghiêng nhẹ sang phải +13 độ, giọt mồ hôi 3D toát ra lo lắng
// =========================================================================
export const WarningSweatComicSticker: React.FC<{
    frame: number;
    isSpotlight: boolean;
    size: number;
    s: number;
}> = ({ frame, isSpotlight, size, s }) => {
    const pulse = isSpotlight
        ? 1 + Math.sin(frame * 0.25) * 0.07
        : 1 + Math.sin(frame * 0.06) * 0.025;
    const sweatY = isSpotlight ? Math.sin(frame * 0.3) * (9 * s) : Math.sin(frame * 0.1) * (3.5 * s);
    // Độ nghiêng sang phải theo yêu cầu của user (+13 độ cơ sở kèm dao động vi mô)
    const tilt = 13 + (isSpotlight ? Math.sin(frame * 0.18) * 4.5 : Math.sin(frame * 0.07) * 2);

    return (
        <div
            style={{
                width: size,
                height: size,
                position: 'relative',
                transform: `rotate(${tilt}deg) scale(${pulse})`,
                transformOrigin: 'bottom center',
                pointerEvents: 'none',
            }}
        >
            <svg
                viewBox="0 0 220 220"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
                {/* 1. Lớp bóng đổ Comic Pop-Art dày dặn */}
                <g transform="translate(8, 10)" opacity={0.88}>
                    <polygon points="95,22 175,160 15,160" fill="#0f172a" />
                    {/* Bóng giọt mồ hôi */}
                    <path
                        d="M 180,38 C 180,38 202,68 202,82 A 22 22 0 0 1 158,82 C 158,68 180,38 180,38 Z"
                        fill="#0f172a"
                    />
                </g>

                {/* 2. Biển tam giác cảnh báo cyan dày dặn viền mực Comic đậm */}
                <polygon
                    points="95,20 175,158 15,158"
                    fill="#06b6d4"
                    stroke="#0f172a"
                    strokeWidth="11"
                    strokeLinejoin="round"
                />

                {/* 3. Lõi tam giác trắng tinh phản chiếu */}
                <polygon
                    points="95,46 154,144 36,144"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="7"
                    strokeLinejoin="round"
                />

                {/* 4. Dấu chấm than to đậm màu đen nổi bật */}
                <path d="M 95,70 L 95,110" stroke="#0f172a" strokeWidth="14" strokeLinecap="round" />
                <circle cx="95" cy="130" r="8" fill="#0f172a" />
                {/* Vệt phản quang trắng trên dấu chấm than */}
                <path d="M 93,74 L 93,106" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />

                {/* 5. Giọt mồ hôi Comic toát ra to rõ ràng (Giant Sweat Drop) */}
                <g transform={`translate(160, ${36 + sweatY})`}>
                    {/* Thân giọt mồ hôi to */}
                    <path
                        d="M 20,0 C 20,0 40,28 40,42 A 20 20 0 0 1 0,42 C 0,28 20,0 20,0 Z"
                        fill="#38bdf8"
                        stroke="#0f172a"
                        strokeWidth="6"
                        strokeLinejoin="round"
                    />
                    {/* Vệt phản quang cong 3D trên giọt nước */}
                    <path
                        d="M 28,32 A 13 13 0 0 1 16,48"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <circle cx="28" cy="30" r="3.5" fill="#ffffff" />
                </g>

                {/* 6. Giọt mồ hôi nhỏ li ti văng ra bên cạnh tạo cảm giác toát mồ hôi hột */}
                <g transform={`translate(142, ${20 + sweatY * 0.7}) rotate(-18)`}>
                    <path
                        d="M 8,0 C 8,0 16,11 16,17 A 8 8 0 0 1 0,17 C 0,11 8,0 8,0 Z"
                        fill="#7dd3fc"
                        stroke="#0f172a"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                    />
                    <circle cx="11" cy="14" r="2" fill="#ffffff" />
                </g>
            </svg>
        </div>
    );
};
