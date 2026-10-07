import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Macbook3DView } from './Macbook3DView';

export const TestMacbookComp: React.FC = () => {
    const frame = useCurrentFrame();

    // 60 frames (0 đến 59) tương ứng timeline frame 51 -> 110 trong Scene1Hook
    // Easing cubic bezier hoàn hảo: bắt trớn 0.42 deg/frame, lướt mở êm ái và đáp nhẹ 90 độ đúng frame 59
    const openAngle = interpolate(frame, [0, 59], [28.3, 90], {
        easing: Easing.bezier(0.4, 0.15, 0.45, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const cameraProgress = interpolate(frame, [0, 59], [0, 1], {
        easing: Easing.bezier(0.4, 0.15, 0.45, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000000',
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
