import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/@core/guards/admin.guard';

const routes: Routes = [{
  path: "admin", component: AdminComponent,
  canActivateChild: [AdminGuard],
  // configurar rutas hijas de una ruta principal
  // concatenar la ruta base más el nombre de la subruta
  children: [
    {
      path: "", // como esta ruta es hija de una ruta principal y no lleva nada entonces debe ir vacia
      loadChildren: async () => await (await import("./../pages/dashboard/dashboard.module")).DashboardModule // cargar rutas con lazy loading
    },
    {
      path: "users", // las subrutas no deben llevar /
      loadChildren: async () => await (await import("./../pages/users/users.module")).UsersModule // cargar rutas con lazy loading
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
// -- la bandera --flat crear archivos en la raiz de la carpeta contenedora y no crea subcarpetas