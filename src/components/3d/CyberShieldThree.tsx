import React, { useEffect, useRef } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

interface CyberShieldProps {
  width: number;
  height: number;
}

export const CyberShieldThree: React.FC<CyberShieldProps> = ({ width, height }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shieldGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 3000);
    camera.position.set(0, 0, 750);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    rendererRef.current = renderer;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);
    shieldGroupRef.current = shieldGroup;

    // 1. Dựng hình dáng chiếc khiên hình học bảo hiểm
    const shape = new THREE.Shape();
    // Bắt đầu từ đỉnh giữa
    shape.moveTo(0, 180);
    shape.quadraticCurveTo(150, 160, 180, 50);
    shape.quadraticCurveTo(170, -100, 0, -220);
    shape.quadraticCurveTo(-170, -100, -180, 50);
    shape.quadraticCurveTo(-150, 160, 0, 180);

    const extrudeSettings = {
      depth: 25,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 8,
      bevelThickness: 8,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Material kim loại tương lai bóng bẩy
    const material = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.25,
    });

    const shieldMesh = new THREE.Mesh(geometry, material);
    shieldGroup.add(shieldMesh);

    // 2. Viền phát quang Neon bao quanh chiếc khiên (Edges)
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      linewidth: 3,
      transparent: true,
      opacity: 0.9,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    shieldGroup.add(edgesMesh);

    // 3. Vòng tròn xung năng lượng quay quanh
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(260 + r * 50, 1.5, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 0 ? 0x00e5ff : r === 1 ? 0x3b82f6 : 0x10b981,
        transparent: true,
        opacity: 0.45 - r * 0.1,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI * 0.35 + r * 0.2;
      ringsGroup.add(ringMesh);
    }

    // Ánh sáng chiếu vào khối 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00e5ff, 4, 1000);
    pointLight1.position.set(200, 200, 300);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 3, 1000);
    pointLight2.position.set(-200, -200, 300);
    scene.add(pointLight2);

    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
    };
  }, [width, height]);

  useEffect(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    if (shieldGroupRef.current) {
      // Xoay nhẹ nhàng theo góc nghiêng isometric
      shieldGroupRef.current.rotation.y = Math.sin(frame * 0.03) * 0.25;
      shieldGroupRef.current.rotation.x = Math.cos(frame * 0.02) * 0.15;
      
      // Hiệu ứng zoom in khi mở đầu
      const enterProgress = Math.min(1, frame / 60);
      const scale = 0.5 + 0.5 * Math.sin((enterProgress * Math.PI) / 2);
      shieldGroupRef.current.scale.set(scale, scale, scale);
    }

    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z = frame * 0.02;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [frame]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};
