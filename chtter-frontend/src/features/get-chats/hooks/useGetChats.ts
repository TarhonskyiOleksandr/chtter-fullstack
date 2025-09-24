import { graphql } from "@/shared/api/graphql";
import type { QueryChatsArgs } from "@/shared/api/graphql/gql/graphql";
import { useQuery } from "@apollo/client";

export const GET_CHATS = graphql(`
  query Chats($offset: Int!, $limit: Int!) {
    chats(offset: $offset, limit: $limit) {
      ...ChatFragment
    }
  }
`);

export const useGetChats = (variables: QueryChatsArgs) => {
  return useQuery(GET_CHATS, { variables });
};
