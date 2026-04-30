export type TemplateStyle = 
  | "classic" 
  | "modern" 
  | "playful" 
  | "minimal" 
  | "indian" 
  | "floral" 
  | "elegant";

export type TemplateConfig = {
  id: TemplateStyle;
  label: string;
  fontFamily: string; // The font-family CSS value
  fallbackBackground: string;
  foreground: string; // Text color
  backdrop: {
    base: string;
    surface: string;
    glowA: string;
    glowB: string;
    pattern: string;
  };
};

export const INVITATION_TEMPLATES: Record<TemplateStyle, TemplateConfig> = {
  classic: {
    id: "classic",
    label: "Classic",
    fontFamily: "'Georgia', serif",
    fallbackBackground: "#ffffff",
    foreground: "#0f172a",
    backdrop: {
      base: "linear-gradient(135deg, #f9f5ec 0%, #ede2c8 45%, #dcc79b 100%)",
      surface: "radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(250,244,228,0.92) 55%, rgba(239,227,196,0.98) 100%)",
      glowA: "rgba(214, 181, 112, 0.34)",
      glowB: "rgba(255, 255, 255, 0.48)",
      pattern: "repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0 2px, transparent 2px 18px)",
    },
  },
  modern: {
    id: "modern",
    label: "Modern",
    fontFamily: "'Inter', sans-serif",
    fallbackBackground: "#18181b",
    foreground: "#fafafa",
    backdrop: {
      base: "linear-gradient(135deg, #050816 0%, #0f172a 45%, #111827 100%)",
      surface: "radial-gradient(circle at top, rgba(59,130,246,0.28), rgba(15,23,42,0.96) 60%, rgba(3,7,18,1) 100%)",
      glowA: "rgba(59, 130, 246, 0.42)",
      glowB: "rgba(168, 85, 247, 0.28)",
      pattern: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
    },
  },
  playful: {
    id: "playful",
    label: "Playful",
    fontFamily: "'Nunito', sans-serif",
    fallbackBackground: "#ffffff",
    foreground: "#0f172a",
    backdrop: {
      base: "linear-gradient(135deg, #fce7f3 0%, #fde68a 46%, #bfdbfe 100%)",
      surface: "radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(253,242,248,0.9) 58%, rgba(236,252,203,0.94) 100%)",
      glowA: "rgba(244, 114, 182, 0.35)",
      glowB: "rgba(59, 130, 246, 0.28)",
      pattern: "repeating-radial-gradient(circle at center, rgba(255,255,255,0.18) 0 2px, transparent 2px 24px)",
    },
  },
  minimal: {
    id: "minimal",
    label: "Minimal",
    fontFamily: "'Helvetica Neue', sans-serif",
    fallbackBackground: "#ffffff",
    foreground: "#0f172a",
    backdrop: {
      base: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 55%, #cbd5e1 100%)",
      surface: "radial-gradient(circle at top, rgba(255,255,255,0.98), rgba(248,250,252,0.95) 70%, rgba(226,232,240,0.98) 100%)",
      glowA: "rgba(15, 23, 42, 0.14)",
      glowB: "rgba(148, 163, 184, 0.22)",
      pattern: "linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)",
    },
  },
  indian: {
    id: "indian",
    label: "Indian Traditional",
    fontFamily: "'Playfair Display', serif",
    fallbackBackground: "#8b0000",
    foreground: "#ffdf00", // Gold
    backdrop: {
      base: "linear-gradient(135deg, #3f0a0a 0%, #7f1d1d 42%, #111827 100%)",
      surface: "radial-gradient(circle at top, rgba(255,223,0,0.22), rgba(139,0,0,0.96) 58%, rgba(24,24,27,0.98) 100%)",
      glowA: "rgba(255, 223, 0, 0.38)",
      glowB: "rgba(194, 65, 12, 0.28)",
      pattern: "radial-gradient(circle at 1px 1px, rgba(255,223,0,0.22) 1px, transparent 0)",
    },
  },
  floral: {
    id: "floral",
    label: "Floral Elegance",
    fontFamily: "'Great Vibes', cursive",
    fallbackBackground: "#fdfbf7",
    foreground: "#2d4a22", // Dark green
    backdrop: {
      base: "linear-gradient(135deg, #fdfbf7 0%, #f5e9dc 48%, #e2f0da 100%)",
      surface: "radial-gradient(circle at top, rgba(255,255,255,0.96), rgba(253,251,247,0.92) 55%, rgba(245,232,220,0.98) 100%)",
      glowA: "rgba(45, 74, 34, 0.22)",
      glowB: "rgba(244, 114, 182, 0.16)",
      pattern: "repeating-radial-gradient(circle at center, rgba(45,74,34,0.08) 0 1px, transparent 1px 22px)",
    },
  },
  elegant: {
    id: "elegant",
    label: "Elegant Gold",
    fontFamily: "'Cinzel', serif",
    fallbackBackground: "#001f3f", // Navy
    foreground: "#d4af37", // Soft Gold
    backdrop: {
      base: "linear-gradient(135deg, #02111f 0%, #0b2545 46%, #111827 100%)",
      surface: "radial-gradient(circle at top, rgba(212,175,55,0.18), rgba(2,17,31,0.96) 58%, rgba(3,7,18,0.99) 100%)",
      glowA: "rgba(212, 175, 55, 0.35)",
      glowB: "rgba(59, 130, 246, 0.18)",
      pattern: "linear-gradient(135deg, rgba(212,175,55,0.12) 25%, transparent 25% 50%, rgba(212,175,55,0.12) 50% 75%, transparent 75%)",
    },
  },
};
