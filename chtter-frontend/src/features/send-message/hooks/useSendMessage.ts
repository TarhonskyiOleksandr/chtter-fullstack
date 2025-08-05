import { useSubscription } from '@apollo/client';

import { graphql } from '@/shared/api/graphql';
import type { SubscriptionMessageCreatedArgs } from '@/shared/api/graphql/gql/graphql';
import { updateMessages } from '../utils';

const MESSAGE_CREATED = graphql(`
  subscription messageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

export const useSendMessage = (
  variables: SubscriptionMessageCreatedArgs
) => {
  return useSubscription(MESSAGE_CREATED, { 
    variables,
    onData: ({ client, data: { data } }) => {
      if (data) updateMessages(client.cache, data.messageCreated);
    },
  });
};
