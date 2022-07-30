import { Injectable, NgZone } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult, DocumentNode, Observable } from '@apollo/client';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  protected query(
    query: DocumentNode,
    variables: object = {},
    context: object = {}
  ) {
    // solo es visible para las clases hijas
    // que heredan este servicio

    return this.apollo
      .watchQuery({
        query,
        variables,
        context,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<unknown>) => result.data)
      );
  }

  protected mutation(
    mutation: DocumentNode,
    variables: object = {},
    context: object = {}
  ) {
    return this.apollo
      .mutate({
        mutation,
        variables,
        context,
      })
      .pipe(map((result) => result.data as unknown));
  }

  protected suscription(
    query: DocumentNode,
    variables: object = {},
    context: object = {}
  ) {
    return this.apollo
      .subscribe({
        query,
        variables,
        context,
      })
      .pipe(map((response) => response.data as unknown));
  }
}
