import { gql } from 'apollo-angular';
import { SHOP_PRODUCT_FRAGMENT } from '../../fragment/shop-product';

export const SHOP_PRODUCT_PLATFORMS = gql`
  query ShowProductsPlatforms(
    $platformId: ID!
    $page: Int
    $items: Int
    $active: ActiveFilterEnum
    $random: Boolean
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
    }
  }

  ${SHOP_PRODUCT_FRAGMENT}
`;
