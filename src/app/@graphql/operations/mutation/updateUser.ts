
import { gql } from 'apollo-angular';

export const UPDATE_USER = gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      status
      message
    }
  }
`;
