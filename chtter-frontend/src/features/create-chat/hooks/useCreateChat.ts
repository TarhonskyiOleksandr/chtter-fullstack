import { useMutation } from '@apollo/client';

import { ChatFragment, graphql } from '@/shared/api/graphql';

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

export const useCreateChat = () => {
  return useMutation(createChatDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
              fragmentName: 'ChatFragment',
            });

            return [...existingChats, newChatRef];
          }
        }
      })
    }
  });
};
