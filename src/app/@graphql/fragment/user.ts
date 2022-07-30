

import { gql } from 'apollo-angular';

export const USER_FRAGMENT = gql`
  fragment UserObject on User {
    id
      name
      lastName
      email
      password
      role
      registerDate
      birthDate
  }
`;