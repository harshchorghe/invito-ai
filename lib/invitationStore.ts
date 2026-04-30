import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where, deleteDoc, type FieldValue } from "firebase/firestore";
import { db } from "./firebase";
import type { InvitationPreviewData } from "@/components/InvitationScene";
import type { InvitationOutputFormat } from "./invitationDraft";

type FirestoreTimestampLike = {
  toDate?: () => Date;
} | FieldValue;

export type StoredInvitation = {
  id?: string;
  userId: string | null;
  type: string;
  format: InvitationOutputFormat;
  data: InvitationPreviewData;
  createdAt: FirestoreTimestampLike;
};

export const saveInvitationToDb = async (
  data: InvitationPreviewData,
  type: string,
  format: InvitationOutputFormat,
  userId: string | null
): Promise<string> => {
  if (!db) {
    throw new Error("Firestore is not initialized. Please check your Firebase configuration.");
  }

  const invitationsRef = collection(db, "invitations");
  
  const invitationDoc: Omit<StoredInvitation, "id"> = {
    userId,
    type,
    format,
    data,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(invitationsRef, invitationDoc);

  // If a user is logged in, also store a reference in their users collection
  if (userId) {
    const userInvitationsRef = collection(db, "users", userId, "invitations");
    await addDoc(userInvitationsRef, {
      invitationId: docRef.id,
      type,
      format,
      createdAt: serverTimestamp(),
      title: data.title || "Untitled Invitation",
    });
  }

  return docRef.id;
};

export const getInvitationFromDb = async (id: string): Promise<StoredInvitation | null> => {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }

  const docRef = doc(db, "invitations", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as StoredInvitation;
  }

  return null;
};

export const updateInvitationInDb = async (
  id: string,
  data: InvitationPreviewData,
  type: string,
  format: InvitationOutputFormat,
  userId: string | null
): Promise<void> => {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }

  const invitationRef = doc(db, "invitations", id);
  await updateDoc(invitationRef, {
    data,
    type,
    format,
  });

  if (userId) {
    const userInvitationsRef = collection(db, "users", userId, "invitations");
    const q = query(userInvitationsRef, where("invitationId", "==", id));
    const querySnapshot = await getDocs(q);
    
    // Use Promise.all to await all updates if there are duplicates
    await Promise.all(
      querySnapshot.docs.map((docSnap) =>
        updateDoc(docSnap.ref, {
          title: data.title || "Untitled Invitation",
          type,
          format,
        })
      )
    );
  }
};

export type UserInvitationMeta = {
  id: string;
  invitationId: string;
  type: string;
  format: InvitationOutputFormat;
  title: string;
  createdAt: FirestoreTimestampLike;
};

export const getUserInvitations = async (userId: string): Promise<UserInvitationMeta[]> => {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }

  const userInvitationsRef = collection(db, "users", userId, "invitations");
  const q = query(userInvitationsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as UserInvitationMeta[];
};

export const deleteUserInvitation = async (userId: string, metaId: string, invitationId: string): Promise<void> => {
  if (!db) {
    throw new Error("Firestore is not initialized.");
  }

  // Delete the meta document from the user's collection
  const metaRef = doc(db, "users", userId, "invitations", metaId);
  await deleteDoc(metaRef);

  // Delete the main public invitation document
  const invitationRef = doc(db, "invitations", invitationId);
  await deleteDoc(invitationRef);
};
