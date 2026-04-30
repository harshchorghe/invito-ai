"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { GeneratedInvitation } from "@/components/GeneratedInvitation";
import { DEFAULT_INVITATION_DRAFT, loadInvitationDraft, type InvitationOutputFormat } from "@/lib/invitationDraft";

const validFormats: InvitationOutputFormat[] = ["image", "pdf", "mp4"];

export default function GeneratedInvitationPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;
  const rawFormat = params.format as string;

  const format = useMemo<InvitationOutputFormat>(() => {
    return validFormats.includes(rawFormat as InvitationOutputFormat) ? (rawFormat as InvitationOutputFormat) : "image";
  }, [rawFormat]);

  const data = useMemo(() => loadInvitationDraft(type), [type]);

  const hasDraft = useMemo(() => JSON.stringify(data) !== JSON.stringify(DEFAULT_INVITATION_DRAFT), [data]);

  if (!hasDraft) {
    return (
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No invitation draft found</h1>
        <p className="text-muted-foreground mb-8">Go back to the editor, fill the fields, and generate the output screen again.</p>
        <button
          type="button"
          onClick={() => router.push(`/create/${type}`)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to editor
        </button>
      </div>
    );
  }

  return <GeneratedInvitation data={data} type={type} format={format} onBack={() => router.push(`/create/${type}`)} />;
}