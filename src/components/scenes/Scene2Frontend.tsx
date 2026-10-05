import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Heart,
  Flame,
  Plane,
  Car,
  Bike,
  ShieldCheck,
  CheckCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Building2,
  Scan,
  Award,
} from "lucide-react";

export const Scene2Frontend: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Hệ số scale dựa trên độ phân giải (3840x2160 chuẩn 4K, 1920x1080 chuẩn FHD)
  const is4K = width >= 3840;
  const scaleRatio = is4K ? 1 : height / 2160;

  // 1. BEAT 1: ENTRANCE TOÀN CẢNH (Frames 0 -> 160)
  const sceneEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // 3 Pill Badges xuất hiện dồn dập ở Beat 1
  const badge1Spring = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const badge2Spring = spring({ frame: frame - 30, fps, config: { damping: 12 } });
  const badge3Spring = spring({ frame: frame - 45, fps, config: { damping: 12 } });

  // 2. BEAT 2: BẢO HIỂM SỨC KHOẺ (Frames 140 -> 340) - Nổi Bật Nhất
  const healthActive = frame >= 140 && frame < 350;
  const healthProgress = interpolate(frame, [140, 180, 310, 350], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const healthScale = interpolate(healthProgress, [0, 1], [0.88, 1]);

  // 3. BEAT 3: BẢO HIỂM CHÁY NỔ (Frames 320 -> 520)
  const fireActive = frame >= 320 && frame < 530;
  const fireProgress = interpolate(frame, [320, 360, 490, 530], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fireScale = interpolate(fireProgress, [0, 1], [0.88, 1]);

  // 4. BEAT 4: BẢO HIỂM DU LỊCH (Frames 500 -> 700)
  const travelActive = frame >= 500 && frame < 710;
  const travelProgress = interpolate(frame, [500, 540, 670, 710], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const travelScale = interpolate(travelProgress, [0, 1], [0.88, 1]);

  // 5. BEAT 5: BẢO HIỂM XE MÁY & Ô TÔ + AI OCR PHỤ TRỢ (Frames 680 -> 860)
  const vehicleActive = frame >= 680 && frame < 870;
  const vehicleProgress = interpolate(frame, [680, 720, 830, 870], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vehicleScale = interpolate(vehicleProgress, [0, 1], [0.88, 1]);

  // 6. BEAT 6: SHOWCASE MA TRẬN 5 DÒNG SẢN PHẨM & ĐỐI TÁC HÀNG ĐẦU (Frames 850 -> 1020)
  const matrixActive = frame >= 850;
  const matrixProgress = interpolate(frame, [850, 890], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic Camera Zoom Punch tại các mốc chuyển dòng sản phẩm (dồn dập, giật nhịp bass)
  const beatPunches = [140, 320, 500, 680, 850];
  let cameraPunch = 1;
  for (const t of beatPunches) {
    if (frame >= t && frame <= t + 22) {
      const p = (frame - t) / 22;
      cameraPunch = 1 + Math.sin(p * Math.PI) * 0.045; // Nảy phóng to 4.5% rồi co lại
      break;
    }
  }

  // Hiệu ứng Origami Fold chuyển cảnh sang CMS ở cuối scene (frames 950 -> 1020)
  const foldProgress = interpolate(frame, [950, 1020], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneRotateY = interpolate(foldProgress, [0, 1], [0, -35]);
  const sceneExitScale = interpolate(foldProgress, [0, 1], [1, 0.85]);
  const sceneOpacity = interpolate(foldProgress, [0.7, 1], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "30px 60px 25px",
        transform: `perspective(1800px) rotateY(${sceneRotateY}deg) scale(${sceneExitScale * cameraPunch})`,
        opacity: sceneOpacity,
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      {/* ============================================================== */}
      {/* 1. TOP HEADER BRANDING & LỜI KHẲNG ĐỊNH SẢN PHẨM               */}
      {/* ============================================================== */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `translateY(${interpolate(sceneEntrance, [0, 1], [-40, 0])}px)`,
          opacity: sceneEntrance,
          zIndex: 10,
        }}
      >
        {/* Badge Bộ Công Thương & Brand TopBaoHiem */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "6px 22px",
            borderRadius: "999px",
            background: "rgba(225, 27, 116, 0.15)",
            border: "1px solid rgba(225, 27, 116, 0.5)",
            boxShadow: "0 0 25px rgba(225, 27, 116, 0.3)",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              background: "#E11B74",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={14} color="#ffffff" />
          </div>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#ff2e93",
              textTransform: "uppercase",
            }}
          >
            NỀN TẢNG UY TÍN ĐÃ ĐƯỢC XÁC NHẬN BỞI BỘ CÔNG THƯƠNG
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>|</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>
            TOPBAOHIEM.VN
          </span>
        </div>

        {/* Headline dồn dập */}
        <h2
          style={{
            fontSize: "48px",
            fontWeight: 900,
            color: "#ffffff",
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          Trang Chủ Bán Trọn Bộ{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ff2e93 0%, #ff80bf 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Các Dòng Bảo Hiểm Cốt Lõi
          </span>
        </h2>

        {/* 3 Thỏi Nam Châm USP Bay Vào Dồn Dập */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* USP 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "12px",
              background: "rgba(0, 229, 255, 0.08)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              transform: `scale(${badge1Spring})`,
              opacity: badge1Spring,
            }}
          >
            <ShieldCheck size={16} color="#00e5ff" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>
                So Sánh Dễ Dàng
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                Minh bạch, nhanh chóng
              </div>
            </div>
          </div>

          {/* USP 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "12px",
              background: "rgba(225, 27, 116, 0.12)",
              border: "1px solid rgba(225, 27, 116, 0.4)",
              transform: `scale(${badge2Spring})`,
              opacity: badge2Spring,
            }}
          >
            <Sparkles size={16} color="#ff2e93" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>
                Tiết Kiệm Chi Phí
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                Tối ưu quyền lợi tối đa
              </div>
            </div>
          </div>

          {/* USP 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "12px",
              background: "rgba(251, 191, 36, 0.08)",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              transform: `scale(${badge3Spring})`,
              opacity: badge3Spring,
            }}
          >
            <Award size={16} color="#fbbf24" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>
                An Toàn Bảo Mật
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                Bảo vệ dữ liệu cá nhân
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. KHU VỰC CHÍNH: SHOWCASE DỒN DẬP TỪNG DÒNG BẢO HIỂM           */}
      {/* ============================================================== */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "3400px",
          flex: 1,
          minHeight: 0,
          margin: "15px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ------------------------------------------------------------ */}
        {/* PRODUCT 1: BẢO HIỂM SỨC KHOẺ (NỔI BẬT NHẤT)                 */}
        {/* ------------------------------------------------------------ */}
        {healthActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: "35px",
              alignItems: "center",
              transform: `scale(${healthScale})`,
              opacity: healthProgress,
            }}
          >
            {/* Cột trái: Card sản phẩm nổi bật kiểu TopBaoHiem */}
            <div
              style={{
                position: "relative",
                height: "100%",
                background: "linear-gradient(145deg, rgba(26, 16, 38, 0.95), rgba(13, 21, 39, 0.95))",
                border: "3px solid #ff2e93",
                borderRadius: "30px",
                padding: "35px 42px",
                boxShadow: "0 0 50px rgba(255, 46, 147, 0.35), 0 25px 50px rgba(0, 0, 0, 0.7)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Badge NỔI BẬT */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span
                    style={{
                      background: "linear-gradient(90deg, #ff2e93, #e11b74)",
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: 900,
                      padding: "6px 20px",
                      borderRadius: "999px",
                      letterSpacing: "0.08em",
                      boxShadow: "0 0 18px rgba(255, 46, 147, 0.6)",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Sparkles size={18} /> NỔI BẬT NHẤT TRANG CHỦ
                  </span>
                  <span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 700 }}>
                    TOP-SELLING 2026
                  </span>
                </div>

                {/* Title & Icon Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "22px",
                      background: "rgba(255, 46, 147, 0.15)",
                      border: "2px solid #ff2e93",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 25px rgba(255, 46, 147, 0.4)",
                    }}
                  >
                    <Heart size={42} color="#ff2e93" />
                  </div>
                  <div>
                    <div style={{ fontSize: "20px", color: "#94a3b8", fontWeight: 600 }}>Bảo hiểm</div>
                    <h3
                      style={{
                        fontSize: "44px",
                        fontWeight: 900,
                        color: "#ffffff",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Sức khoẻ Toàn diện
                    </h3>
                  </div>
                </div>

                {/* Lợi ích dồn dập */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 46, 147, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#ff2e93" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Bảo lãnh viện phí tại 250+ bệnh viện quốc tế (Vinmec, FV, Hoàn Mỹ)
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 46, 147, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#ff2e93" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Chi trả nội trú, ngoại trú, phẫu thuật, thai sản & nha khoa
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 46, 147, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#ff2e93" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Bồi thường Online 100% qua App — Nhận tiền trong 24 giờ
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút hành động */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 30px",
                  borderRadius: "18px",
                  background: "linear-gradient(90deg, #ff2e93, #e11b74)",
                  color: "#ffffff",
                  fontSize: "22px",
                  fontWeight: 800,
                  boxShadow: "0 8px 25px rgba(255, 46, 147, 0.5)",
                  marginTop: "16px",
                }}
              >
                <span>So sánh báo giá Sức khoẻ ngay</span>
                <ArrowRight size={26} />
              </div>
            </div>

            {/* Cột phải: Screenshot giao diện thực tế 4K */}
            <div
              style={{
                position: "relative",
                height: "100%",
                borderRadius: "30px",
                overflow: "hidden",
                border: "2px solid rgba(255, 46, 147, 0.4)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
              }}
            >
              <Img
                src={staticFile("assets/trangchu/health_insurance.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  padding: "16px 24px",
                  borderRadius: "18px",
                  background: "rgba(10, 15, 30, 0.92)",
                  border: "1px solid rgba(255, 46, 147, 0.5)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Hạn mức chi trả bảo vệ</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#ff2e93" }}>
                    Tới 1 TỶ ĐỒNG / NĂM
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Đối tác bảo hiểm</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
                    Bảo Việt • PVI • BIC
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PRODUCT 2: BẢO HIỂM CHÁY NỔ (NGHỊ ĐỊNH 67/2023)              */}
        {/* ------------------------------------------------------------ */}
        {fireActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: "35px",
              alignItems: "center",
              transform: `scale(${fireScale})`,
              opacity: fireProgress,
            }}
          >
            {/* Cột trái: Card sản phẩm Cháy nổ */}
            <div
              style={{
                position: "relative",
                height: "100%",
                background: "linear-gradient(145deg, rgba(38, 20, 10, 0.95), rgba(13, 21, 39, 0.95))",
                border: "3px solid #f97316",
                borderRadius: "30px",
                padding: "35px 42px",
                boxShadow: "0 0 50px rgba(249, 115, 22, 0.35), 0 25px 50px rgba(0, 0, 0, 0.7)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span
                    style={{
                      background: "linear-gradient(90deg, #f97316, #ea580c)",
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: 900,
                      padding: "6px 20px",
                      borderRadius: "999px",
                      letterSpacing: "0.08em",
                      boxShadow: "0 0 18px rgba(249, 115, 22, 0.6)",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Flame size={18} /> PHÁP LÝ BẮT BUỘC DOANH NGHIỆP
                  </span>
                  <span style={{ fontSize: "16px", color: "#fbbf24", fontWeight: 700 }}>
                    NGHỊ ĐỊNH 67/2023/NĐ-CP
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "22px",
                      background: "rgba(249, 115, 22, 0.15)",
                      border: "2px solid #f97316",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 25px rgba(249, 115, 22, 0.4)",
                    }}
                  >
                    <Building2 size={42} color="#f97316" />
                  </div>
                  <div>
                    <div style={{ fontSize: "20px", color: "#94a3b8", fontWeight: 600 }}>Bảo hiểm</div>
                    <h3
                      style={{
                        fontSize: "44px",
                        fontWeight: 900,
                        color: "#ffffff",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Cháy nổ Bắt buộc
                    </h3>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(249, 115, 22, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#f97316" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Bảo vệ Tòa nhà, Chung cư, Văn phòng, Nhà xưởng & Kho bãi
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(249, 115, 22, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#f97316" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Bồi thường Hỏa hoạn, Nổ, Sét đánh & Thiệt hại tài sản liên đới
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(249, 115, 22, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#f97316" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Cấp Giấy chứng nhận PCCC tức thì — Đủ điều kiện nghiệm thu cơ quan
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 30px",
                  borderRadius: "18px",
                  background: "linear-gradient(90deg, #f97316, #ea580c)",
                  color: "#ffffff",
                  fontSize: "22px",
                  fontWeight: 800,
                  boxShadow: "0 8px 25px rgba(249, 115, 22, 0.5)",
                  marginTop: "16px",
                }}
              >
                <span>Tính phí Cháy nổ & Nhận báo giá ngay</span>
                <ArrowRight size={26} />
              </div>
            </div>

            {/* Cột phải: Ảnh 4K thực tế form cháy nổ */}
            <div
              style={{
                position: "relative",
                height: "100%",
                borderRadius: "30px",
                overflow: "hidden",
                border: "2px solid rgba(249, 115, 22, 0.4)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
              }}
            >
              <Img
                src={staticFile("assets/trangchu/fire_insurance.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  padding: "16px 24px",
                  borderRadius: "18px",
                  background: "rgba(10, 15, 30, 0.92)",
                  border: "1px solid rgba(249, 115, 22, 0.5)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Quy chuẩn pháp lý</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#fbbf24" }}>
                    CHUẨN BỘ CÔNG AN
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Đối tác bảo hiểm cấp đơn</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
                    PJICO • MIC • PVI
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PRODUCT 3: BẢO HIỂM DU LỊCH QUỐC TẾ & NỘI ĐỊA               */}
        {/* ------------------------------------------------------------ */}
        {travelActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: "35px",
              alignItems: "center",
              transform: `scale(${travelScale})`,
              opacity: travelProgress,
            }}
          >
            {/* Cột trái: Card sản phẩm Du lịch */}
            <div
              style={{
                position: "relative",
                height: "100%",
                background: "linear-gradient(145deg, rgba(10, 25, 45, 0.95), rgba(13, 21, 39, 0.95))",
                border: "3px solid #00e5ff",
                borderRadius: "30px",
                padding: "35px 42px",
                boxShadow: "0 0 50px rgba(0, 229, 255, 0.35), 0 25px 50px rgba(0, 0, 0, 0.7)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span
                    style={{
                      background: "linear-gradient(90deg, #00e5ff, #0284c7)",
                      color: "#070b14",
                      fontSize: "17px",
                      fontWeight: 900,
                      padding: "6px 20px",
                      borderRadius: "999px",
                      letterSpacing: "0.08em",
                      boxShadow: "0 0 18px rgba(0, 229, 255, 0.6)",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Plane size={18} /> CHUẨN VISA QUỐC TẾ
                  </span>
                  <span style={{ fontSize: "16px", color: "#00e5ff", fontWeight: 700 }}>
                    VISA SCHENGEN / US / UK
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "22px",
                      background: "rgba(0, 229, 255, 0.15)",
                      border: "2px solid #00e5ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 25px rgba(0, 229, 255, 0.4)",
                    }}
                  >
                    <Plane size={42} color="#00e5ff" />
                  </div>
                  <div>
                    <div style={{ fontSize: "20px", color: "#94a3b8", fontWeight: 600 }}>Bảo hiểm</div>
                    <h3
                      style={{
                        fontSize: "44px",
                        fontWeight: 900,
                        color: "#ffffff",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Du Lịch Quốc Tế & Trong Nước
                    </h3>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 229, 255, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#00e5ff" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Bồi thường y tế tới 50.000 EUR — Hợp chuẩn xin visa 100%
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 229, 255, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#00e5ff" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Cứu trợ y tế khẩn cấp toàn cầu 24/7 (SOS International)
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255, 255, 255, 0.04)",
                      borderRadius: "16px",
                      border: "1px solid rgba(0, 229, 255, 0.2)",
                    }}
                  >
                    <CheckCircle size={24} color="#00e5ff" />
                    <span style={{ fontSize: "20px", color: "#ffffff", fontWeight: 700 }}>
                      Bồi thường trễ chuyến bay & Thất lạc hành lý du lịch
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 30px",
                  borderRadius: "18px",
                  background: "linear-gradient(90deg, #00e5ff, #0284c7)",
                  color: "#070b14",
                  fontSize: "22px",
                  fontWeight: 900,
                  boxShadow: "0 8px 25px rgba(0, 229, 255, 0.5)",
                  marginTop: "16px",
                }}
              >
                <span>So sánh gói Du lịch & Cấp đơn điện tử</span>
                <ArrowRight size={26} />
              </div>
            </div>

            {/* Cột phải: Ảnh 4K thực tế gói du lịch */}
            <div
              style={{
                position: "relative",
                height: "100%",
                borderRadius: "30px",
                overflow: "hidden",
                border: "2px solid rgba(0, 229, 255, 0.4)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
              }}
            >
              <Img
                src={staticFile("assets/trangchu/travel_insurance.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  padding: "16px 24px",
                  borderRadius: "18px",
                  background: "rgba(10, 15, 30, 0.92)",
                  border: "1px solid rgba(0, 229, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Hợp chuẩn Đại Sứ Quán</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#00e5ff" }}>
                    100% ĐẠT VISA
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Thời gian cấp đơn</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
                    Sau 1 phút thanh toán
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PRODUCT 4 & 5: BẢO HIỂM XE CƠ GIỚI: TNDS XE MÁY & Ô TÔ      */}
        {/* (KÈM AI OCR PHỤ TRỢ NHẬP LIỆU SIÊU TỐC)                      */}
        {/* ------------------------------------------------------------ */}
        {vehicleActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              alignItems: "center",
              transform: `scale(${vehicleScale})`,
              opacity: vehicleProgress,
            }}
          >
            {/* THẺ TRÁI: BẢO HIỂM TNDS XE MÁY BẮT BUỘC */}
            <div
              style={{
                position: "relative",
                height: "100%",
                background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(10, 15, 30, 0.95))",
                border: "2px solid #10b981",
                borderRadius: "28px",
                padding: "28px 32px",
                boxShadow: "0 0 40px rgba(16, 185, 129, 0.25)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      padding: "5px 14px",
                      borderRadius: "999px",
                      fontWeight: 800,
                      fontSize: "16px",
                    }}
                  >
                    <Bike size={18} /> BẮT BUỘC LƯU HÀNH
                  </div>
                  <span style={{ fontSize: "24px", fontWeight: 900, color: "#10b981" }}>
                    66.000đ / năm
                  </span>
                </div>

                <h3 style={{ fontSize: "36px", fontWeight: 900, color: "#ffffff", margin: "12px 0 8px" }}>
                  Bảo hiểm TNDS Xe máy
                </h3>
                <p style={{ fontSize: "17px", color: "#94a3b8", margin: 0, lineHeight: 1.4 }}>
                  Bảo hiểm bắt buộc trách nhiệm dân sự đối với chủ xe máy theo quy định. Tránh bị phạt khi CSGT kiểm tra.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "17px", fontWeight: 600 }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Cấp Giấy chứng nhận điện tử QR ngay lập tức</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "17px", fontWeight: 600 }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Xuất trình cho CSGT trực tiếp trên điện thoại</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "17px", fontWeight: 600 }}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Đa dạng: Bảo Việt, PVI, PTI, PJICO</span>
                  </div>
                </div>
              </div>

              {/* Ảnh mockup xe máy */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  minHeight: "180px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  marginTop: "12px",
                }}
              >
                <Img
                  src={staticFile("assets/trangchu/motorbike_listing.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
            </div>

            {/* THẺ PHẢI: BẢO HIỂM TNDS Ô TÔ & VẬT CHẤT THÂN VỎ */}
            <div
              style={{
                position: "relative",
                height: "100%",
                background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(10, 15, 30, 0.95))",
                border: "2px solid #3b82f6",
                borderRadius: "28px",
                padding: "28px 32px",
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.25)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#60a5fa",
                      padding: "5px 14px",
                      borderRadius: "999px",
                      fontWeight: 800,
                      fontSize: "16px",
                    }}
                  >
                    <Car size={18} /> XE CƠ GIỚI & Ô TÔ
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: "#60a5fa" }}>
                    TNDS + THÂN VỎ 2 CHIỀU
                  </span>
                </div>

                <h3 style={{ fontSize: "36px", fontWeight: 900, color: "#ffffff", margin: "12px 0 8px" }}>
                  Bảo hiểm TNDS & Ô tô
                </h3>
                <p style={{ fontSize: "17px", color: "#94a3b8", margin: 0, lineHeight: 1.4 }}>
                  Bảo vệ xe hơi toàn diện: Tai nạn, Thủy kích, Mất cắp bộ phận, Cứu hộ 24/7 toàn quốc, Sửa chữa Gara chính hãng.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "17px", fontWeight: 600 }}>
                    <CheckCircle size={18} color="#3b82f6" />
                    <span>Cứu hộ miễn phí 24/7 không giới hạn số lần</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "17px", fontWeight: 600 }}>
                    <CheckCircle size={18} color="#3b82f6" />
                    <span>Bảo lãnh chi phí sửa chữa Gara chính hãng</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#e2e8f0", fontSize: "17px", fontWeight: 600 }}>
                    <CheckCircle size={18} color="#3b82f6" />
                    <span>Bồi thường nhanh chóng, minh bạch</span>
                  </div>
                </div>
              </div>

              {/* Ảnh mockup xe ô tô */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  minHeight: "180px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  marginTop: "12px",
                }}
              >
                <Img
                  src={staticFile("assets/trangchu/car_tnds.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />

                {/* MINI BADGE PHỤ TRỢ: AI OCR QUÉT CÀ VẸT XE (TIỆN ÍCH PHỤ) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    left: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    background: "rgba(10, 15, 30, 0.95)",
                    border: "1.5px solid #00e5ff",
                    boxShadow: "0 8px 20px rgba(0, 229, 255, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(0, 229, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Scan size={20} color="#00e5ff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#00e5ff" }}>
                        TIỆN ÍCH AI OCR PHỤ TRỢ:
                      </span>
                      <span
                        style={{
                          background: "#00e5ff",
                          color: "#070b14",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 900,
                        }}
                      >
                        2 GIÂY
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#e2e8f0" }}>
                      Quét đăng ký xe tự động điền biển số, số khung siêu tốc!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* PRODUCT 6: SHOWCASE MA TRẬN 5 SẢN PHẨM & LIÊN MINH ĐỐI TÁC    */}
        {/* (Frames 850 -> 1020 - THU NHỎ QUY MÔ, ĐỐI TÁC DỒN DẬP)        */}
        {/* ------------------------------------------------------------ */}
        {matrixActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "24px",
              opacity: matrixProgress,
              transform: `scale(${interpolate(matrixProgress, [0, 1], [0.94, 1])})`,
            }}
          >
            {/* Hàng 5 Card Sản phẩm thu nhỏ xếp cạnh nhau cực hoành tráng */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "20px",
                width: "100%",
              }}
            >
              {/* Card 1: Sức khoẻ */}
              <div
                style={{
                  background: "rgba(26, 16, 38, 0.95)",
                  border: "2px solid #ff2e93",
                  borderRadius: "22px",
                  padding: "22px 18px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(255, 46, 147, 0.25)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: "rgba(255, 46, 147, 0.2)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Heart size={28} color="#ff2e93" />
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#ff2e93",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 900,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    marginBottom: "6px",
                  }}
                >
                  NỔI BẬT
                </div>
                <div style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff" }}>
                  Bảo hiểm Sức khoẻ
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                  Bảo lãnh 250+ viện lớn
                </div>
              </div>

              {/* Card 2: Cháy nổ */}
              <div
                style={{
                  background: "rgba(38, 20, 10, 0.95)",
                  border: "2px solid #f97316",
                  borderRadius: "22px",
                  padding: "22px 18px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(249, 115, 22, 0.25)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: "rgba(249, 115, 22, 0.2)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Flame size={28} color="#f97316" />
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#f97316",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 900,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    marginBottom: "6px",
                  }}
                >
                  BẮT BUỘC
                </div>
                <div style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff" }}>
                  Bảo hiểm Cháy nổ
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                  Chuẩn NĐ 67/2023
                </div>
              </div>

              {/* Card 3: Du lịch */}
              <div
                style={{
                  background: "rgba(10, 25, 45, 0.95)",
                  border: "2px solid #00e5ff",
                  borderRadius: "22px",
                  padding: "22px 18px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(0, 229, 255, 0.25)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: "rgba(0, 229, 255, 0.2)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plane size={28} color="#00e5ff" />
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#00e5ff",
                    color: "#070b14",
                    fontSize: "11px",
                    fontWeight: 900,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    marginBottom: "6px",
                  }}
                >
                  TOÀN CẦU
                </div>
                <div style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff" }}>
                  Bảo hiểm Du lịch
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                  Chuẩn Visa Schengen
                </div>
              </div>

              {/* Card 4: Xe máy */}
              <div
                style={{
                  background: "rgba(15, 30, 25, 0.95)",
                  border: "2px solid #10b981",
                  borderRadius: "22px",
                  padding: "22px 18px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: "rgba(16, 185, 129, 0.2)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bike size={28} color="#10b981" />
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#10b981",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 900,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    marginBottom: "6px",
                  }}
                >
                  66K / NĂM
                </div>
                <div style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff" }}>
                  TNDS Xe máy
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                  Cấp ấn chỉ QR số 30s
                </div>
              </div>

              {/* Card 5: Ô tô */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "2px solid #3b82f6",
                  borderRadius: "22px",
                  padding: "22px 18px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: "rgba(59, 130, 246, 0.2)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Car size={28} color="#3b82f6" />
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#3b82f6",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 900,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    marginBottom: "6px",
                  }}
                >
                  2 CHIỀU
                </div>
                <div style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff" }}>
                  Bảo hiểm Ô tô
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "4px" }}>
                  Cứu hộ 24/7 & Thủy kích
                </div>
              </div>
            </div>

            {/* DẢI ĐỐI TÁC BẢO HIỂM HÀNG ĐẦU VIỆT NAM */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "24px",
                padding: "20px 36px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ĐỐI TÁC BẢO HIỂM CHIẾN LƯỢC CỦA CHÚNG TÔI
              </div>

              {/* 5 Hãng Bảo Hiểm Đỉnh Cao: PVI, BIC, PJICO, BAOVIET, MIC */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#ef4444",
                    letterSpacing: "0.05em",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  ★ PVI
                </div>
                <div style={{ width: "2px", height: "32px", background: "rgba(255,255,255,0.15)" }} />
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#10b981",
                    letterSpacing: "0.05em",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  BIC
                </div>
                <div style={{ width: "2px", height: "32px", background: "rgba(255,255,255,0.15)" }} />
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#06b6d4",
                    letterSpacing: "0.05em",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  PJICO
                </div>
                <div style={{ width: "2px", height: "32px", background: "rgba(255,255,255,0.15)" }} />
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#eab308",
                    letterSpacing: "0.05em",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  BAOVIET
                </div>
                <div style={{ width: "2px", height: "32px", background: "rgba(255,255,255,0.15)" }} />
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#ec4899",
                    letterSpacing: "0.05em",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  MIC
                </div>
              </div>

              <div style={{ fontSize: "16px", color: "#64748b", fontWeight: 600 }}>
                So sánh báo giá trực tiếp • Cấp ấn chỉ điện tử bảo vệ tức thì 100% hợp pháp
              </div>
            </div>

            {/* Dòng transition tease gợi mở sang Backend CMS */}
            <div
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: 800,
                color: "#00e5ff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Hàng ngàn đơn hàng trên Web được tự động xử lý như thế nào ở phía sau? ➔
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 3. BOTTOM TICKER: QUY TRÌNH 4 BƯỚC MUA SIÊU TỐC               */}
      {/* ============================================================== */}
      <div
        style={{
          width: "100%",
          maxWidth: "3400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 30px",
          borderRadius: "18px",
          background: "rgba(10, 15, 30, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ff2e93", fontWeight: 800, fontSize: "17px" }}>
          <Zap size={20} />
          <span>QUY TRÌNH 4 BƯỚC MUA BẢO HIỂM 1-CHẠM:</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "#ffffff", fontWeight: 700 }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#ff2e93", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>1</span>
            <span>Chọn Loại Bảo Hiểm</span>
          </div>
          <ArrowRight size={16} color="#64748b" />
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "#ffffff", fontWeight: 700 }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#00e5ff", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>2</span>
            <span>So Sánh Báo Giá Đa Hãng</span>
          </div>
          <ArrowRight size={16} color="#64748b" />
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "#ffffff", fontWeight: 700 }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>3</span>
            <span>Thanh Toán QR Siêu Tốc</span>
          </div>
          <ArrowRight size={16} color="#64748b" />
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "#ffffff", fontWeight: 700 }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#fbbf24", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>4</span>
            <span>Nhận Ấn Chỉ QR Điện Tử</span>
          </div>
        </div>
      </div>
    </div>
  );
};
