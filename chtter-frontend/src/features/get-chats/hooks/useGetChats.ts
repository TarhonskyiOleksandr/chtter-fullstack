import { graphql } from "@/shared/api/graphql";
import { useQuery } from "@apollo/client";

export const GET_CHATS = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

export const useGetChats = () => {
  return useQuery(GET_CHATS);
};
