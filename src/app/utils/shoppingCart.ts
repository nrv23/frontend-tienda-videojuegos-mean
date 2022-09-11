import { ICart } from './../interface/shopping-cart';

export class ShoppingCartHelper {
  constructor() {}

  setCart(cart: ICart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart() {
    const cartItem = localStorage.getItem('cart');
    if (cartItem) {
      return JSON.parse(cartItem);
    }

    return {
      total: 0,
      subtotal: 0,
      products: [],
    };
  }
}
