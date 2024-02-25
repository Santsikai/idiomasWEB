import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaLengComponent } from './busqueda-leng.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: '',
  component: BusquedaLengComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaLengRoutingModule { }
