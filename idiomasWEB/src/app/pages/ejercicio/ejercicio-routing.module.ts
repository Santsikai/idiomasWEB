import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './ejercicio.component';



const routes: Routes = [{
  path: '',
  component: EjercicioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjercicioRoutingModule { }
