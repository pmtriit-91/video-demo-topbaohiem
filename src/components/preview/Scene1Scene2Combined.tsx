import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { FontLoader } from '../FontLoader';
import { VIDEO_CONFIG_V2 } from '../../config/videoConfigV2';
import { Scene1_ProblemSnap } from '../scenes/v2/Scene1_ProblemSnap';
import { Scene2_TopBaoHiemShowcase } from '../scenes/v2/Scene2_TopBaoHiemShowcase';

/**
 * 🌟 COMPONENT XEM LIỀN MẠCH TRỌN VẸN CẢNH 1 VÀ CẢNH 2
 * 
 * Tổng thời lượng: 4330 frames (~72.17s @ 60fps)
 * - Cảnh 1 (0 -> 1930 frames | 32.17s): Toàn bộ câu chuyện Băn khoăn -> Búng tay -> 3 Thẻ -> Click Warp Portal
 * - Cảnh 2 (1930 -> 4330 frames | 40.0s): Toàn bộ Cảnh 2 (Búng tay Snap -> 5 Thẻ -> MacBook trực diện -> 5 Chặng tour -> Exploded View 3D -> Crash Zoom Vali)
 */
export const Scene1Scene2Combined: React.FC = () => {
    const { width, height } = useVideoConfig();
    const scenes = VIDEO_CONFIG_V2.scenes;
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

            {/* CẢNH 1: Băn khoăn -> 3 Thẻ -> Click Truy cập */}
            <Sequence
                from={scenes.scene1_problem_snap.start}
                durationInFrames={scenes.scene1_problem_snap.duration}
                name={scenes.scene1_problem_snap.name}
            >
                <Scene1_ProblemSnap />
            </Sequence>

            {/* CẢNH 2: Trình diễn TOPbaohiem Laptop & Mobile */}
            <Sequence
                from={scenes.scene2_showcase.start}
                durationInFrames={scenes.scene2_showcase.duration}
                name={scenes.scene2_showcase.name}
            >
                <Scene2_TopBaoHiemShowcase />
            </Sequence>
        </div>
    );
};
