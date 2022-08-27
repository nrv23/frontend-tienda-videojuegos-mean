import { DocumentNode } from '@apollo/client';
import { gql } from 'apollo-angular';

export const ACTIVE_USER_EMAIL: DocumentNode = gql`
  mutation ActiveUserEmail($id: ID!, $email: String!) {
    activeUserEmail(id: $id, email: $email) {
      message
      status
    }
  }
`;
