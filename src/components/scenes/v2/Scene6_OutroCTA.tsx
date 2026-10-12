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

export const Scene6_OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = VIDEO_CONFIG_V2.colors;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const ctaPulse = 1 + Math.sin(frame * 0.1) * 0.03;

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
      {/* Nền Gradient Hồng Soft & Paper Dot */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
        }}
      />

      {/* HEADER: Kết & Slogan định vị */}
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
            backgroundColor: colors.brandPink,
            color: colors.bgWhite,
            padding: "10px 28px",
            borderRadius: 99,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 16,
            boxShadow: "0 8px 20px rgba(225, 29, 72, 0.3)",
          }}
        >
          Giải Pháp Bảo Hiểm Toàn Diện
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: colors.textPrimary,
            letterSpacing: "-1px",
          }}
        >
          TOPbaohiem — Rõ Ràng Hơn, Thuận Tiện Hơn!
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: colors.textSecondary,
            marginTop: 8,
          }}
        >
          Bắt đầu hành trình bảo hiểm theo cách đơn giản hơn
        </div>
      </div>

      {/* KHỐI TRUNG TÂM: Storyboard Outro & CTA từ Canva */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: `translateX(-50%) scale(${entrance})`,
          width: 1400,
          height: 750,
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 30px 70px -15px rgba(225, 29, 72, 0.25), 0 15px 35px rgba(0, 0, 0, 0.08)",
          border: `6px solid ${colors.bgWhite}`,
        }}
      >
        <Img
          src={staticFile("assets/canva_v2/slide7_outro_cta.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* NÚT CTA CHÍNH THỨC PHÍA DƯỚI */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: `translateX(-50%) scale(${ctaPulse})`,
          opacity: entrance,
          backgroundColor: colors.brandPink,
          color: colors.bgWhite,
          padding: "22px 64px",
          borderRadius: 32,
          boxShadow: "0 20px 50px rgba(225, 29, 72, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: 20,
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 36 }}>🚀</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 900 }}>
            TRẢI NGHIỆM NGAY TẠI TOPBAOHIEM.VN
          </div>
          <div style={{ fontSize: 18, opacity: 0.9, fontWeight: 600 }}>
            Hoặc liên hệ sở hữu trọn gói nền tảng InsurTech
          </div>
        </div>
        <span style={{ fontSize: 36 }}>✨</span>
      </div>
    </div>
  );
};
