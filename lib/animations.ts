export type AnimationPreset = "subtle-pan" | "float-blobs" | "pulse-glow" | "slow-tilt" | "none";

export const ANIMATION_PRESETS: { id: AnimationPreset; label: string; description?: string }[] = [
  { id: "subtle-pan", label: "Subtle Pan", description: "Slow background pan and gentle movement." },
  { id: "float-blobs", label: "Float Blobs", description: "Soft floating glow blobs with slow drift." },
  { id: "pulse-glow", label: "Pulse Glow", description: "Subtle pulsing of glow layers for a breathing effect." },
  { id: "slow-tilt", label: "Slow Tilt", description: "Slight tilt and parallax movement." },
  { id: "none", label: "None", description: "No animation, static backdrop." },
];

export const DEFAULT_ANIMATION: AnimationPreset = "float-blobs";
