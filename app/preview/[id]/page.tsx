"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getInvitationFromDb, type StoredInvitation } from "@/lib/invitationStore";
import { InvitationArtwork } from "@/components/InvitationArtwork";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const VenueMap = dynamic(() => import("@/components/VenueMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 mt-8 glass border border-white/10 rounded-2xl flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  ),
});

export default function PreviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [invitation, setInvitation] = useState<StoredInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvitation() {
      if (!id) return;
      try {
        const data = await getInvitationFromDb(id);
        if (data) {
          setInvitation(data);
        } else {
          setError("Invitation not found");
        }
      } catch (err) {
        console.error("Failed to fetch invitation:", err);
        setError("Error loading invitation");
      } finally {
        setLoading(false);
      }
    }

    void fetchInvitation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black text-white text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Oops!</h1>
        <p className="text-muted-foreground mb-8">{error || "Invitation not found"}</p>
        <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create your own invitation
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black pb-20">
      {/* Top Banner CTA */}
      <div className="bg-primary/10 border-b border-primary/20 p-3 text-center flex items-center justify-center gap-4">
        <span className="text-sm font-medium text-primary/80">
          Create your own beautiful invitations with Invito AI
        </span>
        <Link href="/" className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/30 transition-colors">
          Try it now
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold capitalize text-white mb-3">You're Invited!</h1>
            <p className="text-muted-foreground text-lg">
              {invitation.data.hostName ? `${invitation.data.hostName} sent you this invitation.` : "Check out this beautiful invitation."}
            </p>
          </div>

          <div className={`grid gap-8 items-stretch ${invitation.data.venue ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
            <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-2xl backdrop-blur-sm w-full h-full">
              <InvitationArtwork
                data={invitation.data}
                type={invitation.type}
                className={`relative flex aspect-[3/4] w-full max-w-[480px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-10 text-center shadow-2xl ${
                  invitation.data.template === "modern" ? "bg-zinc-900 text-white" : "bg-white text-black"
                }`}
              />
            </div>

            {invitation.data.venue && (
              <div className="w-full h-full flex flex-col min-h-[400px]">
                <VenueMap venue={invitation.data.venue} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
