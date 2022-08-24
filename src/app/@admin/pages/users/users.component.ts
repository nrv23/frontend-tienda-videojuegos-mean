import { STATE_VALUES_FILTER } from './../../../@core/constants/filters';
import { SweetAlertResult } from 'sweetalert2';
import { useFormBasicFormDialog, basicFormDialog } from './../../../@shared/alerts/alerts';
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
  filterActiveValues: STATE_VALUES_FILTER = STATE_VALUES_FILTER.ACTIVE;

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
      },
      {
        property: 'active',
        label: "Activo"
      }
    ]
  }

  async takeAction(event: any){

    const [action, user] = event;
    let html = "";
    

    switch(action) {

      case 'add':

       html = this.initializeForm(null);

      const { value:register }  = await useFormBasicFormDialog(
        'Agregar usuario',
        html
      );
      if(register) {
        this.addUser(register);
      }
        
      break;

      case 'edit':


        html = this.initializeForm(user);

        const { value: updateValues }  = await useFormBasicFormDialog(
          'Actualizar usuario',
          html
        );
        

        if(updateValues) {
          updateValues["id"] = user.id;
          this.updateUser(updateValues);
        }

      break;
      
      case 'info':

        html = `<input id="name" value="${user.lastName}" class="swal2-input" required>`;
        
        const response = await optionsWithDetails('Información del usuario',`${user.name} ${user.lastName}<br/>
        <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,'info');

        if(response === true) {
        
          html = this.initializeForm(user as User);
        
          const { value: updateValues }  = await useFormBasicFormDialog(
            'Actualizar usuario',
            html
          );
          
          if(updateValues) {
            updateValues["id"] = user.id;
            this.updateUser(updateValues);
          }
    
        } else if(response === false) {
          this.blockUser(user.id,typeof user.active === "undefined" || user.active === null ? true: !user.active)
        }

      break;

      case 'block':

        const value = await optionsWithDetails('Si bloqueas el usuario no se va mostrar en alista',`${user.name} ${user.lastName}`,"block")

        if(!value) {
          this.blockUser(user.id,typeof user.active === "undefined" || user.active === null ? true: !user.active)
        }

      break;

      default:
        break;

    }
  }

  private initializeForm(user?: User) {

    const defaultName  = user?.name ? user.name : '' ;
    const defaultLastname  = user?.lastName ? user?.lastName : '' ;
    const defaultEmail  = user?.email ? user?.email : '' ;

    return `
      <div class="container">
        <div class="col-12">
          <div class="form-group">
            <input id="name" value="${defaultName}" placeholder="Nombre" class="form-control" type="text" required>
          </div>
          <div class="form-group">
            <input id="lastName" value="${defaultLastname}" placeholder="Apellidos" class="form-control" type="text" required>
          </div>
          <div class="form-group">
            <input id="email" value="${defaultEmail}" placeholder="Correo" class="form-control" type="email" required
            pattern=${EMAIL_PATTERN}
            >
          </div>
          <div class="form-group">
              <select id="role" class="form-control">
                <option>Seleccione Role</option>
                <option value="ADMIN" ${user?.role === "ADMIN" ? 'selected': ''} >Admin</option>
                <option value="CLIENT" ${user?.role === "CLIENT" ? 'selected': ''}>Cliente</option>
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

  private async updateUser(user: User) {
    this.user.updateUser(user).subscribe(
      (response) => {
        const {
          updateUser: { status, message },
        } = response;

        if (!status) {
          basicAlert('warning', 'Actualizar usuario', message, 'Ok', true);
        } else {
          basicAlert('success', 'Actualizar usuario', message, 'Ok', true);
        }
      },
      (err: Error) => {
        basicAlert('error', 'Actualizar usuario', err.message, 'Ok', true);
      }
    );
  }

  private async blockUser(id: number, active:boolean) {
    this.user.blockUser(id,active).subscribe(
      (response) => {
        const {
          blockUser: { status, message },
        } = response;

        if (!status) {
          basicAlert('warning', 'Bloquear usuario', message, 'Ok', true);
        } else {
          basicAlert('success', 'Bloquear usuario', message, 'Ok', true);
        }
      },
      (err: Error) => {
        basicAlert('error', 'Bloquear usuario', err.message, 'Ok', true);
      }
    );
  }
}
