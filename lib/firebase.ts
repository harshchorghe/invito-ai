import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfigKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
] as const;

const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

const requiredEnvNames = {
  apiKey: "AIzaSyDQrBM7d86MFcWe6SOlTUcd-LSwXbOwEGY",
  authDomain: "invito-ai-13160.firebaseapp.com",
  projectId: "invito-ai-13160",
  storageBucket: "invito-ai-13160.firebasestorage.app",
  messagingSenderId: "418008546950",
  appId: "1:418008546950:web:75a6aec93396fb7d5b5b07",
} as const;

export const firebaseReady = missingKeys.length === 0;

export const firebaseConfigError = firebaseReady
  ? null
  : new Error(
      `Missing Firebase environment variables: ${missingKeys
        .map((key) => requiredEnvNames[key])
        .join(", ")}`
    );

const app = firebaseReady
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;