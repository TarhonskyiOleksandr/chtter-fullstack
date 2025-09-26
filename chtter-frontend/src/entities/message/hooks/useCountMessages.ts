import { useCallback, useState } from "react";

export const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/messages/count?chatId=${chatId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) return console.log(res);

    const { messages } = await res.json();

    setMessagesCount(messages);
  }, [chatId]);

  return {
    messagesCount,
    countMessages,
  };
};
