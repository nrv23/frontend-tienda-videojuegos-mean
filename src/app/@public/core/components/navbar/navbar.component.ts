import { ICart } from './../../../../interface/shopping-cart';
import { ShoppingCartHelper } from './../../../../utils/shoppingCart';
import { Router } from '@angular/router';
import { REDIRECT_ROUTES } from './../../../../@core/constants/config';
import { CartService } from './../../services/cart.service';

import { UserService } from 'src/app/@core/services/auth/user.service';
import { Component, OnInit } from '@angular/core';
import { IMe } from 'src/app/interface/MeResponse';
import menu from '@data/menus/shop.json';
import { IMenu } from 'src/app/interface/IMenu';
@Component({
  selector: 'app-public-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private user: UserService,
    private cartService: CartService,
    private route: Router
  ) {}

  private helper: ShoppingCartHelper = new ShoppingCartHelper();

  session: IMe;
  access = false;
  role: string;
  name: string;
  menuItems: IMenu[] = [];
  cart: ICart = this.helper.getCart();

  ngOnInit(): void {
    this.menuItems = menu;
    this.user.accessVar$.subscribe((response) => {
      if (response.me.users[0]) {
        const {
          me: {
            users: [{ name, lastName, role }],
            status,
          },
        } = response;

        this.session = response;
        this.access = status;
        this.role = role;
        this.name = `${name} ${lastName}`;
      }
    });

    this.cartService.itemsVar$.subscribe(cart => {
      if(cart) {
        this.cart = cart;
      }
    })
  }

  logout() {
    //rutas qye se usaran para direccionar
    if (REDIRECT_ROUTES.includes(this.route.url)) {
      this.helper.setRouteAfterLogin(this.route.url);
    } else {
      this.helper.deleteRouteAfterLogin();
    }

    this.user.resetSession();
    this.session = null;
    this.access = false;
    this.role = '';
    this.name = '';

  }

  open() {
    this.cartService.open();
  }
}
