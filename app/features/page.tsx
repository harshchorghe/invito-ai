"use client";

import { motion } from "framer-motion";
import { Sparkles, Video, Download, Palette, Zap, Globe } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      title: "Customizable Design",
      description: "Tweak colors, fonts, and layouts to match your event's exact vibe. Total creative freedom without the complexity."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Micro-Animations",
      description: "Our templates come with built-in smooth interactions that delight your guests and make your invitation stand out."
    },
    {
      icon: <Video className="w-8 h-8 text-blue-500" />,
      title: "Video Export (Coming Soon)",
      description: "Turn your static invitation into a dynamic MP4 video, perfect for Instagram stories and WhatsApp sharing."
    },
    {
      icon: <Download className="w-8 h-8 text-green-500" />,
      title: "High-Quality PDF & PNG",
      description: "Instantly download your invitations in high-resolution formats suitable for both digital sharing and physical printing."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "AI-Powered Assistance",
      description: "Stuck on what to write? Our upcoming Gemini integration will help you craft the perfect personal message."
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-500" />,
      title: "Hosted Links",
      description: "Publish your invitation to a unique, private URL and track RSVPs directly from your dashboard."
    }
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-6 pt-12 pb-24">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Everything you need to <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
            invite beautifully.
          </span>
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
