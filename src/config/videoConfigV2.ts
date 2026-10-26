export interface SceneTimeline {
    start: number;
    duration: number;
    name: string;
}

export const VIDEO_CONFIG_V2 = {
    fps: 60,
    totalFrames: 11950, // 3 phút 19 giây @ 60fps (khớp khít điểm chuyển giao Cảnh 1 -> Cảnh 2 tại F1930)
    durationInSeconds: 199,

    // 6 Hồi Kịch Bản Chuẩn Theo Storyboard Canva
    scenes: {
        // 0:00 - 0:32 (32.17s | 1930 frames): Băn khoăn -> Búng tay Snap! -> 3 Thẻ chủ lực -> Click "Truy cập" -> Warp Portal
        scene1_problem_snap: {
            start: 0,
            duration: 1930,
            name: 'Cảnh 1: Băn khoăn -> Búng tay Snap! (3D Deep Showcase)',
        },
        // 0:32 - 1:12 (40.0s | 2400 frames): TOPbaohiem xuất hiện trên Laptop & Mobile, cuộn trang & Đại cảnh 3D mổ xẻ
        scene2_showcase: {
            start: 1930,
            duration: 2400,
            name: 'Cảnh 2: Trình diễn TOPbaohiem Laptop & Mobile',
        },
        // 1:12 - 1:32 (20s | 1200 frames): Tiểu cảnh Bảo hiểm Du lịch (Cặp đôi kéo vali, sóng giấy, phao vịt)
        scene3_travel: {
            start: 4330,
            duration: 1200,
            name: 'Cảnh 3: Tiểu cảnh Bảo hiểm Du lịch Paper-Cut',
        },
        // 1:32 - 2:08 (36s | 2160 frames): Các nhóm sản phẩm: Xe cộ, Sức khỏe, Tài sản/Nhà cửa
        scene4_categories: {
            start: 5530,
            duration: 2160,
            name: 'Cảnh 4: Các nhóm sản phẩm Xe cộ, Sức khỏe, Nhà cửa',
        },
        // 2:08 - 2:54 (46s | 2760 frames): Hành trình mua 1-chạm (4 bước) -> Cú búng tay lật mặt sau sang CMS Dashboard Dark Mode
        scene5_purchase_cms: {
            start: 7690,
            duration: 2760,
            name: 'Cảnh 5: Hành trình mua 1-chạm & CMS Dashboard',
        },
        // 2:54 - 3:19 (25s | 1500 frames): Hệ sinh thái toàn diện + Nhân vật tự tin + Logo TOPbaohiem & CTA
        scene6_outro_cta: {
            start: 10450,
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
