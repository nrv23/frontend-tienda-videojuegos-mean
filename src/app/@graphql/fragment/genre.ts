import { gql } from 'apollo-angular';


export const GENRE_FRAGMENT = gql`

    fragment GenreObject on Genre {
        id
        name
        slug
        active
    }
`;