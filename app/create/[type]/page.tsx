"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { CanvasPreview } from "@/components/CanvasPreview";
import { Button } from "@/components/ui/Button";
import { FileText, Image as ImageIcon, Video as VideoIcon, MapPin, Loader2 } from "lucide-react";
import type { InvitationOutputFormat } from "@/lib/invitationDraft";
import { loadInvitationDraft, saveInvitationDraft } from "@/lib/invitationDraft";
import { INVITATION_TEMPLATES, type TemplateStyle } from "@/lib/templates";
import { ANIMATION_PRESETS, DEFAULT_ANIMATION, type AnimationPreset } from "@/lib/animations";
import { getInvitationFromDb } from "@/lib/invitationStore";

const templateStyles = Object.keys(INVITATION_TEMPLATES) as TemplateStyle[];

const isTemplateStyle = (value: string | null): value is TemplateStyle => {
  return Boolean(value && templateStyles.includes(value as TemplateStyle));
};

export default function CreateInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = params.type as string;

  const [formData, setFormData] = useState(() => loadInvitationDraft(type));
  const [outputFormat, setOutputFormat] = useState<InvitationOutputFormat>("image");
  const [isMounted, setIsMounted] = useState(false);
  const [templateAnimated, setTemplateAnimated] = useState(true);
  const [animationPreset, setAnimationPreset] = useState<AnimationPreset>(DEFAULT_ANIMATION);
  const [showPresetBanner, setShowPresetBanner] = useState(true);

  const [venueSearch, setVenueSearch] = useState("");
  const [venueResults, setVenueResults] = useState<{ display_name: string }[]>([]);
  const [isSearchingVenue, setIsSearchingVenue] = useState(false);
  const [showVenueResults, setShowVenueResults] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const editId = searchParams.get("edit");
    const templateParam = searchParams.get("template");
    const pendingTemplate = typeof window !== "undefined" ? window.sessionStorage.getItem("invito:pending-template") : null;

    if (editId) {
      getInvitationFromDb(editId).then(invite => {
        if (invite && invite.data) {
          setFormData({ ...invite.data, id: invite.id });
          setOutputFormat(invite.format);
          setVenueSearch(invite.data.venue || "");
        }
      }).catch(console.error);
      return;
    }

    const selectedTemplate = isTemplateStyle(templateParam)
      ? templateParam
      : isTemplateStyle(pendingTemplate)
        ? pendingTemplate
        : null;

    if (selectedTemplate) {
      setFormData((prev) => ({
        ...prev,
        template: selectedTemplate,
        themeColor: INVITATION_TEMPLATES[selectedTemplate].fallbackBackground,
      }));

      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("invito:pending-template");
      }
    }
  }, [searchParams, type]);

  useEffect(() => {
    if (isMounted) {
      saveInvitationDraft(type, formData);
      if (!venueSearch && formData.venue) {
        setVenueSearch(formData.venue);
      }
    }
  }, [formData, type, isMounted]);

  useEffect(() => {
    if (formData.animationType) {
      setAnimationPreset(formData.animationType);
    }
  }, [formData.animationType]);

  useEffect(() => {
    if (!venueSearch || venueSearch === formData.venue) {
      setVenueResults([]);
      setShowVenueResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingVenue(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(venueSearch)}&limit=5`;
        const res = await fetch(url);
        const data = await res.json();
        setVenueResults(data || []);
        setShowVenueResults(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearchingVenue(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [venueSearch, formData.venue]);

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

  if (!isMounted) return null;

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
            {isMounted && formData.template && showPresetBanner ? (
              <div className="mb-4 rounded-lg border border-white/10 bg-black/20 p-3 flex items-center justify-between gap-4">
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">Opened from</div>
                  <div className="font-medium">Templates — Preset: {INVITATION_TEMPLATES[formData.template].label}</div>
                </div>
                <button type="button" onClick={() => setShowPresetBanner(false)} className="text-sm text-muted-foreground hover:text-white">Dismiss</button>
              </div>
            ) : null}
            
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
              
              <div className="space-y-2 relative">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Venue Location</span>
                  {isSearchingVenue && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                </label>
                <Input 
                  value={venueSearch}
                  onChange={(e) => {
                    setVenueSearch(e.target.value);
                    handleChange({ target: { name: 'venue', value: e.target.value } } as any);
                  }}
                  onFocus={() => {
                     if (venueResults.length > 0) setShowVenueResults(true);
                  }}
                  onBlur={() => {
                     setTimeout(() => setShowVenueResults(false), 200);
                  }}
                  placeholder="e.g. Times Square, NY" 
                  className="bg-black/20"
                  autoComplete="off"
                />
                
                {showVenueResults && venueResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {venueResults.map((res, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-primary/20 hover:text-white border-b border-white/5 last:border-0 transition-colors"
                        onClick={() => {
                          setVenueSearch(res.display_name);
                          setFormData(prev => ({ ...prev, venue: res.display_name }));
                          setShowVenueResults(false);
                        }}
                      >
                        {res.display_name}
                      </button>
                    ))}
                  </div>
                )}
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

              {outputFormat === "mp4" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template Animation</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <select
                        value={animationPreset}
                        onChange={(e) => {
                          const val = e.target.value as AnimationPreset;
                          setAnimationPreset(val);
                          setFormData(prev => ({ ...prev, animationType: val }));
                        }}
                        className="rounded-md bg-black/20 px-3 py-2"
                      >
                        {ANIMATION_PRESETS.map((p) => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setTemplateAnimated((s) => !s)}
                        className={`px-3 py-1 rounded-full border transition ${templateAnimated ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-muted-foreground'}`}
                      >
                        {templateAnimated ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Choose an animation preset to apply to the preview. MP4 exports are recorded client-side now.</p>
                  </div>
                </div>
              ) : null}

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
            <CanvasPreview data={formData} type={type} animated={outputFormat === 'mp4' ? templateAnimated : true} animationType={outputFormat === 'mp4' ? (animationPreset || 'float-blobs') : undefined} />
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
