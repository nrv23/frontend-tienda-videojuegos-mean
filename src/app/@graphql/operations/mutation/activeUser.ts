import { gql } from 'apollo-angular';

export const ACTIVE_USER = gql`
  mutation ActiveUser(
    $id: ID!
    $birthDate: String!
    $password: String!
  ) {
    activeUser(id: $id, birthDate: $birthDate, password: $password) {
      status
      message
    }
  }
`;
