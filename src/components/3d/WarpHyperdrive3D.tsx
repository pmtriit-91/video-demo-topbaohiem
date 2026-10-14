import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { interpolate, Easing } from 'remotion';

interface WarpHyperdrive3DProps {
    frame: number;
    width: number;
    height: number;
    // Điểm bắt đầu kích hoạt chuyển cảnh Hyperdrive Warp (Frame 932 - Click)
    warpStartFrame?: number;
    // Điểm kết thúc chuyển cảnh sang Cảnh 2 (Frame 1010)
    warpEndFrame?: number;
}

export const WarpHyperdrive3D: React.FC<WarpHyperdrive3DProps> = ({
    frame,
    width,
    height,
    warpStartFrame = 932,
    warpEndFrame = 1010,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const particlesRef = useRef<THREE.Points | null>(null);
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

    // Độ mờ tổng thể của layer Three.js (xuất hiện bồng bềnh từ frame 660, bùng nổ khi warp, rồi fade nhẹ sang cảnh 2)
    const ambientOpacity = interpolate(
        frame,
        [660, 720, warpStartFrame, warpStartFrame + 30, warpEndFrame - 15, warpEndFrame],
        [0, 0.45, 0.65, 1, 0.95, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Khởi tạo Scene, Camera, Particles một lần duy nhất
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

        // 3. Khởi tạo 1200 hạt 3D lơ lửng không gian (Ambient 3D Floating Bokeh)
        const PARTICLE_COUNT = 1200;
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        const colorPink = new THREE.Color('#ED017C');
        const colorCyan = new THREE.Color('#10B981');
        const colorWhite = new THREE.Color('#FFFFFF');
        const colorRose = new THREE.Color('#FF2E79');

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Phân bố trong hình trụ không gian quanh camera
            const r1 = mulberry32(i * 4 + 1);
            const r2 = mulberry32(i * 4 + 2);
            const r3 = mulberry32(i * 4 + 3);
            const r4 = mulberry32(i * 4 + 4);

            const radius = 200 + r1 * 1400;
            const theta = r2 * Math.PI * 2;
            const z = (r3 - 0.5) * 3000;

            positions[i * 3] = Math.cos(theta) * radius;
            positions[i * 3 + 1] = Math.sin(theta) * radius;
            positions[i * 3 + 2] = z;

            // Màu sắc hạt: xen kẽ hồng TopBaoHiem, xanh ngọc bảo mật, và trắng sao
            const col =
                r4 < 0.45
                    ? colorPink
                    : r4 < 0.7
                    ? colorRose
                    : r4 < 0.88
                    ? colorWhite
                    : colorCyan;

            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Texture chấm tròn mềm mại
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = 32;
        canvasTexture.height = 32;
        const ctx = canvasTexture.getContext('2d');
        if (ctx) {
            const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 32, 32);
        }
        const particleMap = new THREE.CanvasTexture(canvasTexture);

        const particleMat = new THREE.PointsMaterial({
            size: 14,
            map: particleMap,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);
        particlesRef.current = particles;

        // 4. Khởi tạo 300 tia sáng xuyên tâm tốc độ cao (Warp Speed Streak Lines)
        const STREAK_COUNT = 300;
        const streakPositions = new Float32Array(STREAK_COUNT * 2 * 3);
        const streakColors = new Float32Array(STREAK_COUNT * 2 * 3);

        for (let i = 0; i < STREAK_COUNT; i++) {
            const s1 = mulberry32(5000 + i * 4 + 1);
            const s2 = mulberry32(5000 + i * 4 + 2);
            const s3 = mulberry32(5000 + i * 4 + 3);
            const s4 = mulberry32(5000 + i * 4 + 4);

            const radius = 150 + s1 * 1200;
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

            const col = s4 > 0.5 ? colorPink : colorWhite;
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
            particleGeo.dispose();
            particleMat.dispose();
            streakGeo.dispose();
            streakMat.dispose();
            particleMap.dispose();
        };
    }, [width, height]);

    // RENDER DETERMINISTIC THEO TỪNG FRAME CỦA REMOTION
    useEffect(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

        const camera = cameraRef.current;
        const particles = particlesRef.current;
        const streaks = streaksRef.current;

        // Vận tốc và chuyển động không gian 3D
        if (warpProgress <= 0.001) {
            // Giai đoạn tĩnh & bồng bềnh nhẹ quanh search bar:
            // Camera hơi nhấp nhô theo sóng tự nhiên
            camera.position.x = Math.sin(frame * 0.015) * 40;
            camera.position.y = Math.cos(frame * 0.018) * 30;
            camera.position.z = 1000;
            camera.lookAt(0, 0, 0);

            if (particles) {
                particles.rotation.z = frame * 0.0012;
                const pos = particles.geometry.attributes.position.array as Float32Array;
                // Trôi nhẹ
                for (let i = 0; i < pos.length / 3; i++) {
                    pos[i * 3 + 2] += Math.sin(frame * 0.02 + i) * 0.4;
                }
                particles.geometry.attributes.position.needsUpdate = true;
                (particles.material as THREE.PointsMaterial).size = 12;
            }

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

            if (particles) {
                const pos = particles.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < pos.length / 3; i++) {
                    pos[i * 3 + 2] += speed;
                    // Nếu hạt vượt qua camera thì đưa lại ra xa phía sau
                    if (pos[i * 3 + 2] > camera.position.z + 200) {
                        pos[i * 3 + 2] = camera.position.z - 2800;
                    }
                }
                particles.geometry.attributes.position.needsUpdate = true;
                (particles.material as THREE.PointsMaterial).size = 12 + warpProgress * 28;
            }

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
                zIndex: 36, // Nằm giữa backdrop blur và Hero Search, và bùng lên trên khi warp
            }}
        />
    );
};
