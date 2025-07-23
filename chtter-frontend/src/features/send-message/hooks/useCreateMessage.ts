import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client';

const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

export const useCreateMessage = () => {
  return useMutation(CREATE_MESSAGE);
};
