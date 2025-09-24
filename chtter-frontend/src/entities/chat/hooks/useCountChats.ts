import { useCallback, useState } from "react";

export const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chats/count`);

    if (!res.ok) return console.log(res);

    setChatsCount(parseInt(await res.text()));
  }, []);

  return {
    chatsCount,
    countChats,
  };
};
