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

export const Scene5_PurchaseFlowCMS: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = VIDEO_CONFIG_V2.colors;

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Nửa đầu: Hành trình mua 4 bước (frames 0 - 1380 ~ 0s - 23s)
  // Nửa sau: Lật mặt sau sang CMS Dashboard (frames 1380 - 2760 ~ 23s - 46s)
  const isCmsPhase = frame >= 1380;
  const flipProgress = spring({
    frame: frame - 1380,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: isCmsPhase ? colors.cmsDarkBg : colors.bgLight,
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Background Phân đoạn Web vs CMS */}
      {!isCmsPhase ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 30%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 80%)`,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 30%, #1e1b4b 0%, ${colors.cmsDarkBg} 80%)`,
          }}
        />
      )}

      {/* HEADER */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: entrance,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: isCmsPhase ? "#6366F1" : colors.brandPink,
            color: colors.bgWhite,
            padding: "10px 28px",
            borderRadius: 99,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 16,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          {isCmsPhase ? "Hậu Trường Vận Hành • CMS Dashboard" : "Quy Trình 1-Chạm • Khách Hàng Cuối"}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: isCmsPhase ? colors.bgWhite : colors.textPrimary,
            letterSpacing: "-1px",
          }}
        >
          {isCmsPhase
            ? "Cỗ Máy CMS Quản Trị Tự Động & Báo Cáo Doanh Thu"
            : "Hành Trình Mua Bảo Hiểm Minh Bạch & Nhanh Gọn"}
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: isCmsPhase ? "#94A3B8" : colors.textSecondary,
            marginTop: 8,
          }}
        >
          {isCmsPhase
            ? "Quản lý hợp đồng · Sản phẩm · Khách hàng · Mạng lưới Đại lý & CTV"
            : "1. Chọn sản phẩm  →  2. Đọc thông tin  →  3. Nhập dữ liệu  →  4. Xác nhận"}
        </div>
      </div>

      {/* KHỐI TRUNG TÂM: Storyboard Hành trình & CMS từ Canva */}
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
          boxShadow: isCmsPhase
            ? "0 30px 70px -15px rgba(99, 102, 241, 0.3), 0 15px 35px rgba(0, 0, 0, 0.4)"
            : "0 30px 70px -15px rgba(225, 29, 72, 0.22), 0 15px 35px rgba(0, 0, 0, 0.08)",
          border: `6px solid ${isCmsPhase ? "#1F2937" : colors.bgWhite}`,
        }}
      >
        <Img
          src={staticFile("assets/canva_v2/slide6_purchase_cms.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* FOOTER BADGES */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          opacity: entrance,
        }}
      >
        {!isCmsPhase ? (
          ["1. Chọn sản phẩm", "2. Đọc thông tin", "3. Nhập thông tin", "4. Xác nhận"].map((step, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.bgWhite,
                padding: "16px 30px",
                borderRadius: 20,
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                border: `2px solid ${colors.brandPinkSoft}`,
                fontSize: 20,
                fontWeight: 800,
                color: colors.brandPink,
              }}
            >
              {step}
            </div>
          ))
        ) : (
          ["Hợp đồng", "Sản phẩm", "Khách hàng", "Đại lý / KOLs", "Chỉ số hệ thống"].map((module, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#111827",
                padding: "16px 30px",
                borderRadius: 20,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                border: "2px solid #374151",
                fontSize: 20,
                fontWeight: 800,
                color: "#818CF8",
              }}
            >
              {module}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
