import { DocumentNode } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { ApiService } from './../../@graphql/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablePaginationService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo); 
   }

   getCollectionData(query: DocumentNode,variables: object = {},context: object = {}) {

      return this.query(query,variables,context);
      
   }
}
