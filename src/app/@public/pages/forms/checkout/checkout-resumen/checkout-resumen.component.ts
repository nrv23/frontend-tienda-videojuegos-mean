import { ICart } from './../../../../../interface/shopping-cart';
import { CartService } from './../../../../core/services/cart.service';
import { CURRENCY_SELECTED,CURRENCY_CODE_SELECTED } from 'src/app/@core/constants/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-resumen',
  templateUrl: './checkout-resumen.component.html',
  styleUrls: ['./checkout-resumen.component.scss']
})
export class CheckoutResumenComponent implements OnInit {

  constructor(private cartService: CartService) { }

  currencyCodeSelected: string = CURRENCY_CODE_SELECTED;
  currencySelected: string = CURRENCY_SELECTED;
  cart: ICart;

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
    this.cartService.itemsVar$.subscribe(cart => {
      if(cart ){
        this.cart = cart;
      }
    })
  }

}
