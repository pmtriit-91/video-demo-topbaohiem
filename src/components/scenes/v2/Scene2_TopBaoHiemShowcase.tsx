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
                    top: 80,
                    left: 140,
                    zIndex: 10,
                }}
            >
                {/* Tiêu đề thương hiệu lớn */}
                <div
                    style={{
                        fontSize: 104,
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
                        fontSize: 42,
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
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
                    {/* Thẻ 1: Khiên */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            width: 145,
                            height: 165,
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
                            src={staticFile('assets/elements/screen2/khien.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Thẻ 2: Nhà cửa */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 30,
                            left: 145,
                            width: 145,
                            height: 165,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 22,
                            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.10)',
                            border: '3px solid #FFF1F2',
                            transform: 'rotate(6deg)',
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

                    {/* Thẻ 3: Ô tô */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 135,
                            left: 55,
                            width: 145,
                            height: 165,
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
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Thẻ 4: Du lịch */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 145,
                            left: 175,
                            width: 145,
                            height: 165,
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
                            src={staticFile('assets/elements/screen2/dulich.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* 4. Badge "Tìm hiểu dễ dàng" kèm icon kính lúp 3D */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 120,
                        left: 420,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        backgroundColor: '#FFFFFF',
                        padding: '16px 36px 16px 20px',
                        borderRadius: 999,
                        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.08)',
                        border: '2px solid #E2E8F0',
                    }}
                >
                    {/* Icon kính lúp 3D (kinh-lup.png) */}
                    <div style={{ width: 70, height: 70, flexShrink: 0 }}>
                        <Img
                            src={staticFile('assets/elements/screen2/kinh-lup.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: 34,
                            fontWeight: 800,
                            color: colors.brandPink,
                            letterSpacing: '-0.5px',
                            lineHeight: 1.15,
                        }}
                    >
                        Tìm hiểu
                        <br />
                        dễ dàng
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* C. TRUNG TÂM: CHIẾC LAPTOP MACBOOK 3D & GIAO DIỆN TRANG CHỦ */}
            {/* ============================================================== */}
            <div
                style={{
                    position: 'absolute',
                    top: 190,
                    left: 1240,
                    width: 2020,
                    height: 1360,
                    zIndex: 5,
                }}
            >
                {/* Bóng tiếp xúc mặt bàn của MacBook */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 45,
                        left: '8%',
                        width: '84%',
                        height: 70,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(15, 23, 42, 0.12)',
                        filter: 'blur(25px)',
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
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>

            {/* ============================================================== */}
            {/* D. PHÍA PHẢI: CHIẾC IPHONE ĐỒNG HÀNH & KHIÊN 3D TIỀN CẢNH */}
            {/* ============================================================== */}
            <div
                style={{
                    position: 'absolute',
                    top: 640,
                    right: 210,
                    width: 680,
                    height: 1020,
                    transform: `translateY(${floatAltY}px)`,
                    zIndex: 8,
                }}
            >
                {/* Bóng tiếp xúc đáy điện thoại */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -10,
                        left: '12%',
                        width: '76%',
                        height: 38,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(15, 23, 42, 0.14)',
                        filter: 'blur(16px)',
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
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>

                {/* Chiếc khiên hồng 3D đặt nổi bật trước chân iPhone (khien.png) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -20,
                        left: -80,
                        width: 220,
                        height: 220,
                        zIndex: 10,
                        filter: 'drop-shadow(0 12px 28px rgba(225, 29, 72, 0.30))',
                        transform: `translateY(${floatY}px)`,
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/khien.png')}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
};
