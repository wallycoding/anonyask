import { app, documents } from "@/constants/config/firebase";
import createDatabaseUser from "@/data/createUser";
import UserDatabaseEntity from "@/domain/entities/UserDatabaseEntity";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import React, { useContext, createContext, useState, useEffect, useMemo } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContext {
  user?: User | null;
  userDB: UserDatabaseEntity | null;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [userDB, setUserDB] = useState<UserDatabaseEntity | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const _auth = getAuth(app);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(_auth, (user) => {
      console.log("AonAuthState!", user);
      setUser(user);
      if (authLoading) setAuthLoading(false);
    });
    return unSubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    const unSubscribe = onSnapshot(
      documents.user(user.uid),
      async (snapshot) => {
        if (snapshot.exists()) {
          const userDB = snapshot.data() as UserDatabaseEntity;
          setUserDB(userDB);
        } else {
          await createDatabaseUser(user).catch(console.error);
        }
      }
    );
    return unSubscribe;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userDB, authLoading: authLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
export default AuthProvider;
