"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const templates = [
  { id: "wedding", title: "Classic Wedding", type: "Wedding", color: "bg-amber-100", textColor: "text-amber-900" },
  { id: "birthday", title: "Neon Birthday", type: "Birthday", color: "bg-fuchsia-200", textColor: "text-fuchsia-900" },
  { id: "opening", title: "Grand Opening", type: "Corporate", color: "bg-blue-100", textColor: "text-blue-900" },
  { id: "custom", title: "Minimalist Event", type: "Custom", color: "bg-zinc-200", textColor: "text-zinc-900" },
  { id: "wedding2", title: "Floral Romance", type: "Wedding", color: "bg-rose-100", textColor: "text-rose-900" },
  { id: "birthday2", title: "Kids Party", type: "Birthday", color: "bg-green-200", textColor: "text-green-900" },
];

export default function TemplatesPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-6 pt-12 pb-24">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Beautiful Templates for Every Occasion
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Start with a professionally designed template and make it your own.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((tpl, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div className={`aspect-[3/4] ${tpl.color} rounded-2xl mb-4 relative overflow-hidden shadow-lg border border-white/10 flex flex-col items-center justify-center p-8 text-center`}>
              <h3 className={`text-2xl font-bold ${tpl.textColor} mb-2`}>{tpl.title}</h3>
              <p className={`${tpl.textColor} opacity-70`}>Join us to celebrate...</p>
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                <Link href={`/create/${tpl.id.replace(/[0-9]/g, '')}`}>
                  <Button variant="default" className="w-32">Use Template</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center px-1">
              <h3 className="font-semibold text-lg">{tpl.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tpl.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
