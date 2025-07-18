import { graphql } from "../gql";

export const ChatFragment = graphql(`
  fragment ChatFragment on Chat {
    _id,
    name,
    userId,
    userIds,
    isPrivate
  }  
`);
