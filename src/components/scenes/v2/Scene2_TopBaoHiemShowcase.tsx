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

export const Scene2_TopBaoHiemShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = VIDEO_CONFIG_V2.colors;

  // Hiệu ứng mở màn sau cú búng tay của Cảnh 1
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const cardHover = Math.sin(frame * 0.08) * 8;

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
      {/* Nền Gradient Hồng Soft & Paper dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${colors.brandPink}22 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {/* HEADER: Tiêu đề & Logo TOPbaohiem */}
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
          Trải Nghiệm Toàn Diện
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: colors.textPrimary,
            letterSpacing: "-1px",
          }}
        >
          TOPbaohiem — Mua Bảo Hiểm Chỉ Trong Vài Cú Chạm
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: colors.textSecondary,
            marginTop: 8,
          }}
        >
          Trực quan và mượt mà trên cả Laptop & Điện thoại
        </div>
      </div>

      {/* KHỐI TRUNG TÂM: Màn hình trình diễn Laptop + Mobile từ Storyboard Canva */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: `translateX(-50%) scale(${entrance}) translateY(${cardHover}px)`,
          width: 1400,
          height: 750,
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 30px 70px -15px rgba(225, 29, 72, 0.22), 0 15px 35px rgba(0, 0, 0, 0.08)",
          border: `6px solid ${colors.bgWhite}`,
        }}
      >
        <Img
          src={staticFile("assets/canva_v2/slide3_showcase.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* BADGES NHẤN MẠNH 3 TRỤ CỘT GIÁ TRỊ PHÍA DƯỚI */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: entrance,
        }}
      >
        {[
          { icon: "⚡", title: "So sánh dễ dàng", desc: "Minh bạch, nhanh chóng" },
          { icon: "💰", title: "Tiết kiệm chi phí", desc: "Tối ưu mọi quyền lợi" },
          { icon: "🛡️", title: "An toàn bảo mật", desc: "Bảo vệ thông tin cá nhân" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: colors.bgWhite,
              padding: "18px 32px",
              borderRadius: 20,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
              border: `2px solid ${colors.brandPinkSoft}`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.textPrimary }}>
                {item.title}
              </div>
              <div style={{ fontSize: 16, color: colors.textSecondary }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
