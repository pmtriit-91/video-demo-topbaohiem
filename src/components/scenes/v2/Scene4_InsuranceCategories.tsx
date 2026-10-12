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

export const Scene4_InsuranceCategories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = VIDEO_CONFIG_V2.colors;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
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
      {/* Nền Gradient Hồng Mềm */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
        }}
      />

      {/* HEADER: Tiêu đề Cảnh 4 */}
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
          Đa Dạng Danh Mục
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: colors.textPrimary,
            letterSpacing: "-1px",
          }}
        >
          Nhiều Nhóm Sản Phẩm — Bảo Vệ Trọn Cuộc Sống
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: colors.textSecondary,
            marginTop: 8,
          }}
        >
          Xe cộ · Sức khỏe · Tài sản & Cháy nổ · Thao tác chọn gói dễ dàng
        </div>
      </div>

      {/* KHỐI TRUNG TÂM: Storyboard Các nhóm sản phẩm từ Canva */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: `translateX(-50%) translateY(${cardHover}px) scale(${entrance})`,
          width: 1400,
          height: 750,
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 30px 70px -15px rgba(225, 29, 72, 0.22), 0 15px 35px rgba(0, 0, 0, 0.08)",
          border: `6px solid ${colors.bgWhite}`,
        }}
      >
        <Img
          src={staticFile("assets/canva_v2/slide5_categories.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* CÁC THẺ GỢI NHẮC CÂU CHUYỆN ĐỜI THƯỜNG */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 36,
          opacity: entrance,
        }}
      >
        {[
          { icon: "🚗", label: "Bảo hiểm Xe cộ", sub: "TNDS & Vật chất ô tô, xe máy" },
          { icon: "❤️", label: "Bảo hiểm Sức khỏe", sub: "Bảo lãnh viện phí toàn quốc" },
          { icon: "🏠", label: "Bảo hiểm Tài sản", sub: "Cháy nổ bắt buộc & Nhà xưởng" },
        ].map((cat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.bgWhite,
              padding: "16px 30px",
              borderRadius: 20,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
              border: `2px solid ${colors.brandPinkSoft}`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 32 }}>{cat.icon}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.textPrimary }}>
                {cat.label}
              </div>
              <div style={{ fontSize: 15, color: colors.textSecondary }}>
                {cat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
