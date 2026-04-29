"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, Calendar, Video, Download, MapPin, Clock } from "lucide-react";
import { InvitationArtwork } from "@/components/InvitationArtwork";
import type { TemplateStyle } from "@/lib/templates";

export default function LandingPage() {
  const demoTemplates = [
    {
      id: "elegant",
      label: "Elegant Gold",
      color: "#D4AF37",
      data: {
        title: "Sarah & James",
        hostName: "Together with their families",
        date: "2026-10-24",
        time: "16:00",
        venue: "The Grand Plaza Hotel, NY",
        message: "Join us as we celebrate our wedding day",
        themeColor: "#D4AF37",
        template: "elegant" as TemplateStyle,
        uploadedCard: ""
      }
    },
    {
      id: "indian",
      label: "Indian Traditional",
      color: "#ffdf00",
      data: {
        title: "Priya & Rahul",
        hostName: "The Sharma Family",
        date: "2026-11-15",
        time: "19:00",
        venue: "Taj Palace, Mumbai",
        message: "Inviting you to grace the auspicious occasion",
        themeColor: "#ffdf00",
        template: "indian" as TemplateStyle,
        uploadedCard: ""
      }
    },
    {
      id: "modern",
      label: "Modern Minimal",
      color: "#3b82f6",
      data: {
        title: "Alex's 30th",
        hostName: "Alex & Friends",
        date: "2026-08-12",
        time: "20:00",
        venue: "Skyline Lounge, Downtown",
        message: "Let's party all night!",
        themeColor: "#3b82f6",
        template: "modern" as TemplateStyle,
        uploadedCard: ""
      }
    },
    {
      id: "floral",
      label: "Floral Elegance",
      color: "#2d4a22",
      data: {
        title: "Emma's Baby Shower",
        hostName: "The Smith Family",
        date: "2026-09-05",
        time: "14:00",
        venue: "Botanical Gardens",
        message: "Celebrating our new arrival",
        themeColor: "#2d4a22",
        template: "floral" as TemplateStyle,
        uploadedCard: ""
      }
    },
    {
      id: "classic",
      label: "Classic Black & White",
      color: "#000000",
      data: {
        title: "Annual Gala",
        hostName: "Invito Corp",
        date: "2026-12-10",
        time: "18:30",
        venue: "Grand Ballroom, City Center",
        message: "A night of celebration and awards",
        themeColor: "#000000",
        template: "classic" as TemplateStyle,
        uploadedCard: ""
      }
    }
  ];

  const [currentDemoIdx, setCurrentDemoIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemoIdx((prev) => (prev + 1) % demoTemplates.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeDemo = demoTemplates[currentDemoIdx];

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Event Specific Templates",
      description: "Choose from a wide variety of templates for weddings, birthdays, corporate events, and more."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Stunning Animations",
      description: "Wow your guests with built-in micro-animations and smooth transitions that make your invitations come alive."
    },
    {
      icon: <Video className="w-6 h-6 text-primary" />,
      title: "Video Export",
      description: "Export your invitations as high-quality videos to share on social media or messaging apps."
    },
    {
      icon: <Download className="w-6 h-6 text-primary" />,
      title: "High-Res PDF & Image",
      description: "Download crystal clear images or print-ready PDFs for traditional distribution."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 glass text-sm text-muted-foreground mb-8">
            <Sparkles size={16} className="text-primary" />
            <span>The new way to invite</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Create invitations that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              leave a lasting impression.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Design stunning, animated invitations for any event in minutes. Export as Video, PDF, or Image. No design skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/home">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 rounded-full">
                Start Creating Free
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 rounded-full">
                View Templates
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Image Mockup - Live Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 w-full max-w-5xl mx-auto rounded-xl border border-white/10 glass p-4 md:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-xl opacity-50"></div>
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center bg-zinc-950/50 rounded-lg overflow-hidden border border-white/5 p-8">
            
            {/* Left side: Animated UI representation */}
            <div className="space-y-6 relative z-10 hidden md:block">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass border border-primary/20 bg-primary/5 p-4 rounded-xl max-w-xs shadow-lg backdrop-blur-md"
              >
                <div className="text-xs text-primary font-medium mb-1 uppercase tracking-wider">Template Selected</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo.id + "-label"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-semibold text-lg"
                  >
                    {activeDemo.label}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="glass border border-white/10 bg-white/5 p-4 rounded-xl max-w-xs ml-12 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeDemo.id + "-color"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner"
                      style={{ backgroundColor: activeDemo.color }}
                    ></motion.div>
                  </AnimatePresence>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Theme Color</div>
                    <div className="font-semibold flex items-center gap-2">
                      Dynamic <Sparkles size={14} className="text-primary"/>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="glass border border-white/10 bg-white/5 p-4 rounded-xl max-w-xs shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm font-medium">Smart Maps Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm font-medium">Auto-Formatting</span>
                </div>
              </motion.div>
            </div>

            {/* Right side: Live Artwork */}
            <div className="flex justify-center md:justify-end relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75"></div>
              
              <motion.div
                whileHover={{ scale: 1.02, rotateY: -5 }}
                className="perspective-1000 w-full flex justify-center md:justify-end"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo.id}
                    initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <InvitationArtwork
                      data={activeDemo.data}
                      type="wedding"
                      className="relative flex aspect-[3/4] w-full max-w-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/20 p-8 text-center shadow-2xl bg-zinc-900 text-white transform-gpu"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Invito provides all the tools to make your event stand out from the very first touchpoint.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-primary/20 to-zinc-900 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to make magic?</h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of people who use Invito to create memorable experiences for their guests.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-lg px-10 rounded-full py-6 h-auto">
                Get Started for Free
              </Button>
            </Link>
          </div>
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        </motion.div>
      </section>
    </div>
  );
}
