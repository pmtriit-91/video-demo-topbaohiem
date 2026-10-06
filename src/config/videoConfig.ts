export interface VideoThemeConfig {
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
}

export interface MetricCard {
  label: string;
  value: string;
  subValue?: string;
  change?: string;
  color: string;
}

export const VIDEO_CONFIG = {
  durationInSeconds: 70,
  fps: 60,
  totalFrames: 4200, // 70s @ 60fps (thời lượng linh hoạt theo yêu cầu)
  
  // Scene frame boundaries
  scenes: {
    scene1_hook: { start: 0, duration: 1080 },       // 00s - 18s: MacBook Air M3 3D Spatial Viewport & Full Trang Chủ Parallax Scroll (1080 frames)
    scene2_frontend: { start: 1080, duration: 1020 },// 18s - 35s: 1-Touch Customer Experience & AI OCR (1020 frames)
    scene3_cms_flip: { start: 2100, duration: 1200 },// 35s - 55s: 3D Origami Flip to CMS Core Engine (1200 frames)
    scene4_scale: { start: 3300, duration: 600 },    // 55s - 65s: Scale Engine & 75+ Affiliate Network (600 frames)
    scene5_outro: { start: 3900, duration: 300 },    // 65s - 70s: Turnkey Solution & CTA (300 frames)
  },
  
  colors: {
    bgDark: "#070b14",
    bgCardDark: "#0d1527",
    primaryCyan: "#00e5ff",
    electricBlue: "#2563eb",
    emeraldGreen: "#10b981",
    accentPurple: "#8b5cf6",
    textWhite: "#ffffff",
    textMuted: "#94a3b8",
    goldAccent: "#fbbf24",
  }
};
