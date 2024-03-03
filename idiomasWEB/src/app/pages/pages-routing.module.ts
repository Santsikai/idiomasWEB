import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LanguageAccessGuard } from '../guards/langAccess/language-access.guard';
import { PropietarioAccessGuard } from '../guards/propietarioAccess/propietario-access.guard';
import { AdministradorAccessGuard } from '../guards/AdministradorAccess/administrador-access.guard';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'busqueda-lenguajes',
      loadChildren: () => import('./busqueda-leng/busqueda-leng.module')
        .then(m => m.BusquedaLengModule),
    },
    {
      path: 'lista-lenguajes',
      loadChildren: () => import('./lista-lenguajes/lista-lenguajes.module')
        .then(m => m.ListaLenguajesModule),
    },
    {
      path: 'lenguaje/:lengid',
      canActivate: [LanguageAccessGuard],
      loadChildren: () => import('./lenguaje/lenguaje.module')
        .then(m => m.LenguajeModule),
    },
    {
      path: 'ejercicio/:gvid',
      canActivate: [LanguageAccessGuard],
      loadChildren: () => import('./ejercicio/ejercicio.module')
        .then(m => m.EjercicioModule),
    },
    {
      path: 'perfil',
      loadChildren: () => import('./perfil/perfil.module')
        .then(m => m.PerfilModule),
    },
    {
      path: 'admin',
      canActivate: [AdministradorAccessGuard],
      loadChildren: () => import('./administracion/administracion.module')
        .then(m => m.AdministracionModule),
    },
    {
      path: 'editar-lenguaje/:lengid',
      canActivate: [PropietarioAccessGuard],
      loadChildren: () => import('./edit-lenguaje/edit-lenguaje.module')
        .then(m => m.EditLenguajeModule),
    },
    {
      path: '',
      redirectTo: 'lista-lenguajes',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
