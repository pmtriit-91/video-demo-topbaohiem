import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, Img } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';

export const Scene1_ProblemSnap: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    // Chuẩn hóa hệ quy chiếu 4K chuẩn (3840 x 2160) để mọi độ phân giải 1080p / 2K / 4K đều đồng nhất 100%
    const baseWidth = 3840;
    const baseHeight = 2160;
    const scale = width / baseWidth;

    // =========================================================================
    // 0. CỤM HOOK DẪN CHUYỆN: "Muốn mua bảo hiểm online," -> "NHƯNG..."
    // =========================================================================
    const fullPrefixText = 'Muốn mua bảo hiểm online,';
    const typingProgress = interpolate(frame, [10, 65], [0, fullPrefixText.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const charCount = Math.floor(typingProgress);
    const typedText = fullPrefixText.slice(0, charCount);
    const showCursor = charCount > 0 && frame < 72 && Math.floor(frame / 6) % 2 === 0;

    // Fade-in êm ái cho cụm dẫn chuyện ngay khi bắt đầu gõ (không xuất hiện chip trắng rỗng ở frame 0)
    const hookEntranceOpacity = interpolate(frame, [10, 16], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chữ "NHƯNG..." bùng nổ ở Frame 72
    const punchSpring = spring({
        frame: Math.max(0, frame - 72),
        fps,
        config: { damping: 9, mass: 0.45, stiffness: 180 },
    });

    // Yahoo Buzz Shake chấn động nhẹ tần số cao tắt dần
    const buzzElapsed = frame - 72;
    const isBuzzing = buzzElapsed >= 0 && buzzElapsed < 24;
    const buzzDecay = isBuzzing ? Math.pow(1 - buzzElapsed / 24, 1.8) : 0;
    const buzzX = isBuzzing ? Math.sin(buzzElapsed * 3.8) * buzzDecay * 16 : 0;
    const buzzY = isBuzzing ? Math.cos(buzzElapsed * 4.4) * buzzDecay * 10 : 0;
    const buzzRot = isBuzzing ? Math.sin(buzzElapsed * 3.2) * buzzDecay * 2.5 : 0;

    // Quỹ đạo lướt từ Trung tâm lên Đỉnh (Docking to Top Header: Frames 135 -> 175)
    const dockSpring = spring({
        frame: Math.max(0, frame - 135),
        fps,
        config: { damping: 14, mass: 0.9, stiffness: 65 },
    });
    const hookY = interpolate(dockSpring, [0, 1], [940, 130]);
    const hookScale = interpolate(dockSpring, [0, 1], [1.18, 0.88]);

    // 0.2. HIỆU ỨNG DẢI SÓNG GIẤY XANH MINT Ở ĐÁY (Entrance cuộn dâng lên & sóng gợn nhẹ)
    const waveEntrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 70 },
    });
    const waveEntranceY = interpolate(waveEntrance, [0, 1], [300, 0]);
    const waveFloatY = Math.sin(frame * 0.04) * 8;
    const waveLayer2FloatX = Math.cos(frame * 0.03) * 15;

    // 0.3. ENTRANCE CỦA DẢI CÁNH MÁY BAY GIẤY ORIGAMI PHÍA PHẢI (Chỉ xuất hiện sau khi dẫn chuyện xong và lướt lên đỉnh: Frame 150+)
    const maybayEntrance = spring({
        frame: frame - 150,
        fps,
        config: { damping: 15, mass: 0.9, stiffness: 65 },
    });
    const maybaySlideX = interpolate(maybayEntrance, [0, 1], [850, 0]);
    const maybayOpacity = interpolate(maybayEntrance, [0, 1], [0, 1]);
    const maybayScale = interpolate(maybayEntrance, [0, 1], [0.88, 1]);

    // 0.5. HIỆU ỨNG LAPTOP MACBOOK MOCK UI (Lướt nhẹ từ phải vào sau khi hook lên đỉnh: Frame 180+)
    const laptopEntrance = spring({
        frame: frame - 180,
        fps,
        config: { damping: 14, stiffness: 60 },
    });
    const laptopSlideX = interpolate(laptopEntrance, [0, 1], [500, 0]);
    const laptopRotateY = interpolate(laptopEntrance, [0, 1], [-14, 0]);
    const laptopOpacity = interpolate(laptopEntrance, [0, 1], [0, 1]);
    const laptopFloatY = Math.sin(frame * 0.04 + 1.2) * 8;
    const laptopTilt = Math.cos(frame * 0.03 + 0.5) * 0.6;

    // Stop-motion frame jitter nhẹ mô phỏng hoạt hình giấy thủ công 12fps/24fps feel
    const jitterX = Math.sin(frame * 0.4) * 2;
    const jitterY = Math.cos(frame * 0.3) * 2;

    // 0.8. ENTRANCE CỦA NHÂN VẬT HERO CHỦ THỂ (Dâng lên tiếp đất sát đáy khi hook lướt lên đỉnh)
    const charEntranceSpring = spring({
        frame: Math.max(0, frame - 125),
        fps,
        config: { damping: 16, mass: 0.95, stiffness: 75 },
    });
    const charEntranceY = interpolate(charEntranceSpring, [0, 1], [400, 0]);
    const charEntranceOpacity = interpolate(charEntranceSpring, [0, 1], [0, 1]);

    // 1. NHỊP 1: 3 THẺ CÂU HỎI TRƯỢT VÀO SAU KHI DẪN CHUYỆN (Frames 165, 195, 225)
    const card1Spring = spring({
        frame: frame - 165,
        fps,
        config: { damping: 14, stiffness: 90 },
    });
    const card2Spring = spring({
        frame: frame - 195,
        fps,
        config: { damping: 14, stiffness: 90 },
    });
    const card3Spring = spring({
        frame: frame - 225,
        fps,
        config: { damping: 14, stiffness: 90 },
    });

    // Chuyển động thở của nhân vật
    const charBreathing = Math.sin(frame * 0.08) * 8;
    const charScale = 1 + Math.sin(frame * 0.06) * 0.015;

    // 2. NHỊP 2: Ý TƯỞNG EUREKA BÙNG SÁNG (Frames 480 - 690 ~ 8s - 11.5s)
    const eurekaFrame = frame - 480;
    const eurekaSpring = spring({
        frame: eurekaFrame,
        fps,
        config: { damping: 11, stiffness: 150 },
    });
    const starRotation = (frame * 2.5) % 360;

    // 3. NHỊP 3: CÚ BÚNG TAY SNAP! (Frames 690 - 840 ~ 11.5s - 14s)
    const snapFrame = frame - 690;
    const isSnap = snapFrame >= 0;

    const snapSpring = spring({
        frame: snapFrame,
        fps,
        config: { damping: 10, stiffness: 220 },
    });

    // Sóng năng lượng hồng mở rộng sau cú búng tay
    const shockwaveRadius = interpolate(snapFrame, [0, 50], [0, 3200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const shockwaveOpacity = interpolate(snapFrame, [0, 15, 50], [0.95, 0.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Thu nhỏ các thẻ câu hỏi và hook khi búng tay để nhường chỗ cho Cảnh 2
    const cardsExitScale = interpolate(snapFrame, [0, 30], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const hookExitOpacity = interpolate(snapFrame, [0, 20], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Chuyển tiếp trắng/hồng mềm sang Cảnh 2 (Frames 800 - 840)
    const fadeToScene2 = interpolate(frame, [800, 840], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                backgroundColor: colors.bgLight,
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            {/* CONTAINER 4K VIEWPORT CO GIÃN ĐỘNG (ĐẢM BẢO 1080P / 2K / 4K KHÔNG LỆCH) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: baseWidth,
                    height: baseHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                {/* 1. NỀN GIẤY PAPER-CRAFT (Radial Soft Pink & Dấu Chấm Bi Thủ Công) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 50% 40%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `radial-gradient(${colors.brandPink}22 2px, transparent 2px)`,
                        backgroundSize: '44px 44px',
                        opacity: 0.5,
                    }}
                />

                {/* 1.5. LỚP ĐỒI SÓNG GIẤY XANH MINT Ở ĐÁY MÀN HÌNH (LAYERED PAPER WAVE - CHUẨN PHỐI CẢNH CANVA STORYBOARD) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 3840,
                        height: 960,
                        pointerEvents: 'none',
                        zIndex: 1,
                        transform: `translateY(${waveEntranceY + waveFloatY}px)`,
                        filter: 'drop-shadow(0 -12px 28px rgba(16, 185, 129, 0.12))',
                    }}
                >
                    <svg width="3840" height="960" viewBox="0 0 3840 960" fill="none">
                        <defs>
                            {/* Gradient xanh mint pastel tươi sáng đặc trưng Canva */}
                            <linearGradient id="mintWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#C4EFE3" />
                                <stop offset="40%" stopColor="#B3EADB" />
                                <stop offset="75%" stopColor="#C6EFE4" />
                                <stop offset="100%" stopColor="#A8E4D3" />
                            </linearGradient>
                            <linearGradient id="mintWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#D8F7EE" stopOpacity="0.85" />
                                <stop offset="50%" stopColor="#C7F1E5" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#B6ECDE" stopOpacity="0.85" />
                            </linearGradient>
                        </defs>

                        {/* Lớp sóng giấy mint nền sau (Layer 2 - dâng nhẹ tạo nếp gấp giấy thủ công) */}
                        <path
                            d="M 0, 280 C 450, 290 900, 540 1480, 620 C 2050, 700 2600, 380 3150, 320 C 3500, 280 3720, 320 3840, 340 L 3840, 960 L 0, 960 Z"
                            fill="url(#mintWaveGrad2)"
                            transform={`translate(${waveLayer2FloatX * 0.7}, 0)`}
                        />

                        {/* Lớp sóng giấy mint chính tiền cảnh (Layer 1 - Mép trái đỡ Thẻ 3, trũng qua chân Hero, vểnh đỡ đế MacBook) */}
                        <path
                            d="M 0, 220 C 420, 230 880, 520 1520, 660 C 2100, 780 2650, 420 3180, 360 C 3520, 320 3740, 370 3840, 390 L 3840, 960 L 0, 960 Z"
                            fill="url(#mintWaveGrad1)"
                        />

                        {/* Đường viền nếp gấp giấy mỏng tạo cảm giác gập nếp thủ công tinh tế */}
                        <path
                            d="M 0, 220 C 420, 230 880, 520 1520, 660 C 2100, 780 2650, 420 3180, 360 C 3520, 320 3740, 370 3840, 390"
                            stroke="#8CE0CB"
                            strokeWidth="3.5"
                            fill="none"
                            opacity="0.6"
                        />
                    </svg>
                </div>

                {/* 3.5. DẢI CÁNH GIẤY GẤP NỔI KHỐI ORIGAMI PHÍA PHẢI (PAPER RIBBON WING - XUẤT HIỆN SAU KHI DẪN CHUYỆN LÊN ĐỈNH) */}
                {frame >= 150 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 100,
                            right: -60,
                            width: 1560,
                            height: 1730,
                            pointerEvents: 'none',
                            opacity: maybayOpacity,
                            transform: `translateX(${maybaySlideX}px) translateY(${Math.sin(frame * 0.05) * 6 + jitterY}px) scale(${maybayScale}) rotate(${Math.cos(frame * 0.03) * 0.6}deg)`,
                            filter: 'drop-shadow(-25px 35px 50px rgba(225, 29, 72, 0.22)) drop-shadow(-8px 12px 18px rgba(0,0,0,0.07))',
                            zIndex: 2,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen1/maybay_giay.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                )}

                {/* 3.8. CHIẾC LAPTOP MACBOOK TRẮNG MOCK UI (LƯỚT NHẸ VÀO TỪ PHẢI + 2.5D PERSPECTIVE) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 760,
                        left: 1720,
                        width: 1540,
                        height: 860,
                        pointerEvents: 'none',
                        opacity: laptopOpacity,
                        transform: `translateX(${laptopSlideX}px) translateY(${laptopFloatY + jitterY}px) rotate(${laptopTilt}deg) perspective(1400px) rotateY(${laptopRotateY}deg)`,
                        filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.12)) drop-shadow(0 8px 16px rgba(225, 29, 72, 0.06))',
                        zIndex: 3,
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen1/macbook_3.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>

                {/* 0. CỤM HOOK DẪN CHUYỆN: "Muốn mua bảo hiểm online," -> "NHƯNG..." (DOCKING LÊN ĐỈNH) */}
                {frame >= 10 && charCount > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: hookY,
                            left: '50%',
                            transform: `translateX(-50%) translateY(${buzzY}px) translateX(${buzzX}px) scale(${hookScale * cardsExitScale})`,
                            opacity: hookExitOpacity * hookEntranceOpacity,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 28,
                            zIndex: 10,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {/* Chữ Typewriter thanh thoát, sắc nét (không bọc trong chip/pill trắng rỗng gây chấm trắng ở frame đầu) */}
                        <span
                            style={{
                                fontSize: 68,
                                fontWeight: 800,
                                color: '#1E293B',
                                letterSpacing: '-0.5px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                textShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            {typedText}
                            {showCursor && (
                                <span
                                    style={{
                                        fontSize: 68,
                                        fontWeight: 900,
                                        color: colors.brandPink,
                                        marginLeft: 6,
                                    }}
                                >
                                    |
                                </span>
                            )}
                        </span>

                        {/* Tag nhãn "NHƯNG..." dập nổ phong cách Washi Tape đỏ hồng */}
                        {frame >= 72 && (
                            <div
                                style={{
                                    transform: `scale(${punchSpring}) rotate(${-3.5 + buzzRot}deg)`,
                                    backgroundColor: colors.brandPink,
                                    color: '#FFFFFF',
                                    padding: '16px 42px 18px',
                                    borderRadius: 18,
                                    fontSize: 68,
                                    fontWeight: 900,
                                    letterSpacing: '1.5px',
                                    boxShadow: '0 15px 35px rgba(225, 29, 72, 0.42)',
                                    border: '4px solid #FFFFFF',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                NHƯNG...
                            </div>
                        )}
                    </div>
                )}

                {/* 4. KHỐI TRUNG TÂM: MẢNH GHÉP NHÂN VẬT HERO CHỦ THỂ 2.5D ÁO HỒNG (CHUẨN TỶ LỆ 75% CHIỀU CAO KHUNG HÌNH) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 1540,
                        transform: `translateX(-50%) translateY(${charEntranceY + charBreathing + jitterY}px) scale(${charScale})`,
                        transformOrigin: 'bottom center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: charEntranceOpacity,
                        filter: 'drop-shadow(0 35px 50px rgba(0, 0, 0, 0.18)) drop-shadow(0 12px 25px rgba(225, 29, 72, 0.16))',
                        zIndex: 4,
                    }}
                >
                    {/* Container nhân vật Hero: Kích thước 1020 x 1650 khớp chuẩn độ phân giải gốc ảnh 972 x 1620 */}
                    <div
                        style={{
                            width: 1020,
                            height: 1650,
                            position: 'relative',
                        }}
                    >
                        {/* 1. Trạng thái Băn khoăn / Suy nghĩ (Frames 0 - 480) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: interpolate(frame, [475, 485], [1, 0], {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                }),
                                pointerEvents: 'none',
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen1/thinking.png')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>

                        {/* 2. Trạng thái Lóe sáng & Búng tay Snap (Frames 480+) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: interpolate(frame, [475, 485], [0, 1], {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                }),
                                pointerEvents: 'none',
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen1/anh2k.png')}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>

                        {/* Dấu chấm hỏi giấy xoay quanh đầu nhân vật khi đang phân vân (Frames 0 - 480) */}
                        {frame < 480 && (
                            <>
                                {/* <div
                                    style={{
                                        position: 'absolute',
                                        top: 140,
                                        left: 100,
                                        fontSize: 90,
                                        color: colors.brandPink,
                                        fontWeight: 900,
                                        transform: `rotate(${Math.sin(frame * 0.1) * 15}deg)`,
                                        filter: 'drop-shadow(0 4px 12px rgba(225, 29, 72, 0.35))',
                                    }}
                                >
                                    ❓
                                </div> */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 90,
                                        right: 180,
                                        fontSize: 80,
                                        color: colors.accentYellow,
                                        fontWeight: 900,
                                        transform: `rotate(${Math.cos(frame * 0.1) * 15}deg)`,
                                        filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.45))',
                                    }}
                                >
                                    💭
                                </div>
                            </>
                        )}

                        {/* BÓNG ĐÈN Ý TƯỞNG EUREKA BÙNG LÊN TRÊN ĐẦU (Frames 480+) - Khớp chuẩn đỉnh đường nét đứt chỉ tay */}
                        {frame >= 480 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -170,
                                    right: -80,
                                    width: 540,
                                    height: 540,
                                    transform: `scale(${eurekaSpring}) rotate(${Math.sin((frame - 480) * 0.08) * 3}deg)`,
                                    transformOrigin: 'bottom left',
                                    opacity: eurekaSpring,
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 25px 45px rgba(225, 29, 72, 0.45)) drop-shadow(0 6px 14px rgba(0,0,0,0.12))',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen1/idea.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        translate: '251.2px -72.2px',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 5. 3 MẢNH GIẤY XÉ GHI CHÚ BĂN KHOĂN THỦ CÔNG CHUẨN STORYBOARD CANVA (CỘT TRÁI) */}
                {/* THẺ 1: Chọn loại nào? (Ghim kẹp giấy hồng) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 260,
                        left: interpolate(card1Spring, [0, 1], [-800, 220]),
                        width: 580,
                        height: 390,
                        opacity: card1Spring,
                        transform: `scale(${cardsExitScale}) rotate(-5deg)`,
                        transition: 'transform 0.1s ease-out',
                        zIndex: 5,
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.09)) drop-shadow(0 4px 10px rgba(225, 29, 72, 0.06))',
                    }}
                >
                    {/* Nền giấy xé giay.png */}
                    <Img
                        src={staticFile('assets/elements/screen1/giay.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                        }}
                    />

                    {/* Ghim kẹp giấy hồng gym_giay.png */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -42,
                            left: 42,
                            width: 80,
                            height: 130,
                            transform: 'rotate(-8deg)',
                            zIndex: 2,
                            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen1/gym_giay.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Nội dung chữ: Mua ở đâu uy tín? */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '20px 40px 20px 110px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            textAlign: 'left',
                            color: colors.brandPink,
                            lineHeight: 1.12,
                            letterSpacing: '-1px',
                            transform: 'rotate(-4.2deg)',
                            transformOrigin: 'left center',
                            zIndex: 1,
                            marginLeft: 10,
                        }}
                    >
                        <span style={{ fontSize: 76, fontWeight: 900 }}>Mua ở đâu</span>
                        <span style={{ fontSize: 62, fontWeight: 800, marginTop: 8 }}>uy tín?</span>
                    </div>

                    {/* Dấu hỏi chấm to màu xanh navy đậm bên cạnh */}
                    <div
                        style={{
                            position: 'absolute',
                            right: -10,
                            top: 20,
                            fontSize: 150,
                            fontWeight: 900,
                            color: '#1E293B',
                            lineHeight: 1,
                            transform: `rotate(${Math.sin(frame * 0.08) * 8}deg)`,
                            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                            zIndex: 3,
                        }}
                    >
                        ?
                    </div>
                </div>

                {/* THẺ 2: Quyền lợi ra sao? (Băng keo hồng bangkeohong.png) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 680,
                        left: interpolate(card2Spring, [0, 1], [-800, 180]),
                        width: 600,
                        height: 400,
                        opacity: card2Spring,
                        transform: `scale(${cardsExitScale}) rotate(4deg)`,
                        transition: 'transform 0.1s ease-out',
                        zIndex: 5,
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.09)) drop-shadow(0 4px 10px rgba(225, 29, 72, 0.06))',
                    }}
                >
                    {/* Nền giấy xé giay.png */}
                    <Img
                        src={staticFile('assets/elements/screen1/giay.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                        }}
                    />

                    {/* Miếng băng dính washi tape hồng bangkeohong.png */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -32,
                            left: -20,
                            width: 170,
                            height: 114,
                            transform: 'rotate(-24deg)',
                            zIndex: 2,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen1/bangkeohong.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                translate: '-43.4px 48.2px',
                                rotate: '17.9deg',
                                scale: 1.062,
                            }}
                        />
                    </div>

                    {/* Nội dung chữ: Quyền lợi ra sao? */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '20px 40px 20px 110px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            textAlign: 'left',
                            color: '#1E293B',
                            lineHeight: 1.12,
                            letterSpacing: '-1px',
                            transform: 'rotate(-4.2deg)',
                            transformOrigin: 'left center',
                            zIndex: 1,
                            marginLeft: 50,
                        }}
                    >
                        <span style={{ fontSize: 70, fontWeight: 900 }}>Quyền lợi</span>
                        <span style={{ fontSize: 62, fontWeight: 800, marginTop: 12 }}>ra sao?</span>
                    </div>

                    {/* Dấu hỏi chấm to màu xanh navy đậm bên cạnh */}
                    <div
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 25,
                            fontSize: 150,
                            fontWeight: 900,
                            color: '#1E293B',
                            lineHeight: 1,
                            transform: `rotate(${Math.cos(frame * 0.08) * 8}deg)`,
                            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                            zIndex: 3,
                        }}
                    >
                        ?
                    </div>
                </div>

                {/* THẺ 3: Thủ tục có phức tạp không? (Băng keo xanh bangkeoxanh.png) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 1120,
                        left: interpolate(card3Spring, [0, 1], [-800, 240]),
                        width: 610,
                        height: 410,
                        opacity: card3Spring,
                        transform: `scale(${cardsExitScale}) rotate(-3deg)`,
                        transition: 'transform 0.1s ease-out',
                        zIndex: 5,
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.09)) drop-shadow(0 4px 10px rgba(225, 29, 72, 0.06))',
                    }}
                >
                    {/* Nền giấy xé giay.png */}
                    <Img
                        src={staticFile('assets/elements/screen1/giay.png')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                        }}
                    />

                    {/* Miếng băng dính washi tape xanh bangkeoxanh.png */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -26,
                            left: -28,
                            width: 190,
                            height: 94,
                            transform: 'rotate(-10deg)',
                            zIndex: 2,
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen1/bangkeoxanh.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                translate: '0.8px 42.7px',
                            }}
                        />
                    </div>

                    {/* Nội dung chữ: Thủ tục có phức tạp không? */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: '20px 40px 20px 110px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            textAlign: 'left',
                            color: colors.brandPink,
                            lineHeight: 1.12,
                            letterSpacing: '-1px',
                            transform: 'rotate(-4.2deg)',
                            transformOrigin: 'left center',
                            zIndex: 1,
                            paddingLeft: '60px',
                        }}
                    >
                        <span style={{ fontSize: 62, fontWeight: 900 }}>Thủ tục có</span>
                        <span style={{ fontSize: 62, fontWeight: 900, marginTop: 8 }}>phức tạp</span>
                        <span style={{ fontSize: 62, fontWeight: 900, marginTop: 8 }}>không?</span>
                    </div>

                    {/* Dấu hỏi chấm to màu hồng đỏ bên cạnh */}
                    <div
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 40,
                            fontSize: 150,
                            fontWeight: 900,
                            color: colors.brandPink,
                            lineHeight: 1,
                            transform: `rotate(${Math.sin(frame * 0.09 + 1) * 8}deg)`,
                            filter: 'drop-shadow(0 8px 16px rgba(225, 29, 72, 0.3))',
                            zIndex: 3,
                        }}
                    >
                        ?
                    </div>
                </div>

                {/* 7. HIỆU ỨNG BÚNG TAY SNAP! BÙNG NỔ SÓNG NĂNG LƯỢNG HỒNG (Frames 690 - 840) */}
                {isSnap && (
                    <>
                        {/* Vòng tròn sóng hồng bung tỏa toàn màn hình */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: shockwaveRadius,
                                height: shockwaveRadius,
                                borderRadius: '50%',
                                border: `12px solid ${colors.brandPink}`,
                                backgroundColor: `${colors.brandPink}18`,
                                opacity: shockwaveOpacity,
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Thẻ SNAP! BÚNG TAY ĐỂ BẮT ĐẦU */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '28%',
                                left: '50%',
                                transform: `translate(-50%, -50%) scale(${snapSpring})`,
                                backgroundColor: colors.brandPink,
                                color: colors.bgWhite,
                                padding: '28px 72px',
                                borderRadius: 40,
                                boxShadow: '0 30px 80px rgba(225, 29, 72, 0.55), 0 10px 25px rgba(0,0,0,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 28,
                                border: `5px solid ${colors.bgWhite}`,
                                zIndex: 20,
                                pointerEvents: 'none',
                            }}
                        >
                            <span style={{ fontSize: 72 }}>✨</span>
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontSize: 60,
                                        fontWeight: 900,
                                        letterSpacing: '-1.5px',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    BÚNG TAY ĐỂ BẮT ĐẦU!
                                </div>
                                <div
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 700,
                                        letterSpacing: '3px',
                                        opacity: 0.95,
                                        textTransform: 'uppercase',
                                        marginTop: 8,
                                    }}
                                >
                                    TOPbaohiem.vn
                                </div>
                            </div>
                            <span style={{ fontSize: 72 }}>🤌</span>
                        </div>
                    </>
                )}

                {/* 8. MÀN CHUYỂN TIẾP TRẮNG/HỒNG SANG CẢNH 2 */}
                {fadeToScene2 > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: colors.bgLight,
                            opacity: fadeToScene2,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </div>
        </div>
    );
};
