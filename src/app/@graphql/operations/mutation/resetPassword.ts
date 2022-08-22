import { gql } from 'apollo-angular';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($id: ID!, $password: String!) {
    resetPassword(id: $id, password: $password) {
      status
      message
    }
  }
`;
