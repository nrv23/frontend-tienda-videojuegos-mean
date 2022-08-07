import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './table-pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    TablePaginationComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule, // para usar el componente que va paginar los resultados
    FormsModule
  ],
  exports: [ // se exporta el componente para poder ser usado en cualquier parte de la aplicacion
    TablePaginationComponent
  ]
})
export class TablePaginationModule { }
