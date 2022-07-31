import { gql } from 'apollo-angular';


export const REGISTER = gql `

    mutation Mutation($user: UserInput!) {
        register(user: $user)
    }

`