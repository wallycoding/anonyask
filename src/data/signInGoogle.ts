import { app } from "@/constants/config/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(app), provider);
};

export default signInGoogle;
