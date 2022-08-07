import { GENRE_FRAGMENT } from './../../fragment/genre';
import { RESULT_INFO_FRAGMENT } from './../../fragment/result-info';
import { gql } from 'apollo-angular';

export const GENRES = gql`
  query Genres($page: Int, $items: Int) {
    genres(page: $page, items: $items) {
      status
      message
      info {
        ...ResultInfoObject 
      }
      genre {
        ...GenreObject
      }
    }
  }

  ${RESULT_INFO_FRAGMENT}
  ${GENRE_FRAGMENT}
`;
