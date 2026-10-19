import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { interpolate, Easing } from 'remotion';

interface VortexSwirl3DProps {
    frame: number;
    width: number;
    height: number;
    // Bắt đầu tạo vòng xoáy sau nhịp dừng búng tay (mặc định Frame 370)
    vortexStartFrame?: number;
    // Điểm hội tụ cực đại ở tâm (mặc định Frame 395)
    vortexSwirlFrame?: number;
    // Điểm bung nổ ly tâm ra 4 góc và tan biến (mặc định Frame 415)
    vortexBurstFrame?: number;
}

/**
 * VortexSwirl3D: Hiệu ứng vòng xoáy 3D ma thuật bằng Three.js (100% Deterministic rendering).
 * - Giai đoạn 1: Hút các luồng hạt năng lượng xoắn ốc (logarithmic spiral) từ ngoài vào tâm màn hình.
 * - Giai đoạn 2: Bùng nổ ly tâm cực mạnh bắn các tia năng lượng ra 4 góc màn hình.
 * - Giải phóng tài nguyên WebGL ngay khi hoàn tất.
 */
export const VortexSwirl3D: React.FC<VortexSwirl3DProps> = ({
    frame,
    width,
    height,
    vortexStartFrame = 370,
    vortexSwirlFrame = 395,
    vortexBurstFrame = 415,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const particlesRef = useRef<THREE.Points | null>(null);
    const ringRef = useRef<THREE.Line | null>(null);

    // Tính độ mờ tổng thể (chỉ xuất hiện trong khoảng thời gian diễn ra vòng xoáy)
    const isVisible = frame >= vortexStartFrame && frame <= vortexBurstFrame + 2;
    const vortexOpacity = interpolate(
        frame,
        [vortexStartFrame, vortexStartFrame + 6, vortexBurstFrame - 4, vortexBurstFrame],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Tiến trình hút vào tâm (Phase 1: 0 -> 1)
    const pullProgress = interpolate(
        frame,
        [vortexStartFrame, vortexSwirlFrame],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.35, 0, 0.25, 1),
        }
    );

    // Tiến trình bung nổ ra các góc (Phase 2: 0 -> 1)
    const burstProgress = interpolate(
        frame,
        [vortexSwirlFrame, vortexBurstFrame],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.15, 0.85, 0.35, 1),
        }
    );

    // Khởi tạo Three.js Scene, Camera và Geometry cố định
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(55, width / height, 1, 5000);
        camera.position.z = 1200;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        rendererRef.current = renderer;

        // Hàm ngẫu nhiên giả lập hạt cố định seed (Deterministic Mulberry32)
        const mulberry32 = (seed: number) => {
            let t = (seed += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };

        // 1. Tạo 480 hạt năng lượng photon (Vortex Energy Particles)
        const PARTICLE_COUNT = 480;
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const customData = new Float32Array(PARTICLE_COUNT * 4); // [initialRadius, initialAngle, spiralSpeed, zOffset]

        const colorPink = new THREE.Color('#ED037C');
        const colorAmber = new THREE.Color('#FBBF24');
        const colorWhite = new THREE.Color('#FFFFFF');

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const r1 = mulberry32(7000 + i * 4 + 1);
            const r2 = mulberry32(7000 + i * 4 + 2);
            const r3 = mulberry32(7000 + i * 4 + 3);
            const r4 = mulberry32(7000 + i * 4 + 4);

            const initialRadius = 350 + r1 * 1450;
            const initialAngle = r2 * Math.PI * 2;
            const spiralSpeed = 5.0 + r3 * 7.0;
            const zOffset = (r4 - 0.5) * 450;

            customData[i * 4] = initialRadius;
            customData[i * 4 + 1] = initialAngle;
            customData[i * 4 + 2] = spiralSpeed;
            customData[i * 4 + 3] = zOffset;

            // Phân bổ màu sắc: 55% Hồng thương hiệu, 30% Vàng kim, 15% Trắng phát quang
            const col = r4 > 0.45 ? colorPink : r4 > 0.15 ? colorAmber : colorWhite;
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('customData', new THREE.BufferAttribute(customData, 4));

        // Material phát quang điểm
        const mat = new THREE.PointsMaterial({
            size: 16,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const points = new THREE.Points(geo, mat);
        scene.add(points);
        particlesRef.current = points;

        // 2. Tạo vòng sóng năng lượng elip xoắn ở tâm (Vortex Center Ring)
        const RING_POINTS = 180;
        const ringPos = new Float32Array(RING_POINTS * 3);
        for (let j = 0; j < RING_POINTS; j++) {
            const theta = (j / RING_POINTS) * Math.PI * 2;
            ringPos[j * 3] = Math.cos(theta) * 180;
            ringPos[j * 3 + 1] = Math.sin(theta) * 180;
            ringPos[j * 3 + 2] = 0;
        }
        const ringGeo = new THREE.BufferGeometry();
        ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
        const ringMat = new THREE.LineBasicMaterial({
            color: '#ED037C',
            transparent: true,
            opacity: 0.75,
            linewidth: 3,
            blending: THREE.AdditiveBlending,
        });
        const ringLine = new THREE.LineLoop(ringGeo, ringMat);
        scene.add(ringLine);
        ringRef.current = ringLine;

        return () => {
            renderer.forceContextLoss();
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
        };
    }, [width, height]);

    // RENDER DETERMINISTIC CHUẨN XÁC TỪNG FRAME
    useEffect(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        if (!particlesRef.current || !ringRef.current) return;

        const points = particlesRef.current;
        const ring = ringRef.current;
        const posAttr = points.geometry.attributes.position;
        const customData = points.geometry.attributes.customData.array as Float32Array;
        const pos = posAttr.array as Float32Array;
        const count = customData.length / 4;

        if (burstProgress > 0) {
            // ==========================================
            // GIAI ĐOẠN 2: BÙNG NỔ LY TÂM RA 4 GÓC (BURST)
            // ==========================================
            for (let i = 0; i < count; i++) {
                const initialAngle = customData[i * 4 + 1];
                const spiralSpeed = customData[i * 4 + 2];
                const zOffset = customData[i * 4 + 3];

                // Bắn ly tâm từ tâm (r: 60px -> 2600px)
                const currentRadius = 60 + Math.pow(burstProgress, 1.4) * 2600;
                // Góc xoay tiếp tục xoáy nhẹ khi văng
                const angle = initialAngle + spiralSpeed * Math.PI + burstProgress * 2.5;

                pos[i * 3] = Math.cos(angle) * currentRadius;
                pos[i * 3 + 1] = Math.sin(angle) * currentRadius;
                pos[i * 3 + 2] = zOffset * (1 - burstProgress) + burstProgress * 600;
            }

            // Vòng sóng bung to và mờ dần
            const ringScale = 1 + burstProgress * 6.5;
            ring.scale.set(ringScale, ringScale, 1);
            ring.rotation.z = 18 + burstProgress * 8;
            (ring.material as THREE.LineBasicMaterial).opacity = Math.max(0, 1 - burstProgress * 1.5);
        } else {
            // ==========================================
            // GIAI ĐOẠN 1: HÚT XOẮN ỐC VÀO TÂM (INWARD PULL)
            // ==========================================
            for (let i = 0; i < count; i++) {
                const initialRadius = customData[i * 4];
                const initialAngle = customData[i * 4 + 1];
                const spiralSpeed = customData[i * 4 + 2];
                const zOffset = customData[i * 4 + 3];

                // Bán kính co dần về tâm (r: initialRadius -> 60px)
                const currentRadius = initialRadius * (1 - Math.pow(pullProgress, 1.3)) + 60;
                // Góc xoay gia tốc xoáy nhanh
                const angle = initialAngle + pullProgress * spiralSpeed * Math.PI;

                pos[i * 3] = Math.cos(angle) * currentRadius;
                pos[i * 3 + 1] = Math.sin(angle) * currentRadius;
                pos[i * 3 + 2] = zOffset * (1 - pullProgress * 0.7);
            }

            // Vòng sóng co nhỏ dần và xoay tít ở tâm
            const ringScale = Math.max(0.15, 1 - pullProgress * 0.75);
            ring.scale.set(ringScale, ringScale, 1);
            ring.rotation.z = pullProgress * 18;
            (ring.material as THREE.LineBasicMaterial).opacity = Math.min(0.9, pullProgress * 1.4);
        }

        posAttr.needsUpdate = true;
        rendererRef.current.render(sceneRef.current, cameraRef.current);
    }, [frame, pullProgress, burstProgress]);

    if (!isVisible || vortexOpacity <= 0.001) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width,
                height,
                opacity: vortexOpacity,
                pointerEvents: 'none',
                zIndex: 35,
            }}
        />
    );
};
