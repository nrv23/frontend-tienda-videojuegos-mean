import { gql } from 'apollo-angular';
import { GENRE_FRAGMENT } from '../../fragment/genre';

export const UPDATE_GENRE = gql`
  mutation updateGenre($genre: GenreInput!) {
    updateGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }

  ${GENRE_FRAGMENT}
`;
