import { useMutation } from '@apollo/client';

import { graphql } from '@/shared/api/graphql';
import { updateMessages } from '../utils';

const CREATE_MESSAGE = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

export const useCreateMessage = () => {
  return useMutation(CREATE_MESSAGE, {
    update(cache, { data }) {
      if (data?.createMessage) updateMessages(cache, data?.createMessage);
    }
  });
};
