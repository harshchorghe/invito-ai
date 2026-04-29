"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, Mail, Lock } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/home");
    }
  }, [authLoading, router, user]);

  if (authLoading || user) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/home");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex-1 flex items-center justify-center p-6 from-primary/10 via-background to-background"
      style={{ backgroundImage: "radial-gradient(ellipse at top, var(--tw-gradient-stops))" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md glass border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8 text-sm">
            Sign in to continue to Invito
          </p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-black/20"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-black/20"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            
            <Button className="w-full mt-6" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
