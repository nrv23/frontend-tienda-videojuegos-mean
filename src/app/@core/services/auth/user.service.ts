import { BLOCK_USER } from './../../../@graphql/operations/mutation/blockUser';
import { IBlockUserResponse } from './../../../interface/IBlockUserResponse';
import { UPDATE_USER } from './../../../@graphql/operations/mutation/updateUser';
import { IUsersResponse } from './../../../interface/UsersResponse';
import { USERS } from './../../../@graphql/operations/query/users';
import { IMe } from '../../../interface/MeResponse';
import { ILogin } from '../../../interface/LoginResponse';
import { LOGIN } from '../../../@graphql/operations/query/login';
import { Apollo } from 'apollo-angular';
import { ApiService } from '../../../@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { ME } from '../../../@graphql/operations/query/me';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { REGISTER } from 'src/app/@graphql/operations/mutation/register';
import { AuthHelper } from 'src/app/utils/auth';
import { Subject } from 'rxjs';
import { IRegisterResponse } from 'src/app/interface/RegisterResponse';
import { IUserUpdateResponse } from 'src/app/interface/IUserUpdateResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
   }
    private helper: AuthHelper = new AuthHelper();

    private meData: IMe = {
      me: {
        status: null,
        message: "" ,
        users: []
      }
    }

    accessVar= new Subject<IMe>() ;
    accessVar$ = this.accessVar.asObservable(); // aqui escucha los cambios
    
    updateSession(data: IMe) {
      this.accessVar.next(data);  
    }

    start() {
      
      if(!this.helper.expiredSession()){
        this.getMe()
          .subscribe(response => {
            if(!response.me.status) {
              this.helper.removeToken();
              this.updateSession(this.meData);
              return;

            } else {

              this.updateSession(response);
              return;
            }
          }, err => {
            this.updateSession(this.meData)
            this.helper.removeToken();
            throw err;
          })
      } else {
        this.updateSession(this.meData)
        this.helper.removeToken();
      }
     }

    login(email: string, password: string)  {
      console.log({
        email,
        password
      })
     return this.query(LOGIN,{email,password,include:false}).pipe(
       map(response => {
         return response as ILogin
       })
     )
   }

    getMe() {
      return this.query(ME,{include:false},{ 
        headers: new HttpHeaders()
        .set("Authorization", this.helper.getToken()) })
        .pipe(
          map(response => response as IMe)
        )
    }

    getUsers(page: number = 1, items:number = 20) {
      return this.query(USERS,{include:true,page,items})
        .pipe(map(
          result => result as IUsersResponse
        ))    
    }

    register(user: User) {

      delete user.confirm_password;
      delete user.role;
   
      return this.mutation(REGISTER,{user})
      .pipe(
        map(
          response => response as IRegisterResponse
        )
      )
    }

    resetSession() {
      this.helper.removeToken();
      this.updateSession(this.meData)
    }

    updateUser(user: User) {

      if(typeof user.role === 'undefined' &&  user.role === null){
        delete user?.role;
      }

      delete user.confirm_password;

      return this.mutation(UPDATE_USER,{user,include: false},{ 
        headers: new HttpHeaders()
        .set("Authorization", this.helper.getToken()) })
        .pipe(map(response => response as IUserUpdateResponse
        )
      )
    }

    blockUser(id:number, active: boolean) {
      return this.mutation(BLOCK_USER,{id,active},{ 
        headers: new HttpHeaders()
        .set("Authorization", this.helper.getToken()) })
        .pipe(map(response => response as IBlockUserResponse
        )
      )
    }
}
