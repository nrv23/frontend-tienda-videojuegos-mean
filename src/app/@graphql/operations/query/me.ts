import { USER_FRAGMENT } from './../../fragment/user';


import { gql } from 'apollo-angular';

export const ME = gql`
 query Me($include: Boolean!) {
    me {
        status
        message
        users {
            ...UserObject
            }
        }
    }

  ${USER_FRAGMENT}
`;