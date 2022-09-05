import { ShowProductsOffers } from './ProductsOffers';
import { ShowProductsPlatforms } from './ProductsPlatforms';

export interface IHomeDataResponse {
    pc: ShowProductsPlatforms;
    offers: ShowProductsOffers;
    carousel: ShowProductsOffers;
} 