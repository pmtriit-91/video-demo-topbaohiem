import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShieldCheck, Sparkles, Award, PhoneCall, Globe, CheckCircle } from "lucide-react";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.9 },
  });

  const cardsEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14 },
  });

  const ctaEntrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 14 },
  });

  // Hào quang phát sáng pulsing
  const pulseGlow = Math.sin((frame / 30) * Math.PI * 2) * 0.2 + 0.8;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 80px",
        zIndex: 4,
      }}
    >
      {/* 1. Main Metallic Logo & Slogan */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `scale(${logoSpring})`,
          opacity: logoSpring,
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 28px",
            borderRadius: "999px",
            background: "rgba(251, 191, 36, 0.12)",
            border: "1px solid rgba(251, 191, 36, 0.4)",
            color: "#fbbf24",
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "20px",
            boxShadow: `0 0 ${40 * pulseGlow}px rgba(251, 191, 36, 0.3)`,
          }}
        >
          <Award size={24} /> GIẢI PHÁP CHÌA KHÓA TRAO TAY (TURNKEY INSURTECH)
        </div>

        <h1
          style={{
            fontSize: "76px",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: "0 0 16px 0",
            background: "linear-gradient(135deg, #ffffff 0%, #00e5ff 50%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 40px rgba(0, 229, 255, 0.3)",
          }}
        >
          SỞ HỮU TOÀN BỘ NỀN TẢNG NGAY HÔM NAY
        </h1>

        <div style={{ fontSize: "32px", color: "#94a3b8", fontWeight: 600 }}>
          Sẵn sàng bàn giao • Tự động hóa 100% • Tăng trưởng doanh thu đột phá
        </div>
      </div>

      {/* 2. 3 Khối Giá Trị Cốt Lõi Cho Nhà Đầu Tư */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "35px",
          width: "100%",
          maxWidth: "2800px",
          transform: `translateY(${interpolate(cardsEntrance, [0, 1], [60, 0])}px)`,
          opacity: cardsEntrance,
          marginBottom: "60px",
        }}
      >
        {[
          {
            title: "MÃ NGUỒN CHUẨN ĐỈNH CAO",
            desc: "Frontend Next.js chuẩn SEO + Backend CMS React/Vite/TypeScript bảo mật đa tầng.",
            tag: "FULL TECH STACK",
            color: "#00e5ff",
          },
          {
            title: "HỆ SINH THÁI DOANH THU THỰC",
            desc: "Đã tích hợp sẵn cổng thanh toán VNPAY, ma trận đa hãng Bảo Việt, PVI, PTI.",
            tag: "REVENUE READY",
            color: "#10b981",
          },
          {
            title: "MẠNG LƯỚI 75+ ĐẠI LÝ",
            desc: "Hệ thống Affiliate KOLs tự động hóa đối soát và chi trả hoa hồng 24/7.",
            tag: "SCALE EFFICIENCY",
            color: "#fbbf24",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              border: `2px solid ${item.color}`,
              boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px ${item.color}33`,
              borderRadius: "24px",
              padding: "35px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: item.color, letterSpacing: "0.08em" }}>
                {item.tag}
              </span>
              <CheckCircle size={22} color={item.color} />
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "18px", color: "#94a3b8", lineHeight: 1.5 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Call To Action & Liên Hệ Hợp Tác */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          padding: "20px 50px",
          borderRadius: "999px",
          background: "linear-gradient(90deg, rgba(0, 229, 255, 0.15), rgba(16, 185, 129, 0.15))",
          border: "2px solid rgba(0, 229, 255, 0.6)",
          boxShadow: `0 0 ${50 * pulseGlow}px rgba(0, 229, 255, 0.3)`,
          transform: `translateY(${interpolate(ctaEntrance, [0, 1], [40, 0])}px)`,
          opacity: ctaEntrance,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Globe size={30} color="#00e5ff" />
          <span style={{ fontSize: "26px", fontWeight: 800, color: "#ffffff" }}>
            topbaohiem.vn • cms.topbaohiem.vn
          </span>
        </div>

        <div style={{ width: "2px", height: "35px", background: "rgba(255,255,255,0.2)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <PhoneCall size={30} color="#10b981" />
          <span style={{ fontSize: "26px", fontWeight: 800, color: "#10b981" }}>
            Hotline Hợp Tác: 088 999 6688
          </span>
        </div>
      </div>
    </div>
  );
};
