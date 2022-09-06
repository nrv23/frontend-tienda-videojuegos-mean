import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: PublicComponent, // este componente tiene cargado el router-outlet para poder navegar 
    children: [
      {
        path: "login",
        loadChildren: async () => await (await import("./forms/login/login.module")).LoginModule // cargar rutas con lazy loading
      },
      {
        path: "register",
        loadChildren: async () => await (await import("./forms/register/register.module")).RegisterModule // cargar rutas con lazy loading
      },{
        path: "active/:token", // va leer el valor del token que viene por url
        loadChildren: async () => await (await import("./forms/active/active.module")).ActiveModule // cargar rutas con lazy loading
      },
      {
        path: "contact",
        loadChildren: async () => await (await import("./contact/contact.module")).ContactModule // cargar rutas con lazy loading
      },
      {
        path: "games/details/:id",
        loadChildren: async () => await (await import("./games/details/details.module")).DetailsModule // cargar rutas con lazy loading
      },
      
      {
        path: "games/:type/:filter",
        loadChildren: async () => await (await import("./games/games.module")).GamesModule // cargar rutas con lazy loading
      },
      {
        path: "forgot",
        loadChildren: async () => await (await import("./forms/forgot/forgot.module")).ForgotModule // cargar rutas con lazy loading
      },
      {
        path: "reset/:token",
        loadChildren: async () => await (await import("./forms/change-password/change-password.module")).ChangePasswordModule // cargar rutas con lazy loading
      },
      {
        path: "",
        loadChildren: async () => await (await import("./home/home.module")).HomeModule // cargar rutas con lazy loading
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
