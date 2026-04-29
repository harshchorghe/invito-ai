"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, firebaseConfigError, firebaseReady } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => firebaseReady);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    if (!auth) {
      throw firebaseConfigError ?? new Error("Firebase is not configured.");
    }

    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignUp = async (name: string, email: string, password: string) => {
    if (!auth) {
      throw firebaseConfigError ?? new Error("Firebase is not configured.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const displayName = name.trim();
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    if (db) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: displayName || email.split("@")[0],
        email,
        createdAt: serverTimestamp(),
      });
    }
  };

  const handleSignOut = async () => {
    if (!auth) {
      throw firebaseConfigError ?? new Error("Firebase is not configured.");
    }

    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}