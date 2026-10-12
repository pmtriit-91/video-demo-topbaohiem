import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { FontLoader } from "./components/FontLoader";
import { VIDEO_CONFIG_V2 } from "./config/videoConfigV2";
import { Scene1_ProblemSnap } from "./components/scenes/v2/Scene1_ProblemSnap";
import { Scene2_TopBaoHiemShowcase } from "./components/scenes/v2/Scene2_TopBaoHiemShowcase";
import { Scene3_TravelAdventure } from "./components/scenes/v2/Scene3_TravelAdventure";
import { Scene4_InsuranceCategories } from "./components/scenes/v2/Scene4_InsuranceCategories";
import { Scene5_PurchaseFlowCMS } from "./components/scenes/v2/Scene5_PurchaseFlowCMS";
import { Scene6_OutroCTA } from "./components/scenes/v2/Scene6_OutroCTA";

export const MainVideoV2: React.FC = () => {
  const { width, height } = useVideoConfig();
  const scenes = VIDEO_CONFIG_V2.scenes;
  const colors = VIDEO_CONFIG_V2.colors;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: colors.bgLight,
        overflow: "hidden",
      }}
    >
      {/* 1. Bộ nạp Font Plus Jakarta Sans & Space Grotesk chuẩn Remotion */}
      <FontLoader />

      {/* 2. CẢNH 1: Băn khoăn trước các thẻ giấy -> Búng tay SNAP! (0s - 14s | 840 frames) */}
      <Sequence
        from={scenes.scene1_problem_snap.start}
        durationInFrames={scenes.scene1_problem_snap.duration}
        name={scenes.scene1_problem_snap.name}
      >
        <Scene1_ProblemSnap />
      </Sequence>

      {/* 3. CẢNH 2: TOPbaohiem xuất hiện trên Laptop & Mobile (14s - 43s | 1740 frames) */}
      <Sequence
        from={scenes.scene2_showcase.start}
        durationInFrames={scenes.scene2_showcase.duration}
        name={scenes.scene2_showcase.name}
      >
        <Scene2_TopBaoHiemShowcase />
      </Sequence>

      {/* 4. CẢNH 3: Tiểu cảnh Bảo hiểm Du lịch Paper Cut (43s - 1:03s | 1200 frames) */}
      <Sequence
        from={scenes.scene3_travel.start}
        durationInFrames={scenes.scene3_travel.duration}
        name={scenes.scene3_travel.name}
      >
        <Scene3_TravelAdventure />
      </Sequence>

      {/* 5. CẢNH 4: Các nhóm sản phẩm Xe cộ, Sức khỏe, Nhà cửa (1:03s - 1:39s | 2160 frames) */}
      <Sequence
        from={scenes.scene4_categories.start}
        durationInFrames={scenes.scene4_categories.duration}
        name={scenes.scene4_categories.name}
      >
        <Scene4_InsuranceCategories />
      </Sequence>

      {/* 6. CẢNH 5: Hành trình mua 1-chạm & CMS Dashboard lật sau (1:39s - 2:25s | 2760 frames) */}
      <Sequence
        from={scenes.scene5_purchase_cms.start}
        durationInFrames={scenes.scene5_purchase_cms.duration}
        name={scenes.scene5_purchase_cms.name}
      >
        <Scene5_PurchaseFlowCMS />
      </Sequence>

      {/* 7. CẢNH 6: Hệ sinh thái trọn gói, Logo TOPbaohiem & CTA (2:25s - 2:50s | 1500 frames) */}
      <Sequence
        from={scenes.scene6_outro_cta.start}
        durationInFrames={scenes.scene6_outro_cta.duration}
        name={scenes.scene6_outro_cta.name}
      >
        <Scene6_OutroCTA />
      </Sequence>
    </div>
  );
};
