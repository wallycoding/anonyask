import getMessagesByPage from "@/data/getMessagesByPage";
import MessageEntity from "@/domain/entities/MessageEntity";
import { useEffect, useMemo, useState } from "react";

const useMessages = (
  code: string | undefined,
  page: number,
  size: number = 20
) => {
  const [data, setData] = useState<MessageEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return void data.length && setData([]);
    (async () => {
      try {
        if (data.length) {
          setData([]);
          setLoading(true);
        }
        const dataFromFirebase = await getMessagesByPage(code, page, size);
        setData(dataFromFirebase);
        setLoading(false);
      } catch {
        console.error("error to get askList");
      }
    })();
  }, [code, page]);

  return [data, setData, loading] as [
    MessageEntity[],
    React.Dispatch<React.SetStateAction<MessageEntity[]>>,
    boolean
  ];
};

export default useMessages;
