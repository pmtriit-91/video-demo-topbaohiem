import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, staticFile, Img } from 'remotion';
import { VIDEO_CONFIG_V2 } from '../../../config/videoConfigV2';

export const Scene2_TopBaoHiemShowcase: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    // Nhịp bồng bềnh nhẹ nhàng tự nhiên (Floating micro-motion)
    const floatY = Math.sin(frame * 0.05) * 6;
    const floatAltY = Math.cos(frame * 0.04) * 5;

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                // Nền sáng trong trẻo, sắc nét tuyệt đối chuẩn Canva gốc (không dùng gradient mờ sương)
                backgroundColor: '#F8FAFC',
                overflow: 'hidden',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            {/* ============================================================== */}
            {/* A. HEADER GÓC TRÊN TRÁI: NHÃN PHÂN CẢNH & THƯƠNG HIỆU TOPBAOHIEM */}
            {/* ============================================================== */}
            <div
                style={{
                    position: 'absolute',
                    top: 180,
                    left: 170,
                    zIndex: 10,
                }}
            >
                {/* Tiêu đề thương hiệu lớn */}
                <div
                    style={{
                        fontSize: 200,
                        fontWeight: 900,
                        color: colors.brandPink,
                        letterSpacing: '-2px',
                        lineHeight: 1.05,
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}
                >
                    TOPbaohiem
                </div>

                {/* Slogan mô tả phụ */}
                <div
                    style={{
                        fontSize: 78,
                        fontWeight: 600,
                        color: '#334155',
                        marginTop: 16,
                        letterSpacing: '-0.5px',
                    }}
                >
                    Website bán bảo hiểm trực tuyến
                </div>
            </div>

            {/* ============================================================== */}
            {/* B. TIỀN CẢNH BÊN TRÁI: BÀN TAY BÚNG TAY SNAP! & CỤM 4 THẺ BÀI */}
            {/* ============================================================== */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 60,
                    width: 820,
                    height: 1420,
                    zIndex: 15,
                    pointerEvents: 'none',
                }}
            >
                {/* 1. Bàn tay áo hồng búng tay (bungtay.png) - 100% sắc nét */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -40,
                        left: 20,
                        width: 580,
                        height: 1140,
                        filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.14))',
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/bungtay.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '-80px -103.3px',
                        }}
                    />

                    {/* Tia năng lượng búng tay (Sparkles) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 130,
                            right: 60,
                            fontSize: 52,
                            transform: `rotate(${frame * 1.5}deg)`,
                        }}
                    >
                        ✨
                    </div>
                </div>

                {/* 2. Cụm 4 Thẻ bài nhỏ xòe ra hình cánh quạt cạnh ngón tay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 250,
                        left: 360,
                        width: 340,
                        height: 340,
                        transform: `translateY(${floatAltY}px)`,
                    }}
                >
                    {/* Thẻ 1: Y tế */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -310,
                            left: 100,
                            width: 285,
                            height: 305,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 22,
                            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.10)',
                            border: '3px solid #FFF1F2',
                            transform: 'rotate(-12deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 14,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/yte.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Thẻ 2: Nhà cửa */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -355,
                            left: 375,
                            width: 285,
                            height: 305,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 22,
                            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.10)',
                            border: '3px solid #FFF1F2',
                            transform: 'rotate(0deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 14,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/home.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Thẻ 2: Nhà cửa */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -315,
                            left: 655,
                            width: 285,
                            height: 305,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 22,
                            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.10)',
                            border: '3px solid #FFF1F2',
                            transform: 'rotate(18deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 14,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/dulich.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Thẻ 3: Ô tô */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 35,
                            left: 225,
                            width: 285,
                            height: 305,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 22,
                            boxShadow: '0 14px 30px rgba(0, 0, 0, 0.11)',
                            border: '3px solid #FFF1F2',
                            transform: 'rotate(-4deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 14,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/oto.png')}
                            style={{ width: '120%', height: '120%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Thẻ 4: Du lịch */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 45,
                            left: 545,
                            width: 285,
                            height: 305,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 22,
                            boxShadow: '0 14px 30px rgba(0, 0, 0, 0.11)',
                            border: '3px solid #FFF1F2',
                            transform: 'rotate(14deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 14,
                        }}
                    >
                        <Img
                            src={staticFile('assets/elements/screen2/xemay.png')}
                            style={{ width: '120%', height: '120%', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* 3. Mũi tên cong màu hồng uốn lượn sang màn hình laptop (arrow.png) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 490,
                        left: 570,
                        width: 730,
                        height: 245,
                        transform: `translateY(${floatY * 0.5}px)`,
                        filter: 'drop-shadow(0 10px 20px rgba(225, 29, 72, 0.20))',
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/arrow.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '118.3px 29.4px',
                        }}
                    />
                </div>

                {/* 4. Badge "Tìm hiểu dễ dàng" kèm icon kính lúp 3D */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 350,
                        left: 650,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        backgroundColor: '#FFFFFF',
                        padding: '16px 36px 16px 20px',
                        borderRadius: 999,
                        boxShadow: '0 14px 36px rgba(223, 63, 116, 0.08)',
                        border: `2px solid ${colors.brandPink}`,
                        width: 610,
                    }}
                >
                    {/* Icon kính lúp 3D (kinh-lup.png) */}
                    <div style={{ width: 200, height: 200, flexShrink: 0 }}>
                        <Img
                            src={staticFile('assets/elements/screen2/kinh-lup.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            fontSize: 64,
                            fontWeight: 800,
                            letterSpacing: '-0.5px',
                            lineHeight: 1.35,
                        }}
                    >
                        <span style={{ color: colors.brandPink }}>Tìm hiểu</span>
                        <span style={{ color: '#2B121E' }}>dễ dàng</span>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* C. TRUNG TÂM: CHIẾC LAPTOP MACBOOK 3D & GIAO DIỆN TRANG CHỦ */}
            {/* ============================================================== */}
            <div
                style={{
                    position: 'absolute',
                    top: 160,
                    left: 1120,
                    width: 2626,
                    height: 1768,
                    zIndex: 5,
                }}
            >
                {/* Bóng tiếp xúc mặt bàn của MacBook */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 55,
                        left: '8%',
                        width: '84%',
                        height: 90,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(15, 23, 42, 0.12)',
                        filter: 'blur(30px)',
                        transform: 'scaleY(0.4)',
                    }}
                />

                {/* 1. LAYER MÀN HÌNH (BÊN DƯỚI): MẶT TIỀN TRANG CHỦ QUANG HỌC BIẾN DẠNG 4K */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/homepage-screen-warped.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '-412.9px 116.2px',
                            scale: 0.951,
                        }}
                    />
                </div>

                {/* 2. LAYER VỎ KHUNG (BÊN TRÊN): MACBOOK NGUYÊN BẢN TÁCH NỀN CỦA BẠN */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.12))',
                        pointerEvents: 'none',
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/macbook.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            translate: '-405.8px 116.3px',
                        }}
                    />
                </div>
            </div>

            {/* ============================================================== */}
            {/* D. PHÍA PHẢI: CHIẾC IPHONE ĐỒNG HÀNH & KHIÊN 3D TIỀN CẢNH */}
            {/* ============================================================== */}
            <div
                style={{
                    position: 'absolute',
                    top: 660,
                    right: 140,
                    width: 884,
                    height: 1326,
                    transform: `translateY(${floatAltY}px)`,
                    zIndex: 8,
                }}
            >
                {/* Bóng tiếp xúc đáy điện thoại */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -15,
                        left: '12%',
                        width: '76%',
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(15, 23, 42, 0.14)',
                        filter: 'blur(20px)',
                        transform: 'scaleY(0.4)',
                    }}
                />

                {/* 1. LAYER MÀN HÌNH IPHONE (BÊN DƯỚI): TRANG CHỦ MOBILE QUANG HỌC 4K RETINA */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/iphone-screen-warped.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            rotate: '3.1deg',
                            translate: '102.4px 55.3px',
                        }}
                    />
                </div>

                {/* 2. LAYER VỎ KHUNG IPHONE 3D (BÊN TRÊN): KHUNG MÁY NGUYÊN BẢN FIGMA IPHONE_3 */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.16))',
                        pointerEvents: 'none',
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/iphone_3.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            rotate: '3.1deg',
                            translate: '102.4px 69.4px',
                        }}
                    />
                </div>

                {/* Chiếc khiên hồng 3D đặt nổi bật trước chân iPhone (khien.png) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -25,
                        left: -100,
                        width: 450,
                        height: 450,
                        zIndex: 10,
                        filter: 'drop-shadow(0 14px 32px rgba(225, 29, 72, 0.32))',
                        transform: `translateY(${floatY}px)`,
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/khien.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            scale: 1.506,
                            translate: '-68.3px 7.9px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
