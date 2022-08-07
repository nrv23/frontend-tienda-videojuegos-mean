import { TablePaginationModule } from './../../../@shared/table-pagination/table-pagination.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TablePaginationModule // se importa el modulo para usar el componente, pero se debe exportarel componente para poder usarse
  ]
})
export class UsersModule { }
