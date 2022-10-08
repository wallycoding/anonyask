import { collections, documents } from "@/constants/config/firebase";
import { getDocs, query, where } from "firebase/firestore";

const getUserDBByCode = async (code: string) => {
  const queries = query(collections.users, where("code", "==", code));
  const response = await getDocs(queries);
  return response.empty ? null : response.docs[0].data();
};

export default getUserDBByCode;
