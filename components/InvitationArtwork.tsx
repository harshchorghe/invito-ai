"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { InvitationPreviewData } from "@/components/InvitationScene";
import { INVITATION_TEMPLATES, type TemplateStyle } from "@/lib/templates";
import type { AnimationPreset } from "@/lib/animations";
import { TemplateDecorations } from "./Decorations";
import { TemplateBackdrop } from "./TemplateBackdrop";

type InvitationArtworkProps = {
  data: InvitationPreviewData;
  type: string;
  className?: string;
  animated?: boolean;
  animationType?: AnimationPreset;
};

const getElementAnimation = (animated: boolean, animationType: AnimationPreset) => {
  if (!animated || animationType === "none") {
    return {
      title: { animate: {} },
      message: { animate: {} },
      details: { animate: {} },
    };
  }

  if (animationType === "pulse-glow") {
    return {
      title: { animate: { opacity: [0.9, 1, 0.9] }, transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
      message: { animate: { opacity: [0.8, 0.95, 0.8] }, transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" } },
      details: { animate: { opacity: [0.85, 1, 0.85] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    };
  }

  if (animationType === "slow-tilt") {
    return {
      title: { animate: { rotate: [-0.7, 0.7, -0.7] }, transition: { duration: 7, repeat: Infinity, ease: "easeInOut" } },
      message: { animate: { y: [-2, 2, -2] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
      details: { animate: { y: [0, -2, 0] }, transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } },
    };
  }

  if (animationType === "subtle-pan") {
    return {
      title: { animate: { x: [-2, 2, -2] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
      message: { animate: { x: [2, -2, 2] }, transition: { duration: 6.6, repeat: Infinity, ease: "easeInOut" } },
      details: { animate: { y: [0, -1, 0] }, transition: { duration: 5.8, repeat: Infinity, ease: "easeInOut" } },
    };
  }

  return {
    title: { animate: { y: [0, -3, 0] }, transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" } },
    message: { animate: { y: [0, 2, 0] }, transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" } },
    details: { animate: { y: [0, -1, 0] }, transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } },
  };
};

export const InvitationArtwork = React.forwardRef<HTMLDivElement, InvitationArtworkProps>(
  function InvitationArtwork({ data, type, className, animated = true, animationType = "float-blobs" }, ref) {
    const config = INVITATION_TEMPLATES[data.template as TemplateStyle] || INVITATION_TEMPLATES.modern;
    const elementAnimation = getElementAnimation(animated, animationType);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
        style={{ 
          color: config.foreground,
          fontFamily: config.fontFamily
        }}
      >
        <TemplateBackdrop template={config.id} variant="editor" animated={animated} animationType={animationType} />
        {data.uploadedCard ? (
          <div className="absolute inset-0">
            <Image
              src={data.uploadedCard}
              alt="Uploaded card reference"
              fill
              unoptimized
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/40" />
          </div>
        ) : null}
        <TemplateDecorations template={config.id} color={config.foreground} />
        <div className="absolute inset-0 bg-black/5" />

        <motion.div
          key={data.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center"
        >
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] opacity-60">
            {type} invitation
          </div>

          <motion.h1
            className="mb-8 w-full wrap-break-word text-4xl font-bold"
            style={{ fontFamily: config.fontFamily }}
            animate={elementAnimation.title.animate}
            transition={(elementAnimation.title as any).transition}
          >
            {data.title || "Your Event Title"}
          </motion.h1>

          <motion.p
            className="mb-8 whitespace-pre-line text-lg opacity-90"
            style={{ fontFamily: config.fontFamily }}
            animate={elementAnimation.message.animate}
            transition={(elementAnimation.message as any).transition}
          >
            {data.message || "Join us to celebrate this special occasion with joy and happiness."}
          </motion.p>

          <div className="mb-8 h-px w-16 bg-current opacity-30" />

          <motion.div
            className="space-y-4 text-center"
            animate={elementAnimation.details.animate}
            transition={(elementAnimation.details as any).transition}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);
