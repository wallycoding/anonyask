import { collections, documents, database } from "@/constants/config/firebase";
import { AvatarProps } from "@bigheads/core";
import { addDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import getCodeInfo from "./getCodeInfo";

const sendMessageByCode = async (code: string, message: string, avatar: AvatarProps) => {
  const codeInfo = await getCodeInfo(code);
  const data = {
    message,
    nid: codeInfo?.count ?? 0,
    avatar
  };
  if (codeInfo) {
    await updateDoc(documents.code(code), { count: increment(1) });
  } else {
    await setDoc(documents.code(code), { count: 1 });
  }
  await addDoc(collections.messages(code), data);
};

export default sendMessageByCode;
