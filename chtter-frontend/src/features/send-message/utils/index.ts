/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_MESSAGES } from '@/entities/message/hooks/useGetMessages';
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
