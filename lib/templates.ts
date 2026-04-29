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
};

export const INVITATION_TEMPLATES: Record<TemplateStyle, TemplateConfig> = {
  classic: {
    id: "classic",
    label: "Classic",
    fontFamily: "'Georgia', serif",
    fallbackBackground: "#ffffff",
    foreground: "#0f172a",
  },
  modern: {
    id: "modern",
    label: "Modern",
    fontFamily: "'Inter', sans-serif",
    fallbackBackground: "#18181b",
    foreground: "#fafafa",
  },
  playful: {
    id: "playful",
    label: "Playful",
    fontFamily: "'Nunito', sans-serif",
    fallbackBackground: "#ffffff",
    foreground: "#0f172a",
  },
  minimal: {
    id: "minimal",
    label: "Minimal",
    fontFamily: "'Helvetica Neue', sans-serif",
    fallbackBackground: "#ffffff",
    foreground: "#0f172a",
  },
  indian: {
    id: "indian",
    label: "Indian Traditional",
    fontFamily: "'Playfair Display', serif",
    fallbackBackground: "#8b0000",
    foreground: "#ffdf00", // Gold
  },
  floral: {
    id: "floral",
    label: "Floral Elegance",
    fontFamily: "'Great Vibes', cursive",
    fallbackBackground: "#fdfbf7",
    foreground: "#2d4a22", // Dark green
  },
  elegant: {
    id: "elegant",
    label: "Elegant Gold",
    fontFamily: "'Cinzel', serif",
    fallbackBackground: "#001f3f", // Navy
    foreground: "#d4af37", // Soft Gold
  },
};
