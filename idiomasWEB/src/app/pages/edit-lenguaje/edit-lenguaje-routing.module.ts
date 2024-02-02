import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditLenguajeComponent } from './edit-lenguaje.component';



const routes: Routes = [{
  path: '',
  component: EditLenguajeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLenguajeRoutingModule { }
