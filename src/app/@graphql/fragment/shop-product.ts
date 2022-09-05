import { PLATFORM_FRAGMENT } from './platform';
import { gql } from 'apollo-angular';

export const SHOP_PRODUCT_FRAGMENT = gql`
  fragment ShopProductObject on ShopProduct {
    id
    product {
      name
      img
      rating {
        count
        value
      }
    }
    platform @include(if:$showPlatform) {
      ...PlatformObject
    }
    price
    stock
  }

  ${PLATFORM_FRAGMENT}
`;
