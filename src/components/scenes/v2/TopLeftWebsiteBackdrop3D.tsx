import React from 'react';
import { interpolate, spring, staticFile, Img, Easing } from 'remotion';

interface TopLeftWebsiteBackdrop3DProps {
    frame: number;
    fps: number;
    startFrame?: number; // Frame 725: Xuất hiện đồng thời cùng thanh Search Bar sau nhịp dừng 1.5s chiêm ngưỡng búng tay Eureka (Frame 630 -> 720)
}

export const TopLeftWebsiteBackdrop3D: React.FC<TopLeftWebsiteBackdrop3DProps> = ({ frame, fps, startFrame = 725 }) => {
    // 1. CHỈ HIỂN THỊ TỪ FRAME STARTFRAME TRỞ ĐI
    if (frame < startFrame) {
        return null;
    }

    // 2. HIỆU ỨNG XUẤT HIỆN ĐỒNG THỜI VỚI SEARCH BAR (Spring Entrance)
    const entranceProgress = spring({
        frame: frame - startFrame,
        fps,
        config: { damping: 18, mass: 0.85, stiffness: 90 },
    });

    // 3. MỜ DẦN KHI LAO VÀO CỔNG CHUYỂN CẢNH WARP (Frames 1955 -> 2010)
    const warpExitOpacity = interpolate(frame, [1955, 2010], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const totalOpacity = entranceProgress * warpExitOpacity;
    if (totalOpacity <= 0.001) {
        return null;
    }

    // 4. TRƯỢT NHẸ VÀO VỊ TRÍ PHỐI CẢNH (Fly-in nhẹ nhàng êm ái có quán tính)
    const flyInX = interpolate(entranceProgress, [0, 1], [-80, 0]);
    const flyInY = interpolate(entranceProgress, [0, 1], [-60, 0]);

    // 5. HIỆU ỨNG TRƯỢT TRANG CHẬM RÃI ĐẶC TẢ PHẦN ĐẦU TRANG CHỦ (Slow Continuous Page Glide)
    // - Bắt đầu show trọn vẹn Header hồng và Logo TOPbaohiem sắc nét ngay từ vị trí đầu
    // - Trượt êm ái với tốc độ cực kỳ chậm rãi từ 0px đến -320px trong suốt gần 1400 frames (23 giây)
    const scrollY = interpolate(frame, [startFrame, 2040], [0, -320], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 3840,
                height: 2160,
                perspective: 3200,
                perspectiveOrigin: '35% 35%', // Góc nhìn phối cảnh 3D điện ảnh từ trên cao chếch xuống
                pointerEvents: 'none',
                zIndex: 10, // Nằm dưới nhóm input & dropdown (zIndex: 50)
                overflow: 'hidden',
            }}
        >
            {/* CONTAINER BẢNG 3D PHỦ TOÀN BỘ KHUNG HÌNH (GÓC NGHIÊNG CỐ ĐỊNH CHUẨN ẢNH 3, KHÔNG BỊ CẮT XÉN) */}
            <div
                style={{
                    position: 'absolute',
                    top: -1000,
                    left: -1050,
                    width: 6200,
                    height: 4800,
                    transformOrigin: '2200px 1400px',
                    // GÓC PHỐI CẢNH 3D CHUẨN XÁC THEO ẢNH 3:
                    // Dãn trải bao phủ toàn bộ 4 cạnh màn hình 3840x2160, không để lộ viền mép hay cắt xén
                    transform: `translate3d(${flyInX}px, ${flyInY}px, -350px) rotateX(24deg) rotateY(-3deg) rotateZ(-15deg)`,
                    opacity: totalOpacity,
                    backgroundColor: '#FFFFFF',
                    overflow: 'hidden',
                }}
            >
                {/* HÌNH ẢNH TRANG CHỦ ĐƯỢC PHÓNG TO RÕ RÀNG (FULL CHIỀU RỘNG, KHÔNG BỊ CẮT XÉN NỘI DUNG) */}
                {/* Hiển thị trọn vẹn từ Logo TOPbaohiem, Menu, Slogan đến nhóm Card và Banner gia đình/bác sĩ bên phải */}
                <div
                    style={{
                        position: 'absolute',
                        top: 500,
                        left: 150,
                        width: 5200,
                        height: 3800,
                        overflow: 'hidden',
                        transform: `translateY(${scrollY}px)`,
                        transformOrigin: 'top left',
                    }}
                >
                    <Img
                        src={staticFile('assets/trangchu/fullsize-trangchu.png')}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                    />
                </div>

                {/* VỆT QUÉT SÁNG QUANG HỌC KÍNH (GLAZE ACCENT) NHẸ Ở VIỀN TRÊN */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 220,
                        background:
                            'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 100%)',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    );
};
