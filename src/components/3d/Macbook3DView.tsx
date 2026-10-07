import React, { useEffect, useRef, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import * as THREE from 'three';
// @ts-ignore
import { USDLoader } from 'three/examples/jsm/loaders/USDLoader.js';

interface Macbook3DViewProps {
    width: number;
    height: number;
    /**
     * openAngle: Góc mở thực tế của nắp máy tính bằng độ.
     * 45 = mở 45 độ (tương thích cuối frame 78 của video Apple)
     * 90 = mở thẳng đứng 90 độ (tương thích macbook_front_90)
     */
    openAngle: number;
    /**
     * cameraProgress: 0 = góc phối cảnh từ trên nhìn chúc xuống 15 độ
     * 1 = góc trực diện ngang tầm mắt (eye-level front 0 độ)
     */
    cameraProgress: number;
}

export const Macbook3DView: React.FC<Macbook3DViewProps> = ({
    width,
    height,
    openAngle,
    cameraProgress,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const lidPivotRef = useRef<THREE.Group | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderHandle = delayRender('Loading Apple MacBook USDZ 3D Model');

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        rendererRef.current = renderer;

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);

        // Ánh sáng Studio chuẩn Apple Keynote
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
        keyLight.position.set(0, 0.6, 0.45);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.4);
        fillLight.position.set(-0.4, 0.3, 0.3);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
        rimLight.position.set(0, 0.35, -0.4);
        scene.add(rimLight);

        // Load mô hình USDZ chính hãng Apple
        const loader = new USDLoader();
        const modelUrl = staticFile('assets/macbook_open/macbook_pro_14_space_black.usdz');

        loader.load(
            modelUrl,
            (loadedGroup: THREE.Group) => {
                scene.add(loadedGroup);

                // Log all nodes in loadedGroup
                console.log('--- USDZ DEBUG ---');
                loadedGroup.traverse((child) => {
                    if (child.name) {
                        const box = new THREE.Box3().setFromObject(child);
                        console.log(`Node [${child.name}]: pos=${JSON.stringify(child.position)}, min=(${box.min.x.toFixed(4)}, ${box.min.y.toFixed(4)}, ${box.min.z.toFixed(4)}), max=(${box.max.x.toFixed(4)}, ${box.max.y.toFixed(4)}, ${box.max.z.toFixed(4)})`);
                    }
                });

                // Tìm nắp máy (Lid) và thân máy (Base)
                const lidNode = loadedGroup.getObjectByName('TxAHSkxHZytruwi');
                if (lidNode && lidNode.parent) {
                    const parent = lidNode.parent;

                    // Bản lề chuẩn trong hệ toạ độ local của parent (cm)
                    const hingeCenter = new THREE.Vector3(0, 0.422545, -11.458913);

                    const lidPivot = new THREE.Group();
                    lidPivot.position.copy(hingeCenter);
                    parent.add(lidPivot);

                    // Di dời lidNode vào trong Pivot và bù trừ toạ độ
                    parent.remove(lidNode);
                    lidNode.position.sub(hingeCenter);
                    lidPivot.add(lidNode);

                    lidPivotRef.current = lidPivot;
                }

                // Tối ưu hiển thị màn hình Liquid Retina: phát sáng nhẹ tự nhiên, giữ sắc nét logo và menu bar
                loadedGroup.traverse((child) => {
                    // @ts-ignore
                    if (child.isMesh && child.material) {
                        // @ts-ignore
                        const mats = Array.isArray(child.material) ? child.material : [child.material];
                        for (const mat of mats) {
                            if (mat.map && (mat.map.name?.includes('qLVJPXVlXIfSiVu') || (mat.map.image && mat.map.image.width === 2048))) {
                                mat.roughness = 0.15;
                                mat.metalness = 0.0;
                                mat.emissive = new THREE.Color(0xffffff);
                                mat.emissiveMap = mat.map;
                                mat.emissiveIntensity = 0.4;
                                mat.needsUpdate = true;
                            }
                        }
                    }
                });

                setIsLoaded(true);
                continueRender(renderHandle);
            },
            undefined,
            (error: unknown) => {
                console.error('Lỗi khi tải USDZ MacBook:', error);
                continueRender(renderHandle);
            }
        );

        return () => {
            renderer.forceContextLoss();
            renderer.dispose();
        };
    }, [width, height]);

    // Cập nhật góc mở và góc máy theo props
    useEffect(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !isLoaded) return;

        // Góc quay nắp máy:
        // USDZ mặc định mở ở 110.8 độ (lidPivot.rotation.x = 0)
        // Khi mở openAngle độ -> quay thêm một góc (110.8 - openAngle) độ
        if (lidPivotRef.current) {
            const rotXDeg = 110.8 - openAngle;
            lidPivotRef.current.rotation.x = THREE.MathUtils.degToRad(rotXDeg);
        }

        // Dịch chuyển mô hình theo trục X để bù trừ vị trí bố cục Apple:
        // cameraProgress = 0: model.position.x = 0.0395 (khớp chuẩn 1:1 vị trí lệch phải của frame 78 Apple)
        // cameraProgress = 1: model.position.x = 0.0000 (trở về chính tâm màn hình eye-level)
        const loadedModel = sceneRef.current.children.find((c) => c.type === 'Group');
        if (loadedModel) {
            loadedModel.position.x = 0;
        }

        // Camera fov và khoảng cách:
        // cameraProgress = 0: fov = 36 deg, camZ = 0.455 (khớp phối cảnh Apple frame 78)
        // cameraProgress = 1: fov = 15.2 deg, camZ = 1.120 (khớp tỉ lệ 1:1 macbook_front_90 telephoto eye-level)
        const fov = THREE.MathUtils.lerp(36, 15.2, cameraProgress);
        cameraRef.current.fov = fov;
        cameraRef.current.updateProjectionMatrix();

        const camY = THREE.MathUtils.lerp(0.160, 0.015, cameraProgress);
        const camZ = THREE.MathUtils.lerp(0.455, 1.120, cameraProgress);

        const targetY = THREE.MathUtils.lerp(0.030, 0.099, cameraProgress);
        const targetZ = THREE.MathUtils.lerp(-0.020, -0.100, cameraProgress);

        cameraRef.current.position.set(0, camY, camZ);
        cameraRef.current.lookAt(0, targetY, targetZ);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
    }, [openAngle, cameraProgress, isLoaded]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        />
    );
};
