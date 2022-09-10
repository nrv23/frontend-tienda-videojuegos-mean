import { closeAlert } from './../../../../@shared/alerts/alerts';
import { ActivatedRoute } from '@angular/router';
import { Platform } from './../../../../interface/ProductsOffers';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from './../../../../@core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { loadData } from 'src/app/@shared/alerts/alerts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute
  ) {}

  product: IProduct = {
    id: '1',
    img: '',
    name: '',
    rating: {
      count: 1,
      value: 1,
    },
    description: '',
    qty: 1,
    stock: 1,
    price: 1,
    discount: 0,
    priceDiscount: 1,
  };
  selectedImage: string;
  currencySelected: string = CURRENCIES_SYMBOL[CURRENCY_LIST.US_DOLLAR];
  screenShots: string[] = [];
  platforms = [];
  randmonItems: IProduct[] = [];
  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.router.params.subscribe((response) => {
      loadData("Cargando...","",400).then(() => {
        
        this.changePlatformSearch(+response.id);
      })
    });
  }

  changeValue(qty: number) {
    console.log(qty);
  }
  changeImage(url: string) {
    this.selectedImage = url;
  }

  changePlatformSearch(id: number | string) {
    this.productService
      .getShopProductsDetails(+id, 6, true, true)
      .subscribe((response) => {

        const { shopProductDetails, shopProductRandomItems } = response;

        if (shopProductDetails.status) {
          const { shopProducts } = shopProductDetails;
          this.product.id = shopProducts[0].id;
          this.product.img = shopProducts[0].product.img;
          this.product.name = shopProducts[0].product.name;
          this.product.rating = shopProducts[0].product.rating;
          this.product.description = shopProducts[0].platform.name;
          this.product.qty = 1;
          this.product.stock = shopProducts[0].stock;
          this.product.price = shopProducts[0].price;

          this.selectedImage = this.product.img;
          this.screenShots = shopProducts[0].product.shortScreenshots;

          this.platforms = shopProducts[0].relationalProducts;
        }

        if (shopProductRandomItems.status) {
          this.randmonItems = [];
          const { shopProducts } = shopProductRandomItems;
          shopProducts.forEach((product) => {
            this.randmonItems.push({
              id: product.id,
              img: product.product.img,
              name: product.product.name,
              rating: product.product.rating,
              qty: 1,
              stock: product.stock,
              price: product.price,
              description: product.platform.name,
            });
          });
        }
        this.loading = false;
        closeAlert();
      }, (err: Error) => {
        console.log(err.message);
      });
  }
}
