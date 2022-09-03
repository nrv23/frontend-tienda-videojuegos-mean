import { ShopProduct } from './../../../interface/ProductsOffers';
import { ProductsService } from './../../../@core/services/products.service';

import { ICarouselItem } from './../../../interface/ICarouselItem';
// import items from '@data/carousel.json';
// import products from '@data/products.json';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { STATE_VALUES_FILTER } from 'src/app/@core/constants/filters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: ICarouselItem[] = [];

  shopProducts: ShopProduct[];
  shopProductsPlatform: ShopProduct[];
  listOne : IProduct[] = [];
  listTow: IProduct[] = [];
  //listTree;
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    //this.productsList = products; // Traer los valores cargados en el products.json u otros

    //this.listTree = this.fakeRandomProductList();

    this.productService
      .getProductsOffers(1, 4, STATE_VALUES_FILTER.ACTIVE, true, -1, 40)
      .subscribe(
        (response) => {
          const {
            showProductsOffers: { message, status, shopProducts },
          } = response;

          if (status) {
            this.shopProducts = shopProducts;

            this.shopProducts.map(product => {
              this.listOne.push({
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

    this.productService
      .getProductsByPlatform('4', 1, 4, STATE_VALUES_FILTER.ACTIVE, true)
      .subscribe(
        (response) => {
          const {
            showProductsPlatforms: { status, message, shopProducts },
          } = response;

          if (status) {
            this.shopProductsPlatform = shopProducts;

            this.shopProductsPlatform.map(product => {
              this.listTow.push({
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

      // se va cargar el carousel


      this.productService
      .getProductsOffers(1, 6, STATE_VALUES_FILTER.ACTIVE, true, 20, -1)
      .subscribe(
        (response) => {
          const {
            showProductsOffers: { message, status, shopProducts },
          } = response;

          if (status) {
            this.shopProducts = shopProducts;

            this.shopProducts.map(product => {
             this.items.push({
              id: product.id,
              title: product.product.name,
              description: "",
              background: product.product.img,
              url: ""
             });
            });

            console.log(this.items)
          }
        },
        (err: Error) => {
          console.log(err.message);
        }
      );
  }
}