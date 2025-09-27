import { useQuery } from '@apollo/client';

import { graphql } from '@/shared/api/graphql';
import type { MessagesQueryVariables } from '@/shared/api/graphql/gql/graphql';

export const GET_MESSAGES = graphql(`
  query Messages($chatId: String!, $offset: Int!, $limit: Int!) {
    messages(chatId: $chatId, offset: $offset, limit: $limit) {
      ...MessageFragment
    }
  }
`);

export const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(GET_MESSAGES, { variables });
}
