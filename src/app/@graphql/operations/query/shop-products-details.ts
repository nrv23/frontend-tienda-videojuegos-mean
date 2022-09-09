import { gql } from 'apollo-angular';


export const SHOP_PRODUCT_DETAILS = gql`

query ShowProductsOffersDetails($id: Int!) {
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
}

`