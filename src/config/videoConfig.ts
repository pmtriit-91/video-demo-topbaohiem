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
  durationInSeconds: 60,
  fps: 60,
  totalFrames: 3600, // 60s @ 60fps
  
  // Scene frame boundaries
  scenes: {
    scene1_hook: { start: 0, duration: 480 },      // 00s - 08s: The Hook & InsurTech Vision (480 frames)
    scene2_frontend: { start: 480, duration: 1020 }, // 08s - 25s: 1-Touch Customer Experience & AI OCR (1020 frames)
    scene3_cms_flip: { start: 1500, duration: 1200 },// 25s - 45s: 3D Origami Flip to CMS Core Engine (1200 frames)
    scene4_scale: { start: 2700, duration: 600 },    // 45s - 55s: Scale Engine & 75+ Affiliate Network (600 frames)
    scene5_outro: { start: 3300, duration: 300 },    // 55s - 60s: Turnkey Solution & CTA (300 frames)
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
