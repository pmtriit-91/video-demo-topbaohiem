import React, { useEffect, useMemo, useRef } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

interface MatrixBackgroundProps {
  width: number;
  height: number;
  particleCount?: number;
}

export const MatrixBackgroundThree: React.FC<MatrixBackgroundProps> = ({
  width,
  height,
  particleCount = 200,
}) => {
  const frame = useCurrentFrame();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);

  // Khởi tạo tọa độ hạt ngẫu nhiên nhưng xác định
  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    const c1 = new THREE.Color("#00e5ff"); // Cyan
    const c2 = new THREE.Color("#2563eb"); // Blue
    const c3 = new THREE.Color("#10b981"); // Emerald

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.sin(i * 12.9898) * 2000) % 2000;
      pos[i * 3 + 1] = (Math.cos(i * 78.233) * 1200) % 1200;
      pos[i * 3 + 2] = -((Math.sin(i * 45.164) * 1500) % 1500) - 200;

      const pickColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      col[i * 3] = pickColor.r;
      col[i * 3 + 1] = pickColor.g;
      col[i * 3 + 2] = pickColor.b;

      spd[i] = 0.5 + ((i % 10) / 10) * 1.5;
    }

    return { positions: pos, colors: col, speeds: spd };
  }, [particleCount]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 5000);
    camera.position.set(0, 50, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    rendererRef.current = renderer;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // 1. Grid sàn 3D phối cảnh công nghệ
    const gridHelper = new THREE.GridHelper(4000, 40, 0x00e5ff, 0x1e293b);
    gridHelper.position.y = -600;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // 2. Hạt sáng không gian
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Tạo sprite tròn phát quang
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(0, 229, 255, 0.8)");
      grad.addColorStop(1, "rgba(0, 229, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 16,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
    };
  }, [width, height, positions, colors]);

  useEffect(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    // Cập nhật vị trí hạt theo frame
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const speed = speeds[i];
        let z = positions[i * 3 + 2] + (frame * speed * 2) % 2000;
        if (z > 600) z -= 2000;
        arr[i * 3 + 2] = z;
      }
      posAttr.needsUpdate = true;
    }

    // Camera chuyển động nhẹ nhàng theo frame
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(frame * 0.005) * 50;
      cameraRef.current.position.y = 50 + Math.cos(frame * 0.008) * 30;
      cameraRef.current.lookAt(0, 0, -500);
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [frame, particleCount, speeds, positions]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
