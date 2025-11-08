// src/styles/theme.config.ts

export const themes = [
  "ocean",
  "sunset",
  "forest",
  "graphite",
  "sand",
  "midnight",
  "plum",
] as const;

export type ThemeName = (typeof themes)[number];
