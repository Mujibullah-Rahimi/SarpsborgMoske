import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore"; // No need to import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Variables to hold Firebase services
let app;
let authInstance: Auth; // Keep Auth for type checking
let dbInstance: Firestore;

// Lazy Firebase Initialization
export function initializeFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  authInstance = authInstance || getAuth(app);
  dbInstance = dbInstance || getFirestore(app);

  authInstance.useDeviceLanguage();

  return { app, auth: authInstance, db: dbInstance };
}

export function getAuthInstance() {
  if (!authInstance) {
    initializeFirebase();
  }
  return authInstance;
}

export function getDbInstance() {
  if (!dbInstance) {
    initializeFirebase();
  }
  return dbInstance;
}