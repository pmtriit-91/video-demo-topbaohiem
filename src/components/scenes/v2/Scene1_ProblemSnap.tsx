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

export const Scene1_ProblemSnap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = VIDEO_CONFIG_V2.colors;

  // 1. Nhịp 1: Các thẻ câu hỏi bối rối trượt vào (0s - 8s | frames 0 - 480)
  const card1Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const card2Spring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const card3Spring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Rung lắc nhẹ mô phỏng hoạt hình thủ công (paper stop-motion effect)
  const wiggleAngle = Math.sin(frame * 0.25) * 1.5;

  // 2. Nhịp 2: Ý tưởng bừng sáng Eureka (8s - 11.5s | frames 480 - 690)
  const eurekaProgress = spring({
    frame: frame - 480,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const starRotate = frame * 3;

  // 3. Nhịp 3: Cú Búng Tay SNAP! (11.5s - 14s | frames 690 - 840)
  const snapFrame = frame - 690;
  const isSnapTriggered = snapFrame >= 0;

  const snapScale = spring({
    frame: snapFrame,
    fps,
    config: { damping: 10, stiffness: 220 },
  });

  // Hiệu ứng sóng năng lượng hồng tỏa ra sau cú búng tay
  const waveRadius = interpolate(snapFrame, [0, 60], [0, 2400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waveOpacity = interpolate(snapFrame, [0, 20, 60], [0.9, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Độ mờ khi chuyển tiếp sang Cảnh 2
  const transitionToScene2 = interpolate(frame, [780, 840], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
      {/* NỀN: Paper Texture & Gradient Hồng Mềm */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${colors.brandPinkSoft} 0%, ${colors.bgLight} 75%)`,
        }}
      />

      {/* Grid họa tiết chấm bi Paper Craft tinh tế */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${colors.brandPink}22 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      {/* KHỐI TRUNG TÂM: Nhân vật & Storyboard Canva Visual */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.05) * 0.015})`,
          width: 1400,
          height: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Bản vẽ Storyboard Canva Slide 2 gốc làm lớp visual trung tâm */}
        <div
          style={{
            position: "relative",
            width: 1200,
            height: 675,
            borderRadius: 32,
            overflow: "hidden",
            boxShadow: "0 25px 60px -15px rgba(225, 29, 72, 0.25), 0 10px 25px rgba(0, 0, 0, 0.08)",
            border: `6px solid ${colors.bgWhite}`,
            transform: `rotate(${wiggleAngle}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Img
            src={staticFile("assets/canva_v2/slide2_problem_snap.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Viền sáng bao quanh thẻ Paper Cut */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 0 2px rgba(225, 29, 72, 0.15)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* 3 THẺ CÂU HỎI TRÔI VÀO (Diễn hoạt bổ trợ Paper-Cut sống động) */}
      {/* Thẻ 1: Chọn loại nào? */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: interpolate(card1Spring, [0, 1], [-400, 200]),
          transform: `rotate(${-6 + wiggleAngle}deg)`,
          opacity: card1Spring,
          backgroundColor: colors.bgWhite,
          padding: "24px 38px",
          borderRadius: 24,
          boxShadow: "0 18px 35px rgba(0,0,0,0.1), 0 4px 10px rgba(225,29,72,0.12)",
          border: `3px solid ${colors.brandPinkSoft}`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 44, color: colors.brandPink, fontWeight: 800 }}>❓</span>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: colors.textPrimary }}>
            Chọn loại nào?
          </div>
          <div style={{ fontSize: 20, color: colors.textSecondary, fontWeight: 500 }}>
            Quá nhiều hãng & gói cước
          </div>
        </div>
      </div>

      {/* Thẻ 2: Quyền lợi ra sao? */}
      <div
        style={{
          position: "absolute",
          top: 360,
          right: interpolate(card2Spring, [0, 1], [-400, 220]),
          transform: `rotate(${5 - wiggleAngle}deg)`,
          opacity: card2Spring,
          backgroundColor: colors.bgWhite,
          padding: "24px 38px",
          borderRadius: 24,
          boxShadow: "0 18px 35px rgba(0,0,0,0.1), 0 4px 10px rgba(225,29,72,0.12)",
          border: `3px solid ${colors.brandPinkSoft}`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 44, color: colors.accentYellow, fontWeight: 800 }}>📑</span>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: colors.textPrimary }}>
            Quyền lợi ra sao?
          </div>
          <div style={{ fontSize: 20, color: colors.textSecondary, fontWeight: 500 }}>
            Điều khoản dài dòng khó hiểu
          </div>
        </div>
      </div>

      {/* Thẻ 3: Thủ tục có phức tạp không? */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: interpolate(card3Spring, [0, 1], [-400, 320]),
          transform: `rotate(${-3 + wiggleAngle * 0.8}deg)`,
          opacity: card3Spring,
          backgroundColor: colors.bgWhite,
          padding: "24px 38px",
          borderRadius: 24,
          boxShadow: "0 18px 35px rgba(0,0,0,0.1), 0 4px 10px rgba(225,29,72,0.12)",
          border: `3px solid ${colors.brandPinkSoft}`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 44, color: colors.brandPink, fontWeight: 800 }}>⏳</span>
        <div>
          <div style={{ fontSize: 32, fontWeight: 800, color: colors.textPrimary }}>
            Thủ tục có phức tạp?
          </div>
          <div style={{ fontSize: 20, color: colors.textSecondary, fontWeight: 500 }}>
            Chờ đợi giấy tờ, bồi thường lâu
          </div>
        </div>
      </div>

      {/* NGÔI SAO Ý TƯỞNG EUREKA (Frames 480 - 690) */}
      {frame >= 480 && (
        <div
          style={{
            position: "absolute",
            top: 260,
            left: "50%",
            transform: `translateX(-50%) scale(${eurekaProgress}) rotate(${starRotate}deg)`,
            opacity: eurekaProgress,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 120,
              filter: "drop-shadow(0 10px 25px rgba(251, 191, 36, 0.6))",
            }}
          >
            💡
          </div>
        </div>
      )}

      {/* CÚ BÚNG TAY SNAP! & SÓNG FLASH MỞ MÀN (Frames 690 - 840) */}
      {isSnapTriggered && (
        <>
          {/* Vòng sóng năng lượng hồng bùng nổ */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: waveRadius,
              height: waveRadius,
              borderRadius: "50%",
              border: `8px solid ${colors.brandPink}`,
              backgroundColor: `${colors.brandPink}15`,
              opacity: waveOpacity,
              pointerEvents: "none",
            }}
          />

          {/* Banner chữ SNAP! BÚNG TAY ĐỂ BẮT ĐẦU */}
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${snapScale})`,
              backgroundColor: colors.brandPink,
              color: colors.bgWhite,
              padding: "24px 60px",
              borderRadius: 36,
              boxShadow: "0 25px 60px rgba(225, 29, 72, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: 24,
              border: `4px solid ${colors.bgWhite}`,
            }}
          >
            <span style={{ fontSize: 60 }}>✨</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-1px" }}>
                BÚNG TAY ĐỂ BẮT ĐẦU!
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  opacity: 0.95,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                TOPbaohiem.vn
              </div>
            </div>
            <span style={{ fontSize: 60 }}>🤌</span>
          </div>
        </>
      )}

      {/* LỚP FADE CHUYỂN TIẾP TRẮNG/HỒNG SANG CẢNH 2 */}
      {transitionToScene2 > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: colors.bgWhite,
            opacity: transitionToScene2,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
