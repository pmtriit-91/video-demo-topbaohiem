import React from 'react';
import { interpolate, spring, staticFile, Img, Easing } from 'remotion';

interface TopLeftWebsiteBackdrop3DProps {
    frame: number;
    fps: number;
    startFrame?: number; // Frame 652: Xuất hiện đồng thời cùng thanh Search Bar ngay sau cú búng tay Eureka (Frame 630)
}

export const TopLeftWebsiteBackdrop3D: React.FC<TopLeftWebsiteBackdrop3DProps> = ({ frame, fps, startFrame = 652 }) => {
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
                perspective: 2800,
                perspectiveOrigin: '20% 25%', // Góc nhìn từ trên cao phía trước bên trái nhìn xuống
                pointerEvents: 'none',
                zIndex: 10, // Lớp layout trang chủ có zIndex nhỏ hơn nhóm input (luôn nằm dưới)
            }}
        >
            {/* CONTAINER BẢNG 3D NEO SÁT GÓC TOP-LEFT, GÓC NGHIÊNG CỐ ĐỊNH CHUẨN THEO ẢNH 3 */}
            <div
                style={{
                    position: 'absolute',
                    top: 200,
                    left: -540, // Neo chuẩn xác để Logo TOPbaohiem hiển thị trọn vẹn tại góc trên-trái (X ~ 130px, Y ~ 45px), không bị khuất và không lấn vào giữa
                    width: 2280,
                    height: 1420,
                    transformOrigin: '0% 0%',
                    // GÓC PHỐI CẢNH 3D CHUẨN XÁC THEO ẢNH 3:
                    // - rotateX(43deg): ngả nằm trên mặt phẳng không gian giống tablet / slab trên bàn
                    // - rotateY(-12deg): cạnh phải lùi sâu vào chiều xa
                    // - rotateZ(-10deg): cạnh trên dốc nhẹ hướng lên trên sang phải (~16°), cạnh trái dốc xuống dưới sang phải (~75°)
                    transform: `translate3d(${flyInX}px, ${flyInY}px, 0) rotateX(43deg) rotateY(-2deg) rotateZ(-20deg)`,
                    transformStyle: 'preserve-3d',
                    opacity: totalOpacity,
                }}
            >
                {/* KHUNG THIẾT BỊ MOCKUP KÍNH BO GÓC TRẮNG SANG TRỌNG (NHƯ ẢNH 3) */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: 44,
                        overflow: 'hidden',
                        backgroundColor: '#FFFFFF',
                        border: '4.5px solid rgba(255, 255, 255, 0.98)',
                        boxShadow:
                            '0 3px 0 #FFFFFF, 0 7px 0 #F1F5F9, 0 12px 0 #E2E8F0, 0 16px 0 #CBD5E1, 0 20px 0 #94A3B8, 0 45px 120px rgba(15, 23, 42, 0.22), 0 16px 45px rgba(225, 29, 72, 0.10), inset 0 3px 8px rgba(255, 255, 255, 1)',
                        // MẶT NẠ GRADIENT MỜ DẦN VỀ TÂM:
                        // Sát góc Top-Left rõ nét chuẩn 4K, tan biến êm dịu sớm hơn khi chạm tới vùng giữa màn hình
                        maskImage:
                            'linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.90) 25%, rgba(0, 0, 0, 0.28) 48%, rgba(0, 0, 0, 0) 66%)',
                        WebkitMaskImage:
                            'linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.90) 25%, rgba(0, 0, 0, 0.28) 48%, rgba(0, 0, 0, 0) 66%)',
                    }}
                >
                    {/* HÌNH ẢNH TRANG CHỦ ĐƯỢC PHÓNG TO RÕ RÀNG (ZOOM-IN ĐẶC TẢ CHI TIẾT ĐẦU TRANG) */}
                    {/* Chiều rộng tăng lên 3200px để Logo, Menu, Slogan và các Card to rõ, sắc nét chuẩn 4K */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 3200,
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
                            height: 140,
                            background:
                                'linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 100%)',
                            pointerEvents: 'none',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
