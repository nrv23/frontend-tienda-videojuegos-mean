import { USERS } from './../../../@graphql/operations/query/users';
import { IResultData } from './../../../interface/ResultInfo';

import { DocumentNode } from '@apollo/client';
import { Component, OnInit } from '@angular/core';
import { ITableColumns } from 'src/app/interface/table-columns.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  query: DocumentNode = USERS;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean ;

  columns: ITableColumns[];

  ngOnInit(): void {

    this.context = { };
    this.itemsPage = 5;
    this.resultData =  {
      listKey: 'users',
      definitionKey: 'users'
    };

    this.include = false;

    this.columns = [ // tablas con columnas dinamicas
      {
        property: "id",
        label: "#"
      },
      {
        property: "name",
        label: "Nombre del usuario"
      },
      {
        property: "lastName",
        label: "Apellidos"
      },
      {
        property: "email",
        label: "Correo"
      },
      {
        property: "role",
        label: "Role del Usuario"
      }
    ]
  }

}
