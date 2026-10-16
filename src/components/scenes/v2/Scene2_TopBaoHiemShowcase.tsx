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

                {/* 1. MÀN HÌNH NỘI DUNG RETINA NẰM BÊN TRONG CỬA SỔ TRONG SUỐT CỦA MACBOOK */}
                <div
                    style={{
                        position: 'absolute',
                        top: '4.86%',
                        left: '10.0%',
                        width: '87.5%',
                        height: '74.8%',
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* HEADER TRANG WEB TOPBAOHIEM (MÀU HỒNG THƯƠNG HIỆU) */}
                    <div
                        style={{
                            height: 84,
                            backgroundColor: colors.brandPink,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 40px',
                            flexShrink: 0,
                        }}
                    >
                        {/* Logo trắng */}
                        <div
                            style={{
                                fontSize: 34,
                                fontWeight: 900,
                                color: '#FFFFFF',
                                letterSpacing: '-0.5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <span>🛡️</span>
                            <span>TOPbaohiem</span>
                        </div>

                        {/* Menu điều hướng */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 32,
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#FFFFFF',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span>Mua bảo hiểm</span>
                                <span style={{ fontSize: 16 }}>→</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span>Ưu đãi</span>
                                <span style={{ fontSize: 16 }}>→</span>
                            </div>
                            <div>Bồi thường</div>
                        </div>

                        {/* Avatar & Phân quyền quản lý */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                                padding: '8px 18px',
                                borderRadius: 999,
                                fontSize: 18,
                                fontWeight: 700,
                                color: '#FFFFFF',
                            }}
                        >
                            <span>👤 A. Quản lý</span>
                            <span style={{ color: '#FDE047' }}>⭐</span>
                        </div>
                    </div>

                    {/* PHẦN THÂN TRANG CHỦ MÀN HÌNH MACBOOK */}
                    <div
                        style={{
                            flex: 1,
                            padding: '26px 48px',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            backgroundColor: '#FAF9F6',
                        }}
                    >
                        {/* Dải chứng nhận Bộ Công Thương */}
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                backgroundColor: '#FFF1F2',
                                border: '1.5px solid #FFE4E6',
                                padding: '6px 20px',
                                borderRadius: 999,
                                fontSize: 16,
                                fontWeight: 800,
                                color: colors.brandPink,
                                alignSelf: 'flex-start',
                                marginBottom: 10,
                            }}
                        >
                            <span>🛡️</span>
                            <span>NỀN TẢNG UY TÍN ĐÃ ĐƯỢC XÁC NHẬN BỞI BỘ CÔNG THƯƠNG</span>
                        </div>

                        {/* Tiêu đề chính trang web */}
                        <div
                            style={{
                                fontSize: 50,
                                fontWeight: 900,
                                color: '#0F172A',
                                letterSpacing: '-1px',
                                lineHeight: 1.15,
                            }}
                        >
                            So sánh <span style={{ color: colors.brandPink }}>bảo hiểm</span>,
                            <br />
                            chọn TOPbaohiem!
                        </div>

                        {/* 3 Badges trụ cột giá trị */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 22,
                                marginTop: 16,
                                marginBottom: 24,
                            }}
                        >
                            {[
                                { title: 'So sánh dễ dàng', desc: 'Minh bạch, nhanh chóng', icon: '⚡' },
                                { title: 'Tiết kiệm chi phí', desc: 'Tối ưu quyền lợi', icon: '💰' },
                                { title: 'An toàn bảo mật', desc: 'Bảo vệ dữ liệu cá nhân', icon: '🛡️' },
                            ].map((badge, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        backgroundColor: '#FFFFFF',
                                        border: '1.5px solid #E2E8F0',
                                        borderRadius: 14,
                                        padding: '8px 18px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                                    }}
                                >
                                    <span style={{ fontSize: 22 }}>{badge.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                                            {badge.title}
                                        </div>
                                        <div style={{ fontSize: 13, color: '#64748B' }}>{badge.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* KHAY 5 THẺ BẢO HIỂM CHỦ LỰC NẰM TRONG MÀN HÌNH */}
                        <div style={{ display: 'flex', gap: 18, marginTop: 4 }}>
                            {/* Thẻ 1: Sức khỏe (yte.png) */}
                            <div
                                style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 20,
                                    border: '2px solid #FFF1F2',
                                    padding: '16px 14px',
                                    boxShadow: '0 8px 20px rgba(225, 29, 72, 0.06)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: -10,
                                        right: 14,
                                        backgroundColor: colors.brandPink,
                                        color: '#FFFFFF',
                                        fontSize: 11,
                                        fontWeight: 800,
                                        padding: '2px 8px',
                                        borderRadius: 99,
                                    }}
                                >
                                    Nổi bật
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Bảo hiểm</div>
                                <div
                                    style={{ fontSize: 16, fontWeight: 600, color: colors.brandPink, marginBottom: 8 }}
                                >
                                    Sức khỏe
                                </div>
                                <div style={{ width: 70, height: 70, margin: '6px 0' }}>
                                    <Img
                                        src={staticFile('assets/elements/screen2/yte.png')}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: colors.brandPink,
                                        border: `1.5px solid ${colors.brandPink}`,
                                        borderRadius: 999,
                                        padding: '4px 14px',
                                    }}
                                >
                                    So sánh ngay →
                                </div>
                            </div>

                            {/* Thẻ 2: Cháy nổ (home.png) */}
                            <div
                                style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 20,
                                    border: '2px solid #E2E8F0',
                                    padding: '16px 14px',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Bảo hiểm</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                                    Cháy nổ
                                </div>
                                <div style={{ width: 70, height: 70, margin: '6px 0' }}>
                                    <Img
                                        src={staticFile('assets/elements/screen2/home.png')}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: colors.brandPink,
                                        border: `1.5px solid ${colors.brandPink}`,
                                        borderRadius: 999,
                                        padding: '4px 14px',
                                    }}
                                >
                                    So sánh ngay →
                                </div>
                            </div>

                            {/* Thẻ 3: Du lịch (dulich.png) */}
                            <div
                                style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 20,
                                    border: '2px solid #E2E8F0',
                                    padding: '16px 14px',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Bảo hiểm</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                                    Du lịch
                                </div>
                                <div style={{ width: 70, height: 70, margin: '6px 0' }}>
                                    <Img
                                        src={staticFile('assets/elements/screen2/dulich.png')}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: colors.brandPink,
                                        border: `1.5px solid ${colors.brandPink}`,
                                        borderRadius: 999,
                                        padding: '4px 14px',
                                    }}
                                >
                                    So sánh ngay →
                                </div>
                            </div>

                            {/* Thẻ 4: TNDS Xe máy (xemay.png) */}
                            <div
                                style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 20,
                                    border: '2px solid #E2E8F0',
                                    padding: '16px 14px',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Bảo hiểm</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                                    TNDS Xe máy
                                </div>
                                <div style={{ width: 70, height: 70, margin: '6px 0' }}>
                                    <Img
                                        src={staticFile('assets/elements/screen2/xemay.png')}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: colors.brandPink,
                                        border: `1.5px solid ${colors.brandPink}`,
                                        borderRadius: 999,
                                        padding: '4px 14px',
                                    }}
                                >
                                    So sánh ngay →
                                </div>
                            </div>

                            {/* Thẻ 5: TNDS Ô tô (oto.png) */}
                            <div
                                style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 20,
                                    border: '2px solid #E2E8F0',
                                    padding: '16px 14px',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Bảo hiểm</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                                    TNDS Ô tô
                                </div>
                                <div style={{ width: 70, height: 70, margin: '6px 0' }}>
                                    <Img
                                        src={staticFile('assets/elements/screen2/oto.png')}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        fontWeight: 800,
                                        color: colors.brandPink,
                                        border: `1.5px solid ${colors.brandPink}`,
                                        borderRadius: 999,
                                        padding: '4px 14px',
                                    }}
                                >
                                    So sánh ngay →
                                </div>
                            </div>
                        </div>

                        {/* Chiếc khiên lớn nổi khối bên phải màn hình (khien.png) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 40,
                                right: 40,
                                width: 220,
                                height: 220,
                                filter: 'drop-shadow(0 12px 25px rgba(225, 29, 72, 0.22))',
                                transform: `translateY(${floatY * 0.7}px) rotate(4deg)`,
                            }}
                        >
                            <Img
                                src={staticFile('assets/elements/screen2/khien.png')}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. VỎ KHUNG MACBOOK PHỦ NGOÀI CÙNG (CỬA SỔ TRONG SUỐT) */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
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
                    top: 680,
                    right: 220,
                    width: 520,
                    height: 1040,
                    transform: `translateY(${floatAltY}px)`,
                    zIndex: 8,
                }}
            >
                {/* Bóng tiếp xúc đáy điện thoại */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -15,
                        left: '15%',
                        width: '70%',
                        height: 35,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(15, 23, 42, 0.14)',
                        filter: 'blur(15px)',
                    }}
                />

                {/* Khung iPhone hiển thị trang mobile (trangchu-mobile.png) - 100% sắc nét */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.16))',
                    }}
                >
                    <Img
                        src={staticFile('assets/elements/screen2/trangchu-mobile.png')}
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
