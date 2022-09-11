import { IProduct } from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";

export interface ICart {
    total: number; // almacenar del total a pagar
    subtotal: number; // almacenar el numero de unidades totales
    products: IProduct[]; // lista de productos que  se van a vender
}