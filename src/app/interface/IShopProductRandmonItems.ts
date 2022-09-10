import { ShopProduct } from './ProductsOffers';
import { IResponse } from './Response';

export interface IShopProductRandomItems {
    shopProductRandomItems:ShopProductRandomItemsResponse
}


export interface ShopProductRandomItemsResponse extends IResponse {
    shopProducts: ShopProduct[];
}