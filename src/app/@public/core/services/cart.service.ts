import { Subject } from 'rxjs/internal/Subject';
import { ShoppingCartHelper } from './../../../utils/shoppingCart';
import { ICart } from './../../../interface/shopping-cart';
import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  products: IProduct[] = [];

  cart: ICart = {
    total: 0,
    subtotal: 0,
    products: [],
  };

  //gstionar la informacion del carrito en tiempo real con los observables
  public itemsVar = new Subject<ICart>(); 
  public itemsVar$ = this.itemsVar.asObservable(); // este es el valor donde uno se suscribe para obtener el valor
  // actual del observable en tiempo real

  private cartHelper: ShoppingCartHelper = new ShoppingCartHelper(); 
  /*
  inicializar el carrito de compra par atener la informacion almacenada
 */
  initialize() {
    this.cart = this.cartHelper.getCart();
    console.log({initializeCart: this.cart})
    return this.cart;
  }

  public updateItemsInCart(newValue: ICart) {
    this.itemsVar.next(newValue);
  }

  manageProduct(product: IProduct) {
    const productTotal = this.cart.products.length;
    if (productTotal > 0) {
      let actionUpdate = false;
      let index = 0;
      let deleted = false
      //usar for
      this.cart.products.forEach((pr) => {
        if (product.id === pr.id) {
          // si la cantidad del producto es 0 quiere decir que se va borrar
          if (product.qty === 0) {
            deleted = true;
            console.log({index})
            this.cart.products.splice(index, 1);
          } else {
            pr = product;
            actionUpdate = true;
          }
        }
        
        index++;
      });

      if (!actionUpdate && !deleted) {
        // si el producto no existe en el listaod entonces se agrega
        this.cart.products.push(product);
      }
    } else {
      this.cart.products.push(product);
    }

    //localStorage.setItem("cart",JSON.stringify(this.cart));

    this.checkoutTotal();
  }

  checkoutTotal() {
    let subtotal = 0;
    let total = 0;

    this.cart.products.map((product) => {
      subtotal += product!.qty;
      total += product!.qty * product.price;
    });

    this.cart.subtotal = subtotal;
    this.cart.total = +total.toFixed(2);

    console.log("cart",this.cart);

    this.cartHelper.setCart(this.cart);
    this.updateItemsInCart(this.cart);
  }

  clearCart() {
    console.log("cart",this.cart);
    this.products = [];
    this.cart.products = [];
    this.cart.subtotal = 0;
    this.cart.total = 0;
    console.log("cart2",this.cart);
    this.cartHelper.setCart(this.cart);
    this.updateItemsInCart(this.cart);

    return this.cart;
  }

  open() {
    (document.getElementById('mySidenav') as HTMLDivElement).style.width =
      '600px';
    (document.getElementById('overlay') as HTMLDivElement).style.display =
      'block';
    (document.getElementById('app') as HTMLBodyElement).style.overflow =
      'hidden';
  }

  close() {
    (document.getElementById('mySidenav') as HTMLDivElement).style.width = '0';
    (document.getElementById('overlay') as HTMLDivElement).style.display =
      'none';
    (document.getElementById('app') as HTMLBodyElement).style.overflow = 'auto';
  }
}
