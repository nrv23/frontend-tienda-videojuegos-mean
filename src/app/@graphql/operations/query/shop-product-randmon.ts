import { gql } from 'apollo-angular';
import { SHOP_PRODUCT_FRAGMENT } from '../../fragment/shop-product';

export const SHOP_PRODUCT_RANDOM_ITEMS = gql`
  query randomItems($items: Int, $random: Boolean,$showPlatform: Boolean = true) {
    shopProductRandomItems:showProductsOffers(items: $items, random: $random) {
      message
      status
      shopProducts {
        ...ShopProductObject
      }
    }
  }

  ${SHOP_PRODUCT_FRAGMENT}
`;

