import { gql } from 'apollo-angular';

export const RESET_PASSWORD_EMAIL = gql`
  mutation ResetPasswordEmail($email: String!) {
    resetPasswordEmail(email: $email) {
      status
      message
    }
  }
`;
