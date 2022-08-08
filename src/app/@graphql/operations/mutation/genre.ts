import { gql } from 'apollo-angular';
import { GENRE_FRAGMENT } from '../../fragment/genre';

export const ADD_GENRE = gql`
  mutation Mutation($genre: String!) {
    addGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }

  ${GENRE_FRAGMENT}
`;
