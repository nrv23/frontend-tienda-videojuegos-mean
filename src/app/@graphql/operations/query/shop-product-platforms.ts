import { RESULT_INFO_FRAGMENT } from './../../fragment/result-info';
import { gql } from 'apollo-angular';
import { SHOP_PRODUCT_FRAGMENT } from '../../fragment/shop-product';

export const SHOP_PRODUCT_PLATFORMS = gql`
  query ShowProductsPlatforms(
    $platformId: [ID!]!
    $page: Int
    $items: Int
    $active: ActiveFilterEnum
    $random: Boolean
    $showPlatform: Boolean = true
  ) {
    showProductsPlatforms(
      platform_id: $platformId
      page: $page
      items: $items
      active: $active
      random: $random
    ) {
      status
      message
      shopProducts {
        ...ShopProductObject
      }
      info {
        ...ResultInfoObject
      }
    }
  }

  ${SHOP_PRODUCT_FRAGMENT}
  ${RESULT_INFO_FRAGMENT}
`;
