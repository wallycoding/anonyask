import { User } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { documents } from "@/constants/config/firebase";

const createDatabaseUser = async (user: User) => {
  const userDB = {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    code: user.uid.slice(0, 10),
  };
  const response = await setDoc(documents.user(user.uid), userDB);
  return [userDB, response];
};

export default createDatabaseUser;
