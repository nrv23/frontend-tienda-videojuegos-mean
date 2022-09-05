import { gql } from "apollo-angular";

export const PLATFORM_FRAGMENT = gql`

    fragment PlatformObject on Platform {
        id
        name
        slug
    }

`;