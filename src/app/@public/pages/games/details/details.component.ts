import { CartService } from './../../../core/services/cart.service';
import { closeAlert } from './../../../../@shared/alerts/alerts';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from './../../../../@core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { loadData } from 'src/app/@shared/alerts/alerts';
import { CURRENCY_SELECTED } from 'src/app/@core/constants/config';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private cartService:CartService
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
  currencySelected: string = CURRENCY_SELECTED;
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

    this.cartService.itemsVar$.subscribe(cart => {
      if(cart.subtotal === 0) {
        this.product!.qty = 1;
      } else {
        const productFound = this.findProduct(this.product.id);
        this.product!.qty = productFound ? productFound!.qty : this.product!.qty;
      }
    })
  }

  findProduct(id:string) {

    return this.cartService.cart.products.find(product => product.id === id); // devuelve un objeto
  }
  changeValue(qty: number) {
    this.product!.qty = qty;
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
          //this.product.qty = 1;
          const productFound = this.findProduct(this.product.id);
          this.product!.qty = productFound ? productFound!.qty : this.product!.qty;
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

  addToCart() {
    this.cartService.manageProduct(this.product);
  }
}
