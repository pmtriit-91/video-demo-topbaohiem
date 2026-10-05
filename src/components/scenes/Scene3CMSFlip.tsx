import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Database, CheckCircle2, ShieldAlert, Cpu, BarChart3, Clock, ArrowUpRight } from "lucide-react";

export const Scene3CMSFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const is4K = width >= 3840;
  const s = is4K ? 1 : width / 3840;

  // 3D Flip in từ góc xoay sau Scene 2 (frames 0 -> 40)
  const flipEntrance = spring({
    frame,
    fps,
    config: { damping: 16, mass: 1 },
  });

  const sceneRotateY = interpolate(flipEntrance, [0, 1], [40, 0]);
  const sceneScale = interpolate(flipEntrance, [0, 1], [0.88, 1]);
  const sceneOpacity = interpolate(flipEntrance, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Camera lướt chậm trên bề mặt Dashboard Panorama (frames 0 -> 1200)
  const panoramicScrollY = interpolate(frame, [0, 1200], [0, -320 * s], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hiệu ứng nhảy số tiền doanh thu (Number counter rolling)
  const revenueCounter = interpolate(frame, [40, 160], [0, 8388300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contractsCounter = Math.floor(
    interpolate(frame, [40, 140], [0, 134], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Modal Chi Tiết Hợp Đồng trượt vào (frames 180 -> 240)
  const modalSpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14 },
  });

  // Chuyển trạng thái hợp đồng (từ Chờ Duyệt sang Đã Cấp Ấn Chỉ frames 300)
  const isApproved = frame > 300;

  // Cuối scene: Thu nhỏ nhẹ chuẩn bị sang Scene 4 (frames 1050 -> 1200)
  const exitScale = interpolate(frame, [1100, 1200], [1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [1130, 1200], [1, 0], {
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
        transform: `perspective(1800px) rotateY(${sceneRotateY}deg) scale(${sceneScale * exitScale})`,
        opacity: sceneOpacity * exitOpacity,
        zIndex: 3,
      }}
    >
      {/* Header Phân Hệ CMS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: `${Math.round(18 * s)}px`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: `${Math.round(8 * s)}px`,
            padding: `${Math.round(6 * s)}px ${Math.round(20 * s)}px`,
            borderRadius: "999px",
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#10b981",
            fontSize: `${Math.max(10, Math.round(15 * s))}px`,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: `${Math.round(8 * s)}px`,
          }}
        >
          <Cpu size={Math.round(18 * s)} /> TẦNG 2: CỖ MÁY VẬN HÀNH NGẦM (CMS BACK-OFFICE)
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
          InsureGO CMS — Tự Động Hóa 100% Vòng Đời Hợp Đồng & Dòng Tiền
        </h2>
      </div>

      {/* Main Workspace (Dashboard Layout + Floating Modal) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.55fr 1fr",
          gap: `${Math.round(28 * s)}px`,
          width: "100%",
          maxWidth: "3400px",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* CỘT TRÁI: BỀ MẶT DASHBOARD NẰM NGHIÊNG 3D VỚI CAMERA TRƯỢT */}
        <div
          style={{
            position: "relative",
            background: "rgba(10, 15, 29, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.4)",
            borderRadius: `${Math.round(22 * s)}px`,
            overflow: "hidden",
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top Bar giả lập Window Admin */}
          <div
            style={{
              padding: `${Math.round(12 * s)}px ${Math.round(20 * s)}px`,
              background: "rgba(15, 23, 42, 0.95)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: `${Math.round(10 * s)}px` }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: `${Math.round(10 * s)}px`, height: `${Math.round(10 * s)}px`, borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: `${Math.round(10 * s)}px`, height: `${Math.round(10 * s)}px`, borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: `${Math.round(10 * s)}px`, height: `${Math.round(10 * s)}px`, borderRadius: "50%", background: "#10b981" }} />
              </div>
              <span style={{ fontSize: `${Math.max(11, Math.round(14 * s))}px`, color: "#94a3b8", fontWeight: 600 }}>
                cms.topbaohiem.vn • Trung Tâm Chỉ Huy
              </span>
            </div>

            {/* 3 Thẻ Chỉ Số Nổi Nhanh */}
            <div style={{ display: "flex", gap: `${Math.round(20 * s)}px` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={Math.round(15 * s)} color="#00e5ff" />
                <span style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#e2e8f0" }}>Thời gian thực (Realtime)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={Math.round(15 * s)} color="#10b981" />
                <span style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#10b981", fontWeight: 700 }}>Hệ thống: SẴN SÀNG</span>
              </div>
            </div>
          </div>

          {/* Khối Ảnh Dashboard Cuộn Parallax */}
          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${panoramicScrollY}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              <Img
                src={staticFile("assets/cms/dashboard_panoramic.png")}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>

            {/* Floating Live KPI Overlays (4 Hộp Số Nhảy) */}
            <div
              style={{
                position: "absolute",
                top: `${Math.round(20 * s)}px`,
                left: `${Math.round(20 * s)}px`,
                right: `${Math.round(20 * s)}px`,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: `${Math.round(14 * s)}px`,
                zIndex: 10,
              }}
            >
              {/* KPI 1 */}
              <div
                style={{
                  background: "rgba(10, 15, 30, 0.92)",
                  border: "1px solid rgba(0, 229, 255, 0.5)",
                  borderRadius: `${Math.round(16 * s)}px`,
                  padding: `${Math.round(14 * s)}px`,
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 10px 30px rgba(0, 229, 255, 0.2)",
                }}
              >
                <div style={{ fontSize: `${Math.max(9, Math.round(12 * s))}px`, color: "#94a3b8", marginBottom: "4px" }}>Tổng Hợp Đồng Thực Tế</div>
                <div className="font-mono-numbers" style={{ fontSize: `${Math.max(16, Math.round(30 * s))}px`, fontWeight: 800, color: "#ffffff" }}>
                  {contractsCounter}+
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981", fontSize: `${Math.max(9, Math.round(12 * s))}px`, marginTop: "2px" }}>
                  <ArrowUpRight size={Math.round(13 * s)} /> +24% tháng này
                </div>
              </div>

              {/* KPI 2 */}
              <div
                style={{
                  background: "rgba(10, 15, 30, 0.92)",
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  borderRadius: `${Math.round(16 * s)}px`,
                  padding: `${Math.round(14 * s)}px`,
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
                }}
              >
                <div style={{ fontSize: `${Math.max(9, Math.round(12 * s))}px`, color: "#94a3b8", marginBottom: "4px" }}>Tổng Doanh Thu Phí</div>
                <div className="font-mono-numbers" style={{ fontSize: `${Math.max(14, Math.round(26 * s))}px`, fontWeight: 800, color: "#10b981" }}>
                  {Math.floor(revenueCounter).toLocaleString("vi-VN")} đ
                </div>
                <div style={{ color: "#94a3b8", fontSize: `${Math.max(8, Math.round(11 * s))}px`, marginTop: "2px" }}>Cổng VNPAY ghi nhận tức thì</div>
              </div>

              {/* KPI 3 */}
              <div
                style={{
                  background: "rgba(10, 15, 30, 0.92)",
                  border: "1px solid rgba(251, 191, 36, 0.5)",
                  borderRadius: `${Math.round(16 * s)}px`,
                  padding: `${Math.round(14 * s)}px`,
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 10px 30px rgba(251, 191, 36, 0.2)",
                }}
              >
                <div style={{ fontSize: `${Math.max(9, Math.round(12 * s))}px`, color: "#94a3b8", marginBottom: "4px" }}>Tốc Độ Cấp Ấn Chỉ</div>
                <div className="font-mono-numbers" style={{ fontSize: `${Math.max(16, Math.round(30 * s))}px`, fontWeight: 800, color: "#fbbf24" }}>
                  03 GIÂY
                </div>
                <div style={{ color: "#10b981", fontSize: `${Math.max(8, Math.round(11 * s))}px`, marginTop: "2px" }}>100% Không dùng giấy tờ</div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: QUY TRÌNH DUYỆT TỰ ĐỘNG & MODAL CHI TIẾT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${Math.round(16 * s)}px`,
            height: "100%",
          }}
        >
          {/* Card Phê Duyệt Tự Động */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              border: `2px solid ${isApproved ? "#10b981" : "#f59e0b"}`,
              borderRadius: `${Math.round(18 * s)}px`,
              padding: `${Math.round(16 * s)}px ${Math.round(20 * s)}px`,
              boxShadow: `0 15px 35px ${isApproved ? "rgba(16, 185, 129, 0.25)" : "rgba(245, 158, 11, 0.2)"}`,
              transition: "border 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: `${Math.round(8 * s)}px` }}>
              <span style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", fontWeight: 600 }}>TRẠNG THÁI XỬ LÝ ĐƠN HÀNG:</span>
              <span
                style={{
                  background: isApproved ? "#10b981" : "#f59e0b",
                  color: "#070b14",
                  padding: `${Math.round(4 * s)}px ${Math.round(12 * s)}px`,
                  borderRadius: "999px",
                  fontSize: `${Math.max(10, Math.round(12 * s))}px`,
                  fontWeight: 800,
                }}
              >
                {isApproved ? "✓ ĐÃ CẤP ẤN CHỈ" : "ĐANG ĐỐI SOÁT VNPAY"}
              </span>
            </div>
            <div style={{ fontSize: `${Math.max(13, Math.round(18 * s))}px`, color: "#ffffff", fontWeight: 700 }}>
              Mã HĐ: <span style={{ color: "#00e5ff" }}>HD-2026-XEMAY-8921</span>
            </div>
            <div style={{ fontSize: `${Math.max(10, Math.round(13 * s))}px`, color: "#94a3b8", marginTop: "4px" }}>
              Khách hàng: Nguyễn Văn A • Gói: TNDS Bắt buộc PTI • Phí: 66.000đ
            </div>
          </div>

          {/* Modal Chi Tiết Hợp Đồng Bóc Tách 4K */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: `${Math.round(18 * s)}px`,
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)",
              transform: `translateY(${interpolate(modalSpring, [0, 1], [60, 0])}px)`,
              opacity: modalSpring,
            }}
          >
            <Img
              src={staticFile("assets/cms/contract_detail_modal.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top left",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
