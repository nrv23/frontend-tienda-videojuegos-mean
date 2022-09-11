import { CartService } from './../../../@public/core/services/cart.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {

  @Input() title: string = 'Título de la categoría';
  @Input() productList: IProduct[] = [] ;
  @Input() description?: string = "" ;


  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {
    // Usar la información del producto pasado para llevarlo al carrito de compra
    $event!.discount = 20;
    $event!.priceDiscount = $event.price - (+(($event.price * $event.discount  ) /100).toFixed(2)) ;
   this.cartService.manageProduct($event)
  }

  showProductDetails($event: IProduct) {
    this.router.navigate(["/games/details",+$event.id]);
  }


}
