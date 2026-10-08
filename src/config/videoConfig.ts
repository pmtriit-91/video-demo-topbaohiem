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
  totalFrames: 4390, // ~73s @ 60fps (thời lượng linh hoạt mở rộng)
  
  // Scene frame boundaries
  scenes: {
    scene1_hook: { start: 0, duration: 1270 },       // 00s - 21.1s: MacBook Spatial Viewport & Spotlight Search (1270 frames)
    scene2_frontend: { start: 1270, duration: 1020 },// Frontend 1-Touch Experience (1020 frames)
    scene3_cms_flip: { start: 2290, duration: 1200 },// 3D Origami Flip to CMS Core Engine (1200 frames)
    scene4_scale: { start: 3490, duration: 600 },    // Scale Engine & 75+ Affiliate Network (600 frames)
    scene5_outro: { start: 4090, duration: 300 },    // Turnkey Solution & CTA (300 frames)
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
