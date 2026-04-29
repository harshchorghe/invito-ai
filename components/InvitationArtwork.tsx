"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { InvitationPreviewData } from "@/components/InvitationScene";
import { INVITATION_TEMPLATES, type TemplateStyle } from "@/lib/templates";
import { TemplateDecorations } from "./Decorations";

type InvitationArtworkProps = {
  data: InvitationPreviewData;
  type: string;
  className?: string;
};

export const InvitationArtwork = React.forwardRef<HTMLDivElement, InvitationArtworkProps>(
  function InvitationArtwork({ data, type, className }, ref) {
    const config = INVITATION_TEMPLATES[data.template as TemplateStyle] || INVITATION_TEMPLATES.modern;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
        style={{ 
          backgroundColor: data.themeColor || config.fallbackBackground,
          color: config.foreground,
          fontFamily: config.fontFamily
        }}
      >
        {data.uploadedCard ? (
          <div className="absolute inset-0">
            <Image
              src={data.uploadedCard}
              alt="Uploaded card reference"
              fill
              unoptimized
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
          </div>
        ) : null}
        <TemplateDecorations template={config.id} color={config.foreground} />

        <motion.div
          key={data.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center"
        >
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] opacity-60">
            {type} invitation
          </div>

          <h1 className="mb-8 w-full break-words text-4xl font-bold" style={{ fontFamily: config.fontFamily }}>
            {data.title || "Your Event Title"}
          </h1>

          <p className="mb-8 whitespace-pre-line text-lg opacity-90" style={{ fontFamily: config.fontFamily }}>
            {data.message || "Join us to celebrate this special occasion with joy and happiness."}
          </p>

          <div className="mb-8 h-px w-16 bg-current opacity-30" />

          <div className="space-y-4 text-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Hosted By</p>
              <p className="font-medium">{data.hostName || "Your Name"}</p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">When</p>
              <p className="font-medium">
                {data.date || "Date"} at {data.time || "Time"}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Where</p>
              <p className="font-medium">{data.venue || "Event Venue Location"}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);
