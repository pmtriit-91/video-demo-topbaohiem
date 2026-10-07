import React from 'react';
import { staticFile, Img } from 'remotion';
import { MacbookStandbyScreen } from './MacbookStandbyScreen';

export const Laptop90Standalone: React.FC = () => {
    return (
        <div
            style={{
                position: 'relative',
                width: 2200,
                height: 1340,
                backgroundColor: 'transparent',
            }}
        >
            {/* Lớp màn hình chuẩn theo kích thước 2200x1340 */}
            <div
                style={{
                    position: 'absolute',
                    left: 224,
                    top: 40,
                    width: 1752,
                    height: 1136,
                    overflow: 'hidden',
                    backgroundColor: '#f8fafc',
                    borderRadius: '18px 18px 0 0',
                    zIndex: 2,
                }}
            >
                <MacbookStandbyScreen
                    frame={0}
                    startFrame={0}
                    wakeProgress={0}
                    screenW={1752}
                    screenH={1136}
                />
            </div>

            {/* Khung vỏ MacBook Pro 90 độ Apple chính hãng */}
            <Img
                src={staticFile('assets/macbook_open/macbook_front_90_transparent.png')}
                alt="MacBook Pro Front 90"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />
        </div>
    );
};
