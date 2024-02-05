import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjercicioComponent } from './ejercicio.component';
import { EjercicioRoutingModule } from './ejercicio-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EjercicioComponent
  ],
  imports: [
    CommonModule,
    EjercicioRoutingModule,
    FormsModule
  ]
})
export class EjercicioModule { }
