import { gql, useMutation } from '@apollo/client';
import type { User } from '@/entities';

interface CreateUserInput {
  createUserInput: {
    email: string;
    name: string;
    password: string;
  }
}

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id,
      name,
      email
    }
  }
`

export const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER)
}
