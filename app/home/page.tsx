"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Gift, Heart, Store, Calendar as CalendarIcon, Clock, Trash2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { getUserInvitations, deleteUserInvitation, type UserInvitationMeta } from "@/lib/invitationStore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [recentInvites, setRecentInvites] = useState<UserInvitationMeta[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  useEffect(() => {
    if (user?.uid) {
      getUserInvitations(user.uid)
        .then(data => setRecentInvites(data))
        .catch(err => console.error("Error fetching invites:", err))
        .finally(() => setLoadingInvites(false));
    }
  }, [user]);

  const handleDelete = async (inviteId: string, metaId: string) => {
    if (!user?.uid) return;
    
    if (window.confirm("Are you sure you want to delete this invitation? This action cannot be undone.")) {
      try {
        await deleteUserInvitation(user.uid, metaId, inviteId);
        setRecentInvites(prev => prev.filter(inv => inv.id !== metaId));
      } catch (err) {
        console.error("Failed to delete invitation:", err);
        alert("Failed to delete invitation. Please check your network and permissions.");
      }
    }
  };

  if (loading || !user) {
    return null;
  }

  const categories = [
    { id: "wedding", title: "Wedding", icon: <Heart className="w-6 h-6 text-pink-500" />, color: "bg-pink-500/10 border-pink-500/20" },
    { id: "birthday", title: "Birthday", icon: <Gift className="w-6 h-6 text-blue-500" />, color: "bg-blue-500/10 border-blue-500/20" },
    { id: "opening", title: "Grand Opening", icon: <Store className="w-6 h-6 text-green-500" />, color: "bg-green-500/10 border-green-500/20" },
    { id: "custom", title: "Custom Event", icon: <CalendarIcon className="w-6 h-6 text-purple-500" />, color: "bg-purple-500/10 border-purple-500/20" },
  ];



  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-6 pt-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.displayName?.trim() || user?.email?.split("@")[0] || "Creator"}!
          </h1>
          <p className="text-muted-foreground">What are we celebrating today?</p>
        </div>
        <Link href="/create/custom">
          <Button className="gap-2">
            <Plus size={16} />
            Create Custom
          </Button>
        </Link>
      </div>

      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Start from a category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link key={cat.id} href={`/create/${cat.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border ${cat.color} hover:bg-white/5 transition-all cursor-pointer glass`}
              >
                <div className="mb-4 p-4 rounded-full bg-background border border-white/10 shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="font-medium text-lg">{cat.title}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Invitations</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {loadingInvites ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">Loading your invitations...</div>
          ) : recentInvites.map((invite, idx) => (
            <motion.div
              key={invite.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="glass border border-white/10 rounded-2xl p-5 hover:border-primary/50 transition-colors group h-full"
            >
              <div className="aspect-video bg-zinc-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <span className="text-zinc-600 text-sm">Preview Thumbnail</span>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link href={`/preview/${invite.invitationId}`}>
                    <Button variant="secondary" size="sm">View</Button>
                  </Link>
                  <Link href={`/create/${invite.type}?edit=${invite.invitationId}`}>
                    <Button variant="default" size="sm">Edit</Button>
                  </Link>
                </div>
              </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg truncate">{invite.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={12}/> 
                        {invite.createdAt?.toDate ? new Date(invite.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
                        {invite.type}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="-mr-2 -mt-1 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    onClick={() => handleDelete(invite.invitationId, invite.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </motion.div>
          ))}
          
          <Link href="/create/custom" className="block h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="h-full min-h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Plus size={24} />
              </div>
              <span className="font-medium">Create New</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
