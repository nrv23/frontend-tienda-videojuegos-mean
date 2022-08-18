import { basicFormDialog, useFormBasicFormDialog } from './../../../@shared/alerts/alerts';
import { SweetAlertResult } from 'sweetalert2';
import { UserService } from './../../../@core/services/auth/user.service';
import { USERS } from './../../../@graphql/operations/query/users';
import { IResultData } from './../../../interface/ResultInfo';

import { DocumentNode } from '@apollo/client';
import { Component, OnInit } from '@angular/core';
import { ITableColumns } from 'src/app/interface/table-columns.interface';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { User } from 'src/app/models/user.model';
import { basicAlert } from 'src/app/@shared/alerts/toast';
import { EMAIL_PATTERN } from '@admin/core/constants/regex';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private user: UserService){
    
  }

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

  async takeAction(event: any){

    const [action, user] = event;
    let html = "";
    

    switch(action) {

      case 'add':

       html = this.initializeForm(user);

      let { value }  = await useFormBasicFormDialog(
        'Agregar usuario',
        html
      );
      if(value) {
        this.addUser(value);
      }
        
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

  private initializeForm(user: User) {

    return `
      <div class="container">
        <div class="col-12">
          <div class="form-group">
            <input id="name" value="" placeholder="Nombre" class="form-control" type="text" required>
          </div>
          <div class="form-group">
            <input id="lastName" value="" placeholder="Apellidos" class="form-control" type="text" required>
          </div>
          <div class="form-group">
            <input id="email" value="" placeholder="Correo" class="form-control" type="email" required
            pattern=${EMAIL_PATTERN}
            >
          </div>
          <div class="form-group">
              <select id="role" class="form-control">
                <option>Seleccione Role</option>
                <option value="ADMIN">Admin</option>
                <option value="CLIENT">Cliente</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  private addUser(user: User) {

    
    this.user.register(user).subscribe(
      (response) => {
        const {
          register: { status, message },
        } = response;

        if (!status) {
          basicAlert('warning', 'Agregar usuario', message, 'Ok', true);
        } else {
          basicAlert('success', 'Agregar usuario', message, 'Ok', true);
        }
      },
      (err: Error) => {
        basicAlert('error', 'Agregar usuario', err.message, 'Ok', true);
      }
    );
  }
}
