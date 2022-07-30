import { map } from 'rxjs/internal/operators/map';
import { LOGIN } from './../@graphql/operations/query/login';
import { Apollo } from 'apollo-angular';
import { ApiService } from './../@graphql/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo)
   }


   login(email: string, password: string) {
     return this.query(LOGIN).pipe(
       map(response => response)
     )
   }
}
