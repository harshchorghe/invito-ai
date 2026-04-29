import React from "react";

type DecorationProps = {
  template: string;
  color: string;
};

export const TemplateDecorations: React.FC<DecorationProps> = ({ template, color }) => {
  if (template === "classic") {
    return (
      <div 
        style={{
          position: "absolute",
          inset: 24,
          borderRadius: 24,
          border: `12px double ${color}44`,
          pointerEvents: "none"
        }}
      />
    );
  }

  if (template === "minimal") {
    return (
      <div 
        style={{
          position: "absolute",
          top: 40,
          bottom: 40,
          left: 40,
          width: 8,
          borderRadius: 9999,
          background: `linear-gradient(180deg, ${color}, transparent)`,
          pointerEvents: "none"
        }}
      />
    );
  }

  if (template === "playful") {
    return (
      <div style={{
        position: "absolute",
        top: 32,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: "0 48px",
        fontSize: 36,
        opacity: 0.4,
        pointerEvents: "none"
      }}>
        <span>✨</span>
        <span>🎉</span>
        <span>✨</span>
      </div>
    );
  }

  if (template === "indian") {
    return (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4, pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,0 L30,0 A30,30 0 0,0 0,30 Z" fill="none" stroke={color} strokeWidth="1" />
        <path d="M0,0 L40,0 A40,40 0 0,0 0,40 Z" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="1,1" />
        <path d="M100,100 L70,100 A30,30 0 0,0 100,70 Z" fill="none" stroke={color} strokeWidth="1" />
        <path d="M100,100 L60,100 A40,40 0 0,0 100,60 Z" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="1,1" />
        <rect x="5" y="5" width="90" height="90" fill="none" stroke={color} strokeWidth="0.5" />
        <rect x="7" y="7" width="86" height="86" fill="none" stroke={color} strokeWidth="0.2" />
      </svg>
    );
  }

  if (template === "floral") {
    return (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6, pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q20,20 20,0 M0,25 Q25,25 25,0" fill="none" stroke={color} strokeWidth="0.5" strokeLinecap="round" />
        <circle cx="15" cy="5" r="1" fill={color} />
        <circle cx="5" cy="15" r="1" fill={color} />
        <circle cx="20" cy="15" r="0.5" fill={color} />

        <path d="M100,80 Q80,80 80,100 M100,75 Q75,75 75,100" fill="none" stroke={color} strokeWidth="0.5" strokeLinecap="round" />
        <circle cx="85" cy="95" r="1" fill={color} />
        <circle cx="95" cy="85" r="1" fill={color} />
        <circle cx="80" cy="85" r="0.5" fill={color} />
      </svg>
    );
  }

  if (template === "elegant") {
    return (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.8, pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke={color} strokeWidth="0.5" />
        <path d="M12,12 L88,12 L88,88 L12,88 Z" fill="none" stroke={color} strokeWidth="0.2" />
        <polygon points="10,8 12,10 10,12 8,10" fill={color} />
        <polygon points="90,8 92,10 90,12 88,10" fill={color} />
        <polygon points="10,88 12,90 10,92 8,90" fill={color} />
        <polygon points="90,88 92,90 90,92 88,90" fill={color} />
      </svg>
    );
  }

  return null;
};
