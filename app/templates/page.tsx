"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import templatesData from "@/templates";

export default function TemplatesPage() {
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(templatesData.map((t) => t.category)));
    return ["All", ...cats];
  }, []);

  const filtered = useMemo(() => {
    if (category === "All") return templatesData;
    return templatesData.filter((t) => t.category === category);
  }, [category]);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-6 pt-12 pb-24">
      <div className="text-center mb-8">
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

      <div className="mb-6 flex items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm border ${category === c ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((tpl, idx) => (
          <motion.div
            key={tpl.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.06 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div className={`aspect-[3/4] rounded-2xl mb-4 relative overflow-hidden shadow-lg border border-white/10 flex flex-col items-center justify-center p-8 text-center`}>
              <img src={tpl.thumbnail} alt={tpl.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold text-white mb-2`}>{tpl.name}</h3>
                <p className={`text-white/90 opacity-80`}>Elegant {tpl.category} template</p>
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                <Link href={`/templates/preview?template=${tpl.id}`}>
                  <Button variant="default" className="w-32">Preview</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center px-1">
              <h3 className="font-semibold text-lg">{tpl.name}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tpl.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
