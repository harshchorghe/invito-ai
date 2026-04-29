"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { CanvasPreview } from "@/components/CanvasPreview";

export default function CreateInvitationPage() {
  const params = useParams();
  const type = params.type as string;

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    message: "",
    themeColor: "#ffffff",
    template: "classic",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const colors = [
    "#ffffff", "#fef08a", "#fbcfe8", "#bfdbfe", "#bbf7d0", "#e9d5ff", "#fecaca"
  ];

  return (
    <div className="flex-1 max-w-[1600px] w-full mx-auto p-6 h-[calc(100vh-64px)]">
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
                <label className="text-sm font-medium">Event Title</label>
                <Input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Sarah's 25th Birthday" 
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
                  className="flex w-full rounded-md border border-input bg-black/20 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[120px] resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Template Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['classic', 'modern', 'playful', 'minimal'].map((tpl) => (
                    <button
                      key={tpl}
                      onClick={() => setFormData(prev => ({ ...prev, template: tpl }))}
                      className={`py-2 px-3 rounded-lg border text-sm capitalize transition-all ${
                        formData.template === tpl ? "border-primary bg-primary/10 text-primary" : "border-white/10 hover:border-white/30"
                      }`}
                      type="button"
                    >
                      {tpl}
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
