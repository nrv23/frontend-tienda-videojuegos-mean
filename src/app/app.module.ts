import { GraphQLModule } from './@graphql/modules/graphql.module';
import { PublicModule } from './@public/pages/public.module';
import { AdminModule } from './@admin/pages/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
