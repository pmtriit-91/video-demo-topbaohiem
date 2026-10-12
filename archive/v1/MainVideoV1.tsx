import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { FontLoader } from "./components/FontLoader";
import { MatrixBackgroundThree } from "./components/3d/MatrixBackgroundThree";
import { Scene1Hook } from "./components/scenes/Scene1Hook";
import { Scene2Frontend } from "./components/scenes/Scene2Frontend";
import { Scene3CMSFlip } from "./components/scenes/Scene3CMSFlip";
import { Scene4Scale } from "./components/scenes/Scene4Scale";
import { Scene5Outro } from "./components/scenes/Scene5Outro";
import { VIDEO_CONFIG } from "./config/videoConfig";

export const MainVideo: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#070b14",
        overflow: "hidden",
      }}
    >
      {/* 1. Nạp bộ font Plus Jakarta Sans & Space Grotesk */}
      <FontLoader />

      {/* 2. Layer Nền 3D Three.js: Lưới Cyber Grid & Hạt Không Gian Toàn Thời Gian */}
      <MatrixBackgroundThree width={width} height={height} particleCount={250} />

      {/* 3. Phân Cảnh 1: The Hook & InsurTech Vision (00s - 08s | 480 frames) */}
      <Sequence
        from={VIDEO_CONFIG.scenes.scene1_hook.start}
        durationInFrames={VIDEO_CONFIG.scenes.scene1_hook.duration}
        name="Scene 1: Cyber Shield Hook"
      >
        <Scene1Hook />
      </Sequence>

      {/* 4. Phân Cảnh 2: Frontend 1-Chạm, AI OCR & So Sánh (08s - 25s | 1020 frames) */}
      <Sequence
        from={VIDEO_CONFIG.scenes.scene2_frontend.start}
        durationInFrames={VIDEO_CONFIG.scenes.scene2_frontend.duration}
        name="Scene 2: Frontend 1-Touch Experience"
      >
        <Scene2Frontend />
      </Sequence>

      {/* 5. Phân Cảnh 3: Cú Gập Không Gian Lật Mở CMS Lõi (25s - 45s | 1200 frames) */}
      <Sequence
        from={VIDEO_CONFIG.scenes.scene3_cms_flip.start}
        durationInFrames={VIDEO_CONFIG.scenes.scene3_cms_flip.duration}
        name="Scene 3: 3D Space Fold into CMS"
      >
        <Scene3CMSFlip />
      </Sequence>

      {/* 6. Phân Cảnh 4: Mạng Lưới 75+ Đại Lý & Tăng Trưởng Quy Mô (45s - 55s | 600 frames) */}
      <Sequence
        from={VIDEO_CONFIG.scenes.scene4_scale.start}
        durationInFrames={VIDEO_CONFIG.scenes.scene4_scale.duration}
        name="Scene 4: Scale Engine & Affiliate Network"
      >
        <Scene4Scale />
      </Sequence>

      {/* 7. Phân Cảnh 5: Outro Chìa Khóa Trao Tay & Kêu Gọi Đầu Tư (55s - 60s | 300 frames) */}
      <Sequence
        from={VIDEO_CONFIG.scenes.scene5_outro.start}
        durationInFrames={VIDEO_CONFIG.scenes.scene5_outro.duration}
        name="Scene 5: Outro & Investor Call To Action"
      >
        <Scene5Outro />
      </Sequence>
    </div>
  );
};
