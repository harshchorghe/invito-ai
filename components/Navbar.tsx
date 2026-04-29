"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, LogOut, Sparkles, UserCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "@/components/AuthProvider";

export function Navbar() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Creator";

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">Invito</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</Link>
          <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {loading ? (
            <Button variant="ghost" className="hidden sm:inline-flex" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 bg-black/10 text-sm text-muted-foreground">
                <UserCircle2 className="h-4 w-4 text-primary" />
                <span className="max-w-35 truncate">{displayName}</span>
              </div>
              <Button
                variant="ghost"
                className="hidden sm:inline-flex"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
