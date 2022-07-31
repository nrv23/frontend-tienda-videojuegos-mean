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
      },
      {
        path: "contact",
        loadChildren: async () => await (await import("./contact/contact.module")).ContactModule // cargar rutas con lazy loading
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
