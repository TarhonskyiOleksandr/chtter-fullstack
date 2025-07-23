import { useMutation } from '@apollo/client';

import { GET_MESSAGES } from '@/entities/message/hooks/useGetMessages';
import { graphql } from '@/shared/api/graphql';

const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

export const useCreateMessage = (chatId: string) => {
  return useMutation(CREATE_MESSAGE, {
    update(cache, { data }) {
      const query = {
        query: GET_MESSAGES,
        variables: { chatId },
      };
      const queryRes = cache.readQuery({ ...query });

      if (!queryRes || !data?.createMessage) return;

      cache.writeQuery({
        ...query,
        data: {
          messages: [...queryRes.messages, data.createMessage],
        },
      });
    }
  });
};
