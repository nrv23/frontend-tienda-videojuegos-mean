import { ShopProductRandomItemsResponse } from './IShopProductRandmonItems';
import { ShopProduct } from './ProductsOffers';
import { IResponse } from './Response';
export interface IShopProductDetails  {   
    shopProductDetails: ShopProductDetailsResponse;
    shopProductRandomItems: ShopProductRandomItemsResponse;
}
interface ShopProductDetailsResponse extends IResponse{
    shopProducts: ShopProduct[]
}