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
  Layers,
  FileCheck2,
} from "lucide-react";

export const Scene2Frontend: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Kích thước cuốn sách 3D Origami tối ưu theo khung hình
  const bookW = Math.round(width * 0.94);
  const bookH = Math.round(height * 0.80);
  const pageW = Math.round(bookW / 2);
  const is4K = width >= 3840;
  const s = is4K ? 1 : width / 3840; // Hệ số scale typographic

  // ---------------------------------------------------------------------------
  // 1. TIMELINE CÁC BEAT LẬT MỞ ORIGAMI (1020 frames @ 60fps)
  // Beat 0 (Mở sách): 0 -> 130
  // Beat 1 (Sức khoẻ): 130 -> 340
  // Beat 2 (Cháy nổ): 330 -> 540
  // Beat 3 (Du lịch): 530 -> 730
  // Beat 4 (Xe máy & Ô tô): 720 -> 890
  // Beat 5 (Gatefold 5 Đại Gia): 880 -> 1020
  // ---------------------------------------------------------------------------

  // Cú lướt camera không gian 3D tổng thể
  const cameraEntrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });

  // Camera Tilt điện ảnh nhẹ nhàng
  const camRotX = interpolate(frame, [0, 300, 600, 880, 1020], [14, 8, 12, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camRotY = interpolate(frame, [0, 250, 500, 750, 950], [-8, 6, -6, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camScale = interpolate(frame, [0, 200, 880, 1020], [0.92, 1, 1.02, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hiệu ứng Origami Flip cơ học của cánh sách bên phải (0 -> 90 -> 0 deg)
  // Mỗi lần đổi beat, cánh sách gập vào 90deg rồi mở bung ra nội dung mới
  const getFlipAngle = (f: number, start: number) => {
    if (f < start) return 0;
    if (f >= start && f < start + 18) {
      // Gập vào 0 -> 90 deg
      return interpolate(f, [start, start + 18], [0, 90]);
    }
    if (f >= start + 18 && f < start + 36) {
      // Bung mở ra 90 -> 0 deg với nội dung mới
      return interpolate(f, [start + 18, start + 36], [-90, 0]);
    }
    return 0;
  };

  const flip1 = getFlipAngle(frame, 130);
  const flip2 = getFlipAngle(frame, 330);
  const flip3 = getFlipAngle(frame, 530);
  const flip4 = getFlipAngle(frame, 720);

  // Xác định phân cảnh hiện tại
  const currentBeat =
    frame < 130 ? 0 : frame < 330 ? 1 : frame < 530 ? 2 : frame < 720 ? 3 : frame < 880 ? 4 : 5;

  // Hiệu ứng Pop-up 3D dựng đứng khỏi mặt giấy (Pop-up Springs)
  const popupHealth = spring({ frame: frame - 150, fps, config: { damping: 10, mass: 0.6 } });
  const popupFire = spring({ frame: frame - 350, fps, config: { damping: 10, mass: 0.6 } });
  const popupTravel = spring({ frame: frame - 550, fps, config: { damping: 10, mass: 0.6 } });
  const popupVehicle = spring({ frame: frame - 740, fps, config: { damping: 10, mass: 0.6 } });
  const gatefoldProgress = interpolate(frame, [880, 940], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cú lướt chuyển cảnh xuyên không gian sang Scene 3
  const exitProgress = interpolate(frame, [970, 1020], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = interpolate(exitProgress, [0.7, 1], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${Math.round(25 * s)}px ${Math.round(60 * s)}px`,
        overflow: "hidden",
        perspective: "2800px",
        opacity: sceneOpacity,
        zIndex: 3,
      }}
    >
      {/* =================================================================== */}
      {/* 1. TOP HEADER: EDITORIAL HIGH-TECH HEADER                           */}
      {/* =================================================================== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "3400px",
          zIndex: 50,
          transform: `translateY(${interpolate(cameraEntrance, [0, 1], [-40, 0])}px)`,
          opacity: cameraEntrance,
        }}
      >
        {/* Left Badge: Brand & Pháp lý */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              padding: `${Math.round(8 * s)}px ${Math.round(22 * s)}px`,
              borderRadius: "999px",
              background: "rgba(225, 27, 116, 0.18)",
              border: "1px solid rgba(225, 27, 116, 0.6)",
              boxShadow: "0 0 35px rgba(225, 27, 116, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ShieldCheck size={Math.round(20 * s)} color="#ff2e93" />
            <span
              style={{
                fontSize: `${Math.max(14, Math.round(18 * s))}px`,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              TOPBAOHIEM.VN
            </span>
          </div>

          <span
            style={{
              fontSize: `${Math.max(12, Math.round(15 * s))}px`,
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            XÁC NHẬN BỞI BỘ CÔNG THƯƠNG
          </span>
        </div>

        {/* Center: Title Khẳng Định Nghệ Thuật 3D */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: `${Math.max(20, Math.round(38 * s))}px`,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Interactive 3D Origami Catalogue{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff2e93, #00e5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hệ Sinh Thái Bảo Hiểm
            </span>
          </div>
        </div>

        {/* Right: Step Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: `${Math.round(8 * s)}px ${Math.round(20 * s)}px`,
            borderRadius: "14px",
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <Layers size={Math.round(18 * s)} color="#00e5ff" />
          <span style={{ fontSize: `${Math.max(12, Math.round(15 * s))}px`, color: "#00e5ff", fontWeight: 800 }}>
            {currentBeat === 0
              ? "TỔNG QUAN HỆ THỐNG"
              : currentBeat === 1
              ? "01. BẢO HIỂM SỨC KHOẺ"
              : currentBeat === 2
              ? "02. BẢO HIỂM CHÁY NỔ"
              : currentBeat === 3
              ? "03. BẢO HIỂM DU LỊCH"
              : currentBeat === 4
              ? "04. XE MÁY & Ô TÔ"
              : "05. ĐỐI TÁC CHIẾN LƯỢC"}
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. CUỐN SÁCH CÔNG NGHỆ 3D (3D SPATIAL ORIGAMI SLATE)                 */}
      {/* =================================================================== */}
      <div
        style={{
          position: "relative",
          width: `${bookW}px`,
          height: `${bookH}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
          transform: `rotateX(${camRotX}deg) rotateY(${camRotY}deg) scale(${camScale})`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Bóng đổ bề mặt sàn tự nhiên (Ambient Drop Shadow) */}
        <div
          style={{
            position: "absolute",
            bottom: `-${Math.round(50 * s)}px`,
            width: "90%",
            height: `${Math.round(100 * s)}px`,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,229,255,0.06) 50%, transparent 75%)",
            filter: `blur(${Math.round(35 * s)}px)`,
            transform: "rotateX(90deg)",
          }}
        />

        {/* ----------------------------------------------------------------- */}
        {/* TRANG TRÁI (LEFT PAGE SPREAD)                                     */}
        {/* ----------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pageW}px`,
            height: "100%",
            background: "linear-gradient(135deg, #0e1526 0%, #070b14 100%)",
            borderRadius: `${Math.round(24 * s)}px 0 0 ${Math.round(24 * s)}px`,
            border: "2px solid rgba(255, 255, 255, 0.12)",
            borderRight: "4px solid rgba(0, 0, 0, 0.9)", // Gáy sách
            boxShadow: `-${Math.round(20 * s)}px ${Math.round(30 * s)}px ${Math.round(60 * s)}px rgba(0,0,0,0.85)`,
            overflow: "hidden",
            padding: `${Math.round(35 * s)}px ${Math.round(45 * s)}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header Trang Trái */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: `${Math.round(16 * s)}px` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: `${Math.round(36 * s)}px`,
                    height: `${Math.round(36 * s)}px`,
                    borderRadius: "10px",
                    background: "rgba(225, 27, 116, 0.2)",
                    border: "1px solid #ff2e93",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={Math.round(20 * s)} color="#ff2e93" />
                </div>
                <div>
                  <div style={{ fontSize: `${Math.max(11, Math.round(13 * s))}px`, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    NỀN TẢNG BẢO HIỂM SỐ TOPBAOHIEM
                  </div>
                  <div style={{ fontSize: `${Math.max(16, Math.round(24 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                    {currentBeat <= 1
                      ? "So Sánh Minh Bạch — Mua Trực Tiếp"
                      : currentBeat === 2
                      ? "Pháp Lý Bắt Buộc — Cấp Đơn Tức Thì"
                      : currentBeat === 3
                      ? "Chuẩn Visa Quốc Tế — Cứu Trợ 24/7"
                      : "Lưu Hành Toàn Quốc — Cấp Ấn Chỉ QR"}
                  </div>
                </div>
              </div>

              <span
                style={{
                  background: "rgba(0, 229, 255, 0.12)",
                  color: "#00e5ff",
                  padding: `${Math.round(5 * s)}px ${Math.round(14 * s)}px`,
                  borderRadius: "999px",
                  fontSize: `${Math.max(11, Math.round(13 * s))}px`,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                }}
              >
                GIÁ GỐC ĐẠI GIA
              </span>
            </div>

            {/* Màn hình Viewport thực tế thay đổi theo từng Beat */}
            <div
              style={{
                position: "relative",
                width: "100%",
                flex: 1,
                minHeight: 0,
                margin: `${Math.round(14 * s)}px 0`,
                borderRadius: `${Math.round(18 * s)}px`,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
              }}
            >
              <Img
                src={
                  currentBeat <= 1
                    ? staticFile("assets/trangchu/home_main_hero.png")
                    : currentBeat === 2
                    ? staticFile("assets/trangchu/fire_insurance.png")
                    : currentBeat === 3
                    ? staticFile("assets/trangchu/travel_insurance.png")
                    : staticFile("assets/trangchu/motorbike_listing.png")
                }
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />

              {/* Gradient bóng đổ nhẹ chân trang */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 65%, rgba(7, 11, 20, 0.92) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: `${Math.round(16 * s)}px`,
                  left: `${Math.round(20 * s)}px`,
                  right: `${Math.round(20 * s)}px`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 700 }}>
                  {currentBeat <= 1
                    ? "Giao diện Trang chủ mua hàng 1-chạm"
                    : currentBeat === 2
                    ? "Form tính phí thẩm định Cháy nổ Nghị định 67"
                    : currentBeat === 3
                    ? "Biểu phí bảo hiểm du lịch quốc tế Schengen"
                    : "Ấn chỉ điện tử TNDS Xe máy & Ô tô"}
                </div>
                <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, color: "#00e5ff", fontWeight: 800 }}>
                  TỐC ĐỘ 30 GIÂY
                </div>
              </div>
            </div>
          </div>

          {/* 3 Cam Kết Cốt Lõi Trên Trang Trái */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: `${Math.round(14 * s)}px`,
              padding: `${Math.round(16 * s)}px ${Math.round(20 * s)}px`,
              borderRadius: `${Math.round(16 * s)}px`,
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#94a3b8", marginBottom: "2px" }}>01. SO SÁNH GIÁ</div>
              <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff" }}>Đa Hãng Trực Tiếp</div>
            </div>
            <div>
              <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#ff2e93", marginBottom: "2px" }}>02. CẤP ẤN CHỈ SỐ</div>
              <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff" }}>Hợp Pháp 100%</div>
            </div>
            <div>
              <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#10b981", marginBottom: "2px" }}>03. BỒI THƯỜNG</div>
              <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff" }}>Online Trong 24h</div>
            </div>
          </div>

          {/* Dải gradient gáy sách bên phải */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: `${Math.round(35 * s)}px`,
              background: "linear-gradient(to right, transparent, rgba(0, 0, 0, 0.7))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* TRANG PHẢI LẬT MỞ ORIGAMI 3D (RIGHT ORIGAMI PAGE)                 */}
        {/* ----------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            right: 0,
            width: `${pageW}px`,
            height: "100%",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            transform: `rotateY(${flip1 || flip2 || flip3 || flip4}deg)`,
            background: "linear-gradient(135deg, #090e1c 0%, #050811 100%)",
            borderRadius: `0 ${Math.round(24 * s)}px ${Math.round(24 * s)}px 0`,
            border: "2px solid rgba(255, 255, 255, 0.12)",
            borderLeft: "4px solid rgba(0, 0, 0, 0.9)", // Gáy sách
            boxShadow: `${Math.round(20 * s)}px ${Math.round(30 * s)}px ${Math.round(60 * s)}px rgba(0,0,0,0.85)`,
            overflow: "hidden",
            padding: `${Math.round(35 * s)}px ${Math.round(45 * s)}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* =============================================================== */}
          {/* PHÂN TRANG 1: BẢO HIỂM SỨC KHOẺ TOÀN DIỆN (NỔI BẬT NHẤT)       */}
          {/* =============================================================== */}
          {currentBeat <= 1 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, justifyContent: "space-between" }}>
              {/* Header Gói Sức khoẻ */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        background: "linear-gradient(90deg, #ff2e93, #e11b74)",
                        color: "#ffffff",
                        fontSize: `${Math.max(11, Math.round(14 * s))}px`,
                        fontWeight: 900,
                        padding: `${Math.round(4 * s)}px ${Math.round(16 * s)}px`,
                        borderRadius: "999px",
                        letterSpacing: "0.08em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Sparkles size={Math.round(14 * s)} /> NỔI BẬT NHẤT
                    </span>
                    <span style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 800 }}>
                      BẢO HIỂM SỨC KHOẺ TOÀN DIỆN
                    </span>
                  </div>
                  <div style={{ fontSize: `${Math.max(16, Math.round(24 * s))}px`, fontWeight: 900, color: "#ff2e93" }}>
                    TỚI 1 TỶ ĐỒNG / NĂM
                  </div>
                </div>
              </div>

              {/* POP-UP 3D BẬT ĐỨNG DẬY: BẢNG SO SÁNH & QUYỀN LỢI NỔI BẬT */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  margin: `${Math.round(12 * s)}px 0`,
                  transformOrigin: "bottom center",
                  transform: `rotateX(${interpolate(popupHealth, [0, 1], [60, 0])}deg) translateZ(${interpolate(popupHealth, [0, 1], [0, 50])}px)`,
                  boxShadow: `0 ${interpolate(popupHealth, [0, 1], [10, 40])}px ${interpolate(popupHealth, [0, 1], [20, 60])}px rgba(0,0,0,0.8)`,
                  borderRadius: `${Math.round(18 * s)}px`,
                  overflow: "hidden",
                  border: "2px solid rgba(255, 46, 147, 0.5)",
                  background: "#0d1322",
                  transition: "transform 0.1s ease-out",
                }}
              >
                <Img
                  src={staticFile("assets/trangchu/health_insurance.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />

                {/* 3D Floating Badge Bảo lãnh viện phí Vinmec / FV */}
                <div
                  style={{
                    position: "absolute",
                    top: `${Math.round(16 * s)}px`,
                    right: `${Math.round(16 * s)}px`,
                    padding: `${Math.round(10 * s)}px ${Math.round(16 * s)}px`,
                    borderRadius: `${Math.round(14 * s)}px`,
                    background: "rgba(10, 15, 30, 0.94)",
                    border: "2px solid #ff2e93",
                    boxShadow: "0 10px 30px rgba(255, 46, 147, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transformOrigin: "bottom center",
                    transform: `rotateX(${interpolate(popupHealth, [0, 1], [30, 0])}deg) translateZ(40px)`,
                  }}
                >
                  <Heart size={Math.round(24 * s)} color="#ff2e93" />
                  <div>
                    <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#94a3b8" }}>Bảo lãnh viện phí</div>
                    <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                      250+ BỆNH VIỆN QUỐC TẾ
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Lợi ích dồn dập */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${Math.round(12 * s)}px` }}>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,46,147,0.3)" }}>
                  <div style={{ color: "#ff2e93", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Vinmec • FV • Hoàn Mỹ</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Bảo lãnh viện phí trực tiếp không ứng tiền</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,46,147,0.3)" }}>
                  <div style={{ color: "#ff2e93", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Thai sản & Ngoại trú</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Chi trả toàn diện chi phí điều trị thực tế</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,46,147,0.3)" }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Bồi thường 24 giờ</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Nộp hồ sơ online nhận tiền ngay trong ngày</div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* PHÂN TRANG 2: BẢO HIỂM CHÁY NỔ BẮT BUỘC (NGHỊ ĐỊNH 67/2023)    */}
          {/* =============================================================== */}
          {currentBeat === 2 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        background: "linear-gradient(90deg, #f97316, #ea580c)",
                        color: "#ffffff",
                        fontSize: `${Math.max(11, Math.round(14 * s))}px`,
                        fontWeight: 900,
                        padding: `${Math.round(4 * s)}px ${Math.round(16 * s)}px`,
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Flame size={Math.round(14 * s)} /> PHÁP LÝ BẮT BUỘC
                    </span>
                    <span style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 800 }}>
                      BẢO HIỂM CHÁY NỔ NGHỊ ĐỊNH 67/2023
                    </span>
                  </div>
                  <div style={{ fontSize: `${Math.max(16, Math.round(24 * s))}px`, fontWeight: 900, color: "#f97316" }}>
                    CHUẨN BỘ CÔNG AN
                  </div>
                </div>
              </div>

              {/* POP-UP 3D CHÁY NỔ */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  margin: `${Math.round(12 * s)}px 0`,
                  transformOrigin: "bottom center",
                  transform: `rotateX(${interpolate(popupFire, [0, 1], [60, 0])}deg) translateZ(${interpolate(popupFire, [0, 1], [0, 50])}px)`,
                  boxShadow: `0 ${interpolate(popupFire, [0, 1], [10, 40])}px ${interpolate(popupFire, [0, 1], [20, 60])}px rgba(0,0,0,0.8)`,
                  borderRadius: `${Math.round(18 * s)}px`,
                  overflow: "hidden",
                  border: "2px solid rgba(249, 115, 22, 0.5)",
                  background: "#0d1322",
                  transition: "transform 0.1s ease-out",
                }}
              >
                <Img
                  src={staticFile("assets/trangchu/fire_insurance.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: `${Math.round(16 * s)}px`,
                    right: `${Math.round(16 * s)}px`,
                    padding: `${Math.round(10 * s)}px ${Math.round(16 * s)}px`,
                    borderRadius: `${Math.round(14 * s)}px`,
                    background: "rgba(10, 15, 30, 0.94)",
                    border: "2px solid #f97316",
                    boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transformOrigin: "bottom center",
                    transform: `rotateX(${interpolate(popupFire, [0, 1], [30, 0])}deg) translateZ(40px)`,
                  }}
                >
                  <Building2 size={Math.round(24 * s)} color="#f97316" />
                  <div>
                    <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#94a3b8" }}>Đối tượng bảo hiểm</div>
                    <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                      CHUNG CƯ • VĂN PHÒNG • KHO BÃI
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${Math.round(12 * s)}px` }}>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(249,115,22,0.3)" }}>
                  <div style={{ color: "#f97316", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Hợp chuẩn PCCC</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Cấp chứng nhận nghiệm thu cơ quan nhà nước</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(249,115,22,0.3)" }}>
                  <div style={{ color: "#f97316", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Cháy nổ & Sét đánh</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Bồi thường toàn diện tổn thất công trình tài sản</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(249,115,22,0.3)" }}>
                  <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>PJICO • MIC • PVI</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>So sánh khung phí chuẩn Bộ Tài Chính</div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* PHÂN TRANG 3: BẢO HIỂM DU LỊCH QUỐC TẾ (SCHENGEN / US / UK)      */}
          {/* =============================================================== */}
          {currentBeat === 3 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        background: "linear-gradient(90deg, #00e5ff, #0284c7)",
                        color: "#070b14",
                        fontSize: `${Math.max(11, Math.round(14 * s))}px`,
                        fontWeight: 900,
                        padding: `${Math.round(4 * s)}px ${Math.round(16 * s)}px`,
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Plane size={Math.round(14 * s)} /> TOÀN CẦU
                    </span>
                    <span style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 800 }}>
                      BẢO HIỂM DU LỊCH QUỐC TẾ
                    </span>
                  </div>
                  <div style={{ fontSize: `${Math.max(16, Math.round(24 * s))}px`, fontWeight: 900, color: "#00e5ff" }}>
                    HẠN MỨC 50.000 EUR
                  </div>
                </div>
              </div>

              {/* POP-UP 3D DU LỊCH */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  margin: `${Math.round(12 * s)}px 0`,
                  transformOrigin: "bottom center",
                  transform: `rotateX(${interpolate(popupTravel, [0, 1], [60, 0])}deg) translateZ(${interpolate(popupTravel, [0, 1], [0, 50])}px)`,
                  boxShadow: `0 ${interpolate(popupTravel, [0, 1], [10, 40])}px ${interpolate(popupTravel, [0, 1], [20, 60])}px rgba(0,0,0,0.8)`,
                  borderRadius: `${Math.round(18 * s)}px`,
                  overflow: "hidden",
                  border: "2px solid rgba(0, 229, 255, 0.5)",
                  background: "#0d1322",
                  transition: "transform 0.1s ease-out",
                }}
              >
                <Img
                  src={staticFile("assets/trangchu/travel_insurance.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: `${Math.round(16 * s)}px`,
                    right: `${Math.round(16 * s)}px`,
                    padding: `${Math.round(10 * s)}px ${Math.round(16 * s)}px`,
                    borderRadius: `${Math.round(14 * s)}px`,
                    background: "rgba(10, 15, 30, 0.94)",
                    border: "2px solid #00e5ff",
                    boxShadow: "0 10px 30px rgba(0, 229, 255, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transformOrigin: "bottom center",
                    transform: `rotateX(${interpolate(popupTravel, [0, 1], [30, 0])}deg) translateZ(40px)`,
                  }}
                >
                  <Plane size={Math.round(24 * s)} color="#00e5ff" />
                  <div>
                    <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#94a3b8" }}>Hợp chuẩn xin visa</div>
                    <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                      CHÂU ÂU • MỸ • ÚC • NHẬT • HÀN
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${Math.round(12 * s)}px` }}>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(0,229,255,0.3)" }}>
                  <div style={{ color: "#00e5ff", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Cứu trợ 24/7</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Hỗ trợ y tế toàn cầu SOS International</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(0,229,255,0.3)" }}>
                  <div style={{ color: "#00e5ff", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Trễ chuyến & Hành lý</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Chi trả bồi thường mất hành lý và hoãn bay</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(0,229,255,0.3)" }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Nhận đơn 1 phút</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>File song ngữ nộp Đại Sứ Quán ngay tức thì</div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* PHÂN TRANG 4: BẢO HIỂM PHƯƠNG TIỆN (XE MÁY & Ô TÔ)              */}
          {/* =============================================================== */}
          {currentBeat >= 4 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        background: "linear-gradient(90deg, #10b981, #059669)",
                        color: "#ffffff",
                        fontSize: `${Math.max(11, Math.round(14 * s))}px`,
                        fontWeight: 900,
                        padding: `${Math.round(4 * s)}px ${Math.round(16 * s)}px`,
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Bike size={Math.round(14 * s)} /> BẮT BUỘC LƯU HÀNH
                    </span>
                    <span style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, color: "#ffffff", fontWeight: 800 }}>
                      TNDS XE MÁY & Ô TÔ THÂN VỎ
                    </span>
                  </div>
                  <div style={{ fontSize: `${Math.max(16, Math.round(24 * s))}px`, fontWeight: 900, color: "#10b981" }}>
                    66.000Đ • CỨU HỘ 24/7
                  </div>
                </div>
              </div>

              {/* POP-UP 3D XE CƠ GIỚI & MINI CHIP AI OCR PHỤ TRỢ */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  margin: `${Math.round(12 * s)}px 0`,
                  transformOrigin: "bottom center",
                  transform: `rotateX(${interpolate(popupVehicle, [0, 1], [60, 0])}deg) translateZ(${interpolate(popupVehicle, [0, 1], [0, 50])}px)`,
                  boxShadow: `0 ${interpolate(popupVehicle, [0, 1], [10, 40])}px ${interpolate(popupVehicle, [0, 1], [20, 60])}px rgba(0,0,0,0.8)`,
                  borderRadius: `${Math.round(18 * s)}px`,
                  overflow: "hidden",
                  border: "2px solid rgba(16, 185, 129, 0.5)",
                  background: "#0d1322",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: `${Math.round(16 * s)}px`,
                  padding: `${Math.round(14 * s)}px`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <Img
                    src={staticFile("assets/trangchu/motorbike_listing.png")}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <Img
                    src={staticFile("assets/trangchu/car_tnds.png")}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />

                  {/* MINI BADGE PHỤ TRỢ: AI OCR CÀ VẸT */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: `${Math.round(10 * s)}px`,
                      left: `${Math.round(10 * s)}px`,
                      right: `${Math.round(10 * s)}px`,
                      padding: `${Math.round(10 * s)}px ${Math.round(14 * s)}px`,
                      borderRadius: "12px",
                      background: "rgba(10, 15, 30, 0.95)",
                      border: "1.5px solid #00e5ff",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Scan size={Math.round(18 * s)} color="#00e5ff" />
                    <div>
                      <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 800, color: "#00e5ff" }}>
                        AI OCR QUÉT CÀ VẸT 2S
                      </div>
                      <div style={{ fontSize: `${Math.max(9, Math.round(11 * s))}px`, color: "#e2e8f0" }}>
                        Tự động điền biển số xe máy và ô tô
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${Math.round(12 * s)}px` }}>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Xuất trình CSGT</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Mã QR điện tử lưu ngay trên ví điện thoại</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Cứu hộ ô tô 24/7</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Thân vỏ, thủy kích, sửa chữa Gara chính hãng</div>
                </div>
                <div style={{ padding: `${Math.round(10 * s)}px ${Math.round(12 * s)}px`, background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <div style={{ color: "#10b981", fontWeight: 800, fontSize: `${Math.max(11, Math.round(14 * s))}px` }}>Nhận ấn chỉ 30s</div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#e2e8f0", marginTop: "2px" }}>Bảo Việt • PVI • PTI • BIC • PJICO</div>
                </div>
              </div>
            </div>
          )}

          {/* Dải gradient gáy sách bên trái */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: `${Math.round(35 * s)}px`,
              background: "linear-gradient(to left, transparent, rgba(0, 0, 0, 0.7))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ================================================================= */}
        {/* TRANG GẤP MỞ RỘNG TOÀN CẢNH (GATEFOLD CLIMAX — 5 ĐẠI GIA BẢO HIỂM) */}
        {/* ================================================================= */}
        {gatefoldProgress > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(9, 14, 28, 0.98) 0%, rgba(5, 8, 17, 0.99) 100%)",
              backdropFilter: "blur(24px)",
              border: "2px solid rgba(0, 229, 255, 0.45)",
              borderRadius: `${Math.round(24 * s)}px`,
              boxShadow: "0 0 120px rgba(0, 229, 255, 0.3), 0 40px 100px rgba(0,0,0,0.95)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: `${Math.round(32 * s)}px ${Math.round(50 * s)}px`,
              zIndex: 60,
              opacity: gatefoldProgress,
              transform: `scale(${interpolate(gatefoldProgress, [0, 1], [0.95, 1])})`,
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: `${Math.max(12, Math.round(18 * s))}px`,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  color: "#00e5ff",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                LIÊN MINH ĐỐI TÁC CHIẾN LƯỢC TOÀN DIỆN
              </div>
              <div style={{ fontSize: `${Math.max(22, Math.round(44 * s))}px`, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Hội Tụ 5 Đại Gia Bảo Hiểm Lớn Nhất Việt Nam
              </div>

              {/* 3 Metrics cam kết uy tín */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: `${Math.round(40 * s)}px`,
                  marginTop: `${Math.round(16 * s)}px`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle color="#10b981" size={Math.round(20 * s)} />
                  <span style={{ fontSize: `${Math.max(11, Math.round(15 * s))}px`, color: "#e2e8f0", fontWeight: 700 }}>
                    100% Ấn Chỉ Điện Tử Hợp Pháp
                  </span>
                </div>
                <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Zap color="#00e5ff" size={Math.round(20 * s)} />
                  <span style={{ fontSize: `${Math.max(11, Math.round(15 * s))}px`, color: "#e2e8f0", fontWeight: 700 }}>
                    Cấp Đơn Tức Thì Trong 30 Giây
                  </span>
                </div>
                <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ShieldCheck color="#fbbf24" size={Math.round(20 * s)} />
                  <span style={{ fontSize: `${Math.max(11, Math.round(15 * s))}px`, color: "#e2e8f0", fontWeight: 700 }}>
                    Bảo Lãnh Viện Phí & Cứu Hộ Toàn Quốc
                  </span>
                </div>
              </div>
            </div>

            {/* 5 CỘT TRỤ ĐIỂM SÁNG KIM LOẠI NỔI BẬT DỰNG ĐỨNG */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: `${Math.round(18 * s)}px`,
                width: "100%",
                margin: `${Math.round(16 * s)}px 0`,
              }}
            >
              {/* 1. PVI */}
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(239, 68, 68, 0.18), rgba(15, 23, 42, 0.95))",
                  border: "2px solid #ef4444",
                  borderRadius: `${Math.round(20 * s)}px`,
                  padding: `${Math.round(30 * s)}px ${Math.round(20 * s)}px`,
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(239, 68, 68, 0.35)",
                  transform: `translateY(${interpolate(gatefoldProgress, [0, 1], [40, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: `${Math.max(24, Math.round(44 * s))}px`, fontWeight: 900, color: "#ef4444", fontFamily: "Space Grotesk, sans-serif" }}>
                    ★ PVI
                  </div>
                  <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff", marginTop: "8px" }}>
                    BẢO HIỂM DẦU KHÍ
                  </div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "4px" }}>
                    Doanh thu số 1 phi nhân thọ
                  </div>
                </div>
                <div style={{ marginTop: `${Math.round(16 * s)}px`, padding: `${Math.round(6 * s)}px`, background: "rgba(239,68,68,0.15)", borderRadius: "10px", border: "1px solid rgba(239,68,68,0.4)", fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 800, color: "#fca5a5" }}>
                  CHIẾT KHẤU ĐẠI LÝ TỚI 35%
                </div>
              </div>

              {/* 2. BIC */}
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(16, 185, 129, 0.18), rgba(15, 23, 42, 0.95))",
                  border: "2px solid #10b981",
                  borderRadius: `${Math.round(20 * s)}px`,
                  padding: `${Math.round(30 * s)}px ${Math.round(20 * s)}px`,
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(16, 185, 129, 0.35)",
                  transform: `translateY(${interpolate(gatefoldProgress, [0, 1], [60, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: `${Math.max(24, Math.round(44 * s))}px`, fontWeight: 900, color: "#10b981", fontFamily: "Space Grotesk, sans-serif" }}>
                    BIC
                  </div>
                  <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff", marginTop: "8px" }}>
                    BẢO HIỂM BIDV
                  </div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "4px" }}>
                    Uy tín tài chính ngân hàng
                  </div>
                </div>
                <div style={{ marginTop: `${Math.round(16 * s)}px`, padding: `${Math.round(6 * s)}px`, background: "rgba(16,185,129,0.15)", borderRadius: "10px", border: "1px solid rgba(16,185,129,0.4)", fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 800, color: "#6ee7b7" }}>
                  CHIẾT KHẤU ĐẠI LÝ TỚI 40%
                </div>
              </div>

              {/* 3. PJICO */}
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(6, 182, 212, 0.18), rgba(15, 23, 42, 0.95))",
                  border: "2px solid #06b6d4",
                  borderRadius: `${Math.round(20 * s)}px`,
                  padding: `${Math.round(30 * s)}px ${Math.round(20 * s)}px`,
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(6, 182, 212, 0.35)",
                  transform: `translateY(${interpolate(gatefoldProgress, [0, 1], [80, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: `${Math.max(24, Math.round(44 * s))}px`, fontWeight: 900, color: "#06b6d4", fontFamily: "Space Grotesk, sans-serif" }}>
                    PJICO
                  </div>
                  <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff", marginTop: "8px" }}>
                    PETROLIMEX
                  </div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "4px" }}>
                    Mạng lưới xăng dầu & xe
                  </div>
                </div>
                <div style={{ marginTop: `${Math.round(16 * s)}px`, padding: `${Math.round(6 * s)}px`, background: "rgba(6,182,212,0.15)", borderRadius: "10px", border: "1px solid rgba(6,182,212,0.4)", fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 800, color: "#67e8f9" }}>
                  CHIẾT KHẤU ĐẠI LÝ TỚI 38%
                </div>
              </div>

              {/* 4. BAOVIET */}
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(234, 179, 8, 0.18), rgba(15, 23, 42, 0.95))",
                  border: "2px solid #eab308",
                  borderRadius: `${Math.round(20 * s)}px`,
                  padding: `${Math.round(30 * s)}px ${Math.round(20 * s)}px`,
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(234, 179, 8, 0.35)",
                  transform: `translateY(${interpolate(gatefoldProgress, [0, 1], [100, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: `${Math.max(22, Math.round(40 * s))}px`, fontWeight: 900, color: "#eab308", fontFamily: "Space Grotesk, sans-serif" }}>
                    BAOVIET
                  </div>
                  <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff", marginTop: "8px" }}>
                    BẢO VIỆT
                  </div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "4px" }}>
                    Tập đoàn bảo hiểm quốc gia
                  </div>
                </div>
                <div style={{ marginTop: `${Math.round(16 * s)}px`, padding: `${Math.round(6 * s)}px`, background: "rgba(234,179,8,0.15)", borderRadius: "10px", border: "1px solid rgba(234,179,8,0.4)", fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 800, color: "#fde047" }}>
                  CHIẾT KHẤU ĐẠI LÝ TỚI 35%
                </div>
              </div>

              {/* 5. MIC */}
              <div
                style={{
                  background: "linear-gradient(145deg, rgba(236, 72, 153, 0.18), rgba(15, 23, 42, 0.95))",
                  border: "2px solid #ec4899",
                  borderRadius: `${Math.round(20 * s)}px`,
                  padding: `${Math.round(30 * s)}px ${Math.round(20 * s)}px`,
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(236, 72, 153, 0.35)",
                  transform: `translateY(${interpolate(gatefoldProgress, [0, 1], [120, 0])}px)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: `${Math.max(24, Math.round(44 * s))}px`, fontWeight: 900, color: "#ec4899", fontFamily: "Space Grotesk, sans-serif" }}>
                    MIC
                  </div>
                  <div style={{ fontSize: `${Math.max(12, Math.round(16 * s))}px`, fontWeight: 800, color: "#ffffff", marginTop: "8px" }}>
                    BẢO HIỂM QUÂN ĐỘI
                  </div>
                  <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "4px" }}>
                    Bảo chứng pháp lý & an toàn
                  </div>
                </div>
                <div style={{ marginTop: `${Math.round(16 * s)}px`, padding: `${Math.round(6 * s)}px`, background: "rgba(236,72,153,0.15)", borderRadius: "10px", border: "1px solid rgba(236,72,153,0.4)", fontSize: `${Math.max(10, Math.round(13 * s))}px`, fontWeight: 800, color: "#f472b6" }}>
                  CHIẾT KHẤU ĐẠI LÝ TỚI 40%
                </div>
              </div>
            </div>

            {/* Dòng kích nổ chuyển tiếp sang CMS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                fontSize: `${Math.max(14, Math.round(22 * s))}px`,
                fontWeight: 900,
                color: "#00e5ff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <Zap size={Math.round(24 * s)} />
              <span>Toàn bộ đơn hàng được đồng bộ tự động 100% về Cỗ máy vận hành InsureGO CMS</span>
              <ArrowRight size={Math.round(24 * s)} />
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 3. BOTTOM FOOTER PROGRESS BAR NGHỆ THUẬT                           */}
      {/* =================================================================== */}
      <div
        style={{
          width: "100%",
          maxWidth: "3400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${Math.round(10 * s)}px ${Math.round(26 * s)}px`,
          borderRadius: "14px",
          background: "rgba(10, 15, 30, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 50,
        }}
      >
        <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#64748b", fontWeight: 700 }}>
          HỆ THỐNG INSURTECH TOPBAOHIEM • GIẢI PHÁP CHÌA KHÓA TRAO TAY CHO DOANH NGHIỆP
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: `${Math.round(18 * s)}px` }}>
          <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: currentBeat <= 1 ? "#ff2e93" : "#64748b", fontWeight: 800 }}>
            • SỨC KHOẺ
          </div>
          <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: currentBeat === 2 ? "#f97316" : "#64748b", fontWeight: 800 }}>
            • CHÁY NỔ
          </div>
          <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: currentBeat === 3 ? "#00e5ff" : "#64748b", fontWeight: 800 }}>
            • DU LỊCH
          </div>
          <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: currentBeat === 4 ? "#10b981" : "#64748b", fontWeight: 800 }}>
            • XE MÁY & Ô TÔ
          </div>
          <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: currentBeat === 5 ? "#eab308" : "#64748b", fontWeight: 800 }}>
            • 5 ĐẠI GIA BẢO HIỂM
          </div>
        </div>
      </div>
    </div>
  );
};
