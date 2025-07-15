import { graphql } from "../gql";

graphql(`
  fragment ChatFragment on Chat {
    _id,
    name,
    userId,
    userIds,
    isPrivate
  }  
`);
