import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Macbook3DView } from './Macbook3DView';

export const TestMacbookComp: React.FC = () => {
    const frame = useCurrentFrame();

    // 110 frames (0 đến 109) tương ứng tiến trình mở nắp từ 0 độ (đóng kín) đến 90 độ (thẳng đứng eye-level)
    const openAngle = interpolate(frame, [0, 109], [0, 90], {
        easing: Easing.bezier(0.35, 0.15, 0.35, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const cameraProgress = interpolate(frame, [0, 109], [0, 1], {
        easing: Easing.bezier(0.35, 0.15, 0.35, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Macbook3DView
                width={3456}
                height={1824}
                openAngle={openAngle}
                cameraProgress={cameraProgress}
            />
        </div>
    );
};
