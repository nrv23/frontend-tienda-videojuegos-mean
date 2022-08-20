import { gql } from 'apollo-angular';

export const BLOCK_GENRE = gql`
  mutation BlockGenre($id: ID!, $active: Boolean!) {
    blockGenre(id: $id, active: $active) {
      status
      message
      genre {
        id
        name
        slug
        active
      }
    }
  }
`;
