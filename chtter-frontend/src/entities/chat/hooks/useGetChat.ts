import { useQuery } from '@apollo/client';

import { graphql } from '@/shared/api/graphql';
import type { ChatQueryVariables } from '@/shared/api/graphql/gql/graphql';

const GET_CHAT = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
`);

export const useGetChat = (variables: ChatQueryVariables) => {
  return useQuery(GET_CHAT, { variables });
};
