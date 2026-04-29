"use client";

import React from "react";
import type { InvitationPreviewData } from "@/components/InvitationScene";
import { InvitationArtwork } from "./InvitationArtwork";

interface CanvasPreviewProps {
  data: InvitationPreviewData;
  type: string;
}

export function CanvasPreview({ data, type }: CanvasPreviewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Live Preview</h2>
          <p className="text-sm text-muted-foreground">The editor stays here while the generated output opens on the next screen.</p>
        </div>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">Editor</span>
      </div>

      <div id="remotion-preview" className="flex flex-1 items-center justify-center overflow-auto rounded-2xl border border-white/10 bg-black/40 p-8">
        <div className="w-full max-w-[520px]">
          <InvitationArtwork
            data={data}
            type={type}
            className={`relative flex aspect-[3/4] w-full max-w-[520px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-10 text-center shadow-2xl ${data.template === "modern" ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
          />
        </div>
      </div>
    </div>
  );
}
