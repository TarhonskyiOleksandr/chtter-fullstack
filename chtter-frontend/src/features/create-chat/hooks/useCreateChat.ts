import { useMutation } from '@apollo/client';
import { graphql } from '@/shared/api/graphql';

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
  return useMutation(createChatDocument);
};
