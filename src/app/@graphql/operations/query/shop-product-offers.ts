import { SHOP_PRODUCT_FRAGMENT } from './../../fragment/shop-product';
import { gql } from 'apollo-angular';

export const SHOP_LAST_UNITS_OFFERS = gql`
  query ShowProductsOffers(
    $page: Int
    $items: Int
    $active: ActiveFilterEnum
    $random: Boolean
    $lastUnits: Int
    $topPrice: Float!
  ) {
    showProductsOffers(
      page: $page
      items: $items
      active: $active
      random: $random
      lastUnits: $lastUnits
      topPrice: $topPrice
    ) {
      message
      status
      shopProducts {
        ...ShopProductObject 
      }
    }
  }

  ${SHOP_PRODUCT_FRAGMENT}
`;
