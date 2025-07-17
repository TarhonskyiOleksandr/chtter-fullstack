import { useMutation } from '@apollo/client';

import { ChatFragment, graphql } from '@/shared/api/graphql';

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      _id,
      name,
      userId,
      userIds,
      isPrivate
    }
  }
`);

export const useCreateChat = () => {
  return useMutation(createChatDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChat = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
            });

            return [...existingChats, newChat];
          }
        }
      })
    }
  });
};
