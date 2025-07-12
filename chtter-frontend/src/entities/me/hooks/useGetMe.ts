import { useQuery } from '@apollo/client';
import { graphql } from '@/shared/api/graphql';

const getMeDocument = graphql(`
  query Me {
    me {
      _id,
      name,
      email
    }
  }
`);

export const useGetMe = () => {
  return useQuery(getMeDocument);
};
