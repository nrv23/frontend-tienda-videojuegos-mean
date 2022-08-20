

import { gql } from 'apollo-angular';

export const USER_FRAGMENT = gql`
  fragment UserObject on User {
    id
      name
      lastName
      email
      password @include(if:$include)
      role
      registerDate @include(if:$include)
      birthDate @include(if:$include)
      active
  } 
`;

// @include directiva para incluir o no un campo en el query