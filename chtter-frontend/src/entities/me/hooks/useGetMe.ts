import { gql, useQuery } from '@apollo/client';

const ME_QUERY = gql`
  query Me {
    me {
      _id,
      name,
      email
    }
  }
`

export const useGetMe = () => {
  return useQuery(ME_QUERY);
};
