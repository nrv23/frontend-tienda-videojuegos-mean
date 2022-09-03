import { ProductItemModule } from '@mugan86/ng-shop-ui';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryListComponent } from './product-category-list.component';



@NgModule({
  declarations: [
    ProductCategoryListComponent
  ],
  imports: [
    CommonModule,
    ProductItemModule
  ],
  exports: [ // exporta el componente para poder usarse en todos lados de la aplicacion
    ProductCategoryListComponent
  ],
})
export class ProductCategoryListModule { }
