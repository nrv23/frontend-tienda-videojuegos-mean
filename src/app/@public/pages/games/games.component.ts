
import { ActivatedRoute } from '@angular/router';
import { ShopProduct } from './../../../interface/ProductsOffers';
import { ProductsService } from './../../../@core/services/products.service';
import { STATE_VALUES_FILTER } from 'src/app/@core/constants/filters';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ResultInfo } from 'src/app/interface/ResultInfo';
import { GAMES_PAGES_INFO } from 'src/app/@core/constants/game.constants';
import { loadData,closeAlert } from 'src/app/@shared/alerts/alerts';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  productList: IProduct[] = [];
  shopProductsPlatform: ShopProduct[];
  title: string;
  description: string;
  topPrice: number;
  stock: number;
  platformsIds: string[] = [];
  filter: string;
  infoPage: ResultInfo = {
    page: 1,
    itemsPage: 20,
    total: 160,
    totalPages: 8,
  };
  loading: boolean = true;

  ngOnInit(): void {
    
    this.route.params.subscribe(({ type, filter }) => {
      this.loading = true
     loadData("Cargando...","").then(() => {

      console.log({ type, filter });
      const { 
        title, 
        description, 
        platformsIds, 
        topPrice, 
        stock 
      } = GAMES_PAGES_INFO[`${type}/${filter}`];
      
      this.filter = filter;
      this.infoPage.page = 1;
      
      if (filter !== 'offers' && filter !== 'last-units') {
        this.description = description;
        this.title = title;
        this.platformsIds = platformsIds;
        //this.topPrice = topPrice;
        //this.stock = stock;
        this.loadData();
      } else {
        this.description = description;
        this.title = title;
        this.platformsIds = platformsIds;
        this.topPrice = topPrice;
        this.stock = stock;

        this.loadData();
      }
     })
    });
  }

  getProductsByPlatforms() {
    this.productService
      .getProductsByPlatform(
        this.platformsIds,
        this.infoPage.page,
        this.infoPage.itemsPage,
        STATE_VALUES_FILTER.ACTIVE,
        false,
        true
      )
      .subscribe(
        (response) => {
          const {
            showProductsPlatforms: { status, message, shopProducts, info },
          } = response;

          if (status) {
            this.loading = false;
            closeAlert();
            this.infoPage = {
              page: info.page,
              total: info.total,
              totalPages: info.totalPages,
              itemsPage: info.itemsPage,
            };

            this.shopProductsPlatform = shopProducts;
            this.productList = [];

            // carga la lista de productos
            this.shopProductsPlatform.map((product) => {
              this.productList.push({
                id: product.id,
                img: product.product.img,
                name: product.product.name,
                rating: product.product.rating,
                description: product.platform.name,
                qty: 1,
                price: product.price,
                stock: product.stock,
              });
            });
          }
        },
        (err: Error) => {
          console.log(err.message);
        }
      );
  }

  getProductsByOffers() {
    this.productService
      .getProductsOffers(
        this.infoPage.page,
        this.infoPage.itemsPage,
        STATE_VALUES_FILTER.ACTIVE,
        false,
        this.stock,
        this.topPrice,
        true
      )
      .subscribe(
        (response) => {
          const {
            showProductsOffers: { message, status, shopProducts, info },
          } = response;

          if (status) {

            this.loading = false;
            closeAlert();

            this.infoPage = {
              page: info.page,
              total: info.total,
              totalPages: info.totalPages,
              itemsPage: info.itemsPage,
            };

            this.shopProductsPlatform = shopProducts;
            this.productList = [];

            // carga la lista de productos
            this.shopProductsPlatform.map((product) => {
              this.productList.push({
                id: product.id,
                img: product.product.img,
                name: product.product.name,
                rating: product.product.rating,
                description: product.platform.name,
                qty: 1,
                price: product.price,
                stock: product.stock,
              });
            });

            console.log(this.productList);
          }
        },
        (err: Error) => {
          console.log(err.message);
        }
      );
  }

  loadData() {
    if (this.filter !== 'offers' && this.filter !== 'last-units') {
      this.getProductsByPlatforms();
    } else {
      this.getProductsByOffers();
    }
  }
}
