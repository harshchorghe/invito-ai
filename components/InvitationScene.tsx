"use client";

import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { INVITATION_TEMPLATES, type TemplateStyle } from "../lib/templates";
import { TemplateDecorations } from "./Decorations";

export type InvitationPreviewData = {
  title: string;
  hostName: string;
  date: string;
  time: string;
  venue: string;
  message: string;
  themeColor: string;
  template: string;
  uploadedCard: string;
};

type InvitationSceneProps = {
  data: InvitationPreviewData;
  type: string;
};

export function InvitationScene({ data, type }: InvitationSceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 16, stiffness: 120 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.96, 1]);

  const config = INVITATION_TEMPLATES[data.template as TemplateStyle] || INVITATION_TEMPLATES.modern;
  const foreground = config.foreground;
  const fallbackBackground = config.fallbackBackground;
  const isDarkBg = ["modern", "indian", "elegant"].includes(config.id);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at top, ${data.themeColor}44, ${fallbackBackground} 62%)`,
        color: foreground,
        fontFamily: config.fontFamily,
      }}
    >
      {data.uploadedCard ? (
        <AbsoluteFill>
          <Img
            src={data.uploadedCard}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }}
          />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.45))" }} />
        </AbsoluteFill>
      ) : null}
      <TemplateDecorations template={config.id} color={foreground} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 48,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            padding: 48,
            textAlign: "center",
            borderRadius: 28,
            border: `1px solid ${foreground}18`,
            background: data.uploadedCard
              ? "rgba(255,255,255,0.08)"
              : isDarkBg
                ? "rgba(24,24,27,0.82)"
                : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: 5, marginBottom: 18, opacity: 0.7, textTransform: "uppercase" }}>
            {type} invitation
          </div>

          <h1 style={{ fontSize: 62, lineHeight: 1, margin: "0 0 18px", fontWeight: 700 }}>
            {data.title || "Your Event Title"}
          </h1>

          <p style={{ fontSize: 24, lineHeight: 1.5, margin: "0 auto 28px", maxWidth: 460, opacity: 0.9 }}>
            {data.message || "Join us to celebrate this special occasion with joy and happiness."}
          </p>

          <div style={{ height: 1, width: 96, background: `${foreground}30`, margin: "0 auto 28px" }} />

          <div style={{ display: "grid", gap: 18, fontSize: 22 }}>
            <div>
              <div style={{ marginBottom: 4, fontSize: 14, letterSpacing: 3, opacity: 0.6, textTransform: "uppercase" }}>
                Hosted By
              </div>
              <div style={{ fontWeight: 600 }}>{data.hostName || "Your Name"}</div>
            </div>

            <div>
              <div style={{ marginBottom: 4, fontSize: 14, letterSpacing: 3, opacity: 0.6, textTransform: "uppercase" }}>
                When
              </div>
              <div style={{ fontWeight: 600 }}>
                {data.date || "Date"} at {data.time || "Time"}
              </div>
            </div>

            <div>
              <div style={{ marginBottom: 4, fontSize: 14, letterSpacing: 3, opacity: 0.6, textTransform: "uppercase" }}>
                Where
              </div>
              <div style={{ fontWeight: 600 }}>{data.venue || "Event Venue Location"}</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}