import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { interpolate, Easing } from 'remotion';

interface WarpHyperdrive3DProps {
    frame: number;
    width: number;
    height: number;
    // Điểm bắt đầu kích hoạt chuyển cảnh Hyperdrive Warp (Frame 1105 - Click)
    warpStartFrame?: number;
    // Điểm kết thúc chuyển cảnh sang Cảnh 2 (Frame 1150)
    warpEndFrame?: number;
}

export const WarpHyperdrive3D: React.FC<WarpHyperdrive3DProps> = ({
    frame,
    width,
    height,
    warpStartFrame = 1105,
    warpEndFrame = 1150,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const streaksRef = useRef<THREE.LineSegments | null>(null);

    // Tính toán tiến độ Hyperdrive Warp [0 -> 1]
    const warpProgress = interpolate(
        frame,
        [warpStartFrame, warpEndFrame],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.5, 0, 0.8, 0.4),
        }
    );

    // Độ mờ tổng thể của layer Three.js: CHỈ xuất hiện khi bắt đầu Warp chuyển cảnh (không có chấm bi rải rác)
    const warpDuration = Math.max(10, warpEndFrame - warpStartFrame);
    const midWarp1 = warpStartFrame + warpDuration * 0.35;
    const midWarp2 = warpStartFrame + warpDuration * 0.75;
    const ambientOpacity = interpolate(
        frame,
        [warpStartFrame, midWarp1, midWarp2, warpEndFrame],
        [0, 1, 0.95, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Khởi tạo Scene, Camera, Laser Streaks một lần duy nhất
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // 1. Scene & Camera
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 4000);
        camera.position.z = 1000;
        cameraRef.current = camera;

        // 2. Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        rendererRef.current = renderer;

        // Hàm tạo số ngẫu nhiên giả lập có seed cố định (Deterministic pseudo-random - quy chuẩn video-shotcraft)
        const mulberry32 = (seed: number) => {
            let t = (seed += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };

        // 3. Khởi tạo 320 tia sáng xuyên tâm tốc độ cao (Warp Speed Streak Lines)
        const STREAK_COUNT = 320;
        const streakPositions = new Float32Array(STREAK_COUNT * 2 * 3);
        const streakColors = new Float32Array(STREAK_COUNT * 2 * 3);

        const colorPink = new THREE.Color('#ED017C');
        const colorWhite = new THREE.Color('#FFFFFF');

        for (let i = 0; i < STREAK_COUNT; i++) {
            const s1 = mulberry32(5000 + i * 4 + 1);
            const s2 = mulberry32(5000 + i * 4 + 2);
            const s3 = mulberry32(5000 + i * 4 + 3);
            const s4 = mulberry32(5000 + i * 4 + 4);

            const radius = 150 + s1 * 1400;
            const theta = s2 * Math.PI * 2;
            const zStart = (s3 - 0.5) * 2000;

            const x = Math.cos(theta) * radius;
            const y = Math.sin(theta) * radius;

            // Điểm đầu của tia
            streakPositions[i * 6] = x;
            streakPositions[i * 6 + 1] = y;
            streakPositions[i * 6 + 2] = zStart;

            // Điểm đuôi của tia kéo dài theo trục Z
            streakPositions[i * 6 + 3] = x * 1.05;
            streakPositions[i * 6 + 4] = y * 1.05;
            streakPositions[i * 6 + 5] = zStart - 180;

            const col = s4 > 0.4 ? colorPink : colorWhite;
            streakColors[i * 6] = col.r;
            streakColors[i * 6 + 1] = col.g;
            streakColors[i * 6 + 2] = col.b;
            streakColors[i * 6 + 3] = col.r * 0.3;
            streakColors[i * 6 + 4] = col.g * 0.3;
            streakColors[i * 6 + 5] = col.b * 0.3;
        }

        const streakGeo = new THREE.BufferGeometry();
        streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3));
        streakGeo.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));

        const streakMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const streaks = new THREE.LineSegments(streakGeo, streakMat);
        scene.add(streaks);
        streaksRef.current = streaks;

        return () => {
            renderer.forceContextLoss();
            renderer.dispose();
            streakGeo.dispose();
            streakMat.dispose();
        };
    }, [width, height]);

    // RENDER DETERMINISTIC THEO TỪNG FRAME CỦA REMOTION
    useEffect(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

        const camera = cameraRef.current;
        const streaks = streaksRef.current;

        // Vận tốc và chuyển động không gian 3D
        if (warpProgress <= 0.001) {
            if (streaks) {
                (streaks.material as THREE.LineBasicMaterial).opacity = 0;
            }
        } else {
            // GIAI ĐOẠN HYPERDRIVE WARP: CAMERA LAO VÚT XUYÊN KHÔNG GIAN 3D
            const speed = Math.pow(warpProgress, 2.2) * 240 + 8;
            camera.position.z = 1000 - warpProgress * 2200;
            // Camera xoay nhẹ tạo cảm giác phi thuyền gia tốc
            camera.rotation.z = warpProgress * 0.35;

            // Hướng tâm hội tụ về phía nút "Truy cập" ở bên phải màn hình
            camera.position.x = warpProgress * 350;
            camera.position.y = -warpProgress * 60;

            if (streaks) {
                const streakMat = streaks.material as THREE.LineBasicMaterial;
                streakMat.opacity = Math.min(1, warpProgress * 2.2);

                const streakPos = streaks.geometry.attributes.position.array as Float32Array;
                const streakLength = 80 + warpProgress * 650; // Kéo dài vệt sáng theo tốc độ
                for (let i = 0; i < streakPos.length / 6; i++) {
                    streakPos[i * 6 + 2] += speed * 1.4;
                    streakPos[i * 6 + 5] = streakPos[i * 6 + 2] - streakLength;

                    if (streakPos[i * 6 + 2] > camera.position.z + 200) {
                        streakPos[i * 6 + 2] = camera.position.z - 2400;
                        streakPos[i * 6 + 5] = streakPos[i * 6 + 2] - streakLength;
                    }
                }
                streaks.geometry.attributes.position.needsUpdate = true;
            }
        }

        rendererRef.current.render(sceneRef.current, camera);
    }, [frame, warpProgress]);

    if (ambientOpacity <= 0.001) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width,
                height,
                opacity: ambientOpacity,
                pointerEvents: 'none',
                zIndex: 36,
            }}
        />
    );
};
