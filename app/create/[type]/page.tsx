"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { CanvasPreview } from "@/components/CanvasPreview";
import { Button } from "@/components/ui/Button";
import { FileText, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import type { InvitationOutputFormat } from "@/lib/invitationDraft";
import { loadInvitationDraft, saveInvitationDraft } from "@/lib/invitationDraft";
import { INVITATION_TEMPLATES } from "@/lib/templates";

export default function CreateInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;

  const [formData, setFormData] = useState(() => loadInvitationDraft(type));
  const [outputFormat, setOutputFormat] = useState<InvitationOutputFormat>("image");

  useEffect(() => {
    saveInvitationDraft(type, formData);
  }, [formData, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        uploadedCard: typeof reader.result === "string" ? reader.result : "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const colors = [
    "#ffffff", "#fef08a", "#fbcfe8", "#bfdbfe", "#bbf7d0", "#e9d5ff", "#fecaca"
  ];

  const outputOptions: Array<{
    value: InvitationOutputFormat;
    label: string;
    description: string;
    icon: ReactNode;
  }> = [
    {
      value: "image",
      label: "Image",
      description: "Download a shareable PNG version.",
      icon: <ImageIcon size={16} />,
    },
    {
      value: "pdf",
      label: "PDF",
      description: "Create a print-ready PDF file.",
      icon: <FileText size={16} />,
    },
    {
      value: "mp4",
      label: "MP4",
      description: "Open the animated video screen.",
      icon: <VideoIcon size={16} />,
    },
  ];

  const handleGenerate = () => {
    saveInvitationDraft(type, formData);
    router.push(`/create/${type}/generate/${outputFormat}`);
  };

  return (
    <div className="flex-1 w-full mx-auto p-6 h-[calc(100vh-64px)]" style={{ maxWidth: 1600 }}>
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        
        {/* Left Pane: Editor */}
        <div className="w-full lg:w-1/3 flex flex-col h-full overflow-y-auto pr-2 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass border border-white/10 rounded-2xl p-6"
          >
            <h1 className="text-2xl font-bold mb-2 capitalize">{type} Invitation</h1>
            <p className="text-muted-foreground mb-8">Customize your invitation details below.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Physical Invitation Card</label>
                <label className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-black/15 px-4 py-6 text-center cursor-pointer hover:border-primary/50 hover:bg-black/20 transition-colors">
                  <div>
                    <p className="font-medium">Drop or choose a card image</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, or WEBP. This becomes the reference for the live preview.
                    </p>
                  </div>
                  <Input type="file" accept="image/*" onChange={handleCardUpload} className="hidden" />
                  <span className="text-sm text-primary font-medium">Browse files</span>
                </label>

                {formData.uploadedCard ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    <div className="relative h-40 w-full">
                      <Image
                        src={formData.uploadedCard}
                        alt="Uploaded invitation reference"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
                      <span>Reference card loaded</span>
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setFormData((prev) => ({ ...prev, uploadedCard: "" }))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Sarah's 25th Birthday" 
                  className="bg-black/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Host / Family Name</label>
                <Input
                  name="hostName"
                  value={formData.hostName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah & James"
                  className="bg-black/20"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    name="date" 
                    type="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    className="bg-black/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    name="time" 
                    type="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    className="bg-black/20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Venue Location</label>
                <Input 
                  name="venue" 
                  value={formData.venue} 
                  onChange={handleChange} 
                  placeholder="e.g. 123 Celebration Ave, NY" 
                  className="bg-black/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Personal Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Join us to celebrate..."
                  className="flex w-full rounded-md border border-input bg-black/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  style={{ minHeight: 120 }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.values(INVITATION_TEMPLATES).map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setFormData(prev => ({ ...prev, template: tpl.id, themeColor: tpl.fallbackBackground }))}
                      className={`py-2 px-3 rounded-lg border text-sm capitalize transition-all ${
                        formData.template === tpl.id ? "border-primary bg-primary/10 text-primary" : "border-white/10 hover:border-white/30"
                      }`}
                      type="button"
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Theme Color</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData(prev => ({ ...prev, themeColor: color }))}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        formData.themeColor === color ? "border-primary scale-110" : "border-transparent hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                      type="button"
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Generate As</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {outputOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setOutputFormat(option.value)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        outputFormat === option.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        {option.icon}
                        {option.label}
                      </div>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium">Preview stays here.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The selected format opens a separate screen so the editor does not get crowded.
                </p>
              </div>

              <Button onClick={handleGenerate} className="w-full gap-2">
                <VideoIcon size={16} />
                Generate {outputFormat.toUpperCase()}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Pane: Live Preview */}
        <div className="w-full lg:w-2/3 h-full pb-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full"
          >
            <CanvasPreview data={formData} type={type} />
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
