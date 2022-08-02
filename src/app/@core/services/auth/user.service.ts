import { IUsers } from './../../../interface/IUsers';
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

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
   }
   private helper: AuthHelper = new AuthHelper();


    accessVar= new Subject<IMe>() ;
    accessVar$ = this.accessVar.asObservable(); // aqui escucha los cambios
    
    updateSession(data: IMe) {
      this.accessVar.next(data);  
    }

    start() {
      let meData: IMe = {
        me: {
          status: null,
          message: "" ,
          users: null
        }
      }
      if(!this.helper.expiredSession()){
        this.getMe()
          .subscribe(response => {
            if(!response.me.status) {
              this.helper.removeToken();
              this.updateSession(meData);
              return;

            } else {

              this.updateSession(response);
              return;
            }
          }, err => {
            this.updateSession(meData)
            this.helper.removeToken();
            throw err;
          })
      } else {
        this.updateSession(meData)
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

    getUsers() {
      return this.query(USERS,{include:true})
        .pipe(map(
          result => result as IUsers
        ))    
    }

    register(user: User) {
      this.mutation(REGISTER,{user})
      .pipe(
        map(
          response => response as string
        )
      )
    }
}
