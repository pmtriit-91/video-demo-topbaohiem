import React from 'react';
import { Composition } from 'remotion';

// Hàm tạo SVG Thought Cloud
export const ThoughtCloudSVG: React.FC<{
    w: number;
    h: number;
    tail: 'spotlight' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    s: number;
}> = ({ w, h, tail, s }) => {
    // Path đám mây chuẩn hóa 800 x 500
    const cloudD = `
        M 220,120
        C 240,45 360,45 405,95
        C 440,35 530,35 570,85
        C 615,40 705,65 725,130
        C 785,155 805,245 765,305
        C 800,365 745,440 670,430
        C 625,475 530,480 480,435
        C 430,480 335,470 295,420
        C 230,455 145,415 145,345
        C 75,295 85,200 145,155
        C 155,100 205,85 220,120
        Z
    `.replace(/\s+/g, ' ').trim();

    // Tọa độ 3 bong bóng suy nghĩ tùy theo hướng đuôi
    let dots = [
        { cx: 620, cy: 460, r: 28 },
        { cx: 680, cy: 510, r: 18 },
        { cx: 720, cy: 545, r: 11 },
    ];

    if (tail === 'top-left') {
        // Đuôi hướng sang phải xuống dưới (vào nhân vật)
        dots = [
            { cx: 640, cy: 450, r: 28 },
            { cx: 700, cy: 495, r: 18 },
            { cx: 745, cy: 530, r: 11 },
        ];
    } else if (tail === 'top-right') {
        // Đuôi hướng sang trái xuống dưới (vào nhân vật)
        dots = [
            { cx: 240, cy: 450, r: 28 },
            { cx: 180, cy: 495, r: 18 },
            { cx: 135, cy: 530, r: 11 },
        ];
    } else if (tail === 'bottom-left') {
        // Đuôi hướng sang phải lên trên (vào nhân vật)
        dots = [
            { cx: 640, cy: 80, r: 28 },
            { cx: 700, cy: 35, r: 18 },
            { cx: 745, cy: 0, r: 11 },
        ];
    } else if (tail === 'bottom-right') {
        // Đuôi hướng sang trái lên trên (vào nhân vật)
        dots = [
            { cx: 240, cy: 80, r: 28 },
            { cx: 180, cy: 35, r: 18 },
            { cx: 135, cy: 0, r: 11 },
        ];
    } else {
        // Spotlight: Đuôi hướng chúc xuống dưới tâm
        dots = [
            { cx: 340, cy: 465, r: 28 },
            { cx: 325, cy: 515, r: 18 },
            { cx: 315, cy: 550, r: 11 },
        ];
    }

    return (
        <svg
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none',
            }}
            viewBox="0 0 850 560"
        >
            {/* Lớp bóng đổ Comic Pop-Art (Offset Shadow màu đen đặc trưng 100% y hệt ảnh mẫu) */}
            <g transform="translate(10, 14)">
                <path d={cloudD} fill="#0f172a" opacity={0.9} />
                {dots.map((d, i) => (
                    <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#0f172a" opacity={0.9} />
                ))}
            </g>

            {/* Thân đám mây chính màu trắng viền đen */}
            <path
                d={cloudD}
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth={10 * s}
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* Vệt chuyển động comic (Action arcs) */}
            <path
                d="M 230,65 C 280,45 330,55 355,70"
                fill="none"
                stroke="#0f172a"
                strokeWidth={5 * s}
                strokeLinecap="round"
            />
            <path
                d="M 140,360 C 120,385 135,410 160,420"
                fill="none"
                stroke="#0f172a"
                strokeWidth={5 * s}
                strokeLinecap="round"
            />

            {/* Chuỗi bong bóng suy nghĩ trắng viền đen */}
            {dots.map((d, i) => (
                <circle
                    key={i}
                    cx={d.cx}
                    cy={d.cy}
                    r={d.r}
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth={8 * s}
                />
            ))}
        </svg>
    );
};
