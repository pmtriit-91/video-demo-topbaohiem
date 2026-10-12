import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from "remotion";
import { VIDEO_CONFIG_V2 } from "../../../config/videoConfigV2";

export const Scene3_TravelAdventure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = VIDEO_CONFIG_V2.colors;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Chuyển động bập bênh sóng biển Paper Cut
  const waveBobbing = Math.sin(frame * 0.1) * 10;
  const duckSpin = (frame * 1.5) % 360;

  // Thẻ khung bảo vệ trượt vào (Frame 300 ~ 5s)
  const shieldSpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: colors.bgLight,
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Nền Biển & Nắng Pastel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 20%, #E0F2FE 0%, ${colors.bgLight} 75%)`,
        }}
      />

      {/* HEADER: Tiêu đề Cảnh 3 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: entrance,
          transform: `translateY(${interpolate(entrance, [0, 1], [-40, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.accentCyan,
            color: colors.bgWhite,
            padding: "10px 28px",
            borderRadius: 99,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 16,
            boxShadow: "0 8px 20px rgba(6, 182, 212, 0.3)",
          }}
        >
          Tiểu Cảnh 01 • Bảo Hiểm Du Lịch
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: colors.textPrimary,
            letterSpacing: "-1px",
          }}
        >
          Sẵn Sàng Cho Hành Trình An Tâm & Vui Nhộn
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: colors.textSecondary,
            marginTop: 8,
          }}
        >
          Từ một chuyến đi, một chiếc vali... đến lớp bảo vệ vững vàng
        </div>
      </div>

      {/* KHỐI TRUNG TÂM: Storyboard Cặp đôi du lịch kéo vali từ Canva */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: `translateX(-50%) translateY(${waveBobbing}px) scale(${entrance})`,
          width: 1400,
          height: 750,
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 30px 70px -15px rgba(6, 182, 212, 0.25), 0 15px 35px rgba(0, 0, 0, 0.08)",
          border: `6px solid ${colors.bgWhite}`,
        }}
      >
        <Img
          src={staticFile("assets/canva_v2/slide4_travel.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* THẺ BẢO VỆ TRƯỢT VÀO QUANH CẶP ĐÔI (Frame 180+) */}
      {frame >= 180 && (
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: "50%",
            transform: `translateX(-50%) scale(${shieldSpring})`,
            opacity: shieldSpring,
            backgroundColor: colors.bgWhite,
            padding: "20px 48px",
            borderRadius: 28,
            boxShadow: "0 20px 45px rgba(225, 29, 72, 0.2)",
            border: `3px solid ${colors.brandPink}`,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span style={{ fontSize: 40, transform: `rotate(${duckSpin}deg)` }}>
            🦆
          </span>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: colors.brandPink }}>
              Lớp bảo vệ toàn diện cho chuyến đi
            </div>
            <div style={{ fontSize: 18, color: colors.textSecondary }}>
              Thu nhỏ về thẻ sản phẩm du lịch trên website TOPbaohiem.vn
            </div>
          </div>
          <span style={{ fontSize: 36 }}>✈️</span>
        </div>
      )}
    </div>
  );
};
