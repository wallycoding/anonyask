import { database, documents } from "@/constants/config/firebase";
import { doc, DocumentReference, getDoc } from "firebase/firestore";

const getSizeByCode = async (code: string) => {
  const doc = await getDoc(documents.code(code));
  return doc.data();
};

export default getSizeByCode;
