import { ShopProduct } from './../../../interface/ProductsOffers';
import { ProductsService } from './../../../@core/services/products.service';
import { STATE_VALUES_FILTER } from 'src/app/@core/constants/filters';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ResultInfo } from 'src/app/interface/ResultInfo';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  productList: IProduct[] = [];
  shopProductsPlatform: ShopProduct[];
  title: string;
  infoPage: ResultInfo = {
    page: 1,
    itemsPage: 20,
    total: 160,
    totalPages: 8
  };
  ngOnInit(): void {

    this.loadData();
  }


  loadData() {

    this.productService
    .getProductsByPlatform(['4'], this.infoPage.page, this.infoPage.itemsPage, STATE_VALUES_FILTER.ACTIVE, false)
    .subscribe(
      (response) => {
        const {
          showProductsPlatforms: { status, message, shopProducts,info },
        } = response;

        if (status) {

          

          this.infoPage = {
            page: info.page,
            total: info.total,
            totalPages: info.totalPages,
            itemsPage: info.itemsPage,
          }
          
          this.shopProductsPlatform = shopProducts;
          this.productList = [];

          // carga la lista de productos
          this.shopProductsPlatform.map(product => {
            this.productList.push({
              id: product.id,
              img: product.product.img,
              name: product.product.name,
              rating: product.product.rating,
              description: "",
              qty: 1,
              price: product.price,
              stock: product.stock,
            })
          });
        }
      },
      (err: Error) => {
        console.log(err.message);
      }
    );

  }    
}
