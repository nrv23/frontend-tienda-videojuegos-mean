import { USER_FRAGMENT } from './../../fragment/user';
import { gql } from 'apollo-angular';

export const USERS= gql`
    query Query($include: Boolea!) {
        users {
            status
            message
            users {
                ...UserObject
            }
        }
    }

    ${USER_FRAGMENT}
`;