import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {
    path: "", redirectTo: "", pathMatch: "full"
  },
  {
    path: "**", redirectTo: "", pathMatch: "full"
  }

  // la ruta comodin siempre tiene que ser la ultima
];
// solamente se va validar si las rutas que entran no son validas o son vacias
// se van a leer como rutas principales

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: "enabled" // mostrar el scroll arriba cuando una pagina se carga
    ,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
