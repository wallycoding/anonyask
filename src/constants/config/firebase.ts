import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getFirestore,
} from "firebase/firestore";
import UserDatabaseEntity from "@/domain/entities/UserDatabaseEntity";
import CodeEntity from "@/domain/entities/CodeEntity";
import MessageEntity from "@/domain/entities/MessageEntity";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);

export const collections = {
  users: collection(
    database,
    "users"
  ) as CollectionReference<UserDatabaseEntity>,
  codes(code: string) {
    return collection(
      database,
      "codes",
      code
    ) as CollectionReference<CodeEntity>;
  },
  messages(code: string) {
    return collection(
      database,
      "codes",
      code,
      "messages"
    ) as CollectionReference<MessageEntity>;
  },
};

export const documents = {
  user(uid: string) {
    return doc(
      database,
      `users/${uid}`
    ) as DocumentReference<UserDatabaseEntity>;
  },
  code(code: string) {
    return doc(database, `codes/${code}`) as DocumentReference<CodeEntity>;
  },
};
