import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { VIDEO_CONFIG } from "./config/videoConfig";
import { TestMacbookComp } from "./components/3d/TestMacbookComp";
import { Scene0ProblemHook } from "./components/scenes/Scene0ProblemHook";
import { MasterStoryboardDraft } from "./components/scenes/MasterStoryboardDraft";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 🌟 BẢN PHÁC THẢO TOÀN CẢNH 6 HỒI KỊCH BẢN CHUẨN (2720 frames @ 60fps ~ 45.3s) 🌟 */}
      <Composition
        id="MasterStoryboardDraft4K"
        component={MasterStoryboardDraft}
        durationInFrames={2720}
        fps={60}
        width={3840}
        height={2160}
      />

      {/* Composition 4K UHD Master (3840 x 2160 @ 60fps) - Đạt chuẩn điện ảnh siêu sắc nét */}
      <Composition
        id="TopBaoHiemPromo4K"
        component={MainVideo}
        durationInFrames={VIDEO_CONFIG.totalFrames}
        fps={VIDEO_CONFIG.fps}
        width={3840}
        height={2160}
      />

      {/* Composition 2K QHD (2560 x 1440 @ 60fps) - Chuẩn màn hình hội nghị & laptop 2K */}
      <Composition
        id="TopBaoHiemPromo2K"
        component={MainVideo}
        durationInFrames={VIDEO_CONFIG.totalFrames}
        fps={VIDEO_CONFIG.fps}
        width={2560}
        height={1440}
      />

      {/* Composition Full HD (1920 x 1080 @ 60fps) - Chuẩn tương thích 100% mạng xã hội & preview siêu tốc */}
      <Composition
        id="TopBaoHiemPromo1080p"
        component={MainVideo}
        durationInFrames={VIDEO_CONFIG.totalFrames}
        fps={VIDEO_CONFIG.fps}
        width={1920}
        height={1080}
      />

      {/* Composition Test 3D MacBook mở 0 -> 90 độ */}
      <Composition
        id="TestMacbook3D"
        component={TestMacbookComp}
        durationInFrames={110}
        fps={60}
        width={3456}
        height={1824}
      />

      {/* Composition Master MacBook 90 độ Standby Pixel-Perfect (2200 x 1340) */}
      <Composition
        id="Laptop90Master"
        component={require("./components/ui/Laptop90Standalone").Laptop90Standalone}
        durationInFrames={1}
        fps={60}
        width={2200}
        height={1340}
      />

      {/* Composition Phân Cảnh 0: Nỗi Đau Khách Hàng (Editorial 2.5D Vector - 780 frames @ 60fps) */}
      <Composition
        id="Scene0ProblemHook"
        component={Scene0ProblemHook}
        durationInFrames={780}
        fps={60}
        width={3840}
        height={2160}
      />
    </>
  );
};
