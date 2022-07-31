import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  
  const uri = 'http://localhost:5000/graphql'; // <-- add the URL of the GraphQL server here
  

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // capturar errores de red o de graphql

    if (graphQLErrors) {
      console.log({ graphQLErrors }); // error de graphQLErrors
    }

    if (networkError) {
      console.log({ networkError }); // error de networkError
    }
  });

  const link = ApolloLink.from([errorLink, httpLink.create({ uri })]); // pasar la instancia de error y conexion
  

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}