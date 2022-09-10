import { SHOP_PRODUCT_FRAGMENT } from './../../fragment/shop-product';
import { gql } from 'apollo-angular';


export const SHOP_PRODUCT_DETAILS = gql`

query ShowProductsOffersDetails($id: Int!,$items: Int, $random: Boolean,$showPlatform: Boolean = true) {
  shopProductDetails(id: $id) {
    message
    status
    shopProducts {
      id
      productId
      active
      price
      stock
      product {
        id
        name
        img
        rating {
          count
          value
        }
        shortScreenshots
      }
      platform {
        id
        name
      }
      relationalProducts {
        id
        platform {
          id
          name
        }
      }
    }
  }
  shopProductRandomItems:showProductsOffers(items: $items, random: $random) {
      message
      status
      shopProducts {
        ...ShopProductObject
      }
  }
}

${SHOP_PRODUCT_FRAGMENT}

`