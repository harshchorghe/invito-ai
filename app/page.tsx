"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, Calendar, Video, Download } from "lucide-react";

export default function LandingPage() {
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

        {/* Hero Image Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 w-full max-w-5xl mx-auto rounded-xl border border-white/10 glass p-2 shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-xl opacity-50"></div>
          <div className="aspect-[16/9] bg-zinc-900 rounded-lg overflow-hidden relative flex items-center justify-center">
            {/* Mockup content */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Interactive Preview</h3>
              <p className="text-zinc-400">Design Canvas goes here</p>
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
