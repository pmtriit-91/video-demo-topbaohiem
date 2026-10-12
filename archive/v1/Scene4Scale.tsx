import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Network, Users, TrendingUp, Handshake, CheckCircle, ShieldCheck } from "lucide-react";

export const Scene4Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const is4K = width >= 3840;
  const s = is4K ? 1 : width / 3840;

  // Entrance
  const sceneEntrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const card1Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
  });

  const card2Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });

  // Outro transition (frames 480 -> 600)
  const exitScale = interpolate(frame, [500, 600], [1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [530, 600], [1, 0], {
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
        justifyContent: "space-between",
        padding: `${Math.round(35 * s)}px ${Math.round(60 * s)}px`,
        transform: `scale(${exitScale})`,
        opacity: exitOpacity,
        zIndex: 3,
      }}
    >
      {/* Header Phân Hệ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: `${Math.round(18 * s)}px`,
          textAlign: "center",
          transform: `translateY(${interpolate(sceneEntrance, [0, 1], [-30 * s, 0])}px)`,
          opacity: sceneEntrance,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: `${Math.round(8 * s)}px`,
            padding: `${Math.round(6 * s)}px ${Math.round(20 * s)}px`,
            borderRadius: "999px",
            background: "rgba(59, 130, 246, 0.12)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60a5fa",
            fontSize: `${Math.max(10, Math.round(15 * s))}px`,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: `${Math.round(8 * s)}px`,
          }}
        >
          <Network size={Math.round(18 * s)} /> TẦNG 3: CỖ MÁY BÙNG NỔ QUY MÔ & DOANH THU (SCALE ENGINE)
        </div>
        <h2
          style={{
            fontSize: `${Math.max(20, Math.round(42 * s))}px`,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Mạng Lưới 75+ Đại Lý Số & Tích Hợp Sẵn API Các Ông Lớn Bảo Hiểm
        </h2>
      </div>

      {/* Grid 2 Cột Sức Mạnh Đối Tác */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: `${Math.round(28 * s)}px`,
          width: "100%",
          maxWidth: "3400px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* KHỐI 1: CÂY HỆ THỐNG PHÂN TẦNG HOA HỒNG KOL / CTV */}
        <div
          style={{
            position: "relative",
            background: "rgba(15, 23, 42, 0.88)",
            border: "2px solid rgba(0, 229, 255, 0.45)",
            borderRadius: `${Math.round(22 * s)}px`,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 229, 255, 0.25)",
            transform: `translateY(${interpolate(card1Spring, [0, 1], [60 * s, 0])}px)`,
            opacity: card1Spring,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: `${Math.round(14 * s)}px ${Math.round(24 * s)}px`,
              background: "rgba(0, 229, 255, 0.12)",
              borderBottom: "1px solid rgba(0, 229, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: `${Math.round(10 * s)}px` }}>
              <Users color="#00e5ff" size={Math.round(22 * s)} />
              <span style={{ fontSize: `${Math.max(12, Math.round(18 * s))}px`, fontWeight: 700, color: "#ffffff" }}>
                Hệ Sinh Thái 75+ Đại Lý & KOL Affiliate
              </span>
            </div>
            <span
              style={{
                background: "#00e5ff",
                color: "#070b14",
                padding: `${Math.round(4 * s)}px ${Math.round(12 * s)}px`,
                borderRadius: "999px",
                fontSize: `${Math.max(10, Math.round(12 * s))}px`,
                fontWeight: 800,
              }}
            >
              ĐỐI SOÁT TỰ ĐỘNG
            </span>
          </div>

          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            <Img
              src={staticFile("assets/cms/kol_tree.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top left",
              }}
            />

            {/* Float Highlight Badge */}
            <div
              style={{
                position: "absolute",
                bottom: `${Math.round(18 * s)}px`,
                left: `${Math.round(18 * s)}px`,
                right: `${Math.round(18 * s)}px`,
                padding: `${Math.round(14 * s)}px ${Math.round(20 * s)}px`,
                borderRadius: `${Math.round(16 * s)}px`,
                background: "rgba(10, 15, 30, 0.95)",
                border: "1px solid rgba(0, 229, 255, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: `${Math.max(9, Math.round(12 * s))}px`, color: "#94a3b8" }}>Quản trị mã giới thiệu riêng (refCode):</div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 700, marginTop: "2px" }}>
                  Tự động phân chia hoa hồng đa cấp • Không lo sổ sách
                </div>
              </div>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid #10b981",
                  borderRadius: `${Math.round(10 * s)}px`,
                  padding: `${Math.round(6 * s)}px ${Math.round(14 * s)}px`,
                  color: "#10b981",
                  fontSize: `${Math.max(10, Math.round(13 * s))}px`,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CheckCircle size={Math.round(15 * s)} /> VẬN HÀNH 24/7
              </div>
            </div>
          </div>
        </div>

        {/* KHỐI 2: TÍCH HỢP ĐA HÃNG BẢO HIỂM HÀNG ĐẦU */}
        <div
          style={{
            position: "relative",
            background: "rgba(15, 23, 42, 0.88)",
            border: "2px solid rgba(59, 130, 246, 0.45)",
            borderRadius: `${Math.round(22 * s)}px`,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
            transform: `translateY(${interpolate(card2Spring, [0, 1], [60 * s, 0])}px)`,
            opacity: card2Spring,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: `${Math.round(14 * s)}px ${Math.round(24 * s)}px`,
              background: "rgba(59, 130, 246, 0.12)",
              borderBottom: "1px solid rgba(59, 130, 246, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: `${Math.round(10 * s)}px` }}>
              <Handshake color="#60a5fa" size={Math.round(22 * s)} />
              <span style={{ fontSize: `${Math.max(12, Math.round(18 * s))}px`, fontWeight: 700, color: "#ffffff" }}>
                Kết Nối Trực Tiếp API Nhà Bảo Hiểm
              </span>
            </div>
            <span
              style={{
                background: "#3b82f6",
                color: "#ffffff",
                padding: `${Math.round(4 * s)}px ${Math.round(12 * s)}px`,
                borderRadius: "999px",
                fontSize: `${Math.max(10, Math.round(12 * s))}px`,
                fontWeight: 800,
              }}
            >
              PLUG & PLAY
            </span>
          </div>

          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            <Img
              src={staticFile("assets/cms/brands_list.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top left",
              }}
            />

            {/* List Đối Tác Lớn */}
            <div
              style={{
                position: "absolute",
                bottom: `${Math.round(18 * s)}px`,
                left: `${Math.round(18 * s)}px`,
                right: `${Math.round(18 * s)}px`,
                padding: `${Math.round(14 * s)}px ${Math.round(20 * s)}px`,
                borderRadius: `${Math.round(16 * s)}px`,
                background: "rgba(10, 15, 30, 0.95)",
                border: "1px solid rgba(59, 130, 246, 0.5)",
                display: "flex",
                flexDirection: "column",
                gap: `${Math.round(6 * s)}px`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#60a5fa", fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 700 }}>
                <ShieldCheck size={Math.round(16 * s)} />
                ĐÃ LIÊN KẾT CHÍNH THỨC:
              </div>
              <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 700 }}>
                Bảo Việt • PVI • PTI • PJICO • Bảo Long • VNPAY
              </div>
              <div style={{ fontSize: `${Math.max(9, Math.round(12 * s))}px`, color: "#94a3b8" }}>
                Tự động cập nhật biểu phí, đồng bộ điều khoản bồi thường theo thị trường.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
