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

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
   }

    login(email: string, password: string)  {
     return this.query(LOGIN,{email,password,include:false}).pipe(
       map(response => {
         return response as ILogin
       })
     )
   }

    getMe() {
      return this.query(ME,{include:false},{ 
        headers: new HttpHeaders()
        .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyZTBjMjUwYTIzOGU1OTE3YTNiODc4ZiIsImlkIjoxLCJlbWFpbCI6Im5ydjIzOTFAZ21haWwuY29tIiwibmFtZSI6Ik5hdGFuaWVsIiwibGFzdE5hbWUiOiJWZW5lZ2FzIiwicm9sZSI6IkNMSUVOVCIsImJpcnRoRGF0ZSI6IjIzLTExLTE5OTEiLCJyZWdpc3RlckRhdGUiOiIyMDIyLTA3LTI3VDA0OjQyOjU2LjE0M1oifSwiaWF0IjoxNjU5MjM2MDAzLCJleHAiOjE2NTkyMzk2MDN9.UVb-hMJK1Fm6WuFmDKqRcThG8BRBIJh-be8odK1EZUg") })
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
