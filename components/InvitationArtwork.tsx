"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { InvitationPreviewData } from "@/components/InvitationScene";

type InvitationArtworkProps = {
  data: InvitationPreviewData;
  type: string;
  className?: string;
};

export const InvitationArtwork = React.forwardRef<HTMLDivElement, InvitationArtworkProps>(
  function InvitationArtwork({ data, type, className }, ref) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
        style={{ backgroundColor: data.themeColor || (data.template === "modern" ? "#18181b" : "#ffffff") }}
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

        {data.template === "classic" && (
          <div className="absolute top-0 left-0 h-full w-full rounded-xl border-8 border-double border-current opacity-20 pointer-events-none" />
        )}

        {data.template === "playful" && (
          <div className="absolute top-0 flex w-full justify-around p-4 opacity-50 pointer-events-none">
            <span className="text-2xl">✨</span>
            <span className="text-2xl">🎊</span>
            <span className="text-2xl">✨</span>
          </div>
        )}

        {data.template === "minimal" && (
          <div className="absolute top-0 left-0 h-full w-1 bg-current opacity-20 pointer-events-none" />
        )}

        <motion.div
          key={data.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center"
        >
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] opacity-60">
            {type} invitation
          </div>

          <h1 className={`mb-8 w-full break-words text-4xl font-bold ${data.template === "classic" ? "font-serif" : "font-sans"}`}>
            {data.title || "Your Event Title"}
          </h1>

          <p className={`mb-8 whitespace-pre-line text-lg ${data.template === "classic" ? "italic opacity-80" : "opacity-90"}`}>
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
