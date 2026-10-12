import React from "react";
import { useCurrentFrame } from "remotion";
import { VIDEO_CONFIG_V2 } from "../../../config/videoConfigV2";

interface PaperCardProps {
  title: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  badge?: string;
  angle?: number;
  wiggle?: boolean;
  scale?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  accentColor?: string;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  angle = 0,
  wiggle = true,
  scale = 1,
  style = {},
  children,
  accentColor = VIDEO_CONFIG_V2.colors.brandPink,
}) => {
  const frame = useCurrentFrame();
  const colors = VIDEO_CONFIG_V2.colors;

  // Hiệu ứng paper stop-motion: rung lắc nhẹ 0.5 độ theo nhịp bước
  const stopMotionWiggle = wiggle ? Math.sin(frame * 0.25) * 0.8 : 0;
  const currentAngle = angle + stopMotionWiggle;

  return (
    <div
      style={{
        position: "relative",
        transform: `rotate(${currentAngle}deg) scale(${scale})`,
        transformOrigin: "center center",
        backgroundColor: colors.bgWhite,
        borderRadius: 24,
        padding: "24px 32px",
        // Đổ bóng 2 tầng tạo độ dày bìa giấy xốp thủ công
        boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, 0.05),
          0 16px 32px -4px rgba(225, 29, 72, 0.12),
          0 30px 60px -12px rgba(15, 23, 42, 0.1)
        `,
        border: `3px solid ${colors.bgWhite}`,
        outline: `1.5px solid ${colors.brandPinkSoft}`,
        userSelect: "none",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "inline-block",
        ...style,
      }}
    >
      {/* Ghim giấy / Miếng dán Washi Tape ở mép trên */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 50,
          height: 16,
          backgroundColor: `${accentColor}33`,
          backdropFilter: "blur(4px)",
          borderRadius: 4,
          border: `1px solid ${accentColor}55`,
          boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
        }}
      />

      {/* Badge nhỏ góc trên nếu có */}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -12,
            right: 18,
            backgroundColor: accentColor,
            color: colors.bgWhite,
            fontSize: 14,
            fontWeight: 800,
            padding: "4px 14px",
            borderRadius: 99,
            letterSpacing: "0.5px",
            boxShadow: `0 4px 10px ${accentColor}40`,
          }}
        >
          {badge}
        </div>
      )}

      {/* Nội dung chính */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {icon && (
          <div
            style={{
              fontSize: 42,
              lineHeight: 1,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.08))",
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.textPrimary,
              lineHeight: 1.25,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: colors.textSecondary,
                marginTop: 6,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};
