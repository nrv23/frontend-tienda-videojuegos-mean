import { RESULT_INFO_FRAGMENT } from './../../fragment/result-info';
import { USER_FRAGMENT } from './../../fragment/user';
import { gql } from 'apollo-angular';

export const USERS= gql`
    query Query($include: Boolean!, $page: Int,$items: Int ) {
        users(page: $page, items: $items) {
            info {
                ...ResultInfoObject
            }
            status
            message
            users {
                ...UserObject
            }
        }
    }

    ${USER_FRAGMENT}
    ${RESULT_INFO_FRAGMENT}
`;