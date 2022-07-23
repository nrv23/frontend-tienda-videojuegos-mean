import { PublicComponent } from './public.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: PublicComponent, // este componente tiene cargado el router-outlet para poder navegar 
    children: [
      {
        path: "contact",
        loadChildren: async () => await (await import("./contact/contact.module")).ContactModule // cargar rutas con lazy loading
      },
      {
        path: "home",
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
