import { USER_FRAGMENT } from './../../fragment/user';
import { gql } from 'apollo-angular';


export const REGISTER = gql `

    mutation Mutation($user: UserInput!,$include: Boolean!) {
        register(user: $user) {
            status
            message
            users {
                ...UserObject
            }
        }
    }

    ${USER_FRAGMENT}

`