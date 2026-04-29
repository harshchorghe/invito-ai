"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for testing and small personal events.",
      features: [
        "Up to 3 invitations per month",
        "Standard templates",
        "Export as PNG",
        "Watermark on export"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      description: "Ideal for event organizers and power users.",
      features: [
        "Unlimited invitations",
        "Premium & Custom templates",
        "Export as PNG, PDF, and Video",
        "No watermarks",
        "Priority Support",
        "Custom domain hosting"
      ],
      cta: "Upgrade to Pro",
      popular: true
    }
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-6 pt-12 pb-24">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          No hidden fees. Choose the plan that works best for your needs.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative glass p-8 rounded-3xl border ${plan.popular ? 'border-primary/50 ring-1 ring-primary/50' : 'border-white/10'} flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>
            
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/signup" className="mt-auto">
              <Button className="w-full py-6 text-lg rounded-xl" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
