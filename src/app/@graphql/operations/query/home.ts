import { gql } from 'apollo-angular';
import { RESULT_INFO_FRAGMENT } from '../../fragment/result-info';
import { SHOP_PRODUCT_FRAGMENT } from '../../fragment/shop-product';

export const HOME_DATA = gql`

query homeData(
    $showPlatform: Boolean = false
  ) {

    
    pc: showProductsPlatforms(
      platform_id: ["4"],
      page: 1,
      items: 4,
      active:  ACTIVE,
      random: true
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
   offers: showProductsOffers(
      page: 1,
      items: 4,
      active:  ACTIVE,
      random: true,
      lastUnits: -1,
      topPrice: 40
    ) {
      message
      status
      shopProducts {
        ...ShopProductObject 
      }
      info {
        ...ResultInfoObject
      }
    }

    carousel: showProductsOffers(
      page: 1,
      items: 6,
      active:  ACTIVE,
      random: true,
      lastUnits: 20,
      topPrice: -1

    ) {
      message
      status
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