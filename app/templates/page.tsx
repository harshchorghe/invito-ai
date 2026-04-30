"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TemplateBackdrop } from "@/components/TemplateBackdrop";
import { INVITATION_TEMPLATES, type TemplateStyle } from "@/lib/templates";

const templateStarters = [
  {
    id: "free-ready-made" as const,
    step: "1. Free ready-made",
    title: "Free ready-made backgrounds (fastest)",
    summary: "Fastest option when you want a polished invitation immediately.",
    template: "elegant" as TemplateStyle,
    badge: "Fastest",
    details: ["Use for wedding invitation background", "Best when you want quick results with no setup"],
  },
  {
    id: "ai-generated" as const,
    step: "2. AI generated",
    title: "Generate backgrounds with AI",
    summary: "Use a rich, custom look for premium-style invitations.",
    template: "indian" as TemplateStyle,
    badge: "Best visual depth",
    details: ["Use for luxury, royal, floral style", "Best when your source image comes from DALL-E or Leonardo"],
  },
  {
    id: "css-backgrounds" as const,
    step: "3. CSS only",
    title: "Dynamic CSS backgrounds",
    summary: "Lightweight gradients that stay editable and load fast.",
    template: "modern" as TemplateStyle,
    badge: "Lightweight",
    details: ["No image files required", "Perfect when you want speed and flexibility"],
  },
  {
    id: "image-overlay" as const,
    step: "4. Image + overlay",
    title: "Image + overlay (pro level)",
    summary: "Use a background image and dark overlay to keep text readable.",
    template: "floral" as TemplateStyle,
    badge: "Pro look",
    details: ["Best when you want a premium background photo", "Overlay keeps invitation text readable"],
  },
];

export default function TemplatesPage() {
  return (
    <div className="flex-1 w-full px-6 pt-12 pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="text-center">
          <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          4 simple ways to create attractive backgrounds
        </motion.h1>
          <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          Pick one method, open it in /create, and you will get the exact mapped preset.
        </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {templateStarters.map((tpl, idx) => (
            <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm"
          >
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl"
            >
              <TemplateBackdrop template={tpl.template} variant="gallery" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 flex min-h-80 flex-col justify-between rounded-2xl border border-white/15 bg-black/15 p-5 backdrop-blur-[1px]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/75">{tpl.step}</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/70">{tpl.badge}</p>
                    <h3 className="mt-3 max-w-xs text-2xl font-semibold text-white">{tpl.title}</h3>
                    <p className="mt-2 text-xs text-white/80">
                      Opens preset: <span className="font-semibold">{INVITATION_TEMPLATES[tpl.template].label}</span>
                    </p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {tpl.template}
                  </span>
                </div>

                <div className="space-y-3 text-white/85">
                  <p className="max-w-sm text-sm leading-6">{tpl.summary}</p>
                  <ul className="space-y-2 text-sm">
                    {tpl.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <div className="h-px flex-1 bg-white/20" />
                  <Link
                    href={`/create/custom?template=${tpl.template}`}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.sessionStorage.setItem("invito:pending-template", tpl.template);
                      }
                    }}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                  >
                    Open in Create
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Flow stays simple.</p>
          <p className="mt-2">
            Choose a background method here, open it in <Link href="/create/custom" className="text-primary hover:underline">/create</Link>, then edit details and generate.
          </p>
        </div>
      </div>
    </div>
  );
}
