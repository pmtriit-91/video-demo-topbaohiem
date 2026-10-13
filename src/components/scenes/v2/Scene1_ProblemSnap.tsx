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

    // 0. HIỆU ỨNG DẢI SÓNG GIẤY XANH MINT Ở ĐÁY (Entrance cuộn dâng lên & sóng gợn nhẹ)
    const waveEntrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 70 },
    });
    const waveEntranceY = interpolate(waveEntrance, [0, 1], [300, 0]);
    const waveFloatY = Math.sin(frame * 0.04) * 8;
    const waveLayer2FloatX = Math.cos(frame * 0.03) * 15;

    // 0.5. HIỆU ỨNG LAPTOP MACBOOK MOCK UI (Lướt nhẹ từ phải vào + Xoay 3D nhẹ)
    const laptopEntrance = spring({
        frame: frame - 25,
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

    // 1. NHỊP 1: 3 THẺ CÂU HỎI TRƯỢT VÀO LỆCH NHỊP (Frames 0 - 480 ~ 0s - 8s)
    const card1Spring = spring({
        frame: frame - 15,
        fps,
        config: { damping: 14, stiffness: 90 },
    });
    const card2Spring = spring({
        frame: frame - 45,
        fps,
        config: { damping: 14, stiffness: 90 },
    });
    const card3Spring = spring({
        frame: frame - 75,
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

    // Thu nhỏ các thẻ câu hỏi khi búng tay để nhường chỗ cho Cảnh 2
    const cardsExitScale = interpolate(snapFrame, [0, 30], [1, 0], {
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

                {/* 1.5. LỚP ĐỒI SÓNG GIẤY XANH MINT Ở ĐÁY MÀN HÌNH (LAYERED PAPER WAVE - ENTRANCE DÂNG LÊN & GỢN SÓNG) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 3840,
                        height: 380,
                        pointerEvents: 'none',
                        zIndex: 1,
                        transform: `translateY(${waveEntranceY + waveFloatY}px)`,
                        filter: 'drop-shadow(0 -10px 25px rgba(16, 185, 129, 0.08))',
                    }}
                >
                    <svg width="3840" height="380" viewBox="0 0 3840 380" fill="none">
                        <path
                            d="M0,180 C800,90 1400,280 2400,200 C3100,140 3600,260 3840,240 L3840,380 L0,380 Z"
                            fill="#E2F7F2"
                        />
                        <path
                            d="M0,260 C600,190 1200,320 2000,270 C2800,220 3400,310 3840,290 L3840,380 L0,380 Z"
                            fill="#D1F2EA"
                            opacity="0.6"
                            transform={`translate(${waveLayer2FloatX}, 0)`}
                        />
                    </svg>
                </div>

                {/* 3.5. DẢI CÁNH GIẤY GẤP NỔI KHỐI ORIGAMI PHÍA PHẢI (PAPER RIBBON WING) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 100,
                        right: -60,
                        width: 1560,
                        height: 1730,
                        pointerEvents: 'none',
                        transform: `translateY(${Math.sin(frame * 0.05) * 6 + jitterY}px) rotate(${Math.cos(frame * 0.03) * 0.6}deg)`,
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

                {/* 4. KHỐI TRUNG TÂM: MẢNH GHÉP NHÂN VẬT 2.5D ÁO HỒNG TÁCH RỜI */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 80,
                        left: 1500,
                        transform: `translateX(-50%) translateY(${charBreathing + jitterY}px) scale(${charScale})`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        filter: 'drop-shadow(0 30px 45px rgba(225, 29, 72, 0.22)) drop-shadow(0 10px 20px rgba(0,0,0,0.06))',
                        zIndex: 4,
                    }}
                >
                    {/* Hình ảnh nhân vật chính áo hồng */}
                    <div
                        style={{
                            width: 760,
                            height: 1140,
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
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 100,
                                        left: 80,
                                        fontSize: 72,
                                        color: colors.brandPink,
                                        fontWeight: 900,
                                        transform: `rotate(${Math.sin(frame * 0.1) * 15}deg)`,
                                        filter: 'drop-shadow(0 4px 10px rgba(225, 29, 72, 0.3))',
                                    }}
                                >
                                    ❓
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 60,
                                        right: 120,
                                        fontSize: 64,
                                        color: colors.accentYellow,
                                        fontWeight: 900,
                                        transform: `rotate(${Math.cos(frame * 0.1) * 15}deg)`,
                                        filter: 'drop-shadow(0 4px 10px rgba(251, 191, 36, 0.4))',
                                    }}
                                >
                                    💭
                                </div>
                            </>
                        )}

                        {/* BÓNG ĐÈN Ý TƯỞNG EUREKA BÙNG LÊN TRÊN ĐẦU (Frames 480+) */}
                        {frame >= 480 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -90,
                                    right: 60,
                                    width: 340,
                                    height: 340,
                                    transform: `scale(${eurekaSpring}) rotate(${Math.sin((frame - 480) * 0.08) * 3}deg)`,
                                    transformOrigin: 'bottom left',
                                    opacity: eurekaSpring,
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 20px 35px rgba(225, 29, 72, 0.4)) drop-shadow(0 4px 10px rgba(0,0,0,0.08))',
                                }}
                            >
                                <Img
                                    src={staticFile('assets/elements/screen1/idea.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
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

                    {/* Nội dung chữ: Chọn hãng nào? */}
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
                            marginLeft: 60,
                        }}
                    >
                        <span style={{ fontSize: 76, fontWeight: 900 }}>Chọn</span>
                        <span style={{ fontSize: 62, fontWeight: 800, marginTop: 8 }}>hãng nào?</span>
                    </div>

                    {/* Dấu hỏi chấm to màu xanh navy đậm bên cạnh */}
                    <div
                        style={{
                            position: 'absolute',
                            right: 10,
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

                {/* 6. BANNER PHỤ ĐỀ VOICE-OVER CHUẨN THEO KỊCH BẢN (CHÂN MÀN HÌNH) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(12px)',
                            color: colors.bgWhite,
                            padding: '16px 48px',
                            borderRadius: 99,
                            fontSize: 28,
                            fontWeight: 700,
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            maxWidth: 1600,
                            textAlign: 'center',
                        }}
                    >
                        {frame < 480
                            ? '“Mình muốn mua bảo hiểm, nhưng chưa biết nên chọn loại nào. Càng tìm hiểu càng dễ bị rối...”'
                            : frame < 690
                              ? '“Khoan! Mình có thể bắt đầu đơn giản hơn với TOPbaohiem.”'
                              : '“BÚNG TAY ĐỂ BẮT ĐẦU — TOPBAOHIEM.VN!”'}
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
