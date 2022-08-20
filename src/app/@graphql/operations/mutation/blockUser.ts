import { gql } from 'apollo-angular';

export const BLOCK_USER = gql`
  mutation Mutation($id: ID!, $active: Boolean!) {
    blockUser(id: $id, active: $active) {
      message
      status
    }
  }
`;
