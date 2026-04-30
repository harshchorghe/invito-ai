import type { InvitationPreviewData } from "@/components/InvitationScene";

export type InvitationOutputFormat = "image" | "pdf" | "mp4";

export const DEFAULT_INVITATION_DRAFT: InvitationPreviewData = {
  title: "",
  hostName: "",
  date: "",
  time: "",
  venue: "",
  message: "",
  themeColor: "#ffffff",
  template: "classic",
  uploadedCard: "",
  animationType: "float-blobs",
};

const DRAFT_STORAGE_PREFIX = "invito:create-draft";

export const getDraftStorageKey = (type: string) => `${DRAFT_STORAGE_PREFIX}:${type}`;

export const loadInvitationDraft = (type: string): InvitationPreviewData => {
  if (typeof window === "undefined") {
    return DEFAULT_INVITATION_DRAFT;
  }

  const storedDraft = window.sessionStorage.getItem(getDraftStorageKey(type));

  if (!storedDraft) {
    return DEFAULT_INVITATION_DRAFT;
  }

  try {
    return { ...DEFAULT_INVITATION_DRAFT, ...JSON.parse(storedDraft) } as InvitationPreviewData;
  } catch {
    return DEFAULT_INVITATION_DRAFT;
  }
};

export const saveInvitationDraft = (type: string, draft: InvitationPreviewData) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(getDraftStorageKey(type), JSON.stringify(draft));
};