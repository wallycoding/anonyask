import { collections } from "@/constants/config/firebase";
import MessageEntity from "@/domain/entities/MessageEntity";
import {
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";

const getMessagesByPage = async (code: string, page: number, size: number) => {
  const queries = query(
    collections.messages(code),
    orderBy("nid", "asc"),
    startAt((page - 1) * size),
    limit(size)
  );
  const response = await getDocs(queries);
  return response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as MessageEntity[];
};

export default getMessagesByPage;
