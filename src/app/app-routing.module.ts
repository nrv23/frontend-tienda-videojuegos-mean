import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {
    path: "contact",
    loadChildren: async () => await (await import("./@public/pages/contact/contact.module")).ContactModule // cargar rutas con lazy loading
  },
  {
    path: "home",
    loadChildren: async () => await (await import("./@public/pages/home/home.module")).HomeModule // cargar rutas con lazy loading
  },

  //--------------

  {
    path: "admin",
    loadChildren: async () => await (await import("./@admin/pages/dashboard/dashboard.module")).DashboardModule // cargar rutas con lazy loading
  },
  {
    path: "admin/users",
    loadChildren: async () => await (await import("./@admin/pages/users/users.module")).UsersModule // cargar rutas con lazy loading
  },
  // --------------

  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "**", redirectTo: "home", pathMatch: "full"
  }

  // la ruta comodin siempre tiene que ser la ultima
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, // evitar que el navegador recargue la pagina
    scrollPositionRestoration: "enabled" // mostrar el scroll arriba cuando una pagina se carga
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
