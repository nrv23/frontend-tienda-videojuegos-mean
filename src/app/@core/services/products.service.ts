import { IProductPlatforms } from './../../interface/ProductsPlatforms';
import { AuthHelper } from 'src/app/utils/auth';
import { SHOP_LAST_UNITS_OFFERS } from '../../@graphql/operations/query/shop-product-offers';
import { ApiService } from './../../@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { STATE_VALUES_FILTER } from '../constants/filters';
import { map } from 'rxjs/internal/operators/map';
import { IProductsOffers } from 'src/app/interface/ProductsOffers';
import { SHOP_PRODUCT_PLATFORMS } from 'src/app/@graphql/operations/query/shop-product-platforms';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService {
  private helper: AuthHelper = new AuthHelper();

  constructor(apollo: Apollo) {
    super(apollo);
    /*
    Cuando una clase hereda de otra, se usa el super para enviar el mismo numero de variables y el mismo tipo de variables
    que la clase padre tiene en su constructor inicializadas.
    Las variables deben ser publicas para que la clase padre pueda detectarlas
    */
  }

  getProductsOffers(
    page: number = 1,
    items: number = 10,
    active: STATE_VALUES_FILTER = STATE_VALUES_FILTER.ACTIVE,
    random: boolean = false,
    lastUnits: number = -1,
    topPrice: number = -1
  ) {
    return this.query(
      SHOP_LAST_UNITS_OFFERS,
      { page, items, active, random, lastUnits, topPrice },
      {
        headers: new HttpHeaders().set('Authorization', this.helper.getToken()),
      }
    ).pipe(map((response) => response as IProductsOffers));
  }

  getProductsByPlatform(
    platformId: string[],
    page: number = 1,
    items: number = 10,
    active: STATE_VALUES_FILTER = STATE_VALUES_FILTER.ACTIVE,
    random: boolean = true
  ) {
    return this.query(SHOP_PRODUCT_PLATFORMS,{platformId,page,items,active,random},{
      headers: new HttpHeaders().set('Authorization', this.helper.getToken()),
    }).pipe(map((response) => response as IProductPlatforms));
  }
}
