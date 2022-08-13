import { USERS } from './../../../@graphql/operations/query/users';
import { IResultData } from './../../../interface/ResultInfo';

import { DocumentNode } from '@apollo/client';
import { Component, OnInit } from '@angular/core';
import { ITableColumns } from 'src/app/interface/table-columns.interface';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';

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

  takeAction(event: any){

    const [action, user] = event;
    let html = "";
    

    switch(action) {

      case 'add':

      break;

      case 'edit':

      break;
      
      case 'info':
        html = `<input id="name" value="${user.lastName}" class="swal2-input" required>`
        optionsWithDetails('Información del usuario',`${user.name} ${user.lastName}<br/>
        <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,'info');

      break;

      case 'block':

      break;

      default:
        break;

    }
  }

}
