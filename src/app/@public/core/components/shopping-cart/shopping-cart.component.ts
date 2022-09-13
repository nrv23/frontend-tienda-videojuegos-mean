import { Router } from '@angular/router';
import { CURRENCY_SELECTED } from './../../../../@core/constants/config';
import { ICart } from './../../../../interface/shopping-cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  
  constructor(private cartService: CartService, private router: Router) {}

  cart: ICart;
  currencySelected: string = CURRENCY_SELECTED;

  ngOnInit(): void {
    this.cart = this.cartService.initialize();

    this.cartService.itemsVar$.subscribe(data => {
      // leer la actualizacion del cart en tiempo real cuando se quita o actualiza un producto del carrito
      if(data) {
        this.cart = data;
      }
    })
  }

  closeNav() {
    this.cartService.close();
  }

  clearCart() {
    this.cartService.clearCart();
  } 

  deleteProduct(item: IProduct) {
    item!.qty = 0;
    this.cartService.manageProduct(item);
  }

  changeValue(qty: number, item: IProduct) {
    item!.qty = qty;
    this.cartService.manageProduct(item);
  }
  processOrder() {
    this.router.navigate(["/checkout"]);
    this.closeNav();
  }
}
