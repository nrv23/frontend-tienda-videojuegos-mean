import { ShopProduct } from './ProductsOffers';
import { IResponse } from './Response';
export interface IShopProductDetails  {   
    shopProductDetails: ShopProductDetailsResponse
}
interface ShopProductDetailsResponse extends IResponse{
    shopProducts: ShopProduct[]
}