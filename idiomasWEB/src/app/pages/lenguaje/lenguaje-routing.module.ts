import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LenguajeComponent } from './lenguaje.component';



const routes: Routes = [{
  path: '',
  component: LenguajeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LenguajeRoutingModule { }
