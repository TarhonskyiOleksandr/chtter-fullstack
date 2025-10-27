import { useQuery } from '@apollo/client';
import { graphql } from '@/shared/api/graphql';

const getMeDocument = graphql(`
  query Me {
    me {
      ...UserFragment
    }
  }
`);

export const useGetMe = () => {
  return useQuery(getMeDocument);
};
