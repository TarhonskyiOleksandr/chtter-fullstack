import { useMutation } from '@apollo/client';
import { graphql } from '@/shared/api/graphql';

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id,
      name,
      email
    }
  }
`);

export const useCreateUser = () => {
  return useMutation(createUserDocument);
};
