import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjercicioComponent } from './ejercicio.component';
import { EjercicioRoutingModule } from './ejercicio-routing.module';



@NgModule({
  declarations: [
    EjercicioComponent
  ],
  imports: [
    CommonModule,
    EjercicioRoutingModule
  ]
})
export class EjercicioModule { }
