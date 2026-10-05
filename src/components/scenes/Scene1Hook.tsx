import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CyberShieldThree } from "../3d/CyberShieldThree";
import { ShieldCheck, Sparkles, Zap, TrendingUp, Award } from "lucide-react";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animations
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const subtitleOpacity = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeScale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const statsTranslateY = interpolate(frame, [50, 90], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const statsOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chuyển cảnh zoom nhẹ về cuối scene để chuẩn bị sang Scene 2
  const sceneZoom = interpolate(frame, [380, 480], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneFadeOut = interpolate(frame, [430, 480], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${sceneZoom})`,
        opacity: sceneFadeOut,
        zIndex: 2,
      }}
    >
      {/* Khối Khiên 3D Three.js */}
      <CyberShieldThree width={width} height={height} />

      {/* Foreground Typography & Badges */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "85%",
        }}
      >
        {/* Top Floating Badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 30px",
            borderRadius: "999px",
            background: "rgba(0, 229, 255, 0.08)",
            border: "1px solid rgba(0, 229, 255, 0.4)",
            boxShadow: "0 0 40px rgba(0, 229, 255, 0.25)",
            marginBottom: "35px",
            backdropFilter: "blur(12px)",
          }}
        >
          <Sparkles color="#00e5ff" size={26} />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#00e5ff",
              textTransform: "uppercase",
            }}
          >
            ĐỘT PHÁ CÔNG NGHỆ INSURTECH 2026
          </span>
          <Award color="#fbbf24" size={26} />
        </div>

        {/* Big Impact Title */}
        <h1
          style={{
            fontSize: "82px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            margin: 0,
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [60, 0])}px)`,
            opacity: titleEntrance,
            background:
              "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #00e5ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 40px rgba(0, 0, 0, 0.8)",
          }}
        >
          HỆ SINH THÁI BẢO HIỂM SỐ TOÀN DIỆN
        </h1>

        {/* Subtitle with dual brand punchline */}
        <div
          style={{
            marginTop: "24px",
            opacity: subtitleOpacity,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            Cổng Mua Bán <strong style={{ color: "#00e5ff" }}>TopBaoHiem</strong>
          </span>
          <span style={{ fontSize: "32px", color: "rgba(255,255,255,0.4)" }}>✕</span>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            Cỗ Máy Vận Hành <strong style={{ color: "#10b981" }}>InsureGO CMS</strong>
          </span>
        </div>

        {/* Bottom Metrics Bar (4 Highlights) */}
        <div
          style={{
            marginTop: "70px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            width: "100%",
            transform: `translateY(${statsTranslateY}px)`,
            opacity: statsOpacity,
          }}
        >
          {[
            {
              icon: <Zap size={32} color="#00e5ff" />,
              value: "2 GIÂY",
              label: "AI OCR Quét Cà Vẹt",
              border: "rgba(0, 229, 255, 0.3)",
              glow: "rgba(0, 229, 255, 0.15)",
            },
            {
              icon: <ShieldCheck size={32} color="#10b981" />,
              value: "100%",
              label: "Ấn Chỉ Điện Tử Chuẩn Luật",
              border: "rgba(16, 185, 129, 0.3)",
              glow: "rgba(16, 185, 129, 0.15)",
            },
            {
              icon: <TrendingUp size={32} color="#3b82f6" />,
              value: "75+ CTV",
              label: "Mạng Lưới Affiliate Số",
              border: "rgba(59, 130, 246, 0.3)",
              glow: "rgba(59, 130, 246, 0.15)",
            },
            {
              icon: <Award size={32} color="#fbbf24" />,
              value: "ĐA HÃNG",
              label: "Bảo Việt • PVI • PTI • PJICO",
              border: "rgba(251, 191, 36, 0.3)",
              glow: "rgba(251, 191, 36, 0.15)",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(13, 21, 39, 0.75)",
                border: `1px solid ${item.border}`,
                boxShadow: `0 12px 30px ${item.glow}`,
                borderRadius: "20px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                backdropFilter: "blur(16px)",
              }}
            >
              <div>{item.icon}</div>
              <div
                className="font-mono-numbers"
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
