import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Award,
  PhoneCall,
  Globe,
  KeyRound,
  Cpu,
  Zap,
  TrendingUp,
  ShieldCheck,
  Code2,
  Users2,
  Coins,
  QrCode,
} from "lucide-react";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const is4K = width >= 3840;
  const s = is4K ? 1 : width / 3840;

  // Entrance springs
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const contentEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
  });

  const ctaEntrance = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14 },
  });

  // Hào quang phát sáng pulsing
  const pulseGlow = Math.sin((frame / 30) * Math.PI * 2) * 0.2 + 0.8;

  // Hiệu ứng floating 3D nhẹ của Thẻ bàn giao trung tâm
  const cardFloatY = Math.sin((frame / 45) * Math.PI * 2) * 8 * s;
  const cardTiltY = Math.cos((frame / 50) * Math.PI * 2) * 5;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${Math.round(45 * s)}px ${Math.round(70 * s)}px`,
        zIndex: 4,
      }}
    >
      {/* 1. Main Header & Slogan */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `scale(${logoSpring})`,
          opacity: logoSpring,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: `${Math.round(10 * s)}px`,
            padding: `${Math.round(8 * s)}px ${Math.round(24 * s)}px`,
            borderRadius: "999px",
            background: "rgba(251, 191, 36, 0.12)",
            border: "1px solid rgba(251, 191, 36, 0.4)",
            color: "#fbbf24",
            fontSize: `${Math.max(11, Math.round(17 * s))}px`,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: `${Math.round(12 * s)}px`,
            boxShadow: `0 0 ${40 * pulseGlow}px rgba(251, 191, 36, 0.25)`,
          }}
        >
          <Award size={Math.round(22 * s)} /> GIẢI PHÁP CHÌA KHÓA TRAO TAY (TURNKEY INSURTECH)
        </div>

        <h1
          style={{
            fontSize: `${Math.max(26, Math.round(68 * s))}px`,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: `0 0 ${Math.round(10 * s)}px 0`,
            background: "linear-gradient(135deg, #ffffff 0%, #00e5ff 50%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 40px rgba(0, 229, 255, 0.3)",
          }}
        >
          SỞ HỮU TOÀN BỘ NỀN TẢNG NGAY HÔM NAY
        </h1>

        <div style={{ fontSize: `${Math.max(13, Math.round(24 * s))}px`, color: "#94a3b8", fontWeight: 600 }}>
          Sẵn sàng bàn giao mã nguồn • Tự động hóa 100% • Tiếp quản mạng lưới doanh thu thực
        </div>
      </div>

      {/* 2. THE MASTER HANDOVER SHOWCASE: BỐ CỤC 3 KHỐI KHÔNG GIAN BẤT ĐỐI XỨNG */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1.4fr 1.1fr",
          gap: `${Math.round(30 * s)}px`,
          alignItems: "center",
          width: "100%",
          maxWidth: "3400px",
          transform: `translateY(${interpolate(contentEntrance, [0, 1], [40, 0])}px)`,
          opacity: contentEntrance,
          perspective: "1600px",
        }}
      >
        {/* CÁNH TRÁI: KHỐI CHUYỂN GIAO HẠ TẦNG & CODEBASE */}
        <div
          style={{
            background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(8, 12, 24, 0.95))",
            border: "1.5px solid rgba(0, 229, 255, 0.35)",
            borderRadius: `${Math.round(24 * s)}px`,
            padding: `${Math.round(30 * s)}px ${Math.round(26 * s)}px`,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.15)",
            display: "flex",
            flexDirection: "column",
            gap: `${Math.round(18 * s)}px`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: `${Math.round(12 * s)}px` }}>
            <div style={{ padding: `${Math.round(8 * s)}px`, borderRadius: "10px", background: "rgba(0, 229, 255, 0.15)", color: "#00e5ff" }}>
              <Code2 size={Math.round(24 * s)} />
            </div>
            <div>
              <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#00e5ff", fontWeight: 800, letterSpacing: "0.08em" }}>
                GÓI TÀI SẢN 01
              </div>
              <div style={{ fontSize: `${Math.max(13, Math.round(20 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                100% Mã Nguồn & Bản Quyền
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: `${Math.round(14 * s)}px` }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5ff", marginTop: "6px" }} />
              <div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, fontWeight: 700, color: "#ffffff" }}>Frontend Next.js Tối Ưu SEO</div>
                <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "2px" }}>Giao diện mua hàng 1-chạm, tích hợp sẵn AI OCR quét cà vẹt</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5ff", marginTop: "6px" }} />
              <div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, fontWeight: 700, color: "#ffffff" }}>Backend CMS Quản Trị Đa Phân Quyền</div>
                <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "2px" }}>Quản lý hợp đồng, kiểm soát hoa hồng, đối soát doanh thu</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00e5ff", marginTop: "6px" }} />
              <div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, fontWeight: 700, color: "#ffffff" }}>Database & Kịch Bản Triển Khai</div>
                <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "2px" }}>Bàn giao trọn vẹn CSDL, Docker, tài liệu kỹ thuật chi tiết</div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUNG TÂM: CHIẾC THẺ MASTER PLATFORM PASSPORT VÀNG KIM 3D NỔI BẬT */}
        <div
          style={{
            position: "relative",
            transform: `translateY(${cardFloatY}px) rotateX(6deg) rotateY(${cardTiltY}deg)`,
            transformStyle: "preserve-3d",
            background: "linear-gradient(135deg, #181f38 0%, #0a0e1c 50%, #151b30 100%)",
            border: "2px solid rgba(251, 191, 36, 0.8)",
            borderRadius: `${Math.round(28 * s)}px`,
            padding: `${Math.round(36 * s)}px ${Math.round(36 * s)}px`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.9), 0 0 ${60 * pulseGlow}px rgba(251, 191, 36, 0.4)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: `${Math.round(380 * s)}px`,
          }}
        >
          {/* Card Top: Brand & Chip */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: `${Math.round(44 * s)}px`,
                  height: `${Math.round(32 * s)}px`,
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #fbbf24, #d97706)",
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #fef08a",
                }}
              >
                <Cpu size={Math.round(20 * s)} color="#78350f" />
              </div>
              <div>
                <div style={{ fontSize: `${Math.max(10, Math.round(12 * s))}px`, color: "#fbbf24", fontWeight: 800, letterSpacing: "0.1em" }}>
                  INSURTECH MASTER KEY
                </div>
                <div style={{ fontSize: `${Math.max(13, Math.round(20 * s))}px`, fontWeight: 900, color: "#ffffff", letterSpacing: "0.02em" }}>
                  TOPBAOHIEM × INSUREGO
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: `${Math.max(10, Math.round(12 * s))}px`,
                fontWeight: 900,
                color: "#10b981",
                padding: `${Math.round(4 * s)}px ${Math.round(12 * s)}px`,
                borderRadius: "999px",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid #10b981",
              }}
            >
              READY TO TRANSFER
            </span>
          </div>

          {/* Card Middle: Master Contract Hash */}
          <div style={{ margin: `${Math.round(24 * s)}px 0`, textAlign: "center" }}>
            <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              MÃ BÀN GIAO CHÍNH THỨC
            </div>
            <div
              style={{
                fontFamily: "Space Grotesk, monospace",
                fontSize: `${Math.max(16, Math.round(26 * s))}px`,
                fontWeight: 800,
                color: "#fbbf24",
                letterSpacing: "0.12em",
                marginTop: "6px",
                textShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
              }}
            >
              TBH • 2026 • TURNKEY • 8899
            </div>
          </div>

          {/* Card Bottom: Cam kết bàn giao */}
          <div
            style={{
              padding: `${Math.round(12 * s)}px ${Math.round(18 * s)}px`,
              borderRadius: `${Math.round(14 * s)}px`,
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <KeyRound size={Math.round(20 * s)} color="#00e5ff" />
              <div style={{ fontSize: `${Math.max(11, Math.round(14 * s))}px`, color: "#ffffff", fontWeight: 700 }}>
                Bàn Giao Kỹ Thuật Trong 24 Giờ
              </div>
            </div>
            <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#fbbf24", fontWeight: 800 }}>
              HỖ TRỢ 1-ON-1
            </div>
          </div>
        </div>

        {/* CÁNH PHẢI: KHỐI THỪA HƯỞNG HỆ THỐNG KINH DOANH SẴN CÓ */}
        <div
          style={{
            background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(8, 12, 24, 0.95))",
            border: "1.5px solid rgba(16, 185, 129, 0.35)",
            borderRadius: `${Math.round(24 * s)}px`,
            padding: `${Math.round(30 * s)}px ${Math.round(26 * s)}px`,
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.15)",
            display: "flex",
            flexDirection: "column",
            gap: `${Math.round(18 * s)}px`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: `${Math.round(12 * s)}px` }}>
            <div style={{ padding: `${Math.round(8 * s)}px`, borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
              <TrendingUp size={Math.round(24 * s)} />
            </div>
            <div>
              <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#10b981", fontWeight: 800, letterSpacing: "0.08em" }}>
                GÓI TÀI SẢN 02
              </div>
              <div style={{ fontSize: `${Math.max(13, Math.round(20 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                Mạng Lưới Vận Hành Thực
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: `${Math.round(14 * s)}px` }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", marginTop: "6px" }} />
              <div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, fontWeight: 700, color: "#ffffff" }}>Mạng Lưới 75+ Đại Lý & KOLs</div>
                <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "2px" }}>Hệ thống refCode đa cấp, hoa hồng tự động phân bổ theo vai trò</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", marginTop: "6px" }} />
              <div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, fontWeight: 700, color: "#ffffff" }}>Cổng VNPAY & Dòng Tiền Tự Động</div>
                <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "2px" }}>Tiền về tài khoản ngay sau khi khách hàng quét mã thanh toán</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", marginTop: "6px" }} />
              <div>
                <div style={{ fontSize: `${Math.max(11, Math.round(16 * s))}px`, fontWeight: 700, color: "#ffffff" }}>Liên Minh 5 Đại Gia Bảo Hiểm</div>
                <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "2px" }}>Bảo Việt, PVI, PTI, PJICO, BIC với khung phí đại lý ưu đãi</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CALL TO ACTION & LIÊN HỆ BÀN GIAO TRỰC TIẾP */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: `${Math.round(36 * s)}px`,
          padding: `${Math.round(16 * s)}px ${Math.round(45 * s)}px`,
          borderRadius: "999px",
          background: "linear-gradient(90deg, rgba(0, 229, 255, 0.15), rgba(16, 185, 129, 0.15))",
          border: "2px solid rgba(0, 229, 255, 0.6)",
          boxShadow: `0 0 ${50 * pulseGlow}px rgba(0, 229, 255, 0.35)`,
          transform: `translateY(${interpolate(ctaEntrance, [0, 1], [30, 0])}px)`,
          opacity: ctaEntrance,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Globe size={Math.round(26 * s)} color="#00e5ff" />
          <span style={{ fontSize: `${Math.max(12, Math.round(22 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
            topbaohiem.vn • cms.topbaohiem.vn
          </span>
        </div>

        <div style={{ width: "2px", height: `${Math.round(28 * s)}px`, background: "rgba(255,255,255,0.25)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <PhoneCall size={Math.round(26 * s)} color="#10b981" />
          <span style={{ fontSize: `${Math.max(13, Math.round(24 * s))}px`, fontWeight: 800, color: "#10b981" }}>
            Hotline Bàn Giao: 088 999 6688
          </span>
        </div>
      </div>
    </div>
  );
};
