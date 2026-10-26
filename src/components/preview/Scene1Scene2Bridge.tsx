import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { FontLoader } from '../FontLoader';
import { VIDEO_CONFIG_V2 } from '../../config/videoConfigV2';
import { Scene1_ProblemSnap } from '../scenes/v2/Scene1_ProblemSnap';
import { Scene2_TopBaoHiemShowcase } from '../scenes/v2/Scene2_TopBaoHiemShowcase';

/**
 * 🎬 COMPONENT KIỂM THỬ ĐIỂM NỐI CHUYỂN CẢNH (SCENE 1 -> SCENE 2 BRIDGE)
 * 
 * Timeline 450 frames (~7.5s @ 60fps):
 * - Frame 0 -> 150 (F1780 -> F1930 của Cảnh 1):
 *   Chuột dừng tại nút "Truy cập" -> Click nút -> Warp Speed Lines & Portal Flash bùng nổ.
 * - Frame 150 (Điểm chuyển giao Handoff):
 *   Chớp sáng trắng hồng Portal Flash đạt đỉnh 100%.
 * - Frame 150 -> 450 (F0 -> F300 của Cảnh 2):
 *   Ánh sáng dịu dần -> Bàn tay áo hồng lướt vào lấy đà -> BÚNG TAY SNAP! -> 5 thẻ bài bung xòe -> Dải sóng mint đón MacBook.
 */
export const Scene1Scene2Bridge: React.FC = () => {
    const { width, height } = useVideoConfig();
    const colors = VIDEO_CONFIG_V2.colors;

    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                backgroundColor: colors.bgLight,
                overflow: 'hidden',
            }}
        >
            <FontLoader />

            {/* 1. Đoạn cuối Cảnh 1 (150 frames: F1780 -> F1930) */}
            <Sequence from={-1780} durationInFrames={1930} name="Scene 1 (Transition Out)">
                <Scene1_ProblemSnap />
            </Sequence>

            {/* 2. Đoạn đầu Cảnh 2 (300 frames: F0 -> F300) */}
            <Sequence from={150} durationInFrames={300} name="Scene 2 (Transition In & Snap)">
                <Scene2_TopBaoHiemShowcase />
            </Sequence>
        </div>
    );
};
