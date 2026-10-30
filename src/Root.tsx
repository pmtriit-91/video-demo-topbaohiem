import React from "react";
import { Composition } from "remotion";
import { MainVideoV2 } from "./MainVideoV2";
import { VIDEO_CONFIG_V2 } from "./config/videoConfigV2";
import { Scene1_ProblemSnap } from "./components/scenes/v2/Scene1_ProblemSnap";
import { Scene2_TopBaoHiemShowcase } from "./components/scenes/v2/Scene2_TopBaoHiemShowcase";
import { Scene3_TravelAdventure, StaticStaging34 } from "./components/scenes/v2/Scene3_TravelAdventure";
import { Scene4_InsuranceCategories } from "./components/scenes/v2/Scene4_InsuranceCategories";
import { Scene5_PurchaseFlowCMS } from "./components/scenes/v2/Scene5_PurchaseFlowCMS";
import { Scene6_OutroCTA } from "./components/scenes/v2/Scene6_OutroCTA";
import { Scene1Scene2Bridge } from "./components/preview/Scene1Scene2Bridge";
import { Scene1Scene2Combined } from "./components/preview/Scene1Scene2Combined";

export const RemotionRoot: React.FC = () => {
  const { totalFrames, fps, scenes } = VIDEO_CONFIG_V2;

  return (
    <>
      {/* 🌟 1. MASTER VIDEO PHONG CÁCH 2 - 4K UHD (3840 x 2160 @ 60fps) 🌟 */}
      <Composition
        id="TopBaoHiemV2-4K"
        component={MainVideoV2}
        durationInFrames={totalFrames}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* 🌟 2. MASTER VIDEO PHONG CÁCH 2 - 2K QHD (2560 x 1440 @ 60fps) 🌟 */}
      <Composition
        id="TopBaoHiemV2-2K"
        component={MainVideoV2}
        durationInFrames={totalFrames}
        fps={fps}
        width={2560}
        height={1440}
      />

      {/* 🌟 3. MASTER VIDEO PHONG CÁCH 2 - Full HD (1920 x 1080 @ 60fps) - Siêu mượt 🌟 */}
      <Composition
        id="TopBaoHiemV2-1080p"
        component={MainVideoV2}
        durationInFrames={totalFrames}
        fps={fps}
        width={1920}
        height={1080}
      />

      {/* ⚡ 4. KIỂM THỬ ĐIỂM NỐI CHUYỂN CẢNH (SCENE 1 -> SCENE 2 BRIDGE - 450 frames ~ 7.5s) ⚡ */}
      {/* Tua nhanh điểm giao thoa: Click nút "Truy cập" -> Warp Portal Flash -> Búng tay Snap Cảnh 2 -> 5 thẻ bung */}
      <Composition
        id="Preview-Scene1-Scene2-Bridge-1080p"
        component={Scene1Scene2Bridge}
        durationInFrames={450}
        fps={fps}
        width={1920}
        height={1080}
      />
      <Composition
        id="Preview-Scene1-Scene2-Bridge-4K"
        component={Scene1Scene2Bridge}
        durationInFrames={450}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* 🎬 5. XEM LIỀN MẠCH TRỌN VẸN CẢNH 1 VÀ CẢNH 2 (4330 frames ~ 72.17s @ 60fps) 🎬 */}
      <Composition
        id="Preview-Scene1-Scene2-4K"
        component={Scene1Scene2Combined}
        durationInFrames={scenes.scene1_problem_snap.duration + scenes.scene2_showcase.duration}
        fps={fps}
        width={3840}
        height={2160}
      />
      <Composition
        id="Preview-Scene1-Scene2-1080p"
        component={Scene1Scene2Combined}
        durationInFrames={scenes.scene1_problem_snap.duration + scenes.scene2_showcase.duration}
        fps={fps}
        width={1920}
        height={1080}
      />

      {/* 🎯 TỪNG PHÂN CẢNH ĐỘC LẬP ĐỂ TEST NHANH TRÊN REMOTION PREVIEW 🎯 */}
      {/* Cảnh 1: Băn khoăn -> Búng tay SNAP! (14s | 840 frames) */}
      <Composition
        id="Scene1-ProblemSnap"
        component={Scene1_ProblemSnap}
        durationInFrames={scenes.scene1_problem_snap.duration}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* Cảnh 2: Trình diễn Laptop & Mobile (29s | 1740 frames) */}
      <Composition
        id="Scene2-TopBaoHiemShowcase"
        component={Scene2_TopBaoHiemShowcase}
        durationInFrames={scenes.scene2_showcase.duration}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* Cảnh 3: Tiểu cảnh Bảo hiểm Du lịch (20s | 1200 frames) */}
      <Composition
        id="Scene3-TravelAdventure"
        component={Scene3_TravelAdventure}
        durationInFrames={scenes.scene3_travel.duration}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* Cảnh 3.4: Bố cục tĩnh Đích đến (Destination Blueprint 3.4) để duyệt riêng biệt */}
      <Composition
        id="Scene3-Shot34-Static"
        component={StaticStaging34}
        durationInFrames={scenes.scene3_travel.duration}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* Cảnh 4: Các nhóm sản phẩm Xe cộ, Sức khỏe, Nhà cửa (36s | 2160 frames) */}
      <Composition
        id="Scene4-InsuranceCategories"
        component={Scene4_InsuranceCategories}
        durationInFrames={scenes.scene4_categories.duration}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* Cảnh 5: Hành trình mua 1-chạm & CMS Dashboard (46s | 2760 frames) */}
      <Composition
        id="Scene5-PurchaseFlowCMS"
        component={Scene5_PurchaseFlowCMS}
        durationInFrames={scenes.scene5_purchase_cms.duration}
        fps={fps}
        width={3840}
        height={2160}
      />

      {/* Cảnh 6: Outro & Kêu gọi hành động CTA (25s | 1500 frames) */}
      <Composition
        id="Scene6-OutroCTA"
        component={Scene6_OutroCTA}
        durationInFrames={scenes.scene6_outro_cta.duration}
        fps={fps}
        width={3840}
        height={2160}
      />
    </>
  );
};
