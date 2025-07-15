import { graphql } from "@/shared/api/graphql";
import { useQuery } from "@apollo/client";

const getChatsDocument = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

export const useGetChats = () => {
  return useQuery(getChatsDocument);
};
