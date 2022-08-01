import { GraphQLModule } from './@graphql/modules/graphql.module';
import { PublicModule } from './@public/pages/public.module';
import { AdminModule } from './@admin/pages/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    HttpClientModule,
    GraphQLModule,
    AppRoutingModule // este routing ssiempre se va añaidir como ultimo
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS, },JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
