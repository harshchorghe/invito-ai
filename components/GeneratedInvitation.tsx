"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FileText, Image as ImageIcon, Video as VideoIcon, Download, ArrowLeft, Share2, Check, Copy } from "lucide-react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { Button } from "./ui/Button";
import type { InvitationPreviewData } from "@/components/InvitationScene";
import { InvitationArtwork } from "./InvitationArtwork";
import type { InvitationOutputFormat } from "@/lib/invitationDraft";
import { useAuth } from "./AuthProvider";
import { saveInvitationToDb, updateInvitationInDb } from "@/lib/invitationStore";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordingExtension, setRecordingExtension] = useState<"mp4" | "webm">("webm");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

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
    if (!recordingUrl) return;

    const link = document.createElement("a");
    link.href = recordingUrl;
    link.download = `invito-${type}-${Date.now()}.${recordingExtension}`;
    link.click();
  };

  const handleShare = async () => {
    setIsSharing(true);
    setShareUrl(null);
    try {
      let id = data.id;
      if (id) {
        await updateInvitationInDb(id, data, type, format, user?.uid || null);
      } else {
        id = await saveInvitationToDb(data, type, format, user?.uid || null);
      }
      const url = `${window.location.origin}/preview/${id}`;
      setShareUrl(url);
    } catch (error) {
      console.error("Failed to share", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  // Previously server-side rendered via /api/render/video. That endpoint is removed
  // in favor of client-side preview animations and an experimental screen-record flow.
  useEffect(() => {
    if (format !== "mp4") return;
    // Clear previous recording state
    setRecordingUrl(null);
    setRecordingError(null);
  }, [data, format, type]);

  const startRecording = async () => {
    if (!canvasRef.current) {
      setRecordingError("Preview not available to record.");
      return;
    }

    try {
      setRecordingError(null);

      // Ask user to share the tab/window. Instruct to choose this tab for best result.
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: false });

      recordedChunksRef.current = [];
      const mp4Mime = "video/mp4;codecs=avc1.42E01E,mp4a.40.2";
      const webmMime = "video/webm;codecs=vp9";
      const mime = MediaRecorder.isTypeSupported(mp4Mime) ? mp4Mime : webmMime;
      setRecordingExtension(mime.includes("mp4") ? "mp4" : "webm");
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      recorderRef.current = recorder;

      recorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) recordedChunksRef.current.push(ev.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: mime });
        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);
        // stop all tracks from getDisplayMedia
        stream.getTracks().forEach((t) => t.stop());
        setIsGenerating(false);
      };

      recorder.onerror = (ev) => {
        setRecordingError(String((ev as any).error || 'Recording error'));
        setIsGenerating(false);
      };

      recorder.start();
      setIsGenerating(true);
    } catch (err) {
      setRecordingError(err instanceof Error ? err.message : 'Failed to start recording');
      setIsGenerating(false);
    }
  };

  const stopRecording = () => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      rec.stop();
    }
  };

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
                  <p className="text-sm font-medium text-white">MP4 Preview (client-side)</p>
                  <p className="text-xs text-muted-foreground">This preview uses the selected animation preset. Use screen-record to capture MP4.</p>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">{formatLabels[format]}</span>
              </div>

              <div className="flex aspect-3/4 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
                <div ref={canvasRef} className="w-full h-full flex items-center justify-center p-6">
                  <InvitationArtwork
                    data={data}
                    type={type}
                    className={`relative flex aspect-3/4 w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-10 text-center shadow-2xl ${data.template === "modern" ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
                    animated={true}
                    animationType={data.animationType || "float-blobs"}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 p-6">
              <InvitationArtwork
                ref={canvasRef}
                data={data}
                type={type}
                className={`relative flex aspect-3/4 w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-10 text-center shadow-2xl ${data.template === "modern" ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
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
                : "MP4 output uses client-side recording from the preview animation."}
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
              <div className="space-y-2">
                <Button onClick={startRecording} className="w-full gap-2" disabled={isGenerating}>
                  <VideoIcon size={16} />
                  {isGenerating ? "Recording..." : "Start Recording"}
                </Button>
                <Button variant="outline" onClick={stopRecording} className="w-full gap-2" disabled={!isGenerating}>
                  Stop Recording
                </Button>
                <Button onClick={handleDownloadVideo} className="w-full gap-2" disabled={!recordingUrl || isGenerating}>
                  <Download size={16} />
                  Download MP4
                </Button>
                {recordingError ? <p className="text-xs text-red-300">{recordingError}</p> : null}
              </div>
            )}

            <Button
              variant="outline"
              onClick={handleShare}
              className="w-full gap-2 mt-3"
              disabled={isSharing || (format === "mp4" && (!recordingUrl || isGenerating))}
            >
              <Share2 size={16} />
              {isSharing ? "Creating Link..." : "Create Shareable Link"}
            </Button>

            {shareUrl && (
              <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2">
                <div className="text-xs text-muted-foreground truncate flex-1">{shareUrl}</div>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-md hover:bg-white/10 text-primary transition-colors"
                  title="Copy link"
                >
                  {hasCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
            )}
          </div>

          {canDownload ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
              The generated artwork below is what gets exported, so what you download matches the final screen.
            </div>
          ) : null}

          {format === "mp4" ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
              Element animations are applied to title, message, and details based on your animation preset.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
