import React from "react";
import { useCurrentFrame } from "remotion";

interface PaperCloudProps {
  x: number;
  y: number;
  scale?: number;
  speed?: number;
  opacity?: number;
}

export const PaperCloud: React.FC<PaperCloudProps> = ({
  x,
  y,
  scale = 1,
  speed = 0.5,
  opacity = 0.85,
}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.03 * speed) * 15;
  const horizontalFloat = (frame * speed * 0.4) % 100;

  return (
    <div
      style={{
        position: "absolute",
        top: y + drift,
        left: x + horizontalFloat,
        transform: `scale(${scale})`,
        opacity,
        pointerEvents: "none",
        filter: "drop-shadow(0 15px 25px rgba(225, 29, 72, 0.08)) drop-shadow(0 4px 6px rgba(0,0,0,0.03))",
      }}
    >
      <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
        <path
          d="M50 110 H170 A35 35 0 0 0 195 55 A45 45 0 0 0 120 30 A50 50 0 0 0 45 55 A35 35 0 0 0 50 110 Z"
          fill="#FFFFFF"
          stroke="#FFF1F2"
          strokeWidth="3"
        />
        {/* Lớp bóng giấy viền dưới */}
        <path
          d="M60 110 H160 A30 30 0 0 0 185 75 A40 40 0 0 1 120 40 A45 45 0 0 1 55 75 A30 30 0 0 0 60 110 Z"
          fill="#FFF5F7"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
