import { gql } from 'apollo-angular';

export const RESULT_INFO_FRAGMENT = gql`
  fragment ResultInfoObject on ResultInfo {
    page
    total
    itemsPage
    totalPages
  }
`;
