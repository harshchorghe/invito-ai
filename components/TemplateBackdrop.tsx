"use client";

import React from "react";
import { INVITATION_TEMPLATES, type TemplateStyle } from "@/lib/templates";

type TemplateBackdropProps = {
  template: string;
  className?: string;
  variant?: "gallery" | "editor" | "scene";
  animated?: boolean;
  animationType?: import("@/lib/animations").AnimationPreset;
};

export function TemplateBackdrop({ template, className = "", variant = "editor", animated = true, animationType = "float-blobs" }: TemplateBackdropProps) {
  const config = INVITATION_TEMPLATES[template as TemplateStyle] || INVITATION_TEMPLATES.modern;
  const surfaceOpacity = variant === "gallery" ? 0.55 : variant === "scene" ? 0.8 : 1;
  const glowScale = variant === "gallery" ? 0.78 : 1;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute inset-0 ${animated && animationType === 'subtle-pan' ? 'animate-template-pan' : ''}`}
        style={{
          backgroundImage: config.backdrop.base,
          backgroundSize: "220% 220%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: config.backdrop.pattern,
          backgroundSize: variant === "scene" ? "24px 24px" : "20px 20px",
          opacity: variant === "gallery" ? 0.14 : 0.22,
        }}
      />
      <div
        className={`absolute -left-20 -top-20 rounded-full blur-3xl ${animated && animationType === 'float-blobs' ? 'animate-template-float' : ''}`}
        style={{
          width: variant === "gallery" ? 220 : 320,
          height: variant === "gallery" ? 220 : 320,
          background: config.backdrop.glowA,
          transform: `scale(${glowScale})`,
        }}
      />
      <div
        className={`absolute -bottom-24 -right-20 rounded-full blur-3xl ${animated && animationType === 'float-blobs' ? 'animate-template-float-reverse' : ''}`}
        style={{
          width: variant === "gallery" ? 260 : 360,
          height: variant === "gallery" ? 260 : 360,
          background: config.backdrop.glowB,
          transform: `scale(${glowScale})`,
        }}
      />
      {/* pulse-glow overlay */}
      {animated && animationType === 'pulse-glow' ? (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-40 animate-pulse-slow" style={{ background: config.backdrop.surface }} />
        </div>
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: config.backdrop.surface,
          opacity: surfaceOpacity,
        }}
      />
    </div>
  );
}
