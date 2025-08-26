/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_MESSAGES } from '@/entities/message/hooks/useGetMessages';
import { GET_CHATS } from '@/features/get-chats/hooks/useGetChats';
import type { Message } from '@/shared/api/graphql/gql/graphql';
import type { ApolloCache } from '@apollo/client';


export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const query = {
    query: GET_MESSAGES,
    variables: { 
      chatId: message.chatId 
    },
  };
  const queryRes = cache.readQuery({ ...query });

  cache.writeQuery({
    ...query,
    data: {
      messages: [...(queryRes?.messages || []), message],
    },
  });
};

export const updateLatestMessages = (cache: ApolloCache<any>, message: Message) => {
  const chats = [
    ...(cache.readQuery({ query: GET_CHATS })?.chats || [])
  ];
  const updatedChats = chats.map((chat) => {
    if (chat._id === message.chatId) return { ...chat, latestMessage: message };
    return chat;
  });

  cache.writeQuery({
    query: GET_CHATS,
    data: {
      chats: updatedChats,
    },
  });
};
