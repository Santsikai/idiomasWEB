import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: AdministracionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule { }
