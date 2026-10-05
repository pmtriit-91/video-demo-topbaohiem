import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { VIDEO_CONFIG } from "./config/videoConfig";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};
