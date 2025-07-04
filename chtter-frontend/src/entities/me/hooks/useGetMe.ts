import type { User } from '@/entities';
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
  return useQuery<{ me: User }>(ME_QUERY);
};
