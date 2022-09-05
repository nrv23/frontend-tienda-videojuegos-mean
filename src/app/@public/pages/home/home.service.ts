import { IHomeDataResponse } from './../../../interface/IHomeDataResponse';
import { HOME_DATA } from './../../../@graphql/operations/query/home';
import { ApiService } from './../../../@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getData() {
    return this.query(HOME_DATA, {}, {}).pipe(
      map((response) => response as IHomeDataResponse)
    );
  }
}
