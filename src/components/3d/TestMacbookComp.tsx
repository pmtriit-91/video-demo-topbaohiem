import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Macbook3DView } from './Macbook3DView';

export const TestMacbookComp: React.FC = () => {
    const frame = useCurrentFrame();

    // 33 frames (0 đến 32) mở mượt mà từ 29 độ (nối tiếp frame 78 Apple) lên 90 độ
    // Easing cubic bezier tự nhiên như bản lề kim loại Apple
    const openAngle = interpolate(frame, [0, 32], [29, 90], {
        easing: Easing.bezier(0.42, 0, 0.25, 1),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const cameraProgress = interpolate(frame, [0, 32], [0, 1], {
        easing: Easing.bezier(0.42, 0, 0.25, 1),
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
