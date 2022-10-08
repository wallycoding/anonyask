import { getAuth, signOut as signOutFire } from "firebase/auth";
import { app } from "@/constants/config/firebase";

const signOut = () => {
  return signOutFire(getAuth(app));
};

export default signOut;
