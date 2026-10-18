export interface SceneTimeline {
    start: number;
    duration: number;
    name: string;
}

export const VIDEO_CONFIG_V2 = {
    fps: 60,
    totalFrames: 11400, // 3 phút 10 giây @ 60fps (đã dãn trải thư thái cho Cảnh 1)
    durationInSeconds: 190,

    // 6 Hồi Kịch Bản Chuẩn Theo Storyboard Canva
    scenes: {
        // 0:00 - 0:34 (34.0s | 2040 frames): Băn khoăn trước ma trận giấy -> Ý tưởng lóe sáng -> Cú búng tay Snap! -> Showcase 3D có nhịp thở
        scene1_problem_snap: {
            start: 0,
            duration: 2040,
            name: 'Cảnh 1: Băn khoăn -> Búng tay Snap! (3D Deep Showcase)',
        },
        // 0:34 - 1:03 (29s | 1740 frames): TOPbaohiem xuất hiện trên Laptop & Mobile, khám phá danh mục
        scene2_showcase: {
            start: 2040,
            duration: 1740,
            name: 'Cảnh 2: Trình diễn TOPbaohiem Laptop & Mobile',
        },
        // 1:03 - 1:23 (20s | 1200 frames): Tiểu cảnh Bảo hiểm Du lịch (Cặp đôi kéo vali, sóng giấy, phao vịt)
        scene3_travel: {
            start: 3780,
            duration: 1200,
            name: 'Cảnh 3: Tiểu cảnh Bảo hiểm Du lịch Paper-Cut',
        },
        // 1:23 - 1:59 (36s | 2160 frames): Các nhóm sản phẩm: Xe cộ, Sức khỏe, Tài sản/Nhà cửa
        scene4_categories: {
            start: 4980,
            duration: 2160,
            name: 'Cảnh 4: Các nhóm sản phẩm Xe cộ, Sức khỏe, Nhà cửa',
        },
        // 1:59 - 2:45 (46s | 2760 frames): Hành trình mua 1-chạm (4 bước) -> Cú búng tay lật mặt sau sang CMS Dashboard Dark Mode
        scene5_purchase_cms: {
            start: 7140,
            duration: 2760,
            name: 'Cảnh 5: Hành trình mua 1-chạm & CMS Dashboard',
        },
        // 2:45 - 3:10 (25s | 1500 frames): Hệ sinh thái toàn diện + Nhân vật tự tin + Logo TOPbaohiem & CTA
        scene6_outro_cta: {
            start: 9900,
            duration: 1500,
            name: 'Cảnh 6: Hệ sinh thái trọn gói & Kêu gọi hành động',
        },
    },

    // Hệ màu chuẩn Phong cách 2 (Thương hiệu Hồng TOPbaohiem, Nền sáng Paper Cut & Gradient trang nhã)
    colors: {
        brandPink: '#ED037C', //"#E11D48",        // Hồng thương hiệu chính
        brandPinkDeep: '#ED037C', //"#BE123C",    // Hồng đậm nhấn viền
        brandPinkLight: '#FFE4E6', // Hồng pastel nền giấy
        brandPinkSoft: '#FFF1F2', // Hồng siêu mềm
        bgLight: '#FAF9F6', // Nền giấy Paper-cut cao cấp (warm off-white)
        bgWhite: '#FFFFFF',
        bgCard: '#FFFFFF',
        cardBorder: '#F3E8FF',
        textPrimary: '#0F172A', // Chữ đen đậm sắc nét
        textSecondary: '#475569', // Chữ xám phụ đề
        textMuted: '#94A3B8',
        accentYellow: '#FBBF24', // Ngôi sao ý tưởng / Phao vịt
        accentCyan: '#06B6D4', // Biển / Sóng giấy
        accentEmerald: '#10B981', // Tick thành công / Giảm giá
        // Riêng CMS phân đoạn Cảnh 5
        cmsDarkBg: '#0B0F19',
        cmsCardBg: '#111827',
        cmsBorder: '#1F2937',
    },
};
