"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { Image as ImageIcon, FileText, Video as VideoIcon } from "lucide-react";
import { Button } from "./ui/Button";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { InvitationScene, type InvitationPreviewData } from "@/components/InvitationScene";

interface CanvasPreviewProps {
  data: InvitationPreviewData;
  type: string;
}

export function CanvasPreview({ data, type }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportImage = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `invito-${type}-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error("Export Image Failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, { quality: 1, pixelRatio: 2 });
      const width = canvasRef.current.offsetWidth;
      const height = canvasRef.current.offsetHeight;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [width, height],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`invito-${type}-${Date.now()}.pdf`);
    } catch (err) {
      console.error("Export PDF Failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportVideo = () => {
    const preview = document.getElementById("remotion-preview");
    preview?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportImage} className="gap-2">
            <ImageIcon size={16} /> PNG
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
            <FileText size={16} /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportVideo} className="gap-2 text-primary border-primary/50">
            <VideoIcon size={16} /> MP4
          </Button>
        </div>
      </div>

      <div id="remotion-preview" className="flex-1 flex flex-col gap-6 rounded-2xl border border-white/10 bg-black/40 p-4 overflow-auto">
        <div className="rounded-2xl border border-white/10 bg-black/70 p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <div>
              <p className="text-sm font-medium text-white">Remotion Motion Preview</p>
              <p className="text-xs text-muted-foreground">The animated version follows the uploaded card and form fields.</p>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">Player</span>
          </div>

          <div className="aspect-3/4 w-full overflow-hidden rounded-xl bg-zinc-950">
            <Player
              component={InvitationScene}
              inputProps={{ data, type }}
              durationInFrames={120}
              compositionWidth={720}
              compositionHeight={960}
              fps={30}
              style={{ width: "100%", height: "100%" }}
              controls
              loop
              autoPlay
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-2 pt-2">
          <h3 className="text-sm font-medium text-white">Export canvas</h3>
          <span className="text-xs text-muted-foreground">PNG and PDF use the editable HTML canvas below.</span>
        </div>

        <div className="flex-1 flex items-center justify-center bg-black/40 rounded-2xl border border-white/10 p-8 overflow-auto">
          <motion.div
            ref={canvasRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full max-w-100 aspect-3/4 shadow-2xl rounded-xl overflow-hidden flex flex-col items-center justify-center p-10 text-center ${data.template === "modern" ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
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
                <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/40" />
              </div>
            ) : null}

            {data.template === "classic" && (
              <div className="absolute top-0 left-0 w-full h-full border-10 border-double border-current opacity-20 rounded-xl pointer-events-none" />
            )}
            {data.template === "playful" && (
              <div className="absolute top-0 w-full flex justify-around p-4 opacity-50 pointer-events-none">
                <span className="text-2xl">✨</span>
                <span className="text-2xl">🎊</span>
                <span className="text-2xl">✨</span>
              </div>
            )}
            {data.template === "minimal" && (
              <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-20 pointer-events-none" />
            )}

            {isGenerating && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            <motion.div
              key={data.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center w-full relative z-10"
            >
              <h1 className={`text-4xl font-bold mb-8 wrap-break-word w-full ${data.template === "classic" ? "font-serif" : "font-sans"}`}>
                {data.title || "Your Event Title"}
              </h1>

              <p className={`text-lg mb-8 whitespace-pre-line ${data.template === "classic" ? "italic opacity-80" : "opacity-90"}`}>
                {data.message || "Join us to celebrate this special occasion with joy and happiness."}
              </p>

              <div className="w-16 h-px bg-current opacity-30 mb-8" />

              <div className="space-y-4">
                <div>
                  <p className="font-bold uppercase tracking-widest text-sm opacity-60">Hosted By</p>
                  <p className="font-medium">{data.hostName || "Your Name"}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-widest text-sm opacity-60">When</p>
                  <p className="font-medium">{data.date || "Date"} at {data.time || "Time"}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-widest text-sm opacity-60">Where</p>
                  <p className="font-medium">{data.venue || "Event Venue Location"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
