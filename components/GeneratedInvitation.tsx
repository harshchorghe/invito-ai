"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FileText, Image as ImageIcon, Video as VideoIcon, Download, ArrowLeft } from "lucide-react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { Button } from "./ui/Button";
import type { InvitationPreviewData } from "@/components/InvitationScene";
import { InvitationArtwork } from "./InvitationArtwork";
import type { InvitationOutputFormat } from "@/lib/invitationDraft";

type GeneratedInvitationProps = {
  data: InvitationPreviewData;
  type: string;
  format: InvitationOutputFormat;
  onBack?: () => void;
};

const formatLabels: Record<InvitationOutputFormat, string> = {
  image: "Image",
  pdf: "PDF",
  mp4: "MP4",
};

export function GeneratedInvitation({ data, type, format, onBack }: GeneratedInvitationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const videoUrlRef = useRef<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const formatIcon = useMemo(() => {
    if (format === "pdf") return <FileText size={16} />;
    if (format === "mp4") return <VideoIcon size={16} />;
    return <ImageIcon size={16} />;
  }, [format]);

  const handleDownloadImage = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);

    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `invito-${type}-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error("Export image failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
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
    } catch (error) {
      console.error("Export PDF failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!videoUrl) return;

    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `invito-${type}-${Date.now()}.mp4`;
    link.click();
  };

  useEffect(() => {
    if (format !== "mp4") {
      return;
    }

    let isActive = true;

    const renderVideo = async () => {
      setIsGenerating(true);
      setVideoError(null);

      try {
        const response = await fetch("/api/render/video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, data }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        if (!isActive) {
          URL.revokeObjectURL(url);
          return;
        }

        if (videoUrlRef.current) {
          URL.revokeObjectURL(videoUrlRef.current);
        }

        videoUrlRef.current = url;
        setVideoUrl(url);
      } catch (error) {
        if (isActive) {
          setVideoError(error instanceof Error ? error.message : "Failed to render video.");
        }
      } finally {
        if (isActive) {
          setIsGenerating(false);
        }
      }
    };

    void renderVideo();

    return () => {
      isActive = false;

      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
        videoUrlRef.current = null;
      }
    };
  }, [data, format, type]);

  const canDownload = format === "image" || format === "pdf";

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-6 pb-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-muted-foreground">Generated {formatLabels[format]}</p>
          <h1 className="text-3xl font-bold capitalize">{type} invitation ready</h1>
          <p className="text-muted-foreground">This screen only handles the selected output and the download action.</p>
        </div>

        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft size={16} />
          Back to editor
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-2xl">
          {format === "mp4" ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-3">
              <div className="mb-3 flex items-center justify-between px-2">
                <div>
                  <p className="text-sm font-medium text-white">Rendered MP4 Preview</p>
                  <p className="text-xs text-muted-foreground">This is the actual exported video generated on the server.</p>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">{formatLabels[format]}</span>
              </div>

              <div className="flex aspect-3/4 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
                {isGenerating || !videoUrl ? (
                  <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                    <span>{videoError ? "Video render failed" : "Rendering video..."}</span>
                    {videoError ? <span className="max-w-[28rem] text-xs text-red-300">{videoError}</span> : null}
                  </div>
                ) : (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 p-6">
              <InvitationArtwork
                ref={canvasRef}
                data={data}
                type={type}
                className={`relative flex aspect-[3/4] w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-10 text-center shadow-2xl ${data.template === "modern" ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/30 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Download</p>
            <h2 className="mt-2 text-2xl font-semibold">{formatLabels[format]} export</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {canDownload
                ? "Download the generated invitation in the selected format."
                : "MP4 output still needs server-side rendering, so the download action is not wired yet."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-white">
              {formatIcon}
              <span className="font-medium capitalize">{formatLabels[format]}</span>
            </div>

            {canDownload ? (
              <Button
                onClick={format === "pdf" ? handleDownloadPDF : handleDownloadImage}
                className="w-full gap-2"
                disabled={isGenerating}
              >
                <Download size={16} />
                {isGenerating ? "Generating..." : `Download ${formatLabels[format]}`}
              </Button>
            ) : (
              <Button onClick={handleDownloadVideo} className="w-full gap-2" disabled={!videoUrl || isGenerating}>
                <Download size={16} />
                {isGenerating ? "Generating..." : "Download MP4"}
              </Button>
            )}
          </div>

          {canDownload ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
              The generated artwork below is what gets exported, so what you download matches the final screen.
            </div>
          ) : null}

          {format === "mp4" ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
              The video above is rendered server-side, so you can both play it here and download the same MP4 file.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
